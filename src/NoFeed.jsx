import React from 'react'
import { useNavigate } from 'react-router-dom';

  const NoFeed = () => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <div className="text-7xl mb-6">👨‍💻</div>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">No Developers Found</h2>
        <div className="text-center max-w-md space-y-3">
          <p className="text-gray-600">
            We couldn't find any developers matching your preferences right now.
          </p>
          <p className="text-gray-500">
            Try updating your preferences or check back later!
          </p>
          <button 
            onClick={() => navigate('/profile')}
            className="btn btn-primary mt-4"
          >
            Update Preferences
          </button>
        </div>
      </div>
    );
  };

export default NoFeed;

