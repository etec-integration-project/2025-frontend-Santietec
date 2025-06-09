import React, { useState, useRef } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Corregido: react-router-dom
import { getMovieVideos, getTVShowVideos } from '../services/tmdbService';
import { useMyList } from '../contexts/MyListContext';
import { useLiked } from '../contexts/LikedContext';

interface SearchResult {
  id: number;
  title: string;
  type: 'movie' | 'tv'; // Corregido: 'tv' en lugar de 'tv-show'
  image: string;
  description?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  badge?: string | null;
  genres?: string[];
  year?: number;
  match?: number;
  duration?: string;
  rating?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

interface SearchResultCardProps {
  item: SearchResult;
  onCloseSearchModal: () => void; // Callback para cerrar el modal de búsqueda
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ item, onCloseSearchModal }) => {
  const [expanded, setExpanded] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  const { addToLiked, removeFromLiked, isLiked } = useLiked();

  const fetchTrailer = async () => {
    try {
      let videos;
      if (item.type === 'tv') {
        videos = await getTVShowVideos(item.id);
      } else {
        videos = await getMovieVideos(item.id);
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

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setExpanded(true);
      fetchTrailer();
    }, 1000); // Retraso de 1000ms para expandir
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setExpanded(false);
    setTrailerUrl(null);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/details/${item.type}/${item.id}`);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/details/${item.type}/${item.id}`);
  };

  const handleMyList = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInMyList(item.id)) {
      await removeFromMyList(item.id);
    } else {
      await addToMyList({
        id: item.id,
        title: item.title,
        poster_path: item.image,
        type: item.type,
        overview: item.description || item.overview || '',
        vote_average: item.vote_average || 0,
      });
    }
  };

  const handleLiked = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked(item.id)) {
      removeFromLiked(item.id);
    } else {
      addToLiked({
        id: item.id,
        title: item.title,
        poster_path: item.image,
        type: item.type,
      });
    }
  };

  return (
    <div
      className={`search-result-card group rounded transition-all duration-300 transform-gpu
        ${expanded 
            ? 'absolute w-[350px] h-[350px] z-[1000] bg-zinc-900 shadow-xl overflow-visible' 
            : 'relative w-[185px] h-[278px] overflow-hidden'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleDetailsClick}
    >
      {expanded && trailerUrl ? (
        <iframe
          src={trailerUrl}
          className="w-full h-[180px] object-cover rounded-t-md z-[1001] transform-gpu"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer"
        />
      ) : (
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${expanded ? 'scale-100 blur-0 rounded-t-md' : 'scale-100'}`}
        />
      )}

      {expanded && (
        <div
          className="flex flex-col p-4 flex-1 bg-zinc-900 rounded-b-lg"
          style={{ zIndex: 100 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <button
              onClick={handlePlay}
              className="bg-white rounded-full p-2 hover:bg-white/90 transition-colors"
            >
              <Play className="w-5 h-5 text-black" fill="black" />
            </button>
            <button
              onClick={handleMyList}
              className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors"
            >
              {isInMyList(item.id) ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleLiked}
              className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors"
            >
              {isLiked(item.id) ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <ThumbsUp className="w-5 h-5" />
              )}
            </button>
            <button
              className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors ml-auto"
              onClick={handleDetailsClick}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <h3 className="font-bold mb-2 text-base line-clamp-1 text-white">{item.title}</h3>
          <div className="flex items-center space-x-2 text-sm mb-1 text-white">
            <span className="text-green-500 font-bold">{item.match ? `${item.match}% Match` : ''}</span>
            {item.rating && (
                <span className="border border-gray-400 px-1 text-white text-xs py-1 rounded">{item.rating}</span>
            )}
            {item.year && (
                <span className="text-white text-xs">{item.year}</span>
            )}
            {item.type === 'movie' && item.duration && (
                <span className="text-white text-xs">{item.duration}</span>
            )}
            {item.type === 'tv' && item.number_of_seasons && (
                <span className="text-white text-xs">{item.number_of_seasons} Temporada{item.number_of_seasons > 1 ? 's' : ''}</span>
            )}
            <span className="border border-gray-400 px-1 text-white text-xs py-1 rounded">HD</span>
          </div>
          <div className="text-sm text-gray-400">
            {item.genres && item.genres.length > 0 && (
                <span className="text-gray-400">{item.genres.join(' • ')}</span>
            )}
            {item.description || item.overview ? (
                <p className="line-clamp-2">{item.description || item.overview}</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultCard; 