import Image from "next/image";
import { GithubOutlined, XOutlined } from "@ant-design/icons";
import data from "../../public/data.json"; // 根据实际路径调整
import SquigglyLines from "@/components/SquigglyLines";
import Link from "next/link";
import Footer from "@/components/footer";
import Ref from "@/components/page/ref";
import MyTimeLine from "@/components/time-line";

import { DataType, Grade } from "@/types/lc";
import { columns } from "@/components/lc/colums";
import { DataTable } from "@/components/lc/data-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

async function getData(): Promise<DataType[]> {
  // Fetch data from your API here.
  // 直接将导入的JSON赋值给一个变量，类型为DataType[]
  const dataList: DataType[] = data.map((item) => ({
    ...item,
    grade: item.grade as Grade,
  }));
  return dataList;
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="container space-y-10  min-h-screen items-center   z-[-2] pt-6">
      <div className="relative flex flex-col  gap-3 place-items-center mb-3 w-full">
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
        <header className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex gap-3 items-center flex-col md:flex-row">
            <Link href="/" className="flex gap-2 items-center">
              <Image
                className="relative rounded-full"
                // dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert
                src="/ai.svg"
                alt="Logo"
                width={45}
                height={40}
                priority
              />
              <span className="font-semibold text-xl">RunningCode</span>
            </Link>
            <Dialog>
              <DialogTrigger className="hover:text-sky-500 duration-150 transition-all">
                Changelog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Changelog</DialogTitle>
                </DialogHeader>
                <MyTimeLine />
              </DialogContent>
            </Dialog>

            <Link
              href="https://gpthanghai.com/posts/gpt/gpt-plus.html"
              target="_blank"
              className="hover:text-sky-500 duration-150 transition-all"
            >
              ⭐️GPT Plus升级
            </Link>
          </div>

          <div className="flex items-center gap-3 ">
            <Link
              href="https://github.com/tonyljx/running-leetcode"
              target="_blank"
              className="p-2 hover:bg-slate-200/85 transition-colors duration-150 rounded"
            >
              <GithubOutlined className="text-[24px]" />
            </Link>
            <Link
              href="https://twitter.com/abc30037274"
              target="_blank"
              className="p-2 hover:bg-slate-200/85 transition-colors duration-150 rounded"
            >
              <XOutlined className="text-[24px]" />
            </Link>
            <Link
              href="https://www.xiaohongshu.com/user/profile/5b69c8ba3cf76d0001fcdab2"
              target="_blank"
              className="p-2 hover:bg-slate-200/85 transition-colors duration-150 rounded"
            >
              <Icons.redbook className="w-[24px] h-[24px]" />
            </Link>

            <Dialog>
              <DialogTrigger className="p-2 hover:bg-slate-200/85 transition-colors duration-150 rounded">
                <Icons.wechat className="w-[24px] h-[24px]" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>公众号-记录开发过程以及题解</DialogTitle>
                </DialogHeader>
                <img src="/wechat-yasuo.png" alt="wechat" />
              </DialogContent>
            </Dialog>
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
          hot100, 所以我按照分类收录了这些题目, 刷题吧, 王子公主们!🤣
        </p>
        <p>
          目前收录题目数: <span className="font-bold">{data.length}</span>
        </p>
      </div>

      <div className="">
        {/* max-w-[1200px] mx-auto md:w-[1200px] w-3xl */}
        {/* container mx-auto */}
        <DataTable columns={columns} data={data} />
      </div>

      <Ref className="" />

      <Footer />
    </main>
  );
}
