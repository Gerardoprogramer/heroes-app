import { useQuery } from "@tanstack/react-query"
import { getHeroByPageAction } from "../actions/get-heroes-by-page.action"

interface Props{
    page: string,
    limit: string
}

export const usePaginatedHero = ({page, limit}: Props) => {

    return useQuery({
        queryKey: ['heroes', { page, limit }],
        queryFn: () => getHeroByPageAction(+page, +limit),
        staleTime: 1000 * 60 * 5,
    })
}
