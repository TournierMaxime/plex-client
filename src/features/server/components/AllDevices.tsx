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
import { GetDevices } from "../../../services/types/Server"
import { serverService } from "../../../services/plex/Server"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"
import Cell from "../../../components/Cell"

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
              <Cell>ID</Cell>
              <Cell>Client ID</Cell>
              <Cell>Name</Cell>
              <Cell>Platform</Cell>
              <Cell>Created at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.object.mediaContainer.device
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((device) => {
                  const { id, clientIdentifier, name, platform, createdAt } =
                    device
                  return (
                    <TableRow key={id}>
                      <Cell>{id}</Cell>
                      <Cell>{clientIdentifier}</Cell>
                      <Cell>{name}</Cell>
                      <Cell>{platform}</Cell>
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
