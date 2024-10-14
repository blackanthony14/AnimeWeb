import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, favorites } = useAuth();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <p className="mb-4">Welcome, {user.username}!</p>
      <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((anime) => (
            <Link key={anime.id} to={`/anime/${anime.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={anime.image_url} alt={anime.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 truncate">{anime.title}</h3>
                <p className="text-gray-600 text-sm">{anime.type} - {anime.episodes} episodes</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;