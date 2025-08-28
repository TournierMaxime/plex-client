import { useParams } from "react-router-dom"
import { playlistService } from "../../../services/plex/Playlists"
import { Playlist as P } from "../../../services/types/Playlists"
import { useEffect, Fragment } from "react"
import {
  Alert,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"

export default function Playlist() {
  const { id } = useParams()

  const { data, error, fetchData, fetchError } = useFetch<P>()

  useEffect(() => {
    fetchData(playlistService.getPlaylist(Number(id), 10))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!id) return <Alert severity="warning">Playlist not founded</Alert>

  return (
    <Fragment>
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
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Added at</TableCell>
              </TableRow>
            </TableHead>
            {data &&
              data.items.object.mediaContainer.metadata.map((metadata) => {
                const { ratingKey, title, genre, country, addedAt } = metadata
                return (
                  <TableBody key={ratingKey}>
                    <TableRow>
                      <TableCell>{ratingKey}</TableCell>
                      <TableCell>{title}</TableCell>
                      <TableCell>{genre?.map((g) => g.tag)}</TableCell>
                      <TableCell>{country?.map((c) => c.tag)}</TableCell>
                      <TableCell>
                        {moment(addedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )
              })}
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  )
}
