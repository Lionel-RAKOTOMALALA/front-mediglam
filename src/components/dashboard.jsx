"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"

import { Link, useLocation } from "react-router-dom"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import DiamondIcon from "@mui/icons-material/Diamond"
import { MedecinFormModal } from "@/components/medecin-form-modal"
import MedecinService from "../services/medecin-service.js"
import { formatCurrency } from "@/utils/formatters"

// Import des composants Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  LabelList,
} from "recharts"

export function Dashboard() {
  const location = useLocation()
  const [stats, setStats] = useState({
    count: 0,
    total: 0,
    max: 0,
    min: 0,
  })
  const [medecins, setMedecins] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMedecin, setSelectedMedecin] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Charger les données depuis l'API
  useEffect(() => {
    fetchData()

    // Permettre le défilement
    document.body.style.overflow = "auto"
    document.documentElement.style.overflow = "auto"

    return () => {
      // Nettoyer les styles lors du démontage
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [])

  const handleEdit = (medecin) => {
    setSelectedMedecin(medecin)
    setShowFormModal(true)
  }

  const handleDelete = (medecin) => {
    setSelectedMedecin(medecin)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await MedecinService.deleteMedecin(selectedMedecin.id)
      fetchData()
      setShowDeleteModal(false)
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      // Récupération séquentielle sans Promise.all
      const medecinsData = await MedecinService.getAllMedecins()
      const statsData = await MedecinService.getStats()

      setMedecins(medecinsData)
      setStats(statsData)

      console.log("Données médecins:", medecinsData)
      console.log("Stats:", statsData)
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMedecin = () => {
    fetchData()
  }

  // Données pour le graphique en barres avec plusieurs catégories pour plus d'espace
  const barData = [
    { name: "Prestations", Total: stats.total },
    { name: "Taux Max", Max: stats.max },
    { name: "Taux Min", Min: stats.min },
  ]

  // Données pour le graphique en anneau (donut) - utilisation des 3 prestations
  const donutData = [
    { name: "Prestation Totale", value: Number.parseFloat(stats.total) || 0, color: "#ff6b6b" },
    { name: "Taux Max", value: Number.parseFloat(stats.max) || 0, color: "#4dabf7" },
    { name: "Taux Min", value: Number.parseFloat(stats.min) || 0, color: "#51cf66" },
  ]

  // Animation de paillettes pour les cartes
  const glitterKeyframes = `
    @keyframes glitter {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `

  // Styles pour les cartes de statistiques avec des couleurs plus vives et des paillettes
  const cardStyles = {
    weeklyTotal: {
      background: "#ff6b6b", // Rouge vif
      color: "white",
      borderRadius: 2,
      height: "100%",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 55%)",
        backgroundSize: "200% 200%",
        animation: "glitter 3s ease-in-out infinite",
        pointerEvents: "none",
      },
    },
    weeklyMax: {
      background: "#4dabf7", // Bleu vif
      color: "white",
      borderRadius: 2,
      height: "100%",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 55%)",
        backgroundSize: "200% 200%",
        animation: "glitter 3s ease-in-out infinite",
        animationDelay: "0.5s",
        pointerEvents: "none",
      },
    },
    weeklyMin: {
      background: "#51cf66", // Vert vif
      color: "white",
      borderRadius: 2,
      height: "100%",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(45deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 55%)",
        backgroundSize: "200% 200%",
        animation: "glitter 3s ease-in-out infinite",
        animationDelay: "1s",
        pointerEvents: "none",
      },
    },
    icon: {
      position: "absolute",
      top: 20,
      right: 20,
      fontSize: 30,
      color: "rgba(255, 255, 255, 0.7)",
    },
    circle: {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
    },
    circle1: {
      width: 120,
      height: 120,
      bottom: -30,
      right: -30,
    },
    circle2: {
      width: 80,
      height: 80,
      bottom: 20,
      right: 40,
    },
    circle3: {
      width: 60,
      height: 60,
      bottom: 60,
      right: 10,
    },
  }

  // Styles modernes pour les graphiques
  const chartCardStyle = {
    boxShadow: "0 8px 24px rgba(149, 157, 165, 0.1)",
    borderRadius: "16px",
    overflow: "hidden",
    border: "none",
    height: "100%",
    width: "100%", // Assurer que la carte prend toute la largeur disponible
  }

  const chartHeaderStyle = {
    padding: "20px 24px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
  }

  const chartContentStyle = {
    padding: "24px",
    height: "calc(100% - 73px)", // Hauteur totale moins la hauteur du header
  }

  // Fonction personnalisée pour formater les tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <p style={{ margin: "0 0 8px", fontWeight: "600", color: "#333" }}>{label || payload[0].name || ""}</p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{
                margin: "4px 0",
                color: entry.payload?.color || entry.color,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: entry.payload?.color || entry.color,
                  marginRight: "8px",
                  borderRadius: "50%",
                }}
              ></span>
              <span style={{ fontWeight: "500" }}>{`${entry.name}: ${formatCurrency(entry.value)}`}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Style pour la légende personnalisée
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry
    return (
      <span style={{ color, fontWeight: 500, fontSize: 12, marginRight: 10 }}>
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            backgroundColor: color,
            marginRight: 5,
            borderRadius: "50%",
            marginBottom: -1,
          }}
        />
        {value}
      </span>
    )
  }

  // Calcul du total pour les pourcentages avec vérification pour éviter les NaN
  const total = donutData.reduce((sum, item) => {
    // S'assurer que la valeur est un nombre valide
    const value = typeof item.value === "number" && !isNaN(item.value) ? item.value : 0
    return sum + value
  }, 0)

  // Fonction pour le rendu de la légende du donut
  const renderLegendText = (value, entry) => {
    const { payload } = entry
    // S'assurer que la valeur est un nombre valide
    const itemValue = typeof payload.value === "number" && !isNaN(payload.value) ? payload.value : 0
    // Calculer le pourcentage seulement si le total est supérieur à 0
    const percentage = total > 0 ? ((itemValue / total) * 100).toFixed(1) : "0.0"

    return (
      <span style={{ color: payload.color, fontWeight: 500, fontSize: 12, marginRight: 10 }}>
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            backgroundColor: payload.color,
            marginRight: 5,
            borderRadius: "50%",
            marginBottom: -1,
          }}
        />
        {`${value} (${percentage}%)`}
      </span>
    )
  }

  // Fonction pour le rendu du secteur actif dans le donut
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    // S'assurer que la valeur est un nombre valide
    const itemValue = typeof value === "number" && !isNaN(value) ? value : 0
    // Calculer le pourcentage seulement si le total est supérieur à 0
    const percent = total > 0 ? itemValue / total : 0

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={payload.color}
          stroke="#fff"
          strokeWidth={2}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={payload.color}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          fontSize={12}
          fontWeight={500}
        >
          {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" fontSize={12}>
          {formatCurrency(itemValue)}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999" fontSize={12}>
          {`(${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    )
  }

  // Gestionnaire pour l'animation du donut
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <Box
      sx={{
        height: "auto", // Changer de 100vh à auto
        minHeight: "100vh", // Ajouter minHeight pour s'assurer qu'il prend au moins toute la hauteur
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        overflow: "visible", // Changer de hidden à visible
      }}
    >
      {/* Ajouter les keyframes pour l'animation de paillettes */}
      <style>{glitterKeyframes}</style>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 3,
          gap: 2,
          pt: 3,
          px: 3,
        }}
      >
        <Typography variant="h4" component="h2" fontWeight="bold">
          Tableau de bord
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box sx={{ px: 3, width: "100%", maxWidth: "100%", overflow: "visible" }}>
          {/* Cartes de statistiques avec des couleurs plus vives et des paillettes */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ ...cardStyles.weeklyTotal, borderRadius: "16px" }}>
                <CardContent sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 1, opacity: 0.8 }}>
                    Prestation Totale
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                    {formatCurrency(stats.total)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Augmentation de 8%</Typography>
                  </Box>
                  <ShowChartIcon sx={cardStyles.icon} />
                </CardContent>
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle1 }} />
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle2 }} />
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle3 }} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ ...cardStyles.weeklyMax, borderRadius: "16px" }}>
                <CardContent sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 1, opacity: 0.8 }}>
                    Taux Journalier Max
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                    {formatCurrency(stats.max)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Diminution de 10%</Typography>
                  </Box>
                  <BookmarkIcon sx={cardStyles.icon} />
                </CardContent>
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle1 }} />
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle2 }} />
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle3 }} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ ...cardStyles.weeklyMin, borderRadius: "16px" }}>
                <CardContent sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 1, opacity: 0.8 }}>
                    Taux Journalier Min
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                    {formatCurrency(stats.min)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Augmentation de 5%</Typography>
                  </Box>
                  <DiamondIcon sx={cardStyles.icon} />
                </CardContent>
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle1 }} />
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle2 }} />
                <Box sx={{ ...cardStyles.circle, ...cardStyles.circle3 }} />
              </Card>
            </Grid>
          </Grid>
        {/* Tableau des médecins récents - Déplacé sous les graphiques */}
        <Card sx={{ mb: 3, borderRadius: "16px", boxShadow: "0 8px 24px rgba(149, 157, 165, 0.1)" }}>
            <CardHeader
              title="Médecins récents"
              action={
                <Button
                  component={Link}
                  to="/medecins"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: "none", fontWeight: 500 }}
                >
                  Voir tous
                </Button>
              }
              sx={{ padding: "20px 24px" }}
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper} elevation={0} sx={{ maxHeight: "300px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Jours</TableCell>
                      <TableCell>Taux journalier</TableCell>
                      <TableCell>Prestation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medecins.slice(0, 5).map((medecin) => (
                      <TableRow key={medecin.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{medecin.nom}</TableCell>
                        <TableCell>{medecin.nombre_jours}</TableCell>
                        <TableCell>{formatCurrency(medecin.taux_journalier)}</TableCell>
                        <TableCell>{formatCurrency(medecin.prestation)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Graphiques en dessous des cartes de statistiques */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* BarChart modernisé */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ ...chartCardStyle, height: "500px" }}>
                <CardHeader
                  title={
                    <Typography variant="h6" fontWeight="600">
                      Statistiques des Prestations
                    </Typography>
                  }
                  sx={chartHeaderStyle}
                />
                <CardContent sx={chartContentStyle}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      barSize={80} // Augmenter la taille des barres
                      layout="vertical"
                      maxBarSize={200} // Augmenter la taille maximale des barres
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={true} vertical={false} />
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#666", fontSize: 12 }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        domain={[0, "dataMax + 100000"]}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#666", fontSize: 14, fontWeight: 500 }}
                        width={120}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={renderColorfulLegendText}
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: 20 }}
                      />
                      <Bar
                        dataKey="Total"
                        name="Prestation Totale"
                        fill="#ff6b6b"
                        radius={[0, 8, 8, 0]}
                        animationDuration={1500}
                      >
                        <LabelList
                          dataKey="Total"
                          position="right"
                          formatter={(value) => formatCurrency(value)}
                          fill="#666"
                          fontSize={12}
                          fontWeight={500}
                        />
                      </Bar>
                      <Bar
                        dataKey="Max"
                        name="Taux Max"
                        fill="#4dabf7"
                        radius={[0, 8, 8, 0]}
                        animationDuration={1500}
                        animationBegin={300}
                      >
                        <LabelList
                          dataKey="Max"
                          position="right"
                          formatter={(value) => formatCurrency(value)}
                          fill="#666"
                          fontSize={12}
                          fontWeight={500}
                        />
                      </Bar>
                      <Bar
                        dataKey="Min"
                        name="Taux Min"
                        fill="#51cf66"
                        radius={[0, 8, 8, 0]}
                        animationDuration={1500}
                        animationBegin={600}
                      >
                        <LabelList
                          dataKey="Min"
                          position="right"
                          formatter={(value) => formatCurrency(value)}
                          fill="#666"
                          fontSize={12}
                          fontWeight={500}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Graphique en camembert */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ ...chartCardStyle, height: "500px" }}>
                <CardHeader
                  title={
                    <Typography variant="h6" fontWeight="600">
                      Répartition des Prestations
                    </Typography>
                  }
                  sx={chartHeaderStyle}
                />
                <CardContent sx={chartContentStyle}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={130}
                        paddingAngle={3}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        animationDuration={1500}
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={renderLegendText}
                        verticalAlign="bottom"
                        align="center"
                        layout="horizontal"
                        wrapperStyle={{ paddingTop: 20 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

  
          <Dialog
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                borderRadius: "16px",
                padding: "8px",
              },
            }}
          >
            <DialogTitle id="alert-dialog-title">Supprimer le médecin</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Êtes-vous sûr de vouloir supprimer le médecin {selectedMedecin?.nom} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDeleteModal(false)}>Annuler</Button>
              <Button onClick={confirmDelete} color="error" autoFocus>
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>

          <MedecinFormModal
            isOpen={showFormModal}
            onClose={() => {
              setShowFormModal(false)
              setSelectedMedecin(null)
            }}
            onSave={handleSaveMedecin}
            editData={selectedMedecin}
          />
        </Box>
      )}
    </Box>
  )
}