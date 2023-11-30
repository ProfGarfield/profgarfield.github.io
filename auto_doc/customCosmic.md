---
layout: page
title: customCosmic
tabTitle: customCosmic.lua Documentation
minTOC: 2
maxTOC: 3
---

# customCosmic

undefined



### changeEphemeralForCity
```
function customCosmic.changeEphemeralForCity(city: any)
```




### changeEphemeralForTribe
```
function customCosmic.changeEphemeralForTribe(tribe: any)
```




### changeEphemeralForUnit
```
function customCosmic.changeEphemeralForUnit(unit: unitObject)
```
Changes the ephemeral rules so that the unit customisations
will work



### computeMovementAllowance
```
function customCosmic.computeMovementAllowance(unit: unitObject, customisation?: table)
  -> integer
```
Computes the value that `unit.type.move` should have so that `unit` satisfies
all its customisations.

@*param* `customisation` — If not defined, customCosmic.getUnitTypeCustomisation is called to retrieve it.



### defaultMovementMultipliers
```
customCosmic.defaultMovementMultipliers --> unknown
```




### enableCustomCosmic
```
function customCosmic.enableCustomCosmic()
```




### enableEphemeralMapTransportSettings
```
function customCosmic.enableEphemeralMapTransportSettings()
```
Enables the nativeTransport, buildTransport, useTransport fields
 to be altered by the customCosmic module.  Usually, these
 fields are saved as part of the game, so game events can enable
 or disable transport.  Those kinds of events will no longer work,
 (unless you program them into customCosmic customisations instead).



### fullHealthMovementAllowance
```
function customCosmic.fullHealthMovementAllowance(unit: unitObject, customisation?: table)
  -> integer
```
Computes the movement allowance for the unit if it is at full health. 

@*param* `customisation` — If not defined, customCosmic.getUnitTypeCustomisation is called to retrieve it.



### getCityCustomisation
```
function customCosmic.getCityCustomisation(city: cityObject)
  -> table
```
Returns the cityCustomisation for `city`



### getCustomisedTerrainInfo
```
function customCosmic.getCustomisedTerrainInfo(tile: any, city: any)
  -> table
  2. table
  3. table<integer|mapObject, bitmask>
```




### getEmptyUnitTypeCustomisation
```
function customCosmic.getEmptyUnitTypeCustomisation()
  -> table
```
Returns an 'empty' unitTypeCustomisation, with priority set to -1



### getFreeSupport
```
function customCosmic.getFreeSupport(tribe: any)
  -> table
```




### getMovementMultipliers
```
function customCosmic.getMovementMultipliers(unit: unitObject, customisation?: table)
  -> { alpine: integer, road: integer, railroad: integer, river: integer, aggregate: integer }
```
Returns the movementMultipliers for `unit` in a table.



### getTribeCustomisation
```
function customCosmic.getTribeCustomisation(tribe: tribeObject)
  -> table
```
Returns the tribeCustomisation for `tribe`



### getTribeUpkeep
```
function customCosmic.getTribeUpkeep(tribe: tribeObject, recalculate?: boolean)
  -> integer
```
Returns the total improvement maintenance cost a tribe must pay each turn.
If `recalculate` is false or absent, the value is from the most recent
update of each city.  If `recalculate` is true, city improvement customisations
are calculated to get the current version of upkeep.



### getUnitTypeCustomisation
```
function customCosmic.getUnitTypeCustomisation(unit: unitObject)
  -> table
```
Returns the unitTypeCustomisation for `unit`.



### isEnabled
```
function customCosmic.isEnabled()
  -> boolean
```
Returns true if the customCosmic module has been enabled 
using `cusomCosmic.enableCustomCosmic()`, and false otherwise.



### isImpassableFor
```
function customCosmic.isImpassableFor(baseTerrain: baseTerrainObject, unit: unitObject, customisation: table|nil)
  -> boolean
```
Determines if a base terrain type is impassable for the specified unit.

@*param* `customisation` — if nil, the customisation is retrieved by calling `customCosmic.getUnitTypeCustomisation`



### isUnitTypeCustomisation
```
customCosmic.isUnitTypeCustomisation --> fun(item: any):boolean
```




### makeCityCustomisation
```
function customCosmic.makeCityCustomisation(table: any)
  -> unknown
```




### makeTribeCustomisation
```
function customCosmic.makeTribeCustomisation(table: any)
  -> unknown
```




### makeUnitTypeCustomisation
```
function customCosmic.makeUnitTypeCustomisation(table: any)
  -> unknown
```




