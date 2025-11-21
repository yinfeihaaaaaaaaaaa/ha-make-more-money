import React from 'react';

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2 animate-pulse">
    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
    <div className="w-2 h-2 bg-slate-600 rounded-full delay-75"></div>
    <div className="w-2 h-2 bg-slate-600 rounded-full delay-150"></div>
  </div>
);