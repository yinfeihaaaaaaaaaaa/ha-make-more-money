import { GoogleGenAI } from "@google/genai";
import { InvestmentAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeStock = async (ticker: string): Promise<InvestmentAnalysis> => {
  const modelId = "gemini-3-pro-preview"; // Using Pro Preview for better reasoning and search capabilities

  const prompt = `
    Act as a senior Wall Street equity research analyst. 
    Conduct a deep dive investment analysis for the company with ticker or name: "${ticker}".
    
    You MUST use Google Search to find the most recent and accurate data from sources like Yahoo Finance, Bloomberg, or Reuters.
    
    Perform the following specific checks:
    1. **Price History (2 Years)**: Analyze if there are patterns in stock price movements, specifically checking if gains are concentrated around earnings releases.
    2. **Valuation**: Compare the current P/E ratio to the S&P 500 benchmark and its specific sector average.
    3. **Risk/Return**: Find the Alpha and Beta. Assess if the stock is high beta (volatile) or low beta (defensive).
    4. **Earnings**: Analyze recent financial reports. Are there hidden risks or opportunities?
    
    **Output Format Rule:**
    You MUST return the result strictly as a valid JSON object. Do not wrap it in markdown code blocks. just the raw JSON string.
    The JSON must match this structure:
    {
      "ticker": "Symbol",
      "companyName": "Full Name",
      "currentPrice": "Price with currency",
      "executiveSummary": "A concise, professional summary of the investment thesis (approx 100 words).",
      "priceTrendAnalysis": "Detailed text analyzing price patterns, volatility, and post-earnings behavior.",
      "valuationAnalysis": "Text comparing valuation metrics to peers and historical averages.",
      "riskAnalysis": "Text explaining the Alpha/Beta profile and what it means for an investor.",
      "earningsAnalysis": "Insights derived from the latest balance sheet/income statement.",
      "verdict": "BUY" or "HOLD" or "SELL",
      "chartData": {
        "priceHistory": [
          {"x": "2023-01", "y": 100}, 
          ... generate about 24 representative data points (one per month) for the last 2 years based on the real trend you found ...
        ]
      },
      "metrics": {
        "valuation": {
          "peRatio": number,
          "sectorPe": number,
          "pbRatio": number (optional),
          "pegRatio": number (optional)
        },
        "risk": {
          "alpha": number,
          "beta": number,
          "sharpeRatio": number (optional)
        }
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: We cannot use responseMimeType: 'application/json' combined with googleSearch in some contexts, 
        // but we will instruct the model to output JSON text and parse it manually.
      },
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("No response received from AI.");
    }

    // Clean up markdown if present (e.g. ```json ... ```)
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const data = JSON.parse(cleanedText) as InvestmentAnalysis;
      return data;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw text:", text);
      throw new Error("Failed to parse analysis data. Please try again.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};