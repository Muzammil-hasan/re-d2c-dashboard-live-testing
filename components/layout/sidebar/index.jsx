"use client"

import { useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BsFileEarmarkText, BsShieldCheck } from "react-icons/bs"
import { FiBarChart2 } from "react-icons/fi"
import { TbTruckDelivery } from "react-icons/tb"

import { cn } from "~/lib/utils"

// Styles here
import styles from "./sidebar.module.scss"

const links = [
  { url: "/", name: "Overview", Icon: FiBarChart2 },
  {
    url: "/requests-management",
    name: "Requests Management",
    Icon: FiBarChart2,
  },
  {
    url: "/booking-management",
    name: "Booking Management",
    Icon: BsFileEarmarkText,
  },
  { url: "/invoiced", name: "Invoiced", Icon: BsFileEarmarkText },
  { url: "/insurance", name: "Insurance", Icon: BsShieldCheck },
  { url: "/delivery", name: "Delivery", Icon: TbTruckDelivery },
  { url: "/hsrp", name: "HSRP", Icon: FiBarChart2 },
  { url: "/enquiry", name: "Enquiry", Icon: BsFileEarmarkText },
]

const Sidebar = ({ className }) => {
  const pathname = usePathname()

  const isCurrentRoute = useCallback(
    (url) => {
      if (url === pathname) return true
      else if (url !== "/" && pathname.includes(url)) return true
      return false
    },
    [pathname]
  )

  return (
    <div className={cn("sidebar-global", styles.sideBarContainer, className)}>
      <ul>
        {links.map(({ url, name, Icon }) => (
          <li key={url}>
            <Link
              href={url}
              className={isCurrentRoute(url) ? styles.active : ""}
            >
              <i className={`${styles.navIcon} nav-item`}>
                <Icon />
              </i>
              <span className="nav-link">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
