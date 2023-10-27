import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SystemPromptsModule } from '../system-prompts/system-prompts.module';
import { ChatManager } from './chat.manager';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatManager],
  exports: [ChatService],
  imports: [SystemPromptsModule],
})
export class ChatModule {}
