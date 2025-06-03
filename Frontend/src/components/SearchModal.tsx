import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchMovies, searchTVShows } from '../services/tmdbService';

interface SearchResult {
  id: number;
  title: string;
  type: 'movie' | 'tv-show';
  image: string;
  description?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchTerm.length > 2) {
        setIsLoading(true);
        try {
          const [movieResults, tvResults] = await Promise.all([
            searchMovies(searchTerm),
            searchTVShows(searchTerm)
          ]);

          const formattedResults: SearchResult[] = [
            ...movieResults.results.map((movie: any) => ({
              id: movie.id,
              title: movie.title,
              type: 'movie' as const,
              image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              description: movie.overview,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              overview: movie.overview,
              release_date: movie.release_date,
              vote_average: movie.vote_average
            })),
            ...tvResults.results.map((show: any) => ({
              id: show.id,
              title: show.name,
              type: 'tv-show' as const,
              image: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
              description: show.overview,
              poster_path: show.poster_path,
              backdrop_path: show.backdrop_path,
              overview: show.overview,
              first_air_date: show.first_air_date,
              vote_average: show.vote_average
            }))
          ];

          setResults(formattedResults);
        } catch (error) {
          console.error('Error searching:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const handleResultClick = (result: SearchResult) => {
    const path = result.type === 'movie' ? '/movies' : '/tv-shows';
    navigate(`${path}/${result.id}`);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-black/95 border-t border-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Titles, people, genres"
            className="flex-1 bg-transparent border-none outline-none text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="cursor-pointer group"
                onClick={() => handleResultClick(result)}
              >
                <div className="aspect-video relative overflow-hidden rounded">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold">{result.title}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  {result.type === 'movie' ? 'Movie' : 'TV Show'}
                </p>
              </div>
            ))}
          </div>
        )}

        {!isLoading && searchTerm.length > 2 && results.length === 0 && (
          <div className="text-center py-4 text-gray-400">
            No results found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;