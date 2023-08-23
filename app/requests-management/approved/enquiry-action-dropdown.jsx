import { Fragment, useState } from "react"
import { useMutation, useQueryClient } from "react-query"

import { ActionsDropdown } from "../_actions-dropdown"
import { EnquiryCreation } from "./_enquiry-creation"

const enquiryList = [{ label: "Enquiry", value: "enquiry" }]

export function ActionEnquiryDropdown({ mutationFn, guid, queryKey }) {
  const [enquiryDialog, setEnquiryDialog] = useState(false)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      console.log("🚀~ data:", data) // show successful toast
      queryClient.invalidateQueries({ queryKey })
      setEnquiryDialog(false)
    },
  })

  const handleOpenEnquiryDialog = () => {
    setEnquiryDialog(true)
  }

  return (
    <Fragment>
      <ActionsDropdown
        data={enquiryList}
        onItemClick={handleOpenEnquiryDialog}
      />
      <EnquiryCreation
        guid={guid}
        onSubmit={mutate}
        open={enquiryDialog}
        setOpen={setEnquiryDialog}
      />
    </Fragment>
  )
}
