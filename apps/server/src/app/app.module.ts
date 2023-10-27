import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';

import { ChatModule } from './chat/chat.module';
import { SystemPromptsModule } from './system-prompts/system-prompts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: ':memory:',
      },
    }),
    ChatModule,
    SystemPromptsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
