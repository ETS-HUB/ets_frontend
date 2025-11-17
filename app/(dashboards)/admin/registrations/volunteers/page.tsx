"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select, Modal } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft01Icon } from "hugeicons-react";

const { Option } = Select;

interface VolunteerApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  year: string;
  graduation_date: string;
  department: string[];
  experience_level: string;
  availability: string[];
  skills: string;
  motivation: string;
  previous_experience: string | null;
  terms_accepted: boolean;
  created_at: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const VolunteerApplicationsList = () => {
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [searchEmail, setSearchEmail] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<VolunteerApplication | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchApplications = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/register/volunteer?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        toast.error("Failed to fetch applications");
        throw new Error("Failed to fetch applications");
      }

      const result = await response.json();
      setApplications(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handlePageChange = (page: number, pageSize?: number) => {
    fetchApplications(page, pageSize || pagination.limit);
  };

  const handleRefresh = () => {
    fetchApplications(pagination.page, pagination.limit);
  };

  const showModal = (record: VolunteerApplication) => {
    setSelectedApplication(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesEmail = app.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    const matchesName = `${app.first_name} ${app.last_name}`
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || app.department.includes(filterDepartment);
    return (matchesEmail || matchesName) && matchesDepartment;
  });

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record: VolunteerApplication) => (
        <div>
          <div className="font-semibold">
            {record.first_name} {record.last_name}
          </div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
      width: 250,
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      width: 200,
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      width: 180,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 100,
    },
    {
      title: "Department",
      key: "department",
      render: (record: VolunteerApplication) => (
        <div className="flex flex-wrap gap-1">
          {record.department.map((dept, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {dept}
            </span>
          ))}
        </div>
      ),
      width: 250,
    },
    {
      title: "Experience",
      dataIndex: "experience_level",
      key: "experience_level",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Applied",
      key: "created_at",
      render: (record: VolunteerApplication) => (
        <span>
          {new Date(record.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      render: (record: VolunteerApplication) => (
        <Button
          type="link"
          onClick={() => showModal(record)}
          className="text-secondary!"
        >
          View Details
        </Button>
      ),
      width: 120,
    },
  ];

  return (
    <div>
      <Link
        href="/admin/registrations"
        className="text-secondary mb-4 flex items-center gap-2"
      >
        <ArrowLeft01Icon />
        <span>Back to Dashboard</span>
      </Link>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-[#172554] mb-2">
            Volunteer Applications
          </h1>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            Refresh
          </Button>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search by email or name"
            prefix={<SearchOutlined />}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ width: 300 }}
            size="large"
          />
          <Select
            value={filterDepartment}
            onChange={setFilterDepartment}
            style={{ width: 250 }}
            size="large"
          >
            <Option value="all">All Departments</Option>
            <Option value="Technical (Development)">
              Technical (Development)
            </Option>
            <Option value="Publicity & Promotion">Publicity & Promotion</Option>
            <Option value="Design (Graphic)">Design (Graphic)</Option>
            <Option value="Content & Social Media Management">
              Content & Social Media Management
            </Option>
            <Option value="Content Writing & Blogging">
              Content Writing & Blogging
            </Option>
            <Option value="Event Planning & Coordination">
              Event Planning & Coordination
            </Option>
            <Option value="Community Engagement and Management">
              Community Engagement and Management
            </Option>
            <Option value="Tech Instructors">Tech Instructors</Option>
            <Option value="Content Creation">Content Creation</Option>
          </Select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="bg-blue-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Total Applications: </span>
            <span className="font-semibold text-secondary">
              {pagination.total}
            </span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Filtered: </span>
            <span className="font-semibold text-green-600">
              {filteredApplications.length}
            </span>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredApplications}
        rowKey="id"
        scroll={{ x: "100%" }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: handlePageChange,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      <Modal
        title={
          <div className="text-xl font-semibold">
            {selectedApplication?.first_name} {selectedApplication?.last_name}
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedApplication && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedApplication.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedApplication.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">University</p>
                <p className="font-medium">{selectedApplication.university}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Major</p>
                <p className="font-medium">{selectedApplication.major}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{selectedApplication.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Graduation Date</p>
                <p className="font-medium">
                  {new Date(
                    selectedApplication.graduation_date
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Department(s)</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedApplication.department.map((dept, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Experience Level</p>
                <p className="font-medium">
                  {selectedApplication.experience_level}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedApplication.availability.map((avail, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                    >
                      {avail}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Skills</p>
              <p className="font-medium">{selectedApplication.skills}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Motivation</p>
              <p className="font-medium">{selectedApplication.motivation}</p>
            </div>

            {selectedApplication.previous_experience && (
              <div>
                <p className="text-sm text-gray-500">Previous Experience</p>
                <p className="font-medium">
                  {selectedApplication.previous_experience}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div>
                <p className="text-sm text-gray-500">Terms Accepted</p>
                <p className="font-medium">
                  {selectedApplication.terms_accepted ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="font-medium">
                  {new Date(selectedApplication.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VolunteerApplicationsList;
