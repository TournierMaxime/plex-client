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
          const {
            key,
            title,
            type,
            duration,
            lastViewedAt,
            addedAt,
            updatedAt,
          } = metadata
          return (
            <TableBody key={key}>
              <TableRow>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{moment.utc(duration).format("HH:mm:ss")}</TableCell>
                <TableCell>
                  {moment(lastViewedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {moment(addedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {moment(updatedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
              </TableRow>
            </TableBody>
          )
        })}
      </Table>
    </TableContainer>
  )
}
