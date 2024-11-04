import React from 'react';
import { ApiKeyForm } from './components/ApiKeyForm';
import { TabContainer } from './components/layout/TabContainer';
import { FileSpreadsheet } from 'lucide-react';
import { Sheet, AnalysisResult } from './types';

const MOCK_SHEETS: Sheet[] = [
  {
    id: 'sheet1',
    name: 'Sales Data',
    status: 'ready',
    columns: [
      { id: 'date', name: 'Date', type: 'date', selected: true },
      { id: 'product', name: 'Product', type: 'string', selected: true },
      { id: 'revenue', name: 'Revenue', type: 'currency', selected: true },
      { id: 'units', name: 'Units', type: 'number', selected: true },
    ],
    data: [
      ['Date', 'Product', 'Revenue', 'Units'],
      ['2024-01-01', 'Widget A', '$1,200', '120'],
      ['2024-01-02', 'Widget B', '$800', '80'],
      ['2024-01-03', 'Widget C', '$1,500', '150'],
    ],
  },
  {
    id: 'sheet2',
    name: 'Inventory',
    status: 'ready',
    columns: [
      { id: 'product', name: 'Product', type: 'string', selected: true },
      { id: 'stock', name: 'Stock', type: 'number', selected: true },
      { id: 'reorder', name: 'Reorder Point', type: 'number', selected: true },
      { id: 'supplier', name: 'Supplier', type: 'string', selected: true },
    ],
    data: [
      ['Product', 'Stock', 'Reorder Point', 'Supplier'],
      ['Widget A', '500', '100', 'Supplier X'],
      ['Widget B', '300', '75', 'Supplier Y'],
      ['Widget C', '750', '150', 'Supplier Z'],
    ],
  },
];

const MOCK_ANALYSIS: AnalysisResult = {
  summary: 'The data shows strong sales performance with consistent growth across all product lines. Widget C is the top performer in terms of revenue.',
  insights: [
    'Widget C generates the highest revenue per unit',
    'All products maintain healthy inventory levels',
    'Stock levels are well above reorder points',
    'Supplier diversity reduces supply chain risk',
  ],
  timestamp: new Date().toLocaleString(),
};

function App() {
  const [isConfigured, setIsConfigured] = React.useState(false);
  const [sheets, setSheets] = React.useState<Sheet[]>([]);
  const [activeSheet, setActiveSheet] = React.useState<string>('');
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);

  const handleApiSubmit = (geminiKey: string, sheetsUrl: string) => {
    setTimeout(() => {
      setSheets(MOCK_SHEETS);
      setActiveSheet(MOCK_SHEETS[0].id);
      setAnalysis(MOCK_ANALYSIS);
      setIsConfigured(true);
    }, 1000);
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileSpreadsheet className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sheets & Gemini Integration
          </h1>
          <p className="text-gray-600">
            Connect your Google Sheets and Gemini API to get started
          </p>
        </div>
        <ApiKeyForm onSubmit={handleApiSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TabContainer 
        sheets={sheets}
        activeSheet={activeSheet}
        onSheetChange={setActiveSheet}
        analysis={analysis}
      />
    </div>
  );
}

export default App;