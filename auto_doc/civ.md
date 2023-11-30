---
layout: page
minTOC: 2
maxTOC: 3
tabTitle: civ Library Documentation
title: Civ Library
---

# civ

 The civ module provides functions which can interact directly with the game.  It is always in scope, so you never need to use a `require` call in order to access it.



## civ

### addImprovement
```
function civ.addImprovement(city: cityObject, improvement: improvementObject)
```
Adds city improvement `improvement` to city `city`.



### canEnter
```
function civ.canEnter(unitType: unitTypeObject, tile: tileObject)
  -> boolean: boolean
```
Returns `true` if the given unittype can enter tile `tile`, `false` otherwise.



### captureCity
```
function civ.captureCity(city: cityObject, tribe: tribeObject)
```
Captures city `city` for tribe `tribe`.



### createCity
```
function civ.createCity(tribe: tribeObject, tile: tileObject)
  -> city: cityObject|nil
```
Creates a city owned by `tribe` at the location given by `tile`. Returns `nil` if a city could not be created.



### createUnit
```
function civ.createUnit(unitType: unitTypeObject, tribe: tribeObject, tile: tileObject)
  -> unit: unitObject
```
Creates a unit of type `unittype`, owned by `tribe`, at the location given by `tile`.



### deleteCity
```
function civ.deleteCity(city: cityObject)
```
Deletes city `city` from the game.



### deleteUnit
```
function civ.deleteUnit(unit: unitObject)
```
Deletes unit `unit` from the game.
Consider unsing `gen.defeatUnit`, `gen.killUnit`, `gen.deleteUnit`, or `gen.replaceUnit` instead, for event integration.
<br>Deprecation flag is only here so that designers see the above notice.



### destroyWonder
```
function civ.destroyWonder(wonder: wonderObject)
```
Destroys wonder `wonder`, removing it from the game, and marking it as 'lost'.



