interface Users {
  id: number
  name: string
  guestUserID: number
  guestUserUUID: string
  guestEnabled: boolean
  subscription: boolean
  users: User[]
}

interface User {
  id: number
  uuid: string
  title: string
  username: string
  email: string
  friendlyName: null
  thumb: string
  hasPassword: boolean
  restricted: boolean
  updatedAt: number
  restrictionProfile: null
  admin: boolean
  guest: boolean
  protected: boolean
  pin: string
  subscription: {
    state: string
    type: string
  }
}

interface History {
  sessionsHistory: {
    contentType: string
    statusCode: number
    rawResponse: {}
    object: {
      mediaContainer: {
        size: number
        metaData: {
          historyKey: string
          librarySectionID: string
          title: string
          type: string
          thumb: string
          originallyAvailableAt: string
          viewedAt: number
          accountID: number
          userName: string
          deviceID: number
          deviceName: string
        }[]
      }
    }
  }
}

export { Users, User, History }
