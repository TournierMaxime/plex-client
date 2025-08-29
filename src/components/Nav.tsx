import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemButton,
  CssBaseline,
} from "@mui/material"
import { APP_NAME, BACKGROUND_COLOR, COLOR } from "../constants"
import { Link } from "react-router-dom"

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerWidth = 240

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const navItems = [
    { key: 0, name: "Hubs", path: "/hubs" },
    { key: 1, name: "Libraries", path: "/libraries" },
    { key: 2, name: "Playlists", path: "/playlists" },
    { key: 3, name: "Devices", path: "/devices" },
  ]

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "yellow" }}>
        {APP_NAME}
      </Typography>
      <Divider />
      <List>
        {navItems.map((navItem) => {
          return (
            <ListItem key={navItem.key} disablePadding>
              <Link to={navItem.path}>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText>{navItem.name}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: BACKGROUND_COLOR,
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#fff", cursor: "pointer" }}
            to={"/"}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: COLOR,
                display: { xs: "none", sm: "block" },
              }}
            >
              {APP_NAME}
            </Typography>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((navItem) => (
              <Link key={navItem.key} to={navItem.path}>
                <Button sx={{ color: "#fff" }}>{navItem.name}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav style={{ marginBottom: "4em" }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
