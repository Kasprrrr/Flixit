import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Anime } from "./animes.entity";

@Entity("anime_films")
export class AnimeFilm {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Anime, (anime) => anime.films)
    @JoinColumn({ name: "anime_id" })
    anime: Anime;

    @Column({ name: "film_title" })
    film_title: string;

    @Column({ name: "streaming_url" })
    streaming_url: string;
}
