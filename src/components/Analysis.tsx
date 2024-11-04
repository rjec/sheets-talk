import React from 'react';
import { AnalysisResult } from '../types';
import { LineChart, Lightbulb, Clock } from 'lucide-react';

interface AnalysisProps {
  result: AnalysisResult | null;
}

export function Analysis({ result }: AnalysisProps) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <LineChart className="h-6 w-6 text-indigo-500" />
        <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="flex items-center text-lg font-medium text-indigo-900 mb-2">
            <Lightbulb className="h-5 w-5 mr-2" />
            Summary
          </h3>
          <p className="text-indigo-700">{result.summary}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">Key Insights</h3>
          <ul className="space-y-2">
            {result.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">•</span>
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>Generated at {result.timestamp}</span>
        </div>
      </div>
    </div>
  );
}