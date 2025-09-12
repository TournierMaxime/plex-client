import { lazy, Suspense } from "react"
import Loading from "../../../components/Loading"

const AllDevices = lazy(() => import("../components/AllDevices"))

export default function Devices() {
  return (
    <Suspense fallback={<Loading />}>
      <AllDevices />
    </Suspense>
  )
}
