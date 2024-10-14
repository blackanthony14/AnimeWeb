import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopAnime } from '../api';
import { Anime } from '../types';

const Home: React.FC = () => {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);

  useEffect(() => {
    fetchTopAnime().then(setTopAnime);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Popular Anime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topAnime.map((anime) => (
          <Link key={anime.id} to={`/anime/${anime.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={anime.image_url} alt={anime.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 truncate">{anime.title}</h2>
              <p className="text-gray-600 text-sm">{anime.type} - {anime.episodes} episodes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;