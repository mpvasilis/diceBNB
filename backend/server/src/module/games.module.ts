import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from '../web/rest/games.controller';
import { GamesRepository } from '../repository/games.repository';
import { GamesService } from '../service/games.service';

@Module({
  imports: [TypeOrmModule.forFeature([GamesRepository])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService]
})
export class GamesModule {}
