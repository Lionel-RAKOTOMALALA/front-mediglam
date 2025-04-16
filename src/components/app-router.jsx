"use client"

import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./dashboard"
import { MedecinsList } from "./medecins-list"
import Statistics from "./statistics"
// ... autres imports

export function AppRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/medecins" element={<MedecinsList />} />
      <Route path="/statistiques" element={< Statistics/>} />


    </Routes>
  )
}