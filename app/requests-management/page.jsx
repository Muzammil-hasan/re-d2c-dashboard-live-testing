import { redirect } from "next/navigation"

export default async function RequestManagement() {
  redirect("/requests-management/requests")
}
