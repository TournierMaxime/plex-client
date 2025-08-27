import axios from "axios"

export const plexApi = axios.create({
  baseURL: process.env.REACT_APP_PLEX_API,
})
