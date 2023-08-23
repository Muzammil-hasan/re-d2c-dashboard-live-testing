"use client"

import Link from "next/link"
import { GoChevronRight } from "react-icons/go"

import { Button } from "~/components/ui/button"

export const columns = [
  {
    accessorKey: "serialNo",
    header: "S. No.",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobile",
    header: "Mobile No.",
  },
  {
    accessorKey: "date",
    header: "Delivered Date & Time",
  },
  {
    accessorKey: "bookingID",
    header: "Booking ID",
  },
  {
    accessorKey: "address",
    header: "Action",
    id: "actions",
    enableHiding: false,
    cell: () => (
      <Link href="booking-management/review">
        <Button variant="accent" size="small">
          <span>REVIEW</span>
          <GoChevronRight size={22} />
        </Button>
      </Link>
    ),
  },
]
