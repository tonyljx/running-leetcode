import { DataType, Grade } from "@/types/lc";
import { columns } from "@/components/lc/colums";
import { DataTable } from "@/components/lc/data-table";
import data from "../../../public/data.json"; // 根据实际路径调整
async function getData(): Promise<DataType[]> {
  // Fetch data from your API here.
  // 直接将导入的JSON赋值给一个变量，类型为DataType[]
  const dataList: DataType[] = data.map((item) => ({
    ...item,
    grade: item.grade as Grade,
  }));
  return dataList;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
