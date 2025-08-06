// Configurações da API do TMDB
export const TMDB_CONFIG = {
  // IMPORTANTE: Substitua pela sua API key do TMDB
  // Para obter uma API key:
  // 1. Crie uma conta em https://www.themoviedb.org/
  // 2. Vá em Configurações -> API
  // 3. Crie uma nova API key
  API_KEY: '04d3ae7190963b446f380b32bfeb804c',
  
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  
  // Tamanhos de imagem disponíveis
  IMAGE_SIZES: {
    POSTER: 'w500',
    BACKDROP: 'w1280',
    PROFILE: 'w185'
  },
  
  // Idioma padrão
  DEFAULT_LANGUAGE: 'pt-BR'
};

// URLs completas para imagens
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

export default TMDB_CONFIG;

