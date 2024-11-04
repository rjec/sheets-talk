import React from 'react';
import { Settings, MessageSquare, X } from 'lucide-react';
import { ChatPanel } from '../chat/ChatPanel';
import { SettingsPanel } from '../settings/SettingsPanel';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = React.useState<'chat' | 'settings'>('chat');

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`p-2 rounded-md ${
                activeTab === 'chat'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-md ${
                activeTab === 'settings'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' ? <ChatPanel /> : <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}