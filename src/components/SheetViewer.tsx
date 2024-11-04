import React from 'react';
import { Sheet } from '../types';
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { extractSheetId, fetchSheetData, parseSheetData } from '../utils/sheets';

interface SheetViewerProps {
  sheets: Sheet[];
  activeSheet: string;
  onSheetChange: (sheetId: string) => void;
  sheetsUrl: string;
}

export function SheetViewer({ sheets, activeSheet, onSheetChange, sheetsUrl }: SheetViewerProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sheetId = extractSheetId(sheetsUrl);
      if (!sheetId) throw new Error('Invalid sheet URL');

      const rawData = await fetchSheetData(sheetId);
      const parsedData = parseSheetData(rawData);
      
      console.log('Sheet data refreshed:', parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  };

  const currentSheet = sheets.find((s) => s.id === activeSheet);

  const StatusIcon = ({ status }: { status: Sheet['status'] }) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'loading':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center px-4">
          <nav className="flex space-x-2" aria-label="Tabs">
            {sheets.map((sheet) => (
              <button
                key={sheet.id}
                onClick={() => onSheetChange(sheet.id)}
                className={`
                  group relative flex items-center space-x-2 px-4 py-3 text-sm font-medium
                  ${
                    activeSheet === sheet.id
                      ? 'text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <StatusIcon status={sheet.status} />
                <span>{sheet.name}</span>
                {activeSheet === sheet.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </nav>
          
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50">
          <div className="flex items-center space-x-2 text-red-600 max-w-3xl mx-auto">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {currentSheet && (
            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      {currentSheet.data[0]?.map((header: string, i: number) => (
                        <th
                          key={i}
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentSheet.data.slice(1).map((row: string[], rowIndex: number) => (
                      <tr 
                        key={rowIndex} 
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {row.map((cell: string, cellIndex: number) => (
                          <td 
                            key={cellIndex} 
                            className="px-6 py-3 text-sm text-gray-600 whitespace-nowrap"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
