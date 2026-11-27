"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Popconfirm,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react";
import dayjs from "dayjs";

import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;

interface Author {
  id: string;
  user_id: string | null;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  created_at: string;
}

const AdminAuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blog/authors");
      if (!response.ok) throw new Error("Failed to fetch authors");
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      toast.error("Failed to load authors");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAuthor(null);
    form.resetFields();
    setDrawerOpen(true);
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    form.setFieldsValue({
      display_name: author.display_name,
      email: author.email,
      bio: author.bio,
      avatar_url: author.avatar_url,
    });
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/authors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete author");
      }

      toast.success("Author deleted successfully");
      fetchAuthors();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete author"
      );
    }
  };

  const handleSubmit = async (values: {
    display_name: string;
    email?: string;
    bio?: string;
    avatar_url?: string;
  }) => {
    try {
      setSubmitting(true);

      const payload = {
        display_name: values.display_name,
        email: values.email || null,
        bio: values.bio || null,
        avatar_url: values.avatar_url || null,
      };

      const url = editingAuthor
        ? `/api/blog/authors/${editingAuthor.id}`
        : "/api/blog/authors";
      const method = editingAuthor ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save author");
      }

      toast.success(
        `Author ${editingAuthor ? "updated" : "created"} successfully`
      );
      setDrawerOpen(false);
      form.resetFields();
      setEditingAuthor(null);
      fetchAuthors();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${editingAuthor ? "update" : "create"} author`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Author",
      dataIndex: "display_name",
      key: "display_name",
      render: (text: string, record: Author) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.avatar_url}
            icon={!record.avatar_url ? <UserOutlined /> : undefined}
            size={40}
          />
          <div>
            <div className="font-semibold text-gray-900">{text}</div>
            {record.email && (
              <div className="text-sm text-gray-500">{record.email}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
      render: (bio: string | null) =>
        bio ? (
          <span className="text-gray-600 truncate max-w-xs block">
            {bio}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => dayjs(date).format("MMM D, YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_: unknown, record: Author) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete author"
            description="Are you sure you want to delete this author?"
            onConfirm={() => handleDelete(record.id)}
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
      <div className="mb-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft01Icon className="w-5 h-5" />
          Back to Blog
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#172554]">
              Blog Authors
            </h1>
            <p className="text-gray-500 mt-1">
              Manage author profiles for blog posts. Authors are linked to
              authenticated user accounts.
            </p>
          </div>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchAuthors}
              loading={loading}
            >
              Refresh
            </Button>
            <CustomButton variant="primary" onClick={handleCreate}>
              <PlusOutlined className="mr-2" />
              Add Author
            </CustomButton>
          </Space>
        </div>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={authors}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} authors`,
        }}
      />

      <Drawer
        title={editingAuthor ? "Edit Author" : "Add New Author"}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          form.resetFields();
          setEditingAuthor(null);
        }}
        width={480}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="display_name"
            label="Display Name"
            rules={[
              { required: true, message: "Please enter the author's display name" },
            ]}
          >
            <Input size="large" placeholder="e.g., John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input size="large" placeholder="e.g., john@example.com" />
          </Form.Item>

          <Form.Item name="bio" label="Bio (optional)">
            <TextArea
              rows={3}
              placeholder="A short bio about the author..."
            />
          </Form.Item>

          <Form.Item name="avatar_url" label="Avatar URL (optional)">
            <Input
              size="large"
              placeholder="https://example.com/avatar.jpg"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end space-x-4">
              <CustomButton
                variant="gray"
                onClick={() => {
                  setDrawerOpen(false);
                  form.resetFields();
                  setEditingAuthor(null);
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                type="submit"
                loading={submitting}
              >
                {editingAuthor ? "Update" : "Create"}
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminAuthorsPage;
