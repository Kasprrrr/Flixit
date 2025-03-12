import React from "react";
import { motion } from "framer-motion";

interface CardProps {
    imageUrl: string;
    name: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, name, onClick}) => {
    return (
        <motion.div
            layout
            className="card"
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
        >
            <img src={imageUrl} alt={name} />
            <div className="card-content">
                <h3>{name}</h3>
            </div>
        </motion.div>
    );
};

export default Card;
