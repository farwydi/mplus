import { component$ } from "@builder.io/qwik";
import { GearCardData } from "~/components/gear/gear";
import GearCardRow from "~/components/gear/gear-card-row";


interface GearCardProps {
    props: GearCardData;
}

export default component$<GearCardProps>(({props: {slotName, rows}}) => {
    return (
        <div className="flex-1 mt-10">
            <div className="flex items-end">
                <h3 className="mb-2.5 text-white text-xl uppercase font-bold">{slotName}</h3>
                <div className="ml-auto w-36 flex">
                    <div className="flex-1 text-white">Max key</div>
                    <div className="flex-1 text-white">Count</div>
                </div>
            </div>
            {rows.map(row => <GearCardRow props={row}/>)}
        </div>
    )
});
