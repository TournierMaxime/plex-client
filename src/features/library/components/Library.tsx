import { useParams } from "react-router-dom"
import { Fragment, useEffect, Suspense, lazy } from "react"
import { libraryService } from "../services/Library"
import { Library as L } from "../types/Library"
import { Alert } from "@mui/material"
import useFetch from "../../../hooks/useFetch"
import Title from "../../../components/Title"
import Loading from "../../../components/Loading"
import { usePagination } from "../../../context/PaginationContext"

const RenderItems = lazy(() => import("../components/RenderItems"))

export default function Library() {
  const { id, type } = useParams()

  const { offset, limit } = usePagination()

  const { data, error, fetchData, fetchError } = useFetch<L>()

  useEffect(() => {
    if (id && type)
      fetchData(libraryService.getLibrary(id, Number(type), offset, limit))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type, offset, limit])

  if (!id) return <Alert severity="warning">Library not founded</Alert>

  return (
    <Fragment>
      <Title title={data && data.MediaContainer.title1} />
      <Suspense fallback={<Loading />}>
        <RenderItems data={data} error={error} fetchError={fetchError} />
      </Suspense>
    </Fragment>
  )
}
