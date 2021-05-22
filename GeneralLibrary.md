
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

## Terrain Improvements

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