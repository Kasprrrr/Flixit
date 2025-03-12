import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimesService } from './animes.service';
import { AnimesController } from './animes.controller';
import { Anime } from './animes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Anime])],
    providers: [AnimesService],
    controllers: [AnimesController],
})
export class AnimesModule {}
