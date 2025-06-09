import React, { useEffect } from 'react';
import { useMyList } from '../contexts/MyListContext';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const { myList, loadMyList } = useMyList();

  useEffect(() => {
    loadMyList();
  }, [loadMyList]);

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen bg-black pt-28">
      <h1 className="text-3xl text-white mb-8 mt-4">Mi Lista</h1>
      {myList.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No hay elementos en tu lista</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {myList.map((item) => (
            <MovieCard
              key={item.id}
              movie={{
                id: item.id,
                title: item.title,
                image: item.poster_path,
                rating: item.vote_average.toString(),
                year: new Date().getFullYear(),
                genres: [],
                match: 0,
                videoUrl: '',
                type: item.type,
                duration: '120 min'
              }}
              onPlay={() => {}}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MyList; 