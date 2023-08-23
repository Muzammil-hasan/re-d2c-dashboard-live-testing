"use client"

import { Fragment, useState } from "react"
import { useQuery } from "react-query"

import { formatTimestamp } from "~/lib/utils"
import InfoCard from "~/components/infoCard"
import { Pagination } from "~/app/insurance/_pagination"

const EnquiryCard = ({ initialData, queryKey, queryFn, pageCount }) => {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    initialData,
    queryKey: [...queryKey, page],
    queryFn: () => queryFn({ pageIndex: page }, queryKey),
  })

  return (
    <Fragment>
      {data.map((item) => (
        <InfoCard
          guid={item.guid}
          key={item.guid}
          statusTitle={"Status"}
          status={item.status}
          title1={"Customer Name"}
          subtitle1={item.name}
          title2={"Date and Time"}
          subtitle2={formatTimestamp(item.createdAt)}
          title3={"Email Address"}
          subtitle3={item.contactDetails.email}
          viewSecondaryBtn
        />
      ))}
      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </Fragment>
  )
}

export default EnquiryCard
