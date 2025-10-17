import { heroApi } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

import type { searchOptions } from "../interfaces/search.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async ({name, category, status, strength, team, universe}: searchOptions = {}): Promise<Hero[]> => {

    if(!name && !category && !status && !strength && !team && !universe) {
        return [];
    }

    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            name,
            category,
            status,
            strength,
            team,
            universe
        }
    });
        const heroes = data.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }))

    return heroes
}
