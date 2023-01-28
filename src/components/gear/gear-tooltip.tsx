import { component$ } from "@builder.io/qwik";
import { GearTooltipData } from "~/components/gear/gear";

interface TooltipProps {
    props: GearTooltipData;
}

export const Tooltip = component$<TooltipProps>(({props: {name}}) => {
    return (
        <div
            className="group-hover:scale-100 scale-0 min-w-[270px] text-sm z-10 absolute p-2 flex flex-col text-white border-2 border-large-500 bg-huge-500 whitespace-nowrap">
            <div className={`text-base text-epic`}>{name.ru_ru}</div>
        </div>
    )
});


interface GearTooltipProps {
    props: GearTooltipData;
}

export default component$<GearTooltipProps>(({props}) => {
    const {icon} = props

    return (
        <div className="relative group mr-1.5">
            <img
                src={icon}
                alt="icon"
                width="36"
                height="36"
                className={`cursor-pointer border-2 border-epic my-auto mr-2 h-9 w-9`}/>
            <Tooltip props={props}/>
        </div>
    )
});
