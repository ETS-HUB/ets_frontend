"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Divider,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Spin,
  Row,
  Col,
} from "antd";
import { ArrowLeft01Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import { CheckOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;

interface JobData {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  job_type: string;
  duration: string | null;
  description: string;
  program_details?: any;
  eligibility_criteria?: any;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  application_deadline: string | null;
  slug: string;
  created_at: string;
}

interface ApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  university?: string;
  major?: string;
  yearOfStudy?: string;
  graduationDate?: any;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  whyInterested: string;
  relevantExperience?: string;
  coverLetter?: string;
  resumeUrl: string;
}

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

const JobDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [uploadingResume, setUploadingResume] = useState(false);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (slug) {
      fetchJobDetails();
    }
  }, [slug]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/jobs/${slug}`);

      if (!response.ok) {
        throw new Error("Job not found");
      }

      const result = await response.json();
      setJobData(result.data);
    } catch (error) {
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleApply = () => {
    setModalOpen(true);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "volunteer_resumes");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setResumeUrl(data.secure_url);
        form.setFieldsValue({ resumeUrl: data.secure_url });
        toast.success("Resume uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmitApplication = async (values: ApplicationFormValues) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        graduationDate: values.graduationDate
          ? values.graduationDate.format("YYYY-MM-DD")
          : null,
      };

      const response = await fetch(`/api/jobs/${slug}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setModalOpen(false);
      setSuccessModal(true);
      form.resetFields();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setSubmitting(false);
      setResumeUrl("");
    }
  };

  const getPostedDate = (createdAt: string) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) > 1 ? "s" : ""
    } ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Job not found
          </h2>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 pt-28 px-5">
        <div className="max-w-5xl mx-auto">
          <Button
            type="text"
            icon={<ArrowLeft01Icon />}
            onClick={handleBack}
            className="mb-8 text-gray-500 text-base py-2 px-0!"
          >
            Back
          </Button>

          {jobData.company_logo && (
            <div className="mb-6">
              <Image
                width={80}
                height={80}
                src={jobData.company_logo}
                alt={jobData.company}
                className="w-20 h-20 rounded-xl border border-gray-200 object-contain bg-white p-2"
              />
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-[#172554] m-0">
                {jobData.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap text-gray-500 text-base mb-4">
              <span>{jobData.company}</span>
              <span>•</span>
              <span>{getPostedDate(jobData.created_at)}</span>
            </div>
          </div>

          <Divider />

          <section className="mb-10">
            <p className="text-base leading-relaxed text-gray-500 mb-6">
              {jobData.description}
            </p>

            {jobData.program_details && (
              <p className="text-base leading-relaxed text-gray-500">
                {jobData.program_details.map((detail: any, idx: number) => (
                  <span key={idx}>
                    {idx > 0 && " "}
                    <span className="font-bold text-gray-900">
                      {detail.label}
                    </span>{" "}
                    {detail.description}
                  </span>
                ))}
              </p>
            )}
          </section>

          {jobData.eligibility_criteria && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                Eligibility Criteria:
              </h2>

              {jobData.eligibility_criteria.undergraduates && (
                <div className="mb-8">
                  <h3 className="text-base font-bold text-[#172554] mb-4 uppercase tracking-wide">
                    UNDERGRADUATES
                  </h3>
                  <ul className="pl-5 m-0">
                    {jobData.eligibility_criteria.undergraduates.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-base leading-relaxed text-gray-500 mb-3"
                        >
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {jobData.eligibility_criteria.graduates && (
                <div className="mb-8">
                  <h3 className="text-base font-bold text-[#172554] mb-4 uppercase tracking-wide">
                    GRADUATES
                  </h3>
                  <ul className="pl-5 m-0">
                    {jobData.eligibility_criteria.graduates.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="text-base leading-relaxed text-gray-500 mb-3"
                        >
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </section>
          )}

          {jobData.responsibilities && jobData.responsibilities.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                Key Responsibilities
              </h2>
              <ul className="pl-5 m-0">
                {jobData.responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className="text-base list-disc leading-relaxed text-gray-500 mb-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {jobData.requirements && jobData.requirements.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                Requirements
              </h2>
              <ul className="pl-5 m-0">
                {jobData.requirements.map((item, index) => (
                  <li
                    key={index}
                    className="text-base list-disc leading-relaxed text-gray-500 mb-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {jobData.benefits && jobData.benefits.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                What We Offer
              </h2>
              <ul className="pl-5 m-0">
                {jobData.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="text-base list-disc leading-relaxed text-gray-500 mb-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {jobData.application_deadline && (
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg px-5 py-4 mb-8">
              <span className="text-yellow-900 text-base font-semibold">
                Application Deadline:{" "}
                {new Date(jobData.application_deadline).toLocaleDateString()}
              </span>
            </div>
          )}

          <div className="flex justify-center pt-6 pb-10">
            <CustomButton
              variant="primary"
              onClick={handleApply}
              className="w-full"
            >
              Apply now
            </CustomButton>
          </div>
        </div>
      </div>

      <Modal
        title={`Apply for role as a ${jobData.title}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitApplication}
          autoComplete="off"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-4">
            Personal Information
          </h3>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input size="large" placeholder="John Doe" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input size="large" placeholder="john.doe@gmail.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input size="large" placeholder="+234 800 000 0000" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  { required: true, message: "Please enter your location" },
                ]}
              >
                <Input size="large" placeholder="Lagos, Nigeria" />
              </Form.Item>
            </Col>
          </Row>

          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">
            Education
          </h3>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="university" label="University/Institution">
                <Input size="large" placeholder="University of Lagos" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="major" label="Major/Field of Study">
                <Input size="large" placeholder="Computer Science" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="yearOfStudy" label="Year of Study">
                <Input size="large" placeholder="3rd Year" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="graduationDate"
                label="Expected Graduation / Month of Graduation"
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  picker="month"
                />
              </Form.Item>
            </Col>
          </Row>

          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">
            Links and Profiles
          </h3>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="linkedin"
                label="LinkedIn Profile"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  size="large"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="github" label="GitHub Profile">
                <Input
                  size="large"
                  placeholder="https://github.com/yourusername"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="portfolio" label="Portfolio/Website">
            <Input size="large" placeholder="https://yourportfolio.com" />
          </Form.Item>

          <Form.Item
            name="resumeUrl"
            label="Resume/CV"
            rules={[{ required: true, message: "Please upload your resume" }]}
          >
            <div className="space-y-3">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                disabled={uploadingResume}
                className="w-full"
                size="large"
              />
              <div className="text-xs text-gray-500">
                Upload your resume (PDF or Word document, max 5MB)
              </div>

              {uploadingResume && (
                <div className="flex items-center gap-2 text-secondary">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary"></div>
                  <span className="text-sm">Uploading resume...</span>
                </div>
              )}

              {resumeUrl && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">
                      Resume uploaded
                    </p>
                    <Link
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 hover:underline"
                    >
                      View resume
                    </Link>
                  </div>
                  <Button
                    size="small"
                    danger
                    onClick={() => {
                      setResumeUrl("");
                      form.setFieldsValue({ resumeUrl: "" });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}

              <Input type="hidden" />
            </div>
          </Form.Item>

          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">
            Application Details
          </h3>

          <Form.Item
            name="whyInterested"
            label="Why are you interested in this position?"
            rules={[
              {
                required: true,
                message: "Please tell us why you're interested",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Tell us what excites you about this opportunity..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item name="relevantExperience" label="Relevant Experience">
            <TextArea
              rows={4}
              placeholder="Share any relevant experience, projects, or skills..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="coverLetter"
            label="Cover Letter"
            rules={[{ required: true, message: "Cover letter is required" }]}
          >
            <TextArea
              rows={6}
              placeholder="Write a brief cover letter..."
              maxLength={2000}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-4 items-center w-full justify-between">
              <CustomButton
                variant="secondary"
                type="submit"
                width="full"
                loading={submitting}
              >
                Submit Application
              </CustomButton>
              <CustomButton
                variant="gray"
                width="full"
                onClick={() => setModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={successModal}
        footer={null}
        closable={false}
        centered
        onCancel={() => setSuccessModal(false)}
      >
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <CheckOutlined style={{ fontSize: "40px", color: "white" }} />
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            Application Submitted!
          </h2>

          <p className="mt-2 text-gray-600 mb-6">
            Thank you for applying to {jobData.title}. We&apos;ve received your
            application and will review it shortly.
          </p>

          <CustomButton
            variant="primary"
            onClick={() => {
              setSuccessModal(false);
              handleBack();
            }}
          >
            Back to Jobs
          </CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default JobDetailsPage;
