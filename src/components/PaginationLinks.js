import React from "react"

import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

function PaginationLinks({ currentPage, numberofPages }) {
  const isFirst = currentPage === 1
  const isLast = currentPage === numberofPages
  const previousPage =
    currentPage - 1 === 1 ? "/" : "/page/" + (currentPage - 1).toString()
  const nextPage = `/page/${currentPage + 1}`.toString()

  return (
    <Pagination aria-label="Page navigation example">
      {isFirst ? (
        <PaginationItem disabled>
          <PaginationLink previous href="/"></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous href={previousPage}></PaginationLink>
        </PaginationItem>
      )}
      {Array.from({ length: numberofPages }, (_, index) => {
        console.log("123")
        return currentPage === index + 1 ? (
          <PaginationItem active key={index}>
            <PaginationLink
              href={`/${index === 0 ? "" : "page/" + (index + 1)}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={index}>
            <PaginationLink
              href={`/${index === 0 ? "" : "page/" + (index + 1)}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )
      })}

      {isLast ? (
        <PaginationItem disabled>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      )}
    </Pagination>
  )
}

export default PaginationLinks
