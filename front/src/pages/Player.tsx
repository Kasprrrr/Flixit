import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { useGetSeason } from "../hooks/getRequests";

const HandleActions: React.FC = () => {
    const { type, service } = useParams();
    const {
        data: season,
        isLoading: isSeasonLoading,
        isError: isSeasonError,
    } = useGetSeason(type || "", service || "");

    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);

    const handleNext = () => {
        if (currentEpisodeIndex < season.episodes.length - 1) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentEpisodeIndex > 0) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    };

    const handleEpisodeChange = (event: SelectChangeEvent<number>) => {
        setCurrentEpisodeIndex(Number(event.target.value));
    };

    const altText = type?.replace(/\s+/g, "-").toLowerCase();

    if (isSeasonLoading) return <p>Loading...</p>;
    if (isSeasonError) return <p>Error fetching season infos.</p>;

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(180deg, #000000, #000000,#272a37,#000000, #000000)",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <iframe
                src={season.episodes[currentEpisodeIndex].streaming_url}
                title={`Episode ${currentEpisodeIndex + 1}`}
                style={{
                    paddingTop: "10vh",
                    aspectRatio: "16/9",
                    border: "none",
                    width: "70vw",
                    height: "70vh",
                }}
                allowFullScreen
            ></iframe>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "70vw",
                    border: "1px solid #333333",
                    backgroundColor: "#222222",
                }}
            >
                <Select
                    value={currentEpisodeIndex}
                    onChange={handleEpisodeChange}
                    sx={{
                        color: "white",
                        backgroundColor: "#222222",
                        width: "100%",
                        height: "100%",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    {season.episodes.map((episode: any, index: number) => (
                        <MenuItem
                            key={index}
                            value={index}
                            sx={{
                                backgroundColor: "#222222",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "rgba(0,0,0,1)",
                                    fontWeight: "bold",
                                    ":hover": {
                                        backgroundColor: "rgba(0,0,0,1)",
                                    },
                                },
                            }}
                        >
                            Episode {index + 1}
                        </MenuItem>
                    ))}
                </Select>

                <Button
                    variant="contained"
                    disabled={currentEpisodeIndex === 0}
                    onClick={handlePrevious}
                    sx={{
                        width: "100%",
                        height: "100%",
                        fontWeight: "bold",
                        backgroundColor: "#222222",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    Prev
                </Button>

                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={currentEpisodeIndex === season.episodes.length - 1}
                    sx={{
                        width: "100%",
                        height: "100%",
                        fontWeight: "bold",
                        backgroundColor: "#222222",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    Next
                </Button>

                <Select
                    value="Sibnet"
                    sx={{
                        color: "white",
                        backgroundColor: "#222222",
                        fontWeight: "bold",
                        width: "100%",
                        height: "100%",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    <MenuItem
                        value="Sibnet"
                        sx={{
                            backgroundColor: "#222222",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.7)",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "rgba(0,0,0,1)",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,1)",
                                },
                            },
                        }}
                    >
                        Sibnet
                    </MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default HandleActions;
