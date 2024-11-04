export interface Sheet {
  id: string;
  name: string;
  data: any[][];
  status: 'loading' | 'ready' | 'error';
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'currency';
  selected: boolean;
}

export interface ApiConfig {
  geminiKey: string;
  sheetsUrl: string;
}

export interface AnalysisResult {
  summary: string;
  insights: string[];
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}