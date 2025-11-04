import React, { useEffect, useState } from 'react';

const Streak = () => {
  const [startDate, setStartDate] = useState(() => {
    const savedDate = localStorage.getItem('streakDate');
    return savedDate ? new Date(savedDate) : new Date();
  });

  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate elapsed time
  const calculateElapsedTime = () => {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setElapsedTime({ days, hours, minutes, seconds });
  };

  // Update elapsed time every second
  useEffect(() => {
    calculateElapsedTime(); // Initial calculation
    const interval = setInterval(calculateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  // Reset streak
  const resetStreak = () => {
    const newStartDate = new Date();
    setStartDate(newStartDate);
    localStorage.setItem('streakDate', newStartDate.toISOString());
  };

  // Save startDate to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('streakDate', startDate.toISOString());
  }, [startDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
            Habit Tracker
          </h1>

          {/* Streak Info */}
          <div className="text-center space-y-4">
            <p className="text-sm font-medium text-gray-600">Streak Started Since</p>

            {/* Streak Counter - Large & Bold */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
              <h2 className="text-4xl font-extrabold tracking-wider">
                {String(elapsedTime.days).padStart(2, '0')}d{' '}
                {String(elapsedTime.hours).padStart(2, '0')}h{' '}
                {String(elapsedTime.minutes).padStart(2, '0')}m{' '}
                {String(elapsedTime.seconds).padStart(2, '0')}s
              </h2>
            </div>

            {/* Start Date */}
            <p className="text-xs text-gray-500 italic">
              Started on: {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString()}
            </p>

            {/* Reset Button */}
            <button
              onClick={resetStreak}
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md 
                       transition-all duration-200 transform hover:scale-105 active:scale-95 
                       focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              LOST — Reset Streak
            </button>
          </div>

          {/* Motivational Badge */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Keep Going!
            </span>
          </div>
        </div>

        {/* Footer Credit */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by Surya 
        </p>
      </div>
    </div>
  );
};

export default Streak;