import { Card, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { hubService } from "../../../services/plex/Hubs"
import { GetHubs, Hub } from "../../../services/types/Hubs"
import OneHub from "./OneHub"

export default function AllHubs() {
  const [data, setData] = useState<GetHubs>()

  const fetchData = async () => {
    const response = await hubService.getHubs()
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) return null

  return (
    <Fragment>
      {data &&
        data.object.mediaContainer.hub.map((hub: Hub) => {
          if (!hub.metadata) return null
          return (
            <Card
              raised
              key={hub.hubKey}
              sx={{ marginTop: "1em", marginBottom: "1em" }}
            >
              <Typography sx={{ padding: "1em" }}>{hub.title}</Typography>
              <OneHub data={hub} />
            </Card>
          )
        })}
    </Fragment>
  )
}
