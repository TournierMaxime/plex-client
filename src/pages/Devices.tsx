import { lazy, Suspense } from "react"
import Loading from "../components/Loading"

const DevicesPage = lazy(() => import("../features/server/pages/Devices"))

export default function Devices() {
  return (
    <Suspense fallback={<Loading />}>
      <DevicesPage />
    </Suspense>
  )
}
