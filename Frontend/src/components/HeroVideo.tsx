import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Plus, Check } from 'lucide-react';
import { useMyList } from '../contexts/MyListContext';

interface Movie {
  id: number;
  title: string;
  image: string;
  description?: string;
  backdrop_path?: string;
  overview?: string;
}

interface HeroVideoProps {
  movie: Movie;
  onPlay: () => void;
}

const HeroVideo = ({ movie, onPlay }: HeroVideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Truncar descripción para el Hero
  const getShortDescription = () => {
    const desc = movie.overview || movie.description || '';
    return desc.length > 180 ? desc.substring(0, 180) + '...' : desc;
  };

  const handleMyList = async () => {
    if (isInMyList(movie.id)) {
      await removeFromMyList(movie.id);
    } else {
      await addToMyList({
        id: movie.id,
        title: movie.title,
        poster_path: movie.image,
        type: 'movie',
        overview: movie.description || '',
        vote_average: 0
      });
    }
  };

  return (
    <div className="relative h-[70vh] mb-8">
      <div 
        className="w-full h-full object-cover"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent">
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 bg-gray-800/60 p-2 rounded-full hover:bg-gray-700/60"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        <div className="absolute bottom-16 left-4 md:left-16 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{getShortDescription()}</p>
          <div className="flex space-x-4">
            <button
              className="flex items-center bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/90"
              onClick={onPlay}
            >
              <Play className="w-5 h-5 mr-2" />
              Reproducir
            </button>
            <button
              className="flex items-center bg-gray-500/70 px-6 py-2 rounded font-semibold hover:bg-gray-500/50"
              onClick={handleMyList}
            >
              {isInMyList(movie.id) ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}
              Mi Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;