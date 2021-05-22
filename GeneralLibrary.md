
<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[Home](index.md)

# General Library

The General Library offers a variety of tools to make it easier to build events.  These functions are divided into two sections:
* [Building Blocks](#building-blocks)
* [Flag Functions](#flag-functions)

The "Building Blocks" are miscellaneous functions that are likely to be useful in building larger events or other modules.  The "Flag Functions," on the other hand, exist to make it easier to work with the many attributes that are stored in blocks of 1's and 0's in memory.

## Building Blocks

## Flag Functions
[Bitwise Tools](#bitwise-tools)  
[Terrain Improvements](#terrain-improvements)  
[Unit Orders](#unit-orders)  
[Unit Type Flags](#unit-type-flags)  
[City Attribute Flags](#city-attribute-flags)  

### Bitwise Tools


<details> <summary><code>gen.checkBits(integer,string) --> boolean</code></summary>
<p style="margin-left: 25px">
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
</p>
</details>

<details><summary><code>gen.setBits(integer,string)-->integer</code></summary><p style="margin-left: 25px">
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
</p>
</details>

<details><summary><code>gen.printBits(integer) --> string</code></summary>
<p style="margin-left: 25px">
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
</p>
</details>

<details><summary><code>gen.isBit1(integer,bitPosition)--> boolean</code></summary><p style="margin-left: 25px">
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
</p>
</details>

<details><summary><code>gen.isBit0(integer,bitPosition)--> boolean</code></summary><p style="margin-left: 25px">
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
</p>
</details>


<details><summary><code>gen.setBit1(integer,bitPosition)-->integer</code></summary><p style="margin-left: 25px">
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
</p>
</details>

<details><summary><code>gen.setBit0(integer,bitPosition)-->integer</code></summary><p style="margin-left: 25px">
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
</p>
</details>

### Terrain Improvements

Any function here that accepts a tile will also
accept a table `{[1]=x,[2]=y,[3]=z}`, a table 
`{[1]=x,[2]=y}` and assume z = 0, or a table
`{x=x,y=y,z=z}`, or a table `{x=x,y=y}` and assume
z = 0

<details><summary><code>gen.hasIrrigation(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasIrrigation(tile)-->boolean
</code>
Returns true if tile has irrigation but no farmland.<br>Returns false otherwise.
</p>
</details>

<details><summary><code>gen.placeIrrigation(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeIrrigation(tile)-->void
</code>
Places irrigation on the tile provided.<br>
Removes mines and farmland if present.<br>
Does nothing if tile has a city.  
</p>
</details>

<details><summary><code>gen.removeIrrigation(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeIrrigation(tile)-->void
</code>
If tile has irrigation but no farmland, removes the irrigation.
<br>Does nothing to farmland.
<br>Does nothing if tile has a city.
</p>
</details>

<details><summary><code>gen.hasMine(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasMine(tile)-->boolean
</code>
Returns true if the tile has a mine, and false otherwise.
</p>
</details>

<details><summary><code>gen.placeMine(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeMine(tile)-->void
</code>
Places mines on the tile provided.
<br>Removes irrigation and farmland if present.
<br>Does nothing if tile has city.
</p>
</details>

<details><summary><code>gen.placeMineUnderCity(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.placeMineUnderCity(tile) --> void
</code>
Places mine on a tile, even if a city is present.
<br>Removes irrigation and farmland if present.
</p>
</details>

<details><summary><code>gen.removeMine(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeMine(tile)-->void
</code>
If tile has mining but no farmland, removes mines.
<br>Does nothing to farmland.
<br>Does nothing if tile has a city.
</p>
</details>

<details><summary><code>gen.removeMineUnderCity(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeMineUnderCity(tile)-->void
</code>
If tile has mining but no farmland, removes mines.
<br>Does nothing to farmland.
<br>Removes mine even if tile has a city.
</p>
</details>

<details><summary><code>gen.hasFarmland(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasFarmland(tile)-->boolean
</code>
Returns true if the tile has farmland.
<br>Returns false otherwise.
</p>
</details>

<details><summary><code>gen.placeFarmland(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeFarmland(tile)-->void
</code>
Places farmland on a tile (removing mining if present).
<br>Does nothing if a city is present.
</p>
</details>

<details><summary><code>gen.removeFarmland(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeFarmland(tile)-->void
</code>
Removes farmland if present.
<br>Does nothing to irrigation or mining.
<br>Does nothing if city present.
</p>
</details>

<details><summary><code>gen.hasAgriculture(tile)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.hasAgriculture(tile)-->bool
</code>
Returns true if tile has irrigation or farmland.
<br>Returns false otherwise.
</p>
</details>

<details><summary><code>gen.improveAgriculture(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.improveAgriculture(tile) --> void
</code>
If tile has no irrigation, places irrigation (even if mining present).
<br>If tile has irrigation, places farmland.
<br>If city present, does nothing.
</p>
</details>

<details><summary><code>gen.degradeAgriculture(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.degradeAgriculture(tile) --> void
</code>
If tile has farmland, reduces it to irrigation.
<br>If tile has irrigation, removes it.
<br>Does nothing if city present.
</p>
</details>

<details><summary><code>gen.removeAgriculture(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.removeAgriculture(tile) --> void
</code>
Removes farmland and irrigation if present.
<br>Does nothing to mining.
<br>Does nothing if city present.
</p>
</details>

<details><summary><code>gen.hasRoad(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasRoad(tile)-->boolean
</code>
Returns true if tile has a road.
<br>Returns false otherwise.
</p>
</details>

<details><summary><code>gen.placeRoad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeRoad(tile)-->void
</code>
Places a road on the tile.<br>
Does nothing if city present.
</p>
</details>

<details><summary><code>gen.removeRoad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeRoad(tile)-->void
</code>
Removes a road if there is a road but no rail.
Doesn't touch rail or cities.
</p>
</details>

<details><summary><code>gen.hasRailroad(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasRailroad(tile)-->boolean
</code>
Returns true if a tile has a railroad (and road).<br>
Returns false otherwise.
</p>
</details>

<details><summary><code>gen.placeRailroad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeRailroad(tile)-->void
</code>
Places a railroad (and road) on a tile.
<br>Does nothing if city is present.
</p>
</details>

<details><summary><code>gen.removeRailroad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeRailroad(tile)-->void
</code>
Removes railroad from a tile if it exits, leaving road intact (if there is already road there).
<br>Does nothing if a city is present.
</p>
</details>

<details><summary><code>gen.hasTransportation(tile) --> boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasTransportation(tile) --> boolean
</code>
Returns true if tile has road or rail, (but not if city, unless an event has placed a road).
<br>Returns false otherwise.
</p>
</details>


<details><summary><code>gen.upgradeTransportation(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.upgradeTransportation(tile) --> void
</code>
Places railroad if road exists, otherwise places road.
<br>Does nothing if city present.
</p>
</details>

<details><summary><code>gen.degradeTransportation(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.degradeTransportation(tile) --> void
</code>
Reduces railroad to road, if rail exists.
<br>If no rail but road, removes road.
<br>If no transportation, does nothing.
<br>If city does nothing.
</p>
</details>

<details><summary><code>gen.removeTransportation(tile) -->void</code></summary><p style="margin-left: 25px">
<code>gen.removeTransportation(tile) -->void
</code>
Removes road and rail, if it exists.
<br>Does nothing if city present.
</p>
</details>

<details><summary><code>gen.hasFortress(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasFortress(tile)-->boolean
</code>
Returns true if the tile has a fortress (and not an airbase).
<br>Returns false otherwise.
</p>
</details>

<details><summary><code>gen.placeFortress(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeFortress(tile)-->void
</code>
Places a fortress on a square, unless there is already a city, transporter, or airbase on the tile.
</p>
</details>

<details><summary><code>gen.placeFortressForce(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeFortressForce(tile)-->void
</code>
Places fortress on a tile (replacing airbase/transporter if necessary).
If city on tile, does nothing.
</p>
</details>

<details><summary><code>gen.removeFortress(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeFortress(tile)-->void
</code>
Checks that a fortress is in place (so as not to change other terrain improvements), and if so, removes the fortress.
</p>
</details>

<details><summary><code>gen.hasAirbase(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasAirbase(tile)-->boolean
</code>
Returns true if a tile has an airbase.
<br>Returns false otherwise.
</p>
</details>

<details><summary><code>gen.placeAirbase(tile)--> void</code></summary><p style="margin-left: 25px">
<code>gen.placeAirbase(tile)--> void
</code>
Places an airbase on a tile as long as there is not already pollution, fortress, or transporter on the tile.
<br>Does nothing if city present
</p>
</details>

<details><summary><code>gen.placeAirbaseForce(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeAirbaseForce(tile)-->void
</code>
Places airbase, removing fortress/transporter/pollution if necessary.
<br>If city on tile, nothing happens.
</p>
</details>

<details><summary><code>gen.removeAirbase(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAirbase(tile)-->void
</code>
Removes airbase, if one is on tile (so that something else doesn't get removed).
<br>Nothing happens if tile has a city.
</p>
</details>

<details><summary><code>gen.hasPollution(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasPollution(tile)-->boolean
</code>
Returns true if a tile has pollution.
<br>Returns false othrewise.
</p>
</details>

<details><summary><code>gen.placePollution(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placePollution(tile)-->void
</code>
Places pollution, unless the tile has a city, airbase or transporter.
</p>
</details>

<details><summary><code>gen.placePollutionForce(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placePollutionForce(tile)-->void
</code>
Places pollution, unless the tile has a city.
<br>Transporters and airbases are removed, if present.
</p>
</details>


<details><summary><code>gen.removePollution(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removePollution(tile)-->void
</code>
Checks if tile has pollution, and if so, removes it.
</p>
</details>

<details><summary><code>gen.hasTransporter(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasTransporter(tile)-->boolean
</code>
Returns true if the tile has a transporter.
<br>Returns false otherwise.
</p>
</details>

<details><summary>Transporters can not be placed by events.</summary>
</details>

<details><summary><code>gen.removeTransporter(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeTransporter(tile)-->void
</code>
Removes transporter from tile if present.
<br>Does nothing if city present.
</p>
</details>


### Unit Orders


<details><summary><code>gen.isFortifying(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isFortifying(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToFortifying(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToFortifying(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isFortified(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isFortified(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToFortified(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToFortified(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isSleeping(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSleeping(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToSleeping(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToSleeping(unit)-->void
</code>

</p>
</details>
<details><summary><code>gen.isBuildingFortress(unit) --> boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingFortress(unit) --> boolean
</code>

</p>
</details>


<details><summary><code>gen.setToBuildingFortress(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingFortress(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBuildingRoad(unit) --> boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingRoad(unit) --> boolean
</code>

</p>
</details>

<details><summary><code>gen.setToBuildingRoad(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingRoad(unit)-->void
</code>

</p>
</details>


<details><summary><code>gen.isIrrigating(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isIrrigating(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToIrrigating(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToIrrigating(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isMining(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMining(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToMining(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToMining(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isTransformingTerrain(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isTransformingTerrain(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToTransformingTerrain(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToTransformingTerrain(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isCleaningPollution(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCleaningPollution(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToCleaningPollution(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToCleaningPollution(unit)-->void
</code>

</p>
</details>
<details><summary><code>gen.isBuildingAirbase(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingAirbase(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToBuildingAirbase(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingAirbase(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBuildingTransporter(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingTransporter(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToBuildingTransporter(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingTransporter(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isGoingTo(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isGoingTo(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToGoingTo(unit,tile or nil)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToGoingTo(unit,tile or nil)-->void
</code>
Gives the unit a goto order for the tile.
<br>If nil is submitted, and the unit already has a goto order, the unit will be changed to no orders.
<br>(setting <code>unit.gotoTile=nil</code> results in an error)
<br>If nil is submitted, and the unit already has some other order, it will keep that order.
<br>Note: this function also accepts a table of coordinates as a tile (just as all other tile functions do in the General Library).
</p>
</details>

<details><summary><code>gen.isNoOrder(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isNoOrder(unit)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setToNoOrders(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToNoOrders(unit)-->void
</code>

</p>
</details>

<details><summary><code>gen.isWaiting(unit)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.isWaiting(unit)-->bool
</code>

</p>
</details>
<details><summary><code>gen.setToWaiting(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToWaiting(unit)-->void
</code>

</p>
</details>
<details><summary><code>gen.clearWaiting(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearWaiting(unit)-->void
</code>

</p>
</details>
<details><summary><code>gen.isParadropped(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isParadropped(unit)-->boolean
</code>

</p>
</details>
<details><summary><code>gen.setParadropped(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setParadropped(unit)-->void
</code>

</p>
</details>
 <details><summary><code>en.clearParadropped(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearParadropped(unit)-->void
</code>

</p>
</details>
<details><summary><code>gen.isMoved(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMoved(unit)-->boolean
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.
</p>
</details>
<details><summary><code>gen.setMoved(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setMoved(unit)-->void
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.
</p>
</details>
<details><summary><code>gen.clearMoved(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearMoved(unit)-->void
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.
</p>
</details>

### Unit Type Flags

<details><summary><code>gen.isSeeTwoSpaces(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSeeTwoSpaces(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveSeeTwoSpaces(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveSeeTwoSpaces(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeSeeTowSpaces(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeSeeTowSpaces(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isIgnoreZOC(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isIgnoreZOC(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveIgnoreZOC(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveIgnoreZOC(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeIgnoreZOC(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeIgnoreZOC(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAmphibious(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAmphibious(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveAmpibious(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveAmpibious(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeAmphibious(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAmphibious(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isSubmarine(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSubmarine(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveSubmarine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveSubmarine(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeSubmarine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeSubmarine(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttackAir(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttackAir(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveAttackAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveAttackAir(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeAttackAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAttackAir(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isCoastal(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCoastal(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveCoastal(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveCoastal(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeCoastal(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeCoastal(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isIgnoreWalls(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isIgnoreWalls(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveIngoreWalls(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveIngoreWalls(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeIgnoreWalls(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeIgnoreWalls(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isCarryAir(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCarryAir(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveCarryAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveCarryAir(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeCarryAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeCarryAir(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isParadrop(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isParadrop(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveParadrop(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveParadrop(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeParadrop(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeParadrop(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAlpine(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAlpine(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveAlpine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveAlpine(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeAlpine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAlpine(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBonusAgainstHorse(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBonusAgainstHorse(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveBonusAgainstHorse(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveBonusAgainstHorse(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeBonusAgainstHorse(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeBonusAgainstHorse(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isFreeSupportUnderFundamentalism(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isFreeSupportUnderFundamentalism(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveFreeSupportUnderFundamentalism(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveFreeSupportUnderFundamentalism(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeFreeSupportUnderFundamentalism(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeFreeSupportUnderFundamentalism(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isDestroyedAfterAttacking(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isDestroyedAfterAttacking(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveDestroyedAfterAttacking(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveDestroyedAfterAttacking(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeDestroyedAfterAttacking(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeDestroyedAfterAttacking(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBonusAgainstAir(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBonusAgainstAir(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveBonusAgainstAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveBonusAgainstAir(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeBonusAgainstAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeBonusAgainstAir(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.isSpotSubmarines(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSpotSubmarines(unitType)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.giveSpotSubmarines(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveSpotSubmarines(unitType)-->void
</code>

</p>
</details>

<details><summary><code>gen.removeSpotSubmarines(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeSpotSubmarines(unitType)-->void
</code>

</p>
</details>


### City Attribute Flags

The functions of many of the city attribute flags are unknown at this time.  As more functionality is discovered, these functions will be given properly descriptive names.  However, for backwards compatibility, `gen.commandAttributeXX` will remain available in the General Library (though it may be removed from this document).  If you discover the function of a flag, please in this [Civfanatics Forum Thread](https://forums.civfanatics.com/threads/totpp-lua-scenario-template.660244/).

<details><summary><code>gen.isCivilDisorder(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCivilDisorder(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setCivilDisorder(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setCivilDisorder(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearCivilDisorder(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearCivilDisorder(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isWeLoveTheKing(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isWeLoveTheKing(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setWeLoveTheKing(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setWeLoveTheKing(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearWeLoveTheKing(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearWeLoveTheKing(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isImprovementSold(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isImprovementSold(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setImprovementSold(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setImprovementSold(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearImprovementSold(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearImprovementSold(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isTechnologyStolen(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isTechnologyStolen(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setTechnologyStolen(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setTechnologyStolen(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearTechnologyStolen(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearTechnologyStolen(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAutoBuild(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAutoBuild(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAutoBuild(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAutoBuild(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute6(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute6(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute6(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute6(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute6(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute6(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute7(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute7(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute7(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute7(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute7(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute7(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBuildCoastal(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildCoastal(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setBuildCoastal(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setBuildCoastal(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearBuildCoastal(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearBuildCoastal(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute9(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute9(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute9(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute9(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute9(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute9(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute10(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute10(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute10(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute10(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute10(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute10(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute11(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute11(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute11(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute11(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute11(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute11(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBuildHydroPlant(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildHydroPlant(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setBuildHydroPlant(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setBuildHydroPlant(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearBuildHydroPlant(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearBuildHydroPlant(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute13(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute13(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute13(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute13(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute13(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute13(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute14(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute14(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute14(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute14(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute14(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute14(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute15(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute15(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute15(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute15(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute15(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute15(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute16(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute16(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute16(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute16(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute16(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute16(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isUsedAirport(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isUsedAirport(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setUsedAirport(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setUsedAirport(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearUsedAirport(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearUsedAirport(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute18(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute18(city)-->boolean
</code>

</p>
</details>


<details><summary><code>gen.setAttribute18(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute18(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute18(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute18(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute19(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute19(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute19(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute19(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute19(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute19(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute20(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute20(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute20(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute20(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute20(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute20(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute21(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute21(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute21(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute21(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute21(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute21(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isBuildShips(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildShips(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setBuildShips(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setBuildShips(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearBuildShips(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearBuildShips(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isCityInvestigated(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCityInvestigated(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setCityInvestigated(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setCityInvestigated(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearCityInvestigated(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearCityInvestigated(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute24(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute24(city)-->boolean
</code>

</p>
</details>


<details><summary><code>gen.setAttribute24(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute24(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute24(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute24(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isMilitaryAutoBuild(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMilitaryAutoBuild(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setMilitaryAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setMilitaryAutoBuild(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearMilitaryAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearMilitaryAutoBuild(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isDomesticAutoBuild(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isDomesticAutoBuild(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setDomesticAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setDomesticAutoBuild(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearDomesticAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearDomesticAutoBuild(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isObjective(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isObjective(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setObjective(city)-->void
</code>
Sets the city as a scenario "objective."
<br>Removes the major objective flag if it is set, since the objective flag overrides it.

</p>
</details>

<details><summary><code>gen.clearObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearObjective(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute28(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute28(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute28(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute28(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute28(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute28(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isMajorObjective(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMajorObjective(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setMajorObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setMajorObjective(city)-->void
</code>
Sets the city as a scenario "Major Objective.
<br>Clears the regular objective flag if it exists, since the objective flag overrides the major objective flag.
</p>
</details>

<details><summary><code>gen.clearMajorObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearMajorObjective(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isUsedTransporter(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isUsedTransporter(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setUsedTransporter(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setUsedTransporter(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearUsedTransporter(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearUsedTransporter(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute31(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute31(city)-->boolean
</code>

</p>
</details>

<details><summary><code>gen.setAttribute31(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute31(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.clearAttribute31(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute31(city)-->void
</code>

</p>
</details>

<details><summary><code>gen.isAttribute32(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute32(city)-->boolean
</code>

</p>
</details>

 <details><summary><code>gen.setAttribute32(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute32(city)-->void
</code>

</p>
</details>

 <details><summary><code>gen.clearAttribute32(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute32(city)-->void
</code>

</p>
</details>