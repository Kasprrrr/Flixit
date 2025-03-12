import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img
                src="https://steamuserimages-a.akamaihd.net/ugc/1788470336064956016/AA0CFAB0E1F05BA470F86B21AB099B5B56B8962A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                alt="HomeBg"
                className="imageLarge"
            />

            <div className="linearOverlay" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="textContainer"
            >
                <h1 className="mainTitle">
                    <span className="titleSegment" onClick={() => navigate("/user/catalog")}>
                        Watch
                    </span>
                    <span className="titleDot">. </span>
                    <span className="titleSegment" onClick={() => navigate("/user/game")}>
                        Play
                    </span>
                    <span className="titleDot">. </span>
                    <span>Immerse</span>
                    <span className="titleDot">. </span>
                </h1>

                <h3 className="subTitle">Your Ultimate Anime & Manga Experience</h3>
            </motion.div>
        </div>
    );
};

export default Home;
