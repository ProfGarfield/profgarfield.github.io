---
layout: page
title: General Library
tabTitle: gen.lua Documentation
minTOC: 2
maxTOC: 3
---

# gen

The General Library offers a variety of tools to make it easier to build events. To access functions from the General Library, you should include the following line at the top of your file:
```lua
local gen = require("generalLibrary")
```



## Generally Useful Functions

These functions are generally useful for creating events.

### createUnit
```
function gen.createUnit(unitType: unitTypeObject, tribe: tribeObject, locations: table|table<integer, table|tileObject>|tileObject, options: table)
  -> table
```
This is a createUnit function, meant to supersede civlua.createUnit.
Returns a table of units, indexed by integers starting at 1 (unless no units were created.

@*param* `unitType` — The type of unit to create.

@*param* `tribe` — The owner of the new unit or units.

@*param* `locations` — locations is one of the following:<br><br>tileObject<br>{xCoord,yCoord}<br>{xCoord,yCoord,zCoord}<br>{x=xCoord,y=yCoord}<br>{x=xCoord,y=yCoord,z=zCoord}<br>table<integer,above_types>

@*param* `options` — options is a table with the following keys: <br><br> count : integer\\|nil <br> The number of units to create.  `nil` means 1.<br><br>randomize : boolean\\|nil <br> If true, randomize the list of locations.  If false or nil, try to place at the tile with the smallest index in the table first.<br><br>scatter : boolean\\|nil <br> If true, and if randomize is true, each unit is created on a random tile in the location table.<br><br>inCapital : boolean\\|nil <br> If true, attempt to place in the capital before other locations.  IN case of multiple capitals, capitals are ranked with smallest city id first.  randomize/scatter applies to list of capitals if this is selected.<br><br>veteran : boolean\\|number\\|nil <br> If true, make the created units veteran.  If a fraction between 0 and 1, each unit has this probability of being veteran.  If number 1 or more, this many of the count are made veteran (take floor).  If nil or false, no veterans.<br><br>homeCity : city\\|true\\|nil <br> If city, that city is the home city.  If true, the game selects the home city (probably the way a city is chosen if you crate a unit using the cheat menu).  If nil, no home city.<br><br>overrideCanEnter : boolean\\|nil <br> If true, the units will be placed even if unitType : canEnter(tile) returns false.  False or nil means follow the restriction.  civ.canEnter appears to check if the terrain is impassible, or if the unit can cross impassible.<br><br>overrideDomain : boolean\\|nil <br> If true, sea units can be created on land outside cities, and land units at sea.  False or nil means units can only be created where they could travel naturally.<br><br>overrideDefender : boolean\\|nil <br> If true, unit can be placed on tiles with enemy units or cities.  False or nil means the tile must have no enemy city, and no enemy defender.



### copyUnitAttributes
```
function gen.copyUnitAttributes(parent: unitObject, child: unitObject)
```
 Copies the attributes of the `parent` unit to the `child` unit.
 All attributes accessible through lua are copied (except unit type,
 and unit id number)
  Useful if a unit's type must be changed (by creating a new unit), but everything
  else should stay the same

@*param* `parent` — The unit giving the attributes.

@*param* `child` — The unit receiving the attributes.



### defeatUnit
```
function gen.defeatUnit(loser: unitObject, winner: unitObject, aggressor: unitObject, victim: unitObject, loserLocation: tileObject, winnerVetStatus: boolean, loserVetStatus: boolean)
  -> survivingDemotedUnit: unitObject|nil
```
 "Defeats" the loser, deletes the loser, and returns a unit if and only if the loser was demoted, otherwise nil is returned.
 Runs the events for unit defeat, death, and deletion.



### killUnit
```
function gen.killUnit(dyingUnit: unitObject)
```
 "Kills" the dying unit, running events for 'death', 'death outside combat', and 'deletion'.



### deleteUnit
```
function gen.deleteUnit(deletedUnit: unitObject, replacementUnit: unitObject|nil)
```
 Deletes the deleted unit.
 I the unit is being 'replaced', the replacing unit must be provided.
 Runs events associated with unit deletion.
>void



### replaceUnit
```
function gen.replaceUnit(oldUnit: unitObject, replacementType: unitTypeObject)
  -> unitObject
```
 Creates a unit to replace the old unit, 
 copies the old unit's attributes, and
 deletes the old unit (applying the deletion function).
 Returns the newly created unit.
comment



### limitedExecutions
```
function gen.limitedExecutions(key: string|integer, maxTimes: integer, limitedFunction: fun())
```
 If the value at key is less than maxTimes, limitedFunction will execute,
 and the value at key will increment by 1.
 Otherwise, don't execute limitedFunction.
 Note: limitedFunction()-->void
 
 Example: Volunteers will be created in a capital up to 3 times for a certain trigger.
```lua
gen.limitedExecutions("Tribe 1 Volunteers",3, function()
    text.simple("Young men flock to Washington to fight the South.")
    gen.createUnit(gen.original.uRiflemen, object.pUnion, object.lWashington, {})
end)
```

@*param* `key` — The key for this limited execution

@*param* `maxTimes` — The number of times the limited function will be executed

@*param* `limitedFunction` — The function to execute a maximum number of times.



### justOnce
```
function gen.justOnce(key: any, limitedFunction: any)
```
 If justOnce has never been executed for this key before, then
 the limited function will execute.  Otherwise, it won't.
 (Wrapper for gen.limitedExecutions with maxTimes being 1.)
 Example: Show a message once for a certain trigger
```lua
gen.justOnce("Rebel Attack", function()
    text.simple("The Rebels have attacked Union troops.  We're now in a shooting war!","Secretary of Defense")
end)
```



### isWonderActiveForTribe
```
function gen.isWonderActiveForTribe(wonder: integer|wonderObject, tribe: integer|tribeObject)
  -> wonderIsActive: boolean
```
 Returns true if the `wonder` is owned by the `tribe` and is not expired, and false otherwise.
 Integers corresponding to wonder/tribe ids can be used as arguments instead.
 revisions by Knighttime, 2021-11-12

@*param* `wonder` — the wonder (or id of wonder) in question

@*param* `tribe` — the tribe (or id of tribe) in question



### distance
```
function gen.distance(itemA: table|cityObject|tileObject|unitObject, itemB: table|cityObject|tileObject|unitObject, zDist?: integer)
  -> integer
```
 Takes two objects and a 'vertical distance' (0 if absent)
 and computes the distance between them.  
 zDist is the number of tiles that one unit of z coordinate "distance" is equivalent to
 Computes the distance you would get by counting tiles.
 If you want the game's approximation of "Euclidean" distance that
 is used in many game mechanics, use gen.gameMechanicDistance

@*param* `itemA` — Can be:<br><br>tileObject<br><br>unitObject<br><br>cityObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)

@*param* `itemB` — Can be:<br><br>tileObject<br><br>unitObject<br><br>cityObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)

@*param* `zDist` — The distance between tiles with same x,y coordinates but differing in z by 1. 0 by default.



### tileDist
```
function gen.tileDist(tileA: tileObject, tileB: tileObject, zDist?: integer)
  -> integer
```
 Takes two tiles and a 'vertical distance' (0 if absent)
 and computes the distance between them.
 Doesn't pre-process arguments like gen.distance, so might be slightly
 quicker (though this probably too trivial to ever matter).
 Computes the distance you would get by counting tiles.
 If you want the game's approximation of "Euclidean" distance that
 is used in many game mechanics, use gen.gameMechanicDistance

@*param* `zDist` — The distance between tiles with same x,y coordinates but differing in z by 1. 0 by default.



### gameMechanicDistance
```
function gen.gameMechanicDistance(itemA: table|cityObject|tileObject|unitObject, itemB: table|cityObject|tileObject|unitObject)
  -> integer
```
 gen.gameMechanicDistance(itemOnMap1,itemOnMap2)
  provides a distance measure that is believed to be used
  for internal distance calculations (such as caravan payments
  or city corruption)
  This distance is scaled to match the "Communism Palace Distance",
  (based on the corruption work by Knighttime)
  Diagonal movement is "1" distance, corner to corner is 1.5 (rounded down)

@*param* `itemA` — Can be:<br><br>tileObject<br><br>unitObject<br><br>cityObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)

