import {
    Search,
    Plus,
    Filter,
    SortAsc,
    Grid,

} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { useSearchParams } from "react-router"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { AdvancedFilters } from "./AdvancedFilters"
import type { NameFilter } from "@/heroes/interfaces/filters.interface"

const namesFilters: NameFilter[] = [
    {
        name: 'Team',
        array: [
            { label: 'Liga de la Justicia', value: 'Liga de la Justicia' },
            { label: 'Vengadores', value: 'Vengadores' },
            { label: 'X-Men', value: 'X-Men' },
            { label: 'Batfamilia', value: 'Batfamilia' },
            { label: 'Jóvenes Titanes', value: 'Jóvenes Titanes' },
            { label: 'Solo', value: 'Solo' },
            { label: 'Suicide Squad', value: 'Suicide Squad' },
        ],
    },
    {
        name: 'Category',
        array: [
            { label: 'Hero', value: 'Hero' },
            { label: 'Villain', value: 'Villain' },
        ],
    },
    {
        name: 'Universe',
        array: [
            { label: 'DC', value: 'DC' },
            { label: 'Marvel', value: 'Marvel' },
        ],
    },
    {
        name: 'Status',
        array: [
            { label: 'Active', value: 'Active' },
            { label: 'Deceased', value: 'Deceased' },
        ],
    },
];

export const SearchControl = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const filters = searchParams.get('filters') ?? '';
    const strength = Number(searchParams.get('strength') ?? '0');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const query = inputRef.current?.value;
            setSearchParams((prev) => {
                prev.set('name', query || '');
                return prev;
            })

        }
    }

    const handleFilterClick = () => {
        setSearchParams((prev) => {
            filters ? prev.delete('filters') : prev.set('filters', 'item-1');
            return prev;
        });

    }

    const handleClearFilters = () => {
        searchParams.delete('strength');
        searchParams.delete('team');
        searchParams.delete('category');
        searchParams.delete('universe');
        searchParams.delete('status');
        setSearchParams(searchParams);
    }

    return (

        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg bg-white"
                        ref={inputRef}
                        onKeyDown={handleSearch}
                        defaultValue={searchParams.get('name') ?? ''}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 flex-col md:flex-row">
                    <Button variant={filters ? "default" : "outline"} className="h-12" onClick={handleFilterClick}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                        <Button variant="outline" className="h-12">
                            <Grid className="h-4 w-4" />
                        </Button>

                        <Button className="h-12">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Character
                        </Button>
                </div>
            </div>

            <Accordion type="single" collapsible value={filters}>
                <AccordionItem value="item-1">
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button variant="ghost" onClick={handleClearFilters}>Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <AdvancedFilters name={namesFilters[0].name} array={namesFilters[0].array} />
                                <AdvancedFilters name={namesFilters[1].name} array={namesFilters[1].array} />
                                <AdvancedFilters name={namesFilters[2].name} array={namesFilters[2].array} />
                                <AdvancedFilters name={namesFilters[3].name} array={namesFilters[3].array} />

                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: 0/10</label>
                                <Slider
                                    defaultValue={[strength]}
                                    onValueChange={value => setSearchParams((prev) => {
                                        prev.set('strength', value[0].toString());
                                        return prev;
                                    })}
                                    max={10}
                                    step={1} />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>



        </>
    )
}
