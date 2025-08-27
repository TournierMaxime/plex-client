import { useParams } from "react-router-dom"
import { playlistService } from "../../../services/plex/Playlists"
import { Playlist as P } from "../../../services/types/Playlists"
import { useState, useEffect, Fragment } from "react"
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

export default function Playlist() {
  const { id } = useParams()

  const [data, setData] = useState<P>()

  const fetchData = async () => {
    const response = await playlistService.getPlaylist(Number(id), 8)
    setData(response)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!id) return <Alert severity="warning">Playlist not founded</Alert>

  return (
    <Fragment>
      {data?.playlist.object.mediaContainer.metadata.map((metadata) => {
        return (
          <Card key={metadata.ratingKey} sx={{ marginTop: "1em" }}>
            <CardHeader title={metadata.title} />
          </Card>
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
          {data?.items.object.mediaContainer.metadata.map((metadata) => {
            return (
              <TableBody key={metadata.ratingKey}>
                <TableRow key={metadata.ratingKey}>
                  <TableCell>{metadata.ratingKey}</TableCell>
                  <TableCell>{metadata.title}</TableCell>
                  <TableCell>{metadata.genre?.map((g) => g.tag)}</TableCell>
                  <TableCell>{metadata.country?.map((c) => c.tag)}</TableCell>
                  <TableCell>
                    {moment(metadata.addedAt * 1000).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          })}
        </Table>
      </TableContainer>
    </Fragment>
  )
}
