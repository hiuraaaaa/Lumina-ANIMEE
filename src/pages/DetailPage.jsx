import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tv, Users, Play } from 'lucide-react';
import { apiService } from '../services/api';
import EpisodeCard from '../components/common/EpisodeCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const DetailPage = ({ slug, onBack, onWatch }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEpisode, setSearchEpisode] = useState('');

  useEffect(() => {
    if (slug) {
      console.log('DetailPage - Fetching slug:', slug); // Debug
      fetchDetail();
    } else {
      setError('Invalid anime slug');
      setLoading(false);
    }
  }, [slug]);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getAnimeDetail(slug);
      console.log('DetailPage - API Response:', data); // Debug
      
      if (data && data.detail) {
        setDetail(data.detail);
      } else {
        setError('Anime not found. The anime might not exist or the slug is incorrect.');
      }
    } catch (err) {
      console.error('DetailPage - Error:', err); // Debug
      
      // Better error messages
      if (err.response) {
        if (err.response.status === 404) {
          setError('Anime not found. Try searching for a different anime.');
        } else {
          setError(`Server error (${err.response.status}). Please try again later.`);
        }
      } else if (err.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Failed to load anime details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading anime details..." />;
  
  if (error) return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 text-gray-400 hover:text-white transition-colors"
      >
        ← Back
      </button>
      <ErrorMessage 
        message={error} 
        onRetry={fetchDetail} 
      />
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-sm text-yellow-200/80">
          💡 Tip: Try clicking on anime from the Ongoing or Completed page for better results.
        </p>
      </div>
    </div>
  );
  
  if (!detail) return null;

  const filteredEpisodes = detail.episode_list?.filter(ep =>
    ep.title.toLowerCase().includes(searchEpisode.toLowerCase()) ||
    ep.episode.toLowerCase().includes(searchEpisode.toLowerCase())
  ) || [];

  return (
    <div className="animate-fade-in">
      {/* Rest of the component remains the same... */}
      {/* (Keep all the existing JSX from the original DetailPage.jsx) */}
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 text-gray-400 hover:text-white transition-colors"
      >
        ← Back
      </button>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Poster */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <img
              src={detail.poster}
              alt={detail.title}
              className="w-full rounded-xl shadow-neon-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {detail.title}
          </h1>

          {/* Status Badge */}
          <div className="mb-6">
            <span className={`badge ${detail.info?.status === 'Ongoing' ? 'badge-primary' : 'badge-success'} text-base`}>
              {detail.info?.status === 'Ongoing' ? '📡 Ongoing' : '✓ Completed'}
            </span>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {detail.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 rounded-lg text-sm font-medium text-primary-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Tv size={18} />
                <span className="text-sm">Type</span>
              </div>
              <p className="text-white font-semibold">{detail.info?.type || 'N/A'}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Users size={18} />
                <span className="text-sm">Studio</span>
              </div>
              <p className="text-white font-semibold">{detail.info?.studio || 'N/A'}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Clock size={18} />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-white font-semibold">{detail.info?.duration || 'N/A'}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Calendar size={18} />
                <span className="text-sm">Season</span>
              </div>
              <p className="text-white font-semibold">{detail.info?.season || 'N/A'}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 col-span-2">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Calendar size={18} />
                <span className="text-sm">Updated</span>
              </div>
              <p className="text-white font-semibold">{detail.info?.updated_on || 'N/A'}</p>
            </div>
          </div>

          {/* Synopsis */}
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold mb-3">📖 Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">
              {detail.synopsis || 'No synopsis available.'}
            </p>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="bg-gray-900/30 rounded-xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Play size={28} className="text-primary-400" />
            <span>Episodes</span>
            <span className="badge badge-primary">{detail.episode_list?.length || 0}</span>
          </h2>
        </div>

        {/* Episode Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchEpisode}
            onChange={(e) => setSearchEpisode(e.target.value)}
            placeholder="Search episode..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Episode List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto scrollbar-custom pr-2">
          {filteredEpisodes.length > 0 ? (
            [...filteredEpisodes].reverse().map((episode, index) => (
              <EpisodeCard
                key={index}
                episode={episode}
                onClick={() => onWatch(episode.slug, index)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No episodes found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
