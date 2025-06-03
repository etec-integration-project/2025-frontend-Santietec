import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  getPopularTVShows, 
  getTopRatedTVShows, 
  getTVShowVideos,
  getOnTheAirTVShows,
  getAiringTodayTVShows,
  getActionTVShows,
  getComedyTVShows,
  getDramaTVShows,
  getSciFiTVShows
} from '../services/tmdbService';

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
  movies: Show[];
  onPlayMovie: (show: Show) => void;
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
          {movies.map((show) => (
            <div key={show.id} className="flex-none w-[185px]">
              <MovieCard movie={show} onPlay={onPlayMovie} />
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

const TVShows = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);
  const [popularShows, setPopularShows] = useState<Show[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<Show[]>([]);
  const [onTheAirShows, setOnTheAirShows] = useState<Show[]>([]);
  const [airingTodayShows, setAiringTodayShows] = useState<Show[]>([]);
  const [actionShows, setActionShows] = useState<Show[]>([]);
  const [comedyShows, setComedyShows] = useState<Show[]>([]);
  const [dramaShows, setDramaShows] = useState<Show[]>([]);
  const [sciFiShows, setSciFiShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const [
          popular,
          topRated,
          onTheAir,
          airingToday,
          action,
          comedy,
          drama,
          sciFi
        ] = await Promise.all([
          getPopularTVShows(),
          getTopRatedTVShows(),
          getOnTheAirTVShows(),
          getAiringTodayTVShows(),
          getActionTVShows(),
          getComedyTVShows(),
          getDramaTVShows(),
          getSciFiTVShows()
        ]);

        const formatShow = (show: any): Show => {
          // Truncar la descripción a 150 caracteres
          const truncatedOverview = show.overview 
            ? show.overview.length > 150 
              ? show.overview.substring(0, 150) + '...'
              : show.overview
            : '';

          return {
            id: show.id,
            title: show.name,
            image: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
            duration: `${show.episode_run_time?.[0] || 45}m`,
            rating: show.adult ? "18+" : "13+",
            year: new Date(show.first_air_date).getFullYear(),
            genres: show.genre_ids || [],
            match: Math.floor(show.vote_average * 10),
            description: truncatedOverview,
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
          };
        };

        setPopularShows(popular.results.map(formatShow));
        setTopRatedShows(topRated.results.map(formatShow));
        setOnTheAirShows(onTheAir.results.map(formatShow));
        setAiringTodayShows(airingToday.results.map(formatShow));
        setActionShows(action.results.map(formatShow));
        setComedyShows(comedy.results.map(formatShow));
        setDramaShows(drama.results.map(formatShow));
        setSciFiShows(sciFi.results.map(formatShow));
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentProfile]);

  const handlePlayShow = async (show: Show) => {
    try {
      const videos = await getTVShowVideos(show.id);
      const trailer = videos.results.find((video: any) => video.type === "Trailer");
      setSelectedShow({
        ...show,
        videoUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : show.videoUrl
      });
    } catch (error) {
      console.error('Error fetching show videos:', error);
      setSelectedShow(show);
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
      {!selectedShow && <Header showNav />}
      <div key={key} className="pt-20 bg-black min-h-screen">
        {selectedShow && (
          <VideoPlayer
            videoUrl={selectedShow.videoUrl}
            title={selectedShow.title}
            onClose={() => setSelectedShow(null)}
          />
        )}

        {!loading && popularShows.length > 0 && (
          <HeroVideo
            movie={popularShows[0]}
            onPlay={() => handlePlayShow(popularShows[0])}
          />
        )}

        {!selectedShow && (
          <div className="pt-4">
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
            <MovieRow
              title="Series en Emisión"
              movies={onTheAirShows}
              onPlayMovie={handlePlayShow}
            />
            <MovieRow
              title="Series que se Estrenan Hoy"
              movies={airingTodayShows}
              onPlayMovie={handlePlayShow}
            />
            <MovieRow
              title="Series de Acción"
              movies={actionShows}
              onPlayMovie={handlePlayShow}
            />
            <MovieRow
              title="Series de Comedia"
              movies={comedyShows}
              onPlayMovie={handlePlayShow}
            />
            <MovieRow
              title="Series Dramáticas"
              movies={dramaShows}
              onPlayMovie={handlePlayShow}
            />
            <MovieRow
              title="Series de Ciencia Ficción"
              movies={sciFiShows}
              onPlayMovie={handlePlayShow}
            />
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default TVShows;