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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react";

import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blog/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    form.resetFields();
    setDrawerOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete category");
      }

      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete category"
      );
    }
  };

  const handleSubmit = async (values: { name: string; description?: string }) => {
    try {
      setSubmitting(true);

      const payload = {
        name: values.name,
        description: values.description || null,
      };

      const url = editingCategory
        ? `/api/blog/categories/${editingCategory.id}`
        : "/api/blog/categories";
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save category");
      }

      toast.success(
        `Category ${editingCategory ? "updated" : "created"} successfully`
      );
      setDrawerOpen(false);
      form.resetFields();
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${editingCategory ? "update" : "create"} category`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-semibold text-gray-900">{text}</span>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc: string | null) =>
        desc ? (
          <span className="text-gray-600">{desc}</span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_: unknown, record: Category) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete category"
            description="Are you sure you want to delete this category?"
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
              Blog Categories
            </h1>
            <p className="text-gray-500 mt-1">
              Manage categories for blog posts
            </p>
          </div>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchCategories}
              loading={loading}
            >
              Refresh
            </Button>
            <CustomButton variant="primary" onClick={handleCreate}>
              <PlusOutlined className="mr-2" />
              Add Category
            </CustomButton>
          </Space>
        </div>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} categories`,
        }}
      />

      <Drawer
        title={editingCategory ? "Edit Category" : "Add New Category"}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          form.resetFields();
          setEditingCategory(null);
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
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter category name" },
            ]}
          >
            <Input size="large" placeholder="e.g., Technology" />
          </Form.Item>

          <Form.Item name="description" label="Description (optional)">
            <TextArea
              rows={3}
              placeholder="Brief description of this category..."
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end space-x-4">
              <CustomButton
                variant="gray"
                onClick={() => {
                  setDrawerOpen(false);
                  form.resetFields();
                  setEditingCategory(null);
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                type="submit"
                loading={submitting}
              >
                {editingCategory ? "Update" : "Create"}
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminCategoriesPage;
