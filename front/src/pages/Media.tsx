import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

interface Anime {
    mal_id: number;
    title: string;
    type: string;
    year: number;
    season: string;
    score: number;
    synopsis: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}

const Media: React.FC = () => {
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const navigate = useNavigate();

    const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const mp4Files = Array.from(files)
                .filter(file => file.name.toLowerCase().endsWith(".mp4"))
                .map(file => file.name);

            setFileNames(mp4Files);
        }
    };

    useEffect(() => {
        const fetchAnimeData = async (query: string) => {
            try {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`
                );
                console.log(response.data.data[0]);
                return response.data.data[0];
            } catch (error) {
                console.error("Error fetching anime data:", error);
                return null;
            }
        };

        const fetchAllAnimeData = async () => {
            const animePromises = fileNames.map(name => fetchAnimeData(name.replace(/\.mp4$/i, "")));
            const animeResults = await Promise.all(animePromises);
            setAnimeList(animeResults.filter(anime => anime !== null) as Anime[]);
        };

        if (fileNames.length > 0) {
            fetchAllAnimeData();
        }
    }, [fileNames]);

    const handleAnimeClick = (animeTitle: string) => {
        navigate(`/user/catalog/${animeTitle.toLowerCase()}`);
    };

    return (
        <div className="homeTemplate">
            <h1 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
                Media Player
            </h1>
            <input
                type="file"
                onChange={handleFolderChange}
                style={{ display: "block", margin: "20px auto" }}
                accept=".mp4"
                {...{ webkitdirectory: "true" } as any}
            />
            <div className="cardContainer">
                {animeList.map((anime, index) => (
                    anime && (
                        <Card
                            key={index}
                            imageUrl={anime.images.jpg.image_url}
                            name={anime.title}
                            onClick={() => handleAnimeClick(anime.title)}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default Media;
