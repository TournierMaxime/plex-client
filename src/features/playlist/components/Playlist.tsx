import { Link, useParams } from "react-router-dom"
import { playlistService } from "../../../services/plex/Playlists"
import { Playlist as P } from "../../../services/types/Playlists"
import { useEffect, Fragment } from "react"
import {
  Alert,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"
import Pagination from "../../../components/Pagination"
import Title from "../../../components/Title"
import { usePagination } from "../../../context/PaginationContext"
import Cell from "../../../components/Cell"

export default function Playlist() {
  const { id } = useParams()

  const { data, error, fetchData, fetchError } = useFetch<P>()

  const { offset, limit } = usePagination()

  const count =
    (data && data.playlist.object.mediaContainer.metadata[0].leafCount) ?? -1

  useEffect(() => {
    fetchData(playlistService.getPlaylist(Number(id), 10, offset, limit))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, offset, limit])

  if (!id) return <Alert severity="warning">Playlist not founded</Alert>

  return (
    <Fragment>
      <Title
        title={data && data.playlist.object.mediaContainer.metadata[0].title}
      />
      <Card sx={{ marginTop: "1em" }}>
        {error ? fetchError() : null}
        {data &&
          data.playlist.object.mediaContainer.metadata.map((metadata) => {
            const { ratingKey, title } = metadata
            return (
              <CardHeader
                key={ratingKey}
                slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
                title={title}
              />
            )
          })}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Cell>ID</Cell>
                <Cell>Cover</Cell>
                <Cell>Title</Cell>
                <Cell>Duration</Cell>
                <Cell>Path</Cell>
                <Cell>File</Cell>
                <Cell>Song</Cell>
                <Cell>Added at</Cell>
              </TableRow>
            </TableHead>
            {data &&
              data.items.map((metadata) => {
                const { ratingKey, title, addedAt, thumb, duration, media } =
                  metadata

                const path = media.map((m) =>
                  m.part.map((p) => p.file.split("/").slice(0, 5).join("/"))
                )
                const file = media.map((m) =>
                  m.part.map((p) => p.file.split("/").slice(5).join(" "))
                )

                const listen = media.map((m) => m.part.map((p) => p.key))

                return (
                  <TableBody key={ratingKey}>
                    <TableRow>
                      <Cell>{ratingKey}</Cell>
                      <Cell>
                        <img
                          src={`${process.env.REACT_APP_URI}${thumb}?X-Plex-Token=${process.env.REACT_APP_PLEX_SERVER_TOKEN}`}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          style={{
                            objectFit: "cover",
                            width: "82px",
                            borderRadius: "0.5em",
                          }}
                        />
                      </Cell>
                      <Cell>{title}</Cell>
                      <Cell>{moment.utc(duration).format("HH:mm:ss")}</Cell>
                      <Cell>{path}</Cell>
                      <Cell>{file}</Cell>
                      <Cell>
                        <Link
                          target="_blank"
                          to={`${process.env.REACT_APP_URI}${listen}?X-Plex-Token=${process.env.REACT_APP_PLEX_SERVER_TOKEN}`}
                        >
                          Listen
                        </Link>
                      </Cell>
                      <Cell>
                        {moment(addedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                      </Cell>
                    </TableRow>
                  </TableBody>
                )
              })}
          </Table>
          <Pagination count={count} />
        </TableContainer>
      </Card>
    </Fragment>
  )
}
