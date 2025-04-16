"use client"

import { useEffect, useRef } from "react"
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export function Modal({ isOpen, onClose, title, children, size = "md" }) {
  const modalRef = useRef(null)

  // Déterminer la largeur du modal en fonction de la taille
  const getMaxWidth = () => {
    switch (size) {
      case "sm":
        return "sm"
      case "md":
        return "md"
      case "lg":
        return "lg"
      case "xl":
        return "lg" // MUI n'a pas de xl, on utilise lg
      default:
        return "md"
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={getMaxWidth()}
      fullWidth
      ref={modalRef}
      aria-labelledby="modal-title"
    >
      <DialogTitle
        id="modal-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          pb: 1,
        }}
      >
        {title}
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 1 }}>{children}</DialogContent>
    </Dialog>
  )
}
