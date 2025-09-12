import { useParams } from "react-router-dom"
import { Fragment, Suspense, lazy } from "react"
import { libraryService } from "../services/Library"
import { Library as L } from "../types/Library"
import { Alert } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import Title from "../../../components/Title"
import Loading from "../../../components/Loading"
import { usePagination } from "../../../context/PaginationContext"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

const RenderItems = lazy(() => import("../components/RenderItems"))

export default function Library() {
  const { id, type } = useParams()

  const { offset, limit } = usePagination()

  const enabled = !!id && !!type

  const { data, error } = useQuery<L>({
    queryKey: ["library", id, type, offset, limit],
    queryFn: () => libraryService.getLibrary(id!, Number(type), offset, limit),
    enabled,
    staleTime: STALE_TIME,
  })

  if (!id) return <Alert severity="warning">Library not founded</Alert>

  if (error) return <Error error={error} />

  return (
    <Fragment>
      <Title title={data && data.MediaContainer.title1} />
      <Suspense fallback={<Loading />}>
        <RenderItems data={data} />
      </Suspense>
    </Fragment>
  )
}
