import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
  
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

      {/* Botón de Scroll Izquierda */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
        aria-label="Desplazar a la izquierda"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Contenedor de Películas con Referencia */}
      <div
        className="flex space-x-2 overflow-x-scroll scroll-smooth px-4 md:px-16 scrollbar-hide scrollbar-thumb-gray-600 scrollbar-track-transparent"
        ref={rowRef}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-[250px]">
            <MovieCard movie={movie} onPlay={onPlayMovie} />
          </div>
        ))}
      </div>

      {/* Botón de Scroll Derecha */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
        aria-label="Desplazar a la derecha"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const Browse = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentProfile]);

  const actionMovies: Movie[] = [
    {
      id: 1,
      title: "John Wick",
      image: "/pelis/jhon wick.jpg",
      duration: "1h 41m",
      rating: "16+",
      year: 2014,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 95,
      description: "Un exasesino busca venganza después de que matan a su perro, último regalo de su esposa fallecida.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 2,
      title: "Mad Max: Fury Road",
      image: "/pelis/madmax.webp",
      duration: "2h",
      rating: "16+",
      year: 2015,
      genres: ["Acción", "Aventura", "Ciencia ficción"],
      match: 97,
      description: "En un mundo post-apocalíptico, Max se une a Furiosa para escapar de un tirano y su ejército.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 3,
      title: "Die Hard",
      image: "/pelis/diehard.webp",
      duration: "2h 12m",
      rating: "16+",
      year: 1988,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 96,
      description: "Un policía de Nueva York lucha contra terroristas que han tomado un edificio de oficinas.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 4,
      title: "The Raid",
      image: "/pelis/the raid.png",
      duration: "1h 41m",
      rating: "16+",
      year: 2011,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 94,
      description: "Un equipo SWAT se infiltra en un edificio controlado por un señor del crimen.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 5,
      title: "Mission: Impossible - Fallout",
      image: "/movies/mission-impossible.jpg",
      duration: "2h 27m",
      rating: "13+",
      year: 2018,
      genres: ["Acción", "Aventura", "Thriller"],
      match: 98,
      description: "Ethan Hunt y su equipo deben recuperar plutonio robado antes de que caiga en manos terroristas.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 26,
      title: "The Equalizer",
      image: "/movies/equalizer.jpg",
      duration: "2h 12m",
      rating: "16+",
      year: 2014,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 93,
      description: "Un exagente de operaciones especiales ayuda a una joven prostituta contra la mafia rusa.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 27,
      title: "Atomic Blonde",
      image: "/movies/atomic-blonde.jpg",
      duration: "1h 55m",
      rating: "16+",
      year: 2017,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 92,
      description: "Una espía británica es enviada a Berlín durante la Guerra Fría para recuperar una lista de agentes dobles.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 28,
      title: "The Night Comes for Us",
      image: "/movies/night-comes.jpg",
      duration: "2h 1m",
      rating: "16+",
      year: 2018,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 91,
      description: "Un exmiembro de una organización criminal protege a una niña de sus antiguos compañeros.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 29,
      title: "Extraction",
      image: "/movies/extraction.jpg",
      duration: "1h 56m",
      rating: "16+",
      year: 2020,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 90,
      description: "Un mercenario es contratado para rescatar al hijo de un señor del crimen internacional.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 30,
      title: "Nobody",
      image: "/movies/nobody.jpg",
      duration: "1h 32m",
      rating: "16+",
      year: 2021,
      genres: ["Acción", "Crimen", "Thriller"],
      match: 89,
      description: "Un padre de familia aparentemente normal revela su pasado violento cuando su casa es allanada.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const comedyMovies: Movie[] = [
    {
      id: 6,
      title: "Superbad",
      image: "/movies/superbad.jpg",
      duration: "1h 53m",
      rating: "16+",
      year: 2007,
      genres: ["Comedia"],
      match: 92,
      description: "Dos amigos intentan conseguir alcohol para una fiesta antes de ir a la universidad.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 7,
      title: "The Hangover",
      image: "/movies/hangover.jpg",
      duration: "1h 40m",
      rating: "16+",
      year: 2009,
      genres: ["Comedia"],
      match: 91,
      description: "Tres amigos despiertan después de una despedida de soltero sin memoria y sin el novio.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 8,
      title: "Bridesmaids",
      image: "/movies/bridesmaids.jpg",
      duration: "2h 5m",
      rating: "16+",
      year: 2011,
      genres: ["Comedia", "Romance"],
      match: 90,
      description: "Una dama de honor intenta organizar la boda de su mejor amiga mientras su vida se desmorona.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 9,
      title: "The Grand Budapest Hotel",
      image: "/movies/grand-budapest.jpg",
      duration: "1h 39m",
      rating: "13+",
      year: 2014,
      genres: ["Comedia", "Drama"],
      match: 93,
      description: "Las aventuras de un conserje de hotel y su joven protegido en la Europa de entreguerras.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 10,
      title: "21 Jump Street",
      image: "/movies/21-jump-street.jpg",
      duration: "1h 49m",
      rating: "16+",
      year: 2012,
      genres: ["Comedia", "Acción"],
      match: 89,
      description: "Dos policías jóvenes se infiltran en una escuela secundaria para desmantelar una red de drogas.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 31,
      title: "The Lego Movie",
      image: "/movies/lego-movie.jpg",
      duration: "1h 40m",
      rating: "7+",
      year: 2014,
      genres: ["Comedia", "Animación", "Aventura"],
      match: 94,
      description: "Un constructor de LEGO es confundido con el Maestro Constructor que puede salvar el mundo.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 32,
      title: "Scott Pilgrim vs. the World",
      image: "/movies/scott-pilgrim.jpg",
      duration: "1h 52m",
      rating: "13+",
      year: 2010,
      genres: ["Comedia", "Acción", "Romance"],
      match: 92,
      description: "Un joven músico debe derrotar a los siete ex novios de su nueva novia para poder salir con ella.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 33,
      title: "What We Do in the Shadows",
      image: "/movies/shadows.jpg",
      duration: "1h 26m",
      rating: "16+",
      year: 2014,
      genres: ["Comedia", "Horror"],
      match: 91,
      description: "Un documental sobre la vida cotidiana de un grupo de vampiros que comparten piso en Nueva Zelanda.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 34,
      title: "The Nice Guys",
      image: "/movies/nice-guys.jpg",
      duration: "1h 56m",
      rating: "16+",
      year: 2016,
      genres: ["Comedia", "Crimen", "Misterio"],
      match: 90,
      description: "Un detective privado y un matón son contratados para encontrar a una joven desaparecida en los años 70.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 35,
      title: "Game Night",
      image: "/movies/game-night.jpg",
      duration: "1h 40m",
      rating: "16+",
      year: 2018,
      genres: ["Comedia", "Crimen", "Misterio"],
      match: 89,
      description: "Una noche de juegos se convierte en una misteriosa aventura cuando un secuestro resulta ser real.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const dramaMovies: Movie[] = [
    {
      id: 11,
      title: "The Shawshank Redemption",
      image: "/movies/shawshank.jpg",
      duration: "2h 22m",
      rating: "13+",
      year: 1994,
      genres: ["Drama"],
      match: 99,
      description: "La historia de amistad entre dos presos durante varios años en una prisión.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 12,
      title: "Forrest Gump",
      image: "/movies/forrest-gump.jpg",
      duration: "2h 22m",
      rating: "13+",
      year: 1994,
      genres: ["Drama", "Romance"],
      match: 98,
      description: "La vida de un hombre con un coeficiente intelectual bajo que logra grandes cosas.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 13,
      title: "The Godfather",
      image: "/movies/godfather.jpg",
      duration: "2h 55m",
      rating: "16+",
      year: 1972,
      genres: ["Drama", "Crimen"],
      match: 99,
      description: "La historia de una familia mafiosa italiana en Nueva York.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 14,
      title: "Schindler's List",
      image: "/movies/schindlers-list.jpg",
      duration: "3h 15m",
      rating: "16+",
      year: 1993,
      genres: ["Drama", "Historia"],
      match: 97,
      description: "La historia real de un empresario que salvó a más de mil judíos durante el Holocausto.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 15,
      title: "The Green Mile",
      image: "/movies/green-mile.jpg",
      duration: "3h 9m",
      rating: "16+",
      year: 1999,
      genres: ["Drama", "Crimen"],
      match: 96,
      description: "La historia de un guardia de prisión y un preso con habilidades sobrenaturales.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 36,
      title: "The Social Network",
      image: "/movies/social-network.jpg",
      duration: "2h",
      rating: "13+",
      year: 2010,
      genres: ["Drama", "Biografía"],
      match: 95,
      description: "La historia de la creación de Facebook y las disputas legales que siguieron.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 37,
      title: "The Prestige",
      image: "/movies/prestige.jpg",
      duration: "2h 10m",
      rating: "13+",
      year: 2006,
      genres: ["Drama", "Misterio", "Thriller"],
      match: 94,
      description: "Dos magos rivales en la Inglaterra victoriana se obsesionan con crear el truco perfecto.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 38,
      title: "Whiplash",
      image: "/movies/whiplash.jpg",
      duration: "1h 46m",
      rating: "16+",
      year: 2014,
      genres: ["Drama", "Música"],
      match: 93,
      description: "Un joven baterista de jazz se enfrenta a un profesor exigente en una prestigiosa escuela de música.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 39,
      title: "The Departed",
      image: "/movies/departed.jpg",
      duration: "2h 31m",
      rating: "16+",
      year: 2006,
      genres: ["Drama", "Crimen", "Thriller"],
      match: 92,
      description: "Un policía se infiltra en la mafia mientras un mafioso se infiltra en la policía.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 40,
      title: "There Will Be Blood",
      image: "/movies/there-will-be-blood.jpg",
      duration: "2h 38m",
      rating: "16+",
      year: 2007,
      genres: ["Drama"],
      match: 91,
      description: "La historia de un prospector de petróleo y su conflicto con un predicador en California.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const horrorMovies: Movie[] = [
    {
      id: 16,
      title: "Get Out",
      image: "/movies/get-out.jpg",
      duration: "1h 44m",
      rating: "16+",
      year: 2017,
      genres: ["Horror", "Misterio", "Thriller"],
      match: 98,
      description: "Un joven afroamericano visita a la familia de su novia blanca y descubre un siniestro secreto.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 17,
      title: "The Babadook",
      image: "/movies/babadook.jpg",
      duration: "1h 34m",
      rating: "16+",
      year: 2014,
      genres: ["Horror", "Drama", "Misterio"],
      match: 96,
      description: "Una madre y su hijo son aterrorizados por una criatura de un libro infantil.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 18,
      title: "The Witch",
      image: "/movies/witch.jpg",
      duration: "1h 32m",
      rating: "16+",
      year: 2015,
      genres: ["Horror", "Drama", "Historia"],
      match: 95,
      description: "Una familia puritana del siglo XVII se enfrenta a fuerzas sobrenaturales en el bosque.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 19,
      title: "Midsommar",
      image: "/movies/midsommar.jpg",
      duration: "2h 27m",
      rating: "16+",
      year: 2019,
      genres: ["Horror", "Drama", "Misterio"],
      match: 94,
      description: "Una pareja viaja a un festival sueco que se convierte en una pesadilla.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 20,
      title: "The Lighthouse",
      image: "/movies/lighthouse.jpg",
      duration: "1h 49m",
      rating: "16+",
      year: 2019,
      genres: ["Horror", "Drama", "Misterio"],
      match: 93,
      description: "Dos fareros se vuelven locos mientras mantienen un faro en una isla remota.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 41,
      title: "Hereditary",
      image: "/movies/hereditary.jpg",
      duration: "2h 7m",
      rating: "16+",
      year: 2018,
      genres: ["Horror", "Drama", "Misterio"],
      match: 92,
      description: "Una familia se desmorona después de la muerte de su abuela, revelando terribles secretos.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 42,
      title: "It Follows",
      image: "/movies/it-follows.jpg",
      duration: "1h 40m",
      rating: "16+",
      year: 2014,
      genres: ["Horror", "Misterio"],
      match: 91,
      description: "Una joven es perseguida por una entidad sobrenatural después de tener relaciones sexuales.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 43,
      title: "The Ritual",
      image: "/movies/ritual.jpg",
      duration: "1h 34m",
      rating: "16+",
      year: 2017,
      genres: ["Horror", "Misterio"],
      match: 90,
      description: "Un grupo de amigos se pierde en un bosque sueco y se enfrenta a una antigua criatura.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 44,
      title: "A Quiet Place",
      image: "/movies/quiet-place.jpg",
      duration: "1h 30m",
      rating: "13+",
      year: 2018,
      genres: ["Horror", "Drama", "Ciencia ficción"],
      match: 89,
      description: "Una familia debe vivir en silencio para evitar ser cazada por criaturas que cazan por sonido.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 45,
      title: "The Invisible Man",
      image: "/movies/invisible-man.jpg",
      duration: "2h 4m",
      rating: "16+",
      year: 2020,
      genres: ["Horror", "Misterio", "Thriller"],
      match: 88,
      description: "Una mujer es acosada por su ex novio que ha encontrado la manera de volverse invisible.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const scifiMovies: Movie[] = [
    {
      id: 21,
      title: "Ex Machina",
      image: "/movies/ex-machina.jpg",
      duration: "1h 48m",
      rating: "16+",
      year: 2014,
      genres: ["Ciencia ficción", "Drama", "Thriller"],
      match: 97,
      description: "Un programador es invitado a evaluar la inteligencia artificial de un robot humanoide.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 22,
      title: "Her",
      image: "/movies/her.jpg",
      duration: "2h 6m",
      rating: "13+",
      year: 2013,
      genres: ["Ciencia ficción", "Drama", "Romance"],
      match: 96,
      description: "Un hombre solitario desarrolla una relación con un sistema operativo con inteligencia artificial.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 23,
      title: "District 9",
      image: "/movies/district-9.jpg",
      duration: "1h 52m",
      rating: "16+",
      year: 2009,
      genres: ["Ciencia ficción", "Acción", "Drama"],
      match: 95,
      description: "Un funcionario es infectado por un virus alienígena y comienza a transformarse en uno de ellos.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 24,
      title: "Looper",
      image: "/movies/looper.jpg",
      duration: "1h 59m",
      rating: "16+",
      year: 2012,
      genres: ["Ciencia ficción", "Acción", "Thriller"],
      match: 94,
      description: "Un asesino del futuro debe matar a su versión más joven enviada desde el pasado.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 25,
      title: "Children of Men",
      image: "/movies/children-of-men.jpg",
      duration: "1h 49m",
      rating: "16+",
      year: 2006,
      genres: ["Ciencia ficción", "Drama", "Thriller"],
      match: 93,
      description: "En un futuro donde la humanidad se ha vuelto estéril, un hombre protege a la última mujer embarazada.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 46,
      title: "Arrival",
      image: "/movies/arrival.jpg",
      duration: "1h 56m",
      rating: "13+",
      year: 2016,
      genres: ["Ciencia ficción", "Drama", "Misterio"],
      match: 92,
      description: "Una lingüista es reclutada para comunicarse con alienígenas que han llegado a la Tierra.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 47,
      title: "Blade Runner 2049",
      image: "/movies/blade-runner.jpg",
      duration: "2h 44m",
      rating: "16+",
      year: 2017,
      genres: ["Ciencia ficción", "Drama", "Misterio"],
      match: 91,
      description: "Un nuevo blade runner descubre un secreto que podría sumir a la sociedad en el caos.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 48,
      title: "Annihilation",
      image: "/movies/annihilation.jpg",
      duration: "1h 55m",
      rating: "16+",
      year: 2018,
      genres: ["Ciencia ficción", "Aventura", "Horror"],
      match: 90,
      description: "Una bióloga se une a una expedición en una zona misteriosa donde las leyes de la naturaleza no aplican.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 49,
      title: "Dune",
      image: "/movies/dune.jpg",
      duration: "2h 35m",
      rating: "13+",
      year: 2021,
      genres: ["Ciencia ficción", "Aventura", "Drama"],
      match: 89,
      description: "Un joven debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 50,
      title: "Interstellar",
      image: "/movies/interstellar.jpg",
      duration: "2h 49m",
      rating: "13+",
      year: 2014,
      genres: ["Ciencia ficción", "Aventura", "Drama"],
      match: 88,
      description: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio para salvar a la humanidad.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <Header showNav />
      <div key={key} className="pt-20 bg-black min-h-screen">
        {selectedMovie && (
          <VideoPlayer
            videoUrl={selectedMovie.videoUrl}
            title={selectedMovie.title}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        <HeroVideo
          title="Contenido destacado"
          description="Descubre las mejores películas y series en un solo lugar."
          onPlay={() => handlePlayMovie(actionMovies[0])}
        />

        <div className="pt-4">
          <MovieRow title="Acción" movies={actionMovies} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Comedia" movies={comedyMovies} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Drama" movies={dramaMovies} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Terror" movies={horrorMovies} onPlayMovie={handlePlayMovie} />
          <MovieRow title="Ciencia Ficción" movies={scifiMovies} onPlayMovie={handlePlayMovie} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Browse;