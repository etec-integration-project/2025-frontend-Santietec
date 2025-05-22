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

      {/* Botón de Scroll Izquierda */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-50"
        aria-label="Desplazar a la izquierda"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Contenedor de Películas con Referencia */}
      <div
        className="flex space-x-2 overflow-x-scroll scroll-smooth px-4 md:px-16 scrollbar-hide scrollbar-thumb-gray-600 scrollbar-track-transparent"
        ref={rowRef}
      >
        {movies.map((content) => (
          <div key={content.id} className="flex-none w-[250px]">
            <MovieCard movie={content} onPlay={onPlayMovie} />
          </div>
        ))}
      </div>

      {/* Botón de Scroll Derecha */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-50"
        aria-label="Desplazar a la derecha"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const Browse = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
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
      image: "/pelis/mision imposible fall.webp",
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
      image: "/pelis/equalizer.png",
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
      image: "/pelis/atomic.png",
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
      image: "/pelis/The_Night_Comes_for_Us-709983119-large.jpg",
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
      image: "/pelis/Extraction.webp",
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
      image: "/pelis/Nobody.webp",
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
      image: "/pelis/Superbad.webp",
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
      image: "/pelis/hangover.webp",
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
      image: "/pelis/Bridesmaids.webp",
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
      image: "/pelis/The Grand Budapest Hotel.webp",
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
      image: "/pelis/21 Jump Street.webp",
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
      image: "/pelis/The Lego Movie.webp",
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
      image: "/pelis/Scott Pilgrim vs. the World.webp",
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
      image: "/pelis/what we do in the nights.webp",
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
      image: "/pelis/The Nice Guys.webp",
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
      image: "/pelis/Game Night.png",
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
      image: "/pelis/The Shawshank Redemption.webp",
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
      image: "/pelis/Forrest Gump.webp",
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
      image: "/pelis/The Godfather.webp",
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
      image: "/pelis/Schindler's List.webp",
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
      image: "/pelis/The Green Mile",
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
      image: "/pelis/The Social Network.webp",
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
      image: "/pelis/The Prestige.webp",
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
      image: "/pelis/Whiplash.png",
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
      image: "/pelis/The Departed.webp",
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
      image: "/pelis/There Will Be Blood.webp",
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
      image: "/pelis/Get Out.png",
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
      image: "/pelis/The Babadook.webp",
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
      image: "/pelis/The Witch.webp",
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
      image: "/pelis/Midsommar.webp",
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
      image: "/pelis/The Lighthouse.webp",
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
      image: "/pelis/Hereditary.webp",
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
      image: "/pelis/It Follows.webp",
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
      image: "/pelis/The Ritual.webp",
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
      image: "/pelis/A Quiet Place.webp",
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
      image: "/pelis/The Invisible Man.png",
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
      image: "/pelis/Ex Machina.webp",
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
      image: "/pelis/Her.webp",
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
      image: "/pelis/District 9.webp",
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
      image: "/pelis/Looper.webp",
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
      image: "/pelis/Children of Men.webp",
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
      image: "/pelis/Arrival.webp",
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
      image: "/pelis/Blade Runner 2049.webp",
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
      image: "/pelis/Annihilation.webp",
      duration: "1h 55m",
      rating: "16+",
      year: 2018,
      genres: ["Ciencia ficción", "Aventura", "Horror"],
      match: 90,
      description: "Una bióloga se une a una expedición en una zona misteriosa donde las leyes de la naturaleza no aplican.",
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const actionShows: Show[] = [
    {
      id: 1,
      title: "The Mandalorian",
      image: "/series/The Mandalorian.jpg",
      duration: "40m",
      rating: "13+",
      year: 2019,
      genres: ["Acción", "Aventura", "Ciencia ficción"],
      match: 98,
      description: "Las aventuras de un cazarrecompensas en los confines de la galaxia, lejos de la autoridad de la Nueva República.",
      seasons: "3",
      episodes: 24,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 2,
      title: "Breaking Bad",
      image: "/series/Breaking Bad.webp",
      duration: "45m",
      rating: "16+",
      year: 2008,
      genres: ["Drama", "Crimen", "Thriller"],
      match: 99,
      description: "Un profesor de química con cáncer terminal se convierte en fabricante y distribuidor de metanfetamina para asegurar el futuro financiero de su familia.",
      seasons: "5",
      episodes: 62,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 3,
      title: "24",
      image: "/series/24.webp",
      duration: "45m",
      rating: "16+",
      year: 2001,
      genres: ["Acción", "Drama", "Thriller"],
      match: 95,
      description: "Las misiones del agente Jack Bauer en la Unidad de Contraterrorismo de Los Ángeles.",
      seasons: "9",
      episodes: 204,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 4,
      title: "Daredevil",
      image: "/series/Daredevil.webp",
      duration: "55m",
      rating: "16+",
      year: 2015,
      genres: ["Acción", "Drama", "Crimen"],
      match: 97,
      description: "Un abogado ciego lucha contra el crimen en Nueva York usando sus sentidos sobrehumanos.",
      seasons: "3",
      episodes: 39,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 5,
      title: "Vikings",
      image: "/series/Vikings.webp",
      duration: "45m",
      rating: "16+",
      year: 2013,
      genres: ["Acción", "Drama", "Historia"],
      match: 96,
      description: "Las aventuras de Ragnar Lothbrok, un granjero que se convierte en un temido guerrero vikingo.",
      seasons: "6",
      episodes: 89,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const comedyShows: Show[] = [
    {
      id: 11,
      title: "Friends",
      image: "/series/Friends.webp",
      duration: "22m",
      rating: "13+",
      year: 1994,
      genres: ["Comedia", "Romance"],
      match: 98,
      description: "Un grupo de amigos que viven en Manhattan y sus aventuras diarias.",
      seasons: "10",
      episodes: 236,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 12,
      title: "The Office (US)",
      image: "/series/The Office.webp",
      duration: "22m",
      rating: "12+",
      year: 2005,
      genres: ["Comedia", "Mockumentary"],
      match: 97,
      description: "La vida cotidiana de los empleados de una empresa de papel en Scranton, Pensilvania.",
      seasons: "9",
      episodes: 201,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 13,
      title: "Brooklyn Nine-Nine",
      image: "/series/Brooklyn Nine-Nine.webp",
      duration: "22m",
      rating: "13+",
      year: 2013,
      genres: ["Comedia", "Crimen"],
      match: 96,
      description: "Las aventuras de un detective de la policía de Nueva York y sus colegas.",
      seasons: "8",
      episodes: 153,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const dramaShows: Show[] = [
    {
      id: 21,
      title: "The Crown",
      image: "/series/The Crown.webp",
      duration: "60m",
      rating: "16+",
      year: 2016,
      genres: ["Drama", "Historia"],
      match: 98,
      description: "La vida de la reina Isabel II y los eventos que dieron forma al siglo XX.",
      seasons: "6",
      episodes: 60,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 22,
      title: "The Sopranos",
      image: "/series/The Sopranos.webp",
      duration: "55m",
      rating: "16+",
      year: 1999,
      genres: ["Drama", "Crimen"],
      match: 99,
      description: "Un jefe de la mafia de Nueva Jersey lucha por equilibrar su vida familiar y criminal.",
      seasons: "6",
      episodes: 86,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 23,
      title: "Game of Thrones",
      image: "/series/Game of Thrones.webp",
      duration: "60m",
      rating: "16+",
      year: 2011,
      genres: ["Drama", "Aventura", "Fantasía"],
      match: 97,
      description: "Nueve familias nobles luchan por el control de las tierras míticas de Westeros.",
      seasons: "8",
      episodes: 73,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const horrorShows: Show[] = [
    {
      id: 31,
      title: "Stranger Things",
      image: "/series/Stranger Things.webp",
      duration: "50m",
      rating: "13+",
      year: 2016,
      genres: ["Drama", "Fantasía", "Horror"],
      match: 98,
      description: "Cuando un niño desaparece, su madre, un jefe de policía y sus amigos deben enfrentar terribles fuerzas sobrenaturales para recuperarlo.",
      seasons: "4",
      episodes: 34,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 32,
      title: "The Walking Dead",
      image: "/series/The Walking Dead.webp",
      duration: "45m",
      rating: "16+",
      year: 2010,
      genres: ["Drama", "Horror", "Thriller"],
      match: 96,
      description: "Un grupo de sobrevivientes lucha por mantenerse con vida en un mundo post-apocalíptico dominado por zombis.",
      seasons: "11",
      episodes: 177,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 33,
      title: "American Horror Story",
      image: "/series/American Horror Story.webp",
      duration: "45m",
      rating: "16+",
      year: 2011,
      genres: ["Drama", "Horror", "Misterio"],
      match: 95,
      description: "Una antología de historias de terror, cada temporada con un nuevo escenario y personajes.",
      seasons: "12",
      episodes: 128,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const scifiShows: Show[] = [
    {
      id: 41,
      title: "Black Mirror",
      image: "/series/Black Mirror.webp",
      duration: "60m",
      rating: "16+",
      year: 2011,
      genres: ["Drama", "Ciencia ficción", "Thriller"],
      match: 98,
      description: "Una antología que explora un futuro tecnológico distópico y sus consecuencias en la sociedad.",
      seasons: "6",
      episodes: 28,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 42,
      title: "The Expanse",
      image: "/series/The Expanse.webp",
      duration: "45m",
      rating: "16+",
      year: 2015,
      genres: ["Drama", "Ciencia ficción", "Misterio"],
      match: 97,
      description: "En un futuro donde la humanidad ha colonizado el sistema solar, un detective y un capitán de nave espacial investigan un caso que podría desencadenar una guerra.",
      seasons: "6",
      episodes: 62,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 43,
      title: "Westworld",
      image: "/series/Westworld.webp",
      duration: "60m",
      rating: "16+",
      year: 2016,
      genres: ["Drama", "Ciencia ficción", "Misterio"],
      match: 96,
      description: "En un parque temático futurista poblado por androides, los visitantes pueden vivir sus fantasías más salvajes sin consecuencias.",
      seasons: "4",
      episodes: 36,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handlePlayShow = (show: Show) => {
    setSelectedShow(show);
  };

  // Combinar películas y series por categoría
  const actionContent = [...actionMovies, ...actionShows];
  const comedyContent = [...comedyMovies, ...comedyShows];
  const dramaContent = [...dramaMovies, ...dramaShows];
  const horrorContent = [...horrorMovies, ...horrorShows];
  const scifiContent = [...scifiMovies, ...scifiShows];

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

        <HeroVideo
          title="Contenido destacado"
          description="Descubre las mejores películas y series en un solo lugar."
          onPlay={() => handlePlayMovie(actionMovies[0])}
        />

        {/* Ocultar filas de contenido si hay una película o serie seleccionada */}
        {(!selectedMovie && !selectedShow) && (
          <div className="pt-4">
            <MovieRow
              title="Acción"
              movies={actionContent}
              onPlayMovie={(content) => {
                if ('seasons' in content) {
                  handlePlayShow(content as Show);
                } else {
                  handlePlayMovie(content as Movie);
                }
              }}
            />
            <MovieRow
              title="Comedia"
              movies={comedyContent}
              onPlayMovie={(content) => {
                if ('seasons' in content) {
                  handlePlayShow(content as Show);
                } else {
                  handlePlayMovie(content as Movie);
                }
              }}
            />
            <MovieRow
              title="Drama"
              movies={dramaContent}
              onPlayMovie={(content) => {
                if ('seasons' in content) {
                  handlePlayShow(content as Show);
                } else {
                  handlePlayMovie(content as Movie);
                }
              }}
            />
            <MovieRow
              title="Terror"
              movies={horrorContent}
              onPlayMovie={(content) => {
                if ('seasons' in content) {
                  handlePlayShow(content as Show);
                } else {
                  handlePlayMovie(content as Movie);
                }
              }}
            />
            <MovieRow
              title="Ciencia Ficción"
              movies={scifiContent}
              onPlayMovie={(content) => {
                if ('seasons' in content) {
                  handlePlayShow(content as Show);
                } else {
                  handlePlayMovie(content as Movie);
                }
              }}
            />
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Browse;