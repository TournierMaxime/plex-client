import useFetch from "../../../hooks/useFetch"
import { useParams } from "react-router-dom"
import { userService } from "../services/Users"
import { History } from "../types/Users"
import { useEffect, Fragment } from "react"
import {
  Alert,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import moment from "moment"
import Title from "../../../components/Title"
import Cell from "../../../components/Cell"

export default function User() {
  const { id, username, librarySectionId } = useParams()

  const { data, error, fetchData, fetchError } = useFetch<History>()

  useEffect(() => {
    fetchData(
      userService.getSessionHistory(Number(id), Number(librarySectionId))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, username])

  if (!id && !username)
    return <Alert severity="warning">History not founded</Alert>

  return (
    <Fragment>
      <Title title={`${username}'s History`} />
      <Card sx={{ marginTop: "1em" }}>
        {error ? fetchError() : null}
        <CardHeader
          slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
          title={`${username}'s History`}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Cell>Library ID</Cell>
                <Cell>Title</Cell>
                <Cell>Image</Cell>
                <Cell>Type</Cell>
                <Cell>Viewed At</Cell>
                <Cell>Device ID</Cell>
                <Cell>Device Name</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.sessionsHistory.object.mediaContainer.metaData
                  ?.sort((a, b) => b.viewedAt - a.viewedAt)
                  .map((metadata, index) => {
                    const {
                      title,
                      type,
                      librarySectionID,
                      viewedAt,
                      deviceName,
                      deviceID,
                      thumb,
                    } = metadata

                    return (
                      <TableRow key={index}>
                        <Cell>{librarySectionID}</Cell>
                        <Cell>{title}</Cell>
                        <Cell>
                          {thumb ? (
                            <img
                              src={`${process.env.REACT_APP_URI}${thumb}?X-Plex-Token=${process.env.REACT_APP_PLEX_SERVER_TOKEN}`}
                              alt={title}
                              loading="lazy"
                              decoding="async"
                              style={{
                                objectFit: "cover",
                                width: "82px",
                                borderRadius: "0.5em",
                              }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </Cell>
                        <Cell>{type}</Cell>
                        <Cell>
                          {moment
                            .utc(viewedAt * 1000)
                            .format("DD/MM/YYYY HH:mm:ss")}
                        </Cell>
                        <Cell>{deviceID}</Cell>
                        <Cell>{deviceName}</Cell>
                      </TableRow>
                    )
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  )
}
