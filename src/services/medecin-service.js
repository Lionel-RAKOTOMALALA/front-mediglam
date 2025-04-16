import axios from 'axios';

const API_URL = "http://localhost:8081/api/medecins";

const MedecinService = {
  // Récupérer tous les médecins
  getAllMedecins: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des médecins:", error);
      throw error;
    }
  },

  // Récupérer un médecin par son ID
  getMedecin: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du médecin:", error);
      throw error;
    }
  },

  // Créer un nouveau médecin
  createMedecin: async (medecinData) => {
    try {
      const response = await axios.post(API_URL, medecinData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du médecin:", error);
      throw error;
    }
  },

  // Mettre à jour un médecin existant
  updateMedecin: async (id, medecinData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, medecinData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du médecin:", error);
      throw error;
    }
  },

  // Supprimer un médecin
  deleteMedecin: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression du médecin:", error);
      throw error;
    }
  },

  // Récupérer les statistiques
  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/stats/total`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      throw error;
    }
  },
};

export default MedecinService;