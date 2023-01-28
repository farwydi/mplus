import {component$} from '@builder.io/qwik';

export interface GearProps {
    tooltip: any
}

export interface Tooltip {
    name: string;
    quality: string;
}

//{/*group-hover:scale-100 scale-0 */}
export const ItemTooltip = component$(({tooltip}: GearProps) => {
    return (
        <div
            class="group-hover:scale-100 scale-0 min-w-[270px] text-sm z-10 absolute p-2 flex flex-col text-white border-2 border-large-500 bg-huge-500 whitespace-nowrap">
            <div class={`text-base text-${tooltip.quality.toLowerCase()}`}>{tooltip.name}</div>
            <div class="text-itemLevel">{tooltip.level}</div>
            {tooltip.upgrade !== undefined && (<div className="text-itemLevel">{tooltip.upgrade}</div>)}
            <div>{tooltip.binding}</div>
            <div class="items-stretch flex flex-row">
                <div>{tooltip.inventoryType}</div>
                <div class="ml-auto">{tooltip.itemSubclass}</div>
            </div>
            {tooltip.weapon !== undefined && (<WeaponTooltip tooltip={tooltip.weapon}/>)}
            {tooltip.stats !== null && tooltip.stats.map(stat => (<StatTooltip tooltip={stat}/>))}
            {/*<div>armor {tooltip.armor}</div>*/}
            {/*<div>stats {tooltip.stats}</div>*/}
            {/*<div>set {tooltip.set}</div>*/}
            <div>{tooltip.durability}</div>
            <div>{tooltip.requirements}</div>
            {/*<div>{tooltip.sellPrice}</div>*/}
        </div>
    )
});

export const StatTooltip = component$(({tooltip}: GearProps) => {
    return (
        <div style={`color: ${tooltip.color}`}>{tooltip.displayText}</div>
    )
});

export const WeaponTooltip = component$(({tooltip}: GearProps) => {
    return (
        <>
            <div className="flex flex-row">
                <div>{tooltip.damage}</div>
                <div class="ml-auto">{tooltip.attackSpeed}</div>
            </div>
            <div>{tooltip.dps}</div>
        </>
    )
});