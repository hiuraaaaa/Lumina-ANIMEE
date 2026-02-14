import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { apiService } from '../services/api';
import AnimeCard from '../components/common/AnimeCard';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

const SearchPage = ({ query, onBack, onNavigateToDetail }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query || '');

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.searchAnime(searchTerm);
      setAnimeList(data.anime_list || []);
    } catch (err) {
      setError('Failed to search anime. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    fetchSearchResults(newQuery);
  };

  if (loading) return <LoadingSpinner text="Searching anime..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchSearchResults(searchQuery)} />;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
          🔍 Search Results
        </h1>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search another anime..."
        />
      </div>

      {/* Results Count */}
      {animeList.length > 0 && (
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-gray-400">
            Found <span className="text-white font-semibold">{animeList.length}</span> results for{' '}
            <span className="text-primary-400 font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {/* Results Grid */}
      {animeList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {animeList.map((anime, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <AnimeCard
                anime={anime}
                onClick={() => onNavigateToDetail(anime.slug)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No results found"
          message={`We couldn't find any anime matching "${searchQuery}". Try different keywords.`}
          action={
            <button
              onClick={onBack}
              className="btn-primary"
            >
              Back to Home
            </button>
          }
        />
      )}
    </div>
  );
};

export default SearchPage;
