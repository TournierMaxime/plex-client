import { Card, CardHeader } from "@mui/material"
import { Fragment, useEffect } from "react"
import { hubService } from "../services/Hubs"
import { GetHubs, Hub } from "../types/Hubs"
import OneHub from "./OneHub"
import useFetch from "../../../hooks/useFetch"

export default function AllHubs() {
  const { data, fetchData, error, fetchError } = useFetch<GetHubs>()

  useEffect(() => {
    fetchData(hubService.getHubs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) return null

  return (
    <Fragment>
      {error ? fetchError() : null}
      {data &&
        data.object.mediaContainer.hub.map((hub: Hub) => {
          const { metadata, hubKey, title } = hub

          if (!metadata) return null
          return (
            <Card
              raised
              key={hubKey}
              sx={{ marginTop: "1em", marginBottom: "1em" }}
            >
              <CardHeader
                slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
                title={title}
              />
              <OneHub data={hub} />
            </Card>
          )
        })}
    </Fragment>
  )
}
