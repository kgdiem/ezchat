export interface Chat {
  id: string;
  messages: Message[];
  systemPrompt: SystemPrompt;
  createdAt: number;
  updatedAt: number;
}

export type MessageSender = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  from: MessageSender;
  text: string;
  timestamp: number;
}

export interface SystemPrompt {
  id: string;
  text: string;
  createdAt: number;
  updatedAt: number;
  current: boolean;
}

export interface CreateChatParams {
  systemPromptId: string;
  message: string;
}

export interface SendMessageParams {
  message: string;
}

export interface CreateSystemPromptParams {
  text: string;
}
