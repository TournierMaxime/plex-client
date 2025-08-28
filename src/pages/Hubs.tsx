import { Fragment } from "react/jsx-runtime"
import HubPage from "../features/hub/pages/Hubs"
import Title from "../components/Title"
import { Suspense } from "react"
import Loading from "../components/Loading"

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
