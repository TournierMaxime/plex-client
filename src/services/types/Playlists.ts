interface Playlists {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
      metadata: MetaData[]
    }
  }
}

interface MetaData {
  ratingKey: string
  key: string
  guid: string
  type: string
  title: string
  summary: string
  smart: boolean
  playlistType: string
  composite: string
  icon: string
  viewCount: number
  lastViewedAt: number
  duration: number
  leafCount: number
  addedAt: number
  updatedAt: number
}

interface Playlist {
  playlist: {
    contentType: string
    statusCode: number
    rawResponse: {}
    object: {
      mediaContainer: {
        size: number
        metadata: {
          ratingKey: string
          key: string
          guid: string
          type: string
          title: string
          summary: string
          smart: boolean
          playlistType: string
          composite: string
          duration: number
          leafCount: number
          addedAt: number
          updatedAt: number
        }[]
      }
    }
  }
  items: PlaylistContent[]
}

interface PlaylistContent {
  ratingKey: string
  key: string
  guid: string
  type: string
  title: string
  titleSort: string
  librarySectionTitle: string
  librarySectionID: number
  librarySectionKey: string
  summary: string
  thumb: string
  duration: number
  addedAt: number
  updatedAt: number
  media: {
    id: number
    duration: number
    bitrate: number
    audioChannels: number
    audioCodec: string
    container: string
    part: {
      id: number
      key: string
      duration: number
      file: string
      size: number
      container: string
    }[]
  }[]
}

export { Playlists, Playlist, PlaylistContent }
