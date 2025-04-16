"use client"

import { useState, useEffect } from "react"
import { TextField, Button, Box, InputAdornment, CircularProgress } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { Modal } from "@/components/ui/modal"
import MedecinService from "@/services/medecin-service"

export function MedecinFormModal({ isOpen, onClose, onSave, editData }) {
  const isEditMode = !!editData

  const [formData, setFormData] = useState({
    nom: "",
    nombreJours: "",
    tauxJournalier: "",
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Charger les données du médecin à éditer
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        nom: editData.nom || "",
        nombreJours: editData.nombre_jours?.toString() || "",
        tauxJournalier: editData.taux_journalier?.toString() || "",
      })
    } else {
      // Réinitialiser le formulaire pour un nouveau médecin
      setFormData({
        nom: "",
        nombreJours: "",
        tauxJournalier: "",
      })
    }
    setErrors({})
  }, [isEditMode, editData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Effacer l'erreur lorsque le champ est modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis"
    }

    if (!formData.nombreJours) {
      newErrors.nombreJours = "Le nombre de jours est requis"
    } else if (isNaN(Number(formData.nombreJours)) || Number(formData.nombreJours) <= 0) {
      newErrors.nombreJours = "Le nombre de jours doit être un nombre positif"
    }

    if (!formData.tauxJournalier) {
      newErrors.tauxJournalier = "Le taux journalier est requis"
    } else if (isNaN(Number(formData.tauxJournalier)) || Number(formData.tauxJournalier) <= 0) {
      newErrors.tauxJournalier = "Le taux journalier doit être un nombre positif"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      // Préparer les données pour l'API
      const medecinData = {
        nom: formData.nom,
        nombreJours: Number(formData.nombreJours),
        tauxJournalier: Number(formData.tauxJournalier),
      }
      console.log(medecinData);
      

      let result
      if (isEditMode) {
        result = await MedecinService.updateMedecin(editData.id, medecinData)
      } else {
        result = await MedecinService.createMedecin(medecinData)
      }

      onSave(result)
      onClose()
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error)
      // Vous pourriez ajouter une gestion d'erreur plus sophistiquée ici
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Modifier le médecin" : "Ajouter un médecin"}
      size="lg"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="nom"
          name="nom"
          label="Nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Entrez le nom du médecin"
          error={!!errors.nom}
          helperText={errors.nom}
        />

        <TextField
          fullWidth
          margin="normal"
          id="nombreJours"
          name="nombreJours"
          label="Nombre de jours"
          type="number"
          value={formData.nombreJours}
          onChange={handleChange}
          placeholder="Entrez le nombre de jours"
          error={!!errors.nombreJours}
          helperText={errors.nombreJours}
          inputProps={{ min: 1 }}
        />

        <TextField
          fullWidth
          margin="normal"
          id="tauxJournalier"
          name="tauxJournalier"
          label="Taux journalier"
          type="number"
          value={formData.tauxJournalier}
          onChange={handleChange}
          placeholder="Entrez le taux journalier"
          error={!!errors.tauxJournalier}
          helperText={errors.tauxJournalier}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
            inputProps: { min: 0, step: "0.01" },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={onClose} disabled={submitting} startIcon={<CloseIcon />}>
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <CheckIcon />}
          >
            {submitting ? "Enregistrement..." : isEditMode ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
