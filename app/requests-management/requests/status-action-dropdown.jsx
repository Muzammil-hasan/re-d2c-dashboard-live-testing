"use client"

import { Fragment, useState } from "react"
import { BiBlock } from "react-icons/bi"
import { BsCheck2 } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { useMutation, useQueryClient } from "react-query"

import ConfirmDialog from "~/components/ui/confirm-dialog"

import { ActionsDropdown } from "../_actions-dropdown"
import { RejectReason } from "./_reject-reason"

const statusList = [
  { label: "Approve", value: "APPROVED", Icon: BsCheck2 },
  { label: "Reject", value: "REJECT", Icon: GrClose },
  { label: "Cancel", value: "CANCELLED", Icon: BiBlock },
]

export function StatusActionDropdown({ reset, mutationFn, rows, queryKey }) {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState("")
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [reasonDialog, setReasonDialog] = useState(false)

  const { mutate } = useMutation({
    mutationFn: ({ rows, ...data }) => {
      const guidArray = rows.map((row) => row.original.guid)
      return mutationFn({ guidArray, ...data })
    },
    onSuccess: (data) => {
      console.log("🚀~ data:", data) // show successful toast
      queryClient.invalidateQueries({ queryKey })
      reset(true)
      setReasonDialog(false)
    },
  })

  function handleUpdateStatus(status) {
    // Basic validation
    if (!rows.length) return alert("Please select at least one row")

    // Case: Approved
    if (!["CANCELLED", "REJECT"].includes(status)) {
      mutate({ rows, status, reason: "" })
    } else {
      // Multiple selection for cancel | reject
      if (rows.length > 1) {
        alert("Can not reject or cancel more than one application")
        return
      } else {
        // Confirmation flow...
        setStatus(status)
        setConfirmDialog(true)
      }
    }
  }

  const onConfirm = () => {
    setReasonDialog(true)
    setConfirmDialog(false)
  }

  return (
    <Fragment>
      <ActionsDropdown data={statusList} onItemClick={handleUpdateStatus} />
      <ConfirmDialog
        onConfirm={onConfirm}
        open={confirmDialog}
        setOpen={setConfirmDialog}
      />
      <RejectReason
        rows={rows}
        status={status}
        onSubmit={mutate}
        open={reasonDialog}
        setOpen={setReasonDialog}
      />
    </Fragment>
  )
}