### registerCityCustomisation
```
function customCosmic.registerCityCustomisation(customisation: table)
```
Registers a customisation for cities.<br>
Keys and descriptions for city customisation tables:

- These keys are used to change cosmic parameters that relate to city 
production.  Some cosmic parameters relating to city production are in the tribe
customisations, because they are used before code in onCalculateCityYield can
change them.
    * `communismPalaceDistance` = nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.communismPalaceDistance 
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `communismPalaceDistanceModifier` = nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for civ.cosmic.communismPalaceDistance 
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
    * `foodEaten` = nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.foodEaten 
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `foodEatenModifier` = nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for civ.cosmic.foodEaten 
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
    * `prodChangePenalty`= nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.prodChangePenalty
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `prodChangePenaltyModifier`= nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for civ.cosmic.prodChangePenalty
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
    * `riotFactor`= nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.riotFactor
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `riotFactorModifier` = nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for civ.cosmic.riotFactor
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
    * `scienceLostFundamentalism`= nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.scienceLostFundamentalism
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `scienceLostFundamentalismModifier`= nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for civ.cosmic.scienceLostFundamentalism
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
    * `scienceRateFundamentalism`= nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.scienceRateFundamentalism
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `scienceRateFundamentalismModifier`= nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for civ.cosmic.scienceRateFundamentalism
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
    * `sizeUnhappiness`= nil\\|int>=0 or function(city) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.sizeUnhappiness
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the city as the argument.
    * `sizeUnhappinessModifier`= nil\\|int or function(city) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.sizeUnhappiness
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the city as the argument.
- The `condition` and `priority` keys determine which customisation table is chosen for a particular city.  The `customisationName` key is used to give the customisation a name which is used in some error messages.
    * `customisationName` = nil\\|string
        + A name to be used during certain kinds of error and debugging messages
        + nil will give "Unnamed City Customisation"
    * `condition` = nil\\|tribeObject\\|traitString\\|function(city)-->boolean or table of tribeObject\\|traitString
        + if nil, this customisation applies to all cities (unless a higher  priority customisation also applies)
        + if tribeObject, this customisation applies to cities owned by the tribe
        + if traitString, this customisation applies to tribes which have the trait
        + if table of tribeObject\\|traitString, this applies to any tribe or traitString in the table
        + if function(city) --> boolean, then this customisation applies to cities which make this function return true
        + only one customisation can apply to any city.  The `priority` key is used to tie break.
    * `priority` = nil or number >= 0
        + If multiple customisations can apply to a city, this value chooses among them, with higher priority taking precedence.
        + If the city is eligible for two customisations of the same priority, an error may be generated, and will certainly be generated if they are of the highest priority.
