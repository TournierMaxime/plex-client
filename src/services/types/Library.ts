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

export { Libraries, Directory, Location }
