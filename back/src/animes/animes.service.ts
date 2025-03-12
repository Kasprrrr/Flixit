import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import axios from "axios";
import { Anime } from "./animes.entity";

@Injectable()
export class AnimesService {
    private readonly BASE_URL = "https://api.jikan.moe/v4/anime";

    constructor(
        @InjectRepository(Anime)
        private animeRepository: Repository<Anime>,
    ) {}

    async getAllAnimes(): Promise<Anime[]> {
        try {
            const animes = await this.animeRepository.find();
            return animes;
        } catch (error) {
            console.error("Error fetching all animes:", error.message);
            throw new HttpException("Error fetching all animes", HttpStatus.BAD_GATEWAY);
        }
    }

    async getAnime(animeTitle: string): Promise<any> {
        try {
            const anime = await this.animeRepository.findOne({
                where: { title: ILike(animeTitle) },
                relations: ["seasons", "films"],
            });

            if (!anime) {
                throw new HttpException(
                    "No anime found with the given title",
                    HttpStatus.NOT_FOUND,
                );
            }

            return {
                title: anime.title,
                image_url: anime.image_url,
                seasons: anime.seasons.length > 0 ? anime.seasons : [],
                films: anime.films.length > 0 ? anime.films : [],
            };
        } catch (error) {
            console.error("Error fetching anime with seasons and films:", error); // Detailed error log
            throw new HttpException(
                "Error fetching anime with seasons and films",
                HttpStatus.BAD_GATEWAY,
            );
        }
    }

    async getSeason(animeTitle: string, seasonTitle: string): Promise<any> {
        try {
            const anime = await this.animeRepository.findOne({
                where: { title: ILike(animeTitle) },
                relations: ["seasons", "seasons.episodes"],
            });

            if (!anime) {
                throw new HttpException(
                    "No anime found with the given title",
                    HttpStatus.NOT_FOUND,
                );
            }

            const season = anime.seasons.find(
                (season) => season.season_title.toLowerCase() === seasonTitle.toLowerCase(),
            );

            if (!season) {
                throw new HttpException(
                    "No season found with the given title for this anime",
                    HttpStatus.NOT_FOUND,
                );
            }

            return {
                anime_title: anime.title,
                image_url: anime.image_url,
                season_title: season.season_title,
                episodes: season.episodes.map((episode) => ({
                    episode_number: episode.episode_number,
                    streaming_url: episode.streaming_url,
                })),
            };
        } catch (error) {
            console.error("Error fetching season and episodes:", error);
            throw new HttpException("Error fetching season and episodes", HttpStatus.BAD_GATEWAY);
        }
    }

    async getAnimeInfos(animeTitle: string): Promise<any> {
        try {
            const searchResponse = await axios.get(`${this.BASE_URL}?q=${animeTitle}&limit=1`);
            const animeData = searchResponse.data.data[0];

            if (!animeData) {
                throw new HttpException(
                    "No anime found with the given title",
                    HttpStatus.NOT_FOUND,
                );
            }

            return animeData /*{
                title: animeData.title_english,
                type: animeData.type,
                year: animeData.year,
                season: animeData.season,
                score: animeData.score,
                synopsis: animeData.synopsis,
                image: animeData.images.jpg.image_url,
            }*/;
        } catch (error) {
            console.error(
                "Error fetching anime data:",
                error.response ? error.response.data : error.message,
            );
            throw new HttpException("Error fetching anime data", HttpStatus.BAD_GATEWAY);
        }
    }
}
