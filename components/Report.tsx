import React from 'react';
import { InvestmentAnalysis } from '../types';
import { PriceChart, ValuationChart, RiskScatter } from './Charts';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';

interface ReportProps {
  data: InvestmentAnalysis;
}

export const Report: React.FC<ReportProps> = ({ data }) => {
  const isBuy = data.verdict === 'BUY';
  const isSell = data.verdict === 'SELL';

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in bg-white p-8 md:p-12 shadow-sm border border-gray-100 mb-20">
      {/* Header */}
      <header className="border-b border-gray-200 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <div className="flex items-baseline space-x-4">
            <h1 className="text-4xl font-serif font-medium text-slate-900 tracking-tight">{data.ticker}</h1>
            <span className="text-xl text-gray-500 font-light">{data.companyName}</span>
          </div>
          <p className="text-3xl mt-2 text-slate-800 font-mono font-light">{data.currentPrice}</p>
        </div>
        <div className="mt-6 md:mt-0 text-right">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Recommendation</div>
          <div className={`text-2xl font-serif font-bold tracking-wide px-4 py-1 inline-block border ${
            isBuy ? 'border-slate-800 text-slate-900 bg-slate-50' : 
            isSell ? 'border-slate-400 text-slate-500' : 'border-slate-600 text-slate-700'
          }`}>
            {data.verdict}
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 font-sans">Executive Summary</h2>
        <p className="text-lg leading-relaxed text-slate-700 font-serif text-justify">
          {data.executiveSummary}
        </p>
      </section>

      {/* Key Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-y border-gray-100 py-8">
        <div>
          <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">P/E Ratio</span>
          <span className="text-2xl font-light text-slate-900">{data.metrics.valuation.peRatio.toFixed(2)}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Sector P/E</span>
          <span className="text-2xl font-light text-slate-500">{data.metrics.valuation.sectorPe.toFixed(2)}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Beta</span>
          <span className="text-2xl font-light text-slate-900">{data.metrics.risk.beta.toFixed(2)}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Alpha</span>
          <span className="text-2xl font-light text-slate-900">{data.metrics.risk.alpha.toFixed(2)}</span>
        </div>
      </section>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left Column: Textual Analysis */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp size={20} className="text-slate-400" />
              <h3 className="text-xl font-serif text-slate-900">Price Trend & Volatility</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans text-sm text-justify">
              {data.priceTrendAnalysis}
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-2 mb-3">
              <Activity size={20} className="text-slate-400" />
              <h3 className="text-xl font-serif text-slate-900">Valuation Context</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans text-sm text-justify">
              {data.valuationAnalysis}
            </p>
          </section>

           <section>
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle size={20} className="text-slate-400" />
              <h3 className="text-xl font-serif text-slate-900">Risk Profile & Earnings</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans text-sm text-justify">
              {data.riskAnalysis}
              <br/><br/>
              {data.earningsAnalysis}
            </p>
          </section>
        </div>

        {/* Right Column: Charts */}
        <div className="space-y-8">
          <PriceChart data={data.chartData.priceHistory} ticker={data.ticker} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <ValuationChart metrics={data.metrics.valuation} ticker={data.ticker} />
             <RiskScatter metrics={data.metrics.risk} ticker={data.ticker} />
          </div>
          <div className="bg-slate-50 p-6 border border-gray-100">
             <h4 className="font-serif text-slate-900 mb-2">Analyst Note</h4>
             <p className="text-xs text-slate-500 leading-relaxed">
               This report utilizes AI-generated analysis grounded in publicly available data derived from search results. 
               Financial markets are volatile; past performance, including the simulated curves shown here, does not guarantee future results. 
               The Beta and Alpha calculations are approximations based on recent historical windows.
             </p>
          </div>
        </div>
      </div>

    </div>
  );
};