import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NameFilter } from "@/heroes/interfaces/filters.interface"
import { useSearchParams } from "react-router";


export const AdvancedFilters = ({ name, array }: NameFilter) => {
    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const value = searchParams.get(name.toLowerCase()) || '';

    return (
        <div className="space-y-2 z-20">
            <label className="text-sm font-medium">{name}</label>
            <div className="py-2 text-sm">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? array.find((option) => option.value === value)?.label
                                : `Select ${name.toLowerCase()}...`}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder={`Search ${name.toLowerCase()}...`} className="h-9" />
                            <CommandList>
                                <CommandEmpty>No {name.toLowerCase()} found.</CommandEmpty>
                                <CommandGroup>
                                    {array.map((itemSelect) => (
                                        <CommandItem
                                            key={itemSelect.value}
                                            value={itemSelect.value}
                                            onSelect={(currentValue) => {
                                                setSearchParams((prevParams) => {
                                                    prevParams.set(name.toLowerCase(), currentValue)
                                                    return prevParams
                                                })

                                                setOpen(false)
                                            }}
                                        >
                                            {itemSelect.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === itemSelect.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
