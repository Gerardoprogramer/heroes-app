import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { getHeroByPageAction } from "@/heroes/actions/get-heroes-by-page.action"



export const HomePage = () => {


  const [searchParams, setSearchParams] = useSearchParams();

  const activedTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';

  const selectTab = useMemo(() => {
    const validTab = ['all', 'favorites', 'heroes', 'villains']

    return validTab.includes(activedTab) ? activedTab : 'all'
  }, [activedTab]
  )

  const { data: heroResponse } = useQuery({
    queryKey: ['heroes', { page, limit }],
    queryFn: () => getHeroByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 5,
  })


  return (
    <>
      <>
        <CustomJumbotron
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra tus superheroes y villanos favoritos"
        />
        <CustomBreadcrumb currentPage="Inicio" />
        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all')
                return prev;
              })}
            >All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev;
              })}
              className="flex items-center gap-2">
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes')
                return prev;
              })}
            >Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains')
                return prev;
              })}
            >Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1 className="my-5">All</h1>
            <HeroGrid heros={heroResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites">
            <h1>favorito</h1>
          </TabsContent>

          <TabsContent value="heroes">
            <h1>heroes</h1>
          </TabsContent>

          <TabsContent value="villains">
            <h1>Villanos</h1>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {heroResponse?.pages && (
          <CustomPagination totalPages={heroResponse?.pages} />
        )}

      </>
    </>
  )
}
