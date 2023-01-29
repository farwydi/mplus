import { MongoClient } from 'mongodb';
import { GearCardData, GearCardRowData } from "~/components/gear/gear";
import { medals } from "~/dataset/meta";

const uri =
    process.env.MONGO_DB || '';

interface TopGearParam {
    className: string
    specName: string
    slot: string
    encounterId: string
    medal: string
}

export const topGear = async ({className, specName, encounterId, slot, medal}: TopGearParam): Promise<GearCardData> => {
    if (uri === '') {
        console.error("empty mongo uri");
    }

    const client = new MongoClient(uri);

    const connect = await client.connect()

    try {
        const database = connect.db('divot');
        const gears = database.collection(`gears_${className}_${specName}`);

        let match = {
            slot,
            medal: {
                $in: medals.slice(0, medals.indexOf(medal)+1),
            },
        }

        if (encounterId != "0") {
            match = Object.assign(match, {encounterId})
        }

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
                            itemId: "$itemId",
                        },
                        itemName: {$first: "$name"},
                        itemIcon: {$first: "$icon"},
                        itemHasSet: {$first: "$hasSet"},
                        itemIsCraft: {$first: "$isCraft"},
                        items: {
                            $push: {
                                itemLevel: "$itemLevel",
                            },
                        },
                        maxKeyLevel: {$max: "$keyLevel"},
                        count: {$count: {}},
                    },
                },
                {
                    $sort: {count: -1}
                },
                {
                    $limit: 5,
                },
                {
                    $project: {
                        _id: 0,
                        items: {
                            $reduce: {
                                input: "$items",
                                initialValue: {
                                    itemId: "$_id.itemId",
                                    name: "$itemName",
                                    icon: "$itemIcon",
                                    hasSet: "$itemHasSet",
                                    isCraft: "$itemIsCraft",
                                    itemLevel: {$first: "$items.itemLevel"},
                                },
                                in: {
                                    // $$this   - {itemLevel: 427}
                                    // $$value  - accumulator
                                    itemId: "$$value.itemId",
                                    name: "$$value.name",
                                    icon: "$$value.icon",
                                    hasSet: "$$value.hasSet",
                                    isCraft: "$$value.isCraft",
                                    maxItemLevel: {$max: ["$$value.maxItemLevel", "$$this.itemLevel"]},
                                    minItemLevel: {$min: ["$$value.minItemLevel", "$$this.itemLevel"]},
                                },
                            },
                        },
                        maxKeyLevel: 1,
                        count: 1,
                    },
                },
            ], {allowDiskUse: true}).toArray(),
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
