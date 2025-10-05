import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra tus superheroes y villanos favoritos"
      />

      <CustomBreadcrumb currentPage="Buscador de héroes"
      // breadcrumbs={[
      //   { label: 'home', to: '/' },
      //   { label: 'home', to: '/' },
      //   { label: 'home', to: '/' },
      // ]}
      />

      <HeroStats />

      <SearchControl />
    </>
  )
}

export default SearchPage;