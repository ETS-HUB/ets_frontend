"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Select, Tag, Spin, Modal } from "antd";
import { ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react";
import toast from "react-hot-toast";

const { Option } = Select;

interface JobApplication {
  id: string;
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
  job_id: string;
  job_title?: string;
}

const JobApplicationsList = () => {
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loadingJobDetails, setLoadingJobDetails] = useState(false);
  const [data, setData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page: number = 1) => {
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
        `/api/jobs/applications?${params.toString()}`
      );
      const result = await response.json();

      setData(result.data);
      setPagination({
        ...pagination,
        current: result.pagination.page,
        total: result.pagination.total,
      });
    } catch (error) {
      toast.error("Failed to load job applications");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async (jobId: string) => {
    setLoadingJobDetails(true);
    try {
      const response = await fetch(`/api/jobs/slug?id=${jobId}`);
      const result = await response.json();
      setJobDetails(result.data);
    } catch (error) {
      toast.error("Failed to load job details");
    } finally {
      setLoadingJobDetails(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const showModal = async (record: JobApplication) => {
    setSelectedApplication(record);
    setIsModalVisible(true);
    await fetchJobDetails(record.job_id);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
    setJobDetails(null);
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
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      className: "capitalize",
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Applied",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: unknown, record: JobApplication) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showModal(record)}
          className="text-secondary!"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/registrations"
          className="text-secondary mb-4 flex items-center gap-2"
        >
          <ArrowLeft01Icon />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#172554] mb-2">
              Job Applications
            </h1>
            <p className="text-gray-600 mt-1">
              Total: {pagination.total} applications
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchData(pagination.current)}
            loading={loading}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="mb-4 flex gap-4">
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
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: "100%" }}
        pagination={{
          ...pagination,
          onChange: (page) => fetchData(page),
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
          <Spin spinning={loadingJobDetails}>
            <div className="space-y-5">
              {jobDetails && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-base font-semibold text-gray-700 mb-3">
                    Applied Position
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="font-semibold text-lg">
                        {jobDetails.title}
                      </p>
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
                    <p className="font-medium">
                      {selectedApplication.full_name}
                    </p>
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

              {(selectedApplication.university ||
                selectedApplication.major ||
                selectedApplication.year_of_study ||
                selectedApplication.graduation_date) && (
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
                        <p className="font-medium">
                          {selectedApplication.major}
                        </p>
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
                        className="font-medium text-secondary hover:underline break-all"
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
                        className="font-medium text-secondary hover:underline break-all"
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
                        className="font-medium text-secondary hover:underline break-all"
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
                        className="font-medium text-secondary hover:underline"
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
                      <p className="text-sm text-gray-500 mb-1">
                        Why Interested
                      </p>
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
          </Spin>
        )}
      </Modal>
    </>
  );
};

export default JobApplicationsList;
