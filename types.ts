export interface ChartPoint {
  x: string; // Date
  y: number; // Value
}

export interface ValuationMetrics {
  peRatio: number;
  sectorPe: number;
  pbRatio?: number;
  pegRatio?: number;
}

export interface RiskMetrics {
  alpha: number;
  beta: number;
  sharpeRatio?: number;
}

export interface InvestmentAnalysis {
  ticker: string;
  companyName: string;
  currentPrice: string;
  executiveSummary: string;
  priceTrendAnalysis: string;
  valuationAnalysis: string;
  riskAnalysis: string;
  earningsAnalysis: string;
  verdict: "BUY" | "HOLD" | "SELL";
  chartData: {
    priceHistory: ChartPoint[];
  };
  metrics: {
    valuation: ValuationMetrics;
    risk: RiskMetrics;
  };
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}