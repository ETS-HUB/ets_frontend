"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Popconfirm,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  FileTextOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import toast from "react-hot-toast";

import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;
const { Option } = Select;

interface JobWithDetails extends Job {
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
}

interface Job {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  job_type: string;
  duration: string | null;
  description: string;
  application_deadline: string | null;
  is_active: boolean;
  slug: string;
  created_at: string;
  application_mail?: string | null;
  application_link?: string | null;
  applications_count?: number;
}

interface FormValues {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: string;
  duration?: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  applicationMail?: string;
  applicationLink?: string;
  applicationDeadline?: any;
}

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

const AdminJobsPage = () => {
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/jobs?page=${page}&limit=${pagination.pageSize}`
      );
      const result = await response.json();

      const jobsWithCounts = await Promise.all(
        result.data.map(async (job: Job) => {
          try {
            const appResponse = await fetch(
              `/api/jobs/${job.slug}/apply?limit=1`
            );
            const appResult = await appResponse.json();
            return {
              ...job,
              applications_count: appResult.pagination?.total || 0,
            };
          } catch {
            return { ...job, applications_count: 0 };
          }
        })
      );

      setJobs(jobsWithCounts);
      setPagination({
        ...pagination,
        current: result.pagination.page,
        total: result.pagination.total,
      });
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/jobs/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete job");
      }

      toast.success("Job deleted successfully");
      fetchJobs(pagination.current);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete job"
      );
    }
  };

  const handleToggleActive = async (job: Job) => {
    try {
      const response = await fetch(`/api/jobs/${job.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !job.is_active }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update job");
      }

      toast.success(
        `Job ${!job.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchJobs(pagination.current);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update job status"
      );
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "job_logos");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const handleUpload: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file as File);
      setLogoUrl(url);
      form.setFieldsValue({ companyLogo: url });
      toast.success("Logo uploaded successfully");
      onSuccess?.(url);
    } catch (error) {
      toast.error("Failed to upload logo");
      onError?.(error as Error);
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      toast.error("Image must be smaller than 5MB!");
      return false;
    }
    return true;
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setLogoUrl(job.company_logo || "");
    const jobWithDetails = job as JobWithDetails;
    form.setFieldsValue({
      title: job.title,
      company: job.company,
      companyLogo: job.company_logo,
      location: job.location,
      jobType: job.job_type,
      duration: job.duration,
      description: job.description,
      responsibilities: jobWithDetails.responsibilities?.join("\n") || "",
      requirements: jobWithDetails.requirements?.join("\n") || "",
      benefits: jobWithDetails.benefits?.join("\n") || "",
      applicationMail: job.application_mail || "",
      applicationLink: job.application_link || "",
      applicationDeadline: job.application_deadline
        ? dayjs(job.application_deadline)
        : null,
    });
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingJob(null);
    setLogoUrl("");
    form.resetFields();
    setModalOpen(true);
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const responsibilities = values.responsibilities
        ? values.responsibilities.split("\n").filter((line) => line.trim())
        : [];
      const requirements = values.requirements
        ? values.requirements.split("\n").filter((line) => line.trim())
        : [];
      const benefits = values.benefits
        ? values.benefits.split("\n").filter((line) => line.trim())
        : [];

      const payload = {
        title: values.title,
        company: values.company,
        companyLogo: values.companyLogo || null,
        location: values.location,
        jobType: values.jobType,
        duration: values.duration || null,
        description: values.description,
        responsibilities,
        requirements,
        benefits,
        applicationMail: values.applicationMail,
        applicationLink: values.applicationLink,
        applicationDeadline: values.applicationDeadline
          ? values.applicationDeadline.format("YYYY-MM-DD")
          : null,
      };

      const url = editingJob ? `/api/jobs/${editingJob.slug}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save job");
      }

      toast.success(`Job ${editingJob ? "updated" : "created"} successfully`);
      setModalOpen(false);
      fetchJobs(pagination.current);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${editingJob ? "update" : "create"} job`
      );
    } finally {
      setSubmitting(false);
    }

  };

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Job) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.company}</div>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Type",
      dataIndex: "job_type",
      key: "job_type",
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Applications",
      dataIndex: "applications_count",
      key: "applications_count",
      render: (count: number, record: Job) => (
        <Link
          href={`/admin/jobs/${record.slug}/applications`}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          {count} <FileTextOutlined className="ml-1" />
        </Link>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "application_deadline",
      key: "application_deadline",
      render: (date: string | null) =>
        date ? (
          <span>{new Date(date).toLocaleDateString()}</span>
        ) : (
          <span className="text-gray-400">No deadline</span>
        ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive: boolean, record: Job) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: unknown, record: Job) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            href={`/jobs/${record.slug}`}
            target="_blank"
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete job"
            description="Are you sure you want to delete this job? All applications will be preserved."
            onConfirm={() => handleDelete(record.slug)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#172554]">
                Jobs Management
              </h1>
              <p className="text-gray-500 mt-1">
                Manage job postings and view applications
              </p>
            </div>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => fetchJobs(pagination.current)}
                loading={loading}
              >
                Refresh
              </Button>
              <CustomButton variant="primary" onClick={handleCreate}>
                <PlusOutlined className="mr-2" />
                Create New Job
              </CustomButton>
            </Space>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Jobs</div>
            <div className="text-2xl font-bold text-gray-900">
              {pagination.total}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Active Jobs</div>
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter((j) => j.is_active).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total Applications</div>
            <div className="text-2xl font-bold text-blue-600">
              {jobs.reduce((sum, j) => sum + (j.applications_count || 0), 0)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Inactive Jobs</div>
            <div className="text-2xl font-bold text-gray-400">
              {jobs.filter((j) => !j.is_active).length}
            </div>
          </div>
        </div>

        <Table
          loading={loading}
          columns={columns}
          dataSource={jobs}
          rowKey="id"
          pagination={{
            ...pagination,
            onChange: (page) => fetchJobs(page),
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} jobs`,
          }}
          scroll={{ x: 1400 }}
        />

        <Modal
          title={editingJob ? "Edit Job" : "Create New Job"}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="title"
              label="Job Title"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <Input
                size="large"
                placeholder="e.g., Software Engineering Intern"
              />
            </Form.Item>

            <Form.Item
              name="company"
              label="Company Name"
              rules={[{ required: true, message: "Please enter company name" }]}
            >
              <Input size="large" placeholder="e.g., Tech Company Inc." />
            </Form.Item>

            <Form.Item label="Company Logo">
              <div className="space-y-3">
                <Upload
                  name="logo"
                  listType="picture-card"
                  className="logo-uploader"
                  showUploadList={false}
                  customRequest={handleUpload}
                  beforeUpload={beforeUpload}
                  disabled={uploading}
                >
                  {logoUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        width={100}
                        height={100}
                        src={logoUrl}
                        alt="Company logo"
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
                        <span className="text-white text-sm">Change Logo</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      {uploading ? <LoadingOutlined /> : <UploadOutlined />}
                      <div className="mt-2 text-sm">Upload Logo</div>
                    </div>
                  )}
                </Upload>
                <div className="text-xs text-gray-500">
                  Recommended: Square image, max 5MB (JPG, PNG)
                </div>

                <Form.Item name="companyLogo" noStyle>
                  <Input type="hidden" />
                </Form.Item>

                {logoUrl && (
                  <Button
                    danger
                    size="small"
                    onClick={() => {
                      setLogoUrl("");
                      form.setFieldsValue({ companyLogo: "" });
                    }}
                  >
                    Remove Logo
                  </Button>
                )}
              </div>
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input size="large" placeholder="e.g., Lagos, Nigeria" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="jobType"
                label="Job Type"
                rules={[{ required: true, message: "Please select job type" }]}
              >
                <Select size="large" placeholder="Select job type">
                  <Option value="Internship">Internship</Option>
                  <Option value="Full-time">Full-time</Option>
                  <Option value="Part-time">Part-time</Option>
                  <Option value="Contract">Contract</Option>
                </Select>
              </Form.Item>

              <Form.Item name="duration" label="Duration">
                <Input size="large" placeholder="e.g., 3-6 months" />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Job Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea
                rows={4}
                placeholder="Describe the job opportunity..."
              />
            </Form.Item>

            <Form.Item
              name="responsibilities"
              label="Responsibilities (one per line)"
            >
              <TextArea
                rows={4}
                placeholder="Enter responsibilities, one per line"
              />
            </Form.Item>

            <Form.Item name="requirements" label="Requirements (one per line)">
              <TextArea
                rows={4}
                placeholder="Enter requirements, one per line"
              />
            </Form.Item>

            <Form.Item name="benefits" label="Benefits (one per line)">
              <TextArea rows={4} placeholder="Enter benefits, one per line" />
            </Form.Item>

            <Form.Item name="applicationMail" label="Application Email">
              <Input size="large" placeholder="e.g., hr@example.com" />
            </Form.Item>

            <Form.Item name="applicationLink" label="Application Link">
              <Input size="large" placeholder="e.g., https://example.com/apply" />
            </Form.Item>

            <Form.Item name="applicationDeadline" label="Application Deadline">
              <DatePicker size="large" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-center space-x-4">
                <CustomButton
                  loading={submitting}
                  className="w-full"
                  variant="primary"
                  type="submit"
                >
                  {editingJob ? "Update Job" : "Create Job"}
                </CustomButton>
                <CustomButton
                  variant="gray"
                  className="w-full"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </CustomButton>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminJobsPage;
