import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useEffect } from "react"
import { libraryService } from "../services/Library"
import moment from "moment"
import { Directory, Libraries, Location } from "../types/Library"
import useFetch from "../../../hooks/useFetch"
import { Link } from "react-router-dom"
import Cell from "../../../components/Cell"

export default function AllLibraries() {
  const { data, fetchData, fetchError, error } = useFetch<Libraries>()

  useEffect(() => {
    fetchData(libraryService.getAllLibraries())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {error ? fetchError() : null}
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
