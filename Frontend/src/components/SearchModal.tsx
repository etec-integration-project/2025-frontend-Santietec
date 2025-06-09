import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchResultCard from './SearchResultCard';

interface SearchResult {
  id: number;
  title: string;
  type: 'movie' | 'tv';
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

interface ContentSection {
  title: string;
  items: SearchResult[];
}

interface SearchModalProps {
  results: SearchResult[]; // Estos son los resultados de la búsqueda principal
  searchTerm: string; // Para mostrar sugerencias basadas en el término de búsqueda
  onClose: () => void;
}

const SearchModal = ({ results, searchTerm, onClose }: SearchModalProps) => {
  const navigate = useNavigate();

  // Datos simulados para "Más contenido para explorar"
  const getSuggestedContent = (term: string): ContentSection[] => {
    const lowerCaseTerm = term.toLowerCase();
    if (lowerCaseTerm.includes('parasite')) {
      return [
        {
          title: 'Resultados de "Parasite" (Simulado)',
          items: [
            {
              id: 1001,
              title: 'Parasite in Love',
              image: 'https://image.tmdb.org/t/p/w300/409C0637F8S0p64d50r8S4Q3sWw.jpg',
              type: 'movie' as const,
              badge: 'Nuevo',
              genres: ['Drama', 'Thriller'],
              year: 2019,
              match: 95,
              duration: '2h 12m',
              rating: 'R',
            },
            {
              id: 1002,
              title: 'Les parasites',
              image: 'https://image.tmdb.org/t/p/w300/tLz0rF03qQk1U2tB2J7Fw1Y8hR8.jpg',
              type: 'movie' as const,
              badge: 'Original de Netflix',
              genres: ['Comedia'],
              year: 1999,
              match: 70,
              duration: '1h 30m',
              rating: 'PG',
            },
            {
              id: 1003,
              title: 'Parasite: Part 1',
              image: 'https://image.tmdb.org/t/p/w300/1X6G1a2V10v2M1tB2J7Fw1Y8hR8.jpg',
              type: 'movie' as const,
              badge: 'Top 10',
              genres: ['Ciencia Ficción', 'Terror'],
              year: 2020,
              match: 88,
              duration: '1h 45m',
              rating: 'R',
            },
            {
              id: 1004,
              title: 'Parasite Eve',
              image: 'https://image.tmdb.org/t/p/w300/e9E9E9E9E9E9E9E9E9E9E9E9E9E.jpg',
              type: 'movie' as const,
              badge: null,
              genres: ['Terror', 'Acción'],
              year: 1997,
              match: 75,
              duration: '2h 0m',
              rating: 'R',
            },
            {
              id: 1005,
              title: 'The Paradise',
              image: 'https://image.tmdb.org/t/p/w300/jGYhXvK9Qf9d2L6b6o4f6h6h6h6h6h6.jpg',
              type: 'tv' as const,
              badge: null,
              genres: ['Drama', 'Romance'],
              year: 2012,
              match: 80,
              number_of_seasons: 2,
              rating: 'TV-PG',
            },
          ]
        },
        {
          title: 'Podría gustarte',
          items: [
            {
              id: 2001,
              title: 'Oldboy',
              image: 'https://image.tmdb.org/t/p/w300/lgsxXzT6YQf6h3h6h6h6h6h6h6h6h6h6.jpg',
              type: 'movie' as const,
              badge: null,
              genres: ['Acción', 'Drama'],
              year: 2003,
              match: 92,
              duration: '2h 0m',
              rating: 'R',
            },
            {
              id: 2002,
              title: 'Memories of Murder',
              image: 'https://image.tmdb.org/t/p/w300/e9E9E9E9E9E9E9E9E9E9E9E9E9E.jpg',
              type: 'movie' as const,
              badge: null,
              genres: ['Crimen', 'Drama', 'Misterio'],
              year: 2003,
              match: 90,
              duration: '2h 11m',
              rating: 'R',
            },
          ]
        }
      ];
    }
    
    // Sugerencias generales cuando no hay término de búsqueda o no coincide con 'parasite'
    if (term.trim() === '' || !lowerCaseTerm.includes('parasite')) {
      return [
        {
          title: 'Búsquedas populares',
          items: [
            {
              id: 3001,
              title: 'Stranger Things',
              image: 'https://image.tmdb.org/t/p/w300/49WJfeN0mYDPJzNyC0QJz0gE0g0.jpg',
              type: 'tv' as const,
              badge: 'Popular',
              genres: ['Ciencia Ficción', 'Drama', 'Terror'],
              year: 2016,
              match: 98,
              number_of_seasons: 4,
              rating: 'TV-14',
            },
            {
              id: 3002,
              title: 'The Witcher',
              image: 'https://image.tmdb.org/t/p/w300/vgfUjP4Zq6s4mF5d2L2b2f2d2g2e2h2.jpg',
              type: 'tv' as const,
              badge: null,
              genres: ['Acción', 'Aventura', 'Fantasía'],
              year: 2019,
              match: 85,
              number_of_seasons: 3,
              rating: 'TV-MA',
            },
            {
              id: 3003,
              title: 'Squid Game',
              image: 'https://image.tmdb.org/t/p/w300/d6b2c2b2c2b2c2b2c2b2c2b2c2b2c2b2.jpg',
              type: 'tv' as const,
              badge: 'Top 10',
              genres: ['Drama', 'Misterio', 'Thriller'],
              year: 2021,
              match: 92,
              number_of_seasons: 1,
              rating: 'TV-MA',
            },
            {
              id: 3004,
              title: 'Red Notice',
              image: 'https://image.tmdb.org/t/p/w300/wdh9B8C5oT9A9J7h8h8g8h8j8h8j8h8h.jpg',
              type: 'movie' as const,
              badge: 'Película',
              genres: ['Acción', 'Comedia', 'Crimen'],
              year: 2021,
              match: 78,
              duration: '1h 58m',
              rating: 'PG-13',
            }
          ]
        },
        {
          title: 'Series de tendencia',
          items: [
            {
              id: 4001,
              title: 'Arcane',
              image: 'https://image.tmdb.org/t/p/w300/qZt5w9Z7f7b7b7b7b7b7b7b7b7b7b7b7.jpg',
              type: 'tv' as const,
              badge: 'Animación',
              genres: ['Animación', 'Acción', 'Aventura'],
              year: 2021,
              match: 99,
              number_of_seasons: 1,
              rating: 'TV-14',
            },
            {
              id: 4002,
              title: 'Money Heist',
              image: 'https://image.tmdb.org/t/p/w300/e9E9E9E9E9E9E9E9E9E9E9E9E9E.jpg',
              type: 'tv' as const,
              badge: null,
              genres: ['Acción', 'Crimen', 'Drama'],
              year: 2017,
              match: 90,
              number_of_seasons: 5,
              rating: 'TV-MA',
            }
          ]
        }
      ];
    }

    return [];
  };

  const suggestedContentSections = getSuggestedContent(searchTerm);

  const handleItemClick = (item: SearchResult) => {
    navigate(`/details/${item.type}/${item.id}`);
  };

  return (
    <div className="bg-black/95 p-4">
      {searchTerm.trim() === '' ? (
        suggestedContentSections.length > 0 ? (
          <>
            {suggestedContentSections.map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="text-xl text-white mb-4">{section.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="relative overflow-visible w-[185px] h-[278px]">
                      <SearchResultCard item={item} onCloseSearchModal={onClose} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-4 text-gray-400">
            Busca películas o series para empezar.
          </div>
        )
      ) : (
        results.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-xl text-white mb-4">Resultados de la búsqueda para "{searchTerm}"</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2">
              {results.map((result) => (
                <div key={`${result.type}-${result.id}`} className="relative overflow-visible w-[185px] h-[278px]">
                  <SearchResultCard item={result} onCloseSearchModal={onClose} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          suggestedContentSections.length > 0 ? (
            <>
              {suggestedContentSections.map((section) => (
                <div key={section.title} className="mb-8">
                  <h2 className="text-xl text-white mb-4">{section.title}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2">
                    {section.items.map((item) => (
                      <div key={item.id} className="relative overflow-visible w-[185px] h-[278px]">
                        <SearchResultCard key={item.id} item={item} onCloseSearchModal={onClose} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-4 text-gray-400">
              No hay resultados para esta búsqueda.
            </div>
          )
        )
      )}
    </div>
  );
};

export default SearchModal;