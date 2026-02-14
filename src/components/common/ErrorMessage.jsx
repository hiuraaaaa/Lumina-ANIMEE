import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-red-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">Oops!</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 btn-primary"
        >
          <RefreshCw size={18} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
