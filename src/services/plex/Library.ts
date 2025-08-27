import { plexApi as http } from "../../services/axios"
import { Libraries } from "../types/Library"

class LibraryService {
  private http = http

  async getAllLibraries(): Promise<Libraries> {
    const { data }: { data: Libraries } = await this.http.get(
      `/plex/library/sections`
    )
    return data
  }
}

export const libraryService = new LibraryService()
