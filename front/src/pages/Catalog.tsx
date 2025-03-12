import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import SearchBar from "../components/utils/SearchBar";
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

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

function AnimeSearch() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Anime[]>([]);
    const debouncedQuery = useDebounce(query, 500);

    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [page, setPage] = useState(1);

    const hasMounted = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedQuery.trim()) {
                try {
                    const response = await axios.get(
                        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
                            debouncedQuery
                        )}&limit=5`
                    );
                    setSuggestions(response.data.data);
                } catch (error) {
                    console.error("Error fetching anime suggestions:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    const fetchAnimeList = async () => {
        try {
            const response = await axios.get(
                `https://api.jikan.moe/v4/anime?page=${page}&limit=25`
            );
            setAnimeList((prevAnimeList) => {
                const newAnimeList = response.data.data;
                const combinedList = [...prevAnimeList, ...newAnimeList];
                const uniqueAnime = Array.from(
                    new Map(combinedList.map((anime) => [anime.mal_id, anime])).values()
                );

                return uniqueAnime;
            });
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching anime list:", error);
        }
    };

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            fetchAnimeList();
        }
    }, []);

    const handleSearch = (searchTerm: string) => {
        setQuery(searchTerm);
    };

    const handleSelect = (selectedService: string) => {
        const selectedAnime = suggestions.find((anime) => anime.title === selectedService);
        if (selectedAnime) {
            navigate("/user/catalog/" + selectedAnime.title.toLowerCase());
        }
    };

    const handleAnimeClick = (anime: string) => {
        navigate("/user/catalog/" + anime.toLowerCase());
    };

    const handleAnimeLoad = () => {
        fetchAnimeList();
    };

    return (
        <div className="homeTemplate">
            <SearchBar
                services={suggestions.map((anime) => anime.title)}
                onSearch={handleSearch}
                onSelect={handleSelect}
            />

            <div
                style={{
                    //marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <div className="cardContainer">
                    {animeList.map((anime, index: number) => (
                        <Card
                            key={index}
                            imageUrl={anime.images.jpg.image_url}
                            name={anime.title}
                            onClick={() => handleAnimeClick(anime.title)}
                        />
                    ))}
                </div>
                <Button
                    variant="contained"
                    onClick={handleAnimeLoad}
                    sx={{
                        minWidth: "10vw",
                        fontWeight: "bold",
                        backgroundColor: "#ef537b",
                        color: "white",
                        borderRadius: "50px",
                        padding: "10px 20px",
                        marginBottom: "5vh",
                        lineHeight: 2.5,
                        "&:hover": {
                            backgroundColor: "#e1466d",
                        },
                    }}
                >
                    Load More
                </Button>
            </div>
        </div>
    );
}

export default AnimeSearch;
