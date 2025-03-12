import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useAnimeInfo } from "../hooks/jikanRequests";
import { useGetAnime } from "../hooks/getRequests";
import { Typography, Box, Button } from "@mui/material";
import { CalendarToday, Star, PlayCircle, AddCircle } from "@mui/icons-material";
import ActionModal from "./ActionModal";

const Anime: React.FC = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const backendUrl = `http://localhost:8080/anime/get/infos/${type}`;
    const {
        data: anime,
        isLoading: isAnimeLoading,
        isError: isAnimeError,
    } = useGetAnime(type || "");
    const {
        data: animeInfo,
        isLoading: isInfoLoading,
        isError: isInfoError,
    } = useAnimeInfo(backendUrl);
    console.log(animeInfo);
    const [openModal, setOpenModal] = useState(false);

    const altText = (animeTitle: string) => {
        return animeTitle?.replace(/'/g, "").replace(/\s+/g, "-").toLowerCase();
    };

    const handleSelect = (selectedService: string) => {
        navigate(`/user/catalog/${type}/${selectedService.toLowerCase()}`);
    };

    return (
        <div>
            {isInfoLoading ? (
                <p>Loading...</p>
            ) : isInfoError ? (
                <p>Error fetching anime infos.</p>
            ) : (
                <>
                    <img
                        src={
                            anime?.image_url ||
                            "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/" +
                                altText(animeInfo.title) +
                                ".jpg"
                        }
                        alt="AnimeInfoBg"
                        style={{ width: "100vw", height: "100vh", display: "block" }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "75vh",
                            background: "linear-gradient(to top, black, transparent)",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "25vh",
                            background: "linear-gradient(to bottom, black, transparent)",
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: "absolute",
                            bottom: "5vh",
                            left: "5vh",
                            color: "white",
                            width: "50%",
                        }}
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            fontWeight="bold"
                            paddingBottom="3vh"
                        >
                            {animeInfo.title}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={1} paddingBottom="1vh">
                            <CalendarToday sx={{ fill: "#e1466d" }} />
                            <Typography variant="body1" fontWeight="bold" sx={{ marginLeft: 1 }}>
                                {animeInfo.season} | {animeInfo.year} | {animeInfo.type}
                            </Typography>
                            <Box display="flex" alignItems="center" sx={{ marginLeft: 3 }}>
                                <Star sx={{ fill: "#e1466d" }} />
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    sx={{ marginLeft: 1 }}
                                >
                                    {animeInfo.score}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 16,
                                marginTop: 2,
                                display: "-webkit-box",
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {animeInfo.synopsis}
                        </Typography>
                        <Typography
                            onClick={() => setOpenModal(true)}
                            sx={{
                                width: "fit-content",
                                color: "#ef537b",
                                textTransform: "none",
                                marginTop: 1,
                                cursor: "pointer",
                            }}
                        >
                            See more...
                        </Typography>

                        <Box display="flex" gap={2} sx={{ marginTop: 5 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddCircle sx={{ fontSize: 20 }} />}
                                sx={{
                                    minWidth: "10vw",
                                    fontWeight: "bold",
                                    backgroundColor: "grey",
                                    color: "white",
                                    borderRadius: "50px",
                                    padding: "10px 20px",
                                    lineHeight: 2.5,
                                    "&:hover": {
                                        backgroundColor: "#707070",
                                    },
                                }}
                            >
                                Add to List
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (!isAnimeLoading && !isAnimeError) {
                                        navigate(`/user/catalog/${type}/season 1`);
                                    }
                                }}
                                startIcon={<PlayCircle sx={{ fontSize: 20 }} />}
                                sx={{
                                    minWidth: "10vw",
                                    fontWeight: "bold",
                                    backgroundColor: "#ef537b",
                                    color: "white",
                                    borderRadius: "50px",
                                    padding: "10px 20px",
                                    lineHeight: 2.5,
                                    "&:hover": {
                                        backgroundColor: "#e1466d",
                                    },
                                }}
                            >
                                Watch Now
                            </Button>
                        </Box>
                    </motion.div>
                    <ActionModal
                        animeInfo={animeInfo}
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                    />
                </>
            )}
            {isAnimeLoading ? (
                <p>Loading anime data...</p>
            ) : isAnimeError ? (
                <p>Error fetching anime data.</p>
            ) : (
                <div className="cardContainer">
                    {anime?.seasons.map((season: any, index: number) => (
                        <Card
                            key={index}
                            imageUrl={
                                anime.image_url ||
                                "https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/" +
                                    altText +
                                    ".jpg"
                            }
                            name={season.season_title}
                            onClick={() => handleSelect(season.season_title)}
                        />
                    ))}

                    {anime?.films.map((film: any, index: number) => (
                        <Card
                            key={index}
                            imageUrl={anime.image_url}
                            name={film.film_title}
                            onClick={() => handleSelect(film.film_title)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Anime;
