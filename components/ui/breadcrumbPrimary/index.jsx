"use client"

import Link from "next/link"

// style
import styles from "./style.module.scss"

const Breadcrumb = (props) => (
  <div className="w-100">
    <div className={`${styles.breadcrumbsMain || ""} row`}>
      <div className="md-12">
        <nav className={styles.breadcrumbs}>
          {props?.breadCrumbText?.map((key, index) => (
            <Link
              key={index}
              href={key?.path}
              className={styles.breadcrumbsItem}
            >
              <span> {key?.displayText}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </div>
)

export default Breadcrumb
