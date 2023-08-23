"use client"

import { Fragment, useState } from "react"
import { useQuery } from "react-query"

import { formatTimestamp } from "~/lib/utils"
import InfoCard from "~/components/infoCard"

import { Pagination } from "../_pagination"

const InsuranceCards = ({ initialData, queryKey, queryFn, pageCount }) => {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    initialData,
    keepPreviousData: true,
    queryFn: () => queryFn({ pageIndex: page }, queryKey),
    queryKey: [...queryKey, page],
  })

  console.log("dataaa", data)

  return (
    <Fragment>
      {data?.map((item) => (
        <InfoCard
          key={item.guid}
          id={"MSD Enquiry Number"}
          idName={item.booking.orderId}
          statusTitle={"Status"}
          status={item.status}
          title1={"Customer Name"}
          subtitle1={item.booking.applicantDetails.name}
          title2={"Insured by"}
          subtitle2={item.insuranceType}
          title3={"Policy No."}
          subtitle3={item.policyNumber}
          title4={"Insurance Start Date"}
          subtitle4={formatTimestamp(item.createdAt)}
          guid={item.booking.guid}
          viewPrimaryBtn
        />
      ))}
      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </Fragment>
  )
}

export default InsuranceCards
