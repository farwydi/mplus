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

    return (
        <>
            <GearTooltip props={gear}/>
            <div className="flex flex-col">
                <p className="text-base text-white text-clip truncate w-56">{name.ru_ru}</p>
                <p className="text-xs font-bold text-white">{`${minItemLevel}-${maxItemLevel}`}</p>
            </div>
        </>
    )
});

interface GearCardRowProps {
    props: GearCardRowData;
}

export default component$<GearCardRowProps>(({props: {items, count}}) => {
    return (
        <div className="h-14 p-1.5 flex flex-row border-2 border-large-500 m-1">
            <GearCardResolver props={items}/>
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
