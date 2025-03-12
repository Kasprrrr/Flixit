import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <img
                src={
                    "https://steamuserimages-a.akamaihd.net/ugc/1788470336064956016/AA0CFAB0E1F05BA470F86B21AB099B5B56B8962A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
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
                    width: "80%",
                }}
                className="text"
            >
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    paddingBottom="5vh"
                    display="inline"
                >
                    <Typography
                        className="hoverText"
                        variant="h3"
                        component="span"
                        fontWeight="bold"
                        display="inline"
                        onClick={() => navigate("/user/catalog")}
                    >
                        Watch
                    </Typography>
                    <span className="title-dot">. </span>
                    <Typography
                        className="hoverText"
                        variant="h3"
                        component="span"
                        fontWeight="bold"
                        display="inline"
                        onClick={() => navigate("/user/game")}
                    >
                        Play
                    </Typography>
                    <span className="title-dot">. </span>
                    <Typography variant="h3" component="span" fontWeight="bold" display="inline">
                        Immerse
                    </Typography>
                    <span className="title-dot">. </span>
                </Typography>

                <Typography variant="h5" component="h1" paddingBottom="10vh" color="#e1466d">
                    Your Ultimate Anime & Manga Experience
                </Typography>
            </motion.div>
        </div>
    );
};

export default Home;
