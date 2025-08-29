import { Fragment, Suspense, lazy } from "react"
import Loading from "../components/Loading"

const Capabilities = lazy(() => import("../features/server/pages/Capabilities"))

export default function Home() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Capabilities />
      </Suspense>
    </Fragment>
  )
}
