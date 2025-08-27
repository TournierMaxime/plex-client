import { Fragment, Suspense } from "react"
import Devices from "../features/server/pages/Devices"
import Capabilities from "../features/server/pages/Capabilities"
import Loading from "../components/Loading"

export default function Home() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Capabilities />
        <Devices />
      </Suspense>
    </Fragment>
  )
}
