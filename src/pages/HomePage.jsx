import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import AnimeCard from '../components/common/AnimeCard';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const HomePage = ({ onNavigateToDetail }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchAnime(currentPage);
  }, [currentPage]);

  const fetchAnime = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getHome(page);
      setAnimeList(data.anime_list || []);
      setPagination(data.pagination || {});
    } catch (err) {
      setError('Failed to load anime. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingSpinner text="Loading latest anime..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchAnime(currentPage)} />;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          Latest Episodes
        </h1>
        <p className="text-gray-400">
          Nonton anime terbaru subtitle Indonesia
        </p>
      </div>

      {/* Anime Grid */}
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

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={currentPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;
