import { Document } from "mongodb";

export const topGear = (match: any): Document[] => {
    return [
        {
            $match: match,
        },
        {
            $group: {
                _id: {
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
    ]
}
