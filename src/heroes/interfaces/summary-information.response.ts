import type { Hero } from "./hero.interface";

export interface summaryInformationResponse {
    totalHeroes:   number;
    strongestHero: Hero;
    smartestHero:  Hero;
    heroCount:     number;
    villainCount:  number;
}
