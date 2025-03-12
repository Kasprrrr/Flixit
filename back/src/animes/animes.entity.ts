import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AnimeSeason } from './anime_seasons.entity';
import { AnimeFilm } from './anime_films.entity';

@Entity('animes')
export class Anime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image_url: string;

    @OneToMany(() => AnimeSeason, (season) => season.anime)
    seasons: AnimeSeason[];

    @OneToMany(() => AnimeFilm, (film) => film.anime)
    films: AnimeFilm[];
}
