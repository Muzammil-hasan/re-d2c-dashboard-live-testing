"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { GoChevronLeft, GoChevronRight } from "react-icons/go"
import { useQuery } from "react-query"

import { repeatMap } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

export function DataTable({
  columns,
  initialData,
  queryKey,
  queryFn,
  pageCount,
}) {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 })
  const [rowSelection, setRowSelection] = useState({})
  const { data } = useQuery({
    initialData,
    queryKey: [...queryKey, pagination.pageIndex],
    queryFn: () => queryFn(pagination, queryKey),
  })

  const {
    getState,
    nextPage,
    getRowModel,
    setPageIndex,
    previousPage,
    getPageCount,
    getHeaderGroups,
  } = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: pageCount + 1,
    state: { pagination, rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
  })

  const currentPage = getState().pagination.pageIndex

  return (
    <div>
      <Table>
        <TableHeader>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {getRowModel().rows?.length ? (
            getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={"pagination"}>
        <p className={"pagination_pageCount"}>
          Page <span>{currentPage}</span> of <span>{getPageCount() - 1}</span>
        </p>
        <div className={"pagination_actions"}>
          <Button onClick={previousPage} disabled={currentPage === 1}>
            <GoChevronLeft size={22} />
            <span className={"pagination_text"}>Previous</span>
          </Button>

          <ul className={"pagination_actions__count"}>
            {repeatMap(getPageCount() - 1, (pageIndex) => (
              <li key={pageIndex}>
                <Button
                  variant={"count"}
                  onClick={() => setPageIndex(pageIndex + 1)}
                  data-state={currentPage === pageIndex + 1 && "selected"}
                >
                  {pageIndex + 1}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            onClick={nextPage}
            disabled={currentPage === getPageCount() - 1}
          >
            <span className={"pagination_text"}>Next</span>
            <GoChevronRight size={22} />
          </Button>
        </div>
      </div>
    </div>
  )
}
