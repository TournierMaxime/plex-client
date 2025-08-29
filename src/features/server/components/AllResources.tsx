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
import moment from "moment"
import useFetch from "../../../hooks/useFetch"
import Cell from "../../../components/Cell"

export default function AllResources() {
  const { data, error, fetchData, fetchError } = useFetch<Resources>()

  useEffect(() => {
    fetchData(serverService.getServerResources())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? fetchError() : null}
      <CardHeader
        title="Resources"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>Name</Cell>
              <Cell>Product</Cell>
              <Cell>Version</Cell>
              <Cell>Platform</Cell>
              <Cell>Version</Cell>
              <Cell>Device</Cell>
              <Cell>Created at</Cell>
              <Cell>Last seen at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.resources.map((resource) => {
                const {
                  name,
                  product,
                  productVersion,
                  platform,
                  platformVersion,
                  device,
                  createdAt,
                  lastSeenAt,
                } = resource

                return (
                  <TableRow key={name}>
                    <Cell>{name}</Cell>
                    <Cell>{product}</Cell>
                    <Cell>{productVersion}</Cell>
                    <Cell>{platform}</Cell>
                    <Cell>{platformVersion}</Cell>
                    <Cell>{device}</Cell>
                    <Cell>
                      {moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </Cell>
                    <Cell>
                      {moment(lastSeenAt).format("DD/MM/YYYY HH:mm:ss")}
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
