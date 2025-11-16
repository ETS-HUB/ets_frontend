"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Tag, Modal } from "antd";
import { SearchOutlined, ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import toast from "react-hot-toast";

interface CommunityMember {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  profile_photo_url: string | null;
  status: string;
  institution: string;
  field_of_study: string;
  experience_level: string;
  interests: string[];
  goals: string[];
  bio: string;
  linkedin: string;
  github: string;
  twitter: string;
  portfolio: string;
  referral_source: string;
  created_at: string;
  updated_at: string;
}

const CommunityApplicationList = () => {
  const [data, setData] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/register/community?page=${page}&limit=${pagination.pageSize}`
      );
      const result = await response.json();

      setData(result.data);
      setPagination({
        ...pagination,
        current: result.pagination.page,
        total: result.pagination.total,
      });
    } catch (error) {
      toast.error("Failed to load community members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (record: CommunityMember) => {
    setSelectedMember(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedMember(null);
  };

  const filteredData = data.filter(
    (member) =>
      member.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
      member.full_name.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string, record: CommunityMember) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "student" ? "blue" : "green"}>
          {status.replace("_", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Institution",
      dataIndex: "institution",
      key: "institution",
    },
    {
      title: "Experience",
      dataIndex: "experience_level",
      key: "experience_level",
      render: (level: string) => <span className="capitalize">{level}</span>,
    },
    {
      title: "Interests",
      dataIndex: "interests",
      key: "interests",
      render: (interests: string[]) => (
        <div className="flex flex-wrap gap-1">
          {interests.slice(0, 2).map((interest, idx) => (
            <Tag key={idx} className="text-xs">
              {interest}
            </Tag>
          ))}
          {interests.length > 2 && (
            <Tag className="text-xs">+{interests.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Joined",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: unknown, record: CommunityMember) => (
        <Button
          type="link"
          className="text-secondary!"
          icon={<EyeOutlined />}
          onClick={() => showModal(record)}
        >
          View details
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <div>
        <div className="mb-6">
          <Link
            href="/admin/registrations"
            className="text-secondary mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#172554]">
                Community Members
              </h1>
              <p className="text-gray-500 mt-1">
                Total: {pagination.total} members
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
          <Input
            placeholder="Search by email or name"
            prefix={<SearchOutlined />}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ width: 300 }}
            size="large"
            className="mt-4 mb-3"
          />
        </div>

          <Table
            loading={loading}
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              ...pagination,
              onChange: (page) => fetchData(page),
            }}
            scroll={{ x: 1200 }}
          />
      </div>

      <Modal
        title={
          <div className="text-xl font-semibold text-gray-900">
            {selectedMember?.full_name}
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedMember && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedMember.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedMember.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{selectedMember.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Tag
                    color={
                      selectedMember.status === "student" ? "blue" : "green"
                    }
                  >
                    {selectedMember.status.replace("_", " ").toUpperCase()}
                  </Tag>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Education & Experience
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Institution</p>
                  <p className="font-medium">{selectedMember.institution}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Field of Study</p>
                  <p className="font-medium">{selectedMember.field_of_study}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="font-medium capitalize">
                    {selectedMember.experience_level}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Interests & Goals
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.interests.map((interest, idx) => (
                      <Tag key={idx} color="blue">
                        {interest}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.goals.map((goal, idx) => (
                      <Tag key={idx} color="green">
                        {goal}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedMember.bio && (
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                  Bio
                </h3>
                <p className="text-gray-700">{selectedMember.bio}</p>
              </div>
            )}

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Social Profiles
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedMember.linkedin && (
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <p className="font-medium text-blue-600 break-all">
                      {selectedMember.linkedin}
                    </p>
                  </div>
                )}
                {selectedMember.github && (
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="font-medium text-blue-600 break-all">
                      {selectedMember.github}
                    </p>
                  </div>
                )}
                {selectedMember.twitter && (
                  <div>
                    <p className="text-sm text-gray-500">Twitter</p>
                    <p className="font-medium text-blue-600 break-all">
                      {selectedMember.twitter}
                    </p>
                  </div>
                )}
                {selectedMember.portfolio && (
                  <div>
                    <p className="text-sm text-gray-500">Portfolio</p>
                    <Link
                      href={selectedMember.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {selectedMember.portfolio}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
                Additional Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Referral Source</p>
                  <p className="font-medium capitalize">
                    {selectedMember.referral_source}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">
                    {new Date(selectedMember.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommunityApplicationList;
