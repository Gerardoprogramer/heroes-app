import { useQuery } from "@tanstack/react-query"

import type { searchOptions } from "../interfaces/search.interface";
import { searchHeroesAction } from "../actions/search-heroes.action";


export const useSearchHero = ({ name, category, status, strength, team, universe }: searchOptions) => {

    return useQuery({
        queryKey: ['search', { name, category, status, strength, team, universe }],
        queryFn: () => searchHeroesAction({ name, category, status, strength, team, universe }),
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}