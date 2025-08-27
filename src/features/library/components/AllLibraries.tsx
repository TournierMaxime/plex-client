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
import { libraryService } from "../../../services/plex/Library"
import moment from "moment"
import { Directory, Libraries, Location } from "../../../services/types/Library"

export default function AllLibraries() {
  const [data, setData] = useState<Libraries>()

  const fetchData = async () => {
    const response = await libraryService.getAllLibraries()
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Card raised sx={{ marginTop: "1em" }}>
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
              return (
                <TableBody key={directory.uuid}>
                  <TableRow>
                    <TableCell>{directory.key}</TableCell>
                    <TableCell>{directory.title}</TableCell>
                    <TableCell>{directory.type}</TableCell>
                    <TableCell>
                      {directory.Location.map(
                        (location: Location) => location.path
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(directory.createdAt * 1000).format(
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
