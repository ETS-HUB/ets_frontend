"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Card,
  Row,
  Col,
  Space,
  Modal,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  CheckOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { Button } from "@/app/components";
import toast from "react-hot-toast";

const { TextArea } = Input;
const { Option } = Select;

interface VolunteerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  year: string;
  graduationDate: Date;
  department: string[];
  experienceLevel: string;
  availability: string[];
  skills: string;
  motivation: string;
  previousExperience?: string;
  terms: boolean;
}

const VolunteerForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const onFinish = async (values: VolunteerFormValues) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        graduationDate: values.graduationDate.toISOString().split("T")[0],
      };

      const response = await fetch("/api/register/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSuccessModal(true);
      form.resetFields();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Publicity & Promotion",
    "Design",
    "Content & Social Media Management",
    "Content Writing & Blogging",
    "Event Planning & Coordination",
    "Community Engagement and Management",
    "Tech Instructors",
    "Content Creation",
  ];

  const experienceLevels = [
    "Beginner (0-1 years)",
    "Intermediate (1-3 years)",
    "Advanced (3+ years)",
  ];

  const availabilityOptions = [
    "Weekdays (Morning)",
    "Weekdays (Afternoon)",
    "Weekdays (Evening)",
    "Weekends",
    "Flexible",
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <Card
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          border: "none",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark="optional"
        >
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "20px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Personal Information
            </h3>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="John"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Doe"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="john.doe@gmail.com"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number (Whatsapp preferred)"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="+234 800 000 0000"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "20px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Academic Information
            </h3>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="university"
                  label="University/Institution"
                  rules={[
                    { required: true, message: "Please enter your university" },
                  ]}
                >
                  <Input
                    prefix={<HomeOutlined />}
                    placeholder="University of Lagos"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="major"
                  label="Field of Study"
                  rules={[
                    { required: true, message: "Please enter your major" },
                  ]}
                >
                  <Input
                    prefix={<BookOutlined />}
                    placeholder="Computer Science"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="year"
                  label="Year of Study"
                  rules={[
                    { required: true, message: "Please select your year" },
                  ]}
                >
                  <Select placeholder="Select year" size="large">
                    <Option value="1">1st Year</Option>
                    <Option value="2">2nd Year</Option>
                    <Option value="3">3rd Year</Option>
                    <Option value="4">4th Year</Option>
                    <Option value="5">5th Year</Option>
                    <Option value="graduate">Graduate</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="graduationDate"
                  label="Expected Graduation Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select graduation date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    size="large"
                    picker="month"
                    placeholder="Select month and year"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "20px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Volunteer Preferences
            </h3>

            <Form.Item
              name="department"
              label="Preferred Department"
              rules={[
                { required: true, message: "Please select a department" },
              ]}
            >
              <Select
                placeholder="Select department"
                size="large"
                mode="multiple"
                maxTagCount={2}
              >
                {departments.map((dept) => (
                  <Option key={dept} value={dept}>
                    {dept}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="experienceLevel"
              label="Experience Level"
              rules={[
                {
                  required: true,
                  message: "Please select your experience level",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {experienceLevels.map((level) => (
                    <Radio key={level} value={level}>
                      {level}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="availability"
              label="Availability"
              rules={[
                { required: true, message: "Please select your availability" },
              ]}
            >
              <Checkbox.Group>
                <Row>
                  {availabilityOptions.map((option) => (
                    <Col
                      key={option}
                      xs={24}
                      sm={12}
                      style={{ marginBottom: "8px" }}
                    >
                      <Checkbox value={option}>{option}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="skills"
              label="Skills & Technologies"
              rules={[{ required: true, message: "Please list your skills" }]}
            >
              <TextArea
                rows={3}
                placeholder="e.g., React, Python, UI/UX Design, Content Writing, Event Planning..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="motivation"
              label="Why do you want to volunteer?"
              rules={[
                { required: true, message: "Please share your motivation" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Tell us what motivates you to join our tech community..."
                maxLength={1000}
                showCount
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "20px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Additional Information
            </h3>

            <Form.Item
              name="previousExperience"
              label="Previous Volunteer/Leadership Experience"
            >
              <TextArea
                rows={3}
                placeholder="Share any relevant experience..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Please accept the terms")),
                },
              ]}
            >
              <Checkbox>
                I agree to commit my time and effort to support the
                community&apos;s mission and activities.
              </Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              variant="primary"
              type="submit"
              loading={loading}
              className="w-full"
            >
              Submit Application
            </Button>
          </Form.Item>
        </Form>
        <Modal
          open={successModal}
          footer={null}
          closable={false}
          centered
          onCancel={() => setSuccessModal(false)}
        >
          <div className="flex flex-col items-center text-center py-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#22c55e" }}
            >
              <CheckOutlined style={{ fontSize: "40px", color: "white" }} />
            </div>

            <h2 className="text-2xl font-semibold mt-4">
              Application Submitted!
            </h2>

            <p className="mt-2 text-gray-600">
              Thank you for applying to volunteer with us. We&apos;ll review your
              application and get back to you soon.
            </p>
            <HeartFilled
              style={{ color: "#f43f5e", fontSize: "28px", marginTop: "10px" }}
            />
            <Button
              variant="primary"
              className="mt-6"
              onClick={() => setSuccessModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default VolunteerForm;
