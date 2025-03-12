import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Catalog from "../pages/Catalog";
//import Season from "../pages/Season";
import Anime from "../pages/Anime";
import Player from "../pages/Player";
import Media from "../pages/Media";
import Game from "../pages/Game";

const UserRouter: FC = () => {
    return (
        <Routes>
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:type" element={<Anime />} />
            <Route path="/catalog/:type/:service" element={<Player />} />
            <Route path="media" element={<Media />} />
            <Route path="game" element={<Game />} />
        </Routes>
    );
};

export default UserRouter;
