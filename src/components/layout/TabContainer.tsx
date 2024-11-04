import React from 'react';
import { MessageSquare, Settings, FileSpreadsheet } from 'lucide-react';
import { ChatPanel } from '../chat/ChatPanel';
import { SettingsPanel } from '../settings/SettingsPanel';
import { Sheet, AnalysisResult } from '../../types';
import { SheetViewer } from '../SheetViewer';

interface TabContainerProps {
  sheets: Sheet[];
  activeSheet: string;
  onSheetChange: (sheetId: string) => void;
  analysis: AnalysisResult | null;
}

export function TabContainer({ sheets, activeSheet, onSheetChange, analysis }: TabContainerProps) {
  const [activeTab, setActiveTab] = React.useState<'chat' | 'settings'>('chat');

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Sheet Analysis</h1>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <SheetViewer
                sheets={sheets}
                activeSheet={activeSheet}
                onSheetChange={onSheetChange}
                sheetsUrl=""
              />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl h-full overflow-hidden border border-gray-200">
                {activeTab === 'chat' ? (
                  <ChatPanel analysis={analysis} />
                ) : (
                  <SettingsPanel />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
