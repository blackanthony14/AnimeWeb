import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">AnimeInfo</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-purple-200">Home</Link>
            <Link to="/search" className="hover:text-purple-200">Search</Link>
            {user ? (
              <>
                <Link to="/profile" className="hover:text-purple-200">Profile</Link>
                <button onClick={logout} className="hover:text-purple-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-purple-200">Login</Link>
                <Link to="/register" className="hover:text-purple-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;