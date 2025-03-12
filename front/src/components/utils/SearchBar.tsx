import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";

interface SearchBarProps {
    services: Array<string>;
    onSearch: (searchTerm: string) => void;
    onSelect: (selectedService: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ services, onSearch, onSelect }) => {
    return (
        <Autocomplete
            id="service-select"
            className="searchBar"
            options={services}
            autoHighlight
            disableClearable
            inputValue={undefined}
            onInputChange={(event, value) => onSearch(value)}
            onChange={(event, value) => onSelect(value || "")}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
                const { key, ...otherProps } = props;
                return (
                    <Box key={key} {...otherProps} component="li">
                        {option}
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search an anime"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: null,
                        },
                    }}
                    className="inputForm"
                />
            )}
        />
    );
};

export default SearchBar;
