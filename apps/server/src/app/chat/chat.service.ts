import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { SystemPromptsService } from '../system-prompts/system-prompts.service';
import { ChatEntity, MessageEntity, MessageSender } from '../entities';

type DatabaseChat = Omit<ChatEntity, 'messages' | 'systemPrompt'> & {
  systemPromptId: string;
};

@Injectable()
export class ChatService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly systemPromptsService: SystemPromptsService
  ) {}

  async getChats() {
    await this.ensureSchemas();

    return this.knex('chats').select('*').orderBy('updatedAt', 'desc');
  }

  async getChat(id: string): Promise<ChatEntity> {
    await this.ensureSchemas();

    const chat = await this.knex<DatabaseChat>('chats').where({ id }).first();

    if (!chat) {
      return null;
    }

    const messages = await this.knex<MessageEntity>('messages')
      .where('chatId', id)
      .orderBy('timestamp', 'desc');

    const systemPrompt = await this.systemPromptsService.getSystemPrompt(
      chat.systemPromptId
    );

    return {
      ...chat,
      messages,
      systemPrompt,
    };
  }

  /**
   * Create a new chat
   * @param systemPromptId - the id of the system prompt to use
   * @returns string - the id of the new chat
   */
  async addChat(systemPromptId: string): Promise<string> {
    await this.ensureSchemas();

    const id = randomUUID();
    const chat: DatabaseChat = {
      id,
      systemPromptId,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    await this.knex<DatabaseChat>('chats').insert(chat);

    return id;
  }

  async addMessage(
    chatId: string,
    from: MessageSender,
    text: string
  ): Promise<string> {
    await this.ensureSchemas();

    const chat = await this.knex<Partial<ChatEntity>>('chats')
      .where({ id: chatId })
      .first();

    if (!chat) {
      return null;
    }

    const id = randomUUID();

    const message = {
      id,
      chatId: chat.id,
      from,
      text,
      timestamp: new Date().getTime(),
    };

    await this.knex('messages').insert(message);

    return id;
  }

  async deleteMessage(id: string): Promise<void> {
    await this.ensureSchemas();

    await this.knex('chats').where({ id }).delete();
  }

  private async ensureSchemas(): Promise<void> {
    await this.ensureChatsSchema();
    await this.ensureMessagesSchema();
  }

  private async ensureChatsSchema(): Promise<void> {
    if (!(await this.knex.schema.hasTable('chats'))) {
      await this.knex.schema.createTable('chats', (table) => {
        table.string('id').primary();
        table.string('systemPromptId');
        table.integer('createdAt');
        table.integer('updatedAt');
      });
    }

    await this.ensureMessagesSchema();
  }

  private async ensureMessagesSchema(): Promise<void> {
    if (!(await this.knex.schema.hasTable('messages'))) {
      await this.knex.schema.createTable('messages', (table) => {
        table.string('id').primary();
        table.string('chatId');
        table.string('from');
        table.string('text');
        table.integer('timestamp');
      });
    }
  }
}
