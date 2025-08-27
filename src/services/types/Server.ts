interface GetMyPlexAccount {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    myPlex: {
      authToken: string
      username: string
      mappingState: string
      mappingError: string
      signInState: string
      publicAddress: string
      publicPort: number
      privateAddress: string
      privatePort: number
      subscriptionFeatures: string
      subscriptionActive: boolean
      subscriptionState: string
    }
  }
}

interface GetDevices {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
      identifier: string
      device: {
        id: number
        name: string
        platform: string
        clientIdentifier: string
        createdAt: number
      }[]
    }
  }
}

interface GetServerCapabilities {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
      allowCameraUpload: boolean
      allowChannelAccess: boolean
      allowMediaDeletion: boolean
      allowSharing: boolean
      allowSync: boolean
      allowTuners: boolean
      backgroundProcessing: boolean
      certificate: boolean
      companionProxy: boolean
      countryCode: string
      diagnostics: string
      eventStream: boolean
      friendlyName: string
      hubSearch: boolean
      itemClusters: boolean
      livetv: number
      machineIdentifier: string
      mediaProviders: boolean
      multiuser: boolean
      musicAnalysis: number
      myPlex: boolean
      myPlexMappingState: string
      myPlexSigninState: string
      myPlexSubscription: boolean
      myPlexUsername: string
      offlineTranscode: 1
      ownerFeatures: string
      platform: string
      platformVersion: string
      pluginHost: boolean
      pushNotifications: false
      readOnlyLibraries: false
      streamingBrainABRVersion: number
      streamingBrainVersion: number
      sync: boolean
      transcoderActiveVideoSessions: number
      transcoderAudio: boolean
      transcoderLyrics: boolean
      transcoderPhoto: boolean
      transcoderSubtitles: boolean
      transcoderVideo: boolean
      transcoderVideoBitrates: string
      transcoderVideoQualities: string
      transcoderVideoResolutions: string
      updatedAt: number
      updater: boolean
      version: string
      voiceSearch: boolean
      directory: {
        count: number
        key: string
        title: string
      }[]
    }
  }
}

interface GetServerClients {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
    }
  }
}

interface GetServerIdentity {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
      claimed: boolean
      machineIdentifier: string
      version: string
    }
  }
}

interface GetServerList {
  contentType: string
  statusCode: number
  rawResponse: {}
  object: {
    mediaContainer: {
      size: number
      server: {
        name: string
        host: string
        address: string
        port: number
        machineIdentifier: string
        version: string
      }[]
    }
  }
}

interface Capabilities {
  capabilities: GetServerCapabilities
  clients: GetServerClients
  identity: GetServerIdentity
  serverList: GetServerList
}

export { GetMyPlexAccount, GetDevices, GetServerCapabilities, Capabilities }
