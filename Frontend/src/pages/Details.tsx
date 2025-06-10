import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { X } from 'lucide-react';

const TMDB_API_KEY = '1e143c15ed8df70dfa708cb2ac175ea7';

const Details = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        if (!id || !type) {
          throw new Error('ID o tipo no proporcionado');
        }

        // Obtener detalles basados en el tipo
        const detailRes = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}&language=es-ES`
        );
        setData(detailRes.data);

        // Obtener el reparto
        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${TMDB_API_KEY}&language=es-ES`
        );
        // Filtrar actores con profile_path y limitar a los 10 primeros
        setCast(creditsRes.data.cast.filter((actor: any) => actor.profile_path).slice(0, 10));

      } catch (err: any) {
        setError('No se pudo cargar la información.');
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type]);

  if (loading) return <div className="text-center text-white py-20">Cargando...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header hideLogo={true} />
      <main className="max-w-4xl mx-auto px-4 py-12 pt-28 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            className="w-full max-w-xs mx-auto md:w-64 h-auto rounded shadow-lg mb-4 md:mb-0 object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.title || data.name}</h1>
            <p className="text-gray-400 mb-4">{data.tagline}</p>
            <p className="mb-4">{data.overview}</p>
            <div className="mb-2">
              <span className="font-semibold">Fecha de estreno:</span> {data.release_date || data.first_air_date}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Puntaje:</span> {data.vote_average?.toFixed(1)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Géneros:</span> {data.genres?.map((g: any) => g.name).join(', ')}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Duración:</span> {data.runtime || data.episode_run_time?.[0]} min
            </div>
            {type === 'tv' && (
              <>
                <div className="mb-2">
                  <span className="font-semibold">Temporadas:</span> {data.number_of_seasons}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Episodios:</span> {data.number_of_episodes}
                </div>
              </>
            )}
            {cast.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Reparto:</span>
                <div className="flex flex-wrap gap-3 mt-2">
                  {cast.map((actor: any) => (
                    <div key={actor.id} className="text-center w-20">
                      {actor.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-1 border border-gray-700"
                        />
                      )}
                      <span className="text-xs text-gray-400 block">{actor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details; 