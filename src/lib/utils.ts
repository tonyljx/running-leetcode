import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Grade } from "@/types/lc";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 辅助函数-获取难度对应的映射
 * @param grade
 * @returns
 */
export function getGradeValue(grade: Grade): number {
  const gradeMap: { [K in Grade]: number } = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  return gradeMap[grade];
}
