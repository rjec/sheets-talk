import React from 'react';
import { MessageSquare, Settings } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Sheet Analysis</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`p-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'chat'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'settings'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SheetViewer
              sheets={sheets}
              activeSheet={activeSheet}
              onSheetChange={onSheetChange}
              sheetsUrl=""
            />
          </div>
          <div className="lg:col-span-1 bg-white rounded-lg shadow">
            {activeTab === 'chat' ? (
              <ChatPanel analysis={analysis} />
            ) : (
              <SettingsPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}