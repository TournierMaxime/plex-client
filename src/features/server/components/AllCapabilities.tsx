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
import { Capabilities } from "../types/Server"
import { serverService } from "../services/Server"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"
import Cell from "../../../components/Cell"

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
              <Cell>ID</Cell>
              <Cell>Name</Cell>
              <Cell>DSM</Cell>
              <Cell>OS</Cell>
              <Cell>Plex Version</Cell>
              <Cell>Update</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Cell>{machineIdentifier}</Cell>
              <Cell>{friendlyName}</Cell>
              <Cell>{platformVersion}</Cell>
              <Cell>{platform}</Cell>
              <Cell>{version}</Cell>
              <Cell>
                {moment(updatedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
              </Cell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
