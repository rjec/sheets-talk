import React from 'react';
import { KeyRound, Table2, AlertCircle } from 'lucide-react';

interface ApiKeyFormProps {
  onSubmit: (geminiKey: string, sheetsUrl: string) => void;
}

export function ApiKeyForm({ onSubmit }: ApiKeyFormProps) {
  const [geminiKey, setGeminiKey] = React.useState('');
  const [sheetsUrl, setSheetsUrl] = React.useState('');
  const [error, setError] = React.useState('');

  const validateSheetsUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === 'docs.google.com' && 
             parsedUrl.pathname.includes('/spreadsheets/d/');
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateSheetsUrl(sheetsUrl)) {
      setError('Please enter a valid public Google Sheets URL');
      return;
    }

    if (!geminiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }

    onSubmit(geminiKey, sheetsUrl);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Connect Your Data</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your Gemini API key and a public Google Sheets URL to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="gemini-key" className="block text-sm font-medium text-gray-700">
            Gemini API Key
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="gemini-key"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your Gemini API key"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>

        <div>
          <label htmlFor="sheets-url" className="block text-sm font-medium text-gray-700">
            Google Sheets URL
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Table2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="sheets-url"
              value={sheetsUrl}
              onChange={(e) => setSheetsUrl(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Make sure your Google Sheet is publicly accessible
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Connect and Analyze
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Need help? Check out our{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            guide on setting up public sheets
          </a>
        </p>
      </div>
    </div>
  );
}