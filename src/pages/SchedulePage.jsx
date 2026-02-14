import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { apiService } from '../services/api';
import { DAY_NAMES } from '../config/settings';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const SchedulePage = ({ onBack, onNavigateToDetail }) => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getSchedule();
      setSchedule(data.schedule || {});
    } catch (err) {
      setError('Failed to load schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading schedule..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchSchedule} />;

  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

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
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          📅 Anime Schedule
        </h1>
        <p className="text-gray-400">
          Jadwal rilis anime setiap hari
        </p>
      </div>

      {/* Schedule List */}
      <div className="space-y-6">
        {dayOrder.map((day) => {
          const animeList = schedule[day] || [];
          const dayInfo = DAY_NAMES[day];

          return (
            <div
              key={day}
              className="bg-gray-900/30 rounded-xl p-6 border border-white/5 hover:border-primary-500/20 transition-all animate-slide-up"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{dayInfo.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{dayInfo.name}</h2>
                </div>
                <span className="badge badge-primary">
                  {animeList.length} Anime
                </span>
              </div>

              {/* Anime List */}
              {animeList.length > 0 ? (
                <div className="space-y-3">
                  {animeList.map((anime, index) => {
                    const episodeMatch = anime.episode_info?.match(/\((\d+)\)/);
                    const episodeNumber = episodeMatch ? episodeMatch[1] : '?';
                    
                    let timeDisplay = anime.episode_info;
                    if (anime.episode_info?.includes('at')) {
                      const timeMatch = anime.episode_info.match(/at\s+(\d{2}:\d{2})/);
                      if (timeMatch) {
                        timeDisplay = `🕐 ${timeMatch[1]}`;
                      }
                    } else if (anime.episode_info?.includes('released')) {
                      timeDisplay = '✅ Released';
                    }

                    return (
                      <div
                        key={index}
                        onClick={() => onNavigateToDetail(anime.slug)}
                        className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 cursor-pointer border border-white/5 hover:border-primary-500/50 transition-all group"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-white group-hover:text-primary-400 transition-colors">
                            {anime.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">{timeDisplay}</p>
                        </div>
                        <span className="badge badge-info ml-4">
                          Ep {episodeNumber}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No anime scheduled</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchedulePage;
