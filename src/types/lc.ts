export type Grade = "easy" | "medium" | "hard";
export interface DataType {
  idx: number;
  name: string; // 题目
  url: string; //url
  grade: Grade; // easy medium hard
  tags: string[]; // 属于剑指 offer, hot100,牛客 hot100
  algoCategory: string; // 算法题类型
  ext: string; //补充思路
}
