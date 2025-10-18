import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { useSearchHero } from "@/heroes/hooks/useSearchHero"
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";


export const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? '';
  const strength = searchParams.get('strength') ?? '';
  const team = searchParams.get('team') ?? '';
  const category = searchParams.get('category') ?? '';
  const universe = searchParams.get('universe') ?? '';
  const status = searchParams.get('status') ?? '';

  const { data: heroesSearch } = useSearchHero({ name, strength, team, category, universe, status });

  return (
    <>
      <CustomJumbotron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra tus superheroes y villanos favoritos"
      />

      <CustomBreadcrumb currentPage="Buscador de héroes"/>

      <HeroStats />

      <SearchControl />

      <HeroGrid heros={heroesSearch ?? []} />
    </>
  )
}

export default SearchPage;