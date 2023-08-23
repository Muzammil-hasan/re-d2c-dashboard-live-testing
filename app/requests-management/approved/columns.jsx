"use client"

import { Indicator } from "~/components/ui/indicator"

import { base_columns } from "../base-columns"
import { ActionEnquiryDropdown } from "./enquiry-action-dropdown"
import { createEnquiry } from "./requests"

export const columns = [
  ...base_columns,
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Indicator>{row.original.status}</Indicator>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionEnquiryDropdown
        guid={row.original.guid}
        mutationFn={createEnquiry}
        queryKey={["applicants", { status: "approved" }]}
      />
    ),
  },
]
