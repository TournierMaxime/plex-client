import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { libraryService } from "../services/Library"
import moment from "moment"
import { Directory, Libraries, Location } from "../types/Library"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import Cell from "../../../components/Cell"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

export default function AllLibraries() {
  const { data, error } = useQuery<Libraries>({
    queryKey: ["libraries"],
    queryFn: () => libraryService.getAllLibraries(),
    staleTime: STALE_TIME,
  })

  const typeCase = (t: string) => {
    switch (t) {
      case (t = "show"):
        return 2
      case (t = "artist"):
        return 8
      default:
        return 1
    }
  }

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? <Error error={error} /> : null}
      <CardHeader
        title="Libraries"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>ID</Cell>
              <Cell>Title</Cell>
              <Cell>Type</Cell>
              <Cell>Location</Cell>
              <Cell>Created at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.MediaContainer.Directory.map((directory: Directory) => {
                const { uuid, key, title, type, createdAt } = directory

                const t = typeCase(type)
                return (
                  <TableRow key={uuid}>
                    <Cell>{key}</Cell>
                    <Cell>
                      <Link to={`/libraries/${key}/${t}`}>{title}</Link>
                    </Cell>
                    <Cell>{type}</Cell>
                    <Cell>
                      {directory.Location.map(
                        (location: Location) => location.path
                      )}
                    </Cell>
                    <Cell>
                      {moment(createdAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
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
