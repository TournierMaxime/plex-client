import { plexApi as http } from "../../../services/axios"
import { Playlists, Playlist } from "../types/Playlists"

class PlaylistService {
  private http = http

  async getPlaylists(): Promise<Playlists> {
    const { data }: { data: Playlists } = await this.http.get(`/plex/playlists`)
    return data
  }

  async getPlaylist(
    playlistID: number,
    type: number,
    offset: number,
    limit: number
  ): Promise<Playlist> {
    const { data }: { data: Playlist } = await this.http.get(
      `/plex/playlists/${playlistID}`,
      {
        params: {
          type,
          offset,
          limit,
        },
      }
    )
    return data
  }
}

export const playlistService = new PlaylistService()
