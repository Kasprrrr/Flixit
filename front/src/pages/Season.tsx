import React, { useState } from "react";
import SearchBar from "../components/utils/SearchBar";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";

const Season: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();
    const { type } = useParams();

    const seasons = [
        {
            name: "Season1",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg",
        },
        {
            name: "Season2",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg",
        },
        {
            name: "Season3",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg",
        },
    ];

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSelect = (selectedService: string) => {
        navigate(`/user/catalog/${type}/${selectedService.toLowerCase()}`);
    };

    const filteredSeason = seasons.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="homeTemplate">
            <h1 className="homeTitle">
                {type ? type[0].toUpperCase() + type.slice(1) : "Error"}
                <span className="homeTitle-dot">.</span>
            </h1>
            <SearchBar
                services={seasons.map((service) => service.name)}
                onSearch={handleSearch}
                onSelect={handleSelect}
            />

            <div className="cardContainer">
                {filteredSeason.map((service, index) => (
                    <Card
                        key={index}
                        imageUrl={service.imageUrl}
                        name={service.name}
                        onClick={() => handleSelect(service.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Season;