### enableTechGroup
```
function civ.enableTechGroup(tribe: tribeObject, techgroup: integer, value: 0|1|2)
```
Sets the value of tech group `techgroup` (0-7) to value `value` (0-2, 0 = can research, can own, 1 = can't research, can own, 2 = can't research, can't own) for tribe `tribe`.

@*param* `techgroup` — integer in [0,7]

```lua
value:
    \| 0 -- can research, can own
    \| 1 -- can't research, can own
    \| 2 -- can't research, can't own
```



### endGame
```
function civ.endGame(endscreens: boolean)
```
Ends the game. `endscreens` is a boolean that determines whether to show the powergraph and related screens.

@*param* `endscreens` — This argument is false by default.



### getActiveUnit
```
function civ.getActiveUnit()
  -> unit: unitObject
```
Returns the currently active unit.



### getAtlasDimensions
```
function civ.getAtlasDimensions()
  -> width: integer
  2. height: integer
  3. number_of_maps: integer
```
Returns three integers, the width and height of the map and the number of maps.



### getBaseTerrain
```
function civ.getBaseTerrain(map: integer|mapObject, terrainId: integer)
  -> baseTerrain: baseTerrainObject
```
Returns the base terrain object for the given map and terrain type.

@*param* `map` — The map for the base terrain type we want, or its id.

@*param* `terrainId` — The id number of the base terrain type sought



### getCity
```
function civ.getCity(id: integer)
  -> city: cityObject|nil
```
Returns the city with id `id`, or `nil` if it doesn't exist.



### getCommodity
```
function civ.getCommodity(id: integer)
  -> commodity: commodityObject|nil
```
Returns the commodity with id `id` (0-15 for regular commodities, -1 for food supplies), or `nil` if it doesn't exist.



### getCurrentTile
```
function civ.getCurrentTile()
  -> tile: tileObject
```
Returns the currently selected tile.



### getCurrentTribe
```
function civ.getCurrentTribe()
  -> tribe: tribeObject
```
Returns the currently active tribe.



### getGameYear
```
function civ.getGameYear()
  -> integer: integer
```
Returns the current game year.



### getImprovement
```
function civ.getImprovement(id: integer)
  -> improvement: improvementObject|nil
```
Returns the improvement with id `id` (0-39), or `nil` if it doesn't exist.



### getMap
```
function civ.getMap(id: integer)
  -> map: mapObject|nil
```
Returns the map with id `id` (0-3) or `nil` if it doesn't exist.



### getMapDimensions
```
function civ.getMapDimensions()
  -> width: integer
  2. height: integer
  3. number_of_maps: integer
```
Alias for getAtlasDimensions. (deprecated since 0.16)



### getOpenCity
```
function civ.getOpenCity()
  -> city: cityObject|nil
```
Returns the city currently opened in the city window, `nil` if the city window is closed.



### getPlayerTribe
```
function civ.getPlayerTribe()
  -> tribe: tribeObject
```
Returns the player's tribe.



### getTech
```
function civ.getTech(id: integer)
  -> tech: techObject|nil
```
Returns the tech with id `id` (0-99), or `nil` if it doesn't exist.



### getTerrain
```
function civ.getTerrain(map: integer|mapObject, terrainId: integer, resource: 0|1|2)
  -> terrain: terrainObject
```
Returns the terrain object for the given map, terrain type and resource. Out of bound id's cause errors.

@*param* `map` — The map for the terrain we want, or its id.

@*param* `terrainId` — The id number of the base terrain type sought.

```lua
resource:
    \| 0 -- no resource
    \| 1 -- fish resource
    \| 2 -- whales resource
```



### getTile
```
function civ.getTile(x: integer, y: integer, z: integer)
  -> tile: tileObject|nil
```
Returns the tile with coordinates `x`, `y`, `z`, or `nil` if it doesn't exist.

@*param* `x` — the 'x' coordinate of the tile

@*param* `y` — the 'y' coordinate of the tile

@*param* `z` — the 'z' coordinate of the tile ([0,3])



### getToTDir
```
function civ.getToTDir()
  -> string
```
Returns the absolute path of the ToT installation directory.

@*return* — 



### getTribe
```
function civ.getTribe(id: integer)
  -> tribe: tribeObject|nil
```
Returns the tribe with id `id` (0-7), or `nil` if it doesn't exist.



### getTurn
```
function civ.getTurn()
  -> integer
```
Returns the current turn number.

@*return* — 



### getUnit
```
function civ.getUnit(id: integer)
  -> unit: unitObject|nil
```
Returns the unit with id `id`, or `nil` if it doesn't exist.



### getUnitType
```
function civ.getUnitType(id: integer)
  -> unitType: unitTypeObject|nil
```
Returns the unit type with id `id`, or `nil` if it doesn't exist.



### getWonder
```
function civ.getWonder(id: integer)
  -> wonder: wonderObject|nil
```
Returns the wonder with id `id` (0-27), or `nil` if it doesn't exist.



### giveTech
```
function civ.giveTech(tribe: tribeObject, tech: techObject)
```
Gives tech `tech` to tribe `tribe`.



### hasImprovement
```
function civ.hasImprovement(city: cityObject, improvement: improvementObject)
```
Returns `true` if city `city` has improvement `improvement`, `false` otherwise.



### hasTech
```
function civ.hasTech(tribe: tribeObject, tech: techObject)
  -> boolean
```
Returns `true` if tribe `tribe` has tech `tech`, `false` otherwise.

@*return* — 



### isBaseTerrain
```
function civ.isBaseTerrain(object: any)
  -> boolean
```
Returns `true` if `object` is a base terrain, `false` otherwise.

@*return* — 



### isCity
```
function civ.isCity(object: any)
  -> boolean
```
Returns `true` if `object` is a city, `false` otherwise.

@*return* — 



### isDialog
```
function civ.isDialog(object: any)
  -> boolean
```
Returns `true` if `object` is a dialog, `false` otherwise.

@*return* — 



### isImage
```
function civ.isImage(object: any)
  -> boolean
```
Returns `true` if `object` is an image, `false` otherwise.

@*return* — 



### isImprovement
```
function civ.isImprovement(object: any)
  -> boolean
```
Returns `true` if `object` is a city improvement, `false` otherwise.

@*return* — 



### isLeader
```
function civ.isLeader(object: any)
  -> boolean
```
Returns `true` if `object` is a leader, `false` otherwise.

@*return* — 



### isMap
```
function civ.isMap(object: any)
  -> boolean
```
Returns `true` if `object` is a map, `false` otherwise.

@*return* — 



### isTech
```
function civ.isTech(object: any)
  -> boolean
```
Returns `true` if `object` is a tech, `false` otherwise.

@*return* — 



### isTerrain
```
function civ.isTerrain(object: any)
  -> boolean
```
Returns `true` if `object` is a terrain, `false` otherwise.

@*return* — 



### isTile
```
function civ.isTile(object: any)
  -> boolean
```
Returns `true` if `object` is a tile, `false` otherwise.

@*return* — 



### isTradeRoute
```
function civ.isTradeRoute(object: any)
  -> boolean
```
Returns `true` if `object` is a trade route, `false` otherwise.

@*return* — 



### isTribe
```
function civ.isTribe(object: any)
  -> boolean
```
Returns `true` if `object` is a tribe, `false` otherwise.

@*return* — 



### isUnit
```
function civ.isUnit(object: any)
  -> boolean
```
Returns `true` if `object` is a unit, `false` otherwise.

@*return* — 



### isUnitType
```
function civ.isUnitType(object: any)
  -> boolean
```
Returns `true` if `object` is a unit type, `false` otherwise.

@*return* — 



### isWonder
```
function civ.isWonder(object: any)
  -> boolean
```
Returns `true` if `object` is a wonder, `false` otherwise.

@*return* — 



### iterateCities
```
function civ.iterateCities()
  -> fun():cityObject
```
Returns an iterator yielding all cities in the game.

@*return* — 



### iterateUnits
```
function civ.iterateUnits()
  -> fun():unitObject
```
Returns an iterator yielding all units in the game.

@*return* — 



### killTribe
```
function civ.killTribe(tribe: tribeObject)
```
Removes tribe `tribe` from the game. All its cities and units are removed.



### makeAggression
```
function civ.makeAggression(who: tribeObject, whom: tribeObject)
```
Cancels any peace treaties between tribe `who` and tribe `whom`, and make `who` declare war on `whom`.

@*param* `who` — The tribe declaring war.

@*param* `whom` — The tribe not declaring war.



### playMusic
```
function civ.playMusic(trackOrFilename: string|integer)
```
Plays CD track `trackNo`, or with the DirectShow music patch enabled, play the file given by `filename`, where `filename` is relative to the 'Music' directory.

@*param* `trackOrFilename` — Track number of cd or filename of music.



### playSound
```
function civ.playSound(filename: string)
```
Plays the sound file given by `filename`.



### playVideo
```
function civ.playVideo(filename: string)
```
Plays the video file given by `filename`.



### removeImprovement
```
function civ.removeImprovement(city: cityObject, improvement: improvementObject)
```
Removes city improvement `improvement` from city `city`.



### sleep
```
function civ.sleep(milliseconds: integer)
```
Sleeps for the given number of milliseconds.



### takeTech
```
function civ.takeTech(tribe: tribeObject, tech: techObject, collapse?: boolean)
```
Takes away tech `tech` from tribe `tribe`, the optional `collapse` parameter determines whether to take away all techs that have `tech` as a prerequisite somewhere up the tree.

@*param* `collapse` — false by default



### teleportUnit
```
function civ.teleportUnit(unit: unitObject, tile: tileObject)
```
Teleports (i.e. moves at no cost) unit `unit` to tile `tile`. The unit is moved regardless of whether it is a valid location for the unit. To check this, see `civ.canEnter` and `civlua.isValidUnitLocation`.







## civ.ui

### centerView
```
function civ.ui.centerView(tile: tileObject)
```
Centers the map on the given tile.



### createDialog
```
function civ.ui.createDialog()
  -> dialog: dialogObject
```
Creates and initializes a dialog. See the dialog section for more details.



### loadImage
```
function civ.ui.loadImage(filename: string, x: integer, y: integer, width: integer, height: integer)
  -> image: imageObject
```
Loads an image (BMP or GIF) from `filename`. Optionally accepts `x`, `y`, `width` and `height` to load part of the image.

@*param* `x` — pixel (x,y) is the top left corner of sub image

@*param* `y` — pixel (x,y) is the top left corner of sub image

@*param* `width` — width of sub image

@*param* `height` — height of sub image



### loadTerrain
```
function civ.ui.loadTerrain(map: integer|mapObject, filename1: string, filename2: string)
```
Replaces terrain graphics for map number `map`, loading graphics from `filename1` (corresponding to "TERRAIN1.BMP") and `filename2` (corresponding to "TERRAIN2.BMP")



### redrawMap
```
function civ.ui.redrawMap()
```
Redraws the entire map.



### redrawTile
```
function civ.ui.redrawTile(tile: tileObject)
```
Redraws the given tile.



### setZoom
```
function civ.ui.setZoom(integer: integer)
```
Sets the zoom level (range from -7 (max zoom out) to 8 (max zoom in)).



### text
```
function civ.ui.text(string: string, ...string)
```
Display a pop-up text box with the given string as text.

@*param* `string` — text to show in a text box

@*param* `...` — more text



### zoomIn
```
function civ.ui.zoomIn()
```
Zooms in on the map (increases zoom level by 1).



### zoomOut
```
function civ.ui.zoomOut()
```
Zooms out of the map (decreases zoom level by 1).







## civ.cosmic

### communismPalaceDistance
```
civ.cosmic.communismPalaceDistance --> integer
```
(get/set - ephemeral) Returns the distance from palace used in happiness calculations under Communism.



### foodEaten
```
civ.cosmic.foodEaten --> integer
```
(get/set - ephemeral) Returns the amount of food eaten by each citizen each turn.



### foodRows
```
civ.cosmic.foodRows --> integer
```
(get/set - ephemeral) Returns the number of rows in the food box.



### goodieHutsMask
```
civ.cosmic.goodieHutsMask --> bitmask
```
(get/set - ephemeral) Returns the bitmask for goodie huts.



### helisPickupHuts
```
civ.cosmic.helisPickupHuts --> integer
```
(get/set - ephemeral) Returns whether helicopters (domain 1, range 0 units) pick up huts or not.



### massThrustParadigm
```
civ.cosmic.massThrustParadigm --> integer
```
(get/set - ephemeral) Returns the mass/thrust paradigm.



### numberOfUnitTypes
```
civ.cosmic.numberOfUnitTypes --> integer
```
(get) Returns the number of unit types from the @COSMIC2 key of the same name.



### paradropRange
```
civ.cosmic.paradropRange --> integer
```
(get/set - ephemeral) Returns the maximum paradrop range.



### penaltyBetrayal
```
civ.cosmic.penaltyBetrayal --> integer
```
(get/set - ephemeral) Returns the penalty to the civilization score for each betrayal of another tribe.



### prodChangePenalty
```
civ.cosmic.prodChangePenalty --> integer
```
(get/set - ephemeral) Returns the shield penalty percentage for changing production types.



### riotFactor
```
civ.cosmic.riotFactor --> integer
```
(get/set - ephemeral) Returns the riot factor based on the number of cities.



### roadMultiplier
```
civ.cosmic.roadMultiplier --> integer
```
(get/set - ephemeral) Returns the road movement multiplier.



### scienceLostFundamentalism
```
civ.cosmic.scienceLostFundamentalism --> integer
```
(get/set - ephemeral) Returns the percentage of science lost under Fundamentalism.



### scienceRateFundamentalism
```
civ.cosmic.scienceRateFundamentalism --> integer
```
(get/set - ephemeral) Returns the maximum effective science rate under Fundamentalism.



### scoreCentauri
```
civ.cosmic.scoreCentauri --> integer
```
(get/set - ephemeral) Returns the civilization score for each landing on Alpha Centauri first. Multiplied by number of habitats and success probability.



### scoreCitizen
```
civ.cosmic.scoreCitizen --> integer
```
(get/set - ephemeral) Returns the civilization score for each citizen.



### scoreFutureTech
```
civ.cosmic.scoreFutureTech --> integer
```
(get/set - ephemeral) Returns the civilization score for each future technology researched.



### scorePeace
```
civ.cosmic.scorePeace --> integer
```
(get/set - ephemeral) Returns the civilization score for each turn of peace after turn 199.



### scorePollution
```
civ.cosmic.scorePollution --> integer
```
(get/set - ephemeral) Returns the civilization score for each extant non-AI controlled polluted tile. Normally a negative value, i.e. a penalty.



### scoreUnitKilled
```
civ.cosmic.scoreUnitKilled --> integer
```
(get/set - ephemeral) Returns the civilization score for each unit killed.



### scoreWonder
```
civ.cosmic.scoreWonder --> integer
```
(get/set - ephemeral) Returns the civilization score for each wonder.



### settlersEatHigh
```
civ.cosmic.settlersEatHigh --> integer
```
(get/set - ephemeral) Returns the amount of food eaten by settlers for governments ≥ Communism.



### settlersEatLow
```
civ.cosmic.settlersEatLow --> integer
```
(get/set - ephemeral) Returns the amount of food eaten by settlers for governments ≤ Monarchy.



### shieldRows
```
civ.cosmic.shieldRows --> integer
```
(get/set - ephemeral) Returns the number of rows in the shield box.



### sizeAquaduct
```
civ.cosmic.sizeAquaduct --> integer
```
(get/set - ephemeral) Returns the city size that cannot be exceeded without an Aquaduct.



### sizeSewer
```
civ.cosmic.sizeSewer --> integer
```
(get/set - ephemeral) Returns the city size that cannot be exceeded without a Sewer System.



### sizeUnhappiness
```
civ.cosmic.sizeUnhappiness --> integer
```
(get/set - ephemeral) Returns the city size at which the first unhappy citizen appears at Chieftain difficulty.



### supportCommunism
```
civ.cosmic.supportCommunism --> integer
```
(get/set - ephemeral) Returns the number of units that are free of support under Communism.



### supportFundamentalism
```
civ.cosmic.supportFundamentalism --> integer
```
(get/set - ephemeral) Returns the number of units that are free of support costs under Fundamentalism.



### supportMonarchy
```
civ.cosmic.supportMonarchy --> integer
```
(get/set - ephemeral) Returns the number of units that are free of support under Monarchy.



### techParadigm
```
civ.cosmic.techParadigm --> integer
```
(get/set - ephemeral) Returns the tech paradigm. Scenarios use civ.scen.params.techParadigm instead of this value.



### transformBase
```
civ.cosmic.transformBase --> integer
```
(get/set - ephemeral) Returns the base time needed for engineers to transform terrain.



### triremeLost
```
civ.cosmic.triremeLost --> integer
```
(get/set - ephemeral) Returns the 1 in x chance of a trireme getting lost at sea.







## civ.game

### activeTribes
```
civ.game.activeTribes --> bitmask
```
(get/set) Returns the active tribe mask.



### barbarianActivity
```
civ.game.barbarianActivity --> integer
```
(get/set) Returns the level of barbarian activity.



### difficulty
```
civ.game.difficulty --> integer
```
(get/set) Returns the difficulty level.



### gameYear
```
civ.game.gameYear --> integer
```
(get/set) Returns the game year, or for scenarios with monthly increments, the number of months * 12.



### humanPlayers
```
civ.game.humanPlayers --> bitmask
```
(get/set) Returns the human players mask.



### humanTribe
```
civ.game.humanTribe --> tribeObject
```
(get) Returns the last active human tribe.



### peaceTurns
```
civ.game.peaceTurns --> integer
```
(get/set) Returns the number of turns of peace.



### revealMap
```
civ.game.revealMap --> boolean
```
(get/set) Returns whether or not the full map is revealed.



### turnsElapsed
```
civ.game.turnsElapsed --> integer
```
(get/set) Returns the number of turns elapsed.







## civ.game.rules

### flatWorld
```
civ.game.rules.flatWorld --> boolean
```
(get/set) Returns `true` if the world map is flat, `false` otherwise.







## civ.scen.params

### decisiveDefeat
```
civ.scen.params.decisiveDefeat --> integer
```
(get/set) Number of objectives required for a decisive defeat.



### decisiveVictory
```
civ.scen.params.decisiveVictory --> integer
```
(get/set) Number of objectives required for a decisive victory.



### flags
```
civ.scen.params.flags --> bitmask
```
(get/set) Bitmask representing scenario flags:<br> <br>00000000 00000001 Total war <br>00000000 00000010 Use objective victory <br>00000000 00000100 Count wonders as objectives <br>00000000 00001000 Reveal cities <br>00000000 00010000 No government change <br>00000000 00100000 No tech conquest <br>00000000 01000000 No pollution <br>00000000 10000000 Terrain animation lockout <br>00000001 00000000 Unit animation lockout <br>00000010 00000000 .SPR file override <br>10000000 00000000 WWII AI



### marginalDefeat
```
civ.scen.params.marginalDefeat --> integer
```
(get/set) Number of objectives required for a marginal defeat.



### marginalVictory
```
civ.scen.params.marginalVictory --> integer
```
(get/set) Number of objectives required for a marginal victory.



### maxTurns
```
civ.scen.params.maxTurns --> integer
```
(get/set) Maximum number of turns before the scenario ends.



### name
```
civ.scen.params.name --> string
```
(get/set) The name of the scenario.



### objectivesProtagonist
```
civ.scen.params.objectivesProtagonist --> tribeObject
```
(get/set) Returns the objectives protagonist.



### startingYear
```
civ.scen.params.startingYear --> integer
```
(get) Returns the starting year of the scenario.



### techParadigm
```
civ.scen.params.techParadigm --> integer
```
(get/set) Returns the tech paradigm used by the scenario. Non-scenario games use civ.cosmic.techParadigm instead of this value.



### yearIncrement
```
civ.scen.params.yearIncrement --> integer
```
(get/set) Returns the year increment (number of years per turn). Negative for monthly increments.







## civ.scen.compatibility

### activateUnitEveryMove
```
civ.scen.compatibility.activateUnitEveryMove --> boolean
```
If set to true, onActivateUnit will re-trigger for every tile the active unit moves. Defaults to false, in which case onActivateUnit triggers only once.  In the Lua Scenario Template, this is set to true in LuaParameterFiles\parameters.lua.







## civ.scen

### onActivateUnit
```
function civ.scen.onActivateUnit(code: fun(unit: unitObject, source: boolean, repeatMove: boolean))
```
Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. `source` is `true` if activated by keyboard or mouse click, `false` if activated by the game itself. `repeatMove` is `true` if it's a repeat activation caused by moving (see civ.scen.compatibility), `false` otherwise.



### onBribeUnit
```
function civ.scen.onBribeUnit(code: fun(unit: unitObject, previousOwner: tribeObject))
```
Registers a function that is called when a unit is bribed successfully. unit.owner is the new owner at this point, `previousOwner` the old owner.



### onCalculateCityYield
```
function civ.scen.onCalculateCityYield(code: fun(city: cityObject, food: integer, shields: integer, trade: integer):(foodChange: integer, shieldChangeBeforeWaste: integer, shieldChangeAfterWaste: integer, tradeChangeBeforeCor...(too long)...: integer))
```
Registers a function to be called every time a city calculates its total resource yield. Input is the city, and the food, shields and trade of its tiles. Returns a 5-tuple of modifiers, food change, shield change before waste, shield change after waste, trade change before corruption, trade change after corruption. These modifiers are applied at the following points in the calculation:
<br>Calculate yield from all worked tiles
<br>Run onCalculateCityYield
<br>Add foodChange, shieldChangeBeforeWaste and tradeChangeBeforeCorruption
<br>Add changes from food trade routes
<br>Add shields from improvements
<br>Calculate and subtract waste
<br>Calculate corruption and add changes from commodity trade routes
<br>Calculate corruption again (now using the value after trade routes) and subtract.
<br>Add shieldChangeAfterWaste and tradeChangeAfterCorruption
<br>Calculate Tax/Lux/Sci



### onCanBuild
```
function civ.scen.onCanBuild(code: fun(defaultBuildFunction: fun(city: cityObject, item: improvementObject|unitTypeObject|wonderObject):(cityCanBuildItemByDefault: boolean, city: cityObject, item: improvementObject|...(too long)...: boolean))
```
Registers a function to be called every time a check is done whether a city can build something or not. It is called for all unit types, improvements and wonders. The first parameter of the callback is the default build function, as implemented by the game. It takes the city and item as parameters. You can call this to produce a result for cases you don't need to handle yourself. `item` can be a unittype, improvement or wonder.
Return `true` if `city` is allowed to produce `item`, `false` if not. 




### onCanFoundCity
```
function civ.scen.onCanFoundCity(code: fun(unit: unitObject, advancedTribe: boolean):boolean)
```
Registers a function that is called to determine if `unit` can found a city at the unit's location. `advancedTribe` is `true` when picking up a hut with `unit` triggers an advanced tribe. Return `true` to allow, `false` to disallow.




### onCentauriArrival
```
function civ.scen.onCentauriArrival(code: fun(tribe: tribeObject))
```
Registers a function that is called when a tribe's spaceship reaches its target. Just registering this function causes the game to not end at this point ("endgame override").




### onChooseDefender
```
function civ.scen.onChooseDefender(code: fun(defaultFunction: fun(tile: tileObject, attacker: unitObject):(chosenUnit: unitObject), tile: tileObject, attacker: unitObject, isCombat: boolean):(chosenUnit: unitObject))
```
Registers a function that is called every time a unit is chosen to defend a tile. The first parameter is the default function as implemented by the game. It takes `tile` and `attacker` as parameters. You can call this to produce a result for cases you don't need to handle yourself. The second parameter is the tile that's being considered, the third is the attacking unit, and the fourth, `isCombat`, is a boolean that indicates if this invocation will be followed by combat. This function is also called by the AI to determine its goals, in which case `isCombat` is false.




### onCityDestroyed
```
function civ.scen.onCityDestroyed(code: fun(city: cityObject))
```
Registers a function that is called when a city is destroyed.




### onCityFounded
```
function civ.scen.onCityFounded(code: fun(city: cityObject)|fun(city: cityObject):fun())
```
Registers a function to be called every time a city is founded. The callback takes the city as a parameter, and can optionally return a function (since 0.18) that is called to perform cleanup when the user cancels founding the city.




### onCityProcessingComplete
```
function civ.scen.onCityProcessingComplete(code: fun(turn: integer, tribe: tribeObject))
```
Registers a function that is called when a tribe's cities have been processed for that turn. See `onTurn` for interaction with other "turn" triggers.




### onCityProduction
```
function civ.scen.onCityProduction(code: fun(city: cityObject, prod: improvementObject|unitObject|wonderObject))
```
Registers a function that is called when a city completes its production order. The produced item `prod` is either a unit, improvement or wonder (this can be checked with the civ.is* functions).




### onCityTaken
```
function civ.scen.onCityTaken(code: fun(city: cityObject, defender: tribeObject))
```
Registers a function that is called when a city is captured. `city` is the city changing hands, at this point city.owner is the new owner already. `defender` is the old owner.




### onGameEnds
```
function civ.scen.onGameEnds(code: fun(reason: gameEndReasons):(gameIsOver: boolean))
```
Registers a function that is called when the game ends. `reason` is an integer between 1 and 6:
<br>1 and 2 - Space race victory. This does not trigger if `onCentauriArrival` has a callback registered. 1 means victory by active player.
<br>3 - Conquest victory
<br>4 - Defeat
<br>5 - Retirement
<br>6 - Macro ENDGAME action
<br>Return `true` to end the game, `false` to keep playing.




### onGetFormattedDate
```
function civ.scen.onGetFormattedDate(code: fun(turn: integer, defaultDateString: string):(displayedDate: string))
```
Registers a function that is called when the game needs to get the date string for a given turn (e.g. "4000 B.C." for turn 1). `turn` is the turn for which the date is requested (not always the current turn), and `defaultDateString` is the string as formatted by the game




### onGetRushBuyCost
```
function civ.scen.onGetRushBuyCost(code: fun(city: cityObject, defaultCost: integer):(costToComplete: integer))
```
Registers a function that is called when calculating the cost to rush-buy a city's current production. It takes the city and the cost as calculated by the game as parameters. Returns an integer representing the new costs.




### onInitiateCombat
```
function civ.scen.onInitiateCombat(code: fun(attacker: unitObject, defender: unitObject, attackerDie: integer, attackerPower: integer, defenderDie: integer, defenderPower: integer, isSneakAttack: boolean):thread)
```
Registers a function to be called every time combat is initiated. The callback takes seven parameters, the attacker, the defender, attackerDie ('die' as in dice, the attacker's chance to hit), attackerPower (attacker's firepower), defenderDie, defenderPower and isSneakAttack. Returns a coroutine that yields every time it wants to process a round, and returns when it wants combat to end. Example:

```lua
civ.scen.onInitiateCombat(function (attacker, defender, attackerDie, attackerPower, defenderDie, defenderPower)
  print("Attacker's die: 1d" .. attackerDie .. ", firepower: " .. attackerPower)
  print("Defender's die: 1d" .. defenderDie .. ", firepower: " .. defenderPower)
  return coroutine.create(function ()
    local round = 0
    while (round < 5 and attacker.hitpoints >= 0 and defender.hitpoints >= 0) do
      print("Round " .. round)
      print(attacker, defender)
      if round % 2 == 0 then
        attacker.damage = attacker.damage + 2
        coroutine.yield(true, defender) -- either attacker or defender
      else
        print("Attack bonus!")
        result = coroutine.yield(false, attackerDie * 2, attackerPower * 2)
        print(result.winner, result.attackerRoll, result.defenderRoll, result.reroll)
      end
      round = round + 1
    end
    print("End of combat")
  end)
end)
```

This example shows how to limit combat to five rounds, damages the attacker on even rounds and doubles the attacker's values on odd rounds.

If the coroutine yields true as its first value, the game's default combat resolution is skipped for that round and the designer is responsible for updating damage. The second value yielded is either the attacker or the defender, this is used to render animations etc. In this case the coroutine resumes without any values.

If the coroutine yields false as its first value, the game runs its default combat algorithm. The designer can additionally yield modified values for attackerDie, attackerPower, defenderDie and defenderPower (in this order) which will be used by the game for that round. In this case the coroutine resumes with the result of the round, a table containing four values:
- winner, this is either attacker or defender.
- attackerRoll, the result of the attacker's die roll
- defenderRoll, the result of the defender's die roll
- reroll, true if a reroll happened. 

This can happen only if the attacker is tribe 0, the defender is a unit guarding a city, and the city is the capital or the tribe has less than 8 cities in total and the attacker's die roll is higher than the defender's. A reroll can happen at most once.




### onKeyPress
```
function civ.scen.onKeyPress(code: function)
```
Registers a function to be called every time a key is pressed.


@*param* `code` — (keyCode:integer)



### onLoad
```
function civ.scen.onLoad(code: fun(savedData: string))
```
Registers a function that is called when the game is loaded.




### onNegotiation
```
function civ.scen.onNegotiation(code: fun(talker: tribeObject, listener: tribeObject):(canTalk: boolean))
```
Registers a function that is called when two tribes attempt negotiations. `talker` is the tribe initiating the contact, `listener` the receiver. Return `true` to allow the negotiations to commence, `false` to deny.




### onResolveCombat
```
function civ.scen.onResolveCombat(code: fun(defaultResolutionFunction: fun(defender: unitObject, attacker: unitObject):(combatContinues: boolean), defender: unitObject, attacker: unitObject):(combatContinues: boolean))
```
Registers a function to be called during every combat turn. The first parameter of the callback is the default resolution function, as implemented by the game. It takes the attacker and defender as parameters. You can call this to produce a result for cases you don't need to handle yourself.
Return `true` to continue combat, `false` to stop.

See onInitiateCombat for replacement.




### onSave
```
function civ.scen.onSave(code: fun():(savedData: string))
```
Registers a function that is called when the game is saved.




### onScenarioLoaded
```
function civ.scen.onScenarioLoaded(code: fun())
```
Registers a function that is called when the scenario is loaded.  (This is whenever a game is loaded, not just when the scenario is started.)




### onSchism
```
function civ.scen.onSchism(code: fun(tribe: tribeObject):(allowSchism: boolean))
```
Registers a function that is called when a schism is triggered. This happens when the capital of a AI-controlled tribe with more than four cities is captured, and, if the attacker is human-controlled, it is ranked lower in power than the defender. If the attacker is AI-controlled the best human tribe must be ranked lower than the defender for the schism to trigger.
If the schism is allowed, a new tribe will be created that takes over about half the cities of the old tribe. If no new tribe can be created, the schism does not occur.
Return `true` to allow the schism to happen, `false` to deny.




### onSelectMusic
```
function civ.scen.onSelectMusic(code: fun(track: integer|nil):integer|nil)
```
Registers a function that is called when a new music track is to be played. `track` is either nil or an integer. If nil, the game wants to play a random track, if not nil it's either due to the user choosing a track from the menu (first track has id 0), or the game playing one of it's special tracks ("Funeral March" - track id 0, and "Ode to Joy" - track id 1). To handle special tracks, you can return nil to signal that the game should play the default track associated with that track id. If you want to handle this track id, call civ.playMusic (this will check the Music folder of the scenario first before falling back to the global Music folder) and return an integer, which is used to synchronize the track list in the menu. The track names can be added in @PICKMUSICTOT in Game.txt.




### onTribeTurnBegin
```
function civ.scen.onTribeTurnBegin(code: fun(turn: integer, tribe: tribeObject))
```
Registers a function that is called at the start of a tribe's turn. See `onTurn` for interaction with other "turn" triggers.




### onTribeTurnEnd
```
function civ.scen.onTribeTurnEnd(code: fun(turn: integer, tribe: tribeObject))
```
Registers a function that is called at the end of a tribe's turn. See `onTurn` for interaction with other "turn" triggers.




### onTurn
```
function civ.scen.onTurn(code: fun(turn: integer))
```
Registers a function that is called at the start of a turn. The basic sequence of this and other "turn" triggers is as follows:
<br>`onTurn` fires
<br>Non-tribe-specific updates take place
<br>`onTribeTurnBegin` fires for tribe 0.
<br>Tribe 0 cities are processed.
<br>`onCityProcessingComplete` fires for tribe 0 (this fires even when a tribe has no cities).
<br>Tribe 0 units move
<br>`onTribeTurnEnd` fires for tribe 0.
<br>All active tribes are processed in order according to the sequence for tribe 0
<br>`onTribeTurnEnd` fires for tribe 7.
<br>`onTurn` fires for the next turn




### onUnitKilled
```
function civ.scen.onUnitKilled(code: fun(loser: unitObject, winner: unitObject))
```
Registers a function that is called whenever a unit is killed. `loser` is the unit that is killed, `winner` is the unit responsible for it.




### onUseNuclearWeapon
```
function civ.scen.onUseNuclearWeapon(code: fun(unit: unitObject, tile: tileObject):(attackProceeds: boolean))
```
Registers a function that is called when a nuclear weapon is used. This is also called when a spy plants a nuclear device in a city. `unit` is the weapon or the spy unit, `tile` is the location of the attack. Return `false` to abort the attack, `true` to proceed.






