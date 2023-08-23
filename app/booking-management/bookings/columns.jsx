"use client"

import Link from "next/link"
import { GoChevronRight } from "react-icons/go"

import { formatTimestamp } from "~/lib/utils"
import { Button } from "~/components/ui/button"

export const columns = [
  {
    accessorKey: "no",
    header: "S. No.",
  },
  {
    accessorKey: "applicantDetails.name",
    header: "Name",
  },
  {
    accessorKey: "applicantDetails.contactDetails.mobile",
    header: "Mobile No.",
  },
  {
    accessorKey: "createdAt",
    header: "Date & Time",
    cell: (info) => formatTimestamp(info.getValue()),
  },
  {
    accessorKey: "orderId",
    header: "MSD Enquiry Number",
  },

  {
    accessorKey: "address",
    header: "Action",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <Button variant="accent" size="small" asChild>
        <Link href={`/review/${row.original.guid}`}>
          <span>REVIEW</span>
          <GoChevronRight size={22} />
        </Link>
      </Button>
    ),
  },
]
