import { Box, Modal, IconButton, Typography, Divider, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ActionModalProps {
    animeInfo: any;
    open: boolean;
    onClose: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ animeInfo, open, onClose }) => {
    const handleCloseModal = () => {
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            BackdropProps={{
                sx: {
                    backdropFilter: "blur(3px)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
        >
            <Box className="createModal">
                <IconButton
                    onClick={handleCloseModal}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "white",
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Box sx={{ display: "flex", width: "100%", height: "90%" }}>
                    <Box sx={{ flex: "1 1 30%", paddingRight: 2 }}>
                        <img
                            src={
                                animeInfo.images?.jpg?.large_image_url ||
                                animeInfo.images?.jpg?.image_url
                            }
                            alt={animeInfo.title}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: "1 1 80%", paddingLeft: 2, overflowY: "auto" }}>
                        <Typography variant="h4" fontWeight="bold" color="#e1466d" gutterBottom>
                            {animeInfo.title}
                        </Typography>
                        <Typography variant="subtitle1" color="gray">
                            {animeInfo.title_english || animeInfo.title_japanese} ({animeInfo.year})
                        </Typography>

                        <Divider sx={{ my: 2, bgcolor: "grey.700" }} />

                        <Typography variant="body1" paragraph>
                            {animeInfo.synopsis}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="#e1466d"
                                    paddingBottom="10px"
                                >
                                    Details
                                </Typography>
                                <Typography>
                                    <strong>Type:</strong> {animeInfo.type}
                                </Typography>
                                <Typography>
                                    <strong>Episodes:</strong> {animeInfo.episodes}
                                </Typography>
                                <Typography>
                                    <strong>Status:</strong> {animeInfo.status}
                                </Typography>
                                <Typography>
                                    <strong>Duration:</strong> {animeInfo.duration}
                                </Typography>
                                <Typography>
                                    <strong>Source:</strong> {animeInfo.source}
                                </Typography>
                                <Typography>
                                    <strong>Aired:</strong> {animeInfo.aired.string}
                                </Typography>
                                <Typography>
                                    <strong>Broadcast:</strong> {animeInfo.broadcast.day} at{" "}
                                    {animeInfo.broadcast.time} ({animeInfo.broadcast.timezone})
                                </Typography>
                                <Typography>
                                    <strong>Rating:</strong> {animeInfo.rating}
                                </Typography>
                                <Typography>
                                    <strong>Score:</strong> {animeInfo.score} ({animeInfo.scored_by}{" "}
                                    users)
                                </Typography>
                                <Typography>
                                    <strong>Rank:</strong> #{animeInfo.rank}
                                </Typography>
                                <Typography>
                                    <strong>Popularity:</strong> #{animeInfo.popularity}
                                </Typography>
                                <Typography>
                                    <strong>Favorites:</strong> {animeInfo.favorites}
                                </Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="#e1466d"
                                    paddingBottom="10px"
                                >
                                    Genres & Themes
                                </Typography>
                                <Typography>
                                    <strong>Genres:</strong>{" "}
                                    {animeInfo.genres.map((genre: any) => genre.name).join(", ")}
                                </Typography>
                                <Typography>
                                    <strong>Themes:</strong>{" "}
                                    {animeInfo.themes.map((theme: any) => theme.name).join(", ")}
                                </Typography>
                                <Typography>
                                    <strong>Demographics:</strong>{" "}
                                    {animeInfo.demographics
                                        .map((demo: any) => demo.name)
                                        .join(", ")}
                                </Typography>
                            </Box>
                        </Box>

                        {animeInfo.trailer && animeInfo.trailer.embed_url && (
                            <Box sx={{ mt: 2 }}>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={animeInfo.trailer.embed_url.replace("autoplay=1", "")}
                                    title="Anime Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" fontWeight="bold">
                                More Information
                            </Typography>
                            <Link
                                href={animeInfo.url}
                                target="_blank"
                                rel="noopener"
                                color="#e1466d"
                            >
                                View on MyAnimeList
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ActionModal;
