import Title from "../components/Title"
import Loading from "../components/Loading"
import { Suspense, Fragment, lazy } from "react"

const LibrariesPage = lazy(() => import("../features/library/pages/Libraries"))

export default function Libraries() {
  return (
    <Fragment>
      <Title title="Libraries" />
      <Suspense fallback={<Loading />}>
        <LibrariesPage />
      </Suspense>
    </Fragment>
  )
}
