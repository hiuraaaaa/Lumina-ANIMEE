import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Inbox,
  title = 'No results found',
  message = 'Try adjusting your search or filter to find what you\'re looking for.',
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
        <Icon size={40} className="text-gray-600" />
      </div>
      
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md">{message}</p>
      
      {action && action}
    </div>
  );
};

export default EmptyState;
