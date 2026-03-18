import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('innerbliss_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);

// Moods
export const logMood = (data) => API.post('/moods', data);
export const getMoods = (year, month) => API.get(`/moods?year=${year}&month=${month}`);

// Affirmations
export const getAffirmations = () => API.get('/affirmations');
export const createAffirmation = (data) => API.post('/affirmations', data);
export const updateAffirmation = (id, data) => API.put(`/affirmations/${id}`, data);
export const deleteAffirmation = (id) => API.delete(`/affirmations/${id}`);

// Stories
export const getStories = (category) => API.get(`/stories${category ? `?category=${category}` : ''}`);
export const getCategories = () => API.get('/stories/categories');

// Playlists
export const getPlaylists = () => API.get('/playlists');
export const createPlaylist = (data) => API.post('/playlists', data);
export const updatePlaylist = (id, data) => API.put(`/playlists/${id}`, data);
export const deletePlaylist = (id) => API.delete(`/playlists/${id}`);

// Neuro Results
export const saveNeuroResult = (data) => API.post('/neuro-results', data);
export const getNeuroResults = () => API.get('/neuro-results');

// Emergency Contacts
export const getContacts = () => API.get('/contacts');
export const createContact = (data) => API.post('/contacts', data);
export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

// Doctors
export const getDoctors = () => API.get('/doctors');

export default API;
