"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SortIcon from "@mui/icons-material/Sort"
import { DeleteConfirmModal } from "@/components/delete-confirm-modal"
import { MedecinFormModal } from "@/components/medecin-form-modal"
import MedecinService from "@/services/medecin-service"
import { formatCurrency } from "@/utils/formatters"

export function MedecinsList() {
  const [medecins, setMedecins] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nom")
  const [sortDirection, setSortDirection] = useState("asc")

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedMedecin, setSelectedMedecin] = useState(null)


  // Charger les médecins depuis l'API
  useEffect(() => {
    fetchMedecins()
  }, [])

  const fetchMedecins = async () => {
    try {
      setLoading(true)
      const data = await MedecinService.getAllMedecins()
      setMedecins(data)
    } catch (error) {
      console.error("Erreur lors du chargement des médecins:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)
  }

  const handleDelete = (medecin) => {
    setSelectedMedecin(medecin)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (selectedMedecin) {
      try {
        await MedecinService.deleteMedecin(selectedMedecin.id)
        setMedecins(medecins.filter((m) => m.id !== selectedMedecin.id))
        setShowDeleteModal(false)
        setSelectedMedecin(null)
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const handleEdit = (medecin) => {
    setSelectedMedecin(medecin)
    setShowFormModal(true)
  }

  const handleAdd = () => {
    setSelectedMedecin(null)
    setShowFormModal(true)
  }

  const handleSaveMedecin = (medecinData) => {
    // Rafraîchir la liste après une modification
    fetchMedecins()
  }

  // Filter and sort medecins
  const filteredMedecins = medecins
    .filter((medecin) => medecin.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (typeof fieldA === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      } else {
        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
      }
    })

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h2" fontWeight="bold">
          Liste des Médecins
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
          Ajouter un médecin
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ maxWidth: 300, mb: { xs: 2, md: 0 } }}>
            <TextField
              fullWidth
              placeholder="Rechercher un médecin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>
        </CardContent>
        <TableContainer component={Paper} elevation={0}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={() => handleSort("nom")}
                    sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Nom
                      <SortIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("nombre_jours")}
                    sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Jours
                      <SortIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("taux_journalier")}
                    sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Taux journalier
                      <SortIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("prestation")}
                    sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Prestation
                      <SortIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMedecins.length > 0 ? (
                  filteredMedecins.map((medecin) => (
                    <TableRow key={medecin.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{medecin.nom}</TableCell>
                      <TableCell>{medecin.nombre_jours}</TableCell>
                      <TableCell>{formatCurrency(medecin.taux_journalier)}</TableCell>
                      <TableCell>{formatCurrency(medecin.prestation)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => handleEdit(medecin)}
                            aria-label="Modifier"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(medecin)}
                            aria-label="Supprimer"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      Aucun médecin trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Card>

      {/* Modals */}
      <DeleteConfirmModal
        show={showDeleteModal}
        title="Supprimer le médecin"
        message={`Êtes-vous sûr de vouloir supprimer le médecin ${selectedMedecin?.nom} ?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <MedecinFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSaveMedecin}
        editData={selectedMedecin}
      />
    </>
  )
}
