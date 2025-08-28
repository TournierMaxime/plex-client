import Loading from "../components/Loading"
import Title from "../components/Title"
import { Fragment, lazy, Suspense } from "react"

const Playlists = lazy(() => import("../features/playlist/pages/Playlists"))

export default function PlaylistsPage() {
  return (
    <Fragment>
      <Title title="Playlists" />
      <Suspense fallback={<Loading />}>
        <Playlists />
      </Suspense>
    </Fragment>
  )
}
