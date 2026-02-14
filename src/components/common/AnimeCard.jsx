import React from 'react';
import { Play, CheckCircle } from 'lucide-react';

const AnimeCard = ({ anime, onClick }) => {
  // Extract anime slug from episode title
  const getAnimeSlug = () => {
    // If slug is valid anime slug (not generic "anime"), use it
    if (anime.slug && anime.slug !== 'anime' && !anime.slug.includes('episode')) {
      return anime.slug;
    }
    
    // Extract anime name from title
    // Example: "One Piece Episode 1155 Subtitle Indonesia" -> "one-piece"
    const title = anime.title.toLowerCase();
    
    // Remove common patterns
    const cleanTitle = title
      .replace(/\s+episode\s+\d+.*$/i, '') // Remove "Episode 123..."
      .replace(/\s+subtitle\s+indonesia.*$/i, '') // Remove "Subtitle Indonesia"
      .replace(/\s+–\s+tamat.*$/i, '') // Remove "– TAMAT"
      .replace(/\s+\[end\].*$/i, '') // Remove "[END]"
      .replace(/\s+s\d+.*$/i, '') // Remove "S2", "S3", etc
      .trim();
    
    // Convert to slug format
    const slug = cleanTitle
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .toLowerCase();
    
    return slug;
  };

  const handleClick = () => {
    const animeSlug = getAnimeSlug();
    console.log('Navigating to anime:', animeSlug); // Debug
    onClick(animeSlug);
  };

  return (
    <div
      onClick={handleClick}
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
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-primary-500/90 rounded-full flex items-center justify-center shadow-neon-lg">
            <Play size={28} className="text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Status Badge */}
        {anime.status && (
          <div className="absolute top-3 right-3 z-10">
            <span className="badge badge-success flex items-center space-x-1">
              <CheckCircle size={12} />
              <span>{anime.status}</span>
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {anime.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">
          <span className="badge badge-primary">
            {anime.type}
          </span>
          <span className="badge badge-info">
            {anime.episode}
          </span>
        </div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
      </div>
    </div>
  );
};

export default AnimeCard;
