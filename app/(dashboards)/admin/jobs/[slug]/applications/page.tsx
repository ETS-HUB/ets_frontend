"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Select, Tag, Modal } from "antd";
import {
  ReloadOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const { Option } = Select;

interface JobApplication {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  university?: string;
  major?: string;
  year_of_study?: string;
  graduation_date?: string;
  resume_url?: string | null;
  cover_letter?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  why_interested?: string;
  relevant_experience?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface JobDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  slug: string;
}

const AdminJobApplications = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [data, setData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`/api/jobs/${slug}`);
      const result = await response.json();
      setJobDetails(result.data);
    } catch (error) {
      toast.error("Failed to load job details");
    }
  };

  const fetchApplications = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.pageSize.toString(),
      });

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const response = await fetch(
        `/api/jobs/${slug}/apply?${params.toString()}`
      );
      const result = await response.json();

      setData(result.data);
      setPagination({
        ...pagination,
        current: result.pagination.page,
        total: result.pagination.total,
      });
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id: string, name: string) => {
    setApplicationToDelete({ id, name });
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!applicationToDelete) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(
        `/api/jobs/${slug}/apply?id=${applicationToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Application deleted successfully");
        setDeleteModalVisible(false);
        setApplicationToDelete(null);
        fetchApplications(pagination.current);
      } else {
        const result = await response.json();
        toast.error(result.error || "Failed to delete application");
      }
    } catch (error) {
      toast.error("Failed to delete application");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setApplicationToDelete(null);
  };

  useEffect(() => {
    if (slug) {
      fetchJobDetails();
      fetchApplications();
    }
  }, [slug, statusFilter]);

  const showModal = (record: JobApplication) => {
    setSelectedApplication(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "reviewed":
        return "blue";
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Applicant",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string, record: JobApplication) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
          <div className="text-sm text-gray-500">{record.phone}</div>
        </div>
      ),
      width: 250,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      className: "capitalize",
      width: 120,
    },
    {
      title: "Education",
      key: "education",
      render: (_text: unknown, record: JobApplication) => (
        <div>
          {record.university && (
            <div className="text-sm text-gray-900">{record.university}</div>
          )}
          {record.major && (
            <div className="text-sm text-gray-500">{record.major}</div>
          )}
          {record.year_of_study && (
            <Tag className="mt-1">{record.year_of_study}</Tag>
          )}
        </div>
      ),
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      width: 120,
    },
    {
      title: "Applied",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      render: (_text: unknown, record: JobApplication) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
            className="text-secondary!"
          >
            View
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.id, record.full_name)}
          >
            Delete
          </Button>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className="mb-4"
        >
          Back
        </Button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#172554] mb-2">
              {jobDetails
                ? `Applications: ${jobDetails.title}`
                : "Job Applications"}
            </h1>
            {jobDetails && (
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{jobDetails.location}</span>
                <span>{jobDetails.company}</span>
                <span>{jobDetails.job_type}</span>
              </div>
            )}
            <p className="text-gray-600 mt-2">
              Total: {pagination.total} applications
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchApplications(pagination.current)}
            loading={loading}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="mb-4 flex gap-4 items-center">
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 200 }}
          size="large"
        >
          <Option value="all">All Status</Option>
          <Option value="pending">Pending</Option>
          <Option value="reviewed">Reviewed</Option>
          <Option value="accepted">Accepted</Option>
          <Option value="rejected">Rejected</Option>
        </Select>

        <div className="flex gap-3">
          <div className="bg-orange-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Pending: </span>
            <span className="font-semibold text-orange-600">
              {data.filter((app) => app.status === "pending").length}
            </span>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Reviewed: </span>
            <span className="font-semibold text-blue-600">
              {data.filter((app) => app.status === "reviewed").length}
            </span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Accepted: </span>
            <span className="font-semibold text-green-600">
              {data.filter((app) => app.status === "accepted").length}
            </span>
          </div>
        </div>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          ...pagination,
          onChange: (page) => fetchApplications(page),
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Modal
        title={
          <div className="text-xl font-semibold text-gray-900">
            Application Details
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={900}
      >
        {selectedApplication && (
          <div className="space-y-5">
            {jobDetails && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Applied Position
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Job Title</p>
                    <p className="font-semibold text-lg">{jobDetails.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{jobDetails.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{jobDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium capitalize">
                      {jobDetails.job_type}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Applicant Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedApplication.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium capitalize">
                    {selectedApplication.location}
                  </p>
                </div>
              </div>
            </div>

            {(selectedApplication.university || selectedApplication.major) && (
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                  Education
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedApplication.university && (
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-medium">
                        {selectedApplication.university}
                      </p>
                    </div>
                  )}
                  {selectedApplication.major && (
                    <div>
                      <p className="text-sm text-gray-500">Major</p>
                      <p className="font-medium">{selectedApplication.major}</p>
                    </div>
                  )}
                  {selectedApplication.year_of_study && (
                    <div>
                      <p className="text-sm text-gray-500">Year of Study</p>
                      <p className="font-medium">
                        {selectedApplication.year_of_study}
                      </p>
                    </div>
                  )}
                  {selectedApplication.graduation_date && (
                    <div>
                      <p className="text-sm text-gray-500">Graduation Date</p>
                      <p className="font-medium">
                        {new Date(
                          selectedApplication.graduation_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Online Presence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedApplication.linkedin && (
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <Link
                      href={selectedApplication.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {selectedApplication.linkedin}
                    </Link>
                  </div>
                )}
                {selectedApplication.github && (
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <Link
                      href={selectedApplication.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {selectedApplication.github}
                    </Link>
                  </div>
                )}
                {selectedApplication.portfolio && (
                  <div>
                    <p className="text-sm text-gray-500">Portfolio</p>
                    <Link
                      href={selectedApplication.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {selectedApplication.portfolio}
                    </Link>
                  </div>
                )}
                {selectedApplication.resume_url && (
                  <div>
                    <p className="text-sm text-gray-500">Resume</p>
                    <Link
                      href={selectedApplication.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View Resume
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Application Details
              </h3>
              <div className="space-y-3">
                {selectedApplication.why_interested && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Why Interested</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedApplication.why_interested}
                    </p>
                  </div>
                )}
                {selectedApplication.relevant_experience && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Relevant Experience
                    </p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedApplication.relevant_experience}
                    </p>
                  </div>
                )}
                {selectedApplication.cover_letter && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cover Letter</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedApplication.cover_letter}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Application Status
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <Tag
                    color={getStatusColor(selectedApplication.status)}
                    className="mt-1"
                  >
                    {selectedApplication.status.toUpperCase()}
                  </Tag>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p className="font-medium">
                    {new Date(
                      selectedApplication.created_at
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Delete Application"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
        okText={deleteLoading ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        okButtonProps={{ danger: true, loading: deleteLoading }}
        cancelButtonProps={{ disabled: deleteLoading }}
      >
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete the application from{" "}
            <span className="font-semibold">{applicationToDelete?.name}</span>?
          </p>
          <p className="text-red-600 mt-2">This action cannot be undone.</p>
        </div>
      </Modal>
    </>
  );
};

export default AdminJobApplications;
