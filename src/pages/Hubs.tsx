import Title from "../components/Title"
import { lazy, Suspense, Fragment } from "react"
import Loading from "../components/Loading"

const HubPage = lazy(() => import("../features/hub/pages/Hubs"))

export default function Hubs() {
  return (
    <Fragment>
      <Title title="Hubs" />
      <Suspense fallback={<Loading />}>
        <HubPage />
      </Suspense>
    </Fragment>
  )
}
