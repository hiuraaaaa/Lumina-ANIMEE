import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, hasNext, hasPrev, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          hasPrev
            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-primary-500/50'
            : 'bg-gray-800/50 text-gray-600 cursor-not-allowed border border-gray-800'
        }`}
      >
        <ChevronLeft size={20} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Number */}
      <div className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-bold text-white shadow-neon">
        Page {currentPage}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          hasNext
            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-primary-500/50'
            : 'bg-gray-800/50 text-gray-600 cursor-not-allowed border border-gray-800'
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
