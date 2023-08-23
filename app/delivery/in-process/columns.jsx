"use client"

export const columns = [
  {
    accessorKey: "no",
    header: "S. No.",
  },
  {
    accessorKey: "booking.applicantDetails.name",
    header: "Name",
  },
  {
    accessorKey: "contactDetails.mobile",
    header: "Mobile No.",
  },
  {
    accessorKey: "expectedDate",
    header: "Expect Delivery Date",
  },
  {
    accessorKey: "booking.motorcycleDetails.model",
    header: "Motorcycle",
  },
  {
    accessorKey: "address.detail",
    header: "Delivery Address",
  },
]
