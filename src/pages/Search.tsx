import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchAnime } from '../api';
import { Anime } from '../types';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Anime[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        searchAnime(query).then((data) => {
          setResults(data);
          setSuggestions(data.map((anime) => anime.title));
        });
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Anime</h1>
      <div className="mb-6 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anime..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((anime) => (
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

export default Search;