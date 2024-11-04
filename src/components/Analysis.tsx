import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisProps {
  analysis: AnalysisResult | null;
}

export function Analysis({ analysis }: AnalysisProps) {
  if (!analysis) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Available</h3>
        <p className="text-sm text-gray-500">
          Select a sheet and run analysis to see insights here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Data Analysis</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Summary Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                {analysis.summary}
              </p>
            </div>
          </div>

          {/* Key Insights Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Key Insights
            </h3>
            <div className="space-y-3">
              {analysis.insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timestamp */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last updated: {analysis.timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
