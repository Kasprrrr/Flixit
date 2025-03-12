import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { AnimeSeason } from "./anime_seasons.entity";

@Entity("anime_episodes")
export class AnimeEpisode {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AnimeSeason, (season) => season.episodes)
    @JoinColumn({ name: "season_id" })
    season: AnimeSeason;

    @Column({ name: "episode_number" })
    episode_number: number;

    @Column({ name: "streaming_url" })
    streaming_url: string;
}
