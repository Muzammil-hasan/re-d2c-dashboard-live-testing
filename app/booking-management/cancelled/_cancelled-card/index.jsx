"use client"

import { Fragment, useState } from "react"
import { useQuery } from "react-query"

import { formatTimestamp } from "~/lib/utils"
import InfoCard from "~/components/infoCard"
import { Pagination } from "~/app/insurance/_pagination"

const CancelledCard = ({ initialData, queryKey, queryFn, pageCount }) => {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    initialData,
    keepPreviousData: true,
    queryFn: () => queryFn({ pageIndex: page }, queryKey),
    queryKey: [...queryKey, page],
  })

  return (
    <Fragment>
      {data?.map((item) => (
        <InfoCard
          key={item.guid}
          id={"MSD Enquiry Number"}
          idName={item.orderId}
          statusTitle={"Status"}
          status={item.cancellationDetails.status}
          title1={"Customer Name"}
          subtitle1={item.applicantDetails.name}
          title2={"Date and Time"}
          subtitle2={formatTimestamp(item.createdAt)}
          title3={"Booked Motorcycle"}
          subtitle3={item?.motorcycleDetails?.model}
          refundProcess={item.cancellationDetails} //set the status to PENDING ON MONDAY
          guid={item.guid}
          viewPrimaryBtn
          cancelledBooking
        />
      ))}
      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </Fragment>
  )
}

export default CancelledCard
