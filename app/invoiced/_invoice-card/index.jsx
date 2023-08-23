"use client"

import { Fragment, useState } from "react"
import { useQuery } from "react-query"

import { formatTimestamp } from "~/lib/utils"
import InfoCard from "~/components/infoCard"
import { Pagination } from "~/app/insurance/_pagination"

const InvoiceCard = ({ initialData, queryKey, queryFn, pageCount }) => {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    initialData,
    queryFn: () => queryFn({ pageIndex: page }, queryKey),
    queryKey: [...queryKey, page],
  })

  return (
    <Fragment>
      {data?.invoicedData?.map((item) => (
        <InfoCard
          key={item.guid}
          id={"MSD Enquiry Number"}
          idName={item.booking?.orderId}
          statusTitle={"Status"}
          status={item.status}
          title1={"Customer Name"}
          subtitle1={item.booking?.applicantDetails?.name}
          title2={"Invoiced Date & Time"}
          subtitle2={formatTimestamp(item.createdAt)}
          title3={"Motorcycle"}
          subtitle3={item.booking?.motorcycleDetails?.model}
          downLoadIcon={item.status === "COMPLETED"}
          guid={item.booking.guid}
          viewPrimaryBtn
        />
      ))}
      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </Fragment>
  )
}

export default InvoiceCard
