import { component$ } from "@builder.io/qwik";
import { GearTooltipData } from "~/components/gear/gear";

interface TooltipProps {
    props: GearTooltipData;
}

export const Tooltip = component$<TooltipProps>(({props}) => {
    const {name, minItemLevel, maxItemLevel, hasSet, isCraft} = props
    const itemLevel = (minItemLevel == maxItemLevel) ? maxItemLevel : `${minItemLevel}-${maxItemLevel}`
    const color = (isCraft) ? 'artifact' : (hasSet) ? 'uncommon' : 'epic';

    return (
        <div
            className="group-hover:scale-100 scale-0 min-w-[270px] text-sm z-10 absolute p-2 flex flex-col text-white border-2 border-large-500 bg-huge-500 whitespace-nowrap">
            <p className={`text-base text-${color}`}>{name.ru_ru}</p>
            <p>{itemLevel}</p>
        </div>
    )
});


interface GearTooltipProps {
    props: GearTooltipData;
}

export default component$<GearTooltipProps>(({props}) => {
    const {itemId, icon, hasSet, isCraft} = props

    const color = (isCraft) ? 'artifact' : (hasSet) ? 'uncommon' : 'epic';

    return (
        <div className="relative group mr-1.5">
            <a href={`https://www.wowhead.com/item=${itemId}`} target="_blank">
                <img
                    src={icon}
                    alt="icon"
                    width="36"
                    height="36"
                    className={`cursor-pointer border-2 border-${color} my-auto mr-2 h-9 w-9`}/>
            </a>
            <Tooltip props={props}/>
        </div>
    )
});
