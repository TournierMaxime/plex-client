import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Resources } from "../types/Server"
import { serverService } from "../services/Server"
import { useQuery } from "@tanstack/react-query"
import Cell from "../../../components/Cell"
import moment from "moment"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

export default function AllConnections() {
  const { data, error } = useQuery<Resources>({
    queryKey: ["connection"],
    queryFn: () => serverService.getServerResources(),
    staleTime: STALE_TIME,
  })

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? <Error error={error} /> : null}
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
