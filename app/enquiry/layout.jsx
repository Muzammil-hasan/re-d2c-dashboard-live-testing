"use client"

import { usePathname } from "next/navigation"

import Breadcrumb from "~/components/ui/breadcrumbPrimary"
import { Tabs } from "~/components/ui/tabs"
import HeaderPrimary from "~/components/headerPrimary"
import SearchPrimary from "~/components/searchPrimary"

const breadCrumbTitle = [
  {
    displayText: "Home",
    path: "/",
  },
  {
    displayText: "Leads",
    path: "/",
  },
]

const tabList = [{ label: "Customer Queries", url: "/enquiry" }]

export default function EnquiryLayout({ children }) {
  const pathName = usePathname()
  return (
    <>
      <Breadcrumb breadCrumbText={breadCrumbTitle} />
      <HeaderPrimary headerClass="mb-2 mt-4" title="Contact">
        <SearchPrimary placeholder="Search queries" pathName={pathName} />
      </HeaderPrimary>
      <Tabs tabList={tabList} />

      {children}
    </>
  )
}
