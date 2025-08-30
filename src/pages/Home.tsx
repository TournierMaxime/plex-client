import { Fragment, Suspense, lazy } from "react"
import Loading from "../components/Loading"
import Resources from "../features/server/pages/Resources"
import Connections from "../features/server/pages/Connections"

const Capabilities = lazy(() => import("../features/server/pages/Capabilities"))

export default function Home() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Capabilities />
        <Resources />
        <Connections />
      </Suspense>
    </Fragment>
  )
}
