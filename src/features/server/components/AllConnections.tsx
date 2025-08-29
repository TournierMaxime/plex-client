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
import { Resources } from "../types/Server"
import { serverService } from "../services/Server"
import useFetch from "../../../hooks/useFetch"
import Cell from "../../../components/Cell"
import moment from "moment"

export default function AllConnections() {
  const { data, error, fetchData, fetchError } = useFetch<Resources>()

  useEffect(() => {
    fetchData(serverService.getServerResources())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error && fetchError()}
      <CardHeader
        title="Connections"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>Name</Cell>
              <Cell>Connection</Cell>
              <Cell>Local</Cell>
              <Cell>Last seen at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.resources.map((resource) =>
                resource.connections.map((connection) => (
                  <TableRow key={`${resource.name}-${connection.uri}`}>
                    <Cell>{resource.name}</Cell>
                    <Cell>{connection.uri}</Cell>
                    <Cell>{connection.local ? "YES" : "NO"}</Cell>
                    <Cell>
                      {moment
                        .utc(resource.lastSeenAt)
                        .format("DD/MM/YYYY HH:mm:ss")}
                    </Cell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
