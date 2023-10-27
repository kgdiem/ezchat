import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatManager } from './chat.manager';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ChatEntity,
  CreateChatParamsEntity,
  SendMessageParamsEntity,
} from '../entities';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatManager: ChatManager
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all chats' })
  @ApiResponse({
    status: 200,
    description: 'The chats were successfully retrieved',
    type: [ChatEntity],
  })
  getData() {
    return this.chatService.getChats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chat by id' })
  @ApiResponse({
    status: 200,
    description: 'The chat was successfully retrieved',
    type: ChatEntity,
  })
  getChat(@Param('id') id: string) {
    return this.chatService.getChat(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiResponse({
    status: 201,
    description: 'The chat was successfully created',
    type: ChatEntity,
  })
  createChat(@Body() params: CreateChatParamsEntity) {
    return this.chatManager.createChat(params.systemPromptId, params.message);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Add a message to a chat' })
  @ApiResponse({
    status: 201,
    description: 'The message was successfully added to the chat',
    type: ChatEntity,
  })
  addMessage(@Param('id') id: string, @Body() params: SendMessageParamsEntity) {
    return this.chatManager.sendMessage(id, params.message);
  }
}
