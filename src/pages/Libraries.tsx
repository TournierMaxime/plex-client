import { Fragment } from "react/jsx-runtime"
import LibraryPage from "../features/library/pages/Library"
import Title from "../components/Title"
import Loading from "../components/Loading"
import { Suspense } from "react"

export default function Libraries() {
  return (
    <Fragment>
      <Title title="Libraries" />
      <Suspense fallback={<Loading />}>
        <LibraryPage />
      </Suspense>
    </Fragment>
  )
}
