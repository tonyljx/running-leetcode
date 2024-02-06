import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React from "react";

type Props = {};

export default function MyTimeLine({}: Props) {
  const items = [
    {
      children: (
        <div>
          <span>2024-02-04</span> <p>初始版本 收录牛客101</p>{" "}
        </div>
      ),
    },
    {
      children: (
        <div>
          <span>2024-02-06</span> <p>新增🔥 LeetCode 热题 HOT 100</p>
          <p>本地存储做题记录</p>
        </div>
      ),
      color: "green",
    },
    {
      dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
      children: "TBC",
    },
  ];
  return <Timeline items={items} mode="alternate" />;
}
