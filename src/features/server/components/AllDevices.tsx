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
import { GetDevices } from "../../../services/types/Server"
import { serverService } from "../../../services/plex/Server"
import moment from "moment"

export default function AllDevices() {
  const [data, setData] = useState<GetDevices>()

  const fetchData = async () => {
    const response = await serverService.getDevices()
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Card raised sx={{ marginTop: "1em" }}>
      <CardHeader
        title="All Devices"
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
                return (
                  <TableBody key={device.id}>
                    <TableRow>
                      <TableCell>{device.id}</TableCell>
                      <TableCell>{device.clientIdentifier}</TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.platform}</TableCell>
                      <TableCell>
                        {moment(device.createdAt * 1000).format(
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
