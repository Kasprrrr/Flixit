import { Controller, Get, Param } from "@nestjs/common";
import { AnimesService } from "./animes.service";
import { Anime } from "./animes.entity";

@Controller("anime")
export class AnimesController {
    constructor(private readonly animesService: AnimesService) {}

    @Get("get/all")
    async getAllAnimes(): Promise<Anime[]> {
        return this.animesService.getAllAnimes();
    }

    @Get("get/:title")
    async getAnime(@Param("title") title: string) {
        return this.animesService.getAnime(title);
    }

    @Get("get/:title/season/:season")
    async getSeason(@Param("title") title: string, @Param("season") season: string) {
        return this.animesService.getSeason(title, season);
    }

    @Get("get/infos/:title")
    async getAnimeInfos(@Param("title") title: string) {
        return this.animesService.getAnimeInfos(title);
    }
}
