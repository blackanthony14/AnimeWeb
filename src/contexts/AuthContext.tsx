import React, { createContext, useState, useContext, useEffect } from 'react';
import { Anime } from '../types';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  addToFavorites: (anime: Anime) => void;
  removeFromFavorites: (animeId: number) => void;
  isFavorite: (animeId: number) => boolean;
  favorites: Anime[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Anime[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username].password === password) {
      const user = { username };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (username: string, password: string) => {
    // In a real app, you would send this data to a backend
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      throw new Error('Username already exists');
    }
    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    await login(username, password);
  };

  const addToFavorites = (anime: Anime) => {
    const updatedFavorites = [...favorites, anime];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (animeId: number) => {
    const updatedFavorites = favorites.filter((anime) => anime.id !== animeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (animeId: number) => {
    return favorites.some((anime) => anime.id === animeId);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, addToFavorites, removeFromFavorites, isFavorite, favorites }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};