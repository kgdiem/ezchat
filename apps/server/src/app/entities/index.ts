import { ApiProperty } from '@nestjs/swagger';

export type MessageSender = 'user' | 'assistant' | 'system';

export class SystemPromptEntity {
  @ApiProperty({
    description: 'The id of the system prompt',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The text of the system prompt',
    example: 'Hello, how can I help you?',
  })
  text: string;

  @ApiProperty({
    description: 'The timestamp when the system prompt was created',
    example: 1622072639,
  })
  createdAt: number;

  @ApiProperty({
    description: 'The timestamp when the system prompt was last updated',
    example: 1622072639,
  })
  updatedAt: number;

  @ApiProperty({
    description: 'Whether or not this is the current default system prompt',
    example: true,
  })
  current: boolean;
}

export class MessageEntity {
  @ApiProperty({
    description: 'The id of the message',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The sender of the message',
    example: 'user',
  })
  from: MessageSender;

  @ApiProperty({
    description: 'The text of the message',
    example: 'Hello, how can I help you?',
  })
  text: string;

  @ApiProperty({
    description: 'The timestamp when the message was sent',
    example: 1622072639,
  })
  timestamp: number;
}

export class ChatEntity {
  @ApiProperty({
    description: 'The id of the chat',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The messages in the chat',
    example: [
      {
        id: '1',
        from: 'user',
        text: 'Hello, how can I help you?',
        timestamp: 1622072639,
      },
    ],
  })
  messages: MessageEntity[];

  @ApiProperty({
    description: 'The system prompt for the chat',
    example: {
      id: '1',
      text: 'Hello, how can I help you?',
      createdAt: 1622072639,
      updatedAt: 1622072639,
      current: true,
    },
  })
  systemPrompt: SystemPromptEntity;

  @ApiProperty({
    description: 'The timestamp when the chat was created',
    example: 1622072639,
  })
  createdAt: number;

  @ApiProperty({
    description: 'The timestamp when the chat was last updated',
    example: 1622072639,
  })
  updatedAt: number;
}

export class CreateChatParamsEntity {
  @ApiProperty({
    description: 'The id of the system prompt to use',
    example: '1',
  })
  systemPromptId: string;

  @ApiProperty({
    description: 'The text of the message',
    example: 'Hello, how can I help you?',
  })
  message: string;
}

export class SendMessageParamsEntity {
  @ApiProperty({
    description: 'The text of the message',
    example: 'Hello, how can I help you?',
  })
  message: string;
}

export class CreateSystemPromptParamsEntity {
  @ApiProperty({
    description: 'The text of the system prompt',
    example: 'Hello, how can I help you?',
  })
  text: string;
}

export class UpdateSystemPromptParamsEntity {
  @ApiProperty({
    description: 'The id of the system prompt',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The text of the system prompt',
    example: 'Hello, how can I help you?',
  })
  text: string;

  @ApiProperty({
    description: 'Whether or not this is the current default system prompt',
    example: true,
  })
  current: boolean;
}
