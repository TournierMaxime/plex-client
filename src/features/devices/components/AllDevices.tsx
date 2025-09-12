import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { GetDevices } from "../../server/types/Server"
import { serverService } from "../../server/services/Server"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import Cell from "../../../components/Cell"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

export default function AllDevices() {
  const { data, error } = useQuery<GetDevices>({
    queryKey: ["devices"],
    queryFn: () => serverService.getDevices(),
    staleTime: STALE_TIME,
  })

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? <Error error={error} /> : null}
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
