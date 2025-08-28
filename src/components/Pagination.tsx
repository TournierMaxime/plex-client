import { TablePagination } from "@mui/material"
import { usePagination } from "../context/PaginationContext"

export default function Pagination({ count }: { count: number }) {
  const {
    page,
    limit,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
  } = usePagination()

  return (
    <TablePagination
      style={{ display: "flex", justifyContent: "center" }}
      component="div"
      count={count}
      page={page}
      rowsPerPage={limit}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  )
}
