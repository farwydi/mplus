import { component$ } from "@builder.io/qwik";
import { Gear, GearCardRowData } from "~/components/gear/gear";
import GearTooltip from "~/components/gear/gear-tooltip";


interface GearCardResolverProps {
    props: Gear;
}

export const GearCardResolver = component$<GearCardResolverProps>(({props}) => {
    let gear = props;

    if (Array.isArray(gear)) {
        if (gear.length == 0) {
            return (<div>empty</div>)
        }

        if (gear.length > 1) {
            return <>{gear.map(tooltip => <GearTooltip props={tooltip}/>)}</>
        }

        gear = gear[0]
    }

    const {name, minItemLevel, maxItemLevel} = gear

    const itemLevel = (minItemLevel == maxItemLevel) ? maxItemLevel : `${minItemLevel}-${maxItemLevel}`

    return (
        <>
            <GearTooltip props={gear}/>
            <div className="flex flex-col">
                <p className="text-base text-clip truncate w-56">{name.ru_ru}</p>
                <p className="text-xs font-bold">{itemLevel}</p>
            </div>
        </>
    )
});

export const SkeletonRow = component$(() => {
    return (
        <div
            className="h-14 p-1.5 flex flex-row border-2 border-large-500 m-1 items-center">
            <div className="mr-1.5">
                <div className="w-9 h-9 bg-large-500"></div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="h-2.5 bg-large-300 rounded-full mb-2.5 w-36"></div>
                <div className="h-2 bg-large-200 rounded-full w-10"></div>
            </div>
            <div className="ml-auto flex w-32 flex-row items-center">
                <div className="flex-1">
                    <div className="h-2 bg-large-200 rounded-full w-8"></div>
                </div>
                <div className="flex-1">
                    <div className="h-2 bg-large-200 rounded-full w-8"></div>
                </div>
            </div>
        </div>
    )
});

interface GearCardRowProps {
    props: GearCardRowData;
}

export default component$<GearCardRowProps>(({props: {items, count, maxKeyLevel}}) => {
    return (
        <div className="h-14 p-1.5 flex flex-row border-2 border-large-500 m-1">
            <GearCardResolver props={items}/>
            <div className="ml-auto flex w-32 flex-row items-center">
                <div className="flex-1 text-center">
                    {maxKeyLevel}
                </div>
                <div className="flex-1 text-center">
                    {count}
                </div>
            </div>
        </div>
    )
});
