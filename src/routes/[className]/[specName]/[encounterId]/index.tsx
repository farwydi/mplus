import { Resource, component$ } from '@builder.io/qwik';
import { RouteParams, StaticGenerateHandler, useEndpoint } from "@builder.io/qwik-city";
import type { RequestHandler } from '@builder.io/qwik-city';
import GearCard from "~/components/gear/gear-card";
import { GearCardData } from "~/components/gear/gear";

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
        bestCombineGear: [
            await combine({
                ...baseQuery,
                slot: "TRINKET",
            }),
            await combine({
                ...baseQuery,
                slot: "WEAPON",
            }),
            await combine({
                ...baseQuery,
                slot: "FINGER",
            }),
        ],
        bestInSlotGear: [
            await topGear({
                ...baseQuery,
                slot: "HEAD",
            }),
            await topGear({
                ...baseQuery,
                slot: "NECK",
            }),
            await topGear({
                ...baseQuery,
                slot: "SHOULDER",
            }),
            await topGear({
                ...baseQuery,
                slot: "CHEST",
            }),
            await topGear({
                ...baseQuery,
                slot: "WAIST",
            }),
            await topGear({
                ...baseQuery,
                slot: "LEGS",
            }),
            await topGear({
                ...baseQuery,
                slot: "FEET",
            }),
            await topGear({
                ...baseQuery,
                slot: "WRIST",
            }),
            await topGear({
                ...baseQuery,
                slot: "HAND",
            }),
            await topGear({
                ...baseQuery,
                slot: "CLOAK",
            }),
        ],
    }
};

interface Meta {
    className: string
    specName: string
    encounterId: number
}

export const onStaticGenerate: StaticGenerateHandler = () => {
    const meta = {
        "WARRIOR": [
            "ARMS",
            "FURY",
            "PROTECTION",
        ],
        // "PALADIN": [
        //     "HOLY",
        //     "PROTECTION",
        //     "RETRIBUTION",
        // ],
        // "HUNTER": [
        //     "BEAST_MASTERY",
        //     "MARKSMANSHIP",
        //     "SURVIVAL",
        // ],
        // "ROGUE": [
        //     "ASSASSINATION",
        //     "OUTLAW",
        //     "SUBTLETY",
        // ],
        // "PRIEST": [
        //     "DISCIPLINE",
        //     "HOLY",
        //     "SHADOW",
        // ],
        // "DEATH": [
        //     "KNIGHT_BLOOD",
        //     "KNIGHT_FROST",
        //     "KNIGHT_UNHOLY",
        // ],
        // "SHAMAN": [
        //     "ELEMENTAL",
        //     "ENHANCEMENT",
        //     "RESTORATION",
        // ],
        // "MAGE": [
        //     "ARCANE",
        //     "FIRE",
        //     "FROST",
        // ],
        // "WARLOCK": [
        //     "AFFLICTION",
        //     "DEMONOLOGY",
        //     "DESTRUCTION",
        // ],
        // "MONK": [
        //     "BREWMASTER",
        //     "MISTWEAVER",
        //     "WINDWALKER",
        // ],
        // "DRUID": [
        //     "BALANCE",
        //     "FERAL",
        //     "GUARDIAN",
        //     "RESTORATION",
        // ],
        // "DEMON": [
        //     "HUNTER_HAVOC",
        //     "HUNTER_VENGEANCE",
        // ],
        // "EVOKER": [
        //     "DEVASTATION",
        //     "PRESERVATION",
        // ],
    }
    return {
        params: Object
            .entries(meta)
            .map(([className, specs]): Meta[] => {
                return specs.map(specName => {
                    return {
                        className: className.toLowerCase(),
                        specName: specName.toLowerCase(),
                        encounterId: 0,
                    }
                })
            })
            .reduce((previousValue, currentValue) => {
                return [...previousValue, ...currentValue]
            }, [] as RouteParams[]),
    };
};

interface PageProp {
    props: PageData;
}

export const Page = component$(({props: {bestCombineGear, bestInSlotGear}}: PageProp) => {
    console.log(bestCombineGear)
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
