import { plexApi as http } from "../../../services/axios"
import { GetHubs } from "../types/Hubs"

class HubService {
  private http = http

  async getHubs(): Promise<GetHubs> {
    const { data }: { data: GetHubs } = await this.http.get(`/plex/hubs`)
    return data
  }
}

export const hubService = new HubService()
