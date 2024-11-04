import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage, AnalysisResult } from '../../types';

interface ChatPanelProps {
  analysis: AnalysisResult | null;
}

export function ChatPanel({ analysis }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (analysis && messages.length === 0) {
      const initialMessages: ChatMessage[] = [
        {
          id: 'initial-summary',
          content: analysis.summary,
          role: 'assistant',
          timestamp: new Date(),
        },
        {
          id: 'initial-insights',
          content: 'Key Insights:\n\n' + analysis.insights.map(insight => `• ${insight}`).join('\n'),
          role: 'assistant',
          timestamp: new Date(),
        },
      ];
      setMessages(initialMessages);
    }
  }, [analysis, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev: ChatMessage[]) => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your question about the data. Let me analyze that for you...',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev: ChatMessage[]) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="px-6 py-4 bg-white border-b">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Sparkles className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-500">Ask questions about your data</p>
          </div>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {messages.map((message: ChatMessage) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="flex items-start max-w-[85%] space-x-2">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-indigo-100' 
                    : 'bg-emerald-100'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="h-5 w-5 text-indigo-600" />
                ) : (
                  <Bot className="h-5 w-5 text-emerald-600" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-2 block ${
                  message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[85%] space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Bot className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="bg-white text-gray-500 rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Ask about your data..."
            className="w-full rounded-lg border border-gray-200 pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
