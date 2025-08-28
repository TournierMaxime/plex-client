import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useEffect } from "react"
import { playlistService } from "../../../services/plex/Playlists"
import moment from "moment"
import { Playlists } from "../../../services/types/Playlists"
import { Link } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"

export default function AllPlaylists() {
  const { data, fetchData, fetchError, error } = useFetch<Playlists>()

  useEffect(() => {
    fetchData(playlistService.getPlaylists())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? fetchError() : null}
      <CardHeader
        title="Playlists"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Added at</TableCell>
            </TableRow>
          </TableHead>
          {data &&
            data.object.mediaContainer.metadata
              .sort((a, b) => b.addedAt - a.addedAt)
              .map((metadata) => {
                const { ratingKey, title, type, duration, addedAt } = metadata
                return (
                  <TableBody key={ratingKey}>
                    <TableRow>
                      <TableCell>{ratingKey}</TableCell>
                      <TableCell>
                        <Link to={`/playlists/${ratingKey}`}>{title}</Link>
                      </TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>
                        {moment.utc(duration).format("HH:mm:ss")}
                      </TableCell>
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
  )
}
