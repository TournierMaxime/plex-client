import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { playlistService } from "../services/Playlists"
import moment from "moment"
import { Playlists } from "../types/Playlists"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import Cell from "../../../components/Cell"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

export default function AllPlaylists() {
  const { data, error } = useQuery<Playlists>({
    queryKey: ["playlists"],
    queryFn: () => playlistService.getPlaylists(),
    staleTime: STALE_TIME,
  })
  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? <Error error={error} /> : null}
      <CardHeader
        title="Playlists"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>ID</Cell>
              <Cell>Title</Cell>
              <Cell>Type</Cell>
              <Cell>Duration</Cell>
              <Cell>Added at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.object.mediaContainer.metadata
                .sort((a, b) => b.addedAt - a.addedAt)
                .map((metadata) => {
                  const { ratingKey, title, type, duration, addedAt } = metadata
                  return (
                    <TableRow key={ratingKey}>
                      <Cell>{ratingKey}</Cell>
                      <Cell>
                        <Link to={`/playlists/${ratingKey}`}>{title}</Link>
                      </Cell>
                      <Cell>{type}</Cell>
                      <Cell>{moment.utc(duration).format("HH:mm:ss")}</Cell>
                      <Cell>
                        {moment(addedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                      </Cell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
