import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BOUTIQUES_API_URL,
});

export const fetchBoutiques = async () => {
  return api.get<Boutique[]>(import.meta.env.VITE_BOUTIQUES_ENDPOINT);
};

export const fetchFakeBoutiques = async () => {
  return import('./fakeBoutiques.json').then((data) => data.default);
};

export default {
  fetchBoutiques,
};
