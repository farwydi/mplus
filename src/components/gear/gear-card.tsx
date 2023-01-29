import { component$ } from "@builder.io/qwik";
import { GearCardData } from "~/components/gear/gear";
import GearCardRow from "~/components/gear/gear-card-row";


interface GearCardProps {
    props: GearCardData;
}

export default component$<GearCardProps>(({props: {slotName, rows}}) => {
    if (rows.length == 0) {
        return <div className="flex-1 mt-10">
            <div className="flex items-end">
                <h3 className="mb-2.5 text-xl uppercase font-bold">{slotName}</h3>
            </div>
            {[1, 2, 3, 4, 5].map(() => <div
                    class="h-14 border-2 border-large-500 m-1 flex justify-center items-center">
                    <p class="text-center">No data</p>
                </div>
            )}
        </div>
    }

    return <div className="flex-1 mt-10">
        <div className="flex items-end">
            <h3 className="mb-2.5 text-xl uppercase font-bold">{slotName}</h3>
            <div className="ml-auto w-36 flex">
                <div className="flex-1">Max key</div>
                <div className="flex-1">Count</div>
            </div>
        </div>
        {rows.map(row => <GearCardRow props={row}/>)}
    </div>
});
