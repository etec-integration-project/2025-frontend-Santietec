import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getMovieVideos,
  getNowPlayingMovies,
  getActionMovies,
  getComedyMovies,
  getDramaMovies,
  getHorrorMovies,
  getSciFiMovies
} from '../services/tmdbService';

interface Movie {
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
  type?: 'movie' | 'tv';
}

const MovieRow = ({
  title,
  movies,
  onPlayMovie,
}: {
  title: string;
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-xl font-semibold mb-4 px-4 md:px-16">{title}</h2>

      <div className="relative h-[278px] flex items-end">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-50"
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          className="flex gap-5 overflow-x-scroll scroll-smooth px-4 md:px-16 scrollbar-hide scrollbar-thumb-gray-600 scrollbar-track-transparent items-end"
          ref={rowRef}
        >
          {movies.map((movie, index) => (
            <div 
              key={movie.id}
              className={`flex-none w-[185px] transition-all duration-300`}
              style={{}}
            >
              <MovieCard 
                movie={movie} 
                onPlay={onPlayMovie} 
              />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-50"
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const Movies = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [sciFiMovies, setSciFiMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [
          popular,
          topRated,
          upcoming,
          nowPlaying,
          action,
          comedy,
          drama,
          horror,
          sciFi
        ] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getNowPlayingMovies(),
          getActionMovies(),
          getComedyMovies(),
          getDramaMovies(),
          getHorrorMovies(),
          getSciFiMovies()
        ]);

        const formatMovie = (movie: any): Movie => {
          // Truncar la descripción a 150 caracteres
          const truncatedOverview = movie.overview 
            ? movie.overview.length > 150 
              ? movie.overview.substring(0, 150) + '...'
              : movie.overview
            : '';

          return {
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            duration: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
            rating: movie.adult ? "18+" : "13+",
            year: new Date(movie.release_date).getFullYear(),
            genres: movie.genre_ids || [],
            match: Math.floor(movie.vote_average * 10),
            description: truncatedOverview,
            videoUrl: "",
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: movie.release_date,
            vote_average: movie.vote_average
          };
        };

        setPopularMovies(popular.results.map(formatMovie));
        setTopRatedMovies(topRated.results.map(formatMovie));
        setUpcomingMovies(upcoming.results.map(formatMovie));
        setNowPlayingMovies(nowPlaying.results.map(formatMovie));
        setActionMovies(action.results.map(formatMovie));
        setComedyMovies(comedy.results.map(formatMovie));
        setDramaMovies(drama.results.map(formatMovie));
        setHorrorMovies(horror.results.map(formatMovie));
        setSciFiMovies(sciFi.results.map(formatMovie));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentProfile]);

  const handlePlayMovie = async (movie: Movie) => {
    try {
      const videos = await getMovieVideos(movie.id);
      const trailer = videos.results.find((video: any) => video.type === "Trailer");
      setSelectedMovie({
        ...movie,
        videoUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : movie.videoUrl
      });
    } catch (error) {
      console.error('Error fetching movie videos:', error);
      setSelectedMovie(movie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!selectedMovie && <Header showNav />}
      <div key={key} className="pt-20 bg-black min-h-screen">
        {selectedMovie && (
          <VideoPlayer
            videoUrl={selectedMovie.videoUrl}
            title={selectedMovie.title}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        {!loading && popularMovies.length > 0 && (
          <HeroVideo
            movie={popularMovies[0]}
            onPlay={() => handlePlayMovie(popularMovies[0])}
          />
        )}

        {!selectedMovie && (
          <div className="pt-4">
            <MovieRow
              title="Películas Populares"
              movies={popularMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas Mejor Valoradas"
              movies={topRatedMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Próximos Estrenos"
              movies={upcomingMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas en Cines"
              movies={nowPlayingMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas de Acción"
              movies={actionMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas de Comedia"
              movies={comedyMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas Dramáticas"
              movies={dramaMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas de Terror"
              movies={horrorMovies}
              onPlayMovie={handlePlayMovie}
            />
            <MovieRow
              title="Películas de Ciencia Ficción"
              movies={sciFiMovies}
              onPlayMovie={handlePlayMovie}
            />
          </div>
        )}
      </div>
      {!selectedMovie && <Footer />}
    </>
  );
};

export default Movies;