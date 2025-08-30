import { plexApi as http } from "../../../services/axios"
import {
  Capabilities,
  GetDevices,
  GetMyPlexAccount,
  Resources,
  Users,
} from "../types/Server"

class ServerService {
  private http = http

  async getMyPlexAccount(): Promise<GetMyPlexAccount> {
    const { data }: { data: GetMyPlexAccount } = await this.http.get(
      `/plex/server/myplex/account`
    )
    return data
  }

  async getDevices(): Promise<GetDevices> {
    const { data }: { data: GetDevices } = await this.http.get(
      `/plex/server/devices`
    )
    return data
  }

  async getServerCapabilities(): Promise<Capabilities> {
    const { data }: { data: Capabilities } = await this.http.get(
      `/plex/server/capabilities`
    )
    return data
  }

  async getServerResources(): Promise<Resources> {
    const { data }: { data: Resources } = await this.http.get(
      `/plex/server/resources`
    )
    return data
  }
}

export const serverService = new ServerService()
