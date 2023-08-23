"use client"

import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io"
import { useQuery } from "react-query"

import HeaderPrimary from "~/components/headerPrimary"
import { getEnquiryDetails } from "~/app/enquiry/request"

import QueryDetailBox from "../../../components/queryDetail"

const QueryDetails = ({ params }) => {
  const { data } = useQuery(["enquiryDetailData"], () =>
    getEnquiryDetails(params.id)
  )

  return (
    <div>
      <Link href="/enquiry">
        <IoIosArrowBack className="backBtnIcon mb-2" size={22} />
      </Link>
      <HeaderPrimary headerClass="mb-3" title="Query Details" />

      {data && (
        <QueryDetailBox
          key={data}
          id={"Ref ID:"}
          statusTitle={"Status"}
          idName={data.guid}
          status={data.status}
          title1={"Date and Times"}
          subtitle1={data.createdAt}
          title2={"Customer Names"}
          subtitle2={data.name}
          title3={"Email Address"}
          subtitle3={data.contactDetails.email}
          title4={"Phone Number"}
          subtitle4={data.contactDetails.mobile}
          title5={"Query"}
          subtitle5={data.queryDescription}
          viewPrimaryBtn
        />
      )}
    </div>
  )
}

export default QueryDetails
