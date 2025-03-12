import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Anime } from "./animes.entity";
import { AnimeEpisode } from "./anime_episodes.entity";

@Entity("anime_seasons")
export class AnimeSeason {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Anime, (anime) => anime.seasons)
    @JoinColumn({ name: "anime_id" })
    anime: Anime;

    @Column({ name: "season_title" })
    season_title: string;

    @OneToMany(() => AnimeEpisode, (episode) => episode.season)
    episodes: AnimeEpisode[];
}
