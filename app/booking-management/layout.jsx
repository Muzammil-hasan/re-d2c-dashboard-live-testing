"use client"

import { usePathname } from "next/navigation"

import Breadcrumb from "~/components/ui/breadcrumbPrimary"
import { Filter } from "~/components/ui/filter"
import { Tabs } from "~/components/ui/tabs"
import HeaderPrimary from "~/components/headerPrimary"
import SearchPrimary from "~/components/searchPrimary"

const breadCrumbTitle = [
  {
    displayText: "Home",
    path: "/",
  },
  {
    displayText: "Booking Management",
    path: "/",
  },
]

const tabList = [
  { label: "Bookings", url: "/booking-management/bookings" },
  { label: "Finance Required", url: "/booking-management/finance" },
  { label: "Balance Payment", url: "/booking-management/payment" },
  { label: "Cancelled Booking", url: "/booking-management/cancelled" },
]

export default function BookingManagementLayout({ children }) {
  const pathName = usePathname()
  return (
    <div>
      <Breadcrumb breadCrumbText={breadCrumbTitle} />
      <HeaderPrimary headerClass="mt-4" title="Bookings">
        <SearchPrimary placeholder="Search queries" pathName={pathName} />
        <Filter />
      </HeaderPrimary>

      <Tabs tabList={tabList} />

      {children}
    </div>
  )
}
