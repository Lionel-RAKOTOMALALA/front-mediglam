// Formater un nombre en devise (MGA - Ariary)
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0, // L'Ariary n'a pas de décimales
    currencyDisplay: "code" // Pour afficher "MGA" au lieu du symbole
  }).format(value).replace("MGA", "Ar") + (value !== 1 ? "" : ""); // Remplace MGA par Ar
}