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
    displayText: "Delivery",
    path: "/",
  },
]

const tabList = [
  { label: "Delivered", url: "/delivery/delivered" },
  { label: "In Process", url: "/delivery/in-process" },
]

export default function DeliveryLayout({ children }) {
  const pathName = usePathname()
  return (
    <div>
      <Breadcrumb breadCrumbText={breadCrumbTitle} />
      <HeaderPrimary headerClass="mt-4" title="Delivery">
        <SearchPrimary placeholder="Search queries" pathName={pathName} />
        <Filter />
      </HeaderPrimary>

      <Tabs tabList={tabList} />

      {children}
    </div>
  )
}
