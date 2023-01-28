import { MongoClient } from 'mongodb';
import { GearCardData, GearCardRowData } from "~/components/gear/gear";

const uri =
    process.env.MONGO_DB || '';

interface CombineParam {
    className: string
    specName: string
    slot: string
}

export const combine = async ({className, specName, slot}: CombineParam): Promise<GearCardData> => {
    if (uri === '') {
        console.error("empty mongo uri");
    }

    const client = new MongoClient(uri);

    const connect = await client.connect()

    try {
        const database = connect.db('admin');
        const gears = database.collection('gears');

        const match = {
            className: className.toUpperCase(),
            specName: specName.toUpperCase(),
            slot: slot.toUpperCase(),
        }

        console.log("load for", match);

        return {
            slotName: slot,
            rows: await gears.aggregate<GearCardRowData>([
                {
                    $match: match,
                },
                {
                    $sort: {id: -1},
                },
                {
                    $group: {
                        _id: {
                            className: "$className",
                            specName: "$specName",
                            slot: "$slot",
                            ranking: "$ranking",
                        },
                        combine: {$push: "$id"},
                        items: {
                            $push: {
                                id: "$id",
                                itemLevel: "$itemLevel",
                                name: "$name",
                                icon: "$icon",
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            className: "$_id.className",
                            specName: "$_id.specName",
                            slot: "$_id.slot",
                            combine: "$combine",
                        },
                        items: {
                            $push: "$items",
                        },
                        count: {$count: {}},
                    },
                },
                {
                    $sort: {count: -1}
                },
                {
                    $project: {
                        _id: 0,
                        items: {
                            $reduce: {
                                input: "$items",
                                initialValue: {$first: "$items"},
                                in: {
                                    // $$this   - [{itemId: 1}, {itemId: 2}]
                                    // $$value  - accumulator
                                    $map: {
                                        input: {$range: [0, {$size: "$$value"}]},
                                        as: "itemIndex",
                                        in: {
                                            $let: {
                                                vars: {
                                                    thisItem: {$arrayElemAt: ["$$this", "$$itemIndex"]},
                                                    accItem: {$arrayElemAt: ["$$value", "$$itemIndex"]},
                                                },
                                                in: {
                                                    id: "$$accItem.id",
                                                    name: "$$accItem.name",
                                                    icon: "$$accItem.icon",
                                                    maxItemLevel: {$max: ["$$accItem.maxItemLevel", "$$thisItem.itemLevel"]},
                                                    minItemLevel: {$min: ["$$accItem.minItemLevel", "$$thisItem.itemLevel"]},
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        count: 1,
                    },
                },
                {
                    $limit: 5,
                }
            ]).toArray(),
        }
    } finally {
        console.log("done")

        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
