import axios from 'axios';
import { API_BASE_URL } from '../config/settings';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increase timeout to 30s
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

// API Service functions
export const apiService = {
  // Get home/latest anime episodes
  getHome: async (page = 1) => {
    try {
      const response = await api.get(`/home?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching home:', error);
      throw error;
    }
  },

  // Get anime schedule
  getSchedule: async () => {
    try {
      const response = await api.get('/schedule');
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  // Get ongoing anime
  getOngoing: async (page = 1) => {
    try {
      const response = await api.get(`/ongoing?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ongoing:', error);
      throw error;
    }
  },

  // Get completed anime
  getCompleted: async (page = 1) => {
    try {
      const response = await api.get(`/completed?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching completed:', error);
      throw error;
    }
  },

  // Search anime
  searchAnime: async (query) => {
    try {
      const response = await api.get(`/search/${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  // Get anime detail - SIMPLIFIED
  getAnimeDetail: async (slug) => {
    try {
      console.log('Fetching anime detail for slug:', slug);
      const url = `/anime/${slug}`;
      console.log('Full URL:', API_BASE_URL + url);
      
      const response = await api.get(url);
      console.log('API Response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching anime detail:', error);
      console.error('Slug used:', slug);
      throw error;
    }
  },

  // Get episode detail
  getEpisodeDetail: async (slug) => {
    try {
      const response = await api.get(`/episode/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching episode:', error);
      throw error;
    }
  },
};

export default api;
