import React, { useState, useEffect } from 'react';
import { Download, Play } from 'lucide-react';
import { apiService } from '../services/api';
import { RESOLUTION_ORDER, SERVER_COLORS } from '../config/settings';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const WatchPage = ({ slug, onBack }) => {
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStream, setActiveStream] = useState(0);

  useEffect(() => {
    fetchEpisode();
  }, [slug]);

  const fetchEpisode = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getEpisodeDetail(slug);
      setEpisode(data);
    } catch (err) {
      setError('Failed to load episode. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading episode..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchEpisode} />;
  if (!episode) return null;

  // Group downloads by resolution
  const groupedDownloads = {};
  episode.downloads?.forEach(download => {
    if (!groupedDownloads[download.resolution]) {
      groupedDownloads[download.resolution] = [];
    }
    groupedDownloads[download.resolution].push(download);
  });

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 text-gray-400 hover:text-white transition-colors"
      >
        ← Back to Anime
      </button>

      {/* Episode Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        {episode.episode_title}
      </h1>

      {/* Video Player Section */}
      <div className="bg-gray-900/30 rounded-xl p-6 mb-8 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
          <Play size={24} className="text-primary-400" />
          <span>Watch Online</span>
        </h2>

        {/* Stream Buttons */}
        {episode.streams && episode.streams.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {episode.streams.map((stream, index) => (
              <button
                key={index}
                onClick={() => setActiveStream(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeStream === index
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-neon'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                🎥 {stream.name}
              </button>
            ))}
          </div>
        )}

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-neon-lg">
          <iframe
            src={episode.streams?.[activeStream]?.url || ''}
            className="w-full h-full"
            allowFullScreen
            title="Video Player"
          />
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-gray-900/30 rounded-xl p-6 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Download size={24} className="text-primary-400" />
          <span>Download Episode</span>
        </h2>

        {/* Download Links by Resolution */}
        <div className="space-y-6">
          {RESOLUTION_ORDER.map(resolution => {
            const downloads = groupedDownloads[resolution];
            if (!downloads) return null;

            return (
              <div key={resolution} className="space-y-4">
                {/* Resolution Header */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg px-6 py-3">
                  <h3 className="text-xl font-bold text-white">
                    📺 {resolution.toUpperCase()}
                  </h3>
                </div>

                {/* Download Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {downloads.map((download, index) => {
                    const serverClass = SERVER_COLORS[download.name] || 'bg-gray-600 hover:bg-gray-700';
                    
                    return (
                      <a
                        key={index}
                        href={download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${serverClass} text-white px-4 py-3 rounded-lg font-semibold text-center transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2`}
                      >
                        <Download size={18} />
                        <span>{download.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Notice */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-200/80">
            💡 Pilih server download yang tersedia. Jika satu server lambat, coba server lainnya.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
