import React from 'react';
import { Play, Calendar } from 'lucide-react';

const EpisodeCard = ({ episode, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-gray-900/30 hover:bg-gray-900/50 rounded-lg p-4 cursor-pointer border border-white/5 hover:border-primary-500/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        {/* Episode Info */}
        <div className="flex-1">
          <h4 className="font-medium text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-1">
            {episode.title || episode.episode}
          </h4>
          {episode.release_date && (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Calendar size={14} />
              <span>{episode.release_date}</span>
            </div>
          )}
        </div>

        {/* Episode Number Badge */}
        <div className="ml-4 flex items-center space-x-3">
          {episode.episode && (
            <span className="badge badge-primary font-mono">
              {episode.episode}
            </span>
          )}
          <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
            <Play size={18} className="text-primary-400 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
