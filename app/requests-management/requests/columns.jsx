"use client"

import { Checkbox } from "~/components/ui/checkbox"
import { Indicator } from "~/components/ui/indicator"

import { base_columns } from "../base-columns"
import { updateRequestStatus } from "./requests"
import { StatusActionDropdown } from "./status-action-dropdown"

export const columns = [
  {
    accessorKey: "selection",
    header: "",
    enableHiding: false,
    cell: ({ row }) => (
      <Checkbox
        row={row}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  ...base_columns,
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Indicator variant={"warning"}>{row.original.status}</Indicator>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ table }) => (
      <StatusActionDropdown
        reset={table.resetRowSelection}
        mutationFn={updateRequestStatus}
        rows={table.getSelectedRowModel().rows}
        queryKey={["applicants", { status: "pending" }]}
      />
    ),
  },
]
