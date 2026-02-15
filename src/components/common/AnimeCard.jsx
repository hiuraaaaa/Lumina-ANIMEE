import React from 'react';
import { Play, CheckCircle } from 'lucide-react';

const AnimeCard = ({ anime, onClick }) => {
  const getAnimeSlug = () => {
    // Method 1: Extract from slug
    if (anime.slug && anime.slug.includes('episode')) {
      // "one-piece-episode-1155-subtitle-indonesia" → "one-piece"
      const parts = anime.slug.split('-episode-');
      if (parts[0]) {
        console.log('Extracted from slug:', anime.slug, '→', parts[0]);
        return parts[0];
      }
    }
    
    // Method 2: Extract from title
    const title = anime.title.toLowerCase();
    const cleanTitle = title
      .replace(/\s+episode\s+\d+.*/gi, '') // Remove "episode 1155..."
      .replace(/\s+–.*/gi, '') // Remove "– ..."
      .trim();
    
    const slug = cleanTitle
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    console.log('Extracted from title:', anime.title, '→', slug);
    return slug;
  };

  return (
    <div
      onClick={() => onClick(getAnimeSlug())}
      className="group relative bg-gray-900/50 rounded-xl overflow-hidden cursor-pointer card-glow border border-white/5 hover:border-primary-500/30 transition-all duration-300"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/250x350?text=No+Image';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-primary-500/90 rounded-full flex items-center justify-center shadow-neon-lg">
            <Play size={28} className="text-white ml-1" fill="white" />
          </div>
        </div>

        {anime.status && (
          <div className="absolute top-3 right-3 z-10">
            <span className="badge badge-success flex items-center space-x-1">
              <CheckCircle size={12} />
              <span>{anime.status}</span>
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {anime.title}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <span className="badge badge-primary">
            {anime.type}
          </span>
          <span className="badge badge-info">
            {anime.episode}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
      </div>
    </div>
  );
};

export default AnimeCard;
