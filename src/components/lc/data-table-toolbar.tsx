"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

// import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-facet-filter";
import { Button } from "../ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { X } from "lucide-react";
import { algoCategories, grade, source } from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // console.log(table.getAllColumns());

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center  flex-col md:flex-row gap-2">
        <Input
          placeholder="输入题目名"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("algoCategory") && (
          <DataTableFacetedFilter
            column={table.getColumn("algoCategory")}
            title="分类"
            options={algoCategories}
          />
        )}
        {table.getColumn("grade") && (
          <DataTableFacetedFilter
            column={table.getColumn("grade")}
            title="难度"
            options={grade}
          />
        )}
        {table.getColumn("grade") && (
          <DataTableFacetedFilter
            column={table.getColumn("tags")}
            title="来源"
            options={source}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
