import { plexApi as http } from "../../../services/axios"
import { Libraries, Library } from "../types/Library"

class LibraryService {
  private http = http

  async getAllLibraries(): Promise<Libraries> {
    const { data }: { data: Libraries } = await this.http.get(
      `/plex/library/sections`
    )
    return data
  }
  async getLibrary(
    sectionKey: string,
    type: number,
    offset?: number,
    limit?: number
  ): Promise<Library> {
    const { data }: { data: Library } = await this.http.get(
      `/plex/library/sections/${sectionKey}/all`,
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

  /**
   * 1 = movie
   * 2 = show
   * 3 = season
   * 4 = episode
   * 8 = artist
   * 9 = album
   * 10 = song
   * E.g. A movie library will not return anything with type 3 as there are no seasons for movie libraries
   * Available options: 1, 2, 3, 4, 8, 9, 10
   *
   */
}

export const libraryService = new LibraryService()
