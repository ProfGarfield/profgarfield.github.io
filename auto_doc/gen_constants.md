---
layout: page
title: The gen.constants Table
tabTitle: gen.constants Reference
---

The gen.constants table provides numbers which are hard coded into the
game so that you don't need to have "magic numbers" in your code.  The
table `gen.c` is a copy of this table, for a slightly more compact
reference.


# gen.constants

```lua
{
    maxTribes: integer = 8,
    maxTribeID: integer = 7,
    maxUnitTypes: integer = 189,
    maxUnitTypeID: integer = 188,
    domainLand: integer = 0,
    domainAir: integer = 1,
    domainSea: integer = 2,
    maxMoveSpent: integer = 255,
    maxImprovements: integer = 40,
    maxImprovementID: integer = 39,
    maxWonders: integer = 28,
    maxWonderID: integer = 27,
    maxBaseTerrains: integer = 64,
    maxBaseTerrainID: integer = 63,
    maxBaseTerrainPerMap: integer = 16,
    maxBaseTerrainType: integer = 15,
    maxTerrains: integer = 192,
    maxTerrainID: integer = 191,
    maxMaps: integer = 4,
    maxMapID: integer = 3,
    maxTechID: integer = 252,
    maxTechGroups: integer = 8,
    maxTechGroupID: integer = 7,
    techGroupCanOwnCanResearch: integer = 0,
    techGroupCanOwnCannotResearch: integer = 1,
    techGroupCannotOwnCannotResearch: integer = 2,
    roleAttack: integer = 0,
    roleDefend: integer = 1,
    roleNavalSuperiority: integer = 2,
    roleAirSuperiority: integer = 3,
    roleSeaTransport: integer = 4,
    roleSettle: integer = 5,
    roleDiplomacy: integer = 6,
    roleTrade: integer = 7,
    epochAncient: integer = 0,
    epochRenaissance: integer = 1,
    epochIndustrialRevolution: integer = 2,
    epochModern: integer = 3,
    categoryMilitary: integer = 0,
    categoryEconomic: integer = 1,
    categorySocial: integer = 2,
    categoryAcademic: integer = 3,
    categoryApplied: integer = 4,
    govtAnarchy: integer = 0,
    govtDespotism: integer = 1,
    govtMonarchy: integer = 2,
    govtCommunism: integer = 3,
    govtFundamentalism: integer = 4,
    govtRepublic: integer = 5,
    govtDemocracy: integer = 6,
    resourceNone: integer = 0,
    resourceFish: integer = 1,
    resourceWhale: integer = 2,
    grasslandType: integer = 2,
    leaderAggressive: integer = 1,
    leaderRational: integer = -1,
    leaderExpansionist: integer = 1,
    leaderPerfectionist: integer = -1,
    leaderCivilized: integer = 1,
    leaderMilitaristic: integer = -1,
    leaderNeutral: integer = 0,
    cityStyleBronzeAge: integer = 0,
    cityStyleClassical: integer = 1,
    cityStyleFarEast: integer = 2,
    cityStyleMedieval: integer = 3,
    oceanBaseTerrainType: integer = 10,
}
```



### constants
```
gen.constants --> table
```






