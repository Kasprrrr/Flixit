import { useQuery } from "react-query";
import axios from "axios";

export const useAnimeInfo = (url: string) => {
    return useQuery(
        [`animeInfo`],
        async () => {
            const res = await axios.get(url);
            return res.data;
        },
        {
            onError: (error) => {
                console.error("Error fetching anime info:", error);
            },
        },
    );
};
