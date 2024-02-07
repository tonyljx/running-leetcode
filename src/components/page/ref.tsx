import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

export default function Ref({ className }: Props) {
  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Source
      </h2>
      <div className="flex gap-3 flex-col">
        <Link
          href="https://leetcode.cn/problem-list/2cktkvj/"
          className="hover:text-blue-500 transition-all duration-150"
          target="_blank"
        >
          🔥 LeetCode 热题 HOT 100
        </Link>
        <Link
          href="https://www.nowcoder.com/exam/oj"
          className="hover:text-blue-500 transition-all duration-150"
          target="_blank"
        >
          🐂 牛客 面试必刷101
        </Link>

        <Link
          href="https://tangshusen.me/LeetCode/CodingInterview.html"
          className="hover:text-blue-500 transition-all duration-150"
          target="_blank"
        >
          ⚔ LeetCode 剑指offer对应题目-参考1
        </Link>

        <Link
          href="https://github.com/yanring/jianzhi-Offer-Leetcode"
          className="hover:text-blue-500 transition-all duration-150"
          target="_blank"
        >
          ⚔ LeetCode 剑指offer对应题目-参考2
        </Link>
      </div>
    </div>
  );
}
