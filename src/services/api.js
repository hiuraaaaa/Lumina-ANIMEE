import { API_BASE_URL } from '../config/settings';

// API Service functions using FETCH (not axios)
export const apiService = {
  // Get home/latest anime episodes
  getHome: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/home?page=${page}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching home:', error);
      throw error;
    }
  },

  // Get anime schedule
  getSchedule: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  // Get ongoing anime
  getOngoing: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ongoing?page=${page}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching ongoing:', error);
      throw error;
    }
  },

  // Get completed anime
  getCompleted: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/completed?page=${page}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching completed:', error);
      throw error;
    }
  },

  // Search anime
  searchAnime: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search/${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  // Get anime detail - USING FETCH LIKE HTML VERSION
  getAnimeDetail: async (slug) => {
    try {
      const url = `${API_BASE_URL}/anime/${slug}`;
      console.log('Fetching anime detail:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching anime detail:', error);
      console.error('Slug used:', slug);
      throw error;
    }
  },

  // Get episode detail
  getEpisodeDetail: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/episode/${slug}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching episode:', error);
      throw error;
    }
  },
};

export default apiService;
