import React from 'react';
import Plot from 'react-plotly.js';
import { ChartPoint, ValuationMetrics, RiskMetrics } from '../types';

interface PriceChartProps {
  data: ChartPoint[];
  ticker: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, ticker }) => {
  return (
    <div className="w-full h-80 border border-gray-100 bg-white p-4">
      <Plot
        data={[
          {
            x: data.map(d => d.x),
            y: data.map(d => d.y),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#334155', size: 4 }, // slate-700
            line: { color: '#334155', width: 1.5 },
            fill: 'tozeroy',
            fillcolor: 'rgba(241, 245, 249, 0.5)', // slate-100
            name: ticker,
          },
        ]}
        layout={{
          autosize: true,
          title: { text: '2-Year Price Trend (Simulated)', font: { family: 'Times New Roman', size: 16, color: '#1e293b' } },
          margin: { l: 40, r: 20, t: 40, b: 40 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          xaxis: { showgrid: false, color: '#94a3b8' },
          yaxis: { showgrid: true, gridcolor: '#f1f5f9', color: '#94a3b8' },
          showlegend: false,
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

interface ValuationChartProps {
  metrics: ValuationMetrics;
  ticker: string;
}

export const ValuationChart: React.FC<ValuationChartProps> = ({ metrics, ticker }) => {
  return (
    <div className="w-full h-64 border border-gray-100 bg-white p-4">
      <Plot
        data={[
          {
            x: [ticker, 'Sector Avg'],
            y: [metrics.peRatio, metrics.sectorPe],
            type: 'bar',
            marker: {
              color: ['#334155', '#94a3b8'], // slate-700, slate-400
            },
            text: [metrics.peRatio.toFixed(1), metrics.sectorPe.toFixed(1)],
            textposition: 'auto',
          },
        ]}
        layout={{
          autosize: true,
          title: { text: 'P/E Ratio Comparison', font: { family: 'Times New Roman', size: 16, color: '#1e293b' } },
          margin: { l: 30, r: 20, t: 40, b: 30 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          yaxis: { showgrid: false, showticklabels: false },
          xaxis: { color: '#475569' },
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

interface RiskScatterProps {
  metrics: RiskMetrics;
  ticker: string;
}

export const RiskScatter: React.FC<RiskScatterProps> = ({ metrics, ticker }) => {
  return (
    <div className="w-full h-64 border border-gray-100 bg-white p-4">
      <Plot
        data={[
          {
            x: [metrics.beta],
            y: [metrics.alpha],
            mode: 'markers+text',
            type: 'scatter',
            text: [ticker],
            textposition: 'top center',
            marker: { size: 12, color: '#0f172a' }, // slate-900
            name: ticker
          },
          {
            x: [1],
            y: [0],
            mode: 'markers+text',
            type: 'scatter',
            text: ['Market (S&P 500)'],
            textposition: 'bottom center',
            marker: { size: 10, color: '#cbd5e1', symbol: 'cross' }, // slate-300
            name: 'Market'
          }
        ]}
        layout={{
          autosize: true,
          title: { text: 'Risk (Beta) vs Return (Alpha)', font: { family: 'Times New Roman', size: 16, color: '#1e293b' } },
          margin: { l: 50, r: 20, t: 40, b: 40 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          xaxis: { 
            title: 'Beta (Volatility)', 
            range: [0, Math.max(2, metrics.beta + 0.5)], 
            zeroline: false,
            gridcolor: '#f1f5f9'
          },
          yaxis: { 
            title: 'Alpha (Excess Return)', 
            zeroline: true, 
            zerolinecolor: '#94a3b8',
            gridcolor: '#f1f5f9'
          },
          showlegend: false
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};