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
import { GetDevices } from "../../../services/types/Server"
import { serverService } from "../../../services/plex/Server"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"

export default function AllDevices() {
  const { data, error, fetchData, fetchError } = useFetch<GetDevices>()

  useEffect(() => {
    fetchData(serverService.getDevices())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? fetchError() : null}
      <CardHeader
        title="Devices"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Client ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          {data &&
            data.object.mediaContainer.device
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((device) => {
                const { id, clientIdentifier, name, platform, createdAt } =
                  device
                return (
                  <TableBody key={id}>
                    <TableRow>
                      <TableCell>{id}</TableCell>
                      <TableCell>{clientIdentifier}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{platform}</TableCell>
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
