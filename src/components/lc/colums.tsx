"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { DataType } from "@/types/lc";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { getGradeValue } from "@/lib/utils";

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "idx",
    header: "idx",
  },
  {
    accessorKey: "name",
    // header: () => "题目名",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="题目名" />
    ),
    filterFn: "includesString",
  },

  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="难度" />
    ),
    sortingFn: (a, b) => {
      return (
        getGradeValue(a.getValue("grade")) - getGradeValue(b.getValue("grade"))
      );
    },

    cell: ({ row }) => {
      const grade = row.getValue("grade");
      switch (grade) {
        case "easy":
          return (
            <Badge className="bg-green-500 hover:bg-green-700">{grade}</Badge>
          );

        case "medium":
          return (
            <Badge className="bg-orange-500 hover:bg-orange-700">{grade}</Badge>
          );

        case "hard":
          return <Badge className="bg-red-500 hover:bg-red-700">{grade}</Badge>;

        default:
          break;
      }
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "tags",
    header: "出处",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "algoCategory",
    header: "分类",
    filterFn: (row, id, value) => {
      console.log("分类: ", row.getValue(id));
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: (props) => (
      <Link
        href={props.getValue() as string}
        target="_blank"
        className="hover:text-sky-500 transition-all duration-150"
      >
        {/* {`${props.row.original.grade} - ${props.getValue()}`} */}
        Url
      </Link>
    ),
  },
  {
    accessorKey: "ext",
    header: "补充",
  },
];
