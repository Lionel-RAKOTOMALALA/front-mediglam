"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"

export function DeleteConfirmModal({ show, title, message, onConfirm, onCancel }) {
  return (
    <Dialog
      open={show}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(255, 193, 7, 0.1)",
              borderRadius: "50%",
              p: 2,
              color: "warning.main",
            }}
          >
            <WarningAmberIcon fontSize="large" />
          </Box>
        </Box>
        <DialogTitle id="alert-dialog-title" sx={{ pb: 0 }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary" id="alert-dialog-description">
            {message}
          </Typography>
        </DialogContent>
      </Box>
      <DialogActions sx={{ p: 2, pt: 0, justifyContent: "center", borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Button onClick={onCancel} variant="outlined">
          Annuler
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
