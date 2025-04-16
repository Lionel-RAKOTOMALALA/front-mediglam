"use client"

import { useState } from "react"
import { Box } from "@mui/material"
import { Sidebar } from "./sidebar.jsx"
import { Header } from "./header.jsx"

export function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Sidebar isOpen={sidebarOpen} />

      <Box
        component="div"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease-in-out",
          ml: { md: "256px" },
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <Box component="main" sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
