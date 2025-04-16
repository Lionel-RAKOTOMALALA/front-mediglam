import { useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import PeopleIcon from "@mui/icons-material/People"
import BarChartIcon from "@mui/icons-material/BarChart"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"

const DRAWER_WIDTH = 256

export function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const sidebarRef = useRef(null)

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { path: "/medecins", label: "Médecins", icon: <PeopleIcon /> },
    { path: "/statistiques", label: "Statistiques", icon: <BarChartIcon /> },
  ]



  const sidebarContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(to right, #fff, rgba(255, 255, 255, 0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MediGlam
          </Typography>
          <Box className="glitter-effect" sx={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        </Box>
      </Box>

      <List sx={{ mt: 2, px: 2, flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={pathname.startsWith(item.path)} // Modification pour gérer les sous-routes
              sx={{
                borderRadius: 1,
                py: 1.5,
                px: 2,
                color: "rgba(255, 255, 255, 0.8)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  borderRight: "2px solid #fff",
                  color: "#fff",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  transform: "translateX(4px)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: pathname.startsWith(item.path) ? 500 : 400, // Correspondance avec le selected
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>


    </Box>
  )

  return (
    <>
      {/* Version mobile */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, #e91e63, #ad1457)",
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Version desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, #e91e63, #ad1457)",
            border: "none",
          },
        }}
        open
      >
        {sidebarContent}
      </Drawer>
    </>
  )
}