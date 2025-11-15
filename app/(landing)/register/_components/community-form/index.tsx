"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Upload,
  message,
  Card,
  Row,
  Button,
  Col,
  Space,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
  TwitterOutlined,
  UploadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;
const { Option } = Select;

const CommunityForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form values:", values);
      message.success(
        "Welcome to the community! Check your email for next steps."
      );
      form.resetFields();
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const interests = [
    "Web Development",
    "Mobile Development",
    "Data Science & AI",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Blockchain",
    "Game Development",
    "IoT",
  ];

  const goals = [
    "Learn new skills",
    "Build projects",
    "Network with peers",
    "Find mentorship",
    "Career opportunities",
    "Contribute to open source",
  ];

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return false;
    },
    maxCount: 1,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
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
              Basic Information
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
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="John Doe"
                    size="large"
                  />
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
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="john.doe@university.edu"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
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
              <Col xs={24} md={12}>
                <Form.Item
                  name="location"
                  label="Location (City, State)"
                  rules={[
                    { required: true, message: "Please enter your location" },
                  ]}
                >
                  <Input
                    prefix={<GlobalOutlined />}
                    placeholder="Lagos, Nigeria"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="profilePhoto" label="Profile Photo (Optional)">
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />} size="large">
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>

          {/* Professional Background */}
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
              Professional Background
            </h3>

            <Form.Item
              name="status"
              label="Current Status"
              rules={[{ required: true, message: "Please select your status" }]}
            >
              <Radio.Group size="large">
                <Space direction="vertical">
                  <Radio value="student">Student</Radio>
                  <Radio value="recent_graduate">Recent Graduate</Radio>
                  <Radio value="professional">Working Professional</Radio>
                  <Radio value="career_switcher">Career Switcher</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="institution"
                  label="University/Company"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your institution",
                    },
                  ]}
                >
                  <Input
                    placeholder="University of Lagos / Tech Company"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="fieldOfStudy"
                  label="Field of Study/Work"
                  rules={[
                    { required: true, message: "Please enter your field" },
                  ]}
                >
                  <Input
                    placeholder="Computer Science / Software Engineering"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="experienceLevel"
              label="Tech Experience Level"
              rules={[
                {
                  required: true,
                  message: "Please select your experience level",
                },
              ]}
            >
              <Select placeholder="Select your experience level" size="large">
                <Option value="beginner">Beginner (Just starting out)</Option>
                <Option value="intermediate">Intermediate (1-2 years)</Option>
                <Option value="advanced">Advanced (3+ years)</Option>
                <Option value="expert">Expert (5+ years)</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Interests & Goals */}
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
              Interests & Goals
            </h3>

            <Form.Item
              name="interests"
              label="Areas of Interest"
              rules={[
                {
                  required: true,
                  message: "Please select at least one interest",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select your interests"
                size="large"
                maxTagCount={3}
              >
                {interests.map((interest) => (
                  <Option key={interest} value={interest}>
                    {interest}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="goals"
              label="What do you hope to achieve in this community?"
              rules={[
                { required: true, message: "Please select at least one goal" },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select your goals"
                size="large"
                maxTagCount={3}
              >
                {goals.map((goal) => (
                  <Option key={goal} value={goal}>
                    {goal}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="bio"
              label="Tell us about yourself"
              rules={[{ required: true, message: "Please write a short bio" }]}
            >
              <TextArea
                rows={4}
                placeholder="Share your journey, what you're currently working on, or what excites you about technology..."
                maxLength={500}
                showCount
              />
            </Form.Item>
          </div>

          {/* Social Links */}
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
              Social Links (Optional)
            </h3>

            <Form.Item name="linkedin" label="LinkedIn Profile">
              <Input
                prefix={<LinkedinOutlined />}
                placeholder="https://linkedin.com/in/yourprofile"
                size="large"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="github" label="GitHub Username">
                  <Input
                    prefix={<GithubOutlined />}
                    placeholder="yourusername"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="twitter" label="Twitter/X Handle">
                  <Input
                    prefix={<TwitterOutlined />}
                    placeholder="@yourusername"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="portfolio" label="Portfolio/Website">
              <Input
                prefix={<GlobalOutlined />}
                placeholder="https://yourportfolio.com"
                size="large"
              />
            </Form.Item>
          </div>

          {/* How did you hear about us */}
          <div style={{ marginBottom: "32px" }}>
            <Form.Item
              name="referralSource"
              label="How did you hear about us?"
              rules={[
                { required: true, message: "Please tell us how you found us" },
              ]}
            >
              <Select placeholder="Select an option" size="large">
                <Option value="social_media">Social Media</Option>
                <Option value="friend">Friend or Colleague</Option>
                <Option value="campus_event">Campus Event</Option>
                <Option value="website">Website</Option>
                <Option value="newsletter">Newsletter</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </div>

          <Divider />

          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#475569",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              By submitting this form, you agree to receive communications from
              our community including event updates, newsletters, and
              opportunities. You can unsubscribe at any time.
            </p>
          </div>

          <Form.Item>
            <CustomButton
              variant="primary"
              type="submit"
              loading={loading}
              className="w-full"
            >
              Join the Community
            </CustomButton>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CommunityForm;
