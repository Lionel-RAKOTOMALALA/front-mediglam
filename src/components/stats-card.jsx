import { Card, CardContent, Box, Typography } from "@mui/material"

export function StatsCard({ title, value, icon, trend, color }) {
  // Mapper les couleurs Tailwind vers les couleurs MUI
  const colorMap = {
    pink: {
      bg: "rgba(233, 30, 99, 0.08)",
      text: "primary.main",
      border: "primary.main",
    },
    green: {
      bg: "rgba(76, 175, 80, 0.08)",
      text: "success.main",
      border: "success.main",
    },
    blue: {
      bg: "rgba(33, 150, 243, 0.08)",
      text: "info.main",
      border: "info.main",
    },
    amber: {
      bg: "rgba(255, 193, 7, 0.08)",
      text: "warning.main",
      border: "warning.main",
    },
  }

  const currentColor = colorMap[color] || colorMap.pink

  return (
    <Card
      sx={{
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
        borderLeft: 4,
        borderColor: currentColor.border,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Box
            sx={{
              mr: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: 48,
              height: 48,
              bgcolor: currentColor.bg,
              color: currentColor.text,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {value}
            </Typography>
            {trend && (
              <Typography variant="caption" sx={{ mt: 0.5, display: "block" }}>
                {trend}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
