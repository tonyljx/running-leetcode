"use client";
import { Button, Input, Table, Tag, message } from "antd";
import Image from "next/image";
import type { TableColumnsType, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import data from "../../public/data.json"; // 根据实际路径调整
import { useState } from "react";
const { Search } = Input;
import type { SearchProps } from "antd/es/input/Search";
import SquigglyLines from "@/components/SquigglyLines";
type Grade = "easy" | "medium" | "hard";

interface DataType {
  name: string; // 题目
  url: string; //url
  grade: Grade; // easy medium hard
  tags: string[]; // 属于剑指 offer, hot100,牛客 hot100
  algoCategory: string; // 算法题类型
  ext: string; //补充思路
}
// 配置受控 filter 的 type
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

/**
 * 辅助函数-获取难度对应的映射
 * @param grade
 * @returns
 */
function getGradeValue(grade: Grade): number {
  const gradeMap: { [K in Grade]: number } = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  return gradeMap[grade];
}

export default function Home() {
  // 直接将导入的JSON赋值给一个变量，类型为DataType[]
  const dataList: DataType[] = data.map((item) => ({
    ...item,
    grade: item.grade as Grade,
  }));

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterSearch: true,
      filters: [],
      onFilter: (value, record) => {
        if (typeof value === "string") {
          record.name.startsWith(value);
        }
        return false;
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },

    {
      title: "grade",
      dataIndex: "grade",
      key: "grade",
      filters: [
        { text: "easy", value: "easy" },
        { text: "medium", value: "medium" },
        { text: "hard", value: "hard" },
      ],
      filteredValue: filteredInfo.grade || null,
      render: (value) => {
        switch (value) {
          case "easy":
            return <Tag color="cyan">{value}</Tag>;
          case "medium":
            return <Tag color="orange">{value}</Tag>;
          case "hard":
            return <Tag color="red">{value}</Tag>;
          default:
            break;
        }
        return <Tag>{value}</Tag>;
      },
      onFilter: (value, record) => record.grade === (value as string),
      sorter: (a, b) => getGradeValue(a.grade) - getGradeValue(b.grade),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "algoCategory",
      dataIndex: "algoCategory",
      key: "algoCategory",
      filters: [{ text: "链表", value: "链表" }],
      filteredValue: filteredInfo.algoCategory || null,
      onFilter: (value, record) => record.algoCategory === (value as string),
    },
    {
      title: "出处",
      dataIndex: "tags",
      key: "tags",
      filterSearch: true,
      filteredValue: filteredInfo.tags || null,
      onFilter: (value, record) => {
        if (typeof value === "string") {
          record.name.startsWith(value);
        }
        return false;
      },
      filters: [
        { text: "nowcoder101", value: "nowcoder101" },
        { text: "leetcode", value: "leetcode" },
      ],
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (value) => (
        <a href={value} target="_blank">
          URL
        </a>
      ),
    },
  ];

  // 搜索函数
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setFilteredInfo((prevFilteredInfo) => ({
      ...prevFilteredInfo,
      name: value ? [value] : null,
    }));
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message: string = "error") => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    success("重置筛选条件");
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    success("重置全部条件");
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-16 gap-6">
      {contextHolder}
      <div className="relative flex  flex-col  gap-3 place-items-center mb-10  z-[-1]">
        {/* before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] before:absolute before:h-[300px] */}
        {/* after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] */}
        {/* <Image
          className="relative "
          // dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
        <h1 className="mb-3 mt-10 text-4xl font-bold text-black duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
          Running
          <span className="relative whitespace-nowrap text-[#3290EE]">
            Code
            <SquigglyLines />
          </span>
        </h1>
        <p>刷题吧, 少年!</p>
      </div>

      <div className="flex gap-3">
        {/* <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        /> */}
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </div>
      <div className="w-2/3">
        <Table
          columns={columns}
          dataSource={dataList}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 15,
            pageSizeOptions: [10, 15, 20, 25, 30, 50],
            showSizeChanger: true,
          }}
          onChange={handleChange}
        />
      </div>
    </main>
  );
}
