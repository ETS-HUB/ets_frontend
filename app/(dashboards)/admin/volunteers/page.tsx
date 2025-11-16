"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Image,
  InputNumber,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import toast from "react-hot-toast";

import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

interface Volunteer {
  id: number;
  name: string;
  role: string;
  specialty: string;
  additionalInfo: string;
  bio: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  email?: string;
  years_of_experience?: number;
  passionate_about?: string[];
  core_strengths?: string[];
  personal_motto?: string;
  fun_fact?: string;
}

const AdminVolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<Volunteer | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/volunteers");
      if (!response.ok) throw new Error("Failed to fetch volunteers");
      const data = await response.json();
      setVolunteers(data);
    } catch (error) {
      toast.error("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image uploaded successfully!");
        return data.secure_url;
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
    return null;
  };

  const showAddModal = () => {
    setEditingVolunteer(null);
    setImageUrl("");
    form.resetFields();
    setIsModalOpen(true);
  };

  const showEditModal = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setImageUrl(volunteer.image || "");
    form.setFieldsValue({
      name: volunteer.name,
      role: volunteer.role,
      specialty: volunteer.specialty,
      additionalInfo: volunteer.additionalInfo,
      bio: volunteer.bio,
      twitter: volunteer.twitter || "",
      instagram: volunteer.instagram || "",
      linkedin: volunteer.linkedin || "",
      github: volunteer.github || "",
      portfolio: volunteer.portfolio || "",
      email: volunteer.email || "",
      years_of_experience: volunteer.years_of_experience || 0,
      passionate_about: volunteer.passionate_about || [],
      core_strengths: volunteer.core_strengths || [],
      personal_motto: volunteer.personal_motto || "",
      fun_fact: volunteer.fun_fact || "",
    });
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingVolunteer(null);
    setImageUrl("");
    form.resetFields();
  };

  const showDeleteModal = (volunteer: Volunteer) => {
    setVolunteerToDelete(volunteer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setVolunteerToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!volunteerToDelete) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/volunteers/${volunteerToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete volunteer");

      toast.success("Volunteer deleted successfully");
      fetchVolunteers();
      handleDeleteCancel();
    } catch (error) {
      toast.error("Failed to delete volunteer");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!imageUrl && !editingVolunteer?.image) {
      toast.error("Please upload a profile image");
      return;
    }

    try {
      setSubmitting(true);

      const volunteerData = {
        name: values.name,
        role: values.role,
        specialty: values.specialty,
        additionalInfo: values.additionalInfo,
        bio: values.bio,
        image: imageUrl || editingVolunteer?.image,
        twitter: values.twitter?.trim() || "",
        instagram: values.instagram?.trim() || "",
        linkedin: values.linkedin?.trim() || "",
        github: values.github?.trim() || "",
        portfolio: values.portfolio?.trim() || "",
        email: values.email?.trim() || "",
        years_of_experience: values.years_of_experience || 0,
        passionate_about: values.passionate_about || [],
        core_strengths: values.core_strengths || [],
        personal_motto: values.personal_motto?.trim() || "",
        fun_fact: values.fun_fact?.trim() || "",
      };

      const url = editingVolunteer
        ? `/api/volunteers/${editingVolunteer.id}`
        : "/api/volunteers";
      const method = editingVolunteer ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerData),
      });

      if (!response.ok) {
        throw new Error("Failed to save volunteer");
      }

      toast.success(
        `Volunteer ${editingVolunteer ? "updated" : "created"} successfully!`
      );
      handleModalCancel();
      fetchVolunteers();
    } catch (error: any) {
      toast.error(error.message || "Failed to save volunteer");
    } finally {
      setSubmitting(false);
    }
  };

  const columns: ColumnsType<Volunteer> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image: string, record) => (
        <Image
          src={image}
          alt={record.name}
          width={50}
          height={50}
          className="rounded-full object-cover"
          preview={false}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Experience",
      dataIndex: "years_of_experience",
      key: "years_of_experience",
      width: 120,
      render: (years: number) => (years ? `${years} years` : "N/A"),
      sorter: (a, b) =>
        (a.years_of_experience || 0) - (b.years_of_experience || 0),
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className="text-secondary!"
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteModal(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="md:text-3xl text-2xl font-bold text-[#172554] mb-2">
            Volunteers
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all ETS volunteers and team members.
          </p>
        </div>
        <CustomButton variant="primary" onClick={showAddModal}>
          <PlusOutlined /> <span className="ml-2">Add Volunteer</span>
        </CustomButton>
      </div>

      <Table
        columns={columns}
        dataSource={volunteers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} volunteers`,
        }}
      />

      <Modal
        title={editingVolunteer ? "Edit Volunteer" : "Add New Volunteer"}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
        width={700}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Basic Information
            </h3>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter volunteer name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="e.g., Joshua Adewale" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="e.g., joshua@example.com" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[
                { required: true, message: "Please enter role" },
                { min: 2, message: "Role must be at least 2 characters" },
              ]}
            >
              <Input placeholder="e.g., Vice President & Creative Lead" />
            </Form.Item>

            <Form.Item
              label="Specialty"
              name="specialty"
              rules={[{ required: true, message: "Please enter specialty" }]}
            >
              <Input placeholder="e.g., Brand Design" />
            </Form.Item>

            <Form.Item
              label="Additional Info"
              name="additionalInfo"
              rules={[
                { required: true, message: "Please enter additional info" },
              ]}
            >
              <Input placeholder="e.g., Creative Graphic Designer at Ekesquare" />
            </Form.Item>

            <Form.Item
              label="Years of Experience"
              name="years_of_experience"
              rules={[
                {
                  required: true,
                  message: "Please enter years of experience",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={50}
                style={{ width: "100%" }}
                placeholder="e.g., 5"
              />
            </Form.Item>

            <Form.Item
              label="Bio"
              name="bio"
              rules={[
                { required: true, message: "Please enter bio" },
                { min: 10, message: "Bio must be at least 10 characters" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Brief biography of the volunteer..."
              />
            </Form.Item>

            <Form.Item label="Profile Image" required>
              <Upload
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    message.error("You can only upload image files!");
                    return false;
                  }

                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error("Image must be smaller than 5MB!");
                    return false;
                  }

                  handleImageUpload(file);
                  return false;
                }}
                maxCount={1}
                listType="picture-card"
                showUploadList={false}
              >
                {imageUrl || editingVolunteer?.image ? (
                  <Image
                    width={104}
                    height={104}
                    src={imageUrl || editingVolunteer?.image}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    preview={false}
                  />
                ) : (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              {uploading && (
                <p className="text-secondary mt-2 text-sm">Uploading image...</p>
              )}
            </Form.Item>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Personal Details
            </h3>

            <Form.Item
              label="Passionate About"
              name="passionate_about"
              tooltip="Add interests or areas of passion (e.g., UI/UX Design, Community Growth)"
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Type and press Enter to add"
                tokenSeparators={[","]}
              />
            </Form.Item>

            <Form.Item
              label="Core Strengths"
              name="core_strengths"
              tooltip="Add key strengths (e.g., Leadership, Creativity, Strategy)"
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Type and press Enter to add"
                tokenSeparators={[","]}
              />
            </Form.Item>

            <Form.Item
              label="Personal Motto"
              name="personal_motto"
              tooltip="A quote or motto that represents them"
            >
              <Input placeholder='e.g., "Design with empathy."' />
            </Form.Item>

            <Form.Item
              label="Fun Fact"
              name="fun_fact"
              tooltip="An interesting fact about them"
            >
              <Input placeholder='e.g., "Coffee fuels my creativity."' />
            </Form.Item>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Links & Social Media
            </h3>

            <Form.Item
              label="Portfolio"
              name="portfolio"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input placeholder="https://portfolio.com" />
            </Form.Item>

            <Form.Item
              label="Twitter"
              name="twitter"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input placeholder="https://twitter.com/username" />
            </Form.Item>

            <Form.Item
              label="Instagram"
              name="instagram"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input placeholder="https://instagram.com/username" />
            </Form.Item>

            <Form.Item
              label="LinkedIn"
              name="linkedin"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input placeholder="https://linkedin.com/in/username" />
            </Form.Item>

            <Form.Item
              label="GitHub"
              name="github"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input placeholder="https://github.com/username" />
            </Form.Item>
          </div>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <CustomButton
                variant="primary"
                width="full"
                className="w-full md:w-auto bg-transparent text-lightgray"
                onClick={handleModalCancel}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                type="submit"
                loading={submitting || uploading}
                disabled={uploading}
              >
                {editingVolunteer ? "Update" : "Create"}
              </CustomButton>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-red-500 text-xl" />
            <span>Delete Volunteer</span>
          </div>
        }
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={deleteLoading}
            onClick={handleDeleteConfirm}
          >
            Yes, Delete
          </Button>,
        ]}
        centered
      >
        <div className="py-4">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{volunteerToDelete?.name}</span>?
          </p>
          <p className="text-gray-500 text-sm">
            This action cannot be undone. All information about this volunteer
            will be permanently removed.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminVolunteersPage;
