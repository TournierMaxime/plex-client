import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Hub, MetaData } from "../../../services/types/Hubs"
import moment from "moment"

export default function OneHub({ data }: { data: Hub }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Last View</TableCell>
            <TableCell>Added</TableCell>
            <TableCell>Updated</TableCell>
          </TableRow>
        </TableHead>
        {data?.metadata?.map((metadata: MetaData) => {
          return (
            <TableBody key={metadata.key}>
              <TableRow>
                <TableCell>{metadata.title}</TableCell>
                <TableCell>{metadata.type}</TableCell>
                <TableCell>
                  {moment.utc(metadata.duration).format("HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {moment(metadata.lastViewedAt * 1000).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </TableCell>
                <TableCell>
                  {moment(metadata.addedAt * 1000).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </TableCell>
                <TableCell>
                  {moment(metadata.updatedAt * 1000).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          )
        })}
      </Table>
    </TableContainer>
  )
}
