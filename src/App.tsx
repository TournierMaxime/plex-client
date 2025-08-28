import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import { Box } from "@mui/material"
import { Fragment } from "react"
import Title from "./components/Title"
import Hubs from "./pages/Hubs"
import Libraries from "./pages/Libraries"
import PlaylistsPage from "./pages/Playlists"
import OnePlaylist from "./features/playlist/pages/OnePlaylist"
import LibraryPage from "./features/library/pages/Library"
import PaginationProvider from "./context/PaginationContext"

function App() {
  return (
    <Fragment>
      <PaginationProvider>
        <Title title="Home - Plex Dashboard" />
        <Box sx={{ maxWidth: "1440px", margin: "auto" }}>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/hubs" element={<Hubs />} />
              <Route path="/libraries" element={<Libraries />} />
              <Route path="/libraries/:id/:type" element={<LibraryPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/playlists/:id" element={<OnePlaylist />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </PaginationProvider>
    </Fragment>
  )
}

export default App
