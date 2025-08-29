interface Libraries {
  MediaContainer: {
    size: number
    allowSync: boolean
    title1: string
    Directory: Directory[]
  }
}

interface Directory {
  allowSync: boolean
  filters: boolean
  refreshing: boolean
  key: string
  type: string
  title: string
  agent: string
  scanner: string
  language: string
  uuid: string
  updatedAt: number
  createdAt: number
  scannedAt: number
  content: boolean
  directory: boolean
  contentChangedAt: number
  hidden: number
  Location: Location[]
}

interface Location {
  id: number
  path: string
}

interface Library {
  MediaContainer: {
    size: number
    totalSize: number
    offset: number
    allowSync: boolean
    art: string
    content: string
    identifier: string
    librarySectionID: number
    librarySectionTitle: string
    librarySectionUUID: string
    mediaTagPrefix: string
    mediaTagVersion: number
    thumb: string
    title1: string
    title2: string
    viewGroup: string
    Metadata: {
      ratingKey: string
      key: string
      guid: string
      slug: string
      studio: string
      type: string
      title: string
      originalTitle: string
      contentRating: string
      summary: string
      rating: number
      audienceRating: number
      year: number
      tagline: string
      thumb: string
      art: string
      duration: number
      originallyAvailableAt: string
      addedAt: number
      updatedAt: number
      audienceRatingImage: string
      primaryExtraKey: string
      ratingImage: string
      Media: {
        id: number
        duration: number
        bitrate: number
        width: number
        height: number
        aspectRatio: number
        audioChannels: number
        audioCodec: string
        videoCodec: string
        videoResolution: string
        container: string
        videoFrameRate: string
        videoProfile: string
        hasVoiceActivity: boolean
        Part: {
          id: number
          key: string
          duration: number
          file: string
          size: number
          container: string
          videoProfile: string
        }[]
      }[]
      Image: [
        {
          alt: string
          type: string
          url: string
        }
      ]
      UltraBlurColors: {
        topLeft: string
        topRight: string
        bottomRight: string
        bottomLeft: string
      }
      Genre: {
        tag: string
      }[]

      Country: {
        tag: string
      }[]

      Director: {
        tag: string
      }[]

      Writer: {
        tag: string
      }[]
      Role: {
        tag: string
      }[]
    }[]
  }
}

export { Libraries, Directory, Location, Library }
