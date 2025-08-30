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
import { Users } from "../../users/types/Users"
import { userService } from "../../users/services/Users"
import moment from "moment"
import useFetch from "../../../hooks/useFetch"
import Cell from "../../../components/Cell"
import { Link } from "react-router-dom"

export default function AllUsers() {
  const { data, error, fetchData, fetchError } = useFetch<Users>()

  useEffect(() => {
    fetchData(userService.getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? fetchError() : null}
      <CardHeader
        title="Users"
        slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>ID</Cell>
              <Cell>UUID</Cell>
              <Cell>User</Cell>
              <Cell>Image</Cell>
              <Cell>Admin</Cell>
              <Cell>Protected</Cell>
              <Cell>Guest</Cell>
              <Cell>Restricted</Cell>
              <Cell>Updated at</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.users
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((device) => {
                  const {
                    id,
                    uuid,
                    username,
                    title,
                    thumb,
                    updatedAt,
                    admin: isAdmin,
                    protected: isProtected,
                    guest: isGuest,
                    restricted: isRestricted,
                  } = device

                  let adminId

                  if (username === "Hoggy06") {
                    adminId = 1
                  }

                  return (
                    <TableRow key={id}>
                      <Cell>{id}</Cell>
                      <Cell>{uuid}</Cell>
                      <Cell>
                        <Link
                          to={`/users/${adminId ? adminId : id}/history/${
                            username ?? title
                          }/library/1`}
                        >
                          {username ?? title}
                        </Link>
                      </Cell>
                      <Cell>
                        <img
                          src={thumb}
                          alt={username ?? title}
                          loading="lazy"
                          decoding="async"
                          style={{
                            objectFit: "cover",
                            width: "41px",
                            borderRadius: "0.5em",
                          }}
                        />
                      </Cell>
                      <Cell>{isAdmin ? "YES" : "NO"}</Cell>
                      <Cell>{isProtected ? "YES" : "NO"}</Cell>
                      <Cell>{isGuest ? "YES" : "NO"}</Cell>
                      <Cell>{isRestricted ? "YES" : "NO"}</Cell>
                      <Cell>
                        {moment(updatedAt * 1000).format("DD/MM/YYYY HH:mm:ss")}
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
