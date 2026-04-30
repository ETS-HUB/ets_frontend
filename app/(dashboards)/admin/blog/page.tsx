"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Space,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button as CustomButton } from "@/app/components";

const { TextArea } = Input;
const { Option } = Select;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

const AdminBlogPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch {}
  };

  const fetchBlogs = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/blog?page=${page}&limit=${pagination.pageSize}`
      );
      const result = await response.json();

      setBlogs(result.data || []);
      setPagination({
        ...pagination,
        current: result.pagination.currentPage,
        total: result.pagination.totalItems,
      });
    } catch (error) {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete blog post");
      }

      toast.success("Blog post deleted successfully");
      fetchBlogs(pagination.current);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete blog post"
      );
    }
  };

  const handleTogglePublished = async (blog: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update blog post");
      }

      toast.success(
        `Blog post ${!blog.published ? "published" : "unpublished"} successfully`
      );
      fetchBlogs(pagination.current);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status"
      );
    }
  };

  const handleCreate = () => {
    setEditingBlog(null);
    form.resetFields();
    form.setFieldsValue({ published: false });
    setDrawerOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    form.setFieldsValue({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags ? blog.tags.join(", ") : "",
      published: blog.published,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = async (values: {
    title: string;
    excerpt?: string;
    content: string;
    category?: string;
    tags?: string;
    published: boolean;
  }) => {
    try {
      setSubmitting(true);

      const tagsArray = values.tags
        ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : [];

      const payload = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt || null,
        category: values.category || null,
        tags: tagsArray,
        published: values.published,
      };

      const url = editingBlog ? `/api/blog/${editingBlog.id}` : "/api/blog";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save blog post");
      }

      toast.success(
        `Blog post ${editingBlog ? "updated" : "created"} successfully`
      );
      setDrawerOpen(false);
      form.resetFields();
      fetchBlogs(pagination.current);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${editingBlog ? "update" : "create"} blog post`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: BlogPost) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          {record.excerpt && (
            <div className="text-sm text-gray-500 truncate max-w-xs">
              {record.excerpt}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string | null) =>
        category ? (
          <Tag color="purple">{category}</Tag>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[] | null) =>
        tags && tags.length > 0 ? (
          <Space size={[0, 4]} wrap>
            {tags.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            ))}
          </Space>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      render: (published: boolean, record: BlogPost) => (
        <Switch
          checked={published}
          onChange={() => handleTogglePublished(record)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
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
      render: (_: unknown, record: BlogPost) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/blog/${record.slug}`)}
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
            title="Delete blog post"
            description="Are you sure you want to delete this blog post?"
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#172554]">
              Blog Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage blog posts, categories, and authors
            </p>
          </div>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => fetchBlogs(pagination.current)}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="default"
              onClick={() => router.push("/admin/blog/categories")}
            >
              Manage Categories
            </Button>
            <Button
              type="default"
              onClick={() => router.push("/admin/blog/authors")}
            >
              Manage Authors
            </Button>
            <CustomButton variant="primary" onClick={handleCreate}>
              <PlusOutlined className="mr-2" />
              Create New Post
            </CustomButton>
          </Space>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total Posts</div>
          <div className="text-2xl font-bold text-gray-900">
            {pagination.total}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Published</div>
          <div className="text-2xl font-bold text-green-600">
            {blogs.filter((b) => b.published).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Drafts</div>
          <div className="text-2xl font-bold text-orange-500">
            {blogs.filter((b) => !b.published).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Categories</div>
          <div className="text-2xl font-bold text-blue-600">
            {categories.length}
          </div>
        </div>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        pagination={{
          ...pagination,
          onChange: (page) => fetchBlogs(page),
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} blog posts`,
        }}
        scroll={{ x: 1000 }}
      />

      <Drawer
        title={editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          form.resetFields();
          setEditingBlog(null);
        }}
        width={720}
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter blog title" }]}
          >
            <Input size="large" placeholder="Enter blog title..." />
          </Form.Item>

          <Form.Item name="excerpt" label="Excerpt (optional)">
            <TextArea
              rows={3}
              placeholder="Brief summary of the post..."
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <TextArea
              rows={10}
              placeholder="Write your blog content here..."
            />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select
              size="large"
              placeholder="Select a category"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.children as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.slug}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags (comma-separated)"
          >
            <Input
              size="large"
              placeholder="tech, tutorial, guide"
            />
          </Form.Item>

          <Form.Item
            name="published"
            label="Published"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end space-x-4">
              <CustomButton
                variant="gray"
                onClick={() => {
                  setDrawerOpen(false);
                  form.resetFields();
                  setEditingBlog(null);
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="primary"
                type="submit"
                loading={submitting}
              >
                {editingBlog ? "Update Post" : "Create Post"}
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminBlogPage;
