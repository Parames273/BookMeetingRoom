import React from 'react';

const UserDashboard: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Rajesh Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Heart Rate */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Heart Rate</h3>
            <meter min="0" max="200" value="75" className="w-full h-6"></meter>
            <p className="mt-2">75 BPM</p>
          </div>
          {/* Body Temperature */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Body Temperature</h3>
            <meter min="95" max="105" value="98.6" className="w-full h-6"></meter>
            <p className="mt-2">98.6°F</p>
          </div>
          {/* Blood Sugar */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Blood Sugar</h3>
            <meter min="70" max="180" value="120" className="w-full h-6"></meter>
            <p className="mt-2">120 mg/dL</p>
          </div>
        </div>
        {/* Health Tip of the Day */}
        <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Health Tip of the Day</h3>
          <p>Stay hydrated by drinking at least 8 glasses of water a day!</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;