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
      
      // Update sheet data here
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
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'loading':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center px-4">
          <nav className="flex space-x-4" aria-label="Tabs">
            {sheets.map((sheet) => (
              <button
                key={sheet.id}
                onClick={() => onSheetChange(sheet.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-t-lg
                  ${
                    activeSheet === sheet.id
                      ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <StatusIcon status={sheet.status} />
                <span>{sheet.name}</span>
              </button>
            ))}
          </nav>
          
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="p-4 overflow-x-auto">
        {currentSheet && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {currentSheet.data[0]?.map((header: string, i: number) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSheet.data.slice(1).map((row: string[], rowIndex: number) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}