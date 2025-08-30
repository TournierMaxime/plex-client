import { plexApi as http } from "../../../services/axios"
import { History, Users } from "../types/Users"

class UserService {
  private http = http

  async getUsers(): Promise<Users> {
    const { data }: { data: Users } = await this.http.get(`/plex/users`)
    return data
  }

  async getSessionHistory(
    accountId: number,
    librarySectionID: number
  ): Promise<History> {
    const { data }: { data: History } = await this.http.get(
      `/plex/users/:id/history`,
      {
        params: {
          accountId,
          librarySectionID: librarySectionID ?? 1,
        },
      }
    )
    return data
  }
}

export const userService = new UserService()
