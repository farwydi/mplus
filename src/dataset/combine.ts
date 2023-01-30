import { Document } from "mongodb";

export const combine = (match: any): Document[] => {
    return [
        {
            $match: match,
        },
        {
            $sort: {itemId: -1},
        },
        {
            $group: {
                _id: {
                    slot: "$slot",
                    rankingC: "$rankingCode",
                    rankingF: "$rankingID",
                    rankingN: "$rankingName",
                },
                combine: {$push: "$itemId"},
                items: {
                    $push: {
                        itemId: "$itemId",
                        itemLevel: "$itemLevel",
                        name: "$name",
                        icon: "$icon",
                        hasSet: "$hasSet",
                        isCraft: "$isCraft",
                    },
                },
                keyLevel: {$first: "$keyLevel"},
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
                                            itemId: "$$accItem.itemId",
                                            name: "$$accItem.name",
                                            icon: "$$accItem.icon",
                                            hasSet: "$$accItem.hasSet",
                                            isCraft: "$$accItem.isCraft",
                                            maxItemLevel: {$max: ["$$accItem.maxItemLevel", "$$thisItem.itemLevel"]},
                                            minItemLevel: {$min: ["$$accItem.minItemLevel", "$$thisItem.itemLevel"]},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                maxKeyLevel: 1,
                count: 1,
            },
        },
    ]
}
