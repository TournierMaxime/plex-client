import Loading from "../components/Loading"
import Title from "../components/Title"
import Playlists from "../features/playlist/pages/Playlists"
import { Fragment, Suspense } from "react"

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
