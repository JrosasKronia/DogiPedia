import { useState, useEffect } from "react";
import { dogApiService } from "../services/dogService";
import type { DogApiResponse } from "../types";


export const useDogs = () => {
    const [mainDog, setMainDog] = useState<DogApiResponse>({ image: "", breed: "" });
    const [thumbnails, setThumbnails] = useState<DogApiResponse[]>([]);
    const [favorites, setFavorites] = useState<DogApiResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        loadDogs();
    }, []);

    const loadDogs = async () => {
        setLoading(true);
        try {
            const [main, thumbs] = await Promise.all([
                dogApiService.getRadomDog(),
                dogApiService.getRandomDogs(10),
            ]);
            setMainDog(main);
            setThumbnails(thumbs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const loadThumbnails = async () => {
        const thumbs = await dogApiService.getRandomDogs(10);
        setThumbnails(thumbs);
    }

    const handleThumbnailClick = (dog: DogApiResponse) => {
        setMainDog(dog);

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

    };

    const addToFavorites = () => {
        if (!mainDog) return;

        const isDuplicate = favorites.some(fav => fav.image === mainDog.image);
        if (isDuplicate) return;

        const newFavorite: DogApiResponse = {
            ...mainDog,
        };

        setFavorites(prev => [...prev, newFavorite]);
    };

    const removeFromFavorites = (id: string) => {
        setFavorites(prev => prev.filter(fav => fav.image !== id));
    };

    const isFavorited = mainDog && favorites.some(fav => fav.image === mainDog.image);

    const refreshDogs = async () => {
        setIsRefreshing(true);
        await loadThumbnails();
        setIsRefreshing(false);
    };

    return {
        mainDog,
        setMainDog,
        thumbnails,
        favorites,
        loading,
        handleThumbnailClick,
        addToFavorites,
        removeFromFavorites,
        refreshDogs,
        isFavorited,
        isRefreshing
    };
}