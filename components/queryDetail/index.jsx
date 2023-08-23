import Link from "next/link"
import { BiCheck } from "react-icons/bi"
import { useMutation, useQueryClient } from "react-query"

import { Button } from "~/components/ui/button"
import { updateQueryStatus } from "~/app/enquiry/request"

import styles from "./style.module.scss"

const QueryDetailBox = (props) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newStatus) => updateQueryStatus(props.idName, newStatus),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["enquiryDetailData"])
      },
    }
  )

  return (
    <div className={styles.queryCard}>
      <div className={styles.queryCardHead}>
        <div className={styles.queryCardTopRow}>
          <div className={styles.queryCarTopCol}>
            <p>
              {props.id}
              <span>{props.idName} </span>
            </p>
          </div>

          <div className={`${styles.queryCardTopCol}`}>
            <div className="d-flex align-items-center">
              <div
                className={`${styles.statusCircle} status-circle danger me-2 `}
              />
              <p>
                {props.statusTitle}
                <span> {props.status}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.queryCardBottomRow}>
          <div className={styles.queryCardColumns}>
            <div className={styles.queryCardBottomCol}>
              <div className={styles.colItem}>
                <p>{props.title1}</p>
                <span>{props.subtitle1} </span>
              </div>

              <div className={styles.colItem}>
                <p>{props.title2}</p>
                <span>{props.subtitle2}</span>
              </div>

              <div className={styles.colItem}>
                <p>{props.title3}</p>
                <span>{props.subtitle3} </span>
              </div>

              <div className={styles.colItem}>
                <p>{props.title4}</p>
                <span>{props.subtitle4}</span>
              </div>

              <div className={styles.colItem}>
                <p>{props.title5}</p>
                <span>{props.subtitle5}</span>
              </div>
            </div>
          </div>

          <div className={`${styles.mobileAlign}`}>
            <div className={styles.secondaryBtnCustom}>
              <Link href="/enquiry">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => mutation.mutate("RESOLVED")}
                  disabled={mutation.isLoading}
                >
                  <BiCheck size={18} /> <span>RESOLVED</span>
                </Button>
              </Link>
              <div>
                {/* <Button variant="accent" size="sm">
 <span>CONTACT</span> <IoIosArrowForward />
 </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueryDetailBox
