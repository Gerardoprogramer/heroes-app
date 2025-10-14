import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero"


export const useHeroInformation = (idSlug: string) => {

    return useQuery({
        queryKey: ['hero-information', idSlug],
        queryFn: () => getHeroAction(idSlug),
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}
