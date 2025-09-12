import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Users } from "../../users/types/Users"
import { userService } from "../../users/services/Users"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import Cell from "../../../components/Cell"
import { Link } from "react-router-dom"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

export default function AllUsers() {
  const { data, error } = useQuery<Users>({
    queryKey: ["users"],
    queryFn: () => userService.getUsers(),
    staleTime: STALE_TIME,
  })

  return (
    <Card raised sx={{ marginTop: "1em" }}>
      {error ? <Error error={error} /> : null}
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
