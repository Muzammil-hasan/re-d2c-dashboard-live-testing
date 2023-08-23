"use client"

import { Indicator } from "~/components/ui/indicator"

import { base_columns } from "../base-columns"

export const columns = [
  ...base_columns,
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Indicator variant={"danger"}>{row.original.status}</Indicator>
    ),
  },
]
