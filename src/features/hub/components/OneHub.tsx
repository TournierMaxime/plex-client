import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Hub, MetaData } from "../../../services/types/Hubs"
import moment from "moment"
import Cell from "../../../components/Cell"

export default function OneHub({ data }: { data: Hub }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Cell>Title</Cell>
            <Cell>Type</Cell>
            <Cell>Duration</Cell>
            <Cell>Last View</Cell>
            <Cell>Added</Cell>
            <Cell>Updated</Cell>
          </TableRow>
        </TableHead>
        <TableBody>
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
              <TableRow key={key}>
                <Cell>{title}</Cell>
                <Cell>{type}</Cell>
                <Cell>{moment.utc(duration).format("HH:mm:ss")}</Cell>
                <Cell>
                  {moment(lastViewedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                </Cell>
                <Cell>
                  {moment(addedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                </Cell>
                <Cell>
                  {moment(updatedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                </Cell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
