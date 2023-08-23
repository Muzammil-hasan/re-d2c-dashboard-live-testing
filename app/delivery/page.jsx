import { redirect } from "next/navigation"

export default async function Delivery() {
  redirect("/delivery/delivered")
}
