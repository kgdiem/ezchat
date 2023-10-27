import { Body, Controller, Get, Post } from '@nestjs/common';
import { SystemPromptsService } from './system-prompts.service';
import { CreateSystemPromptParams, SystemPrompt } from '@ezchat/types';

@Controller('system-prompts')
export class SystemPromptsController {
  constructor(private readonly systemPromptService: SystemPromptsService) {}

  @Get()
  async getSystemPrompts(): Promise<SystemPrompt[]> {
    const prompts = await this.systemPromptService.getSystemPrompts();

    return prompts;
  }

  @Post()
  async addSystemPrompt(
    @Body() params: CreateSystemPromptParams
  ): Promise<SystemPrompt> {
    const id = await this.systemPromptService.addSystemPrompt(params.text);

    return this.systemPromptService.getSystemPrompt(id);
  }
}
