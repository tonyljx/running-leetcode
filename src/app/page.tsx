"use client";
import { Button, Input, Rate, Table, Tag, message } from "antd";
import Image from "next/image";
import type { TableColumnsType, TableProps } from "antd";
import { GithubOutlined, XOutlined } from "@ant-design/icons";
import data from "../../public/data.json"; // 根据实际路径调整
import { useEffect, useState } from "react";
const { Search } = Input;
import type { SearchProps } from "antd/es/input/Search";
import SquigglyLines from "@/components/SquigglyLines";
import Link from "next/link";
import Footer from "@/components/footer";
import { Grade, DataType } from "@/types/lc";
import { getGradeValue } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// 配置受控 filter 的 type
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;
interface Iretain {
  [key: number]: number;
}

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export default function Home() {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  // localStorage 存储的记忆数组
  const [retain, setRetain, clear] = useLocalStorage<Iretain>("remember", {});

  const handleRetainClick = (record: DataType, value: number) => {
    // 找到对应的 idx
    const idx = record.idx;
    setRetain({ ...retain, [idx]: value });
    success("成功设置记忆值");
  };

  // 直接将导入的JSON赋值给一个变量，类型为DataType[]
  // const dataList: DataType[] = data.map((item) => ({
  //   ...item,
  //   grade: item.grade as Grade,
  //   // 增加 retain 属性
  //   retain: retain[item.idx] || 0, // 使用 retain 中对应的值，如果不存在则默认为 0
  // }));
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const updatedDataList = data.map((item) => ({
      ...item,
      grade: item.grade as Grade,
      retain: retain[item.idx] || 0,
    }));
    setDataList(updatedDataList);
    setLoading(false);
  }, [retain]);

  console.log(loading);

  const columns: TableColumnsType<DataType> = [
    {
      title: "index",
      dataIndex: "idx",
      key: "idx",
    },
    {
      title: "题目名",
      dataIndex: "name",
      key: "name",
      // filterSearch: true,
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => {
        // console.log("name filter ", value, record);
        if (typeof value === "string") {
          return record.name.includes(value);
        }
        return false;
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },

    {
      title: "难度",
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
      title: "分类",
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
    {
      title: "retain",
      dataIndex: "retain",
      key: "retain",
      render: (_, record) => (
        <Rate
          onChange={(value) => {
            handleRetainClick(record, value);
          }}
          tooltips={desc}
          key={record.idx}
          value={retain[record.idx]}
        ></Rate>
      ),
    },
  ];

  // 搜索函数
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setFilteredInfo({
      name: [value],
    });
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
    // console.log("Various parameters", pagination, filters, sorter);
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
    <main className="flex min-h-screen flex-col items-center p-8 pt-8 gap-6 bg-slate-100/50 z-[-2]">
      {contextHolder}
      <div className="relative flex  flex-col  gap-3 place-items-center mb-3 w-2/3">
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
        <header className="flex justify-between w-full">
          <Link href="/">
            <Image
              className="relative rounded-full"
              // dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert
              src="/ai.svg"
              alt="Logo"
              width={45}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-3 ">
            <a
              href="https://github.com/tonyljx/running-leetcode"
              target="_blank"
              className="p-2 hover:bg-slate-200/85 transition-colors duration-150 rounded"
            >
              <GithubOutlined className="text-[24px]" />
            </a>
            <a
              href="https://twitter.com/abc30037274"
              target="_blank"
              className="p-2 hover:bg-slate-200/85 transition-colors duration-150 rounded"
            >
              <XOutlined className="text-[24px]" />
            </a>
          </div>
        </header>

        <h1 className="z-10 mb-3 mt-6 text-4xl font-bold text-black duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
          Running
          <span className="relative whitespace-nowrap text-[#3290EE]">
            Code
            <SquigglyLines />
          </span>
        </h1>
        <p className="max-w-xl text-center text-slate-400">
          目前面试笔试中大量出现的题目都是出自 剑指 offer、牛客 101 以及 lc
          hot100, 所以我按照分类收录了这些题目, 刷题吧, 王子公主们🤣!
        </p>
      </div>

      <div className="flex gap-3">
        <Search
          placeholder="输入题目名"
          onSearch={onSearch}
          style={{ width: 200 }}
          enterButton
        />
        <Button onClick={clearFilters}>删除筛选</Button>
        <Button onClick={clearAll}>删除筛选过滤</Button>
        <Button
          onClick={() => {
            clear();
            success("删除本地缓存");
          }}
        >
          删除本地缓存
        </Button>
      </div>
      <div className="w-2/3">
        <Table
          className="w-full"
          rowKey="idx"
          columns={columns}
          dataSource={dataList}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 15,
            pageSizeOptions: [10, 15, 20, 25, 30, 50],
            showSizeChanger: true,
          }}
          onChange={handleChange}
          loading={loading}
        />
      </div>

      <Footer />
    </main>
  );
}
