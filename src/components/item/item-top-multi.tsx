import {component$} from '@builder.io/qwik';
import {ItemTooltip} from "~/components/item/item-tooltip";

export interface GearProps {
    gears: Gear[]
    count: number
}

export interface Gear {
    name: string;
    quality: string;
    id: number;
    icon: string;
    itemLevel: string;
    bonusIDs: string[];
    gems?: Gem[];
}

export interface Gem {
    id: string;
    itemLevel: string;
}

export const ItemTopMulti = component$(({gears, count}: GearProps) => {
    return (
        <div class="h-14 p-1.5 flex flex-row border-2 border-large-500 m-1">
            {gears.map(gear => (
                <div class="relative group">
                    <img
                        src={gear.icon}
                        alt="icon"
                        width="36"
                        height="36"
                        className={`cursor-pointer border-2 border-${gear.quality} my-auto mr-2 h-9 w-9`}/>
                    <ItemTooltip tooltip={gear.itemTooltip}/>
                </div>
            ))}
            <div className="ml-auto flex w-32 flex-row items-center">
                <div className="flex-1 text-center text-white">
                    24
                </div>
                <div className="flex-1 text-center text-white">
                    {count}
                </div>
            </div>
        </div>
    )
});
