import { Document, MongoClient } from "mongodb";
import { medals } from "~/dataset/meta";
import { GearCardRowData } from "~/components/gear/gear";

const uri =
    process.env.MONGO_DB || '';

if (uri === '') {
    console.error("empty mongo uri");
}

export const CLIENT = new MongoClient(uri, {
    maxPoolSize: 3,
});

interface AggregateParam {
    className: string
    specName: string
    slot: string
    encounterId: string
    medal: string
}

export const aggregate = async ({
                                    className,
                                    specName,
                                    encounterId,
                                    slot,
                                    medal
                                }: AggregateParam, pipeline: (match: any) => Document[]) => {
    const connect = await CLIENT.connect()

    const database = connect.db('divot');
    const gears = database.collection(`gears_${className}_${specName}`);

    let match = {
        slot,
        medal: {
            $in: medals.slice(0, medals.indexOf(medal) + 1),
        },
    }

    if (encounterId != "0") {
        match = Object.assign(match, {encounterId: Number(encounterId)})
    }

    return {
        slotName: slot,
        rows: await gears.aggregate<GearCardRowData>(
            pipeline(match),
            {allowDiskUse: true},
        ).toArray(),
    }
}
