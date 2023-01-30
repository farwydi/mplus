import { Resource, component$, Slot } from '@builder.io/qwik';
import { Link, RouteParams, StaticGenerateHandler, useEndpoint, useLocation } from "@builder.io/qwik-city";
import type { RequestHandler } from '@builder.io/qwik-city';
import GearCard, { SkeletonCard } from "~/components/gear/gear-card";
import { GearCardData } from "~/components/gear/gear";
import { dungeons, dungeonsIds, medals, shortDungeons, specs } from "~/dataset/meta";

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
        medal: params.medal,
        encounterId: params.encounterId,
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
            .entries(specs)
            .map(([className, specs]): Meta[][][] => {
                return specs.map(specName => {
                    return dungeonsIds.map(encounterId => {
                        return medals.map(medal => {
                            return {
                                className,
                                specName,
                                encounterId,
                                medal,
                            }
                        })
                    })
                })
            })
            .flat(3)
    };
};

interface PageLinkData {
    encounterId: string;
    medal: string;
}

interface PageLinkProp {
    props: PageLinkData;
}

export const PageLink = component$<PageLinkProp>(({props: {encounterId, medal}}) => {
    const {params} = useLocation()

    if (encounterId == params.encounterId) {
        if (medal == params.medal) {
            return <div class="font-bold text-xl p-3"><Slot/></div>
        }
    }

    return <Link
        href={`/${params.className}/${params.specName}/${encounterId}/${medal}/`}
        class="hover:text-epic underline text-xl p-3"><Slot/></Link>
});

export const Dungeons = component$(() => {
    const {params} = useLocation()

    return <div class="flex justify-center">
        <PageLink props={{encounterId: "0", medal: params.medal}}>ALL</PageLink>
        {Object
            .entries(dungeons)
            .map(([, id]) => <PageLink
                    props={{encounterId: id.toString(), medal: params.medal}}>
                    {shortDungeons.get(id)}
                </PageLink>
            )}
    </div>
});

export const Medal = component$(() => {
    const {params} = useLocation()

    return <div class="flex justify-end">
        {medals.map(medal => <PageLink
                props={{encounterId: params.encounterId, medal}}>
                {medal}
            </PageLink>
        )}
    </div>
});

export const Legend = component$(() => {
    return <>
        <p className="mb-1">Legend:</p>
        <div className="flex items-center">
            <div className="w-5 mx-4 border-2 border-uncommon"></div>
            <p>Set items</p>
            <div className="w-5 mx-4 border-2 border-artifact"></div>
            <p>Craft items</p>
            <div className="w-5 mx-4 border-2 border-epic"></div>
            <p>Other items</p>
        </div>
    </>
});

interface PageProp {
    props: PageData;
}

export const Page = component$<PageProp>(({props: {className, specName, bestCombineGear, bestInSlotGear}}) => {
    return (
        <div class="container mx-auto mt-4">
            <div className="h-32">
                <h2 class="text-5xl mb-2">{className}</h2>
                <h3 class="text-4xl mb-6">{specName}</h3>
            </div>

            <Dungeons/>

            <Medal/>

            <Legend/>

            <h3 class="text-3xl my-6">Bast Combine</h3>
            <div class="grid grid-cols-3">
                {bestCombineGear.map(card => <GearCard props={card}/>)}
            </div>

            <h3 className="text-3xl my-6">Best in slot</h3>
            <div className="grid grid-cols-3">
                {bestInSlotGear.map(card => <GearCard props={card}/>)}
            </div>
        </div>
    )
})

export const PageLoading = component$(() => {
    return (
        <div class="container mx-auto mt-4">
            <div class="h-32">
                <div className="h-12 bg-large-700 rounded-full mb-2.5 w-[270px] mb-2"></div>
                <div className="h-8 bg-large-500 rounded-full mb-2.5 w-[160px] mb-6"></div>
            </div>

            <Dungeons/>

            <Medal/>

            <Legend/>

            <h3 class="text-3xl my-6">Bast Combine</h3>
            <div class="grid grid-cols-3">
                {[1, 2, 3].map(() => <SkeletonCard/>)}
            </div>

            <h3 class="text-3xl my-6">Best in slot</h3>
            <div class="grid grid-cols-3">
                {[1, 2, 3].map(() => <SkeletonCard/>)}
            </div>
        </div>
    )
})


export default component$(() => {
    const pageDataResource = useEndpoint<PageData>();

    return (
        <Resource
            value={pageDataResource}
            onPending={() => <PageLoading/>}
            onRejected={() => <div>Error</div>}
            onResolved={(pageData) => <Page props={pageData}/>}
        />
    )
});
