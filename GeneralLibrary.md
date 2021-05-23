
<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[Home](index.md)

# General Library

The General Library offers a variety of tools to make it easier to build events.  These functions are divided into several sections:
* [Building Blocks](#building-blocks&uaar;)  
  These are miscellaneous functions that are likely to be useful in building larger events or other modules.
* [Flag Functions](#flag-functions&uarr;)
  These facilitate working with the many attributes that Civilization II stores as 0's and 1's in memory, and which Lua groups together and provides as integers.
* [Small Features](#small-features&uarr;)  
  These functions create features for the Lua Scenario Template that are too small to merit a separate module.
* [Technical Functions](#technical-functions&uarr;)  
  These functions are necessary to integrate the General Library with the Lua Events.  You are unlikely to need these working with the Lua Scenario Template.
* [Obsolete Functions](#obsolete-functions&uarr;)  
  These functions have functionality that has been rendered obsolete by more recent developments.  They are still included in the General Library for backwards compatibility.


## Building Blocks[&uarr;](#general-library)
These are miscellaneous functions that are likely to be useful in building larger events or other modules.

<details><summary><code>gen.applyWonderBonus(wonder,tribe)-->boolean</code></summary>
<code>gen.applyWonderBonus(wonder,tribe)-->boolean</code>

Returns true if the wonder has been built, has not expired or been destroyed, and is owned by the tribe.
<br>Valid Arguments:
<code>
wonder: wonderObject, integer (wonder.id)
tribe: tribeObject, integer (tribe.id)
</code>

<br>
<br>
</details>

<details><summary><code>gen.toTile(tileOrTable)-->tile</code></summary>
<code>gen.toTile(tileOrTable)-->tile</code>
<br> Accepts a tile object or table representing coordinates as an argument, and returns the corresponding tile.  Returns a useful error if an invalid argument is provided, for easier debugging.
<br> If 2 only coordinates are provided in the table, the third is assumed to be 0.
<br>Valid Arguments:
<code>
tileOrTable: tileObject, 
             {[1]=xCoord,[2]=yCoord},
             {[1]=xCoord,[2]=yCoord, [3]=zCoord}, 
             {["x"]=xCoord,["y"]=yCoord}, 
             {["x"]=xCoord,["y"]=yCoord,["z"]=zCoord}
</code>

<br>
<br>
</details>

<details><summary><code>gen.distance(objectA,objectB)-->integer</code></summary>
<code>gen.distance(objectA,objectB)-->integer
gen.distance(objectA,objectB,zDist)-->integer
</code>
Returns the distance in tiles between objects A and B, if they have a natural location.  Also accepts tables of coordinates.  The 'vertical' distance between maps is 0 by default, but the optional argument zDist can change this.  zDist is the distance in tiles, not "coordinates."
<br>Valid Arguments:
<code>
objectA,objectB: tileObject,
              unitObject,
              cityObject,
             {[1]=xCoord,[2]=yCoord},
             {[1]=xCoord,[2]=yCoord, [3]=zCoord}, 
             {["x"]=xCoord,["y"]=yCoord}, 
             {["x"]=xCoord,["y"]=yCoord,["z"]=zCoord}
zDist: integer,nil
</code>

Notes: This doesn't compute the distance using the typical ["Euclidean Distance"](https://en.wikipedia.org/wiki/Euclidean_distance) that you might be familiar with, but rather the ["Taxicab Distance,"](https://en.wikipedia.org/wiki/Taxicab_geometry) so that the result is the number of tiles an air unit would have to cross to get from A to B.  The distance between adjacent tiles on the same map is always 2 in the "Taxicab Distance," even diagonal movement.  This function divides the coordinate distance by 2 to get the result in terms of tiles.

<br>
<br>
</details>

<details><summary><code>gen.tileDist(tileA,tileB)</code></summary>
<code>gen.tileDist(tileA,tileB)
gen.tileDist(tileA,tileB,zDist)</code>  
<br>Computes the distance in tiles between tileA and tileB.  Does not pre-process arguments like gen.distance, so might be slightly quicker (though this will probably never matter).  By default, the vertical distance between maps is 0 tiles, but this can be changed with the optional argument zDist.
<br>Valid Arguments:
<code>
tileA,tileB: tileObject
zDist: integer, nil
</code>

Notes: This doesn't compute the distance using the typical ["Euclidean Distance"](https://en.wikipedia.org/wiki/Euclidean_distance) that you might be familiar with, but rather the ["Taxicab Distance,"](https://en.wikipedia.org/wiki/Taxicab_geometry) so that the result is the number of tiles an air unit would have to cross to get from A to B.  The distance between adjacent tiles on the same map is always 2 in the "Taxicab Distance," even diagonal movement.  This function divides the coordinate distance by 2 to get the result in terms of tiles.

<br>
<br>
</details>

<details>
  <summary> <code>gen.wonderModifiedMoves(unit) --> integer</code> </summary>
  <code>gen.wonderModifiedMoves(unit) -->integer</code>
  
  Returns the movement allowance of a unit, after taking into account nuclear power and wonders.  
  Returns ["atomic" movement points](Jargon.md#atomic-movement-points).  
  Valid Arguments:
  <code>
  unit: unitType
  </code>
  <br>
  <br>
</details>

<details><summary><code>gen.maxMoves(unit) --> integer</code></summary>
<code>gen.maxMoves(unit) --> integer
</code>

Returns movement allowance for a unit after taking damage into account.
Returns ["atomic" movement points](Jargon.md#atomic-movement-points).  
Valid Arguments:
<code>
unit: unitType
</code>
<br>
<br>
</details>

 
<details><summary><code>gen.moveRemaining(unit) --> integer</code></summary>
<code>gen.moveRemaining(unit) --> integer
</code>

Returns the remaining movement allowance for the unit this turn.
<br> Returns ["atomic" movement points](Jargon.md#atomic-movement-points).  
Valid Arguments:
<code>
unit: unitType
</code>
Note: Returns `gen.maxMoves(unit)-unit.moveSpent`
<br>
<br>
</details>



## Flag Functions[&uarr;](#general-library)
These facilitate working with the many attributes that Civilization II stores as 0's and 1's in memory, and which Lua groups together and provides as integers.  
[Bitwise Tools](#bitwise-tools&uarr;)  
[Terrain Improvements](#terrain-improvements&uarr;)  
[Unit Orders](#unit-orders&uarr;)  
[Unit Type Flags](#unit-type-flags&uarr;)  
[City Attribute Flags](#city-attribute-flags&uarr;)  

### Bitwise Tools[&uarr;](#flag-functions&uarr;)


<details> <summary><code>gen.checkBits(integer,string) --> boolean</code></summary>

<code>gen.checkBits(integer,string)-->boolean
</code>
Compares the binary representation of an integer with
a string.  If the string has a 1 in a given place,
the binary representation of the integer should also
have a 1.  If the string has a 0 in a given place, the
binary representation should also have a 0. Any other
character in the string means the integer can have a
0 or a 1.  If the integer representation is longer than
the string, the string is aligned with the smallest
part of the integer.<br>
Examples:
<code>
gen.checkBits(0b10101011,"xx10xwqp")-->true
gen.checkBits(0b10101011,"xx11xwqp")-->false
gen.checkBits(0b011110101011,"xx10xwqp")-->true
gen.checkBits(0b011110101011,"xx10xwqp")-->true
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>

<details><summary><code>gen.setBits(integer,string)-->integer</code></summary>
<code>gen.setBits(integer,string)-->integer
</code>
Sets binary bits in an integer to 1 or 0 based on
the information provided by a string.  Characters in the string that 
are not 1 or 0 leave the corresponding bit unchanged. 
The last character of the string corresponds to the 1's bit in the integer (string lines up to the least significant part of the number).<br>
Examples:
<code>
gen.setBits(0b00000000,"xx10xxxx")-->0b00100000
gen.setBits(0b00000000,"xx10xx")-->0b00001000
gen.setBits(0b11111100,"xx0011xx")-->0b11001100
gen.setBits(0b10101011,"xx10xwqp")-->0b10101011
gen.setBits(0b10101011,"xx11xwqp")-->0b10111011
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>

<details><summary><code>gen.printBits(integer) --> string</code></summary>

<code>gen.printBits(integer) --> string
gen.printBits(integer,numOfBits) --> string
</code>
Returns a string corresponding to the binary representation of the integer.  String is 32 characters long if <code>numOfBits</code> isn't specified.
If <code>numOfBits</code> is specified, that the least significant bits are printed.<br>
Examples:
<code>
gen.printBits(0b11110000) --> "00000000000000000000000011110000"
gen.printBits(0b11110000,8) --> "11110000"
gen.printBits(0b11110000,4) --> "0000"
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>

<details><summary><code>gen.isBit1(integer,bitPosition)--> boolean</code></summary>
<code>gen.isBit1(integer,bitPosition)--> boolean
</code>
Tells if the binary representation of <code>integer</code> has a 1 in the position given by <code>bitPosition</code>.
<code>bitPosition==1</code> corresponds to the ones position in the binary representation of <code>integer</code>.<br>
Examples:
<code>
gen.isBit1(0b00000010,2) --> true
gen.isBit1(0b00000010,1) --> false
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>

<details><summary><code>gen.isBit0(integer,bitPosition)--> boolean</code></summary>
<code>gen.isBit0(integer,bitPosition)--> boolean
</code>
Tells if the binary representation of <code>integer</code> has a 0 in the position given by <code>bitPosition</code>.
<code>bitposition==1</code> corresponds to the ones position in the binary representation of <code>integer</code>.<br>
Examples:
<code>
gen.isBit1(0b11111101,2) --> true
gen.isBit1(0b11111101,1) --> false
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>


<details><summary><code>gen.setBit1(integer,bitPosition)-->integer</code></summary>
<code>gen.setBit1(integer,bitPosition)-->integer
</code>
The input <code>integer</code> is returned modified such that the binary representation of the integer now has a 1 in the position given by <code>bitPosition</code>.   
<code>bitposition==1</code> corresponds to the ones position in the binary representation of <code>integer</code>.<br>
Examples:
<code>
gen.setBit1(0b11000000,2) --> 0b11000010
gen.setBit1(0b11000010,2) --> 0b11000010
gen.setBit1(0b11000000,1) --> 0b11000001
gen.setBit1(0b11000001,1) --> 0b11000001
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>

<details><summary><code>gen.setBit0(integer,bitPosition)-->integer</code></summary>
<code>gen.setBit1(integer,bitPosition)-->integer
</code>
The input <code>integer</code> is returned modified such that the binary representation of the integer now has a 0 in the position given by <code>bitPosition</code>.   
<code>bitposition==1</code> corresponds to the ones position in the binary representation of <code>integer</code>.<br>  
Examples:
<code>
gen.setBit0(0b11001111,2) --> 0b11001101
gen.setBit0(0b11001101,2) --> 0b11001101
gen.setBit0(0b11001111,1) --> 0b11001110
gen.setBit0(0b11001110,1) --> 0b11001110
</code>
Note: Lua does not actually allow you to type in integers specified in binary (though it does allow you to type in hexidecimal by prefixing 0x)

<br>
<br>
</details>

### Terrain Improvements[&uarr;](#flag-functions&uarr;)

Any function here that accepts a tile will also
accept a table `{[1]=x,[2]=y,[3]=z}`, a table 
`{[1]=x,[2]=y}` and assume z = 0, or a table
`{x=x,y=y,z=z}`, or a table `{x=x,y=y}` and assume
z = 0

<details><summary><code>gen.hasIrrigation(tile)-->boolean</code></summary>
<code>gen.hasIrrigation(tile)-->boolean
</code>
Returns true if tile has irrigation but no farmland.<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeIrrigation(tile)-->void</code></summary>
<code>gen.placeIrrigation(tile)-->void
</code>
Places irrigation on the tile provided.<br>
Removes mines and farmland if present.<br>
Does nothing if tile has a city.  

<br>
<br>
</details>

<details><summary><code>gen.removeIrrigation(tile)-->void</code></summary>
<code>gen.removeIrrigation(tile)-->void
</code>
If tile has irrigation but no farmland, removes the irrigation.
<br>Does nothing to farmland.
<br>Does nothing if tile has a city.

<br>
<br>
</details>

<details><summary><code>gen.hasMine(tile)-->boolean</code></summary>
<code>gen.hasMine(tile)-->boolean
</code>
Returns true if the tile has a mine, and false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeMine(tile)-->void</code></summary>
<code>gen.placeMine(tile)-->void
</code>
Places mines on the tile provided.
<br>Removes irrigation and farmland if present.
<br>Does nothing if tile has city.

<br>
<br>
</details>

<details><summary><code>gen.placeMineUnderCity(tile) --> void</code></summary>
<code>gen.placeMineUnderCity(tile) --> void
</code>
Places mine on a tile, even if a city is present.
<br>Removes irrigation and farmland if present.

<br>
<br>
</details>

<details><summary><code>gen.removeMine(tile)-->void</code></summary>
<code>gen.removeMine(tile)-->void
</code>
If tile has mining but no farmland, removes mines.
<br>Does nothing to farmland.
<br>Does nothing if tile has a city.

<br>
<br>
</details>

<details><summary><code>gen.removeMineUnderCity(tile)-->void</code></summary>
<code>gen.removeMineUnderCity(tile)-->void
</code>
If tile has mining but no farmland, removes mines.
<br>Does nothing to farmland.
<br>Removes mine even if tile has a city.

<br>
<br>
</details>

<details><summary><code>gen.hasFarmland(tile)-->boolean</code></summary>
<code>gen.hasFarmland(tile)-->boolean
</code>
Returns true if the tile has farmland.
<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeFarmland(tile)-->void</code></summary>
<code>gen.placeFarmland(tile)-->void
</code>
Places farmland on a tile (removing mining if present).
<br>Does nothing if a city is present.

<br>
<br>
</details>

<details><summary><code>gen.removeFarmland(tile)-->void</code></summary>
<code>gen.removeFarmland(tile)-->void
</code>
Removes farmland if present.
<br>Does nothing to irrigation or mining.
<br>Does nothing if city present.

<br>
<br>
</details>

<details><summary><code>gen.hasAgriculture(tile)-->bool</code></summary>
<code>gen.hasAgriculture(tile)-->bool
</code>
Returns true if tile has irrigation or farmland.
<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.improveAgriculture(tile) --> void</code></summary>
<code>gen.improveAgriculture(tile) --> void
</code>
If tile has no irrigation, places irrigation (even if mining present).
<br>If tile has irrigation, places farmland.
<br>If city present, does nothing.

<br>
<br>
</details>

<details><summary><code>gen.degradeAgriculture(tile) --> void</code></summary>
<code>gen.degradeAgriculture(tile) --> void
</code>
If tile has farmland, reduces it to irrigation.
<br>If tile has irrigation, removes it.
<br>Does nothing if city present.

<br>
<br>
</details>

<details><summary><code>gen.removeAgriculture(tile) --> void</code></summary>
<code>gen.removeAgriculture(tile) --> void
</code>
Removes farmland and irrigation if present.
<br>Does nothing to mining.
<br>Does nothing if city present.

<br>
<br>
</details>

<details><summary><code>gen.hasRoad(tile)-->boolean</code></summary>
<code>gen.hasRoad(tile)-->boolean
</code>
Returns true if tile has a road.
<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeRoad(tile)-->void</code></summary>
<code>gen.placeRoad(tile)-->void
</code>
Places a road on the tile.<br>
Does nothing if city present.

<br>
<br>
</details>

<details><summary><code>gen.removeRoad(tile)-->void</code></summary>
<code>gen.removeRoad(tile)-->void
</code>
Removes a road if there is a road but no rail.
Doesn't touch rail or cities.

<br>
<br>
</details>

<details><summary><code>gen.hasRailroad(tile)-->boolean</code></summary>
<code>gen.hasRailroad(tile)-->boolean
</code>
Returns true if a tile has a railroad (and road).<br>
Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeRailroad(tile)-->void</code></summary>
<code>gen.placeRailroad(tile)-->void
</code>
Places a railroad (and road) on a tile.
<br>Does nothing if city is present.

<br>
<br>
</details>

<details><summary><code>gen.removeRailroad(tile)-->void</code></summary>
<code>gen.removeRailroad(tile)-->void
</code>
Removes railroad from a tile if it exits, leaving road intact (if there is already road there).
<br>Does nothing if a city is present.

<br>
<br>
</details>

<details><summary><code>gen.hasTransportation(tile) --> boolean</code></summary>
<code>gen.hasTransportation(tile) --> boolean
</code>
Returns true if tile has road or rail, (but not if city, unless an event has placed a road).
<br>Returns false otherwise.

<br>
<br>
</details>


<details><summary><code>gen.upgradeTransportation(tile) --> void</code></summary>
<code>gen.upgradeTransportation(tile) --> void
</code>
Places railroad if road exists, otherwise places road.
<br>Does nothing if city present.

<br>
<br>
</details>

<details><summary><code>gen.degradeTransportation(tile) --> void</code></summary>
<code>gen.degradeTransportation(tile) --> void
</code>
Reduces railroad to road, if rail exists.
<br>If no rail but road, removes road.
<br>If no transportation, does nothing.
<br>If city does nothing.

<br>
<br>
</details>

<details><summary><code>gen.removeTransportation(tile) -->void</code></summary>
<code>gen.removeTransportation(tile) -->void
</code>
Removes road and rail, if it exists.
<br>Does nothing if city present.

<br>
<br>
</details>

<details><summary><code>gen.hasFortress(tile)-->boolean</code></summary>
<code>gen.hasFortress(tile)-->boolean
</code>
Returns true if the tile has a fortress (and not an airbase).
<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeFortress(tile)-->void</code></summary>
<code>gen.placeFortress(tile)-->void
</code>
Places a fortress on a square, unless there is already a city, transporter, or airbase on the tile.

<br>
<br>
</details>

<details><summary><code>gen.placeFortressForce(tile)-->void</code></summary>
<code>gen.placeFortressForce(tile)-->void
</code>
Places fortress on a tile (replacing airbase/transporter if necessary).
If city on tile, does nothing.
<br>
<br>
</details>

<details><summary><code>gen.removeFortress(tile)-->void</code></summary>
<code>gen.removeFortress(tile)-->void
</code>
Checks that a fortress is in place (so as not to change other terrain improvements), and if so, removes the fortress.

<br>
<br>
</details>

<details><summary><code>gen.hasAirbase(tile)-->boolean</code></summary>
<code>gen.hasAirbase(tile)-->boolean
</code>
Returns true if a tile has an airbase.
<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary><code>gen.placeAirbase(tile)--> void</code></summary>
<code>gen.placeAirbase(tile)--> void
</code>
Places an airbase on a tile as long as there is not already pollution, fortress, or transporter on the tile.
<br>Does nothing if city present

<br>
<br>
</details>

<details><summary><code>gen.placeAirbaseForce(tile)-->void</code></summary>
<code>gen.placeAirbaseForce(tile)-->void
</code>
Places airbase, removing fortress/transporter/pollution if necessary.
<br>If city on tile, nothing happens.

<br>
<br>
</details>

<details><summary><code>gen.removeAirbase(tile)-->void</code></summary>
<code>gen.removeAirbase(tile)-->void
</code>
Removes airbase, if one is on tile (so that something else doesn't get removed).
<br>Nothing happens if tile has a city.

<br>
<br>
</details>

<details><summary><code>gen.hasPollution(tile)-->boolean</code></summary>
<code>gen.hasPollution(tile)-->boolean
</code>
Returns true if a tile has pollution.
<br>Returns false othrewise.

<br>
<br>
</details>

<details><summary><code>gen.placePollution(tile)-->void</code></summary>
<code>gen.placePollution(tile)-->void
</code>
Places pollution, unless the tile has a city, airbase or transporter.

<br>
<br>
</details>

<details><summary><code>gen.placePollutionForce(tile)-->void</code></summary>
<code>gen.placePollutionForce(tile)-->void
</code>
Places pollution, unless the tile has a city.
<br>Transporters and airbases are removed, if present.

<br>
<br>
</details>


<details><summary><code>gen.removePollution(tile)-->void</code></summary>
<code>gen.removePollution(tile)-->void
</code>
Checks if tile has pollution, and if so, removes it.

<br>
<br>
</details>

<details><summary><code>gen.hasTransporter(tile)-->boolean</code></summary>
<code>gen.hasTransporter(tile)-->boolean
</code>
Returns true if the tile has a transporter.
<br>Returns false otherwise.

<br>
<br>
</details>

<details><summary>Transporters can not be placed by events.</summary>
<br>
<br>
</details>

<details><summary><code>gen.removeTransporter(tile)-->void</code></summary>
<code>gen.removeTransporter(tile)-->void
</code>
Removes transporter from tile if present.
<br>Does nothing if city present.

<br>
<br>
</details>


### Unit Orders[&uarr;](#flag-functions&uarr;)


<details><summary><code>gen.isFortifying(unit)-->boolean</code></summary>
<code>gen.isFortifying(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToFortifying(unit)-->void</code></summary>
<code>gen.setToFortifying(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isFortified(unit)-->boolean</code></summary>
<code>gen.isFortified(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToFortified(unit)-->void</code></summary>
<code>gen.setToFortified(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isSleeping(unit)-->boolean</code></summary>
<code>gen.isSleeping(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToSleeping(unit)-->void</code></summary>
<code>gen.setToSleeping(unit)-->void
</code>


<br>
<br>
</details>
<details><summary><code>gen.isBuildingFortress(unit) --> boolean</code></summary>
<code>gen.isBuildingFortress(unit) --> boolean
</code>


<br>
<br>
</details>


<details><summary><code>gen.setToBuildingFortress(unit)-->void</code></summary>
<code>gen.setToBuildingFortress(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBuildingRoad(unit) --> boolean</code></summary>
<code>gen.isBuildingRoad(unit) --> boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToBuildingRoad(unit)-->void</code></summary>
<code>gen.setToBuildingRoad(unit)-->void
</code>


<br>
<br>
</details>


<details><summary><code>gen.isIrrigating(unit)-->boolean</code></summary>
<code>gen.isIrrigating(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToIrrigating(unit)-->void</code></summary>
<code>gen.setToIrrigating(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isMining(unit)-->boolean</code></summary>
<code>gen.isMining(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToMining(unit)-->void</code></summary>
<code>gen.setToMining(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isTransformingTerrain(unit)-->boolean</code></summary>
<code>gen.isTransformingTerrain(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToTransformingTerrain(unit)-->void</code></summary>
<code>gen.setToTransformingTerrain(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isCleaningPollution(unit)-->boolean</code></summary>
<code>gen.isCleaningPollution(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToCleaningPollution(unit)-->void</code></summary>
<code>gen.setToCleaningPollution(unit)-->void
</code>


<br>
<br>
</details>
<details><summary><code>gen.isBuildingAirbase(unit)-->boolean</code></summary>
<code>gen.isBuildingAirbase(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToBuildingAirbase(unit)-->void</code></summary>
<code>gen.setToBuildingAirbase(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBuildingTransporter(unit)-->boolean</code></summary>
<code>gen.isBuildingTransporter(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToBuildingTransporter(unit)-->void</code></summary>
<code>gen.setToBuildingTransporter(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isGoingTo(unit)-->boolean</code></summary>
<code>gen.isGoingTo(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToGoingTo(unit,tile or nil)-->void</code></summary>
<code>gen.setToGoingTo(unit,tile or nil)-->void
</code>
Gives the unit a goto order for the tile.
<br>If nil is submitted, and the unit already has a goto order, the unit will be changed to no orders.
<br>(setting <code>unit.gotoTile=nil</code> results in an error)
<br>If nil is submitted, and the unit already has some other order, it will keep that order.
<br>Note: this function also accepts a table of coordinates as a tile (just as all other tile functions do in the General Library).

<br>
<br>
</details>

<details><summary><code>gen.isNoOrder(unit)-->boolean</code></summary>
<code>gen.isNoOrder(unit)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setToNoOrders(unit)-->void</code></summary>
<code>gen.setToNoOrders(unit)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isWaiting(unit)-->bool</code></summary>
<code>gen.isWaiting(unit)-->bool
</code>


<br>
<br>
</details>
<details><summary><code>gen.setToWaiting(unit)-->void</code></summary>
<code>gen.setToWaiting(unit)-->void
</code>


<br>
<br>
</details>
<details><summary><code>gen.clearWaiting(unit)-->void</code></summary>
<code>gen.clearWaiting(unit)-->void
</code>


<br>
<br>
</details>
<details><summary><code>gen.isParadropped(unit)-->boolean</code></summary>
<code>gen.isParadropped(unit)-->boolean
</code>


<br>
<br>
</details>
<details><summary><code>gen.setParadropped(unit)-->void</code></summary>
<code>gen.setParadropped(unit)-->void
</code>


<br>
<br>
</details>
 <details><summary><code>en.clearParadropped(unit)-->void</code></summary>
<code>gen.clearParadropped(unit)-->void
</code>


<br>
<br>
</details>
<details><summary><code>gen.isMoved(unit)-->boolean</code></summary>
<code>gen.isMoved(unit)-->boolean
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.

<br>
<br>
</details>
<details><summary><code>gen.setMoved(unit)-->void</code></summary>
<code>gen.setMoved(unit)-->void
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.

<br>
<br>
</details>
<details><summary><code>gen.clearMoved(unit)-->void</code></summary>
<code>gen.clearMoved(unit)-->void
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.

<br>
<br>
</details>

### Unit Type Flags[&uarr;](#flag-functions&uarr;)

<details><summary><code>gen.isSeeTwoSpaces(unitType)-->boolean</code></summary>
<code>gen.isSeeTwoSpaces(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveSeeTwoSpaces(unitType)-->void</code></summary>
<code>gen.giveSeeTwoSpaces(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeSeeTwoSpaces(unitType)-->void</code></summary>
<code>gen.removeSeeTwoSpaces(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isIgnoreZOC(unitType)-->boolean</code></summary>
<code>gen.isIgnoreZOC(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveIgnoreZOC(unitType)-->void</code></summary>
<code>gen.giveIgnoreZOC(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeIgnoreZOC(unitType)-->void</code></summary>
<code>gen.removeIgnoreZOC(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAmphibious(unitType)-->boolean</code></summary>
<code>gen.isAmphibious(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveAmpibious(unitType)-->void</code></summary>
<code>gen.giveAmpibious(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeAmphibious(unitType)-->void</code></summary>
<code>gen.removeAmphibious(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isSubmarine(unitType)-->boolean</code></summary>
<code>gen.isSubmarine(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveSubmarine(unitType)-->void</code></summary>
<code>gen.giveSubmarine(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeSubmarine(unitType)-->void</code></summary>
<code>gen.removeSubmarine(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttackAir(unitType)-->boolean</code></summary>
<code>gen.isAttackAir(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveAttackAir(unitType)-->void</code></summary>
<code>gen.giveAttackAir(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeAttackAir(unitType)-->void</code></summary>
<code>gen.removeAttackAir(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isCoastal(unitType)-->boolean</code></summary>
<code>gen.isCoastal(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveCoastal(unitType)-->void</code></summary>
<code>gen.giveCoastal(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeCoastal(unitType)-->void</code></summary>
<code>gen.removeCoastal(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isIgnoreWalls(unitType)-->boolean</code></summary>
<code>gen.isIgnoreWalls(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveIngoreWalls(unitType)-->void</code></summary>
<code>gen.giveIngoreWalls(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeIgnoreWalls(unitType)-->void</code></summary>
<code>gen.removeIgnoreWalls(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isCarryAir(unitType)-->boolean</code></summary>
<code>gen.isCarryAir(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveCarryAir(unitType)-->void</code></summary>
<code>gen.giveCarryAir(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeCarryAir(unitType)-->void</code></summary>
<code>gen.removeCarryAir(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isParadrop(unitType)-->boolean</code></summary>
<code>gen.isParadrop(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveParadrop(unitType)-->void</code></summary>
<code>gen.giveParadrop(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeParadrop(unitType)-->void</code></summary>
<code>gen.removeParadrop(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAlpine(unitType)-->boolean</code></summary>
<code>gen.isAlpine(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveAlpine(unitType)-->void</code></summary>
<code>gen.giveAlpine(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeAlpine(unitType)-->void</code></summary>
<code>gen.removeAlpine(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBonusAgainstHorse(unitType)-->boolean</code></summary>
<code>gen.isBonusAgainstHorse(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveBonusAgainstHorse(unitType)-->void</code></summary>
<code>gen.giveBonusAgainstHorse(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeBonusAgainstHorse(unitType)-->void</code></summary>
<code>gen.removeBonusAgainstHorse(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isFreeSupportUnderFundamentalism(unitType)-->boolean</code></summary>
<code>gen.isFreeSupportUnderFundamentalism(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveFreeSupportUnderFundamentalism(unitType)-->void</code></summary>
<code>gen.giveFreeSupportUnderFundamentalism(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeFreeSupportUnderFundamentalism(unitType)-->void</code></summary>
<code>gen.removeFreeSupportUnderFundamentalism(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isDestroyedAfterAttacking(unitType)-->boolean</code></summary>
<code>gen.isDestroyedAfterAttacking(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveDestroyedAfterAttacking(unitType)-->void</code></summary>
<code>gen.giveDestroyedAfterAttacking(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeDestroyedAfterAttacking(unitType)-->void</code></summary>
<code>gen.removeDestroyedAfterAttacking(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBonusAgainstAir(unitType)-->boolean</code></summary>
<code>gen.isBonusAgainstAir(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveBonusAgainstAir(unitType)-->void</code></summary>
<code>gen.giveBonusAgainstAir(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeBonusAgainstAir(unitType)-->void</code></summary>
<code>gen.removeBonusAgainstAir(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isSpotSubmarines(unitType)-->boolean</code></summary>
<code>gen.isSpotSubmarines(unitType)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.giveSpotSubmarines(unitType)-->void</code></summary>
<code>gen.giveSpotSubmarines(unitType)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.removeSpotSubmarines(unitType)-->void</code></summary>
<code>gen.removeSpotSubmarines(unitType)-->void
</code>


<br>
<br>
</details>


### City Attribute Flags[&uarr;](#flag-functions&uarr;)

The functions of many of the city attribute flags are unknown at this time.  As more functionality is discovered, these functions will be given properly descriptive names.  However, for backwards compatibility, `gen.commandAttributeXX` will remain available in the General Library (though it may be removed from this document).  If you discover the purpose of a flag, please report it in this [Civfanatics Forum Thread](https://forums.civfanatics.com/threads/totpp-lua-scenario-template.660244/).

<details><summary><code>gen.isCivilDisorder(city)-->boolean</code></summary>
<code>gen.isCivilDisorder(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setCivilDisorder(city)-->void</code></summary>
<code>gen.setCivilDisorder(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearCivilDisorder(city)-->void</code></summary>
<code>gen.clearCivilDisorder(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isWeLoveTheKing(city)-->boolean</code></summary>
<code>gen.isWeLoveTheKing(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setWeLoveTheKing(city)-->void</code></summary>
<code>gen.setWeLoveTheKing(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearWeLoveTheKing(city)-->void</code></summary>
<code>gen.clearWeLoveTheKing(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isImprovementSold(city)-->boolean</code></summary>
<code>gen.isImprovementSold(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setImprovementSold(city)-->void</code></summary>
<code>gen.setImprovementSold(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearImprovementSold(city)-->void</code></summary>
<code>gen.clearImprovementSold(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isTechnologyStolen(city)-->boolean</code></summary>
<code>gen.isTechnologyStolen(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setTechnologyStolen(city)-->void</code></summary>
<code>gen.setTechnologyStolen(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearTechnologyStolen(city)-->void</code></summary>
<code>gen.clearTechnologyStolen(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAutoBuild(city)-->boolean</code></summary>
<code>gen.isAutoBuild(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAutoBuild(city)-->void</code></summary>
<code>gen.setAutoBuild(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAutoBuild(city)-->void</code></summary>
<code>gen.clearAutoBuild(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute6(city)-->boolean</code></summary>
<code>gen.isAttribute6(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute6(city)-->void</code></summary>
<code>gen.setAttribute6(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute6(city)-->void</code></summary>
<code>gen.clearAttribute6(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute7(city)-->boolean</code></summary>
<code>gen.isAttribute7(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute7(city)-->void</code></summary>
<code>gen.setAttribute7(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute7(city)-->void</code></summary>
<code>gen.clearAttribute7(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBuildCoastal(city)-->boolean</code></summary>
<code>gen.isBuildCoastal(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setBuildCoastal(city)-->void</code></summary>
<code>gen.setBuildCoastal(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearBuildCoastal(city)-->void</code></summary>
<code>gen.clearBuildCoastal(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute9(city)-->boolean</code></summary>
<code>gen.isAttribute9(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute9(city)-->void</code></summary>
<code>gen.setAttribute9(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute9(city)-->void</code></summary>
<code>gen.clearAttribute9(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute10(city)-->boolean</code></summary>
<code>gen.isAttribute10(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute10(city)-->void</code></summary>
<code>gen.setAttribute10(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute10(city)-->void</code></summary>
<code>gen.clearAttribute10(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute11(city)-->boolean</code></summary>
<code>gen.isAttribute11(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute11(city)-->void</code></summary>
<code>gen.setAttribute11(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute11(city)-->void</code></summary>
<code>gen.clearAttribute11(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBuildHydroPlant(city)-->boolean</code></summary>
<code>gen.isBuildHydroPlant(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setBuildHydroPlant(city)-->void</code></summary>
<code>gen.setBuildHydroPlant(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearBuildHydroPlant(city)-->void</code></summary>
<code>gen.clearBuildHydroPlant(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute13(city)-->boolean</code></summary>
<code>gen.isAttribute13(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute13(city)-->void</code></summary>
<code>gen.setAttribute13(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute13(city)-->void</code></summary>
<code>gen.clearAttribute13(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute14(city)-->boolean</code></summary>
<code>gen.isAttribute14(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute14(city)-->void</code></summary>
<code>gen.setAttribute14(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute14(city)-->void</code></summary>
<code>gen.clearAttribute14(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute15(city)-->boolean</code></summary>
<code>gen.isAttribute15(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute15(city)-->void</code></summary>
<code>gen.setAttribute15(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute15(city)-->void</code></summary>
<code>gen.clearAttribute15(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute16(city)-->boolean</code></summary>
<code>gen.isAttribute16(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute16(city)-->void</code></summary>
<code>gen.setAttribute16(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute16(city)-->void</code></summary>
<code>gen.clearAttribute16(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isUsedAirport(city)-->boolean</code></summary>
<code>gen.isUsedAirport(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setUsedAirport(city)-->void</code></summary>
<code>gen.setUsedAirport(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearUsedAirport(city)-->void</code></summary>
<code>gen.clearUsedAirport(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute18(city)-->boolean</code></summary>
<code>gen.isAttribute18(city)-->boolean
</code>


<br>
<br>
</details>


<details><summary><code>gen.setAttribute18(city)-->void</code></summary>
<code>gen.setAttribute18(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute18(city)-->void</code></summary>
<code>gen.clearAttribute18(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute19(city)-->boolean</code></summary>
<code>gen.isAttribute19(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute19(city)-->void</code></summary>
<code>gen.setAttribute19(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute19(city)-->void</code></summary>
<code>gen.clearAttribute19(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute20(city)-->boolean</code></summary>
<code>gen.isAttribute20(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute20(city)-->void</code></summary>
<code>gen.setAttribute20(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute20(city)-->void</code></summary>
<code>gen.clearAttribute20(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute21(city)-->boolean</code></summary>
<code>gen.isAttribute21(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute21(city)-->void</code></summary>
<code>gen.setAttribute21(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute21(city)-->void</code></summary>
<code>gen.clearAttribute21(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isBuildShips(city)-->boolean</code></summary>
<code>gen.isBuildShips(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setBuildShips(city)-->void</code></summary>
<code>gen.setBuildShips(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearBuildShips(city)-->void</code></summary>
<code>gen.clearBuildShips(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isCityInvestigated(city)-->boolean</code></summary>
<code>gen.isCityInvestigated(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setCityInvestigated(city)-->void</code></summary>
<code>gen.setCityInvestigated(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearCityInvestigated(city)-->void</code></summary>
<code>gen.clearCityInvestigated(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute24(city)-->boolean</code></summary>
<code>gen.isAttribute24(city)-->boolean
</code>


<br>
<br>
</details>


<details><summary><code>gen.setAttribute24(city)-->void</code></summary>
<code>gen.setAttribute24(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute24(city)-->void</code></summary>
<code>gen.clearAttribute24(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isMilitaryAutoBuild(city)-->boolean</code></summary>
<code>gen.isMilitaryAutoBuild(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setMilitaryAutoBuild(city)-->void</code></summary>
<code>gen.setMilitaryAutoBuild(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearMilitaryAutoBuild(city)-->void</code></summary>
<code>gen.clearMilitaryAutoBuild(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isDomesticAutoBuild(city)-->boolean</code></summary>
<code>gen.isDomesticAutoBuild(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setDomesticAutoBuild(city)-->void</code></summary>
<code>gen.setDomesticAutoBuild(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearDomesticAutoBuild(city)-->void</code></summary>
<code>gen.clearDomesticAutoBuild(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isObjective(city)-->boolean</code></summary>
<code>gen.isObjective(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setObjective(city)-->void</code></summary>
<code>gen.setObjective(city)-->void
</code>
Sets the city as a scenario "objective."
<br>Removes the major objective flag if it is set, since the objective flag overrides it.


<br>
<br>
</details>

<details><summary><code>gen.clearObjective(city)-->void</code></summary>
<code>gen.clearObjective(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute28(city)-->boolean</code></summary>
<code>gen.isAttribute28(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute28(city)-->void</code></summary>
<code>gen.setAttribute28(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute28(city)-->void</code></summary>
<code>gen.clearAttribute28(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isMajorObjective(city)-->boolean</code></summary>
<code>gen.isMajorObjective(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setMajorObjective(city)-->void</code></summary>
<code>gen.setMajorObjective(city)-->void
</code>
Sets the city as a scenario "Major Objective.
<br>Clears the regular objective flag if it exists, since the objective flag overrides the major objective flag.

<br>
<br>
</details>

<details><summary><code>gen.clearMajorObjective(city)-->void</code></summary>
<code>gen.clearMajorObjective(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isUsedTransporter(city)-->boolean</code></summary>
<code>gen.isUsedTransporter(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setUsedTransporter(city)-->void</code></summary>
<code>gen.setUsedTransporter(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearUsedTransporter(city)-->void</code></summary>
<code>gen.clearUsedTransporter(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute31(city)-->boolean</code></summary>
<code>gen.isAttribute31(city)-->boolean
</code>


<br>
<br>
</details>

<details><summary><code>gen.setAttribute31(city)-->void</code></summary>
<code>gen.setAttribute31(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.clearAttribute31(city)-->void</code></summary>
<code>gen.clearAttribute31(city)-->void
</code>


<br>
<br>
</details>

<details><summary><code>gen.isAttribute32(city)-->boolean</code></summary>
<code>gen.isAttribute32(city)-->boolean
</code>


<br>
<br>
</details>

 <details><summary><code>gen.setAttribute32(city)-->void</code></summary>
<code>gen.setAttribute32(city)-->void
</code>
<br>
</details>

 <details><summary><code>gen.clearAttribute32(city)-->void</code></summary>
<code>gen.clearAttribute32(city)-->void
</code>
<br>
<br>
</details>



## Small Features[&uarr;](#general-library)  
  These functions create features for the Lua Scenario Template that are too small to merit a separate module.

## Technical Functions[&uarr;](#general-library)
  These functions are necessary to integrate the General Library with the Lua Events.  You are unlikely to need these working with the Lua Scenario Template.
## Obsolete Functions[&uarr;](#general-library)
  These functions have functionality that has been rendered obsolete by more recent developments.  They are still included in the General Library for backwards compatibility.