- The following types of objects can also be keys in a city customisation table: `unitTypeObject`, `improvementObject`, `wonderObject`, `baseTerrainObject`, and `terrainObject`.  (These are associated with integer values behind the scenes, but don't worry about that.  Just use the object (NOT the ID) as the key.)  Each key takes a table value (or nil), to govern some aspects of the item.
    * `[unitTypeObject]` = nil\\|table 
        + `cost` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base cost (in shield rows) for the city
            - If nil, refer to authoritativeDefaultRules
            - If function, use result after evaluating function(city)
        + `costModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base cost, but cost won't be less than 0
            - If nil, use 0
            - If function, use result after evaluating function(city)

    * `[improvementObject]` = nil\\|table 
        + `cost` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base cost (in shield rows) for the city
            - If nil, refer to authoritativeDefaultRules
            - If function, use result after evaluating function(city)
        + `costModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base cost, but cost won't be less than 0
            - If nil, use 0
            - If function, use result after evaluating function(city)
        + `cantSell` = nil\\|boolean or function(city)-->nil\\|boolean
            - If true, the city can't sell the improvement, if false, it can.
            - If nil, refer to the authoritativeDefaultRules
        + `upkeep` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base upkeep (gold per turn) this improvement in this city
            - If nil, refer to authoritativeDefaultRules
            - If function, use result after evaluating function(city)
            - Note: Upkeep costs will be calculated correctly during city processing, but the Tax Rate and Trade Adviser windows will not be correct if the upkeep isn't the same for all cities (Costs for the most recently looked at city will be used.)
            - `customCosmic.getTribeUpkeep` will calculate the actual upkeep per turn for the tribe.
        + `upkeepModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base upkeep, but upkeep won't be less than 0
            - If nil, use 0 
            - If function, use result after evaluating function(city)
    * `[wonderObject]` = nil\\|table
        + `cost` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base cost (in shield rows) for the city
            - If nil, refer to authoritativeDefaultRules
            - If function, use result after evaluating function(city)
        + `costModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base cost, but cost won't be less than 0
            - If nil, use 0
            - If function, use result after evaluating function(city)
    * `[baseTerrainObject]` = nil\\|table
        + `irrigateBonus` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base value of the irrigation bonus for the city and baseTerrain.
            - If nil, refer to the authoritativeDefaultRules,
            - If function, use the result of function(city), 
        + `irrigateBonusModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base irrigation bonus, but results less than 0 will be set to 0.
            - If nil, use 0.
            - If function, use result after evaluating function(city)
        + `mineBonus` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base value of the mining bonus for the city and baseTerrain.
            - If nil, refer to the authoritativeDefaultRules,
            - If function, use the result of function(city), 
        + `mineBonusModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base mining bonus, but results less than 0 will be set to 0.
            - If nil, use 0.
            - If function, use result after evaluating function(city)
        + `roadTrade` = nil\\|boolean or function(city)-->nil\\|boolean
            - If true, for this city and baseTerrain, the road trade bonus is applied.  If false, it is not.
            - If nil, refer to the authoritativeDefaultRules
            - If function, use result after evaluating function(city)
    * `[terrainObject]` = {
        + `food` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base value for the food produced for this city by this terrain type.
            - If nil, refer to the authoritativeDefaultRules
            - If function, use the result of function(city)
        + `foodModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base food production value, but if the result is less than 0, it will be raised to 0.
            - If nil, use 0.
            - If function, use the result of function(city) 
        + `shields` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base value for the shields produced for this city by this terrain type.
            - If nil, refer to the authoritativeDefaultRules
            - If function, use the result of function(city)
        + `shieldsModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base shield production value, but if the result is less than 0, it will be raised to 0.
            - If nil, use 0.
            - If function, use the result of function(city) 
        + `trade` = nil\\|int>=0 or function(city)-->nil\\|int>=0
            - Sets the base value for the trade produced for this city by this terrain type.
            - If nil, refer to the authoritativeDefaultRules
            - If function, use the result of function(city)
        + `tradeModifier` = nil\\|int or function(city)-->nil\\|int
            - Add this to the base trade production value, but if the result is less than 0, it will be raised to 0.
            - If nil, use 0.
            - If function, use the result of function(city) 
- You can assign the same data table to multiple items by providing a table as the key, instead of a string or luaObject.  Consider:
<br> [keyTable] = data
<br>For each value in the `keyTable`, if value is not a trait, assign
<br>customisation[value] = gen.copyTable(data)
<br>if the value is a trait, for each ITEM such that 
<br>traits.hasTrait(ITEM,value)` 
<br>is true, assign
<br>customisation[ITEM] = gen.copyTable(data)


@*param* `customisation` — A city customisation table, described above.



### registerGetCityCustomisation
```
function customCosmic.registerGetCityCustomisation(fun: fun(city: cityObject):table)
```
Allows the scenario designer to register a function(city)-->cityCustomisation
to be used instead of the `customCosmic.registerCityCustomisation` system.
The function must return a cityCustomisation for every 
city under all circumstances



### registerGetTribeCustomisation
```
function customCosmic.registerGetTribeCustomisation(fun: fun(tribe: tribeObject):table)
```
Allows the scenario designer to register a function(tribe)-->tribeCustomisation
to be used instead of the `customCosmic.registerTribeCustomisation` system.
The function must return a tribeCustomisation for every 
tribe under all circumstances



### registerGetUnitTypeCustomisation
```
function customCosmic.registerGetUnitTypeCustomisation(fun: fun(unit: unitObject):table)
```
Allows a scenario designer to register a function(unit)-->unitTypeCustomisation
to be used instead of the `customCosmic.registerUnitTypeCustomisation` system.
The function must return a unitTypeCustomisation for every unit
under all circumstances



### registerTribeCustomisation
```
function customCosmic.registerTribeCustomisation(customisation: table)
```
Registers a customisation for tribes.<br>
Keys and descriptions for tribe customisation tables:

- These keys are used to change cosmic parameters that relate to city
production.  These are customised by tribe because the game uses them
before onCalculateCityYield can change them. Other customisations can be made on a per city basis.
    * `foodRows`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.foodRows
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `foodRowsModifier` = nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.foodRows
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `settlersEatHigh`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.settlersEatHigh
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `settlersEatHighModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.settlersEatHigh
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `settlersEatLow`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.settlersEatLow
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `settlersEatLowModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.settlersEatLow
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `shieldRows`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.shieldRows
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `shieldRowsModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.shieldRows
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `sizeAquaduct`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.sizeAquaduct
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
        + NOTE: sizeAqueduct can be used instead to refer to this value.
    * `sizeAquaductModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.sizeAquaduct
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
        + NOTE: sizeAqueductModifier can be used instead to refer to this value.
    * `sizeSewer`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.sizeSewer
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `sizeSewerModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.sizeSewer
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `supportCommunism`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.supportCommunism
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `supportCommunismModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.supportCommunism
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `supportFundamentalism`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.supportFundamentalism
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `supportFundamentalismModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.supportFundamentalism
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
    * `supportMonarchy`= nil\\|int>=0 or function(tribe) --> nil\\|int>=0
        + Specifies the base value to be used for civ.cosmic.supportMonarchy
        + If nil, the value from the authoritativeDefaultRules is used.
        + If function, use the returned value when given the tribe as the argument.
    * `supportMonarchyModifier`= nil\\|int or function(tribe) --> nil\\|int
        + Add this to the base value to be used for  civ.cosmic.supportMonarchy
        + If nil, add 0.  Note, a negative number here will not reduce the base value below 0.
        + If function, use the returned value when given the tribe as the argument.
- The `condition` and `priority` keys determine which customisation table is chosen for a particular tribe.  The `customisationName` key is used to give the customisation a name which is used in some error messages.
    * `customisationName` = nil\\|string
        + A name to be used during certain kinds of error and debugging messages
        + nil will give "Unnamed Tribe Customisation"
    * `condition` = nil\\|tribeObject\\|traitString\\|function(tribe)-->boolean or table of tribeObject\\|traitString
        + if nil, this customisation applies to all tribes (unless a higher  priority customisation also applies)
        + if tribeObject, this customisation applies to that tribe
        + if traitString, this customisation applies to tribes which have the trait
        + if table of tribeObject\\|traitString, this applies to any tribe or traitString in the table
        + if function(tribe) --> boolean, then this customisation applies to tribes which make this function return true
        + only one customisation can apply to any tribe.  The `priority` key is used to tie break.
    * `priority` = nil\\|number>=0
        + If multiple customisations can apply to a tribe, this value chooses among them, with higher priority taking precedence.
        + If the tribe is eligible for two customisations of the same priority, an error may be generated, and will certainly be generated if they are of the highest priority.
- `unitTypeObject`s can also be keys in a tribe customisation table.
(These are associated with integer values behind the scenes,
 but don't worry about that.  Just use the object (NOT the ID) as the key.)
Each key takes a table (or nil) as a value, to govern the support
characteristics of the item.
    * `[unitTypeObject]` = nil\\|table
        + `freeSupportUnderFundamentalism` = nil\\|boolean or function(tribe)-->nil\\|boolean
            - If true, unitType has the freeSupportUnderFundamentalism flag for this tribe.  If false, it does not.
            - If nil, refer to the authoritativeDefaultRules
        + `requiresFoodSupport` = nil\\|boolean or function(tribe)-->nil\\|boolean
            - If true, the tribe must pay food support for this unitType.
            - If false, it does not. (Setting this to true makes both settler and non-settler unit types require food.)
            - If nil, refer to the authoritativeDefaultRules
    --          }
- You can assign the same data table to multiple items by providing a table as the key, instead of a string or luaObject.  Consider:
<br> [keyTable] = data
<br>For each value in the `keyTable`, if value is not a trait, assign
<br>customisation[value] = gen.copyTable(data)
<br>if the value is a trait, for each ITEM such that 
<br>traits.hasTrait(ITEM,value)` 
<br>is true, assign
<br>customisation[ITEM] = gen.copyTable(data)




### registerUnitTypeCustomisation
```
function customCosmic.registerUnitTypeCustomisation(unitTypeOrTrait: string|table<any, string|unitTypeObject>|unitTypeObject, unitTypeCustomisation: table)
```
Registers a customisation for a unitType, a trait for unitTypes, or a table of unitTypes and traits for unitTypes.<br>
Keys and descriptions for unitType customisation tables:
<br>
- If both `atomicMovementBonus` and `movementBonus` are used, both modify movement.
    * `atomicMovementBonus` = nil\\|int or function(unit)-->nil\\|Int
        +  Bonus movement points (compared to authoritativeDefaultRules)
        +  Positive means add, negative means subtract
        +  nil means no change
        +  if function, the returned value of function(unit) is used.
    * `movementBonus` = nil\\|num or function(unit)-->nil\\|num
        + Bonus movement points (compared to authoritativeDefaultRules)
        + whole movement points, positive means add, negative means subtract
        + nil means no change
        + if function, the returned value of function(unit) is used.
- Only one of `atomicCustomMovement` and `customMovement` is permissible.  If both exist, `atomicCustomMovement` is used.  If this and the `movementBonus` both exist, the `movementBonus` is added to this instead of the authoritativeDefaultRules.  If both are nil, refer to the authoritativeDefaultRules.
    * `atomicCustomMovement` = nil\\|int>=0 or function(unit)-->nil\\|int>=0
        + Unit type will have this amount of atomic movement points, regardless of the authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.
    * `customMovement` = nil\\|num>=0 or function(unit)--> nil\\|num>=0
        + Unit type will have this amount of movement points, regardless of the authoritativeDefaultRules.
        + if function, the returned value of function(unit) is used.
- If both of `atomicMinMove` and `minMove` are specified, the one yielding a larger bonus is used.
    * `atomicMinMove` = nil\\|int or function(unit)-->nil\\|int
        + Ensures a damaged land or sea unit will still be able to move this many atomic movement points (unless that would require setting it's unit type's atomic movement beyond 255, which can't be overcome.  If this is a problem,
        consider changing movement multipliers for the unit to have
        a lower aggregate value)
        + nil means no minimum movement
        + does not increase movement beyond the unit's movement allowance
        + since a damaged unit can't have a fractional movement allowance,
        the effective atomicMinMove is reduced to the next lowest full
        movement point.
    * `minMove` = nil\\|num or function(unit)-->nil\\|num
        + Ensures a damaged land or sea unit will still be able to move this many movement points (unless that would require setting it's unit type's atomic movement beyond 255, which can't be overcome.  If this is a problem,
        consider changing movement multipliers for the unit to have
        a lower aggregate value)
        + nil means no minimum movement
        + does not increase movement beyond the unit's movement allowance
- Movement Multipliers have no special interactions.
    * `roadMultiplier` = nil or int>=-1 or function(unit)-->nil int>=-1
        + The road multiplier for the unit type
        + nil means refer first to the defaultMovementMultipliers, then to authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.
    * `railroadMultiplier` = nil or int>=-1 or function(unit)-->nil int>=-1
        + The railroad multiplier for this unit type
        + nil means refer first to the defaultMovementMultipliers, then to authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.
    * `alpineMultiplier` = nil or int>=-1 or function(unit)-->nil int>=-1
        + The alpine multiplier for this unit type
        + nil means refer first to the defaultMovementMultipliers, then to authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.
    * `riverMultiplier` = nil or int>=-1 or function(unit)-->nil int>=-1
        + The river multiplier for this unit type
        + nil means refer first to the defaultMovementMultipliers, then to authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.

- The `isImpassable` and `moveCost` keys have tables as values (or nil, if you wish to make no changes).  These tables accept either `baseTerrainObject`s as keys, or integers, as determined by `gen.getBaseTerrainID`. Using the baseTerrainObject is recommended for clarity.
    * `isImpassable[baseTerrainObject/ID]` = nil or boolean or function(unit)-->nil or boolean
        + if true, the baseTerrain is impassable for the unit type
        + if false, the baseTerrain is not impassable for the unit type
        + if nil, refer to the authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.
    * `moveCost[baseTerrainObject/ID]` = nil\\|int>=0 or function(unit)-->nil\\|int>=0
        + if integer, this is the (full movement point) movement cost of the base terrain 
        + if nil, refer to the authoritativeDefaultRules
        + if function, the returned value of function(unit) is used.

- The `cosmic` and `flag` keys have tables as values.  The `cosmic` table keys change the `civ.cosmic` fields with the same key.  The `flags` table keys are derived from General Library function names.
    * `cosmic[cosmicKey]` = int>=0\\|nil or function(unit)-->int>=0\\|nil
        + if nil, use the value in the authoritativeDefaultRules instead
        + possible values for cosmicKey:
            - "paradropRange"
            - "triremeLost"
            - "transformBase" 
        + if function, the returned value of function(unit) is used.
    * `flags[flagKey]` = nil or boolean or function(unit)-->nil or boolean
        + if true, the unit has the flag corresponding to the flagKey
        + if false, the unit does not have the flag corresponding to flagKey
        + if nil, flags from the authoritativeDefaultRules are used
        + possible values for flagKey:
            - "canCrossImpassableTerrain"
            - "canFoundCities"
            - "canImproveTiles" (no effect if not settler)
            - "seeTwoSpaces"
            - "ignoreZOC"
            - "amphibious"
            - "coastal"
            - "ignoreWalls"
            - "carryAir"
            - "paradrop"
            - "alpine"
            - "destroyedAfterAttacking"
            - "spotSubmarines"
        + if function, the returned value of function(unit) is used.
- The `condition` and `priority` keys determine which customisation table is chosen for a particular unit.  The `customisationName` key is used to give the customisation a name which is used in some error messages.
    * `condition` = nil\\|tribeObject\\|traitString\\|function(unit)-->boolean or table of tribeObject\\|traitString
        + if nil, this unit type customisation applies to all units of the relevant type(s).
        + if tribeObject, this customisation can only apply to units owned by that tribe (as long as the unit is also of the relevant type)
        + if traitString, this customisation applies to tribes which have the trait
        + if table of tribeObject\\|traitString, this applies to any tribe or traitString in the table
        + if function(unit) --> boolean, then this customisation applies to units of the relevant type(s) which also make this function return true
        + Only one customisation can apply to any unit.  The `priority` key is used to tie break.
    * `priority` = nil or number>=0
        + If multiple customisations can apply to a unit, this value chooses among them, with higher priority taking precedence.
        + If the unit is eligible for two customisations of the same priority, an error may be generated, and will certainly be generated if they are of the highest priority.
    * `customisationName` = nil\\|string,
        + A name to be used during certain kinds of error and debugging messages
        + nil will give "Unnamed UnitType Customisation"
- Transport settings have no effect unless `customCosmic.ephemeralMapTransportSettings()` has been called.  The final transport settings are computed as follows:
<br>1. restore the unitType to the authoritativeDefaultRules transportation settings
<br>2. Apply the <something>Transport strings to the result of step 1
<br>3. Apply transportXY data to the result of step 2
    * `nativeTransport` = string\\|nil or function(unit) --> string\\|nil
        + Governs the unitType nativeTransport field
        + String should be 16 characters, 0,1, or x 
        + Each of the 16 characters reference one of the possible map transport relationships.  If it is 0, the corresponding relationship is disabled, if it is 1, the corresponding relationship is enabled, and if it is x, reference the authoritativeDefaultRules
        + if nil, use authoritativeDefaultRules, if function, 
        + evaluate function(unit) and use the result

    * `buildTransport` = string\\|nil or function(unit) --> string\\|nil
        + Governs the unitType buildTransport field
        + String should be 16 characters, 0,1, or x 
        + Each of the 16 characters reference one of the possible map transport relationships.  If it is 0, the corresponding relationship is disabled, if it is 1, the corresponding relationship is enabled, and if it is x, reference the authoritativeDefaultRules
        + if nil, use authoritativeDefaultRules, if function, 
        + evaluate function(unit) and use the result
    * `useTransport` = string\\|nil or function(unit) --> string\\|nil
        + Governs the unitType useTransport field
        + String should be 16 characters, 0,1, or x 
        + Each of the 16 characters reference one of the possible map transport relationships.  If it is 0, the corresponding relationship is disabled, if it is 1, the corresponding relationship is enabled, and if it is x, reference the authoritativeDefaultRules
        + if nil, use authoritativeDefaultRules, if function, 
        + evaluate function(unit) and use the result

    * `transportXY` = {
    <br> nativeTransport = nil\\|boolean or function(unit) --> nil\\|boolean
    <br> buildTransport = nil\\|boolean or function(unit) --> nil\\|boolean
    <br> useTransport = nil\\|boolean or function(unit) --> nil\\|boolean
    <br>}
        + transportXY governs the transport relationship between maps X and Y
        + if `somethingTransport` key is true, then the relationship between the two maps is enabled for maps X and Y in unitType.somethingTransport
        + if it is false, the relationship is disabled
        + if nil, use the authoritativeDefaultRules, or the relationship set out by the somethingTransport key defined above
        + if function, evaluate function(unit) and use the result
        + `transportXY` represents the following available keys:
            - `transport01`
            - `transport02`
            - `transport03`
            - `transport12`
            - `transport13`
            - `transport23`
--





