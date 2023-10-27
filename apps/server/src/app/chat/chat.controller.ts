import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatParams, SendMessageParams } from '@ezchat/types';
import { ChatManager } from './chat.manager';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatManager: ChatManager
  ) {}

  @Get()
  getData() {
    return this.chatService.getChats();
  }

  @Get(':id')
  getChat(@Param('id') id: string) {
    return this.chatService.getChat(id);
  }

  @Post()
  createChat(@Body() params: CreateChatParams) {
    return this.chatManager.createChat(params.systemPromptId, params.message);
  }

  @Post(':id')
  addMessage(@Param('id') id: string, @Body() params: SendMessageParams) {
    return this.chatManager.sendMessage(id, params.message);
  }
}
