export interface GearCardData {
    slotName: string
    rows: GearCardRowData[]
}

export interface GearCardRowData {
    count: number
    items: Gear
    maxKeyLevel: number
}

export type Gear =
    | GearTooltipData
    | GearTooltipData[]

export interface GearTooltipData {
    itemId: number;
    name: Local;
    icon: string;
    maxItemLevel: number;
    minItemLevel: number;
    hasSet: boolean
    isCraft: boolean
}

export interface Local {
    "en_us": string
    "es_mx": string
    "pt_br": string
    "de_de": string
    "en_gb": string
    "es_es": string
    "fr_fr": string
    "it_it": string
    "ru_ru": string
    "ko_kr": string
    "zh_tw": string
    "zh_cn": string
}