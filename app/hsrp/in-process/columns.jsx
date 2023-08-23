"use client"

export const columns = [
  {
    accessorKey: "no",
    header: "S. No.",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Mobile No.",
  },
  {
    accessorKey: "expectedDate",
    header: "Expected Date",
    accessorFn: (row) => `${row.expectedDate} at ${row.expectedTimeSlot}`,
  },
  {
    accessorKey: "booking.motorcycleDetails.model",
    header: "Motorcycle",
  },
  {
    accessorKey: "delivery.registrationDetails.number",
    header: "Registration Number",
  },
]
