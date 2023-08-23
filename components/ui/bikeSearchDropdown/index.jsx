import Link from "next/link"
import { Menu } from "@headlessui/react"
import { LiaAngleDownSolid } from "react-icons/lia"

import styles from "./style.module.scss"

export default function ActionsDropdown({}) {
  return (
    <div className={styles.headerContainer}>
      <Menu>
        <div className={styles.headRightSec}>
          <div className={styles.customDropdown}>
            <Menu>
              <Menu.Button className={styles.dropdownButton}>
                <div className={styles.imgBox}></div>
                Royal Enfield Hunter 350
              </Menu.Button>
              <Menu.Items className={styles.dropdownItems}>
                <div className={styles.searchInput}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search Motorcycle"
                    aria-label="Search"
                    value="Search Motorcycle"
                  ></input>
                </div>

                <Menu.Item
                  as="a"
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  Scram 411-411 CC - Stellar Black
                </Menu.Item>
                <Menu.Item
                  as="a"
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  Classic 350-350 CC - Stellar Black
                </Menu.Item>
                <Menu.Item
                  as="a"
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  Meteor 350-350 CC - Supernova Red
                </Menu.Item>
                <Menu.Item
                  as="a"
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  Meteor 350 - 350 CC - Supernova Green
                </Menu.Item>
                <Menu.Item
                  as="a"
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  Meteor 350-350 CC - Supernova Blue
                </Menu.Item>
                <Menu.Item
                  as="a"
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  Meteor 350 - 350 CC - Supernova White
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <Link href="/" className={styles.notifications}>
            <LiaAngleDownSolid />
          </Link>
        </div>
      </Menu>
    </div>
  )
}
