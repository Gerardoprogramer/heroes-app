import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../interfaces/hero.interface";

interface FavoriteHeroContextType {
    favorites: Hero[];
    favoriteCount: number;
    toggleFavorite: (hero: Hero) => void;
    isHeroFavorite: (hero: Hero) => boolean;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContextType);

const getFavoriteFromStorage = (): Hero[] => {
    try {
        const favs = localStorage.getItem("favs");
        if (!favs) return [];
        const parsed = JSON.parse(favs);

        return Array.isArray(parsed)
            ? parsed.filter((fav): fav is Hero => !!fav && !!fav.id)
            : [];
    } catch {
        localStorage.removeItem("favs");
        return [];
    }
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoriteFromStorage());

    const toggleFavorite = (hero: Hero) => {
        const isFavorite = favorites.some(fav => fav.id === hero.id);

        if (isFavorite) {
            setFavorites(prev => prev.filter(fav => fav.id !== hero.id));
            return;
        }
        setFavorites(prev => [...prev, hero]);
    }

    const isHeroFavorite = (hero: Hero) => {
        if (!hero) return false;

        return favorites.some((fav) => fav.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext
            value={{
                favorites: favorites,
                favoriteCount: favorites.length,
                isHeroFavorite: isHeroFavorite,
                toggleFavorite: toggleFavorite
            }}>
            {children}
        </FavoriteHeroContext>
    )
}
