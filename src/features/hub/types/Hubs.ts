interface GetHubs {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
      allowSync: boolean
      identifier: string
      hub: Hub[]
    }
  }
}

interface Hub {
  hubKey: string
  key: string
  title: string
  type: string
  hubIdentifier: string
  context: string
  size: number
  more: boolean
  style: string
  promoted: boolean
  metadata: MetaData[]
}

interface MetaData {
  ratingKey: string
  key: string
  guid: string
  type: string
  title: string
  titleSort: string
  summary: string
  lastViewedAt: number
  duration: number
  addedAt: number
  updatedAt: number
}

export { GetHubs, Hub, MetaData }
