import { useQuery } from "react-query";
import { reqService } from "../services/request.service";

const bearer = localStorage.getItem("accessToken") || "";
const email = localStorage.getItem("email") || "";

export const useGetAnimes = () => {
    return useQuery<string[], Error>(
        "getAnimes",
        async () => {
            const res = await reqService.getReq(`/anime/get/all`, "");
            return res.data;
        },
        {
            onError: (error) => {
                console.error("Error fetching all animes:", error);
            },
        },
    );
};

export const useGetAnime = (title: string) => {
    return useQuery(
        "getAnime",
        async () => {
            const res = await reqService.getReq(`/anime/get/${title}`, "");
            return res.data;
        },
        {
            onError: (error) => {
                console.error("Error fetching all seasons:", error);
            },
        },
    );
};

export const useGetSeason = (title: string, seasonTitle: string) => {
    return useQuery(
        "getSeason",
        async () => {
            const res = await reqService.getReq(`/anime/get/${title}/season/${seasonTitle}`, "");
            return res.data;
        },
        {
            onError: (error) => {
                console.error("Error fetching all animes:", error);
            },
        },
    );
};

export const useCustomerProfile = () => {
    return useQuery<string[], Error>(
        "customerProfile",
        async () => {
            if (!bearer) throw new Error("No access token");
            const res = await reqService.getReq(`/users/get/${email}`, bearer);
            return Object.values(res.data) as string[];
        },
        {
            onError: (error) => {
                console.error("Error fetching customer profile:", error);
            },
        },
    );
};
