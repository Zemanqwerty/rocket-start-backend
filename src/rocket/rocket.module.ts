import { Module } from '@nestjs/common';
import { RocketController } from './rocket.controller';
import { AppWebSocketGateway } from './rocket.gateway';

@Module({
  controllers: [RocketController],
  providers: [AppWebSocketGateway]
})
export class RocketModule {}
