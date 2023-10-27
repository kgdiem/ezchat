import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { SystemPromptsService } from '../system-prompts/system-prompts.service';
import { ChatService } from '../chat/chat.service';
import { Chat } from '@ezchat/types';

@Injectable()
export class ChatManager {
  private openai: OpenAI;

  constructor(
    private readonly systemPromptsService: SystemPromptsService,
    private readonly chatService: ChatService
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createChat(systemPromptId: string, userPrompt: string): Promise<Chat> {
    const systemPrompt = await this.systemPromptsService.getSystemPrompt(
      systemPromptId
    );

    if (!systemPrompt) {
      throw new Error(`System prompt ${systemPromptId} not found`);
    }

    const chatId = await this.chatService.addChat(systemPromptId);

    await this.chatService.addMessage(chatId, 'system', systemPrompt.text);
    await this.chatService.addMessage(chatId, 'user', userPrompt);

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt.text,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const message = response.choices[0].message.content;

    await this.chatService.addMessage(chatId, 'assistant', message);

    return this.chatService.getChat(chatId);
  }

  async sendMessage(chatId: string, userPrompt: string): Promise<Chat> {
    const chat = await this.chatService.getChat(chatId);

    if (!chat) {
      throw new Error(`Chat ${chatId} not found`);
    }

    await this.chatService.addMessage(chatId, 'user', userPrompt);

    const formattedMessages = chat.messages.map((message) => ({
      role: message.from,
      content: message.text,
    }));

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        ...formattedMessages,
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const message = response.choices[0].message.content;

    await this.chatService.addMessage(chatId, 'assistant', message);

    return this.chatService.getChat(chatId);
  }
}
