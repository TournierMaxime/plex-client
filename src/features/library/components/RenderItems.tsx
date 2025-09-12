import { Library as L } from "../types/Library"
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import moment from "moment"
import Tag from "../../../components/Tag"
import Cell from "../../../components/Cell"
import Pagination from "../../../components/Pagination"

export type RenderItemsProps = {
  data: L | undefined
}

export default function RenderItems({ data }: RenderItemsProps) {
  const count = (data && data.MediaContainer.totalSize) ?? -1

  return (
    <Card sx={{ marginTop: "1em" }}>
      <CardHeader
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
        title={data && data.MediaContainer.title1}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>ID</Cell>
              <Cell>Cover</Cell>
              <Cell>Title</Cell>
              <Cell>Duration</Cell>
              <Cell>Genre</Cell>
              <Cell>Country</Cell>
              <Cell>Added at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.MediaContainer.Metadata?.sort(
                (a, b) => b.addedAt - a.addedAt
              ).map((metadata) => {
                const {
                  ratingKey,
                  title,
                  duration,
                  Genre,
                  Country,
                  addedAt,
                  Image,
                } = metadata
                return (
                  <TableRow key={ratingKey}>
                    <Cell>{ratingKey}</Cell>
                    <Cell>
                      {Image?.filter((i) => i.type === "coverPoster").map(
                        (i) => {
                          return (
                            <img
                              key={i.url}
                              src={`${process.env.REACT_APP_URI}${i.url}?X-Plex-Token=${process.env.REACT_APP_PLEX_SERVER_TOKEN}`}
                              alt={i.alt}
                              loading="lazy"
                              decoding="async"
                              style={{
                                objectFit: "cover",
                                width: "82px",
                                borderRadius: "0.5em",
                              }}
                            />
                          )
                        }
                      )}
                    </Cell>
                    <Cell>{title}</Cell>
                    <Cell>{moment.utc(duration).format("HH:mm:ss")}</Cell>
                    <Cell>
                      {Genre?.map((g) => (
                        <Tag key={g.tag} label={g.tag} />
                      ))}
                    </Cell>
                    <Cell>
                      {Country?.map((c) => (
                        <Tag key={c.tag} label={c.tag} />
                      ))}
                    </Cell>
                    <Cell>
                      {moment(addedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
                    </Cell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        <Pagination count={count} />
      </TableContainer>
    </Card>
  )
}
