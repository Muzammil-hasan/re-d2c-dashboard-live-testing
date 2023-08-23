"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "~/lib/utils"

import styles from "./tabs.module.scss"

export const Tabs = ({ tabList }) => {
  const pathname = usePathname()

  return (
    <div className={styles.tabs_wrapper}>
      <ul className={`${styles.tabs_list} nav nav-tabs`}>
        {tabList.map(({ label, url }) => (
          <li
            key={url}
            className={cn(
              styles.tabs_list__item,
              pathname === url && styles["tabs_list__item-active"],
              "nav-item"
            )}
          >
            <Link href={url}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
