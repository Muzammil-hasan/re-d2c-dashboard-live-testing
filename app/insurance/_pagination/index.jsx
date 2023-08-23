"use client"

import { GoChevronLeft, GoChevronRight } from "react-icons/go"

import { repeatMap } from "~/lib/utils"
import { Button } from "~/components/ui/button"

function Pagination({ page, setPage, pageCount }) {
  return (
    <div className={"pagination"}>
      <p className={"pagination_pageCount"}>
        Page <span>{page}</span> of <span>{pageCount}</span>
      </p>
      <div className={"pagination_actions"}>
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
        >
          <GoChevronLeft size={22} />
          <span className={"pagination_text"}>Previous</span>
        </Button>

        <ul className={"pagination_actions__count"}>
          {repeatMap(pageCount, (pageIndex) => (
            <li key={pageIndex}>
              <Button
                variant={"count"}
                onClick={() => setPage(pageIndex + 1)}
                data-state={page === pageIndex + 1 && "selected"}
              >
                {pageIndex + 1}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === pageCount}
        >
          <span className={"pagination_text"}>Next</span>
          <GoChevronRight size={22} />
        </Button>
      </div>
    </div>
  )
}

export { Pagination }
