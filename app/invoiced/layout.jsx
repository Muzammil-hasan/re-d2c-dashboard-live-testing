"use client"

import { usePathname } from "next/navigation"

import Breadcrumb from "~/components/ui/breadcrumbPrimary"
import { Filter } from "~/components/ui/filter"
import HeaderPrimary from "~/components/headerPrimary"
import SearchPrimary from "~/components/searchPrimary"

const breadCrumbTitle = [
  {
    displayText: "Home",
    path: "/",
  },
  {
    displayText: "Invoiced",
    path: "/",
  },
]

export default function InvoicedManagementLayout({ children }) {
  const pathName = usePathname()
  return (
    <>
      <Breadcrumb breadCrumbText={breadCrumbTitle} />
      <HeaderPrimary headerClass="mb-2 mt-4" title="Invoiced">
        <SearchPrimary placeholder="Search queries" pathName={pathName} />
        <Filter />
      </HeaderPrimary>
      <hr />

      {children}
    </>
  )
}
