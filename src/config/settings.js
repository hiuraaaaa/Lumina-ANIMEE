// Routes configuration
export const ROUTES = {
  HOME: 'home',
  SCHEDULE: 'schedule',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  SEARCH: 'search',
  DETAIL: 'detail',
  WATCH: 'watch',
};

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.sankavollerei.com/anime/oploverz';

// Site Configuration
export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'Oploverz',
  url: import.meta.env.VITE_SITE_URL || 'https://oploverz.vercel.app',
  description: 'Nonton & Download Anime Subtitle Indonesia',
  itemsPerPage: 12,
};

// Day names in Indonesian
export const DAY_NAMES = {
  monday: { name: 'Senin', icon: '🌙' },
  tuesday: { name: 'Selasa', icon: '🔥' },
  wednesday: { name: 'Rabu', icon: '⚡' },
  thursday: { name: 'Kamis', icon: '🌟' },
  friday: { name: 'Jumat', icon: '🎉' },
  saturday: { name: 'Sabtu', icon: '🎮' },
  sunday: { name: 'Minggu', icon: '☀️' },
};

// Resolution order for downloads
export const RESOLUTION_ORDER = ['360p', '480p', '720p', '10bit', '1080p'];

// Server colors for download buttons
export const SERVER_COLORS = {
  GD: 'bg-blue-500 hover:bg-blue-600',
  AKIRA: 'bg-red-500 hover:bg-red-600',
  FILEDON: 'bg-green-500 hover:bg-green-600',
  BUZZ: 'bg-orange-500 hover:bg-orange-600',
};
