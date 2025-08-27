import { Suspense } from "react"
import AllDevices from "../components/AllDevices"
import Loading from "../../../components/Loading"

export default function Devices() {
  return (
    <Suspense fallback={<Loading />}>
      <AllDevices />
    </Suspense>
  )
}
