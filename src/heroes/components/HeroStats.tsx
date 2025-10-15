import { Badge } from "@/components/ui/badge"
import {
    Heart,
    Users,
    Zap,
    Trophy
} from "lucide-react"
import { HeroStatCard } from "./HeroStatCard"
import { useHeroSummary } from "../hooks/useHeroSummary"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"
import { use } from "react"


export const HeroStats = () => {

    const { data: summaryInformationResponse } = useHeroSummary();

    const { favoriteCount } = use(FavoriteHeroContext);

    const totalPorcent = summaryInformationResponse ? favoriteCount / summaryInformationResponse?.totalHeroes * 100 : 0;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <HeroStatCard
                title="Total de Personajes"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold">{summaryInformationResponse?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summaryInformationResponse?.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summaryInformationResponse?.villainCount} Villains
                    </Badge>
                </div>
            </HeroStatCard>

            <HeroStatCard
                title="Favoritos"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
                <p className="text-xs text-muted-foreground">{totalPorcent.toFixed(0)}% of total</p>
            </HeroStatCard>

            <HeroStatCard
                title="Fuerte"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summaryInformationResponse?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summaryInformationResponse?.strongestHero.strength}/10</p>
            </HeroStatCard>

            <HeroStatCard
                title="Inteligente"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summaryInformationResponse?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summaryInformationResponse?.smartestHero.intelligence}/10</p>
            </HeroStatCard>
        </div>
    )
}
