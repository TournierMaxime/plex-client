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
import { useEffect, useState } from "react"
import { playlistService } from "../../../services/plex/Playlists"
import moment from "moment"
import { Playlists } from "../../../services/types/Playlists"
import { Link } from "react-router-dom"

export default function AllPlaylists() {
  const [data, setData] = useState<Playlists>()

  const fetchData = async () => {
    const response = await playlistService.getPlaylists()
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Card raised sx={{ marginTop: "1em" }}>
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
                return (
                  <TableBody key={metadata.ratingKey}>
                    <TableRow>
                      <TableCell>{metadata.ratingKey}</TableCell>
                      <TableCell>
                        <Link to={`/playlists/${metadata.ratingKey}`}>
                          {metadata.title}
                        </Link>
                      </TableCell>
                      <TableCell>{metadata.type}</TableCell>
                      <TableCell>
                        {moment.utc(metadata.duration).format("HH:mm:ss")}
                      </TableCell>
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
    </Card>
  )
}
