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
    displayText: "HSRP",
    path: "/",
  },
]

const tabList = [
  { label: "Fixed", url: "/hsrp/fixed" },
  { label: "In Process", url: "/hsrp/in-process" },
]

export default function HSRPLayout({ children }) {
  const pathName = usePathname()
  return (
    <div>
      <Breadcrumb breadCrumbText={breadCrumbTitle} />
      <HeaderPrimary headerClass="mt-4" title="HSRP">
        <SearchPrimary placeholder="Search queries" pathName={pathName} />
        <Filter />
      </HeaderPrimary>

      <Tabs tabList={tabList} />

      {children}
    </div>
  )
}
