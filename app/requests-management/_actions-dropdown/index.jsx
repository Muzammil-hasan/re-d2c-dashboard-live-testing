"use client"

import { Fragment, memo } from "react"
import { Menu } from "@headlessui/react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { GrClose } from "react-icons/gr"

import { Button } from "~/components/ui/button"

import styles from "./actions.dropdown.module.scss"

function BaseActionDropdown({ data, onItemClick }) {
  return (
    <Fragment>
      <Menu>
        <Menu.Button as={Fragment}>
          <Button size={"icon"} variant="none">
            <BiDotsVerticalRounded size={22} />
          </Button>
        </Menu.Button>
        <Menu.Items className={styles.dropdown_menu__content}>
          <Menu.Item className={styles.dropdown_menu__close}>
            {({ close }) => (
              <Button size={"icon"} variant="none" onClick={close}>
                <GrClose size={15} />
              </Button>
            )}
          </Menu.Item>
          {data.map(({ label, value, Icon }) => (
            <Fragment key={value}>
              <Menu.Item className={styles.dropdown_menu__item}>
                {({ active }) => (
                  <button
                    onClick={() => onItemClick(value)}
                    style={{ backgroundColor: active ? "" : "transparent" }}
                  >
                    {Icon && <Icon size={15} />} {label}
                  </button>
                )}
              </Menu.Item>
              <div className={styles.dropdown_menu__separator} />
            </Fragment>
          ))}
        </Menu.Items>
      </Menu>
    </Fragment>
  )
}

export const ActionsDropdown = memo(BaseActionDropdown)
