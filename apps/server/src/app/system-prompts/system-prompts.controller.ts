import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SystemPromptsService } from './system-prompts.service';
import {
  CreateSystemPromptParamsEntity,
  SystemPromptEntity,
  UpdateSystemPromptParamsEntity,
} from '../entities';

@Controller('system-prompts')
export class SystemPromptsController {
  constructor(private readonly systemPromptService: SystemPromptsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all system prompts' })
  @ApiResponse({
    status: 200,
    description: 'The system prompts were successfully retrieved',
    type: [SystemPromptEntity],
  })
  async getSystemPrompts(): Promise<SystemPromptEntity[]> {
    const prompts = await this.systemPromptService.getSystemPrompts();

    return prompts;
  }

  @Post()
  @ApiOperation({ summary: 'Add a new system prompt' })
  @ApiResponse({
    status: 201,
    description: 'The system prompt was successfully created',
    type: SystemPromptEntity,
  })
  async addSystemPrompt(
    @Body() params: CreateSystemPromptParamsEntity
  ): Promise<SystemPromptEntity> {
    const id = await this.systemPromptService.addSystemPrompt(params.text);

    return this.systemPromptService.getSystemPrompt(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a system prompt' })
  @ApiResponse({
    status: 200,
    description: 'The system prompt was successfully updated',
    type: SystemPromptEntity,
  })
  async updateSystemPrompt(
    @Body() params: UpdateSystemPromptParamsEntity
  ): Promise<SystemPromptEntity> {
    await this.systemPromptService.updateSystemPrompt(
      params.id,
      params.text,
      params.current
    );

    return this.systemPromptService.getSystemPrompt(params.id);
  }
}