@*param* `itemB` — Can be:<br><br>tileObject<br><br>unitObject<br><br>cityObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### fullHealthMovementAllowance
```
function gen.fullHealthMovementAllowance(unit: unitObject)
  -> atomicMovementPoints: integer
```
 Returns the movement allowance of a unit after
 taking into account Nuclear Power tech, Magellan's Expedition, and Lighthouse.
 Returns "atomic" movement points (that is, the movement recorded by `unit.moveSpent`, or "regular" movement points * `totpp.movementMultipliers.aggregate`



### maxMoves
```
function gen.maxMoves(unit: unitObject)
  -> atomicMovementPoints: integer
```
 Returns movement allowance for a unit after taking damage
 into account.
 Returns "atomic" movement points (that is, the movement recorded by `unit.moveSpent`, or "regular" movement points * `totpp.movementMultipliers.aggregate`



### moveRemaining
```
function gen.moveRemaining(unit: unitObject)
  -> atomicMovementPoints: integer
```
 Returns gen.maxMoves-unit.moveSpent
 bug fixed by Knighttime



### inPolygon
```
function gen.inPolygon(tile: tileObject, tableOfCoordinates: table)
  -> tileIsInPolygon: boolean
```
 The table of coordinates defines the corners of the
 polygon.  Returns true if the tile is within the
 polygon defined by the table of coordinates, and
 false otherwise.  Checking that the map is correct
 must be done separately
 The entry: `tableOfCoordinates.doesNotCrossThisX`
 sets an x coordinate that the polygon does not
 cross.  If absent, 0 is used,
 meaning the polygon shouldn't cross the "date line".
<br> Press CTRL+SHIFT+F4 and select the 'Start the Polygon Script' option to generate polygons.

@*param* `tile` — The tile to check

@*param* `tableOfCoordinates` — Table of {[1]=xCoord, [2]=yCoord} without gaps in the integer keys.



### getRandomTileInPolygon
```
function gen.getRandomTileInPolygon(polygonTable: table, map?: integer, maxAttempts?: integer)
  -> tileObject
```
Generates a random tile within the polygon defined
by the table of coordinates (same as used by gen.inPolygon
and generated by the Polygon Script found in CTRL+SHIFT+F4).
Map is the map of the tile generated (0 by default).
This code is probabalistic, so after maxAttempts, the first
polygon coordinate is returned, and a text box displayed.
The console prints the polygon that caused the issue.

  Inspired by Pablostuka

@*param* `polygonTable` — a table of coordinate pairs

@*param* `map` — The map for the random tile (default 0)

@*param* `maxAttempts` — the number of attempts to find an eligible square (default 100)



### cityCanSupportAnotherUnit
```
function gen.cityCanSupportAnotherUnit(city: cityObject)
  -> boolean
```
Returns true if the city has enough production to support all existing units and at least one other unit.
Units that get free support under fundamentalism are still counted as
"supported", since they still take up a free support "slot" if they are
among the first 8 units supported by the city.



### homeToNearestCity
```
function gen.homeToNearestCity(unit: unitObject)
```
  Finds the nearest city (of the same tribe) that can support another
  unit, and sets the unit's home city to that city.
  If there is no suitable city, the unit's home city isn't changed.
 <br> Note: This counts the number of squares between the unit and the city, and ignores map differences.  This is not suitable for all applications (e.g. if maps are not "stacked", or if you're trying to re-create an existing game mechanic).



### unitTypeOnTile
```
function gen.unitTypeOnTile(tile: tileObject, unitTypeTable: table<any, unitTypeObject>|unitTypeObject, excludeFromCheck?: table<any, unitObject>|unitObject)
  -> boolean
```
Returns true if tile has any of the unit types listed in the table,
false otherwise. A unit or units can be excluded from the check.

@*param* `tile` — The tile to try to find specific unit types on.

@*param* `unitTypeTable` — The unit type or types to check for.

@*param* `excludeFromCheck` — These units are excluded from the check.  If they are of a matching unit type, the function still won't return true.  (Unless a different unit has a matching type.)



### getAdjacentTiles
```
function gen.getAdjacentTiles(tile: table|tileObject)
  -> tileTable: table<integer, tileObject>
```
 Returns a table (indexed by integers) with all adjacent
 tiles to the input tile.  Note: some keys will have nil values
 if the tile is on the edge of the map.

@*param* `tile` — if table, should be a coordinate pair or triple

@*return* `tileTable` — table of adjacent tiles



### moveUnitAdjacent
```
function gen.moveUnitAdjacent(unit: unitObject, destRankFn?: fun(unit: unitObject, tile: tileObject):integer|false)
  -> destination: tileObject|false
```
 Moves the unit to an adjacent tile, choosing the tile based on  
 `destRankFn(unit,tile)--> integer or false`.
 Lower values mean preferred tiles, false means unit can't move to tile.
 Default is prefer empty squares before squares with units on them.
 Returns the tile the unit is moved to, or false if the unit can't be moved.

@*param* `destRankFn` — If the unit can be placed on the tile, return an integer (lower being more preferred).  If it can't, return false.

@*return* `destination` — The tile the unit was moved to, or false if it could not be moved.

```lua
-- A tile object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a map "square" in the game, and provides a means of interacting with it.
-- [Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#tile)
destination:
    \| false
```



### unprotectTile
```
function gen.unprotectTile(tile: tileObject, isProtectingUnit: fun(unit: unitObject):boolean, isProtectedUnit: fun(unit: unitObject):boolean, isProtectedTile: fun(tile: tileObject):boolean, destRankFn?: fun(unit: unitObject, tile: tileObject):integer|false)
```
 `isProtectingUnit(unit)-->bool`
 if true, the unit is a 'protecting' unit that must be moved
 e.g. air units with range >= 2 in air protected stacks
 <br>`isProtectedUnit(unit)-->bool`
 if true, the unit is a 'protected' unit, meaning that 'protecting' units
 must be moved off square if one is on it
 e.g. land and sea units in air protected stacks
 <Br>`isProtectedTile(tile)-->bool`
 if true, the protecting unit must be moved, if not it can stay
 e.g. clear tiles are true in air protected stacks,
 cities, airbases, tiles with carriers return false for air protected stacks
 <br>`destRankFn(unit,tile)--> integer or false`.
 The choice on where to move protecting units is based on this function.
 Lower values mean preferred tiles, false means unit can't move to tile.
 Default is prefer empty squares before squares with units on them.

@*param* `isProtectingUnit` — Returns true if the unit is a "protecting" unit that must be moved, false otherwise.

@*param* `isProtectedUnit` — Returns true if the unit is a unit that can be "protected" by protecting units, false otherwise.

@*param* `isProtectedTile` — Returns true if units can be protected on this tile, false otherwise.

@*param* `destRankFn` — If the unit can be placed on the tile, return an integer (lower being more preferred).  If it can't, return false.



### clearAirProtection
```
function gen.clearAirProtection(tile: tileObject)
```
Clears standard Civ II Air protection from the tile.  That is, moves air units off the tile if they prevent ground/sea units on the tile from being attacked



### clearAdjacentAirProtection
```
function gen.clearAdjacentAirProtection(unit: unitObject)
```
Clears air protection for tiles adjacent to the unit, as long as those tiles are not owned by the unit's owner.
In the Lua Scenario Template, simpleSettings.lua has the following settings:
```lua
simpleSettings.clearAdjacentAirProtectionAI = false
simpleSettings.clearAdjacentAirProtectionHuman = false
```



### cityRadiusTiles
```
function gen.cityRadiusTiles(input: table|cityObject|tileObject)
  -> table<integer, tileObject>
```
  Returns a table of tiles around a center tile, the 
  size of a city 'footprint'.  The indices are listed below
  and are based on how city.workers determines which tiles
  are worked.

      #       #       #       #       #
          #       #       #       #       #
      #       #       #       #       #
          #       20      13      #       #
      #       12      8       9       #
          19      7       1       14      #
      #       6       21      2       #
          18      5       3       15      #
      #       11      4       10      #
          #       17      16      #       #
      #       #       #       #       #
          #       #       #       #       #

 If the center is at the edge of the map, absent tiles have nil values

@*param* `input` — If table, the table must be tile coordinates.



### getTilesInRadius
```
function gen.getTilesInRadius(centre: table|tileObject, radius: integer, minRadius?: integer, maps?: integer|table)
  -> table<integer, tileObject>
```
Produces a table of nearby tiles to centre.  
Lower index means closer tile (or, same distance),
not counting z axis if multiple maps are used.
Keys start at 1, no missing indices (if a tile doesn't exist, there
won't be an empty entry, the next tile will use that entry).

centre = a tile or table of coordinates 
    central til around which we will find tiles

radius = integer
    is the distance (in tiles, not coordinates) from the centre to the furthest
    tiles desired

minRadius = integer
    is the distance in tiles from the centre for the nearest tile to be
    included (e.g. if you don't want centre itself, set minRadius to 1, if you
    want a ring only, set minRadius to radius)

maps = nil or integer in 0-3 or table of integers
    if nil, only get tiles from the map that centre is on
    if integer, only get tiles from that map
    if table of integers, tiles from all maps listed
    e.g. {1,3} means get tiles from maps 1 and 3

@*param* `centre` — if table, must be a table of coordinates.

@*param* `radius` — The number of tiles out you want to get.

@*param* `minRadius` — 0 by default

@*param* `maps` — if table, values are the maps to get the tiles from.  Same map as `centre` by default.



### playMusic
```
function gen.playMusic(fileName: any)
```
 Plays music from `fileName`, found in the folder set by
 gen.setMusicDirectory (in Lua Scenario Template, this is <MainScenarioDirectory>\Sound).

 gen.playMusic stops any currently playing game music in order
 to play music, and the music won't play if the "music" is disabled in the menu.  This is different from playing a sound with civ.playSound, which doesn't stop any existing music.



### isSinglePlayerGame
```
function gen.isSinglePlayerGame()
  -> boolean
```
 Returns true if there is exactly one human player, false otherwise.



### nearbyUnits
```
function gen.nearbyUnits(center: table|tileObject, radius: integer, maps?: integer|table)
  -> fun():unitObject
```
 gen.nearbyUnits(center,radius,maps={0,1,2,3}) --> iterator providing units
provides an iterator over all the units within radius
tiles of the center tile
maps = nil or integer in 0-3 or table of integers
    if integer, only get units from tiles from that map
    if table of integers, units from all maps listed
    e.g. {1,3} means get units from maps 1 and 3
    if nil, get units from all maps (this choice is for backwards compatibility)


@*param* `center` — If table, must be a table of coordinates.

@*param* `radius` — How far away from the center you wish to get units.

@*param* `maps` — If integer, get units from that map. If table, values are the maps to get the tiles from.  Get from all maps by default (for backwards compatibility).



### makeAllowedTerrainFunction
```
function gen.makeAllowedTerrainFunction(allowedTilesList: table<integer, integer>|nil)
  -> fun(tile: tileObject):boolean
```
 gen.makeAllowedTerrainFunction(allowedTilesTable) --> function(tile)-->bool
Converts a table of integer values into a function that returns
true if tile.baseTerrain.type is a value in the table, and false otherwise.
If nil is entered, all terrain is allowed.



### nearbyUnoccupiedTiles
```
function gen.nearbyUnoccupiedTiles(centerTile: table|tileObject, distance: integer, allowedTiles: fun(tile: tileObject):boolean|table<integer, integer>)
  -> table<integer, tileObject>
```
Returns the table of nearby unoccupied tiles.
Indices start at 1 without gaps, but tiles are in no particular order.
`centerTile` is the tile that you want to find other tiles near to (on same map).
`distance` is the number of squares away that you can search.
`allowedTiles` is either a table of integers such that a tile is acceptable if
`possibleTile.baseTerrain.type` appears as a value in the table
or a function `allowedTiles(possibleTile)-->bool`
that returns true if the tile is allowed, and false if not.
If `nil` is entered, all terrain is allowed.



### getRandomNearbyUnoccupiedTile
```
function gen.getRandomNearbyUnoccupiedTile(centerTile: table|tileObject, distance: integer, allowedTiles: fun(tile: tileObject):boolean|table<integer, integer>)
  -> tileObject|nil
```
Returns a random unoccupied square near tile, on the same map.  Returns nil if there is no such tile.
`centerTile` is the tile that you want to find other tiles near to (on same map).
`distance` is the number of squares away that you can search.
`allowedTiles` is either a table of integers such that a tile is acceptable if
`possibleTile.baseTerrain.type` appears as a value in the table
or a function `allowedTiles(possibleTile)-->bool`
that returns true if the tile is allowed, and false if not.
If `nil` is entered, all terrain is allowed.



### nearbyOpenTilesForTribe
```
function gen.nearbyOpenTilesForTribe(centerTile: table|tileObject, distance: integer, allowedTiles: fun(tile: tileObject):boolean|table<integer, integer>, tribe: tribeObject)
  -> table<integer, tileObject>
```
  gen.nearbyOpenTilesForTribe(centerTile,distance,allowedTiles,tribe)
Returns a table of nearby tiles, on the same map, that are either unoccupied or only has units/city of the `tribe`
Indices start at 1 without gaps, but tiles are in no particular order.
`centerTile` is the tile that you want to find other tiles near to (on same map).
`distance` is the number of squares away that you can search.
`allowedTiles` is either a table of integers such that a tile is acceptable if
`possibleTile.baseTerrain.type` appears as a value in the table
or a function `allowedTiles(possibleTile)-->bool`
that returns true if the tile is allowed, and false if not.
If `nil` is entered, all terrain is allowed.
`tribe` the tribe that is searching for open tiles.



### getRandomNearbyOpenTileForTribe
```
function gen.getRandomNearbyOpenTileForTribe(centerTile: table|tileObject, distance: integer, allowedTiles: fun(tile: tileObject):boolean|table<integer, integer>, tribe: tribeObject)
  -> tileObject|nil
```
Returns a random square near tile, on the same map, that is either empty or only has units/city of the same tribe.  Returns nil if there is no such tile.
`centerTile` is the tile that you want to find other tiles near to (on same map).
`distance` is the number of squares away that you can search.
`allowedTiles` is either a table of integers such that a tile is acceptable if
`possibleTile.baseTerrain.type` appears as a value in the table
or a function `allowedTiles(possibleTile)-->bool`
that returns true if the tile is allowed, and false if not.
If `nil` is entered, all terrain is allowed.
`tribe` the tribe that is searching for open tiles.



### getTileProduction
```
function gen.getTileProduction(tile: table|tileObject, city: cityObject, ignoreCustomCosmic?: boolean)
  -> foodProduction: integer
  2. shieldProduction: integer
  3. tradeProduction: integer
```
 gen.getTileProduction(tile,city) --> integer (food), integer(shields), integer(trade)
 Returns the tile production values, presuming that the city
 given is the one working the tile.
 That is to say, returns the values that would be seen on the tile in the city window.
 Doesn't check if that city is actually working the tile.

@*param* `ignoreCustomCosmic` — If true, do not use the customCosmic city customisation to get production, refer to the current settings of terrain, baseTerrain and roadTrade.  If false or nil, refer to customCosmic module if it is available (otherwise, refer to current settings of terrain, baseTerrain and roadTrade).



### computeBaseProduction
```
function gen.computeBaseProduction(city: cityObject, ignoreCustomCosmic?: boolean)
  -> foodProduction: integer
  2. shieldProduction: integer
  3. tradeProduction: integer
```
 Computes the resources harvested by the city from the terrain.
 Includes superhighway/supermarket/railroad bonus, but not factories/power plants.

@*param* `ignoreCustomCosmic` — If true, do not use the customCosmic city customisation to get production, refer to the current settings of terrain, baseTerrain and roadTrade.  If false or nil, refer to customCosmic module if it is available (otherwise, refer to current settings of terrain, baseTerrain and roadTrade).



### spendMovementPoints
```
function gen.spendMovementPoints(unit: unitObject, points: number, multiplier?: integer, maxSpent?: integer, minSpent?: integer)
```
 Increases the expended movement of the `unit` by `points`.
 If the unit has a range (either natural or through `gen.activateRangeForLandAndSea`) and
 uses up all its movement for the current turn, its domainSpec is incremented by 1
 and the unit is killed if it is out of range.
 (Exceptions: if the unit is the currently active unit and is a land or sea unit
 with range, it won't increment domainSpec, since that is caught immediately
 afterward with onFinalOrderGiven. A unit that has already spent its full movement allowance before the modifier is applied also won't increment)
 By default, 'full' unit movement points are used, but a different `multiplier` can be specified 
 e.g. 1 if you want to spend atomic movement points.
 If points is negative, movement is restored to the unit.
 If points is not an integer, math.floor(points*multiplier) is used.
 Final move spent is bound between maxSpent and minSpent, which are by default
 255 and 0 respectively.

@*param* `maxSpent` — default is 255

@*param* `minSpent` — default is 0



### getBearing
```
function gen.getBearing(compassPoint: table|cityObject|tileObject|unitObject, compassCentre: table|cityObject|tileObject|unitObject)
  -> bearing: ""|"E"|"N"|"NE"|"NW"...(+4)
```
 Returns one of "N","S","E","W","NW","NE","SW","SE","" based on the locations
 of the compassPoint and compassCentre.  "" is returned if compassPoint and compassCentre are the same tile.<br><br>
 e.g. `gen.getBearing(Madrid,Paris) --> SW`
      Madrid is South-West of Paris
      We're finding the location of Madrid relative to Paris, hence
      Paris is at the compass centre and we're looking for the
      bearing of the compass point in the direction of Madrid
      gen.getBearing(Paris,Madrid) --> NE
      Paris is North-East of Madrid
 compassPoint and compassCentre can be units, cities, or tiles
 <br><br>Inspired by Pablostuka

@*param* `compassPoint` — Can be:<br><br>tileObject<br><br>unitObject<br><br>cityObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)

@*param* `compassCentre` — Can be:<br><br>tileObject<br><br>unitObject<br><br>cityObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)

```lua
bearing:
    \| "N"
    \| "S"
    \| "E"
    \| "W"
    \| "NW"
    \| "NE"
    \| "SW"
    \| "SE"
    \| ""
```



### isInteger
```
function gen.isInteger(item: any)
  -> boolean
```
 Returns true if the item is an integer, and false otherwise.



### getMapTransportFlagNumber
```
function gen.getMapTransportFlagNumber(map1: integer|mapObject, map2: integer|mapObject, all?: boolean, functionName?: string)
  -> boolean|integer|table
```
Finds the number of a map transporter relationship 
 (or a table of all relationships, if `all` is true) which allows
 transporter travel between `map1` and `map2`, with the first
 relationship in @MAP_TRANSPORT_RELATIONSHIPS being represented
 by 1.  If `map1` and `map2` are the same map, return `true`, even
 if there is a relationship for that.  If there is no transport
 relationship between the two maps, false is returned.

@*param* `all` — If true, return a table of all eligible relationship numbers (unless maps are the same, or there are none).

@*param* `functionName` — If present, passes along a functionName to be displayed in case of error (particularly if changeRules.lua module is not found)



### getNumberOfTerrainTypes
```
function gen.getNumberOfTerrainTypes(map: any)
  -> unknown
```




### getState
```
function gen.getState()
  -> boolean|string|number|table<string|number, boolean|string|number|table>
```
 Returns the state table submitted to `gen.linkState`.
 If you're writing a module intended for use by others,
 it is recommended that you use a linkState system with a 
 sub table, so that table keys don't accidentally conflict



### getEphemeralTable
```
function gen.getEphemeralTable()
  -> table
```
 The ephemeralTable is a table for shared data.
 Since it is not saved, it doesn't have to be serializeable,
 so you don't have to worry about making keys and
 values text or numbers.
 However, the information will not be preserved after a save and load.



### iterateUnitTypes
```
function gen.iterateUnitTypes()
  -> fun():unitTypeObject
```
Returns an iterator for all unitType objects.



### iterateImprovements
```
function gen.iterateImprovements()
  -> fun():improvementObject
```
Returns an iterator for all improvement objects.



### iterateWonders
```
function gen.iterateWonders()
  -> fun():wonderObject
```
Returns an iterator for all wonder objects.



### iterateBaseTerrain
```
function gen.iterateBaseTerrain()
  -> fun():baseTerrainObject
```
Returns an iterator for all baseTerrain objects (for maps that are
in the game).



### iterateTerrain
```
function gen.iterateTerrain()
  -> fun():terrainObject
```
Returns an iterator for all terrain objects (for maps that
are in the game).



### isRoadTradeBonus
```
function gen.isRoadTradeBonus(baseTerrain: baseTerrainObject)
  -> boolean
```
Checks if the `baseTerrain` gets +1 trade production from a road.



### giveRoadTradeBonus
```
function gen.giveRoadTradeBonus(baseTerrain: baseTerrainObject)
```
Gives the `baseTerrain` +1 trade production from a road.



### removeRoadTradeBonus
```
function gen.removeRoadTradeBonus(baseTerrain: baseTerrainObject)
```
Removes the +1 trade production from a road for `baseTerrain`.



### fullHealthMovementAllowance
```
function gen.fullHealthMovementAllowance(unit: unitObject)
  -> atomicMovementPoints: integer
```
 Returns the movement allowance of a unit after
 taking into account Nuclear Power tech, Magellan's Expedition, and Lighthouse.
 Returns "atomic" movement points (that is, the movement recorded by `unit.moveSpent`, or "regular" movement points * `totpp.movementMultipliers.aggregate`







## Table Tools

These functions can be helpful when working with tables.

### inTable
```
function gen.inTable(object: any, table: table)
  -> boolean
```
 Returns `true` if the `object` is a value in the `table`, `false` otherwise
comment



### copyTable
```
gen.copyTable --> function
```




### copyTableWithMetatable
```
function gen.copyTableWithMetatable(table: any)
  -> any
```
 Constructs (and returns) a new table with the same keys as the input, 
 as well as the same metatables. (The metatable is not copied, so that
 customData is still recognised as the correct data.)
 Tables within the table are also copied (along with their metatables).
 Note: although this is meant for copying tables, 
 the way the function is constructed, any value can be input and
 returned.



### isEmpty
```
function gen.isEmpty(table: table)
  -> boolean
```
Returns true if the table has no entries, and false otherwise.
(I got this idea from stackoverflow, https://stackoverflow.com/questions/1252539/most-efficient-way-to-determine-if-a-lua-table-is-empty-contains-no-entries )
comment



### mergeTableValues
```
function gen.mergeTableValues(...table)
  -> table
```
  Accepts an arbitrary number of tables as
  arguments and returns a table with all
  the values from all the tables.
  Table keys are lost, and replaced by
  integers starting at 1.
  Duplicate values will appear multiple times.



### clearGapsInArray
```
function gen.clearGapsInArray(table: table, lowestValue?: integer)
```
 Re-indexes all integer keys and values
 in a table, so that there are no gaps.
 Starts at lowestValue (1 by default), and maintains order
 of integer keys
 Non integer keys (including other numbers)
 and integers below lowestValue are left unchanged

@*param* `lowestValue` — default is 1



### makeArrayOneToN
```
function gen.makeArrayOneToN(table: table)
```
 All integer values in the table are re-indexed so that they 
 start at 1 and proceed without gaps.
 All other keys are ignored.



### tableWrap
```
function gen.tableWrap(item: any, needsWrapFn: fun(item: any):boolean)
  -> table
```
 gen.tableWrap(item)-->table
 If item is a table, return the table
 otherwise, return a table with the item as element 1.
 This is useful so that functions can accept either a single
 element or a table of such elements.
  `needsWrapFn(item)-->boolean`
  If true, item needs a wrapping table, if not, it doesn't
  useful if you can distinguish between tables that represent other
  data structures, and tables of such data structures.
  By default, returns true if the item isn't a table, and false if it is.

@*param* `needsWrapFn` — Default: returns true if item is not a table, and false if it is.



### errorForNilKey
```
function gen.errorForNilKey(table: table, tableName: string)
```
 Changes a table's metatable, so that an error is 
 generated when a key with a nil
 value is accessed from the table.
 Useful for debugging in certain circumstances.

@*param* `tableName` — the name for the table you want to be used in error displays.



### noNewKey
```
function gen.noNewKey(table: table, tableName: string)
```
 Changes a table's metatable, so that an error is 
 generated when assigning a value to a key 
 which doesn't already exist in that table.
 Useful for debugging in certain circumstances.

@*param* `tableName` — the name for the table you want to be used in error displays.



### isStateSavable
```
function gen.isStateSavable(item: any)
  -> boolean
```
 Determines if an item is "state savable" , which is to say that
 it can be added to the state table (the table containing the data that persists
 after saving and loading) in its current state.
  An item is "state savable" if it is either
  <br>nil
  <br>a number
  <br>a string
  <br>a boolean, or
  <br>a table with keys that are numbers or strings
    and with values that are also state savable
  Note: table can't have a metatable
comment



### tableToString
```
function gen.tableToString(table: any)
  -> string
```
 gen.tableToString(table)
 Returns a string showing values in a table.

@*param* `table` — Although this is meant to be used on a table, any kind of value can be provided.  For non-table values, the `tostring` command is used.

@*return* — A representation of the table.



### makeDataTable
```
function gen.makeDataTable(inputTable?: table, tableName?: string)
  -> dataTable
```
  Makes a 'dataTable', which functions as a table, but with the ability to disable
  overwriting values for existing keys,
  adding new keys, and
  requesting nil values (values for keys that don't exist).
  (This functionality is achieved with a metatable.)
  The `tableName` is a name for the table when an error is generated.

@*param* `inputTable` — The table to be made into a data table.  The table actually transformed, but it is also returned, if that is convenient.  Default is an empty table.

@*param* `tableName` — Default is 'unnamed data table'



### forbidReplacement
```
function gen.forbidReplacement(dataTable: dataTable)
```
 Changes the `dataTable` so that non-nil values can not be changed.



### allowReplacement
```
function gen.allowReplacement(dataTable: dataTable)
```
 Changes the `dataTable` so that non-nil values can be changed.



### forbidNewKeys
```
function gen.forbidNewKeys(dataTable: dataTable)
```
 Changes the `dataTable` so that values can't be assigned to keys which currently have a nil value.



### allowNewKeys
```
function gen.allowNewKeys(dataTable: dataTable)
```
 Changes the `dataTable` so that values can once again be assigned to keys which currently have a nil value.



### forbidNilValueAccess
```
function gen.forbidNilValueAccess(dataTable: dataTable)
```
 Changes the `dataTable` so that an error is generated if the program tries to access a key which currently has a nil value.



### allowNilValueAccess
```
function gen.allowNilValueAccess(dataTable: dataTable)
```
 Changes the `dataTable` so that an error is not generated if the program tries to access a key which currently has a nil value.



### restrictValues
```
function gen.restrictValues(dataTable: dataTable, isValidValueFunction: fun(value: any):boolean, makeValidValueFunction: fun(value: any):any)
```
Changes the `dataTable` so that only 'valid' values can be assigned to the dataTable.  If `isValidValueFunction(value)` returns true for a `value` assigned to the table, that value is added to the table.  Otherwise, `makeValidValueFunction(value)` is assigned to the dataTable (unless an error is generated).



### makeThresholdTable
```
function gen.makeThresholdTable(inputTable: table|nil)
  -> thresholdTable
```
 A threshold table is a table where if a numerical key is indexed, and that
 numerical key doesn't correspond to an index, the value of the largest
 numerical index less than the key is used.
 If there is no numerical index smaller than the key, false is returned.
 (nil is returned for non-numerical keys not in table)
 Use an index -math.huge to provide values for arbitrarily small numerical keys.
 Example:
```lua 
myTable = gen.makeThresholdTable({[-1]=-1,[0]=0,[1]=1,})
myTable[-2] --> false
myTable[-1] --> -1
myTable[-0.6] --> -1
myTable[3.5]-->1
myTable["three"] --> nil
myTable[0.5]-->0
```
 makes an input a threshold table or creates an empty thresholdTable
 Also returns the table value



### persistentRandom
```
function gen.persistentRandom(key: string)
  -> number
```
 gen.persistentRandom(key) --> number between 0 and 1
 Checks the persistentRandom table (within the state table)
 for a value associated with key. If it exits, the value is
 returned.  If it does not exist, a random number between
 0 and 1 is generated, stored in the table under the key,
 and also returned.<br>

 Example of use: WWII scenario with seasons
 You may want to have some games where the 1941 spring starts
 in April, and other games where it starts in May.  When
 determining whether to load winter or summer terrain stats during
 1941, you would use gen.persistentRandom("EarlySpring1941") < 0.5
 as part of the season check in April, and load summer if the value is less than 0.5
 and winter otherwise.  This way, each when each player starts their
 game that month, they will all either get winter or summer terrain.

@*param* `key` — Key for the persistent random value.

@*return* — number between 0 and 1



### clearPersistentRandom
```
function gen.clearPersistentRandom(key: string)
```
 gen.clearPersistentRandom(key) --> void
 Sets the value associated with the key in the
 persistentRandom table to nil.  This could either be for reuse of the key,
 or to prevent the key from staying in the state table indefinitely.



### getPersistentRandomTable
```
function gen.getPersistentRandomTable()
  -> table<string, number>
```
 gen.getPersistentRandomTable() --> table
 Returns the persistentRandom table.



### newEmptyStack
```
function gen.newEmptyStack()
  -> stack
```
 Creates a stack with no values.



### newStack
```
function gen.newStack(table?: any)
  -> stack
```
generates a new stack, with integer
values in the table pushed onto the stack
starting from the smallest integer value
(smallest value will be at the bottom of the stack).
All other keys (including non-integer keys) and values are ignored.

@*param* `table` — Default is an empty table.



### isStack
```
function gen.isStack(item: any)
  -> boolean
```
Returns `true` if the item is a stack (created by gen.newStack/newEmptyStack)
and `false` otherwise.







## Custom Data Types and Validation


The functions in this section can be used to check that functions 
have received valid data as arguments, or to create tables
which can only have values assigned to particular keys, and
only specific kinds of values.  These tools can aid development
by causing invalid data to be detected at its source rather than
when it actually breaks the program.  
These functions are built on a data structure called the `valueSpecification`.  It is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.


### valueSatisfiesSpecification
```
function gen.valueSatisfiesSpecification(value: any, valueSpecification: table)
  -> boolean
```
  Returns true if value satisfies the valueSpecification, false otherwise.

@*param* `valueSpecification` — A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.



### validateFunctionArgument
```
function gen.validateFunctionArgument(value: any, moduleName: string, functionName: string, argumentNumber: integer, argumentName: string, valueSpecification: table, extraInfo?: string)
```
  This validates a function's argument, and provides an error if a bad value is supplied.

@*param* `value` — The argument passed to the function.

@*param* `moduleName` — The name of the module the function is in (so generated errors are more informative).

@*param* `functionName` — The name of the function this function is validating values for (so generated errors are more informative).

@*param* `argumentNumber` — The argument which is being validated (so generated errors are more informative).

@*param* `argumentName` — The name of the argument which is being validated (so generated errors are more informative).

@*param* `extraInfo` — Any extra information that might help in debugging, should an error occur.

@*param* `valueSpecification` — A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.



### createDataType
```
function gen.createDataType(dataName: string, specificKeyTable: table<any, table>, generalKeyTable: table<fun(possibleKey: any):boolean, table>, defaultValueTable: table, fixedKeyTable: table<any, true>, aliasKeyTable?: fun(aliasKey: any):any|table<any, any>)
  -> fun(table: table):<newDataType>
  2. fun(item: any):boolean
  3. table
```
Returns functions necessary to create a basic custom data type.  Such a data type
is a table, but uses a metatable to restrict the keys that are allowed to be used,
and the values that can be assigned to those keys.  This way, errors can be
generated when incorrect key-value pairs are assigned to the data type, rather
than when later code receives unexpected values.
<br>Several parameters are defined with "valueSpecification" tables.
A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.


@*param* `dataName` — <br>string<br><br> The name of the new data type.

@*param* `specificKeyTable` — <br>specificKeyTable={[key]=valueSpecification}<br><br>Each `key` is a key that is allowed in the `dataName` data type, and values assigned to the `key` must satisfy the corresponding `valueSpecification`.

@*param* `generalKeyTable` — <br>generalKeyTable = {[function(possibleKey)-->boolean] = valueSpecification} <br><br> This table allows for keys of a general form to be used in the data type.  For a `possibleKey`, if any `function(possibleKey)` returns true, a value can be assigned to `possibleKey` as long as it satisfies the valueSpecification.

@*param* `defaultValueTable` — <br>defaultValueTable = {[key]=value}<br><br>When a new `dataName` is created, if `key` is not specified, assign the corresponding `value` to it.

@*param* `fixedKeyTable` — <br>fixedKeyTable = {[key]=true}<br><br> If `key` is in this table, the new `dataName` can't change the value of the key after it is created.

@*param* `aliasKeyTable` — <br>aliasKeyTable = {[aliasKey] = key} or<br>fun(aliasKey)->key<br><br>If table, and the aliasKey is a key in the aliasKeyTable, then the associated key is used for indexing or assigning instead.<br>If function, all keys have the function applied to them, and the returned value is used as a key instead.

@*return* — Creates a new instance of the `dataName` data type, assigning to it all the table key-value pairs in the `table`.<br>Generates an error if any key-value pairs are invalid.

@*return* — Checks if `item` is an instance of the `dataName` data type, returns true if it is, and false otherwise.

@*return* — The [metatable](https://www.tutorialspoint.com/lua/lua_metatables.htm) for the `dataName` data type.  This is available in case you want to make more customizations to the data type.



### valueSpecForCustomData
```
function gen.valueSpecForCustomData(isItemFn: fun(item: any):boolean, failureDescription: string, itemDescription: string)
  -> table
```
Creates a value specification for custom data created by `gen.createDataType` (or any other data type that uses a table as the base).

@*param* `isItemFn` — A function that returns true if the item is the appropriate data type, and false otherwise.

@*param* `failureDescription` — A message explaining that the item is not the appropriate data type.

@*param* `itemDescription` — A description of the data type.



### describeAllowableValues
```
function gen.describeAllowableValues(valueSpecification: table)
  -> string
```
  Takes a valueSpecification, and returns a string describing the valid values.

@*param* `valueSpecification` — A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.



### validateTableValue
```
function gen.validateTableValue(tableDescription: string, key: any, value: any, valueSpec: table, extraInfo?: string)
```
 Generates an error if the `value` doesn't satisfy the `valueSpec`.  This is a "building block" function, so you probably don't want to use it.

@*param* `tableDescription` — A description of the table.

@*param* `key` — The key being evaluated.

@*param* `value` — The value being evaluated.

@*param* `extraInfo` — Extra information that might be useful when debugging.

@*param* `valueSpec` — A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.



### tableOfValueSpecification
```
function gen.tableOfValueSpecification(valueSpecification: table)
  -> valueSpecification: table
```
  Takes a valueSpecification, and returns a valueSpecification where
  the valid data is a table where all values are of the
  submitted valueSpecification.

@*param* `valueSpecification` — A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.



### valueSpecificationOrTableOfValueSpecification
```
function gen.valueSpecificationOrTableOfValueSpecification(valueSpecification: table)
  -> newValueSpecification: table
```
  Takes a valueSpecification, and returns a newValueSpecification.
  The newValueSpecification allow both the original valueSpecification
  and tables where values are the original valueSpecification.<br><br>
  Limiation: the valueSpecification can't have a any tables as valid value types.  If you need that, consider `gen.tableOfValueSpecification` or writing a custom valueSpecification.

@*param* `valueSpecification` — A valueSpecification is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. `function(unit)-->number`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the `minVal` (if specified) and smaller than the `maxVal` (if specified).  If the `integer` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for `1` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for `2` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.



### validateValueSpecificationKeys
```
function gen.validateValueSpecificationKeys(validDataInfo: any)
```
 Value Specification
  valueSpecification = {
      ["nil"] = true or nil
          if this key is true, the data can be nil
      ["boolean"] = true, "true", "false", or nil
          if this key is true, the data can be a boolean
          if this key is "true", only true is allowed (false is not)
          if this key is "false", only false is allowed (true is not)
      ["function"] = true, string or nil
          if this key is true or string, the data can be a function
          the string describes the function e.g. function(unit) --> number
          (the function is not tested)
      ["number"] = {minVal=numberNil, maxVal = numberNil, integer=trueNil} or true
          if this key is true, the data can be a number
          the keys in the table specify minimum and maximum values, and whether
          the number must be an integer
          note: math.huge and -math.huge are considered both numbers and integer here
      ["string"] = true or {[validString] = truthy}
          if true, the data can be any string
          if table, the data must be one of the keys in the table
      ["table"] = string or true or {[1]=function(table)-->true or string,[2]=string}
          if string, any table is accepted, and the string describes the kind of table needed
          if true, any table is accepted, and the description is a table
          if table, [1] is a function returns that true if the table is accepted,
          and the problem with the table if it is not
          [2] is the description of the table required
      ["userdata"] = {[dataTypeName]=isDataTypeFn}
          this table is a table of each of the allowable data types, with the
          key being the name, and the function checking if it is that type
          being the value
  }







## Non-Standard ID Functions

These functions map Lua objects without an `id` field to suitable integers, or provide a way to go from the integer back to the original object.

### getBaseTerrainID
```
function gen.getBaseTerrainID(baseTerrain: baseTerrainObject)
  -> integer
```
Returns an id number for the `baseTerrain` object.  This is different from `baseTerrain.type`, since `baseTerrain.type` is 0-15 for all maps, while this id changes for larger maps.



### getBaseTerrainFromID
```
function gen.getBaseTerrainFromID(id: integer)
  -> baseTerrainObject|nil
```
Given an baseTerrain id, returns the corresponding baseTerrain object.



### getTerrainID
```
function gen.getTerrainID(terrain: terrainObject)
  -> integer
```
Returns an id number for the `terrain` object.  This is different from `terrain.type`, since `terrain.type` is 0-15, based on the underlying baseTerrain type.  This id number is different for each terrain type on each map.



### getTerrainFromID
```
function gen.getTerrainFromID(id: integer)
  -> terrainObject|nil
```
Returns a terrainObject from the corresponding id number created by gen.getTerrainID.



### getTileID
```
function gen.getTileID(tileORX: integer|table|tileObject, y?: integer, z?: integer)
  -> nil
```
 Returns a single-value numeric key that uniquely identifies a tile on any map.
by Knighttime, modified by Prof. Garfield 



### getTileFromID
```
function gen.getTileFromID(tileID: integer)
  -> tileObject|nil
```
 Takes an integer generated by `gen.getTileID`, and returns the corresponding tile (or nil, if the key doesn't correspond to a real tile).







## Marker Functions

Placing a marker on a tile changes the visible improvements for that tile, so that the tribe can now see the `markerOption` ("irrigation", "pollution", etc) on the tile.  However, information about the marker is stored in the state table (along with the originally visible improvements), so that the marker can be displayed again if it stops being visible, and removed if that is desired.  

The valid options for markers are: "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".  (Note: although the code works for using transporter markers, they may not be visible in practice.)


### placeMarker
```
function gen.placeMarker(tile: tileObject, tribe: tribeObject, markerOption: markerOptions)
```
Places a "marker" on `tile` for `tribe`.

Placing a marker on a tile changes the visible improvements for that tile, so that the tribe can now see the `markerOption` ("irrigation", "pollution", etc.-- see below for the full list) on the tile.  However, information about the marker is stored in the state table (along with the originally visible improvements), so that the marker can be displayed again if it stops being visible.


@*param* `tile` — The tile on which a "marker" will be placed.

@*param* `tribe` — The tribe for whom the "marker" is visible.

@*param* `markerOption` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### removeMarker
```
function gen.removeMarker(tile: tileObject, tribe: tribeObject, markerOption: markerOptions)
```
 Removes the `markerOption` marker for `tribe` from `tile`, if it exist.

@*param* `tile` — The tile on which a "marker" will be removed.

@*param* `tribe` — The tribe for whom the "marker" is no longer visible.

@*param* `markerOption` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### maintainTileMarkerTable
```
function gen.maintainTileMarkerTable()
```
 Checks the marker table for any marker data that can be removed
 and remove it.



### removeAllMarkers
```
function gen.removeAllMarkers(tribe: tribeObject|nil, markerType: markerOptions|nil)
```
 Removes all markers of `markerType` for tribe.
 If tribe not specified, removes all markerType markers for all tribes.
 If markerType not specified, removes all markers for tribe.
 If neither specified, removes all markers for all tribes.

@*param* `markerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### removeMarkersFromTile
```
function gen.removeMarkersFromTile(tile: tileObject, tribe?: tribeObject)
```
Removes all markers on tile for the tribe, if tribe is omitted, removes markers for all tribes.

@*param* `tile` — The tile for which all markers will be removed.

@*param* `tribe` — The tribe for which the markers will be removed.  If nil, markers for all tribes are removed.



### showAllMarkersOnTile
```
function gen.showAllMarkersOnTile(tile: tileObject, topMarkerType: markerOptions|nil, secondMarkerType: markerOptions|nil)
```
 Reapplies the charting functions for all markers
 on the tile for all players.  If topMarkerType isnt
 nil, that marker type is applied again last, in case
 there are conflicting markers.
 The secondMarkerType is applied just before the top marker type.

@*param* `topMarkerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".

@*param* `secondMarkerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### showAllMarkers
```
function gen.showAllMarkers(topMarkerType: markerOptions|nil, secondMarkerType: markerOptions|nil)
```
 Reapplies the charting functions for all markers
 on all tiles for all players.  If topMarkerType isn't nil,
 that marker type is applied last again, in case there
 are conflicting markers.
 The secondMarkerType is applied just before the top marker type.

@*param* `topMarkerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".

@*param* `secondMarkerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### hasMarker
```
function gen.hasMarker(tile: tileObject, tribe: tribeObject, markerType: markerOptions)
  -> boolean
```
 Returns true if `tile` has a marker of `markerType` for `tribe`.

@*param* `markerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### isMarkerVisible
```
function gen.isMarkerVisible(tile: tileObject, tribe: tribeObject, markerType: markerOptions)
  -> false
```
 Returns true if the `tile` has the `markerType` and the `markerType` is charted, false otherwise.

@*param* `markerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### hideMarker
```
function gen.hideMarker(tile: tileObject, tribe: tribeObject, markerType: markerOptions)
```
 Uncharts the `markerType` marker for the `tribe`, but does not remove the marker.
 Does nothing if the tribe doesn't have that marker
 or if the marker is already hidden.

@*param* `markerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### hideAllMarkers
```
function gen.hideAllMarkers(tribeOrNil: tribeObject|nil, markerTypeOrNil: markerOptions|nil)
```
 gen.hideAllMarkers(tribeOrNil,markerTypeOrNil)
 Hides all markers of the given type for that tribe.
 If tribe not specified, hides all markers of given type for
 all tribes.
 If markerType not specified, hides markers of all types.
comment

@*param* `markerTypeOrNil` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### hideAllMarkersOnTile
```
function gen.hideAllMarkersOnTile(tile: tileObject, tribe: tribeObject)
```
 Hides all markers on a given tile for the given tribe.



### showMarker
```
function gen.showMarker(tile: tileObject, tribe: tribeObject, markerType: markerOptions)
```
 Shows the `markerType` for the `tribe` on the `tile`, if the marker is on the `tile`.

@*param* `markerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".



### showMarkerOnAllTiles
```
function gen.showMarkerOnAllTiles(tribe: tribeObject, markerType: markerOptions)
```
 Shows the `markerType` to `tribe` on all tiles where it exists.

@*param* `markerType` — Valid marker options are "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".







## Item Weight Functions

These functions provide a way to assign "weights" to items, based on a standard set
of criteria. Choosing item(s) with large (or small) weights can be a convenient way
for a program to choose between different options.

### calculateWeight
```
function gen.calculateWeight(item: <weightItem>, weightTable: table<fun(item: <weightItem>, extraArgument: <extraArg>):boolean, boolean|number|fun(item: <weightItem>, extraArgument: <extraArg>):number|false>, extraArgument?: <extraArg>)
  -> boolean|number
```
This function calculates the "weight" of the `item`, taking into account the `extraArgument`, and uses the `weightTable`.  Calculating weights can be a simple way to choose between various options (with a return of `false` meaning not to choose this option).

In practice, you will probably not use this function itself.  There are several functions that use this function to make choices:

    gen.getExtremeWeights
    gen.getBiggestWeights
    gen.getSmallestWeights

weightTable has functions as keys, and numbers or false as values

    {[keyFunc(item,extraArgument)->boolean] = number or boolean or string or function(item,extraArgument) -> number\\|false}

    for each key in the weight table, apply keyFunc to the item and extraArgument

    if keyFunc(item,extraArgument) then
        if the value is a number, add the number to the weight
        if the value is a string add item[value] to the weight
        if the value is a function, add value(item,extraArgument) to the weight
        if the value is false, return 'false' as the weight
        if the value is true, do nothing
    else
        if the value is a number, do nothing
        if the value is false, do nothing
        if the value is a string, do nothing
        if the value is true, return 'false' as the weight

    That is, false means that keyFunc must not apply to the item
    while true means that keyFunc must apply to the item

    default weight is 0


@*param* `extraArgument` — Default is nil.

@*return* — If number, the item has this weight.  False means the item was not given a weight.



### getExtremeWeights
```
function gen.getExtremeWeights(listOrIterator: table|iterator, weightTableOrWeightFunction: table|fun(item: <itemToWeigh>, extraArgument: <extraArg>):number|false, getTopX: integer|nil, changeOrder: fun(weight1: number|false|nil, weight2: number|false):boolean, functionName: string, extraArgument: <extraArg>)
  -> <itemToWeigh>|table<integer, <itemToWeigh>>
  2. number|table<integer, number>
```
This function is wrapped to construct `gen.getBiggestWeight` and `gen.getSmallestWeight`.  You probably want to use one of them.

listOrIterator
    if iterator, returns the items for consideration
    if table, each item is a value in the table, and the table consists only of those values
weightTableOrWeightFunction
    if weightTable, use gen.calculateWeight(item,weightTable,extraArgument) as the weight function
    a weightFunction(item,extraArgument) must return either a number or false.  When false is returned,
    the item is not considered at all
getTopX
    if absent, the item with the largest weight is returned, or nil if no valid item is found
    if integer, a table with that number of items is returned, with index 1 associated with the
    item of the largest weight, 2 the next highest weight and so on.  If there are fewer valid
    items, the corresponding values are nil
changeOrder function
    if changeOrder(weight1,weight2) is true,
    weight2 should be before weight1
    changeOrder(nil,weight2) should always be true
functionName string
    name of the function being created (since this is designed to be wrapped by another function), for error purposes.


@*return* — best item, or table of the best items, starting at 1 with the best item.

@*return* — Weight of best item, or table of weights of the best items, starting at 1 with the best weight



### getBiggestWeights
```
function gen.getBiggestWeights(listOrIterator: iterator|table<any, <itemToWeigh>>, weightTableOrWeightFunction: table|fun(item: <itemToWeigh>, extraArgument: <extraArg>):number|false, getTopX: integer|nil, extraArgument: <extraArg>|nil)
  -> <itemToWeigh>|table<integer, <itemToWeigh>>
  2. number|table<integer, number>
```
Finds the `getTopX` number items in `listOrIterator` with the highest weights.  
If `getTopX` is nil, the item with the largest weight, and its weight, are returned as two values.  If `getTopX` is not nil, two tables are returned instead, with items 1 being the largest value, and its weight, 2 the second largest value and its weight, and so on.


@*param* `listOrIterator` — <br>If iterator, returns the items for consideration.<br><br>If table, each item is a value in the table, and all the table values are items for consideration.

@*param* `weightTableOrWeightFunction` — <br>If a table is provided, `gen.calculateWeight(item,weightTable,extraArgument)` is used to calculate the weight.<br><br>If a function is provided, it is used to calculate the weights.

@*param* `getTopX` — <br> If absent/nil, the item with the largest weight is returned, and the second return value returns its weight. <br><br> If integer, a table (indexed with integers starting at 1) with this many values is returned, with the item having the largest weight being at key 1, the second best item at key 2, and so on.  If there are not `getTopX` valid items, then nil is the value in the table for the relevant keys.  The second return value is a table of the weights of the `getTopX` items.

@*param* `extraArgument` — <br> This is an extra piece of data for computing the weights.



### getSmallestWeights
```
function gen.getSmallestWeights(listOrIterator: iterator|table<any, <itemToWeigh>>, weightTableOrWeightFunction: table|fun(item: <itemToWeigh>, extraArgument: <extraArg>):number|false, getTopX: integer|nil, extraArgument: <extraArg>|nil)
  -> <itemToWeigh>|table<integer, <itemToWeigh>>
  2. number|table<integer, number>
```
Finds the `getTopX` number items in `listOrIterator` with the smallest weights.  
If `getTopX` is nil, the item with the smallest weight, and its weight, are returned as two values.  If `getTopX` is not nil, two tables are returned instead, with items 1 being the item with the smallest weight, and its weight, 2 the second largest value and its weight, and so on.


@*param* `listOrIterator` — <br>If iterator, returns the items for consideration.<br><br>If table, each item is a value in the table, and all the table values are items for consideration.

@*param* `weightTableOrWeightFunction` — <br>If a table is provided, `gen.calculateWeight(item,weightTable,extraArgument)` is used to calculate the weight.<br><br>If a function is provided, it is used to calculate the weights.

@*param* `getTopX` — <br> If absent/nil, the item with the smallest weight is returned, and the second return value returns its weight. <br><br> If integer, a table (indexed with integers starting at 1) with this many values is returned, with the item having the smallest weight being at key 1, the second best item at key 2, and so on.  If there are not `getTopX` valid items, then nil is the value in the table for the relevant keys.  The second return value is a table of the weights of the `getTopX` items.

@*param* `extraArgument` — <br> This is an extra piece of data for computing the weights.







## Tile Improvement Functions

These functions interact with tile improvements.

### toTile
```
function gen.toTile(tileAnalog: table|tileObject)
  -> tileObject
```
 If given a tile object, returns the tile.
 If given coordinates for a tile, returns the tile.
 Causes error otherwise

@*param* `tileAnalog` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasIrrigation
```
function gen.hasIrrigation(tile: table|tileObject)
  -> boolean
```
 Returns true if tile has irrigation but no farm.
 Returns false otherwise.
 If you need to know if a tile has irrigation or farmland,
 use gen.hasAgriculture(tile)

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeIrrigation
```
function gen.placeIrrigation(tile: table|tileObject)
```
 places irrigation on the tile provided
 removes mines and farmland if present
 does nothing if tile has a city

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeIrrigation
```
function gen.removeIrrigation(tile: table|tileObject)
```
 If tile has irrigation but no farmland, removes the irrigation
 Does nothing to farmland
 Does nothing if tile has a city

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasMine
```
function gen.hasMine(tile: table|tileObject)
  -> boolean
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeMine
```
function gen.placeMine(tile: table|tileObject)
```
 places mines on the tile provided
 removes irrigation and farmland if present
 does nothing if tile has city

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeMineUnderCity
```
function gen.placeMineUnderCity(tile: table|tileObject)
```
 places mine on a tile, even if a city is present
 removes irrigation and farmland if present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeMine
```
function gen.removeMine(tile: table|tileObject)
```
 if tile has mining but no farmland, removes mines
 does nothing to farmland
 does nothing if tile has a city

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeMineUnderCity
```
function gen.removeMineUnderCity(tile: table|tileObject)
```
 if tile has mining but no farmland, removes mines
 does nothing to farmland

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasFarmland
```
function gen.hasFarmland(tile: table|tileObject)
  -> boolean
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeFarmland
```
function gen.placeFarmland(tile: table|tileObject)
```
 places farmland on a tile (removing mining)
 does nothing if a city is present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeFarmland
```
function gen.removeFarmland(tile: table|tileObject)
```
 removes farmland if present
 does nothing to irrigation or mining
 does nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasAgriculture
```
function gen.hasAgriculture(tile: table|tileObject)
  -> boolean
```
 returns true if tile has irrigation or farmland

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### improveAgriculture
```
function gen.improveAgriculture(tile: table|tileObject)
```
 if tile has no irrigation, place irrigation (even if mining present)
 if tile has irrigation, place farmland
 if city do nothing

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### degradeAgriculture
```
function gen.degradeAgriculture(tile: table|tileObject)
```
 if tile has farmland, reduce to irrigation
 if tile has irrigation, remove
 does nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeAgriculture
```
function gen.removeAgriculture(tile: table|tileObject)
```
 remove farmland and irrigation if present
 do nothing to mining
 do nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasRoad
```
function gen.hasRoad(tile: table|tileObject)
  -> boolean
```
 returns true if tile has a road

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeRoad
```
function gen.placeRoad(tile: table|tileObject)
```
 places a road on the tile
 does nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeRoad
```
function gen.removeRoad(tile: table|tileObject)
```
 removes a road if there is a road but no rail
 doesn't touch rail or cities

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasRailroad
```
function gen.hasRailroad(tile: table|tileObject)
  -> boolean
```
 returns true if a tile has a railroad (and road)

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeRailroad
```
function gen.placeRailroad(tile: table|tileObject)
```
 places a railroad (and road) on a tile
 does nothing if city is present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeRailroad
```
function gen.removeRailroad(tile: table|tileObject)
```
 removes railroad from a tile if it exits,
 leaving road intact (if there is already road there)
 does nothing if a city is present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasTransportation
```
function gen.hasTransportation(tile: table|tileObject)
  -> boolean
```
 returns true if tile has road or rail 
 (but not if city, unless an event has placed a road)

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### upgradeTransportation
```
function gen.upgradeTransportation(tile: table|tileObject)
```
 places railroad if road exists, otherwise places road
 does nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### degradeTransportation
```
function gen.degradeTransportation(tile: table|tileObject)
```
 reduces railroad to road, if rail exists
 if no rail but road, removes road
 if no transportation, does nothing
 if city does nothing

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeTransportation
```
function gen.removeTransportation(tile: table|tileObject)
```
 removes road and rail, if it exists
 does nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasFortress
```
function gen.hasFortress(tile: table|tileObject)
  -> boolean
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeFortress
```
function gen.placeFortress(tile: table|tileObject)
```
 places a fortress on a square, unless
 there is already a city, transporter, or airbase on the tile

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeFortressForce
```
function gen.placeFortressForce(tile: table|tileObject)
```
 places fortress (replacing airbase/transporter if necessary)
 If city on tile, nothing happens

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeFortress
```
function gen.removeFortress(tile: table|tileObject)
```
 Checks that a fortress is in place (so as not to change
 other terrain improvements), and if so, removes the fortress

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasAirbase
```
function gen.hasAirbase(tile: table|tileObject)
  -> boolean
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeAirbase
```
function gen.placeAirbase(tile: table|tileObject)
```
 places an airbase on a tile as long as there is not already
 pollution, fortress, or transporter on the tile
 does nothing if city present

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeAirbaseForce
```
function gen.placeAirbaseForce(tile: table|tileObject)
```
 places airbase, removing fortress/transporter/pollution if necessary
 if city on tile, nothing happens

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removeAirbase
```
function gen.removeAirbase(tile: table|tileObject)
```
 removes airbase, if one is on tile
 (so that something else doesn't get removed)
 nothing happens if tile is a city

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasPollution
```
function gen.hasPollution(tile: table|tileObject)
  -> boolean
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placePollution
```
function gen.placePollution(tile: table|tileObject)
```
 places pollution, unless the tile has a city, airbase
 or transporter already on the tile

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placePollutionForce
```
function gen.placePollutionForce(tile: table|tileObject)
```
 places pollution, unless the tile has a city, 
 transporters and airbases are removed

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### removePollution
```
function gen.removePollution(tile: table|tileObject)
```
 checks if tile has pollution, and if so, removes it

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### hasTransporter
```
function gen.hasTransporter(tile: table|tileObject)
  -> boolean
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### placeTransporter
```
function gen.placeTransporter(tile: any)
```
 Placing transporters doesn't work.
 This function simply produces an error.
 (This function exists mainly to show this functionality wasn't overlooked.)



### removeTransporter
```
function gen.removeTransporter(tile: table|tileObject)
```
@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)







## City Attribute Functions

These functions change the attribute flags of cities.  Many of these flags have unknown effects.

### isCivilDisorder
```
function gen.isCivilDisorder(city: cityObject)
  -> boolean
```




### setCivilDisorder
```
function gen.setCivilDisorder(city: cityObject)
```




### clearCivilDisorder
```
function gen.clearCivilDisorder(city: cityObject)
```




### isWeLoveTheKing
```
function gen.isWeLoveTheKing(city: cityObject)
  -> boolean
```




### setWeLoveTheKing
```
function gen.setWeLoveTheKing(city: cityObject)
```




### clearWeLoveTheKing
```
function gen.clearWeLoveTheKing(city: cityObject)
```




### isImprovementSold
```
function gen.isImprovementSold(city: cityObject)
  -> boolean
```




### setImprovementSold
```
function gen.setImprovementSold(city: cityObject)
```




### clearImprovementSold
```
function gen.clearImprovementSold(city: cityObject)
```




### isTechnologyStolen
```
function gen.isTechnologyStolen(city: cityObject)
  -> boolean
```




### setTechnologyStolen
```
function gen.setTechnologyStolen(city: cityObject)
```




### clearTechnologyStolen
```
function gen.clearTechnologyStolen(city: cityObject)
```




### isAutoBuild
```
function gen.isAutoBuild(city: cityObject)
  -> boolean
```




### setAutoBuild
```
function gen.setAutoBuild(city: cityObject)
```




### clearAutoBuild
```
function gen.clearAutoBuild(city: cityObject)
```




### isAttribute6
```
function gen.isAttribute6(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute6
```
function gen.setAttribute6(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute6
```
function gen.clearAttribute6(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute7
```
function gen.isAttribute7(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute7
```
function gen.setAttribute7(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute7
```
function gen.clearAttribute7(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isBuildCoastal
```
function gen.isBuildCoastal(city: cityObject)
  -> boolean
```




### setBuildCoastal
```
function gen.setBuildCoastal(city: cityObject)
```




### clearBuildCoastal
```
function gen.clearBuildCoastal(city: cityObject)
```




### isAttribute9
```
function gen.isAttribute9(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute9
```
function gen.setAttribute9(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute9
```
function gen.clearAttribute9(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute10
```
function gen.isAttribute10(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute10
```
function gen.setAttribute10(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute10
```
function gen.clearAttribute10(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute11
```
function gen.isAttribute11(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute11
```
function gen.setAttribute11(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute11
```
function gen.clearAttribute11(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isBuildHydroPlant
```
function gen.isBuildHydroPlant(city: cityObject)
  -> boolean
```




### setBuildHydroPlant
```
function gen.setBuildHydroPlant(city: cityObject)
```




### clearBuildHydroPlant
```
function gen.clearBuildHydroPlant(city: cityObject)
```




### isAttribute13
```
function gen.isAttribute13(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute13
```
function gen.setAttribute13(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute13
```
function gen.clearAttribute13(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute14
```
function gen.isAttribute14(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute14
```
function gen.setAttribute14(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute14
```
function gen.clearAttribute14(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute15
```
function gen.isAttribute15(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute15
```
function gen.setAttribute15(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute15
```
function gen.clearAttribute15(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute16
```
function gen.isAttribute16(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute16
```
function gen.setAttribute16(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute16
```
function gen.clearAttribute16(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isUsedAirport
```
function gen.isUsedAirport(city: cityObject)
  -> boolean
```




### setUsedAirport
```
function gen.setUsedAirport(city: cityObject)
```




### clearUsedAirport
```
function gen.clearUsedAirport(city: cityObject)
```




### isAttribute18
```
function gen.isAttribute18(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute18
```
function gen.setAttribute18(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute18
```
function gen.clearAttribute18(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute19
```
function gen.isAttribute19(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute19
```
function gen.setAttribute19(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute19
```
function gen.clearAttribute19(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute20
```
function gen.isAttribute20(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute20
```
function gen.setAttribute20(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute20
```
function gen.clearAttribute20(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute21
```
function gen.isAttribute21(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute21
```
function gen.setAttribute21(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute21
```
function gen.clearAttribute21(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isBuildShips
```
function gen.isBuildShips(city: cityObject)
  -> boolean
```




### setBuildShips
```
function gen.setBuildShips(city: cityObject)
```




### clearBuildShips
```
function gen.clearBuildShips(city: cityObject)
```




### isCityInvestigated
```
function gen.isCityInvestigated(city: cityObject)
  -> boolean
```




### setCityInvestigated
```
function gen.setCityInvestigated(city: cityObject)
```




### clearCityInvestigated
```
function gen.clearCityInvestigated(city: cityObject)
```




### isAttribute24
```
function gen.isAttribute24(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute24
```
function gen.setAttribute24(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute24
```
function gen.clearAttribute24(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isMilitaryAutoBuild
```
function gen.isMilitaryAutoBuild(city: cityObject)
  -> boolean
```




### setMilitaryAutoBuild
```
function gen.setMilitaryAutoBuild(city: cityObject)
```




### clearMilitaryAutoBuild
```
function gen.clearMilitaryAutoBuild(city: cityObject)
```




### isDomesticAutoBuild
```
function gen.isDomesticAutoBuild(city: cityObject)
  -> boolean
```




### setDomesticAutoBuild
```
function gen.setDomesticAutoBuild(city: cityObject)
```




### clearDomesticAutoBuild
```
function gen.clearDomesticAutoBuild(city: cityObject)
```




### isObjective
```
function gen.isObjective(city: cityObject)
  -> boolean
```




### setObjective
```
function gen.setObjective(city: cityObject)
```




### clearObjective
```
function gen.clearObjective(city: cityObject)
```




### isAttribute28
```
function gen.isAttribute28(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute28
```
function gen.setAttribute28(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute28
```
function gen.clearAttribute28(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isMajorObjective
```
function gen.isMajorObjective(city: cityObject)
  -> boolean
```




### setMajorObjective
```
function gen.setMajorObjective(city: cityObject)
```




### clearMajorObjective
```
function gen.clearMajorObjective(city: cityObject)
```




### isUsedTransporter
```
function gen.isUsedTransporter(city: cityObject)
  -> boolean
```




### setUsedTransporter
```
function gen.setUsedTransporter(city: cityObject)
```




### clearUsedTransporter
```
function gen.clearUsedTransporter(city: cityObject)
```




### isAttribute31
```
function gen.isAttribute31(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute31
```
function gen.setAttribute31(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute31
```
function gen.clearAttribute31(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### isAttribute32
```
function gen.isAttribute32(city: cityObject)
  -> boolean
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### setAttribute32
```
function gen.setAttribute32(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.



### clearAttribute32
```
function gen.clearAttribute32(city: cityObject)
```
 The function of this byte in `city.attributes` is currently unknown.  If you discover it, please inform the Scenario League at Civfanatics.







## Unit Order Functions

These functions interact with the orders given to units.

### isFortifying
```
function gen.isFortifying(unit: unitObject)
  -> boolean
```




### setToFortifying
```
function gen.setToFortifying(unit: unitObject)
```




### isFortified
```
function gen.isFortified(unit: unitObject)
  -> boolean
```




### setToFortified
```
function gen.setToFortified(unit: unitObject)
```




### isSleeping
```
function gen.isSleeping(unit: unitObject)
  -> boolean
```




### setToSleeping
```
function gen.setToSleeping(unit: unitObject)
```




### isBuildingFortress
```
function gen.isBuildingFortress(unit: unitObject)
  -> boolean
```




### setToBuildingFortress
```
function gen.setToBuildingFortress(unit: unitObject)
```




### isBuildingRoad
```
function gen.isBuildingRoad(unit: unitObject)
  -> boolean
```




### setToBuildingRoad
```
function gen.setToBuildingRoad(unit: unitObject)
```




### isIrrigating
```
function gen.isIrrigating(unit: unitObject)
  -> boolean
```




### setToIrrigating
```
function gen.setToIrrigating(unit: unitObject)
```




### isMining
```
function gen.isMining(unit: unitObject)
  -> boolean
```




### setToMining
```
function gen.setToMining(unit: unitObject)
```




### isTransformingTerrain
```
function gen.isTransformingTerrain(unit: unitObject)
  -> boolean
```




### setToTransformingTerrain
```
function gen.setToTransformingTerrain(unit: unitObject)
```




### isBuildingAirbase
```
function gen.isBuildingAirbase(unit: unitObject)
  -> boolean
```




### setToBuildingAirbase
```
function gen.setToBuildingAirbase(unit: unitObject)
```




### isBuildingTransporter
```
function gen.isBuildingTransporter(unit: unitObject)
  -> boolean
```




### setToBuildingTransporter
```
function gen.setToBuildingTransporter(unit: unitObject)
```




### isCleaningPollution
```
function gen.isCleaningPollution(unit: unitObject)
  -> boolean
```




### setToCleaningPollution
```
function gen.setToCleaningPollution(unit: unitObject)
```




### isGoingTo
```
function gen.isGoingTo(unit: unitObject)
  -> boolean
```
 Returns true if the unit has a goto order, and false otherwise.



### setToGoingTo
```
function gen.setToGoingTo(unit: unitObject, tile: table|tileObject|nil)
```
 gives the unit a goto order for the tile
 if nil is submitted, and the unit already
 has a goto order, the unit will be changed to no orders
 (unit.gotoTile=nil results in an error)
 if the unit has some other order, it will keep that order
 note: this also accepts a table of coordinates as a tile
 (just as all other tile functions do here)

@*param* `tile` — if table, the table must be a tile of coordinates



### isNoOrder
```
function gen.isNoOrder(unit: unitObject)
  -> boolean
```




### setToNoOrders
```
function gen.setToNoOrders(unit: unitObject)
```




### isWaiting
```
function gen.isWaiting(unit: unitObject)
  -> boolean
```




### setToWaiting
```
function gen.setToWaiting(unit: unitObject)
```




### clearWaiting
```
function gen.clearWaiting(unit: unitObject)
```




### isParadropped
```
function gen.isParadropped(unit: unitObject)
  -> boolean
```




### setParadropped
```
function gen.setParadropped(unit: unitObject)
```




### clearParadropped
```
function gen.clearParadropped(unit: unitObject)
```




### isMoved
```
function gen.isMoved(unit: unitObject)
  -> boolean
```
 The game sets this flag when a unit moves (even if no movement points are spent).  The Unit won't heal on next turn if this flag is set.



### setMoved
```
function gen.setMoved(unit: unitObject)
```
 The game sets this flag when a unit moves (even if no movement points are spent).  The Unit won't heal on next turn if this flag is set.



### clearMoved
```
function gen.clearMoved(unit: unitObject)
```
 The game sets this flag when a unit moves (even if no movement points are spent).  The Unit won't heal on next turn if this flag is set.







## Unit Type Flag Functions

These functions interact with the unit special ability flags.

### isSeeTwoSpaces
```
function gen.isSeeTwoSpaces(unitType: unitTypeObject)
  -> boolean
```




### giveSeeTwoSpaces
```
function gen.giveSeeTwoSpaces(unitType: unitTypeObject)
```




### removeSeeTwoSpaces
```
function gen.removeSeeTwoSpaces(unitType: unitTypeObject)
```




### isIgnoreZOC
```
function gen.isIgnoreZOC(unitType: unitTypeObject)
  -> boolean
```




### giveIgnoreZOC
```
function gen.giveIgnoreZOC(unitType: unitTypeObject)
```




### removeIgnoreZOC
```
function gen.removeIgnoreZOC(unitType: unitTypeObject)
```




### isAmphibious
```
function gen.isAmphibious(unitType: unitTypeObject)
  -> boolean
```




### giveAmphibious
```
function gen.giveAmphibious(unitType: unitTypeObject)
```




### removeAmphibious
```
function gen.removeAmphibious(unitType: unitTypeObject)
```




### isSubmarine
```
function gen.isSubmarine(unitType: unitTypeObject)
  -> boolean
```




### giveSubmarine
```
function gen.giveSubmarine(unitType: unitTypeObject)
```




### removeSubmarine
```
function gen.removeSubmarine(unitType: unitTypeObject)
```




### isAttackAir
```
function gen.isAttackAir(unitType: unitTypeObject)
  -> boolean
```




### giveAttackAir
```
function gen.giveAttackAir(unitType: unitTypeObject)
```




### removeAttackAir
```
function gen.removeAttackAir(unitType: unitTypeObject)
```




### isCoastal
```
function gen.isCoastal(unitType: unitTypeObject)
  -> boolean
```




### giveCoastal
```
function gen.giveCoastal(unitType: unitTypeObject)
```




### removeCoastal
```
function gen.removeCoastal(unitType: unitTypeObject)
```




### isIgnoreWalls
```
function gen.isIgnoreWalls(unitType: unitTypeObject)
  -> boolean
```




### giveIgnoreWalls
```
function gen.giveIgnoreWalls(unitType: unitTypeObject)
```




### removeIgnoreWalls
```
function gen.removeIgnoreWalls(unitType: unitTypeObject)
```




### isCarryAir
```
function gen.isCarryAir(unitType: unitTypeObject)
  -> boolean
```




### giveCarryAir
```
function gen.giveCarryAir(unitType: unitTypeObject)
```




### removeCarryAir
```
function gen.removeCarryAir(unitType: unitTypeObject)
```




### isParadrop
```
function gen.isParadrop(unitType: unitTypeObject)
  -> boolean
```




### giveParadrop
```
function gen.giveParadrop(unitType: unitTypeObject)
```




### removeParadrop
```
function gen.removeParadrop(unitType: unitTypeObject)
```




### isAlpine
```
function gen.isAlpine(unitType: unitTypeObject)
  -> boolean
```




### giveAlpine
```
function gen.giveAlpine(unitType: unitTypeObject)
```




### removeAlpine
```
function gen.removeAlpine(unitType: unitTypeObject)
```




### isBonusAgainstHorse
```
function gen.isBonusAgainstHorse(unitType: unitTypeObject)
  -> boolean
```




### giveBonusAgainstHorse
```
function gen.giveBonusAgainstHorse(unitType: unitTypeObject)
```




### removeBonusAgainstHorse
```
function gen.removeBonusAgainstHorse(unitType: unitTypeObject)
```




### isFreeSupportUnderFundamentalism
```
function gen.isFreeSupportUnderFundamentalism(unitType: unitTypeObject)
  -> boolean
```




### giveFreeSupportUnderFundamentalism
```
function gen.giveFreeSupportUnderFundamentalism(unitType: unitTypeObject)
```




### removeFreeSupportUnderFundamentalism
```
function gen.removeFreeSupportUnderFundamentalism(unitType: unitTypeObject)
```




### isDestroyedAfterAttacking
```
function gen.isDestroyedAfterAttacking(unitType: unitTypeObject)
  -> boolean
```




### giveDestroyedAfterAttacking
```
function gen.giveDestroyedAfterAttacking(unitType: unitTypeObject)
```




### removeDestroyedAfterAttacking
```
function gen.removeDestroyedAfterAttacking(unitType: unitTypeObject)
```




### isBonusAgainstAir
```
function gen.isBonusAgainstAir(unitType: unitTypeObject)
  -> boolean
```




### giveBonusAgainstAir
```
function gen.giveBonusAgainstAir(unitType: unitTypeObject)
```




### removeBonusAgainstAir
```
function gen.removeBonusAgainstAir(unitType: unitTypeObject)
```




### isSpotSubmarines
```
function gen.isSpotSubmarines(unitType: unitTypeObject)
  -> boolean
```




### giveSpotSubmarines
```
function gen.giveSpotSubmarines(unitType: unitTypeObject)
```




### removeSpotSubmarines
```
function gen.removeSpotSubmarines(unitType: unitTypeObject)
```




### isInvisibleUntilAttack
```
function gen.isInvisibleUntilAttack(unitType: unitTypeObject)
  -> boolean
```




### giveInvisibleUntilAttack
```
function gen.giveInvisibleUntilAttack(unitType: unitTypeObject)
```




### removeInvisibleUntilAttack
```
function gen.removeInvisibleUntilAttack(unitType: unitTypeObject)
```




### isNonDisbandable
```
function gen.isNonDisbandable(unitType: unitTypeObject)
  -> boolean
```




### giveNonDisbandable
```
function gen.giveNonDisbandable(unitType: unitTypeObject)
```




### removeNonDisbandable
```
function gen.removeNonDisbandable(unitType: unitTypeObject)
```




### isZeroRangeAirUnitDamageOverride
```
function gen.isZeroRangeAirUnitDamageOverride(unitType: unitTypeObject)
  -> boolean
```




### giveZeroRangeAirUnitDamageOverride
```
function gen.giveZeroRangeAirUnitDamageOverride(unitType: unitTypeObject)
```




### removeZeroRangeAirUnitDamageOverride
```
function gen.removeZeroRangeAirUnitDamageOverride(unitType: unitTypeObject)
```




### isCannotBuyOffBarbarian
```
function gen.isCannotBuyOffBarbarian(unitType: unitTypeObject)
  -> boolean
```




### giveCannotBuyOffBarbarian
```
function gen.giveCannotBuyOffBarbarian(unitType: unitTypeObject)
```




### removeCannotBuyOffBarbarian
```
function gen.removeCannotBuyOffBarbarian(unitType: unitTypeObject)
```




### isCanCrossImpassableTerrain
```
function gen.isCanCrossImpassableTerrain(unitType: unitTypeObject)
  -> boolean
```




### giveCanCrossImpassableTerrain
```
function gen.giveCanCrossImpassableTerrain(unitType: unitTypeObject)
```




### removeCanCrossImpassableTerrain
```
function gen.removeCanCrossImpassableTerrain(unitType: unitTypeObject)
```




### isBarbarianWillNotExpire
```
function gen.isBarbarianWillNotExpire(unitType: unitTypeObject)
  -> boolean
```




### giveBarbarianWillNotExpire
```
function gen.giveBarbarianWillNotExpire(unitType: unitTypeObject)
```




### removeBarbarianWillNotExpire
```
function gen.removeBarbarianWillNotExpire(unitType: unitTypeObject)
```




### isOverrideSPR
```
function gen.isOverrideSPR(unitType: unitTypeObject)
  -> boolean
```




### giveOverrideSPR
```
function gen.giveOverrideSPR(unitType: unitTypeObject)
```




### removeOverrideSPR
```
function gen.removeOverrideSPR(unitType: unitTypeObject)
```




### isReducePopulationWhenBuilt
```
function gen.isReducePopulationWhenBuilt(unitType: unitTypeObject)
  -> boolean
```




### giveReducePopulationWhenBuilt
```
function gen.giveReducePopulationWhenBuilt(unitType: unitTypeObject)
```




### removeReducePopulationWhenBuilt
```
function gen.removeReducePopulationWhenBuilt(unitType: unitTypeObject)
```




### isRequiresFoodSupport
```
function gen.isRequiresFoodSupport(unitType: unitTypeObject)
  -> boolean
```




### giveRequiresFoodSupport
```
function gen.giveRequiresFoodSupport(unitType: unitTypeObject)
```




### removeRequiresFoodSupport
```
function gen.removeRequiresFoodSupport(unitType: unitTypeObject)
```




### isCanFoundCities
```
function gen.isCanFoundCities(unitType: unitTypeObject)
  -> boolean
```




### giveCanFoundCities
```
function gen.giveCanFoundCities(unitType: unitTypeObject)
```




### removeCanFoundCities
```
function gen.removeCanFoundCities(unitType: unitTypeObject)
```




### isCanImproveTiles
```
function gen.isCanImproveTiles(unitType: unitTypeObject)
  -> boolean
```




### giveCanImproveTiles
```
function gen.giveCanImproveTiles(unitType: unitTypeObject, ignoreError?: boolean)
```
@*param* `ignoreError` — Default is false

 Bestows the ability to improve tiles to units with settler role.
 Units without settler role produce an error, unless ignoreError
 is set to true.



### removeCanImproveTiles
```
function gen.removeCanImproveTiles(unitType: unitTypeObject, ignoreError?: boolean)
```
@*param* `ignoreError` — Default is false

 Removes the ability to improve tiles from units with settler role.
 Units without settler role produce an error, unless ignoreError
 is set to true.



### isAllowedOnMap
```
function gen.isAllowedOnMap(unitType: unitTypeObject, map: integer|mapObject)
  -> boolean
```
Returns true if the `unitType` is allowed on `map`, and false otherwise.



### giveAllowedOnMap
```
function gen.giveAllowedOnMap(unitType: unitTypeObject, map: integer|mapObject)
```
Allows the `unitType` to be on `map`



### removeAllowedOnMap
```
function gen.removeAllowedOnMap(unitType: unitTypeObject, map: integer|mapObject)
```
Forbids the `unitType` to be on `map`



### isNativeTransportBetweenMaps
```
function gen.isNativeTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject)
  -> boolean
```
Returns true if `unitType` can natively teleport between `map1` and `map2`, and false otherwise.
Always returns true if `map1` and `map2` are the same.



### giveNativeTransportBetweenMaps
```
function gen.giveNativeTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject, suppressFailureError?: boolean)
```
Changes the `unitType`'s nativeTransport field so that the
 unit can teleport between `map1` and `map2`.
 (If there are multiple map relationships
 between `map1` and `map2`, there is no guarantee which one will
 be enabled, and, in fact, one may be enabled even if another one
 already grants the relationship.  If such details are important,
 write a function manually.)
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the nativeTransport field is unchanged.

@*param* `suppressFailureError` — if true, invalid map combinations do nothing instead of causing an error.



### removeNativeTransportBetweenMaps
```
function gen.removeNativeTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject, suppressFailureError?: boolean)
```
Changes the `unitType`'s nativeTransport field so that the
 unit can't teleport between `map1` and `map2`.
 (If there are multiple map relationships
 between `map1` and `map2`, all will be removed.)
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the nativeTransport field is unchanged.

@*param* `suppressFailureError` — if true, invalid map combinations do nothing instead of causing an error.



### isBuildTransportBetweenMaps
```
function gen.isBuildTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject)
  -> boolean
```
Returns true if `unitType` can build transporters between `map1` and `map2`, and false otherwise.
Always returns true if `map1` and `map2` are the same.



### giveBuildTransportBetweenMaps
```
function gen.giveBuildTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject, suppressFailureError?: boolean)
```
Changes the `unitType`'s buildTransport field so that the
 unit can build teleporters between `map1` and `map2`.
 (If there are multiple map relationships
 between `map1` and `map2`, there is no guarantee which one will
 be enabled, and, in fact, one may be enabled even if another one
 already grants the relationship.  If such details are important,
 write a function manually.)
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the buildTransport field is unchanged.

@*param* `suppressFailureError` — if true, invalid map combinations do nothing instead of causing an error.



### removeBuildTransportBetweenMaps
```
function gen.removeBuildTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject, suppressFailureError?: boolean)
```
Changes the `unitType`'s buildTransport field so that the
 unit can't build teleporters between `map1` and `map2`.
 (If there are multiple map relationships
 between `map1` and `map2`, all will be set to 0.)
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the buildTransport field is unchanged.

@*param* `suppressFailureError` — if true, invalid map combinations do nothing instead of causing an error.



### isUseTransportBetweenMaps
```
function gen.isUseTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject)
  -> boolean
```
Returns true if `unitType` can build transporters between `map1` and `map2`, and false otherwise.
Always returns true if `map1` and `map2` are the same.



### giveUseTransportBetweenMaps
```
function gen.giveUseTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject, suppressFailureError?: boolean)
```
Changes the `unitType`'s useTransport field so that the
 unit can use teleporters between `map1` and `map2`.
 (If there are multiple map relationships
 between `map1` and `map2`, there is no guarantee which one will
 be enabled, and, in fact, one may be enabled even if another one
 already grants the relationship.  If such details are important,
 write a function manually.)
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the useTransport field is unchanged.

@*param* `suppressFailureError` — if true, invalid map combinations do nothing instead of causing an error.



### removeUseTransportBetweenMaps
```
function gen.removeUseTransportBetweenMaps(unitType: unitTypeObject, map1: integer|mapObject, map2: integer|mapObject, suppressFailureError?: boolean)
```
Changes the `unitType`'s useTransport field so that the
 unit can't use teleporters between `map1` and `map2`.
 (If there are multiple map relationships
 between `map1` and `map2`, all will be set to 0)
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the useTransport field is unchanged.

@*param* `suppressFailureError` — if true, invalid map combinations do nothing instead of causing an error.







## Map Visibility Functions

These functions control what is shown to individual tribes on the map.

### isTileRevealed
```
function gen.isTileRevealed(tile: table|tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if `tile` is revealed to `tribe`, false otherwise.

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### revealTile
```
function gen.revealTile(tile: table|tileObject, tribe: tribeObject)
```
 gen.revealTile(tile,tribe) -> void
 makes `tile` visible to `tribe`

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### coverTile
```
function gen.coverTile(tile: table|tileObject, tribe: tribeObject)
```
 gen.coverTile(tile,tribe) -> void
 covers a tile so it isn't visible to tribe (if it ever was)

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### isUnitStackVisible
```
function gen.isUnitStackVisible(unitOrTile: tileObject|unitObject, tribe: tribeObject, emptyTileReturnValue: <emptyTileReturnValue>)
  -> boolean|<emptyTileReturnValue>
```
 If a unit is provided, returns true if that unit is visible to tribe, and false if not.
 Note: a tribe's own units are visible to it (even though unit.visibility doesn't show this).
 If a tile is provided, returns true if there are units on the tile and the tribe can see them,
 false if units are on the tile and the tribe can't see them, and
 returns emptyTileReturnValue (default nil) if there are no units on the tile.

@*param* `emptyTileReturnValue` — Default value is nil.



### hideUnitStack
```
function gen.hideUnitStack(unitOrTile: table|tileObject|unitObject, tribe: tribeObject)
```
 If a unit is provided, hides the unit and all other units on the tile from tribe
 If a tile is provided, hides all units on the tile (if any are present)

@*param* `unitOrTile` — Can be:<br><br>tileObject<br><br>unitObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### revealUnitStack
```
function gen.revealUnitStack(unitOrTile: table|tileObject|unitObject, tribe: tribeObject)
```
 If a unit is provided, reveals that unit and all other units on the tile
 to the tribe.
 If a tile is provided, reveals all units on the tile to the tribe (if any are present).

@*param* `unitOrTile` — Can be:<br><br>tileObject<br><br>unitObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)



### isCityCharted
```
function gen.isCityCharted(city: cityObject, tribe: tribeObject)
  -> boolean
```
 Returns true if city is "knownTo" tribe (that is,
 will appear on the map if the tile is visible), false otherwise.



### chartCity
```
function gen.chartCity(city: cityObject, tribe: tribeObject, visibleSize?: integer)
```
 Makes city visible to tribe on the map, setting it to visibleSize if provided.
 If city.sizeForTribe[tribe] == 0 (the default value) after this, it is set to 1
 since a city does not appear if city.sizeForTribe[tribe] == 0
 does not change the visibility of the tile.

@*param* `visibleSize` — 1 by default.



### unchartCity
```
function gen.unchartCity(city: any, tribe: any)
```
 Makes a `city` invisible to `tribe` (but doesn't cover the tile in black)
 by changing the knownTo field.



### isIrrigationCharted
```
function gen.isIrrigationCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Irrigation on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartIrrigation
```
function gen.chartIrrigation(tile: tileObject, tribe: tribeObject)
```
 Charts Irrigation on the tribe's map of tile, uncharting any conflicting improvements.



### unchartIrrigation
```
function gen.unchartIrrigation(tile: tileObject, tribe: tribeObject)
```
 Uncharts Irrigation on the tribe's map of tile, if Irrigation has been charted.
 If Irrigation is not charted, the chart remains unchanged.



### isMineCharted
```
function gen.isMineCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Mine on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartMine
```
function gen.chartMine(tile: tileObject, tribe: tribeObject)
```
 Charts Mine on the tribe's map of tile, uncharting any conflicting improvements.



### unchartMine
```
function gen.unchartMine(tile: tileObject, tribe: tribeObject)
```
 Uncharts Mine on the tribe's map of tile, if Mine has been charted.
 If Mine is not charted, the chart remains unchanged.



### isFarmlandCharted
```
function gen.isFarmlandCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Farmland on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartFarmland
```
function gen.chartFarmland(tile: tileObject, tribe: tribeObject)
```
 Charts Farmland on the tribe's map of tile, uncharting any conflicting improvements.



### unchartFarmland
```
function gen.unchartFarmland(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Uncharts Farmland on the tribe's map of tile, if Farmland has been charted.
 If Farmland is not charted, the chart remains unchanged.



### isRoadCharted
```
function gen.isRoadCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Road on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartRoad
```
function gen.chartRoad(tile: tileObject, tribe: tribeObject)
```
 Charts Road on the tribe's map of tile, uncharting any conflicting improvements.



### unchartRoad
```
function gen.unchartRoad(tile: tileObject, tribe: tribeObject)
```
 Uncharts Road on the tribe's map of tile, if Road has been charted.
 If Road is not charted, the chart remains unchanged.



### isRailroadCharted
```
function gen.isRailroadCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Railroad on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartRailroad
```
function gen.chartRailroad(tile: tileObject, tribe: tribeObject)
```
 Charts Railroad on the tribe's map of tile, uncharting any conflicting improvements.



### unchartRailroad
```
function gen.unchartRailroad(tile: tileObject, tribe: tribeObject)
```
 Uncharts Railroad on the tribe's map of tile, if Railroad has been charted.
 If Railroad is not charted, the chart remains unchanged.



### unchartTransportation
```
function gen.unchartTransportation(tile: tileObject, tribe: tribeObject)
```
 gen.unchartTransportation(tile,tribe) --> void
 Uncharts road and railroad on the tribe's map of tile.



### isFortressCharted
```
function gen.isFortressCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Fortress on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartFortress
```
function gen.chartFortress(tile: tileObject, tribe: tribeObject)
```
 Charts Fortress on the tribe's map of tile, uncharting any conflicting improvements.



### unchartFortress
```
function gen.unchartFortress(tile: tileObject, tribe: tribeObject)
```
 Uncharts Fortress on the tribe's map of tile, if Fortress has been charted.
 If Fortress is not charted, the chart remains unchanged.



### isAirbaseCharted
```
function gen.isAirbaseCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Airbase on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartAirbase
```
function gen.chartAirbase(tile: tileObject, tribe: tribeObject)
```
 Charts Airbase on the tribe's map of tile, uncharting any conflicting improvements.



### unchartAirbase
```
function gen.unchartAirbase(tile: tileObject, tribe: tribeObject)
```
 Uncharts Airbase on the tribe's map of tile, if Airbase has been charted.
 If Airbase is not charted, the chart remains unchanged.



### isPollutionCharted
```
function gen.isPollutionCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 gen.isPollutionCharted(tile,tribe) --> bool
 Returns true if tribe sees Pollution on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartPollution
```
function gen.chartPollution(tile: tileObject, tribe: tribeObject)
```
 Charts Pollution on the tribe's map of tile, uncharting any conflicting improvements.



### unchartPollution
```
function gen.unchartPollution(tile: tileObject, tribe: tribeObject)
```
 Uncharts Pollution on the tribe's map of tile, if Pollution has been charted.
 If Pollution is not charted, the chart remains unchanged.



### isTransporterCharted
```
function gen.isTransporterCharted(tile: tileObject, tribe: tribeObject)
  -> boolean
```
 Returns true if tribe sees Transporter on the tile, and false otherwise.
 Does not consider if tile is revealed to the tribe.



### chartTransporter
```
function gen.chartTransporter(tile: tileObject, tribe: tribeObject)
```
 Charts Transporter on the tribe's map of tile, uncharting any conflicting improvements.



### unchartTransporter
```
function gen.unchartTransporter(tile: tileObject, tribe: tribeObject)
```
 Uncharts Transporter on the tribe's map of tile, if Transporter has been charted.
 If Transporter is not charted, the chart remains unchanged.



### chartTruthfully
```
function gen.chartTruthfully(tile: tileObject, tribe: tribeObject)
```
 gen.chartTruthfully(tile,tribe) --> void
 Reveals `tile` to `tribe`, and makes visible the tile improvements that actually exist.







## Bitmask Tools

These tools can be helpful if you have a reason to perform bitwise operations.  Note, however, that the General Library might already have a function which can achieve your objective.

### checkBits
```
function gen.checkBits(bitmask: integer|bitmask, bitString: string)
  -> bitsMatch: boolean
```
 Compares the binary representation of an integer with
 a string.  If the string has a 1 in a given place,
 the binary representation of the integer should also
 have a 1.  If the string has a 0 in a given place, the
 binary representation should also have a 0. Any other
 character in the string means the integer can have a
 0 or a 1.  If the integer representation is longer than
 the string, the string is aligned with the smallest
 part of the integer.
```lua
gen.checkBits(0b10101011,"xx10xwqp")-->true
gen.checkBits(0b10101011,"xx11xwqp")-->false
gen.checkBits(0b011110101011,"xx10xwqp")-->true
gen.checkBits(0b011110101011,"xx10xwqp")-->true
```
 note: lua does not actually accept integers specified in binary 
 (though it does for hexidecimal)

@*param* `bitmask` — the number/bitmask to be checked

@*param* `bitString` — specification of bits that should be checked



### setBits
```
function gen.setBits(bitmask: integer|bitmask, bitString: string)
  -> bitmask: bitmask
```
 Sets binary bits in an integer/bitmask to 1 or 0 based on
 the information provided by a string.  Characters that 
 are not 1 or 0 leave the corresponding bit unchanged
 Last character of the string corresponds to the 1's bit
 in the integer (string lines up to the least significant
 part of the number).
```lua
gen.setBits(0b00000000,"xx10xxxx")-->0b00100000
gen.setBits(0b00000000,"xx10xx")-->0b00001000
gen.setBits(0b11111100,"xx0011xx")-->0b11001100
gen.setBits(0b10101011,"xx10xwqp")-->0b10101011
gen.setBits(0b10101011,"xx11xwqp")-->0b10111011
```
 note: lua does not actually accept integers specified in binary (though it does for hexidecimal)

@*param* `bitmask` — the bitmask to change

@*param* `bitString` — specification of bits to set

@*return* `bitmask` — The integer/bitmask after the bits have been set



### printBits
```
gen.printBits --> function
```




### bitmaskToString
```
function gen.bitmaskToString(bitmask: bitmask, numOfBits?: integer)
  -> binaryRepresentation: string
```
 creates the binary representation of integer/bitmask,
 including the numOfBits least significant bits
 if numOfBits is nil, it defaults to 32

@*param* `bitmask` — the bits to print

@*param* `numOfBits` — the number of bits to show (default 32)



### isBit1
```
function gen.isBit1(bitmask: integer, bitNumber: integer)
  -> boolean
```
 tells if bitNumber bit of integer/bitmask is 1 
 (1st bit is the bit for the ones position)
```lua
gen.isBit1(0b00000010,2) -->true
gen.isBit1(0b11111110,1) -->false
```
 note: lua does not actually accept integers specified in binary (though it does accept hexidecimal)

@*param* `bitmask` — bitmask



### isBit0
```
function gen.isBit0(bitmask: integer|bitmask, bitNumber: integer)
  -> boolean
```
 tells if bitNumber bit of integer is 0 
 (1st bit is the bit for the ones position)
```lua
gen.isBit0(0b00000010,2) -->false
gen.isBit0(0b11111110,1) -->true
```
 note: lua does not actually accept integers specified in binary (though it does accept hexidecimal)



### setBit1
```
function gen.setBit1(bitmask: integer|bitmask, bitNumber: integer)
  -> bitmask
```
 sets bitNumber bit of the integer/bitmask to 1
 (1st bit is the bit for the ones position)
```lua
gen.setBit1(0b00000000,3) --> 0b00000100
```
 note: lua does not actually accept integers specified in binary (though it does accept hexidecimal)



### setBit0
```
function gen.setBit0(bitmask: integer|bitmask, bitNumber: integer)
  -> bitmask
```
 sets bitNumber bit of the integer/bitmask to 0
 (1st bit is the bit for the ones position)
```lua
gen.setBit0(0b11111111,3) --> 0b11111011
```
 note: lua does not actually accept integers specified in binary (though it does accept hexidecimal)



### isTransportBetweenMaps
```
function gen.isTransportBetweenMaps(map1: integer|mapObject, map2: integer|mapObject, transportBitmask: bitmask, functionName?: string)
  -> boolean
```
Returns true if the supplied bitmask indicates that transportation
 can take place between `map1` and `map2` (or if they are the same map),
 and false otherwise.

@*param* `functionName` — Carries through the function name for the error if changeRules.lua is not available.



### giveTransportBetweenMaps
```
function gen.giveTransportBetweenMaps(map1: integer|mapObject, map2: integer|mapObject, transportBitmask: bitmask, suppressFailureError?: boolean, functionName?: string)
  -> bitmask
```
Takes the `transportBitmask` for nativeTransport, buildTransport, useTransport,
 and changes an appropriate bit to 1 so that transport exists
 between the maps.  (If there are multiple map relationships
 between `map1` and `map2`, there is no guarantee which one will
 be enabled, and, in fact, one may be enabled even if another one
 already grants the relationship.  If such details are important,
 write a function manually.)
 Returns the new bitmask.
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the original bitmask is returned.

@*param* `suppressFailureError` — set to true so that invalid map pairs do nothing instead of causing errors.



### removeTransportBetweenMaps
```
function gen.removeTransportBetweenMaps(map1: integer|mapObject, map2: integer|mapObject, transportBitmask: bitmask, suppressFailureError?: boolean, functionName?: string)
  -> bitmask
```
Takes the `transportBitmask` for nativeTransport, buildTransport, useTransport,
 and changes all appropriate bit to 0 so that transport no longer exists
 between the maps.  
 Returns the new bitmask.
 If the maps are the same, or there is no possible transportation
 between them, an error is thrown, unless `suppressFailureError`
 is `true`, in which case the original bitmask is returned.

@*param* `suppressFailureError` — set to true so that invalid map pairs do nothing instead of causing errors.







## Alternate Names

This section contains entries with alternate names for functions.  This is often because the function's primary name was changed, but the original name is kept available for backwards compatibility.  Sometimes, the alternate name is simply shorter.

### isAttribute17
```
gen.isAttribute17 --> function
```






Alternate name for [gen.isUsedAirport](#isusedairport).

### setAttribute17
```
gen.setAttribute17 --> function
```






Alternate name for [gen.setUsedAirport](#setusedairport).

### clearAttribute17
```
gen.clearAttribute17 --> function
```






Alternate name for [gen.clearUsedAirport](#clearusedairport).

### isAttribute23
```
gen.isAttribute23 --> function
```






Alternate name for [gen.isCityInvestigated](#iscityinvestigated).

### setAttribute23
```
gen.setAttribute23 --> function
```






Alternate name for [gen.setCityInvestigated](#setcityinvestigated).

### clearAttribute23
```
gen.clearAttribute23 --> function
```






Alternate name for [gen.clearCityInvestigated](#clearcityinvestigated).

### isAttribute30
```
gen.isAttribute30 --> function
```






Alternate name for [gen.isUsedTransporter](#isusedtransporter).

### setAttribute30
```
gen.setAttribute30 --> function
```






Alternate name for [gen.setUsedTransporter](#setusedtransporter).

### clearAttribute30
```
gen.clearAttribute30 --> function
```






Alternate name for [gen.clearUsedTransporter](#clearusedtransporter).

### describeAllowableData
```
gen.describeAllowableData --> function
```






Alternate name for [gen.describeAllowableValues](#describeallowablevalues).

### checkValidDataInfo
```
gen.checkValidDataInfo --> function
```






Alternate name for [gen.validateValueSpecificationKeys](#validatevaluespecificationkeys).

### valueSatisfiesValidDataInfo
```
gen.valueSatisfiesValidDataInfo --> function
```






Alternate name for [gen.validateValueSpecificationKeys](#validatevaluespecificationkeys).

### tableOfVDI
```
gen.tableOfVDI --> function
```






Alternate name for [gen.tableOfValueSpecification](#tableofvaluespecification).

### vDIOrTableOfVDI
```
gen.vDIOrTableOfVDI --> function
```






Alternate name for [gen.valueSpecificationOrTableOfValueSpecification](#valuespecificationortableofvaluespecification).

### valueSpecOrTable
```
gen.valueSpecOrTable --> function
```






Alternate name for [gen.valueSpecificationOrTableOfValueSpecification](#valuespecificationortableofvaluespecification).

### wonderModifiedMoves
```
gen.wonderModifiedMoves --> function
```






Alternate name for [gen.fullHealthMovementAllowance](#fullhealthmovementallowance).

### getBaseTerrainFromId
```
gen.getBaseTerrainFromId --> function
```






Alternate name for [gen.getBaseTerrainFromID](#getbaseterrainfromid).

### getBaseTerrainId
```
gen.getBaseTerrainId --> function
```






Alternate name for [gen.getBaseTerrainID](#getbaseterrainid).

### getTerrainFromId
```
gen.getTerrainFromId --> function
```






Alternate name for [gen.getTerrainFromID](#getterrainfromid).

### getTerrainId
```
gen.getTerrainId --> function
```






Alternate name for [gen.getTerrainID](#getterrainid).

### getTileFromId
```
gen.getTileFromId --> function
```






Alternate name for [gen.getTileFromID](#gettilefromid).

### getTileId
```
gen.getTileId --> function
```






Alternate name for [gen.getTileID](#gettileid).

### giveAmpibious
```
gen.giveAmpibious --> function
```
 backwards compatibility typo





Alternate name for [gen.giveAmphibious](#giveamphibious).

### giveIngoreWalls
```
gen.giveIngoreWalls --> function
```






Alternate name for [gen.giveIgnoreWalls](#giveignorewalls).

### removeSeeTowSpaces
```
gen.removeSeeTowSpaces --> function
```
 Note: The typo is preserved, on the off chance that
 someone used it





Alternate name for [gen.removeSeeTwoSpace](#removeseetwospace).





## Event and Module Machinery

These functions help modules work, or are used to provide functionality
which was not substantial enough to merit a separate module.

### rehomeUnitsInCapturedCity
```
function gen.rehomeUnitsInCapturedCity(city: cityObject, defender: tribeObject)
```
 Re-homes units in a captured city to other cities owned by
 the same tribe, so that they are not disbanded.
 <br>If you are using the Lua Scenario Template, you can enable this feature in simpleSettings.lua. 



### linkActivationFunction
```
function gen.linkActivationFunction(activationFn: fun(unit: unitObject, source: boolean))
```
#gen.linkActivationFunction(function(unit,source)-->void)-->void
 If you are using the Lua Scenario Template, there is no need to worry about this function.
 use to specify the code that should be run when a unit is
 activated by gen.activate or gen.activateWtihSource



### getActivationFunction
```
function gen.getActivationFunction()
  -> fun(unit: unitObject, source: boolean)
```
gen.getActivationFunction()-->function(unit,source)
provides the unit activation function linked to the general library



### noGlobal
```
function gen.noGlobal()
```
 gen.noGlobal()
 after gen.noGlobal is run, errors will be generated when trying to create a new
 global variable, or when accessing a global variable that doesn't already exist
 if you want to have a 'console' table to access certain functions from the console,
 you should declare it (but you don't have to fill it) before running this function
 In the Lua Scenario Template, this is run near the top of events.lua



### restoreGlobal
```
function gen.restoreGlobal()
```
 Allows Global variables to be used, if they have been disabled by
 `gen.noGlobal`



### linkState
```
function gen.linkState(stateTable: boolean|string|number|table<string|number, boolean|string|number|table>)
```
 Links the state table to the General Library
 provides access to the state table so that
 gen.getState() can provide it.



### linkGeneralLibraryState
```
function gen.linkGeneralLibraryState(stateTable: boolean|string|number|table<string|number, boolean|string|number|table>)
```
 Links a sub table of the state table for the purposes of
 providing a table for functions in the General Library
 this is distinct from getState, which provides a 
 'visible' state table to the end user



### setDeathFunctions
```
function gen.setDeathFunctions(defeatFn: fun(loser: unitObject, winner: unitObject, aggressor: unitObject, victim: unitObject, loserLocation: tileObject, winnerVetStatus: boolean, loserVetStatus: boolean):unitObject|nil, deathFn: fun(dyingUnit: unitObject), deletionFn: fun(deletedUnit: unitObject, replacingUnit: unitObject|nil), deathNoCombatFn: fun(dyingUnit: unitObject))
```
 gen.setDeathFunctions(defeatFunction,deathFunction,deletionFunction) --> void
 Registers event functions for when units are killed/deleted.
 If you are using the Lua Scenario Template, this is already
 run in events.lua, and you do not need to use this function.
      defeatFunction(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)--> nil or unit
          function for when a unit is defeated either in game combat or in an event representing combat
          if a unit is returned, that is a replacement unit for demotion
      deathFunction(dyingUnit) --> void
          for when a unit 'dies', either in standard or event combat, or through some other event 'kill'
      deletionFunction(deletedUnit,replacingUnit=nil) --> void
          maintenance for when a unit is deleted, either because of combat, death, replacement or some other 'administrative' situation.  If no replacing unit, the replacingUnit argument is nil
  registers functions to be performed when a unit is defeated (either in game combat or events)
  or deleted by events in some other way
      deathNoCombatFn(dyingUnit) --> void
          for when a unit dies, but not in combat or through the gen.defeatUnit function



### setScenarioDirectory
```
function gen.setScenarioDirectory(directory: string)
```
 Registers `directory` as the path to the current scenario's main directory.  This value is returned by `gen.getScenarioDirectory()`.  If you are using the Lua Scenario Template, this is handled in events.lua, and you do not need to worry about it.



### getScenarioDirectory
```
function gen.getScenarioDirectory()
  -> scenarioMainDirectory: string
```
Returns the scenario's main directory.



### setOutOfRangeMessage
```
function gen.setOutOfRangeMessage(textOrFunction: string|fun(unit: unitObject), title?: string)
```
 This function registers what happens when Lua code causes a
 unit to be destroyed because it is 'out of range/fuel'.  This could be
 because events expended the last movement points of an aircraft,
 or because land/sea units have been given a range using Lua.  
 (No code is run when the standard game detects an aircraft to be
 out of range)<br><br>
 If `textOrFunction` is a string, the text is shown when a unit is 
 lost due to being out of range, with %STRING1 substitutes for the unit type's name.  `title` provides the title for the box.

 If `textOrFunction` is a `function(unit) -> void`, the
 function is exectued, and is trusted to generate the 
 the function is trusted to generate a suitable message.
 <br><br> In the Lua Scenario Template, this function is called in `parameters.lua`



### outOfRangeMessage
```
function gen.outOfRangeMessage(unit: unitObject)
```
 Shows the 'out of range' message for `unit`.
 The message is registered by `gen.setOutOfRangeMessage`.



### activateRangeForLandAndSea
```
function gen.activateRangeForLandAndSea(restoreRangeFn?: fun(unit: unitObject):boolean, applyToAI?: boolean)
```
This function makes land and sea units obey the range field in the rules.txt (if they are not 0),
the same way that air units do.  If `applyToAI` is set to true, the AI will lose units as well, but the AI isn't programmed to respect these limitations.
<br><br>
In the Lua Scenario Template, this function is ready to use in simpleSettings.lua.
If you're not using the Template, then this function only works if you've set up the discrete events.


@*param* `restoreRangeFn` — <br>This function governs when a unit's range is restored.  It is checked when the unit enters a tile and also after the unit has been given its last order for the turn (i.e. when the unit has all movement expended and the next unit is activated, or at the end of the turn if it still has movement points e.g. if sleeping).  <br>If true, range is restored, if false range is not restored.<br>By default, range is restored in city squares and on airbases.<br>If you want to clear movement points (like for air units) do it in this function.

@*param* `applyToAI` — If true, the AI's units are lost if they go beyond their range.



### versionFunctions
```
function gen.versionFunctions(moduleTable: table, vNum: number, fileMod: boolean, moduleFileName: string)
```
Provides module with these methods<br>
`module:minVersion(vNumber)`<br>
Causes an error if the module's versionNumber is below vNumber.<br>
`module:recommendedVersion(vNumber)`<br>
Prints a warning to the console if the module's versionNumber is below vNumber.
<br>
Note: Using these methods will stop Lua Language Server from recognizing a require function.  To avoid this, use ---@module "fileName" on the line above:
```lua
---@module "someModuleName"
local someModule = require("someModuleName"):minVersion(2)
```


@*param* `moduleTable` — The table that has the module functions.

@*param* `vNum` — the module's current version number

@*param* `fileMod` — A boolean telling if the file has been modified by the scenario designer.  This way, the error can warn the designer that upgrading may remove some work they did.

@*param* `moduleFileName` — The module's file name.



### registerEventsLuaVersion
```
function gen.registerEventsLuaVersion(vNum: number, fileMod: boolean, regressionNumber: number)
```
 In the Lua Scenario Template, this is called in events.lua, so you do not need to worry about it.
  Registers version information for the events.lua file.<br>
  versionNumber is the events.lua verison number<br>
  fileMod is a boolean that should be true if events.lua has been modified by the scenario designer<br>
  regressionNumber is incremented if events.lua has functionality removed<br>



### setMusicDirectory
```
function gen.setMusicDirectory(path: string)
```
 Tells gen.playMusic to look in this directory for music files.
 In the Lua Scenario Template, the directory is <MainScenarioDirectory>\Sound



### betterUnitManualWait
```
function gen.betterUnitManualWait()
```
 Part of custom unit selection (In the Lua Scenario Template, this can be activated in simpleSettings.lua -- enableCustomUnitSelection
If you're not using the Template, add this code to the onKeyPress event:
```lua
    if civ.getActiveUnit() and keyID == 87 then
        gen.betterUnitManualWait()
    end
```



### clearManualWait
```
function gen.clearManualWait()
```
 this empties the waitingUnits table, so that units
 will appear according to the weight function



### selectNextActiveUnit
```
function gen.selectNextActiveUnit(activeUnit: unitObject, source: boolean, customWeightFn: fun(unit: unitObject, activeUnit: unitObject):integer)
```
 Part of custom unit selection (In the Lua Scenario Template, this can be activated in simpleSettings.lua -- enableCustomUnitSelection
If you're not using the Template, use as the first line inside the function given to `civ.scen.onActivateUnit(function(unit,source)-->void)`.
The line should be
`gen.selectNextActiveUnit(unit,source,customWeightFn)`
(note: if the arguments to function(unit,source)
aren't called 'unit' and 'source', use the actual name)

@*param* `customWeightFn` — returns the "weight" of each possible unit, and selects the lowest weight to be active next



### makeClearAirProtection
```
function gen.makeClearAirProtection()
  -> function
```
#gen.clearAirProtection(tile)-->void
 A basic function to move air units protecting stacks
 from a tile.  See `gen.clearAirProtection` and `gen.clearAdjacentAirProtection`
 for functions to actually use.



### minEventsLuaVersion
```
function gen.minEventsLuaVersion(minVersion: number, regNum: number, fileName: string)
```
 Checks that the events.lua file is up to date, so all of the module's tie ins to the rest of the code base work properly.



### registerAuthoritativeDefaultRules
```
function gen.registerAuthoritativeDefaultRules(aDRTable: table)
```
This function is used to register the authoritativeDefaultRules
table from changeRules.lua to be used in the General Library.
All functions in the General Library will function appropriately
even if the authoritativeDefaultRules are never registered.



### registerCustomCosmic
```
function gen.registerCustomCosmic(cc: table)
```
This function is used to register the customCosmic functions,
so that some generalLibrary functions can use the information
registered by the customCosmic module.

@*param* `cc` — The table for the customCosmic module.



### requireIfAvailable
```
function gen.requireIfAvailable(fileName: string)
  -> fileFound: boolean
  2. modulePrefix: table|nil
```
Attempts to require the module called fileName
returns true, modulePrefix if the module is found
returns false, nil if no module is found
makes an error if there is a problem loading the module

@*param* `fileName` — The name of the file to require

@*return* `fileFound` — true if the module was found, false otherwise

@*return* `modulePrefix` — returns the module table if it was found, or nil if not







## Obsolete Functions

These functions exist for backwards compatibility, but they're no longer the preferred (or required) way of doing things.

### isMapFlat
```
function gen.isMapFlat()
  -> mapIsFlat: boolean
```
 gen.isMapFlat()-->boolean
Returns true if the game map is flat, and false if it is round.



### isMapRound
```
function gen.isMapRound()
  -> mapIsRound: boolean
```
 gen.isMapRound()-->boolean
Returns true if the game map is round, and false if it is flat.



### declareMapFlat
```
function gen.declareMapFlat()
```
 gen.declareMapFlat()-->void
 tells this module that the map should be considered flat
 for things like distances and adjacent squares
 no longer has practical effect, since above
 functions access world shape directly with TOTPP v16



### declareMapRound
```
function gen.declareMapRound()
```
 gen.declareMapRound()-->void



### setTerrainType
```
function gen.setTerrainType(tile: table|tileObject, terrainID: integer)
```
 changes the terrain type of tile to terrainID
 have this function, so that if
 terrainType key functionality is changed, this
 function can change instead of all code everywhere

@*param* `tile` — Can be:<br><br>tileObject<br><br>{[1]=xCoord,[2]=yCoord,[3]=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{[1]=xCoord,[2]=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)<br><br>{x=xCoord,y=yCoord,z=zCoord}<br>Converted to civ.getTile(xCoord,yCoord,zCoord) <br><br>{x=xCoord,y=yCoord}<br>Converted to civ.getTile(xCoord,yCoord,0)

@*param* `terrainID` — the id (0-15) of the new baseTerrain type



### activate
```
function gen.activate(unit: any)
```
 Deprecated.  This was written when unit:activate() did not run the civ.scen.onActivateUnit event.
 use to activate a unit.  This assumes that the 'source' of the activation is true
 (i.e. human generated).  Use gen.activateWithSource if false is needed (either sometimes or always)



### activateWithSource
```
function gen.activateWithSource(unit: any, source: any)
```
 Deprecated.  This was written when unit:activate() did not run the civ.scen.onActivateUnit event.
 use to activate a unit and specify the source of the activation







## Uncategorised

These functions have not been assigned to a section.  Some might be new functions which have been automatically documented, but not yet assigned to a section of this page.

### cityProduction
```
function gen.cityProduction(city: cityObject, item: improvementObject|unitTypeObject|wonderObject)
```
Makes the `city` immediately produce the `item`.
That is, the city is given the supplied city improvement or wonder,
or a unit with the type specified.  The function registered to civ.scen.onCityProduction is also called.   

No check is made if the production order is legal.  An item without
appropriate pre-requisites can be created, or a wonder can be moved.




### complementList
```
function gen.complementList(list: table<any, any>, itemIterator: fun():any)
  -> table<integer, any>
```
 Takes a table of items, and an iterator or table of all possible
 items, and returns a list of all items that are not values
 in the table.  If the iterator is a table, only the
 values in the table are considered.
 These functions might be useful:
 `gen.iterateUnitTypes()`
 `gen.iterateImprovements()`
 `gen.iterateWonders()`
 `gen.iterateBaseTerrain()`
 `gen.iterateTerrain()`



### iterateTechs
```
function gen.iterateTechs()
  -> fun():techObject
```
Returns an iterator for all tech objects.



### registerCityProductionFunction
```
function gen.registerCityProductionFunction(cityProductionFunction: fun(city: cityObject, prod: improvementObject|unitObject|wonderObject))
```
Registers the function that is called when a city produces something



### registerUpdateCityValidationInfo
```
function gen.registerUpdateCityValidationInfo(changeValidationInfo: fun(city: cityObject))
```
Registers a function that updates the validation information
for a city, to be called when a city's owner is changed.
(This is called in cityData.lua, and will probably not be used
directly by a scenario creator.)



### registerUpdateUnitValidationInfo
```
function gen.registerUpdateUnitValidationInfo(changeValidationInfo: fun(unit: unitObject))
```
Registers a function that updates the validation information
for a unit, to be called when a unit's owner is changed.
(This is called in unitData.lua, and will probably not be used
directly by a scenario creator.)



### sortTableKeysInAscendingValueOrder
```
function gen.sortTableKeysInAscendingValueOrder(table: table)
  -> table<integer, any>
```
Returns an array of all the keys in the table with number values,
in increasing order, starting with the smallest value at index 1.

If there are multiple keys with the same value, the order of those
keys is not guaranteed.

Keys with non-number values are ignored.  If no key has a number value,
an empty table is returned.




### sortTableKeysInDescendingValueOrder
```
function gen.sortTableKeysInDescendingValueOrder(table: table)
  -> table<integer, any>
```
Returns an array of all the keys in the table with number values,
in descending order, starting with the largest value at index 1.

If there are multiple keys with the same value, the order of those
keys is not guaranteed.

Keys with non-number values are ignored.  If no key has a number value,
an empty table is returned.




### transferTileContents
```
function gen.transferTileContents(tile: tileObject, newOwner: tribeObject)
```
Changes the owner of the city and or units on the tile
to newOwner from the current owner.






