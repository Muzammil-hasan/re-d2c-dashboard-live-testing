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
    header: "Delivered Date & Time",
    accessorFn: (row) => `${row.expectedDate} at ${row.expectedTimeSlot}`,
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
