import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { SystemPromptEntity } from '../entities';

@Injectable()
export class SystemPromptsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getSystemPrompts(): Promise<SystemPromptEntity[]> {
    await this.ensureSchema();

    return this.knex<SystemPromptEntity>('system_prompts')
      .select('*')
      .orderBy('updatedAt', 'desc')
      .orderBy('current', 'desc');
  }

  async getSystemPrompt(id: string): Promise<SystemPromptEntity> {
    await this.ensureSchema();

    return this.knex<SystemPromptEntity>('system_prompts')
      .where({ id })
      .first();
  }

  async addSystemPrompt(text: string): Promise<string> {
    await this.ensureSchema();

    const id = randomUUID();

    const prompt: SystemPromptEntity = {
      id,
      text,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      current: true,
    };

    await this.knex<SystemPromptEntity>('system_prompts').insert(prompt);

    return id;
  }

  async deleteSystemPrompt(id: string): Promise<void> {
    await this.ensureSchema();

    await this.knex<SystemPromptEntity>('system_prompts')
      .where({ id })
      .delete();
  }

  async updateSystemPrompt(
    id: string,
    text: string,
    current: boolean
  ): Promise<void> {
    await this.ensureSchema();

    await this.knex<SystemPromptEntity>('system_prompts')
      .where({ id })
      .update({ text, current });
  }

  private async ensureSchema(): Promise<void> {
    if (!(await this.knex.schema.hasTable('system_prompts'))) {
      await this.knex.schema.createTable('system_prompts', (table) => {
        table.string('id').primary();
        table.string('text');
        table.integer('createdAt');
        table.integer('updatedAt');
        table.boolean('current');
      });
    }
  }
}
