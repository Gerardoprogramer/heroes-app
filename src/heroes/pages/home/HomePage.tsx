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

        <div className="sm:hidden mb-4">
          <select
            value={selectTab}
            onChange={(e) => {
              const v = e.target.value;
              selectTab;
              setSearchParams((prev) => {
                prev.set('tab', v);
                if (v === 'heroes') { prev.set('category', 'hero'); prev.set('page', '1'); }
                if (v === 'villains') { prev.set('category', 'villain'); prev.set('page', '1'); }
                if (v === 'all') { prev.set('category', 'all'); }
                return prev;
              });
            }}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="all">All Characters ({summaryInformationResponse?.totalHeroes})</option>
            <option value="favorites">Favorites ({favoriteCount})</option>
            <option value="heroes">Heroes ({summaryInformationResponse?.heroCount})</option>
            <option value="villains">Villains ({summaryInformationResponse?.villainCount})</option>
          </select>
        </div>

        <Tabs value={selectTab} className="mb-8">
          <div className="hidden sm:block">
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
          </div>

          <TabsContent value="all">
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
