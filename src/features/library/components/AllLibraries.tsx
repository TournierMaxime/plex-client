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
import { libraryService } from "../../../services/plex/Library"
import moment from "moment"
import { Directory, Libraries, Location } from "../../../services/types/Library"
import useFetch from "../../../hooks/useFetch"

export default function AllLibraries() {
  const { data, fetchData, fetchError, error } = useFetch<Libraries>()

  useEffect(() => {
    fetchData(libraryService.getAllLibraries())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          {data &&
            data.MediaContainer.Directory.sort(
              (a, b) => b.createdAt - a.createdAt
            ).map((directory: Directory) => {
              const { uuid, key, title, type, createdAt } = directory
              return (
                <TableBody key={uuid}>
                  <TableRow>
                    <TableCell>{key}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>
                      {directory.Location.map(
                        (location: Location) => location.path
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(createdAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
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
