export const specs = {
    "Priest": ["Discipline", "Holy", "Shadow"],
    "Shaman": ["Elemental", "Enhancement", "Restoration"],
    "Druid": ["Balance", "Feral", "Guardian", "Restoration"],
    "DemonHunter": ["Havoc", "Vengeance"],
    "Warrior": ["Arms", "Fury", "Protection"],
    "Paladin": ["Holy", "Protection", "Retribution"],
    "Rogue": ["Assassination", "Outlaw", "Subtlety"],
    "Warlock": ["Affliction", "Demonology", "Destruction"],
    "Monk": ["Brewmaster", "Mistweaver", "Windwalker"],
    "Evoker": ["Devastation", "Preservation"],
    "Hunter": ["BeastMastery", "Marksmanship", "Survival"],
    "DeathKnight": ["Blood", "Frost", "Unholy"],
    "Mage": ["Arcane", "Fire", "Frost"],
}

export const specsIcon = new Map<string, Map<string, string>>([
    ["Priest", new Map<string, string>([
        ["Discipline", "spell_holy_powerwordshield.jpg"],
        ["Holy", "spell_holy_guardianspirit.jpg"],
        ["Shadow", "spell_shadow_shadowwordpain.jpg"],
    ])],
    ["Shaman", new Map<string, string>([
        ["Elemental", "spell_nature_lightning.jpg"],
        ["Enhancement", "spell_shaman_improvedstormstrike.jpg"],
        ["Restoration", "spell_nature_magicimmunity.jpg"],
    ])],
    ["Druid", new Map<string, string>([
        ["Balance", "spell_nature_starfall.jpg"],
        ["Feral", "ability_druid_catform.jpg"],
        ["Guardian", "ability_racial_bearform.jpg"],
        ["Restoration", "spell_nature_healingtouch.jpg"],
    ])],
    ["DemonHunter", new Map<string, string>([
        ["Havoc", "ability_demonhunter_specdps.jpg"],
        ["Vengeance", "ability_demonhunter_spectank.jpg"],
    ])],
    ["Warrior", new Map<string, string>([
        ["Arms", "ability_warrior_savageblow.jpg"],
        ["Fury", "ability_warrior_innerrage.jpg"],
        ["Protection", "ability_warrior_defensivestance.jpg"],
    ])],
    ["Paladin", new Map<string, string>([
        ["Holy", "spell_holy_holybolt.jpg"],
        ["Protection", "ability_paladin_shieldofthetemplar.jpg"],
        ["Retribution", "spell_holy_auraoflight.jpg"],
    ])],
    ["Rogue", new Map<string, string>([
        ["Assassination", "ability_rogue_deadlybrew.jpg"],
        ["Outlaw", "ability_rogue_waylay.jpg"],
        ["Subtlety", "ability_stealth.jpg"],
    ])],
    ["Warlock", new Map<string, string>([
        ["Affliction", "spell_shadow_deathcoil.jpg"],
        ["Demonology", "spell_shadow_metamorphosis.jpg"],
        ["Destruction", "spell_shadow_rainoffire.jpg"],
    ])],
    ["Monk", new Map<string, string>([
        ["Brewmaster", "spell_monk_brewmaster_spec.jpg"],
        ["Mistweaver", "spell_monk_mistweaver_spec.jpg"],
        ["Windwalker", "spell_monk_windwalker_spec.jpg"],
    ])],
    ["Evoker", new Map<string, string>([
        ["Devastation", "classicon_evoker_devastation.jpg"],
        ["Preservation", "classicon_evoker_preservation.jpg"],
    ])],
    ["Hunter", new Map<string, string>([
        ["BeastMastery", "ability_hunter_bestialdiscipline.jpg"],
        ["Marksmanship", "ability_hunter_focusedaim.jpg"],
        ["Survival", "ability_hunter_camouflage.jpg"],
    ])],
    ["DeathKnight", new Map<string, string>([
        ["Blood", "spell_deathknight_bloodpresence.jpg"],
        ["Frost", "spell_deathknight_frostpresence.jpg"],
        ["Unholy", "spell_deathknight_unholypresence.jpg"],
    ])],
    ["Mage", new Map<string, string>([
        ["Arcane", "spell_holy_magicalsentry.jpg"],
        ["Fire", "spell_fire_firebolt02.jpg"],
        ["Frost", "spell_frost_frostbolt02.jpg"],
    ])],
])

export const medals = [
    "gold",
    "silver",
    "bronze",
    "none"
]

export const dungeons = {
    "Algeth'ar Academy": 12526,
    "Court of Stars": 61571,
    "Halls of Valor": 61477,
    "Ruby Life Pools": 12521,
    "Shadowmoon Burial Grounds": 61176,
    "Temple of the Jade Serpent": 10960,
    "The Azure Vault": 12515,
    "The Nokhud Offensive": 12516,
}

export const shortDungeons = new Map<number, string>([
    [12526, 'AA',],
    [61571, 'CoS',],
    [61477, 'HoV',],
    [12521, 'RLP',],
    [61176, 'SBG',],
    [10960, 'TJS',],
    [12515, 'AV',],
    [12516, 'NO',],
])
