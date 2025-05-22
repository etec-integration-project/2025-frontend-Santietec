import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCard from '../components/MovieCard';
import HeroVideo from '../components/HeroVideo';
import { useProfile } from '../contexts/ProfileContext';
import Header from '../components/Header';

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

const ShowRow = ({
  title,
  shows,
  onPlayShow,
}: {
  title: string;
  shows: Show[];
  onPlayShow: (show: Show) => void;
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

      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/75 text-white p-2 rounded-full z-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        ref={rowRef}
        className="flex space-x-2 overflow-x-scroll scroll-smooth px-4 md:px-16 scrollbar-hide"
      >
        {shows.map((show, index) => (
          <div key={index} className="flex-none w-[250px]">
            <MovieCard movie={show} onPlay={onPlayShow} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/75 text-white p-2 rounded-full z-50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const TVShows = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { currentProfile } = useProfile();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Cada vez que cambie el perfil, actualizamos la key para forzar el re-render
    setKey(prev => prev + 1);
  }, [currentProfile]);

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
    },
    {
      id: 26,
      title: "The Boys",
      image: "/series/The Boys.webp",
      duration: "60m",
      rating: "16+",
      year: 2019,
      genres: ["Acción", "Comedia", "Crimen"],
      match: 94,
      description: "Un grupo de vigilantes lucha contra superhéroes corruptos que abusan de sus poderes.",
      seasons: "3",
      episodes: 24,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 27,
      title: "Peaky Blinders",
      image: "/series/Peaky Blinders.webp",
      duration: "60m",
      rating: "16+",
      year: 2013,
      genres: ["Drama", "Crimen", "Historia"],
      match: 93,
      description: "Una familia de gánsteres en Birmingham, Inglaterra, después de la Primera Guerra Mundial.",
      seasons: "6",
      episodes: 36,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 28,
      title: "The Punisher",
      image: "/series/The Punisher.webp",
      duration: "55m",
      rating: "16+",
      year: 2017,
      genres: ["Acción", "Drama", "Crimen"],
      match: 92,
      description: "Un veterano de guerra busca venganza por la muerte de su familia.",
      seasons: "2",
      episodes: 26,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 29,
      title: "Banshee",
      image: "/series/Banshee.webp",
      duration: "60m",
      rating: "16+",
      year: 2013,
      genres: ["Acción", "Crimen", "Drama"],
      match: 91,
      description: "Un exconvicto se hace pasar por un sheriff en una pequeña ciudad de Pensilvania.",
      seasons: "4",
      episodes: 38,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 30,
      title: "Warrior",
      image: "/series/Warrior.webp",
      duration: "60m",
      rating: "16+",
      year: 2019,
      genres: ["Acción", "Drama", "Crimen"],
      match: 90,
      description: "Un inmigrante chino en San Francisco durante las guerras de las bandas de Chinatown en la década de 1870.",
      seasons: "3",
      episodes: 30,
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
      image: "/series/The Office (US) (2005 - 2013).jpg",
      duration: "22m",
      rating: "12+",
      year: 2005,
      genres: ["Comedia", "Mockumentary"],
      match: 97,
      description: "La vida cotidiana de los empleados de una oficina de ventas de papel en Scranton, Pensilvania.",
      seasons: "9",
      episodes: 201,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 13,
      title: "Brooklyn Nine-Nine",
      image: "/series/Brooklyn Nine-Nine.webp",
      duration: "22m",
      rating: "12+",
      year: 2013,
      genres: ["Comedia", "Policíaco"],
      match: 96,
      description: "Las aventuras de un detective talentoso pero inmaduro y sus colegas en una comisaría de Brooklyn.",
      seasons: "8",
      episodes: 153,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 14,
      title: "Parks and Recreation",
      image: "/series/Parks and Recreation.webp",
      duration: "22m",
      rating: "12+",
      year: 2009,
      genres: ["Comedia", "Mockumentary"],
      match: 95,
      description: "Las aventuras de los empleados del departamento de parques y recreación de Pawnee, Indiana.",
      seasons: "7",
      episodes: 125,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 15,
      title: "The Good Place",
      image: "/series/The Good Place.webp",
      duration: "22m",
      rating: "12+",
      year: 2016,
      genres: ["Comedia", "Fantasía"],
      match: 94,
      description: "Una mujer es enviada por error al cielo y debe ocultar su pasado para permanecer allí.",
      seasons: "4",
      episodes: 53,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 16,
      title: "Community",
      image: "/series/Community.webp",
      duration: "22m",
      rating: "12+",
      year: 2009,
      genres: ["Comedia", "Sitcom"],
      match: 93,
      description: "Un grupo de estudiantes de una universidad comunitaria forman un grupo de estudio poco convencional.",
      seasons: "6",
      episodes: 110,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 17,
      title: "It's Always Sunny in Philadelphia",
      image: "/series/It's Always Sunny in Philadelphia.webp",
      duration: "22m",
      rating: "16+",
      year: 2005,
      genres: ["Comedia", "Sitcom"],
      match: 92,
      description: "Las desventuras de cinco amigos que dirigen un bar en Filadelfia.",
      seasons: "15",
      episodes: 162,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 18,
      title: "Arrested Development",
      image: "/series/Arrested Development.webp",
      duration: "22m",
      rating: "12+",
      year: 2003,
      genres: ["Comedia", "Sitcom"],
      match: 91,
      description: "Las desventuras de una familia disfuncional después de que el padre es encarcelado por fraude.",
      seasons: "5",
      episodes: 84,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 19,
      title: "30 Rock",
      image: "/series/30 Rock.png",
      duration: "22m",
      rating: "12+",
      year: 2006,
      genres: ["Comedia", "Sitcom"],
      match: 90,
      description: "Las aventuras detrás de cámaras de un programa de comedia en vivo.",
      seasons: "7",
      episodes: 138,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 20,
      title: "Veep",
      image: "/series/veep.webp",
      duration: "30m",
      rating: "16+",
      year: 2012,
      genres: ["Comedia", "Política"],
      match: 89,
      description: "Las aventuras de una vicepresidenta y su equipo en Washington D.C.",
      seasons: "7",
      episodes: 65,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];
  
  const dramaShows: Show[] = [
    {
      id: 11,
      title: "The Crown",
      image: "/series/The Crown.webp",
      duration: "60m",
      rating: "16+",
      year: 2016,
      genres: ["Drama", "Historia"],
      match: 98,
      description: "La vida de la Reina Isabel II desde su coronación hasta la actualidad.",
      seasons: "5",
      episodes: 50,
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
      match: 97,
      description: "Un jefe de la mafia de Nueva Jersey lucha por equilibrar su vida familiar con su carrera criminal.",
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
      genres: ["Drama", "Fantasía", "Aventura"],
      match: 96,
      description: "Nueve familias nobles luchan por el control de las tierras míticas de Westeros.",
      seasons: "8",
      episodes: 73,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 24,
      title: "Breaking Bad",
      image: "/series/Breaking Bad.webp",
      duration: "45m",
      rating: "16+",
      year: 2008,
      genres: ["Drama", "Crimen", "Thriller"],
      match: 95,
      description: "Un profesor de química con cáncer terminal se convierte en fabricante y distribuidor de metanfetamina.",
      seasons: "5",
      episodes: 62,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 25,
      title: "Mad Men",
      image: "/series/Mad Men.webp",
      duration: "45m",
      rating: "16+",
      year: 2007,
      genres: ["Drama", "Historia"],
      match: 94,
      description: "La vida de los ejecutivos de una agencia de publicidad en la década de 1960.",
      seasons: "7",
      episodes: 92,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 26,
      title: "The Wire",
      image: "/series/The Wire.webp",
      duration: "60m",
      rating: "16+",
      year: 2002,
      genres: ["Drama", "Crimen", "Thriller"],
      match: 93,
      description: "La vida en Baltimore a través de las perspectivas de la policía y los criminales.",
      seasons: "5",
      episodes: 60,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 27,
      title: "Better Call Saul",
      image: "/series/Better Call Saul.webp",
      duration: "45m",
      rating: "16+",
      year: 2015,
      genres: ["Drama", "Crimen"],
      match: 92,
      description: "La historia de cómo Jimmy McGill se convierte en el abogado Saul Goodman.",
      seasons: "6",
      episodes: 63,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 28,
      title: "Succession",
      image: "/series/Succession.webp",
      duration: "60m",
      rating: "16+",
      year: 2018,
      genres: ["Drama"],
      match: 91,
      description: "La lucha por el control de un imperio mediático global entre los miembros de una familia disfuncional.",
      seasons: "4",
      episodes: 39,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 29,
      title: "The Americans",
      image: "/series/The Americans.webp",
      duration: "45m",
      rating: "16+",
      year: 2013,
      genres: ["Drama", "Thriller"],
      match: 90,
      description: "Dos espías soviéticos viven como una familia estadounidense normal en Washington D.C. durante la Guerra Fría.",
      seasons: "6",
      episodes: 75,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 30,
      title: "Boardwalk Empire",
      image: "/series/Boardwalk Empire.webp",
      duration: "60m",
      rating: "16+",
      year: 2010,
      genres: ["Drama", "Crimen", "Historia"],
      match: 89,
      description: "La vida de un político corrupto durante la era de la Prohibición en Atlantic City.",
      seasons: "5",
      episodes: 56,
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
      description: "Cuando un niño desaparece, su madre, el jefe de policía y sus amigos deben enfrentar terribles fuerzas para recuperarlo.",
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
      match: 97,
      description: "Un grupo de sobrevivientes lucha por mantenerse con vida en un mundo post-apocalíptico lleno de zombis.",
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
      match: 96,
      description: "Una antología de historias de terror, cada temporada con un nuevo escenario y personajes.",
      seasons: "12",
      episodes: 128,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 34,
      title: "The Haunting of Hill House",
      image: "/series/The Haunting of Hill House.webp",
      duration: "60m",
      rating: "16+",
      year: 2018,
      genres: ["Drama", "Horror", "Misterio"],
      match: 95,
      description: "Una familia que creció en una casa embrujada se reúne después de una tragedia.",
      seasons: "1",
      episodes: 10,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 35,
      title: "Penny Dreadful",
      image: "/series/Penny Dreadful.webp",
      duration: "55m",
      rating: "16+",
      year: 2014,
      genres: ["Drama", "Horror", "Fantasía"],
      match: 94,
      description: "Personajes de la literatura gótica se reúnen en el Londres victoriano.",
      seasons: "3",
      episodes: 27,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 36,
      title: "The Haunting of Bly Manor",
      image: "/series/The Haunting of Bly Manor.webp",
      duration: "60m",
      rating: "16+",
      year: 2020,
      genres: ["Drama", "Horror", "Misterio"],
      match: 93,
      description: "Una joven institutriz es contratada para cuidar a dos niños en una mansión embrujada.",
      seasons: "1",
      episodes: 9,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 37,
      title: "Midnight Mass",
      image: "/series/Midnight Mass.webp",
      duration: "60m",
      rating: "16+",
      year: 2021,
      genres: ["Drama", "Horror", "Misterio"],
      match: 92,
      description: "Una isla aislada experimenta eventos milagrosos y aterradores después de la llegada de un misterioso sacerdote.",
      seasons: "1",
      episodes: 7,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 38,
      title: "The Terror",
      image: "/series/The Terror.webp",
      duration: "45m",
      rating: "16+",
      year: 2018,
      genres: ["Drama", "Horror", "Historia"],
      match: 91,
      description: "Una expedición ártica se enfrenta a un misterioso depredador y a la locura.",
      seasons: "2",
      episodes: 20,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 39,
      title: "Castle Rock",
      image: "/series/Castle Rock.webp",
      duration: "60m",
      rating: "16+",
      year: 2018,
      genres: ["Drama", "Horror", "Misterio"],
      match: 90,
      description: "Una antología que combina los elementos mitológicos de Stephen King en un nuevo y aterrador mundo.",
      seasons: "2",
      episodes: 20,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 40,
      title: "The Outsider",
      image: "/series/The Outsider.webp",
      duration: "60m",
      rating: "16+",
      year: 2020,
      genres: ["Drama", "Horror", "Misterio"],
      match: 89,
      description: "Un detective investiga un brutal asesinato que parece ser obra de un sospechoso que tiene una coartada irrefutable.",
      seasons: "1",
      episodes: 10,
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
      description: "Una antología que explora un futuro distópico donde la tecnología tiene consecuencias inesperadas.",
      seasons: "6",
      episodes: 27,
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
      genres: ["Drama", "Ciencia ficción", "Western"],
      match: 96,
      description: "En un parque temático futurista, los androides comienzan a cuestionar su realidad.",
      seasons: "4",
      episodes: 36,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 44,
      title: "Doctor Who",
      image: "/series/Doctor Who.webp",
      duration: "45m",
      rating: "13+",
      year: 2005,
      genres: ["Aventura", "Drama", "Ciencia ficción"],
      match: 95,
      description: "Las aventuras de un Señor del Tiempo que viaja a través del espacio y el tiempo en su TARDIS.",
      seasons: "13",
      episodes: 172,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 45,
      title: "Fringe",
      image: "/series/Fringe.webp",
      duration: "45m",
      rating: "13+",
      year: 2008,
      genres: ["Drama", "Ciencia ficción", "Misterio"],
      match: 94,
      description: "Un equipo del FBI investiga fenómenos paranormales y científicos inexplicables.",
      seasons: "5",
      episodes: 100,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 46,
      title: "Altered Carbon",
      image: "/series/Altered Carbon.webp",
      duration: "60m",
      rating: "16+",
      year: 2018,
      genres: ["Drama", "Ciencia ficción", "Acción"],
      match: 93,
      description: "En un futuro donde la conciencia puede transferirse a diferentes cuerpos, un exsoldado es contratado para resolver un asesinato.",
      seasons: "2",
      episodes: 18,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 47,
      title: "Dark",
      image: "/series/Dark.webp",
      duration: "60m",
      rating: "16+",
      year: 2017,
      genres: ["Drama", "Ciencia ficción", "Misterio"],
      match: 92,
      description: "La desaparición de dos niños en un pequeño pueblo alemán expone las relaciones fracturadas entre cuatro familias.",
      seasons: "3",
      episodes: 26,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 48,
      title: "Battlestar Galactica",
      image: "/series/Battlestar Galactica.webp",
      duration: "45m",
      rating: "16+",
      year: 2004,
      genres: ["Drama", "Ciencia ficción", "Acción"],
      match: 91,
      description: "Los últimos humanos supervivientes buscan un nuevo hogar mientras son perseguidos por los cylons.",
      seasons: "4",
      episodes: 75,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 49,
      title: "Orphan Black",
      image: "/series/Orphan Black.webp",
      duration: "45m",
      rating: "16+",
      year: 2013,
      genres: ["Drama", "Ciencia ficción", "Thriller"],
      match: 90,
      description: "Una mujer descubre que es un clon y se ve envuelta en una conspiración.",
      seasons: "5",
      episodes: 50,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    },
    {
      id: 50,
      title: "The Man in the High Castle",
      image: "/series/The Man in the High Castle.webp",
      duration: "60m",
      rating: "16+",
      year: 2015,
      genres: ["Drama", "Ciencia ficción", "Alternativa"],
      match: 89,
      description: "Una historia alternativa donde los nazis y los japoneses ganaron la Segunda Guerra Mundial.",
      seasons: "4",
      episodes: 40,
      videoUrl: "SPIDER-MAN Vuelve a la gran pantalla. ¡TODOS ELLOS a partir del 2 DE AGOSTO!.mp4"
    }
  ];

  const handlePlayShow = (show: Show) => {
    setSelectedShow(show);
  };

  return (
    <div key={key} className="pt-20 bg-black min-h-screen">
      {!selectedShow && <Header showNav />}
      {selectedShow && (
        <VideoPlayer
          videoUrl={selectedShow.videoUrl}
          title={selectedShow.title}
          onClose={() => setSelectedShow(null)}
        />
      )}

      <HeroVideo
        title="Spider-Man"
        description="¡Spider-Man vuelve a la gran pantalla! Prepárate para una nueva aventura épica con tu amigable vecino."
        onPlay={() => handlePlayShow(actionShows[0])}
      />

      <div className="pt-8">
        <ShowRow title="Series de Acción" shows={actionShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Comedias" shows={comedyShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Dramas" shows={dramaShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Terror" shows={horrorShows} onPlayShow={handlePlayShow} />
        <ShowRow title="Ciencia Ficción" shows={scifiShows} onPlayShow={handlePlayShow} />
      </div>
    </div>
  );
};

export default TVShows;