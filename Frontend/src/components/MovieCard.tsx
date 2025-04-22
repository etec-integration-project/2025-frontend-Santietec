import React from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

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
  };
  onPlay: (movie: any) => void;
}

const MovieCard: React.FC<MovieProps> = ({ movie, onPlay }) => {
  return (
    <div className="group relative">
      <img
        src={movie.image}
        alt={movie.title}
        className="rounded-md w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-20"
      />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 rounded-md">
        <div className="flex flex-col h-full p-3">
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <button 
                onClick={() => onPlay(movie)}
                className="bg-white rounded-full p-2 hover:bg-white/90 transition-colors"
              >
                <Play className="w-4 h-4 text-black" fill="black" />
              </button>
              <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button className="border-2 border-gray-400 rounded-full p-2 hover:border-white transition-colors ml-auto">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-bold mb-1 text-sm">{movie.title}</h3>
            
            <div className="flex items-center space-x-2 text-xs mb-2">
              <span className="text-green-500 font-bold">{movie.match}% Match</span>
              <span className="border border-gray-400 px-1">{movie.rating}</span>
              <span>{movie.duration}</span>
              <span className="border border-gray-400 px-1">HD</span>
            </div>

            <div className="text-xs">
              <span className="text-gray-400">{movie.genres.join(' • ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;