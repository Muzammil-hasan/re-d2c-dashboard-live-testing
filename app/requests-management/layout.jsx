import { AiOutlineDownload } from "react-icons/ai"

import Breadcrumb from "~/components/ui/breadcrumbPrimary"
import { Button } from "~/components/ui/button"
import { Filter } from "~/components/ui/filter"
import { Tabs } from "~/components/ui/tabs"
import HeaderPrimary from "~/components/headerPrimary"

import { AddApplicant } from "./_add-applicant"

const breadCrumbTitle = [
  {
    displayText: "Home",
    path: "/",
  },
  {
    displayText: "Requests Management",
    path: "/",
  },
]

const tabList = [
  { label: "Requests", url: "/requests-management/requests" },
  { label: "Approved", url: "/requests-management/approved" },
  { label: "Reject", url: "/requests-management/rejected" },
]

export default function RequestManagementLayout({ children }) {
  return (
    <div>
      <Breadcrumb breadCrumbText={breadCrumbTitle} />
      <HeaderPrimary headerClass="mt-4" title="Requests Management">
        <div className="request-management">
          <div>
            <AddApplicant />
            <Button size="snug_wide">
              <AiOutlineDownload size={15} />
              <span>Import EXCEL</span>
            </Button>
          </div>
          <Filter />
        </div>
      </HeaderPrimary>
      <Tabs tabList={tabList} />

      {children}
    </div>
  )
}
