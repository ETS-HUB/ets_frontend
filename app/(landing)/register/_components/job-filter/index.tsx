import React from "react";
import { Input, Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface JobFilterProps {
  onSearch?: (value: string) => void;
  onJobTypeChange?: (value: string) => void;
  onExperienceChange?: (value: string) => void;
  onIndustryChange?: (value: string) => void;
}

export const JobFilter: React.FC<JobFilterProps> = ({
  onSearch,
  onJobTypeChange,
  onExperienceChange,
  onIndustryChange,
}) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        marginBottom: "24px",
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={12} lg={8}>
          <Input
            size="large"
            placeholder="Search by title or company name"
            prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
            onChange={(e) => onSearch?.(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          />
        </Col>

        <Col xs={24} sm={8} md={8} lg={5}>
          <Select
            size="large"
            placeholder="Job type"
            style={{ width: "100%", borderRadius: "8px" }}
            onChange={onJobTypeChange}
            suffixIcon={<span style={{ color: "#94a3b8" }}>▼</span>}
          >
            <Option value="all">All Types</Option>
            <Option value="full-time">Full-time</Option>
            <Option value="part-time">Part-time</Option>
            <Option value="internship">Internship</Option>
            <Option value="contract">Contract</Option>
          </Select>
        </Col>

        <Col xs={24} sm={8} md={8} lg={5}>
          <Select
            size="large"
            placeholder="Experience"
            style={{ width: "100%", borderRadius: "8px" }}
            onChange={onExperienceChange}
            suffixIcon={<span style={{ color: "#94a3b8" }}>▼</span>}
          >
            <Option value="all">All Levels</Option>
            <Option value="entry">Entry Level</Option>
            <Option value="mid">Mid Level</Option>
            <Option value="senior">Senior Level</Option>
          </Select>
        </Col>

        <Col xs={24} sm={8} md={8} lg={6}>
          <Select
            size="large"
            placeholder="Industry"
            style={{ width: "100%", borderRadius: "8px" }}
            onChange={onIndustryChange}
            suffixIcon={<span style={{ color: "#94a3b8" }}>▼</span>}
          >
            <Option value="all">All Industries</Option>
            <Option value="tech">Technology</Option>
            <Option value="finance">Finance</Option>
            <Option value="healthcare">Healthcare</Option>
            <Option value="education">Education</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default JobFilter;
