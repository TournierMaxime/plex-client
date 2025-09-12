import React, { useMemo } from "react"
import { Card, CardHeader } from "@mui/material"
import { hubService } from "../services/Hubs"
import { GetHubs, Hub } from "../types/Hubs"
import OneHub from "./OneHub"
import { useQuery } from "@tanstack/react-query"
import Error from "../../../components/Error"
import { STALE_TIME } from "../../../constants"

const AllHubsInner = () => {
  const { data, error } = useQuery<GetHubs>({
    queryKey: ["hubs"],
    queryFn: () => hubService.getHubs(),
    staleTime: STALE_TIME,
  })

  const hubs: Hub[] | undefined = useMemo(
    () => data && data.object.mediaContainer.hub.filter((h) => !!h.metadata),
    [data]
  )

  const hubCards = useMemo(
    () =>
      hubs &&
      hubs.map((hub) => (
        <Card
          raised
          key={hub.hubKey}
          sx={{ marginTop: "1em", marginBottom: "1em" }}
        >
          <CardHeader
            slotProps={{ title: { sx: { fontSize: "1.2em" } } }}
            title={hub.title}
          />
          <OneHub data={hub} />
        </Card>
      )),
    [hubs]
  )

  if (error) return <Error error={error} />
  if (!data) return null

  return hubCards
}

export default React.memo(AllHubsInner)
