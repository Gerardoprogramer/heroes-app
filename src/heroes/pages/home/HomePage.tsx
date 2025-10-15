import { use, useMemo } from "react"
import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"




export const HomePage = () => {


  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activedTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectTab = useMemo(() => {
    const validTab = ['all', 'favorites', 'heroes', 'villains']

    return validTab.includes(activedTab) ? activedTab : 'all'
  }, [activedTab]
  )

  const { data: heroResponse } = usePaginatedHero({ page, limit, category });

  const { data: summaryInformationResponse } = useHeroSummary();

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
                prev.set('category', 'all')
                return prev;
              })}
            >All Characters ({summaryInformationResponse?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev;
              })}
              className="flex items-center gap-2">
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes')
                prev.set('category', 'hero')
                prev.set('page', '1')
                return prev;
              })}
            >Heroes ({summaryInformationResponse?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains')
                prev.set('category', 'villain')
                prev.set('page', '1')
                return prev;
              })}
            >Villains ({summaryInformationResponse?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1 className="my-5">All</h1>
            <HeroGrid heros={heroResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites">
            <HeroGrid heros={favorites} />
          </TabsContent>

          <TabsContent value="heroes">
            <HeroGrid heros={heroResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="villains">
            <HeroGrid heros={heroResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {heroResponse?.pages && selectTab !== 'favorites' && (
          <CustomPagination totalPages={heroResponse?.pages} />
        )}

      </>
    </>
  )
}
