import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../api';
import { AnimeDetails as AnimeDetailsType } from '../types';
import { useAuth } from '../contexts/AuthContext';

const AnimeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeDetailsType | null>(null);
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();

  useEffect(() => {
    if (id) {
      fetchAnimeDetails(parseInt(id)).then(setAnime);
    }
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  const handleFavoriteToggle = () => {
    if (isFavorite(anime.id)) {
      removeFromFavorites(anime.id);
    } else {
      addToFavorites(anime);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row">
        <img src={anime.image_url} alt={anime.title} className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
          <p className="text-gray-700 mb-4">{anime.synopsis}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p><strong>Type:</strong> {anime.type}</p>
            <p><strong>Episodes:</strong> {anime.episodes}</p>
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Aired:</strong> {anime.aired.string}</p>
            <p><strong>Rating:</strong> {anime.rating}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span key={genre.mal_id} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          {user && (
            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-2 rounded-full ${
                isFavorite(anime.id) ? 'bg-red-500 text-white' : 'bg-purple-500 text-white'
              }`}
            >
              {isFavorite(anime.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;