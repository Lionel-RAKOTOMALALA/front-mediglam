"use client"

import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Box } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"

export function Header({ toggleSidebar }) {
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ zIndex: 1100 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 600, color: "text.primary" }}>
          Gestion des Médecins
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>


          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.light",
                color: "primary.dark",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              A
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                display: { xs: "none", md: "block" },
              }}
            >
              Admin
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
