import React, { useState } from 'react';
import { StockInput } from './components/StockInput';
import { Report } from './components/Report';
import { Spinner } from './components/Spinner';
import { analyzeStock } from './services/geminiService';
import { InvestmentAnalysis } from './types';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InvestmentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (ticker: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeStock(ticker);
      setData(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 selection:bg-slate-200">
      
      {/* Navigation / Header */}
      <nav className="w-full border-b border-gray-200 bg-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10 bg-opacity-90 backdrop-blur-md">
        <div className="flex items-center space-x-2 text-slate-900">
          <Activity size={24} strokeWidth={1} />
          <span className="text-lg font-serif tracking-wide font-semibold">INVEZT<span className="text-slate-400">PRO</span></span>
        </div>
        <div className="text-xs text-gray-400 tracking-widest uppercase hidden sm:block">
          Professional Investment Analysis
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-16 px-4 md:px-8">
        
        {/* Intro Text (Only show if no data) */}
        {!data && !loading && (
          <div className="text-center mb-12 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">
              Market clarity,<br/> distilled.
            </h1>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Enter a ticker symbol to generate a comprehensive, institutional-grade investment memo. 
              We analyze price action, valuation multiples, and risk metrics to provide a clear thesis.
            </p>
          </div>
        )}

        {/* Input Section */}
        <StockInput onAnalyze={handleAnalyze} isLoading={loading} />

        {/* Feedback States */}
        {loading && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            <Spinner />
            <p className="text-slate-500 font-serif animate-pulse">Consulting the market...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 border border-red-200 bg-red-50 text-red-800 text-sm max-w-md text-center rounded-sm">
            {error}
          </div>
        )}

        {/* Report Render */}
        {data && !loading && (
          <div className="w-full animate-fade-in-up">
            <Report data={data} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-8 text-center text-slate-400 text-xs font-sans">
        &copy; {new Date().getFullYear()} Invezt Pro. Not financial advice. Data provided by AI research.
      </footer>
    </div>
  );
};

export default App;