import axios from 'axios';

const TMDB_API_KEY = '1e143c15ed8df70dfa708cb2ac175ea7';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTE0M2MxNWVkOGRmNzBkZmE3MDhjYjJhYzE3NWVhNyIsIm5iZiI6MTc0ODk1NTk2My4xNTY5OTk4LCJzdWIiOiI2ODNlZjMzYjA3OTE4ZDc1NGNmZGJiMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lihLFIox9bgxXl7zSpbs4IEcbxz-8qe2smsrZVv_XQU';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/popular?page=${page}`);
  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/top_rated?page=${page}`);
  return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/upcoming?page=${page}`);
  return response.data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/now_playing?page=${page}`);
  return response.data;
};

export const getActionMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/movie?with_genres=28&page=${page}`);
  return response.data;
};

export const getComedyMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/movie?with_genres=35&page=${page}`);
  return response.data;
};

export const getDramaMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/movie?with_genres=18&page=${page}`);
  return response.data;
};

export const getHorrorMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/movie?with_genres=27&page=${page}`);
  return response.data;
};

export const getSciFiMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/movie?with_genres=878&page=${page}`);
  return response.data;
};

export const getPopularTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/tv/popular?page=${page}`);
  return response.data;
};

export const getTopRatedTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/tv/top_rated?page=${page}`);
  return response.data;
};

export const getOnTheAirTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/tv/on_the_air?page=${page}`);
  return response.data;
};

export const getAiringTodayTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/tv/airing_today?page=${page}`);
  return response.data;
};

export const getActionTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/tv?with_genres=10759&page=${page}`);
  return response.data;
};

export const getComedyTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/tv?with_genres=35&page=${page}`);
  return response.data;
};

export const getDramaTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/tv?with_genres=18&page=${page}`);
  return response.data;
};

export const getSciFiTVShows = async (page = 1) => {
  const response = await tmdbApi.get(`/discover/tv?with_genres=10765&page=${page}`);
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getTVShowDetails = async (tvId: number) => {
  const response = await tmdbApi.get(`/tv/${tvId}`);
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbApi.get(`/search/movie?query=${query}&page=${page}`);
  return response.data;
};

export const searchTVShows = async (query: string, page = 1) => {
  const response = await tmdbApi.get(`/search/tv?query=${query}&page=${page}`);
  return response.data;
};

export const getMovieGenres = async () => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data;
};

export const getTVGenres = async () => {
  const response = await tmdbApi.get('/genre/tv/list');
  return response.data;
};

export const getMovieVideos = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const getTVShowVideos = async (tvId: number) => {
  const response = await tmdbApi.get(`/tv/${tvId}/videos`);
  return response.data;
};

export const getMovieCredits = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getTVShowCredits = async (tvId: number) => {
  const response = await tmdbApi.get(`/tv/${tvId}/credits`);
  return response.data;
};

export const getMovieRecommendations = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}/recommendations`);
  return response.data;
};

export const getTVShowRecommendations = async (tvId: number) => {
  const response = await tmdbApi.get(`/tv/${tvId}/recommendations`);
  return response.data;
}; 