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
import { Capabilities } from "../../../services/types/Server"
import { serverService } from "../../../services/plex/Server"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"

export default function AllCapabilities() {
  const { data, error, fetchData, fetchError } = useFetch<Capabilities>()

  useEffect(() => {
    fetchData(serverService.getServerCapabilities())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) return null

  const {
    version,
    platformVersion,
    platform,
    friendlyName,
    updatedAt,
    machineIdentifier,
  } = data.capabilities.object.mediaContainer

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? fetchError() : null}
      <CardHeader
        title="Capabilities"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DSM</TableCell>
              <TableCell>OS</TableCell>
              <TableCell>Plex Version</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{machineIdentifier}</TableCell>
              <TableCell>{friendlyName}</TableCell>
              <TableCell>{platformVersion}</TableCell>
              <TableCell>{platform}</TableCell>
              <TableCell>{version}</TableCell>
              <TableCell>
                {moment(updatedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
