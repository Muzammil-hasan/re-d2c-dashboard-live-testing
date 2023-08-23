"use client"

import { Menu } from "@headlessui/react"
import { signOut, useSession } from "next-auth/react"
import { FiChevronDown } from "react-icons/fi"

import styles from "./profile-dropdown.module.scss"

const links = [
  { href: "/", label: "Change password" },
  { href: "/b", label: "Logout" },
]

export default function ProfileDropdown() {
  const { data, status } = useSession()

  const handleClick = async (type = "logout") => {
    if (type !== "logout") return
    await signOut({ callbackUrl: "/d2c/admin/login" })
  }

  if (status === "loading") {
    return <></>
  }

  return (
    <div className={styles.customDropdown}>
      <Menu>
        <Menu.Button className={styles.dropdownButton}>
          {data?.user?.fName} {data?.user?.lName}
          <FiChevronDown />
        </Menu.Button>
        <Menu.Items as="ul" className={styles.dropdownItems}>
          {links.map(({ label, href }) => (
            <Menu.Item as={"li"} key={href}>
              <button onClick={() => handleClick("logout")}>{label}</button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}
