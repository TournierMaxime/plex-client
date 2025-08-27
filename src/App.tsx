import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import { Box } from "@mui/material"
import { Fragment } from "react"
import Title from "./components/Title"
import Hubs from "./pages/Hubs"
import Libraries from "./pages/Libraries"

function App() {
  return (
    <Fragment>
      <Title title="Home - Plex Dashboard" />
      <Box sx={{ maxWidth: "1440px", margin: "auto" }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/hubs" element={<Hubs />} />
            <Route path="/libraries" element={<Libraries />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Fragment>
  )
}

export default App
