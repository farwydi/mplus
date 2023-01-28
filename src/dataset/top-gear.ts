import { MongoClient } from 'mongodb';
import { GearCardData, GearCardRowData } from "~/components/gear/gear";

const uri =
    process.env.MONGO_DB || '';

interface TopGearParam {
    className: string
    specName: string
    slot: string
}

export const topGear = async ({className, specName, slot}: TopGearParam): Promise<GearCardData> => {
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
                    $group: {
                        _id: {
                            className: "$className",
                            specName: "$specName",
                            slot: "$slot",
                            id: "$id",
                        },
                        itemName: {$first: "$name"},
                        itemIcon: {$first: "$icon"},
                        items: {
                            $push: {
                                itemLevel: "$itemLevel",
                            },
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
                                initialValue: {
                                    id: "$_id.id",
                                    name: "$itemName",
                                    icon: "$itemIcon",
                                    itemLevel: {$first: "$items.itemLevel"},
                                },
                                in: {
                                    // $$this   - {itemLevel: 427}
                                    // $$value  - accumulator
                                    id: "$$value.id",
                                    name: "$$value.name",
                                    icon: "$$value.icon",
                                    maxItemLevel: {$max: ["$$value.maxItemLevel", "$$this.itemLevel"]},
                                    minItemLevel: {$min: ["$$value.minItemLevel", "$$this.itemLevel"]},
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
