import React, { useState } from 'react';
import { KeyRound, Link, Loader2 } from 'lucide-react';

interface ApiKeyFormProps {
  onSubmit: (geminiKey: string, sheetsUrl: string) => void;
}

export function ApiKeyForm({ onSubmit }: ApiKeyFormProps) {
  const [geminiKey, setGeminiKey] = useState('');
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(geminiKey, sheetsUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="gemini-key" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  id="gemini-key"
                  type={showKey ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-sm
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    placeholder:text-gray-400"
                  placeholder="Enter your Gemini API key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <KeyRound className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Your API key is stored locally and never shared
              </p>
            </div>

            <div>
              <label 
                htmlFor="sheets-url" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Google Sheets URL
              </label>
              <div className="relative">
                <input
                  id="sheets-url"
                  type="url"
                  value={sheetsUrl}
                  onChange={(e) => setSheetsUrl(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-sm
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    placeholder:text-gray-400"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  required
                />
                <Link className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Make sure your sheet is publicly accessible or shared
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !geminiKey || !sheetsUrl}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent 
              rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Connecting...
              </>
            ) : (
              'Connect to Sheets'
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-900">Need help?</h3>
            <div className="mt-2 space-y-2">
              <a 
                href="#" 
                className="text-sm text-indigo-600 hover:text-indigo-500 block"
              >
                How to get a Gemini API key
              </a>
              <a 
                href="#" 
                className="text-sm text-indigo-600 hover:text-indigo-500 block"
              >
                How to share your Google Sheet
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
