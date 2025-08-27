import { Suspense } from "react"
import Loading from "../../../components/Loading"
import AllCapabilities from "../components/AllCapabilities"

export default function Capabilities() {
  return (
    <Suspense fallback={<Loading />}>
      <AllCapabilities />
    </Suspense>
  )
}
