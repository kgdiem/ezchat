import { Module } from '@nestjs/common';
import { SystemPromptsController } from './system-prompts.controller';
import { SystemPromptsService } from './system-prompts.service';

@Module({
  controllers: [SystemPromptsController],
  providers: [SystemPromptsService],
  exports: [SystemPromptsService],
})
export class SystemPromptsModule {}
