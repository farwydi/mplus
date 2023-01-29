import { Resource, component$ } from '@builder.io/qwik';
import { RouteParams, StaticGenerateHandler, useEndpoint } from "@builder.io/qwik-city";
import type { RequestHandler } from '@builder.io/qwik-city';
import GearCard from "~/components/gear/gear-card";
import { GearCardData } from "~/components/gear/gear";
import { meta } from "~/dataset/meta";

interface PageData {
    className: string;
    specName: string;
    bestCombineGear: GearCardData[];
    bestInSlotGear: GearCardData[];
}

export const onGet: RequestHandler<PageData> = async ({params}) => {
    const {combine} = await import('~/dataset/combine')
    const {topGear} = await import('~/dataset/top-gear')

    const baseQuery = {
        className: params.className,
        specName: params.specName,
    }

    return {
        ...baseQuery,
        bestCombineGear: await Promise.all([
            combine({
                ...baseQuery,
                slot: "TRINKET",
            }),
            combine({
                ...baseQuery,
                slot: "WEAPON",
            }),
            combine({
                ...baseQuery,
                slot: "FINGER",
            }),
        ]),
        bestInSlotGear: await Promise.all([
            topGear({
                ...baseQuery,
                slot: "HEAD",
            }),
            topGear({
                ...baseQuery,
                slot: "NECK",
            }),
            topGear({
                ...baseQuery,
                slot: "SHOULDER",
            }),
            topGear({
                ...baseQuery,
                slot: "CHEST",
            }),
            topGear({
                ...baseQuery,
                slot: "WAIST",
            }),
            topGear({
                ...baseQuery,
                slot: "LEGS",
            }),
            topGear({
                ...baseQuery,
                slot: "FEET",
            }),
            topGear({
                ...baseQuery,
                slot: "WRIST",
            }),
            topGear({
                ...baseQuery,
                slot: "HAND",
            }),
            topGear({
                ...baseQuery,
                slot: "CLOAK",
            }),
        ]),
    }
};

interface Meta extends RouteParams {
    className: string
    specName: string
    encounterId: string
}

export const onStaticGenerate: StaticGenerateHandler = () => {
    return {
        params: Object
            .entries(meta)
            .map(([className, specs]): Meta[] => {
                return specs.map(specName => {
                    return {
                        className: className.toLowerCase(),
                        specName: specName.toLowerCase(),
                        encounterId: "0",
                    }
                })
            })
            .reduce((previousValue, currentValue) => {
                return [...previousValue, ...currentValue]
            }, [] as Meta[]),
    };
};

interface PageProp {
    props: PageData;
}

export const Page = component$(({props: {bestCombineGear, bestInSlotGear}}: PageProp) => {
    console.log(bestCombineGear, bestInSlotGear[0].rows)
    return (
        <div class="container mx-auto">
            <h2 class="text-white">Combine</h2>
            <div class="grid grid-cols-3">
                {bestCombineGear.map(card => <GearCard props={card}/>)}
            </div>

            <h2 className="text-white">Best in slot</h2>
            <div className="grid grid-cols-3">
                {bestInSlotGear.map(card => <GearCard props={card}/>)}
            </div>
        </div>
    )
})

export default component$(() => {
    const pageDataResource = useEndpoint<PageData>();

    return (
        <Resource
            value={pageDataResource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Error</div>}
            onResolved={(pageData) => <Page props={pageData}/>}
        />
    )
});
