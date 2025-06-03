import React, { useState, useRef } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, X } from 'lucide-react';
import { getMovieVideos, getTVShowVideos } from '../services/tmdbService';
import { useNavigate } from 'react-router-dom';

interface MovieProps {
  movie: {
    id: number;
    title: string;
    image: string;
    duration: string;
    rating: string;
    year: number;
    genres: string[];
    match: number;
    videoUrl: string;
    description?: string;
    poster_path?: string;
    backdrop_path?: string;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    number_of_seasons?: number;
    number_of_episodes?: number;
    seasons?: string;
    episodes?: number;
    type?: 'movie' | 'tv';
  };
  onPlay: (movie: any) => void;
}

const MovieCard: React.FC<MovieProps> = ({ movie, onPlay }) => {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageUrl = movie.image || (movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '');

  const navigate = useNavigate();

  // Función para buscar el tráiler
  const fetchTrailer = async () => {
    try {
      let videos;
      if (movie.type === 'tv' || movie.seasons) {
        videos = await getTVShowVideos(movie.id);
      } else {
        videos = await getMovieVideos(movie.id);
      }
      const trailer = videos.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`);
      } else {
        setTrailerUrl(null);
      }
    } catch {
      setTrailerUrl(null);
    }
  };

  // Manejo de hover prolongado
  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(async () => {
      setExpanded(true);
      await fetchTrailer();
    }, 1000);
  };
  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setExpanded(false);
    setTrailerUrl(null);
  };

  return (
    <>
      <div
        className={`movie-card group relative rounded-md bg-black flex flex-col shadow-lg transition-all duration-300 ${expanded ? 'w-[350px] h-[350px] z-50' : 'w-[185px] h-[278px] z-0'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        style={{ zIndex: expanded ? 50 : 1 }}
      >
        {/* Main image or Trailer */}
        {expanded && trailerUrl ? (
          <iframe
            src={trailerUrl}
            className="w-full h-[180px] object-cover rounded-t-md"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          />
        ) : (
          <img
            src={imageUrl}
            alt={movie.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${expanded ? 'scale-100 blur-0 rounded-t-md' : 'scale-100'}`}
          />
        )}
        {/* Overlay on hover (expandido tipo Netflix) */}
        {expanded && (
          <div
            className="flex flex-col p-4 flex-1 bg-zinc-900 rounded-b-lg"
            style={{ zIndex: 100 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <button 
                onClick={() => onPlay(movie)}
                className="bg-white rounded-full p-2 hover:bg-white/90 transition-colors"
              >
                <Play className="w-5 h-5 text-black" fill="black" />
              </button>
              <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button 
                className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors ml-auto"
                onClick={() => navigate(`/details/${movie.id}`)}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-bold mb-2 text-base line-clamp-1">{movie.title}</h3>
            <div className="flex items-center space-x-2 text-sm mb-1">
              <span className="text-green-500 font-bold">{movie.vote_average ? Math.round(movie.vote_average * 10) : 0}% Match</span>
              <span className="border border-gray-400 px-1">{movie.rating}</span>
              {movie.type === 'tv' ? (
                <span>{movie.number_of_seasons} Temporadas</span>
              ) : (
                <span>{movie.duration}</span>
              )}
              <span className="border border-gray-400 px-1">HD</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">{movie.genres.join(' • ')}</span>
            </div>
          </div>
        )}
      </div>
      {/* Modal de detalles */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full relative text-white">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={() => setShowModal(false)}>
              <X className="w-6 h-6" />
            </button>
            <img src={imageUrl} alt={movie.title} className="w-full h-[350px] object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <div className="flex items-center space-x-2 text-xs mb-2">
              <span className="text-green-500 font-bold">{movie.vote_average ? Math.round(movie.vote_average * 10) : 0}% Match</span>
              <span className="border border-gray-400 px-1">{movie.rating}</span>
              {movie.type === 'tv' ? (
                <span>{movie.number_of_seasons} Temporadas</span>
              ) : (
                <span>{movie.duration}</span>
              )}
              <span className="border border-gray-400 px-1">HD</span>
            </div>
            <div className="text-xs mb-2">
              <span className="text-gray-400">{movie.genres.join(' • ')}</span>
            </div>
            <p className="text-sm mb-2">{movie.overview || movie.description}</p>
            {movie.year && (
              <div className="text-xs mb-2">
                <span className="text-gray-400">Año: {movie.year}</span>
              </div>
            )}
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={() => { setShowModal(false); onPlay(movie); }}
                className="flex-1 flex items-center justify-center bg-white text-black px-4 py-2 rounded font-semibold hover:bg-white/90"
              >
                <Play className="w-5 h-5 mr-2" /> Reproducir
              </button>
              <button className="flex-1 flex items-center justify-center bg-gray-500/70 px-4 py-2 rounded font-semibold hover:bg-gray-500/50">
                <Plus className="w-5 h-5 mr-2" /> Mi Lista
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;