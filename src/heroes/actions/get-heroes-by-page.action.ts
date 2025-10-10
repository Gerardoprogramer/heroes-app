import { heroApi } from "../api/hero.api"
import type { HeroResponse } from "../interfaces/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroByPageAction = async (): Promise<HeroResponse> => {

    const { data } = await heroApi.get<HeroResponse>(`/`);

    const heroes = data.heroes.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }))

    return {
        ...data,
        heroes: heroes
    }
};