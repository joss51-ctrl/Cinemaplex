const api = {
  url: import.meta.env.VITE_TMDB_BASE_URL,
  key: import.meta.env.VITE_TMDB_API_KEY,
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default api;
