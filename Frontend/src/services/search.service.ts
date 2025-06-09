import axios from 'axios';
import { getMovieDetails, getTVShowDetails, getMovieGenres, getTVGenres } from './tmdbService';

const TMDB_API_KEY = '1e143c15ed8df70dfa708cb2ac175ea7'; // Tu API Key de TMDB
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchContent = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: 'es-ES'
      }
    });

    const movieGenresResponse = await getMovieGenres();
    const tvGenresResponse = await getTVGenres();
    const allMovieGenres = movieGenresResponse.genres;
    const allTvGenres = tvGenresResponse.genres;

    const formatGenres = (genreIds: number[], type: 'movie' | 'tv') => {
      const genreList = type === 'movie' ? allMovieGenres : allTvGenres;
      return genreIds.map(id => genreList.find((g: any) => g.id === id)?.name).filter(Boolean);
    };

    const detailedResultsPromises = response.data.results
      .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
      .map(async (item: any) => {
        let details: any;
        let type: 'movie' | 'tv';

        if (item.media_type === 'movie') {
          details = await getMovieDetails(item.id);
          type = 'movie';
        } else {
          details = await getTVShowDetails(item.id);
          type = 'tv';
        }
        
        const genres = formatGenres(details.genres.map((g: any) => g.id), type);
        const rating = details.adult ? "18+" : "13+";
        const match = Math.floor(details.vote_average * 10);

        return {
          id: details.id,
          title: details.title || details.name,
          type: type,
          image: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '/path/to/placeholder-image.jpg',
          description: details.overview,
          poster_path: details.poster_path,
          backdrop_path: details.backdrop_path,
          overview: details.overview,
          release_date: details.release_date,
          first_air_date: details.first_air_date,
          vote_average: details.vote_average,
          genres: genres,
          year: (type === 'movie' && details.release_date) ? new Date(details.release_date).getFullYear() : ((type === 'tv' && details.first_air_date) ? new Date(details.first_air_date).getFullYear() : undefined),
          match: match,
          duration: (type === 'movie' && details.runtime) ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : undefined,
          rating: rating,
          number_of_seasons: (type === 'tv' && details.number_of_seasons) ? details.number_of_seasons : undefined,
          number_of_episodes: (type === 'tv' && details.number_of_episodes) ? details.number_of_episodes : undefined,
          badge: null, // Placeholder for badges, can be dynamically assigned later
        };
      });

    const formattedResults = await Promise.all(detailedResultsPromises);
    return formattedResults;
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
}; 