import { useState } from "react"
import { useQuery } from "@tanstack/react-query"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { getHeroByPageAction } from "@/heroes/actions/get-heroes-by-page.action"


export const HomePage = () => {

  const [active, setActive] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');

const {data} = useQuery({
  queryKey: ['heroes'],
  queryFn: () => getHeroByPageAction(),
  staleTime: 1000 * 60 * 5,
})

console.log(data)

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
        <Tabs value={active} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActive('all')}>All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setActive('favorites')} className="flex items-center gap-2">
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActive('heroes')}>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setActive('villains')}>Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>All</h1>
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

        {/* Character Grid */}
        <HeroGrid />

        {/* Pagination */}
        <CustomPagination totalPages={5} />
      </>
    </>
  )
}
