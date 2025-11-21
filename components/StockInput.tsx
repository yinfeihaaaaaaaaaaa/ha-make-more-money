import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface StockInputProps {
  onAnalyze: (ticker: string) => void;
  isLoading: boolean;
}

export const StockInput: React.FC<StockInputProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          className="w-full bg-white border border-gray-300 text-slate-900 text-lg rounded-sm py-4 px-6 pr-14 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all placeholder-gray-400 shadow-sm font-serif"
          placeholder="Enter Stock Symbol (e.g., AAPL, NVDA)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-3 p-2 text-slate-500 hover:text-slate-800 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <span className="block w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Search size={24} strokeWidth={1.5} />
          )}
        </button>
      </form>
      <p className="mt-3 text-center text-sm text-gray-500 font-sans">
        AI-Powered Analysis based on Yahoo Finance data via Google Search
      </p>
    </div>
  );
};