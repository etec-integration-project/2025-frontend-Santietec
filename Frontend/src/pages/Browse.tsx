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
  getPopularTVShows,
  getTopRatedTVShows,
  getMovieVideos,
  getTVShowVideos
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
  vote_average?: number;
}

interface Show {
  id: number;
  title: string;
  image: string;
  duration: string;
  rating: string;
  year: number;
  genres: string[];
  match: number;
  videoUrl: string;
  description: string;
  seasons: string;
  episodes: number;
  tag?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  first_air_date?: string;
  vote_average?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

const MovieRow = ({
  title,
  movies,
  onPlayMovie,
}: {
  title: string;
  movies: (Movie | Show)[];
  onPlayMovie: (content: Movie | Show) => void;
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
          {movies.map((content) => (
            <div key={content.id} className="flex-none w-[185px]">
              <MovieCard movie={content} onPlay={onPlayMovie} />
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

const Browse = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularShows, setPopularShows] = useState<Show[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [popularMoviesData, topRatedMoviesData, upcomingMoviesData, popularShowsData, topRatedShowsData] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getPopularTVShows(),
          getTopRatedTVShows()
        ]);

        const formatMovie = (movie: any): Movie => ({
          id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          duration: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
          rating: movie.adult ? "18+" : "13+",
          year: new Date(movie.release_date).getFullYear(),
          genres: movie.genre_ids || [],
          match: Math.floor(movie.vote_average * 10),
          description: movie.overview,
          videoUrl: "",
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average
        });

        const formatShow = (show: any): Show => ({
          id: show.id,
          title: show.name,
          image: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
          duration: `${show.episode_run_time?.[0] || 45}m`,
          rating: show.adult ? "18+" : "13+",
          year: new Date(show.first_air_date).getFullYear(),
          genres: show.genre_ids || [],
          match: Math.floor(show.vote_average * 10),
          description: show.overview,
          videoUrl: "",
          seasons: show.number_of_seasons?.toString() || "1",
          episodes: show.number_of_episodes || 0,
          poster_path: show.poster_path,
          backdrop_path: show.backdrop_path,
          overview: show.overview,
          first_air_date: show.first_air_date,
          vote_average: show.vote_average,
          number_of_seasons: show.number_of_seasons,
          number_of_episodes: show.number_of_episodes
        });

        setPopularMovies(popularMoviesData.results.map(formatMovie));
        setTopRatedMovies(topRatedMoviesData.results.map(formatMovie));
        setUpcomingMovies(upcomingMoviesData.results.map(formatMovie));
        setPopularShows(popularShowsData.results.map(formatShow));
        setTopRatedShows(topRatedShowsData.results.map(formatShow));
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
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

  const handlePlayShow = async (content: Movie | Show) => {
    if ('seasons' in content) { // Type guard to check if it's a Show
      try {
        const videos = await getTVShowVideos(content.id);
        const trailer = videos.results.find((video: any) => video.type === "Trailer");
        setSelectedShow({
          ...content,
          videoUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : content.videoUrl
        });
      } catch (error) {
        console.error('Error fetching show videos:', error);
        setSelectedShow(content as Show);
      }
    }
  };

  return (
    <>
      {(!selectedMovie && !selectedShow) && <Header showNav />}
      <div key={key} className="pt-20 bg-black min-h-screen">
        {selectedMovie && (
          <VideoPlayer
            videoUrl={selectedMovie.videoUrl}
            title={selectedMovie.title}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        {selectedShow && (
          <VideoPlayer
            videoUrl={selectedShow.videoUrl}
            title={selectedShow.title}
            onClose={() => setSelectedShow(null)}
          />
        )}

        {!loading && popularMovies.length > 0 && (
          <HeroVideo
            movie={popularMovies[0]}
            onPlay={() => handlePlayMovie(popularMovies[0])}
          />
        )}

        {(!selectedMovie && !selectedShow) && (
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
              title="Series Populares"
              movies={popularShows}
              onPlayMovie={handlePlayShow}
            />
            <MovieRow
              title="Series Mejor Valoradas"
              movies={topRatedShows}
              onPlayMovie={handlePlayShow}
            />
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Browse;