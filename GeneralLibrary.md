
<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[Home](index.md)

# General Library

The General Library offers a variety of tools to make it easier to build events.  These functions are divided into several sections:
* [Replacement Functions](#replacement-functions)
  These functions should be used in place of the similar tools provided by the `civ` library.
* [Building Blocks](#building-blocks)  
  These are miscellaneous functions that are likely to be useful in building larger events or other modules.
* [Flag Functions](#flag-functions)
  These facilitate working with the many attributes that Civilization II stores as 0's and 1's in memory, and which Lua groups together and provides as integers.
* [Small Features](#small-features)  
  These functions create features for the Lua Scenario Template that are too small to merit a separate module.
* [Technical Functions](#technical-functions)  
  These functions are necessary to integrate the General Library with the Lua Events.  You are unlikely to need these working with the Lua Scenario Template.
* [Obsolete Functions](#obsolete-functions)  
  These functions have functionality that has been rendered obsolete by more recent developments.  They are still included in the General Library for backwards compatibility.

## Replacement Functions[&uarr;](#general-library)


<details id="genactivate"><summary><code>gen.activate(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.activate(unit)-->void</code>
<br>Use to activate a unit.  This assumes that the 'source' of the activation is <code>true</code> (i.e. human generated).  Use <code> gen.activateWithSource</code> if false might be needed.
<br>Valid Arguments:
<code>
unit: unitType
</code>
Note: <code>unit:activate()</code> doesn't run the code for the <A href="LuaExecutionPoints.html#unit-activation"> Unit Activation </A> execution point, hence why this is preferred.
<br><a href="#genactivate">Link to Here.</a>
<br>
</p>
</details>

<details id="genactivatesource"><summary><code>gen.activateSource(unit,source)-->void</code></summary><p style="margin-left: 25px">
<code>gen.activateSource(unit,source)-->void
</code>
Use to activate a unit.
<br>Valid Arguments:
<code>
unit: unitType
source: boolean
</code>
Note: <code>unit:activate()</code> doesn't run the code for the <A href="LuaExecutionPoints.html#unit-activation"> Unit Activation </A> execution point, hence why this is preferred.
<br><a href="#genactivatesource">Link to Here.</a>
<br>
</p>
</details>


## Building Blocks[&uarr;](#general-library)
These are miscellaneous functions that are likely to be useful in building larger events or other modules.

<details id="genapplywonderbonus"><summary><code>gen.applyWonderBonus(wonder,tribe)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.applyWonderBonus(wonder,tribe)-->boolean</code>
<br>Returns true if the wonder has been built, has not expired or been destroyed, and is owned by the tribe.
<br>Valid Arguments:
<code>
wonder: wonderObject, integer (wonder.id)
tribe: tribeObject, integer (tribe.id)
</code>
<br><a href="#genapplywonderbonus">Link to Here.</a>
<br>
</p>
</details>


<details id="gentotile"><summary><code>gen.toTile(tileOrTable)-->tile</code></summary><p style="margin-left: 25px">
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
<br><a href="#gentotile">Link to Here.</a>
<br>
</p>
</details>


<details id="gendistance"><summary><code>gen.distance(objectA,objectB)-->integer</code></summary><p style="margin-left: 25px">
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
Notes: This doesn't compute the distance using the typical <A href="https://en.wikipedia.org/wiki/Euclidean_distance"> "Euclidean Distance"</A> that you might be familiar with, but rather the <A href="https://en.wikipedia.org/wiki/Taxicab_geometry"> "Taxicab Distance,"</A> so that the result is the number of tiles an air unit would have to cross to get from A to B.  The distance between adjacent tiles on the same map is always 2 in the "Taxicab Distance," even diagonal movement.  This function divides the coordinate distance by 2 to get the result in terms of tiles.
<br><a href="#gendistance">Link to Here.</a> (Click link, then copy the link from your Browser URL Bar.)
<br>
</p>
</details>


<details id="gentiledist"><summary><code>gen.tileDist(tileA,tileB)</code></summary><p style="margin-left: 25px">
<code>gen.tileDist(tileA,tileB)
gen.tileDist(tileA,tileB,zDist)</code>  
<br>Computes the distance in tiles between tileA and tileB.  Does not pre-process arguments like gen.distance, so might be slightly quicker (though this will probably never matter).  By default, the vertical distance between maps is 0 tiles, but this can be changed with the optional argument zDist.
<br>Valid Arguments:
<code>
tileA,tileB: tileObject
zDist: integer, nil
</code>
Notes: This doesn't compute the distance using the typical <A href="https://en.wikipedia.org/wiki/Euclidean_distance"> "Euclidean Distance"</A> that you might be familiar with, but rather the <A href="https://en.wikipedia.org/wiki/Taxicab_geometry"> "Taxicab Distance,"</A> so that the result is the number of tiles an air unit would have to cross to get from A to B.  The distance between adjacent tiles on the same map is always 2 in the "Taxicab Distance," even diagonal movement.  This function divides the coordinate distance by 2 to get the result in terms of tiles.
<br><a href="#gentiledist">Link to Here.</a> (Click link, then copy the link from your Browser URL Bar.)
<br>
</p>
</details>


<details id="genwondermodifiedmoves"><summary> <code>gen.wonderModifiedMoves(unit) --> integer</code> </summary><p style="margin-left: 25px">
<code>gen.wonderModifiedMoves(unit) -->integer
</code>
Returns the movement allowance of a unit, after taking into account nuclear power and wonders.  
<br>Returns <A href="Jargon.html#atomic-movement-points"> "atomic" movement points</A>.
<br>Valid Arguments:
<code>
unit: unitType
</code>
<br><a href="#genwondermodifiedmoves">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genmaxmoves"><summary><code>gen.maxMoves(unit) --> integer</code></summary><p style="margin-left: 25px">
<code>gen.maxMoves(unit) --> integer
</code>
Returns movement allowance for a unit after taking damage into account.
<br>Returns <A href="Jargon.html#atomic-movement-points"> "atomic" movement points</A>.
<br>Valid Arguments:
<code>
unit: unitType
</code>
<br><a href="#genmaxmoves">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


 
<details id="genmoveremaining"><summary><code>gen.moveRemaining(unit) --> integer</code></summary><p style="margin-left: 25px">
<code>gen.moveRemaining(unit) --> integer
</code>
Returns the remaining movement allowance for the unit this turn.
<br>Returns <A href="Jargon.html#atomic-movement-points"> "atomic" movement points</A>.
<br>Valid Arguments:
<code>
unit: unitType
</code>
Note: Returns `gen.maxMoves(unit)-unit.moveSpent`
<br><a href="#genmoveremaining">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geninpolygon"><summary><code>gen.inPolygon(tile,tableOfCoordinates)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.inPolygon(tile,tableOfCoordinates)-->bool</code>
Considers a polygon with corners given by the tableOfCoordinates.  Function returns true if the tile is within that polygon, and false if it is not.  Map is not considered for this function, even if the coordinates provided have entries for a z coordinate, so you must check it separately.
<br>The <A href="Scripts.html#polygon-maker"> Polygon Maker</A> script will produce valid polygon coordinate tables for you.
<br>Valid Arguments:
<code>
tile: tileObject
tableOfCoordinates: Table with integer keys starting at 1, with no gaps.  Values for these keys are tables {[1]=xCoord,[2]=yCoord}.  Optional key is "doesNotCrossThisX", which has a number value.  
</code>
<br><a href="#geninpolygon">Link to here.</a> (Click link, then copy the link from your browser address bar.)
Notes: The order of the coordinates is the order that you would reach the corners of the polygon if you were drawing its edges without lifting your pen off the paper.  The key <code>"doesNotCrossThisX"</code> represents an x coordinate on the map that the polygon doesn't cross over.  If it is absent, 0 is used.
</p>
</details>


<details id="gencitycansupportanotherunit"><summary><code>gen.cityCanSupportAnotherUnit(city)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.cityCanSupportAnotherUnit(city)-->bool</code>
Returns true if the city has enough production to support all existing units and at least one other unit.  Units that get free support under fundamentalism are still counted as "supported," since they still take up a free support "slot" if they are among the first 8 units supported by the city.
<br>Valid Arguments:
<code>
city: cityObject
<br><a href="#gencitycansupportanotherunit">Link to here.</a> (Click link, then copy the link from your browser address bar.)
</code>
</p>
</details>


<details id="genhometonearestcity"><summary><code>gen.homeToNearestCity(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.homeToNearestCity(unit)-->void</code>
<br> Finds the nearest city (of the same tribe) that can support another unit, and sets the unit's home city to that city.  If there is no suitable city, the unit's home city isn't changed.  (It is <em>not</em> set to <code>nil</code> in this case, so if you want that functionality, use <code>unit.homeCity=nil</code> on the previous line.)
<br>Valid Arguments:
<code>
unit: unitType
</code>
Note: The distance is computed using <code>gen.tileDist</code>.
<br><a href="#genhometonearestcity">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengetactivationfunction"><summary><code>gen.getActivationFunction()-->function(unit,source)</code></summary><p style="margin-left: 25px">
<code>gen.getActivationFunction()-->function(unit,source)</code>
Returns the code to be run when a unit is activated.
<br>Valid Arguments:
<code>
unit: unitType
source: boolean
</code>
Note: Some code might not be available if it isn't necessary to run every single time a unit is activated, such as, for example, the code associated with the <A href="LuaExecutionPoints.html#after-production"> After Production</A> execution point.  The function returned is the one provided through <code>gen.linkActivationFunction</code>.
<br><a href="#gengetactivationfunction">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengettileid"><summary><code>gen.getTileID(tile)-->int </code></summary><p style="margin-left: 25px">
<code>gen.getTileID(tile)-->int
gen.getTileID(x,y)-->int 
gen.getTileID(x,y,z)-->int 
</code>
Returns a single-value numeric key that uniquely identifies a tile on any map.  Very useful if you want to store a tile as a key in a table.  If providing x and y provided, but not z, z is set to 0.
<br>Valid Arguments:
<code>
tile: tileObject
x,y: integers representing map coordinates
x,y,z: integers representing map coordinates. 
</code>
Notes: ID numbers will not be the same in different scenarios (if maps are different sizes).  Function created by Knighttime, and modified by Prof. Garfield.
<br><a href="#gengettileid">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="gengettileid"><summary><code>gen.getTileId(tile)-->int </code></summary><p style="margin-left: 25px">
<code>gen.getTileID(tile)-->int
gen.getTileID(x,y)-->int 
gen.getTileID(x,y,z)-->int 
</code>
Returns a single-value numeric key that uniquely identifies a tile on any map.  Very useful if you want to store a tile as a key in a table.  If providing x and y provided, but not z, z is set to 0.
<br>Valid Arguments:
<code>
tile: tileObject
x,y: integers representing map coordinates
x,y,z: integers representing map coordinates. </code>
<br>Notes: ID numbers will not be the same in different scenarios (if maps are different sizes).  Function created by Knighttime, and modified by Prof. Garfield.
<br> Same function as above, so that you don't have to remember if it is ID or Id.
<br><a href="#gengettileid">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="gengettilefromid"><summary><code>gen.getTileFromID(tileID) --> tileObject</code></summary><p style="margin-left: 25px">
<code>gen.getTileFromID(tileID) --> tileObject</code>
Reverses the function <code>gen.getTileID</code>.
<br>Valid Arguments:
<code>
tileID: integer representing an ID created by gen.getTileID
</code>
<br><a href="#gengettilefromid">Link to here.</a> (Click link, then copy the link from your browser address bar.)
Note: ID numbers will not be the same in different scenarios (if maps are different sizes).
</p>
</details>

<details id="gengettilefromid"><summary><code>gen.getTileFromId(tileID) --> tileObject</code></summary><p style="margin-left: 25px">
<code>gen.getTileFromId(tileID) --> tileObject</code>
Reverses the function <code>gen.getTileID</code>.
<br>Valid Arguments:
<code>
tileID: integer representing an ID created by gen.getTileID
</code>
Note: ID numbers will not be the same in different scenarios (if maps are different sizes).
<br><a href="#gengettilefromid">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br> Same function as above, so that you don't have to remember if it is ID or Id.
</p>
</details>


<details id="genunittypeontile"><summary><code>gen.unitTypeOnTile(tile,unitType)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.unitTypeOnTile(tile,unitType)-->bool
gen.unitTypeOnTile(tile,unitTypeTable)-->bool</code>
<br>Returns true if the tile has the unit type, or any of the unit types listed in the table, if a table is provided.
<br>Returns false otherwise
<br>Valid Arguments:
<code>
tile: tileObject
unitType: unitTypeObject
unitTypeTable: table with all values unitTypeObject
</code>
<br><a href="#genunittypeontile">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengetadjacenttiles"><summary><code>gen.getAdjacentTiles(tile)-->tableOfTiles</code></summary><p style="margin-left: 25px">
<code>gen.getAdjacentTiles(tile)-->tableOfTiles
</code>
Returns a table (indexed by integers) with all adjacent tiles to the input tile.  Table is indexed this way:
<code>
      #       #       #     
  #       #       #       # 
      #       7       #     
  #       8       6       # 
      1      tile     5     
  #       2       4       # 
      #       3       #     
  #       #       #       # 
      #       #       #     
</code>
If any keys do not correspond to a valid tile (at edge of map), the corresponding value for that key is nil.
<br>Valid Arguments:
<code>
tile: tileObject, 
      {[1]=xCoord,[2]=yCoord},
      {[1]=xCoord,[2]=yCoord, [3]=zCoord}, 
      {["x"]=xCoord,["y"]=yCoord}, 
      {["x"]=xCoord,["y"]=yCoord,["z"]=zCoord}
</code>
<br><a href="#gengetadjacenttiles">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genmoveunitadjacent"><summary><code>gen.moveUnitAdjacent(unit)-->tile or false</code></summary><p style="margin-left: 25px">
<code>gen.moveUnitAdjacent(unit)-->tile or false
gen.moveUnitAdjacent(unit,destRankFn)-->tile or false
</code>
Moves unit off its current tile to an adjacent tile.  If the move is successful, the destination tile is returned.  If not, false is returned.
<br> The destRankFn determines the square to move the unit, choosing one of the tiles with the lowest rank.  If destRankFn returns false, the unit won't be moved to that tile under any circumstances.
<br>Valid Arguments:
<code>
unit: unitObject
destRankFn: function(unitToMove,candidateTile) --> integer or false
(unitToMove:unitObject, candidateTile: tileObject)
</code>
The default destRankFn ranks empty tiles as 0 (most preferred), tiles occupied by friendly units as 1, and tiles with enemy units or cities as false (can't move there).
<a href="genmoveunitadjacent">link for here</a>
<br>
</p>
</details>











## Flag Functions[&uarr;](#general-library)
These facilitate working with the many attributes that Civilization II stores as 0's and 1's in memory, and which Lua groups together and provides as integers.  
[Bitwise Tools](#bitwise-tools)  
[Terrain Improvements](#terrain-improvements)  
[Unit Orders](#unit-orders)  
[Unit Type Flags](#unit-type-flags)  
[City Attribute Flags](#city-attribute-flags)  

### Bitwise Tools[&uarr;](#flag-functions)


<details id="gencheckbits"><summary><code>gen.checkBits(integer,string) --> boolean</code></summary><p style="margin-left: 25px">
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
<br><a href="#gencheckbits">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details> 



<details id="gensetbits"><summary><code>gen.setBits(integer,string)-->integer</code></summary><p style="margin-left: 25px">
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
<br><a href="#gensetbits">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genprintbits"><summary><code>gen.printBits(integer) --> string</code></summary><p style="margin-left: 25px">
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
<br><a href="#genprintbits">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbit1"><summary><code>gen.isBit1(integer,bitPosition)--> boolean</code></summary><p style="margin-left: 25px">
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
<br><a href="#genisbit1">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbit0"><summary><code>gen.isBit0(integer,bitPosition)--> boolean</code></summary><p style="margin-left: 25px">
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
<br><a href="#genisbit0">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="gensetbit1"><summary><code>gen.setBit1(integer,bitPosition)-->integer</code></summary><p style="margin-left: 25px">
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
<br><a href="#gensetbit1">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetbit0"><summary><code>gen.setBit0(integer,bitPosition)-->integer</code></summary><p style="margin-left: 25px">
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
<br><a href="#gensetbit0">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


### Terrain Improvements[&uarr;](#flag-functions)

Any function here that accepts a tile will also
accept a table `{[1]=x,[2]=y,[3]=z}`, a table 
`{[1]=x,[2]=y}` and assume z = 0, or a table
`{x=x,y=y,z=z}`, or a table `{x=x,y=y}` and assume
z = 0

<details id="genhasirrigation"><summary><code>gen.hasIrrigation(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasIrrigation(tile)-->boolean
</code>
Returns true if tile has irrigation but no farmland.<br>Returns false otherwise.
<br><a href="#genhasirrigation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplaceirrigation"><summary><code>gen.placeIrrigation(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeIrrigation(tile)-->void
</code>
Places irrigation on the tile provided.<br>
Removes mines and farmland if present.<br>
Does nothing if tile has a city.  
<br><a href="#genplaceirrigation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveirrigation"><summary><code>gen.removeIrrigation(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeIrrigation(tile)-->void
</code>
If tile has irrigation but no farmland, removes the irrigation.
<br>Does nothing to farmland.
<br>Does nothing if tile has a city.
<br><a href="#genremoveirrigation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasmine"><summary><code>gen.hasMine(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasMine(tile)-->boolean
</code>
Returns true if the tile has a mine, and false otherwise.
<br><a href="#genhasmine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacemine"><summary><code>gen.placeMine(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeMine(tile)-->void
</code>
Places mines on the tile provided.
<br>Removes irrigation and farmland if present.
<br>Does nothing if tile has city.
<br><a href="#genplacemine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacemineundercity"><summary><code>gen.placeMineUnderCity(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.placeMineUnderCity(tile) --> void
</code>
Places mine on a tile, even if a city is present.
<br>Removes irrigation and farmland if present.
<br><a href="#genplacemineundercity">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovemine"><summary><code>gen.removeMine(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeMine(tile)-->void
</code>
If tile has mining but no farmland, removes mines.
<br>Does nothing to farmland.
<br>Does nothing if tile has a city.
<br><a href="#genremovemine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovemineundercity"><summary><code>gen.removeMineUnderCity(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeMineUnderCity(tile)-->void
</code>
If tile has mining but no farmland, removes mines.
<br>Does nothing to farmland.
<br>Removes mine even if tile has a city.
<br><a href="#genremovemineundercity">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasfarmland"><summary><code>gen.hasFarmland(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasFarmland(tile)-->boolean
</code>
Returns true if the tile has farmland.
<br>Returns false otherwise.
<br><a href="#genhasfarmland">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="genplacefarmland"><summary><code>gen.placeFarmland(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeFarmland(tile)-->void
</code>
Places farmland on a tile (removing mining if present).
<br>Does nothing if a city is present.
<br><a href="#genplacefarmland">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovefarmland"><summary><code>gen.removeFarmland(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeFarmland(tile)-->void
</code>
Removes farmland if present.
<br>Does nothing to irrigation or mining.
<br>Does nothing if city present.
<br><a href="#genremovefarmland">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasagriculture"><summary><code>gen.hasAgriculture(tile)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.hasAgriculture(tile)-->bool
</code>
Returns true if tile has irrigation or farmland.
<br>Returns false otherwise.
<br><a href="#genhasagriculture">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genimproveagriculture"><summary><code>gen.improveAgriculture(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.improveAgriculture(tile) --> void
</code>
If tile has no irrigation, places irrigation (even if mining present).
<br>If tile has irrigation, places farmland.
<br>If city present, does nothing.
<br><a href="#genimproveagriculture">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gendegradeagriculture"><summary><code>gen.degradeAgriculture(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.degradeAgriculture(tile) --> void
</code>
If tile has farmland, reduces it to irrigation.
<br>If tile has irrigation, removes it.
<br>Does nothing if city present.
<br><a href="#gendegradeagriculture">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveagriculture"><summary><code>gen.removeAgriculture(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.removeAgriculture(tile) --> void
</code>
Removes farmland and irrigation if present.
<br>Does nothing to mining.
<br>Does nothing if city present.
<br><a href="#genremoveagriculture">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasroad"><summary><code>gen.hasRoad(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasRoad(tile)-->boolean
</code>
Returns true if tile has a road.
<br>Returns false otherwise.
<br><a href="#genhasroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplaceroad"><summary><code>gen.placeRoad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeRoad(tile)-->void
</code>
Places a road on the tile.<br>
Does nothing if city present.
<br><a href="#genplaceroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveroad"><summary><code>gen.removeRoad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeRoad(tile)-->void
</code>
Removes a road if there is a road but no rail.
Doesn't touch rail or cities.
<br><a href="#genremoveroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasrailroad"><summary><code>gen.hasRailroad(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasRailroad(tile)-->boolean
</code>
Returns true if a tile has a railroad (and road).<br>
Returns false otherwise.
<br><a href="#genhasrailroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacerailroad"><summary><code>gen.placeRailroad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeRailroad(tile)-->void
</code>
Places a railroad (and road) on a tile.
<br>Does nothing if city is present.
<br><a href="#genplacerailroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoverailroad"><summary><code>gen.removeRailroad(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeRailroad(tile)-->void
</code>
Removes railroad from a tile if it exits, leaving road intact (if there is already road there).
<br>Does nothing if a city is present.
<br><a href="#genremoverailroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhastransportation"><summary><code>gen.hasTransportation(tile) --> boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasTransportation(tile) --> boolean
</code>
Returns true if tile has road or rail, (but not if city, unless an event has placed a road).
<br>Returns false otherwise.
<br><a href="#genhastransportation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="genupgradetransportation"><summary><code>gen.upgradeTransportation(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.upgradeTransportation(tile) --> void
</code>
Places railroad if road exists, otherwise places road.
<br>Does nothing if city present.
<br><a href="#genupgradetransportation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gendegradetransportation"><summary><code>gen.degradeTransportation(tile) --> void</code></summary><p style="margin-left: 25px">
<code>gen.degradeTransportation(tile) --> void
</code>
Reduces railroad to road, if rail exists.
<br>If no rail but road, removes road.
<br>If no transportation, does nothing.
<br>If city does nothing.
<br><a href="#gendegradetransportation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovetransportation"><summary><code>gen.removeTransportation(tile) -->void</code></summary><p style="margin-left: 25px">
<code>gen.removeTransportation(tile) -->void
</code>
Removes road and rail, if it exists.
<br>Does nothing if city present.
<br><a href="#genremovetransportation">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasfortress"><summary><code>gen.hasFortress(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasFortress(tile)-->boolean
</code>
Returns true if the tile has a fortress (and not an airbase).
<br>Returns false otherwise.
<br><a href="#genhasfortress">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacefortress"><summary><code>gen.placeFortress(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeFortress(tile)-->void
</code>
Places a fortress on a square, unless there is already a city, transporter, or airbase on the tile.
<br><a href="#genplacefortress">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacefortressforce"><summary><code>gen.placeFortressForce(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeFortressForce(tile)-->void
</code>
Places fortress on a tile (replacing airbase/transporter if necessary).
If city on tile, does nothing.
<br><a href="#genplacefortressforce">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovefortress"><summary><code>gen.removeFortress(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeFortress(tile)-->void
</code>
Checks that a fortress is in place (so as not to change other terrain improvements), and if so, removes the fortress.
<br><a href="#genremovefortress">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhasairbase"><summary><code>gen.hasAirbase(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasAirbase(tile)-->boolean
</code>
Returns true if a tile has an airbase.
<br>Returns false otherwise.
<br><a href="#genhasairbase">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplaceairbase"><summary><code>gen.placeAirbase(tile)--> void</code></summary><p style="margin-left: 25px">
<code>gen.placeAirbase(tile)--> void
</code>
Places an airbase on a tile as long as there is not already pollution, fortress, or transporter on the tile.
<br>Does nothing if city present
<br><a href="#genplaceairbase">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplaceairbaseforce"><summary><code>gen.placeAirbaseForce(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placeAirbaseForce(tile)-->void
</code>
Places airbase, removing fortress/transporter/pollution if necessary.
<br>If city on tile, nothing happens.
<br><a href="#genplaceairbaseforce">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveairbase"><summary><code>gen.removeAirbase(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAirbase(tile)-->void
</code>
Removes airbase, if one is on tile (so that something else doesn't get removed).
<br>Nothing happens if tile has a city.
<br><a href="#genremoveairbase">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhaspollution"><summary><code>gen.hasPollution(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasPollution(tile)-->boolean
</code>
Returns true if a tile has pollution.
<br>Returns false othrewise.
<br><a href="#genhaspollution">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacepollution"><summary><code>gen.placePollution(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placePollution(tile)-->void
</code>
Places pollution, unless the tile has a city, airbase or transporter.
<br><a href="#genplacepollution">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genplacepollutionforce"><summary><code>gen.placePollutionForce(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.placePollutionForce(tile)-->void
</code>
Places pollution, unless the tile has a city.
<br>Transporters and airbases are removed, if present.
<br><a href="#genplacepollutionforce">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="genremovepollution"><summary><code>gen.removePollution(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removePollution(tile)-->void
</code>
Checks if tile has pollution, and if so, removes it.
<br><a href="#genremovepollution">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genhastransporter"><summary><code>gen.hasTransporter(tile)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.hasTransporter(tile)-->boolean
</code>
Returns true if the tile has a transporter.
<br>Returns false otherwise.
<br><a href="#genhastransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details><summary>Transporters can not be placed by events.</summary><p style="margin-left: 25px">
<br>
</p>
</details>


<details id="genremovetransporter"><summary><code>gen.removeTransporter(tile)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeTransporter(tile)-->void
</code>
Removes transporter from tile if present.
<br>Does nothing if city present.
<br><a href="#genremovetransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



### Unit Orders[&uarr;](#flag-functions)


<details id="genisfortifying"><summary><code>gen.isFortifying(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isFortifying(unit)-->boolean
</code>


<br><a href="#genisfortifying">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettofortifying"><summary><code>gen.setToFortifying(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToFortifying(unit)-->void
</code>


<br><a href="#gensettofortifying">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisfortified"><summary><code>gen.isFortified(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isFortified(unit)-->boolean
</code>


<br><a href="#genisfortified">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettofortified"><summary><code>gen.setToFortified(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToFortified(unit)-->void
</code>


<br><a href="#gensettofortified">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genissleeping"><summary><code>gen.isSleeping(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSleeping(unit)-->boolean
</code>


<br><a href="#genissleeping">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettosleeping"><summary><code>gen.setToSleeping(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToSleeping(unit)-->void
</code>


<br><a href="#gensettosleeping">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genisbuildingfortress"><summary><code>gen.isBuildingFortress(unit) --> boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingFortress(unit) --> boolean
</code>


<br><a href="#genisbuildingfortress">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="gensettobuildingfortress"><summary><code>gen.setToBuildingFortress(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingFortress(unit)-->void
</code>


<br><a href="#gensettobuildingfortress">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbuildingroad"><summary><code>gen.isBuildingRoad(unit) --> boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingRoad(unit) --> boolean
</code>


<br><a href="#genisbuildingroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettobuildingroad"><summary><code>gen.setToBuildingRoad(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingRoad(unit)-->void
</code>


<br><a href="#gensettobuildingroad">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="genisirrigating"><summary><code>gen.isIrrigating(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isIrrigating(unit)-->boolean
</code>


<br><a href="#genisirrigating">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettoirrigating"><summary><code>gen.setToIrrigating(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToIrrigating(unit)-->void
</code>


<br><a href="#gensettoirrigating">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genismining"><summary><code>gen.isMining(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMining(unit)-->boolean
</code>


<br><a href="#genismining">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettomining"><summary><code>gen.setToMining(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToMining(unit)-->void
</code>


<br><a href="#gensettomining">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genistransformingterrain"><summary><code>gen.isTransformingTerrain(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isTransformingTerrain(unit)-->boolean
</code>


<br><a href="#genistransformingterrain">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettotransformingterrain"><summary><code>gen.setToTransformingTerrain(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToTransformingTerrain(unit)-->void
</code>


<br><a href="#gensettotransformingterrain">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geniscleaningpollution"><summary><code>gen.isCleaningPollution(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCleaningPollution(unit)-->boolean
</code>


<br><a href="#geniscleaningpollution">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettocleaningpollution"><summary><code>gen.setToCleaningPollution(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToCleaningPollution(unit)-->void
</code>


<br><a href="#gensettocleaningpollution">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genisbuildingairbase"><summary><code>gen.isBuildingAirbase(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingAirbase(unit)-->boolean
</code>


<br><a href="#genisbuildingairbase">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettobuildingairbase"><summary><code>gen.setToBuildingAirbase(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingAirbase(unit)-->void
</code>


<br><a href="#gensettobuildingairbase">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbuildingtransporter"><summary><code>gen.isBuildingTransporter(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildingTransporter(unit)-->boolean
</code>


<br><a href="#genisbuildingtransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettobuildingtransporter"><summary><code>gen.setToBuildingTransporter(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToBuildingTransporter(unit)-->void
</code>


<br><a href="#gensettobuildingtransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisgoingto"><summary><code>gen.isGoingTo(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isGoingTo(unit)-->boolean
</code>


<br><a href="#genisgoingto">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettogoingto"><summary><code>gen.setToGoingTo(unit,tile or nil)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToGoingTo(unit,tile or nil)-->void
</code>
Gives the unit a goto order for the tile.
<br>If nil is submitted, and the unit already has a goto order, the unit will be changed to no orders.
<br>(setting <code>unit.gotoTile=nil</code> results in an error)
<br>If nil is submitted, and the unit already has some other order, it will keep that order.
<br>Note: this function also accepts a table of coordinates as a tile (just as all other tile functions do in the General Library).

<br><a href="#gensettogoingto">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisnoorder"><summary><code>gen.isNoOrder(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isNoOrder(unit)-->boolean
</code>


<br><a href="#genisnoorder">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettonoorders"><summary><code>gen.setToNoOrders(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToNoOrders(unit)-->void
</code>


<br><a href="#gensettonoorders">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geniswaiting"><summary><code>gen.isWaiting(unit)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.isWaiting(unit)-->bool
</code>


<br><a href="#geniswaiting">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="gensettowaiting"><summary><code>gen.setToWaiting(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setToWaiting(unit)-->void
</code>


<br><a href="#gensettowaiting">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genclearwaiting"><summary><code>gen.clearWaiting(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearWaiting(unit)-->void
</code>


<br><a href="#genclearwaiting">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genisparadropped"><summary><code>gen.isParadropped(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isParadropped(unit)-->boolean
</code>


<br><a href="#genisparadropped">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="gensetparadropped"><summary><code>gen.setParadropped(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setParadropped(unit)-->void
</code>


<br><a href="#gensetparadropped">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genclearparadropped"><summary><code>en.clearParadropped(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearParadropped(unit)-->void
</code>
<br><a href="#genclearparadropped">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genismoved"><summary><code>gen.isMoved(unit)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMoved(unit)-->boolean
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.

<br><a href="#genismoved">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="gensetmoved"><summary><code>gen.setMoved(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setMoved(unit)-->void
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.

<br><a href="#gensetmoved">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genclearmoved"><summary><code>gen.clearMoved(unit)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearMoved(unit)-->void
</code>
The game sets this flag when a unit moves (even if no movement point is spent, such as when travelling on a railroad).
<br> The unit won't heal on the next turn if this flag is set.

<br><a href="#genclearmoved">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


### Unit Type Flags[&uarr;](#flag-functions)

<details id="genisseetwospaces"><summary><code>gen.isSeeTwoSpaces(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSeeTwoSpaces(unitType)-->boolean
</code>


<br><a href="#genisseetwospaces">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengiveseetwospaces"><summary><code>gen.giveSeeTwoSpaces(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveSeeTwoSpaces(unitType)-->void
</code>


<br><a href="#gengiveseetwospaces">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveseetwospaces"><summary><code>gen.removeSeeTwoSpaces(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeSeeTwoSpaces(unitType)-->void
</code>


<br><a href="#genremoveseetwospaces">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisignorezoc"><summary><code>gen.isIgnoreZOC(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isIgnoreZOC(unitType)-->boolean
</code>


<br><a href="#genisignorezoc">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengiveignorezoc"><summary><code>gen.giveIgnoreZOC(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveIgnoreZOC(unitType)-->void
</code>


<br><a href="#gengiveignorezoc">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveignorezoc"><summary><code>gen.removeIgnoreZOC(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeIgnoreZOC(unitType)-->void
</code>


<br><a href="#genremoveignorezoc">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisamphibious"><summary><code>gen.isAmphibious(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAmphibious(unitType)-->boolean
</code>


<br><a href="#genisamphibious">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengiveampibious"><summary><code>gen.giveAmpibious(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveAmpibious(unitType)-->void
</code>


<br><a href="#gengiveampibious">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveamphibious"><summary><code>gen.removeAmphibious(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAmphibious(unitType)-->void
</code>


<br><a href="#genremoveamphibious">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genissubmarine"><summary><code>gen.isSubmarine(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSubmarine(unitType)-->boolean
</code>


<br><a href="#genissubmarine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivesubmarine"><summary><code>gen.giveSubmarine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveSubmarine(unitType)-->void
</code>


<br><a href="#gengivesubmarine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovesubmarine"><summary><code>gen.removeSubmarine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeSubmarine(unitType)-->void
</code>


<br><a href="#genremovesubmarine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattackair"><summary><code>gen.isAttackAir(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttackAir(unitType)-->boolean
</code>


<br><a href="#genisattackair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengiveattackair"><summary><code>gen.giveAttackAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveAttackAir(unitType)-->void
</code>


<br><a href="#gengiveattackair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveattackair"><summary><code>gen.removeAttackAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAttackAir(unitType)-->void
</code>


<br><a href="#genremoveattackair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geniscoastal"><summary><code>gen.isCoastal(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCoastal(unitType)-->boolean
</code>


<br><a href="#geniscoastal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivecoastal"><summary><code>gen.giveCoastal(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveCoastal(unitType)-->void
</code>


<br><a href="#gengivecoastal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovecoastal"><summary><code>gen.removeCoastal(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeCoastal(unitType)-->void
</code>


<br><a href="#genremovecoastal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisignorewalls"><summary><code>gen.isIgnoreWalls(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isIgnoreWalls(unitType)-->boolean
</code>


<br><a href="#genisignorewalls">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengiveingorewalls"><summary><code>gen.giveIngoreWalls(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveIngoreWalls(unitType)-->void
</code>


<br><a href="#gengiveingorewalls">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveignorewalls"><summary><code>gen.removeIgnoreWalls(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeIgnoreWalls(unitType)-->void
</code>


<br><a href="#genremoveignorewalls">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geniscarryair"><summary><code>gen.isCarryAir(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCarryAir(unitType)-->boolean
</code>


<br><a href="#geniscarryair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivecarryair"><summary><code>gen.giveCarryAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveCarryAir(unitType)-->void
</code>


<br><a href="#gengivecarryair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovecarryair"><summary><code>gen.removeCarryAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeCarryAir(unitType)-->void
</code>


<br><a href="#genremovecarryair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisparadrop"><summary><code>gen.isParadrop(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isParadrop(unitType)-->boolean
</code>


<br><a href="#genisparadrop">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengiveparadrop"><summary><code>gen.giveParadrop(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveParadrop(unitType)-->void
</code>


<br><a href="#gengiveparadrop">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremoveparadrop"><summary><code>gen.removeParadrop(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeParadrop(unitType)-->void
</code>


<br><a href="#genremoveparadrop">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisalpine"><summary><code>gen.isAlpine(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAlpine(unitType)-->boolean
</code>


<br><a href="#genisalpine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivealpine"><summary><code>gen.giveAlpine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveAlpine(unitType)-->void
</code>


<br><a href="#gengivealpine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovealpine"><summary><code>gen.removeAlpine(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeAlpine(unitType)-->void
</code>


<br><a href="#genremovealpine">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbonusagainsthorse"><summary><code>gen.isBonusAgainstHorse(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBonusAgainstHorse(unitType)-->boolean
</code>


<br><a href="#genisbonusagainsthorse">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivebonusagainsthorse"><summary><code>gen.giveBonusAgainstHorse(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveBonusAgainstHorse(unitType)-->void
</code>


<br><a href="#gengivebonusagainsthorse">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovebonusagainsthorse"><summary><code>gen.removeBonusAgainstHorse(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeBonusAgainstHorse(unitType)-->void
</code>


<br><a href="#genremovebonusagainsthorse">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisfreesupportunderfundamentalism"><summary><code>gen.isFreeSupportUnderFundamentalism(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isFreeSupportUnderFundamentalism(unitType)-->boolean
</code>


<br><a href="#genisfreesupportunderfundamentalism">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivefreesupportunderfundamentalism"><summary><code>gen.giveFreeSupportUnderFundamentalism(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveFreeSupportUnderFundamentalism(unitType)-->void
</code>


<br><a href="#gengivefreesupportunderfundamentalism">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovefreesupportunderfundamentalism"><summary><code>gen.removeFreeSupportUnderFundamentalism(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeFreeSupportUnderFundamentalism(unitType)-->void
</code>


<br><a href="#genremovefreesupportunderfundamentalism">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisdestroyedafterattacking"><summary><code>gen.isDestroyedAfterAttacking(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isDestroyedAfterAttacking(unitType)-->boolean
</code>


<br><a href="#genisdestroyedafterattacking">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivedestroyedafterattacking"><summary><code>gen.giveDestroyedAfterAttacking(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveDestroyedAfterAttacking(unitType)-->void
</code>


<br><a href="#gengivedestroyedafterattacking">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovedestroyedafterattacking"><summary><code>gen.removeDestroyedAfterAttacking(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeDestroyedAfterAttacking(unitType)-->void
</code>


<br><a href="#genremovedestroyedafterattacking">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbonusagainstair"><summary><code>gen.isBonusAgainstAir(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBonusAgainstAir(unitType)-->boolean
</code>


<br><a href="#genisbonusagainstair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivebonusagainstair"><summary><code>gen.giveBonusAgainstAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveBonusAgainstAir(unitType)-->void
</code>


<br><a href="#gengivebonusagainstair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovebonusagainstair"><summary><code>gen.removeBonusAgainstAir(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeBonusAgainstAir(unitType)-->void
</code>


<br><a href="#genremovebonusagainstair">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisspotsubmarines"><summary><code>gen.isSpotSubmarines(unitType)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isSpotSubmarines(unitType)-->boolean
</code>


<br><a href="#genisspotsubmarines">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gengivespotsubmarines"><summary><code>gen.giveSpotSubmarines(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.giveSpotSubmarines(unitType)-->void
</code>


<br><a href="#gengivespotsubmarines">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genremovespotsubmarines"><summary><code>gen.removeSpotSubmarines(unitType)-->void</code></summary><p style="margin-left: 25px">
<code>gen.removeSpotSubmarines(unitType)-->void
</code>


<br><a href="#genremovespotsubmarines">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



### City Attribute Flags[&uarr;](#flag-functions)

The functions of many of the city attribute flags are unknown at this time.  As more functionality is discovered, these functions will be given properly descriptive names.  However, for backwards compatibility, `gen.commandAttributeXX` will remain available in the General Library (though it may be removed from this document).  If you discover the purpose of a flag, please report it in this [Civfanatics Forum Thread](https://forums.civfanatics.com/threads/totpp-lua-scenario-template.660244/).

<details id="geniscivildisorder"><summary><code>gen.isCivilDisorder(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCivilDisorder(city)-->boolean
</code>


<br><a href="#geniscivildisorder">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetcivildisorder"><summary><code>gen.setCivilDisorder(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setCivilDisorder(city)-->void
</code>


<br><a href="#gensetcivildisorder">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearcivildisorder"><summary><code>gen.clearCivilDisorder(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearCivilDisorder(city)-->void
</code>


<br><a href="#genclearcivildisorder">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geniswelovetheking"><summary><code>gen.isWeLoveTheKing(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isWeLoveTheKing(city)-->boolean
</code>


<br><a href="#geniswelovetheking">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetwelovetheking"><summary><code>gen.setWeLoveTheKing(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setWeLoveTheKing(city)-->void
</code>


<br><a href="#gensetwelovetheking">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearwelovetheking"><summary><code>gen.clearWeLoveTheKing(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearWeLoveTheKing(city)-->void
</code>


<br><a href="#genclearwelovetheking">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisimprovementsold"><summary><code>gen.isImprovementSold(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isImprovementSold(city)-->boolean
</code>


<br><a href="#genisimprovementsold">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetimprovementsold"><summary><code>gen.setImprovementSold(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setImprovementSold(city)-->void
</code>


<br><a href="#gensetimprovementsold">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearimprovementsold"><summary><code>gen.clearImprovementSold(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearImprovementSold(city)-->void
</code>


<br><a href="#genclearimprovementsold">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genistechnologystolen"><summary><code>gen.isTechnologyStolen(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isTechnologyStolen(city)-->boolean
</code>


<br><a href="#genistechnologystolen">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensettechnologystolen"><summary><code>gen.setTechnologyStolen(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setTechnologyStolen(city)-->void
</code>


<br><a href="#gensettechnologystolen">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gencleartechnologystolen"><summary><code>gen.clearTechnologyStolen(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearTechnologyStolen(city)-->void
</code>


<br><a href="#gencleartechnologystolen">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisautobuild"><summary><code>gen.isAutoBuild(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAutoBuild(city)-->boolean
</code>


<br><a href="#genisautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetautobuild"><summary><code>gen.setAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAutoBuild(city)-->void
</code>


<br><a href="#gensetautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearautobuild"><summary><code>gen.clearAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAutoBuild(city)-->void
</code>


<br><a href="#genclearautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute6"><summary><code>gen.isAttribute6(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute6(city)-->boolean
</code>


<br><a href="#genisattribute6">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute6"><summary><code>gen.setAttribute6(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute6(city)-->void
</code>


<br><a href="#gensetattribute6">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute6"><summary><code>gen.clearAttribute6(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute6(city)-->void
</code>


<br><a href="#genclearattribute6">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute7"><summary><code>gen.isAttribute7(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute7(city)-->boolean
</code>


<br><a href="#genisattribute7">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute7"><summary><code>gen.setAttribute7(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute7(city)-->void
</code>


<br><a href="#gensetattribute7">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute7"><summary><code>gen.clearAttribute7(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute7(city)-->void
</code>


<br><a href="#genclearattribute7">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbuildcoastal"><summary><code>gen.isBuildCoastal(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildCoastal(city)-->boolean
</code>


<br><a href="#genisbuildcoastal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetbuildcoastal"><summary><code>gen.setBuildCoastal(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setBuildCoastal(city)-->void
</code>


<br><a href="#gensetbuildcoastal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearbuildcoastal"><summary><code>gen.clearBuildCoastal(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearBuildCoastal(city)-->void
</code>


<br><a href="#genclearbuildcoastal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute9"><summary><code>gen.isAttribute9(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute9(city)-->boolean
</code>


<br><a href="#genisattribute9">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute9"><summary><code>gen.setAttribute9(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute9(city)-->void
</code>


<br><a href="#gensetattribute9">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute9"><summary><code>gen.clearAttribute9(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute9(city)-->void
</code>


<br><a href="#genclearattribute9">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute10"><summary><code>gen.isAttribute10(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute10(city)-->boolean
</code>


<br><a href="#genisattribute10">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute10"><summary><code>gen.setAttribute10(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute10(city)-->void
</code>


<br><a href="#gensetattribute10">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute10"><summary><code>gen.clearAttribute10(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute10(city)-->void
</code>


<br><a href="#genclearattribute10">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute11"><summary><code>gen.isAttribute11(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute11(city)-->boolean
</code>


<br><a href="#genisattribute11">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute11"><summary><code>gen.setAttribute11(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute11(city)-->void
</code>


<br><a href="#gensetattribute11">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute11"><summary><code>gen.clearAttribute11(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute11(city)-->void
</code>


<br><a href="#genclearattribute11">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbuildhydroplant"><summary><code>gen.isBuildHydroPlant(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildHydroPlant(city)-->boolean
</code>


<br><a href="#genisbuildhydroplant">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetbuildhydroplant"><summary><code>gen.setBuildHydroPlant(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setBuildHydroPlant(city)-->void
</code>


<br><a href="#gensetbuildhydroplant">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearbuildhydroplant"><summary><code>gen.clearBuildHydroPlant(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearBuildHydroPlant(city)-->void
</code>


<br><a href="#genclearbuildhydroplant">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute13"><summary><code>gen.isAttribute13(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute13(city)-->boolean
</code>


<br><a href="#genisattribute13">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute13"><summary><code>gen.setAttribute13(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute13(city)-->void
</code>


<br><a href="#gensetattribute13">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute13"><summary><code>gen.clearAttribute13(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute13(city)-->void
</code>


<br><a href="#genclearattribute13">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute14"><summary><code>gen.isAttribute14(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute14(city)-->boolean
</code>


<br><a href="#genisattribute14">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute14"><summary><code>gen.setAttribute14(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute14(city)-->void
</code>


<br><a href="#gensetattribute14">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute14"><summary><code>gen.clearAttribute14(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute14(city)-->void
</code>


<br><a href="#genclearattribute14">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute15"><summary><code>gen.isAttribute15(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute15(city)-->boolean
</code>


<br><a href="#genisattribute15">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute15"><summary><code>gen.setAttribute15(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute15(city)-->void
</code>


<br><a href="#gensetattribute15">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute15"><summary><code>gen.clearAttribute15(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute15(city)-->void
</code>


<br><a href="#genclearattribute15">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute16"><summary><code>gen.isAttribute16(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute16(city)-->boolean
</code>


<br><a href="#genisattribute16">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute16"><summary><code>gen.setAttribute16(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute16(city)-->void
</code>


<br><a href="#gensetattribute16">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute16"><summary><code>gen.clearAttribute16(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute16(city)-->void
</code>


<br><a href="#genclearattribute16">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisusedairport"><summary><code>gen.isUsedAirport(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isUsedAirport(city)-->boolean
</code>


<br><a href="#genisusedairport">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetusedairport"><summary><code>gen.setUsedAirport(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setUsedAirport(city)-->void
</code>


<br><a href="#gensetusedairport">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearusedairport"><summary><code>gen.clearUsedAirport(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearUsedAirport(city)-->void
</code>


<br><a href="#genclearusedairport">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute18"><summary><code>gen.isAttribute18(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute18(city)-->boolean
</code>


<br><a href="#genisattribute18">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="gensetattribute18"><summary><code>gen.setAttribute18(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute18(city)-->void
</code>


<br><a href="#gensetattribute18">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute18"><summary><code>gen.clearAttribute18(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute18(city)-->void
</code>


<br><a href="#genclearattribute18">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute19"><summary><code>gen.isAttribute19(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute19(city)-->boolean
</code>


<br><a href="#genisattribute19">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute19"><summary><code>gen.setAttribute19(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute19(city)-->void
</code>


<br><a href="#gensetattribute19">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute19"><summary><code>gen.clearAttribute19(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute19(city)-->void
</code>


<br><a href="#genclearattribute19">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute20"><summary><code>gen.isAttribute20(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute20(city)-->boolean
</code>


<br><a href="#genisattribute20">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute20"><summary><code>gen.setAttribute20(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute20(city)-->void
</code>


<br><a href="#gensetattribute20">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute20"><summary><code>gen.clearAttribute20(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute20(city)-->void
</code>


<br><a href="#genclearattribute20">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute21"><summary><code>gen.isAttribute21(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute21(city)-->boolean
</code>


<br><a href="#genisattribute21">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute21"><summary><code>gen.setAttribute21(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute21(city)-->void
</code>


<br><a href="#gensetattribute21">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute21"><summary><code>gen.clearAttribute21(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute21(city)-->void
</code>


<br><a href="#genclearattribute21">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisbuildships"><summary><code>gen.isBuildShips(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isBuildShips(city)-->boolean
</code>


<br><a href="#genisbuildships">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetbuildships"><summary><code>gen.setBuildShips(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setBuildShips(city)-->void
</code>


<br><a href="#gensetbuildships">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearbuildships"><summary><code>gen.clearBuildShips(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearBuildShips(city)-->void
</code>


<br><a href="#genclearbuildships">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="geniscityinvestigated"><summary><code>gen.isCityInvestigated(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isCityInvestigated(city)-->boolean
</code>


<br><a href="#geniscityinvestigated">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetcityinvestigated"><summary><code>gen.setCityInvestigated(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setCityInvestigated(city)-->void
</code>


<br><a href="#gensetcityinvestigated">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearcityinvestigated"><summary><code>gen.clearCityInvestigated(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearCityInvestigated(city)-->void
</code>


<br><a href="#genclearcityinvestigated">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute24"><summary><code>gen.isAttribute24(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute24(city)-->boolean
</code>


<br><a href="#genisattribute24">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



<details id="gensetattribute24"><summary><code>gen.setAttribute24(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute24(city)-->void
</code>


<br><a href="#gensetattribute24">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute24"><summary><code>gen.clearAttribute24(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute24(city)-->void
</code>


<br><a href="#genclearattribute24">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genismilitaryautobuild"><summary><code>gen.isMilitaryAutoBuild(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMilitaryAutoBuild(city)-->boolean
</code>


<br><a href="#genismilitaryautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetmilitaryautobuild"><summary><code>gen.setMilitaryAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setMilitaryAutoBuild(city)-->void
</code>


<br><a href="#gensetmilitaryautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearmilitaryautobuild"><summary><code>gen.clearMilitaryAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearMilitaryAutoBuild(city)-->void
</code>


<br><a href="#genclearmilitaryautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisdomesticautobuild"><summary><code>gen.isDomesticAutoBuild(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isDomesticAutoBuild(city)-->boolean
</code>


<br><a href="#genisdomesticautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetdomesticautobuild"><summary><code>gen.setDomesticAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setDomesticAutoBuild(city)-->void
</code>


<br><a href="#gensetdomesticautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gencleardomesticautobuild"><summary><code>gen.clearDomesticAutoBuild(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearDomesticAutoBuild(city)-->void
</code>


<br><a href="#gencleardomesticautobuild">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisobjective"><summary><code>gen.isObjective(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isObjective(city)-->boolean
</code>


<br><a href="#genisobjective">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetobjective"><summary><code>gen.setObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setObjective(city)-->void
</code>
Sets the city as a scenario "objective."
<br>Removes the major objective flag if it is set, since the objective flag overrides it.


<br><a href="#gensetobjective">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearobjective"><summary><code>gen.clearObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearObjective(city)-->void
</code>


<br><a href="#genclearobjective">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute28"><summary><code>gen.isAttribute28(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute28(city)-->boolean
</code>


<br><a href="#genisattribute28">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute28"><summary><code>gen.setAttribute28(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute28(city)-->void
</code>


<br><a href="#gensetattribute28">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute28"><summary><code>gen.clearAttribute28(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute28(city)-->void
</code>


<br><a href="#genclearattribute28">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genismajorobjective"><summary><code>gen.isMajorObjective(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isMajorObjective(city)-->boolean
</code>


<br><a href="#genismajorobjective">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetmajorobjective"><summary><code>gen.setMajorObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setMajorObjective(city)-->void
</code>
Sets the city as a scenario "Major Objective.
<br>Clears the regular objective flag if it exists, since the objective flag overrides the major objective flag.

<br><a href="#gensetmajorobjective">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearmajorobjective"><summary><code>gen.clearMajorObjective(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearMajorObjective(city)-->void
</code>


<br><a href="#genclearmajorobjective">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisusedtransporter"><summary><code>gen.isUsedTransporter(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isUsedTransporter(city)-->boolean
</code>


<br><a href="#genisusedtransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetusedtransporter"><summary><code>gen.setUsedTransporter(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setUsedTransporter(city)-->void
</code>


<br><a href="#gensetusedtransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearusedtransporter"><summary><code>gen.clearUsedTransporter(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearUsedTransporter(city)-->void
</code>


<br><a href="#genclearusedtransporter">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute31"><summary><code>gen.isAttribute31(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute31(city)-->boolean
</code>


<br><a href="#genisattribute31">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="gensetattribute31"><summary><code>gen.setAttribute31(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute31(city)-->void
</code>


<br><a href="#gensetattribute31">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genclearattribute31"><summary><code>gen.clearAttribute31(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute31(city)-->void
</code>


<br><a href="#genclearattribute31">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


<details id="genisattribute32"><summary><code>gen.isAttribute32(city)-->boolean</code></summary><p style="margin-left: 25px">
<code>gen.isAttribute32(city)-->boolean
</code>


<br><a href="#genisattribute32">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


 <details id="gensetattribute32"><summary><code>gen.setAttribute32(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setAttribute32(city)-->void
<br><a href="#gensetattribute32">Link to here.</a> (Click link, then copy the link from your browser address bar.)
</code>
</p>
</details>


 <details id="genclearattribute32"><summary><code>gen.clearAttribute32(city)-->void</code></summary><p style="margin-left: 25px">
<code>gen.clearAttribute32(city)-->void
</code>
<br><a href="#genclearattribute32">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>




## Small Features[&uarr;](#general-library)  
  These functions create features for the Lua Scenario Template that are too small to merit a separate module.


### Re-Home Units When City Captured

#### Description

In standard Civilization II, when a city is captured, the units supported by that city are immediately disbanded.  It is possible to override that feature of the game with Lua.
With this feature, units supported by a captured city are re-homed to a nearby friendly city that can support them.

To activate this feature, open the `simpleSettings.lua` file in the `LuaRulesEvents` directory, and change the line
```lua
simpleSettings.rehomeUnitsOnCityCapture = false
```
to 
```lua
simpleSettings.rehomeUnitsOnCityCapture = true
```

#### Functions

<details id="genrehomeunitsincapturedcity"><summary><code>gen.rehomeUnitsInCapturedCity(city,defender) --> void</code></summary><p style="margin-left: 25px">
<code>gen.rehomeUnitsInCapturedCity(city,defender) --> void</code>
<br>When the city is captured from the defender tribe, all units supported by that city are re-homed to the nearest friendly city that has extra production to support them.
<br>Valid Arguments:
<code>
city: cityObject
defender: tribeObject
</code>
Note: Should be placed in the <A href="LuaExecutionPoints.html#city-captured"> City Captured</A> execution point if not using the Lua Scenario Template.
<br><a href="#genrehomeunitsincapturedcity">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

### Custom Unit Activation

#### Description

Changes the way the next active unit is selected by the game, so that the annoying behavior of units activating far away or on different maps is minimized.
Occasionally, there is a bug where pressing 'W' makes it appear that only a couple nearby units are the only ones that haven't moved, but there are other units elsewhere that are still available.

To activate this feature, open the `simpleSettings.lua` file in the `LuaRulesEvents` directory, and change the line
```lua
simpleSettings.enableCustomUnitSelection = false
```
to
```lua
simpleSettings.enableCustomUnitSelection = true
```

If you want to modify how the unit is selected, write a function of the form
```
weightFunction(unit,activeUnit)-->integer
```
and place it as the value for this line in `simpleSettings.lua`.
```lua
simpleSettings.doNotDeleteAITextArchives = nil
```
The `weightFunction` gives every unit that could be activated a 'weight,' based on the unit that was just activated, and chooses the unit with the smallest 'weight' to be activated next (assuming it hasn't already been told to wait).

By default, a `weightFunction` is used that adds 1 if the `unit` is a different type than the `activeUnit`, adds 2 times the distance between the units, and 10000 if the units are on different maps.

#### Functions


<details id="genselectnextactiveunit"><summary><code>gen.selectNextActiveUnit(activeUnit,source,customWeightFn)-->void</code></summary><p style="margin-left: 25px">
<code>gen.selectNextActiveUnit(activeUnit,source)-->void
gen.selectNextActiveUnit(activeUnit,source,customWeightFn)-->void
</code>
Uses a "weightFunction" to determine the 'best' unit to activate next, and gives all other units owned by the active unit's tribe the `wait` command, so they don't activate instead.  If no weightFunction is provided, the weight is +1 if the unit isn't the same type as the active unit, +2 per square of distance between the units, and +10000 if the units are on different maps.  The 'source' argument is a boolean, the same as the 'source' in the <A href="LuaExecutionPoints.html#unit-activation"> Unit Activation </A> execution point.
<br>No effect on AI controlled tribes.
<br>Valid Arguments:
<code>
activeUnit: unitType
source: boolean
customWeightFn: function(unit,ActiveUnit)-->integer
(both arguments are unitType objects)
</code>
Notes: If implementing outside the Lua Scenario template, use as the first line inside the function provided to
<code>
civ.scen.onActivateUnit(function(unit,source)-->void)
</code>
<br><a href="#genselectnextactiveunit">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

<details id="genbetterunitmanualwait"><summary><code>gen.betterUnitManualWait() --> void </code></summary><p style="margin-left: 25px">
<code>gen.betterUnitManualWait() --> void </code>
<br>Makes the `W` key work for Custom Unit Activation (by storing waiting units in a table), since the actual 'waiting' flag is manipulated.
<br>Notes: If implementing outside of the Lua Scenario Template, this should be run when there is an active unit, and the key pressed has id 87. (keyboard.w)  E.g.:
<code>
if civ.getActiveUnit() and keyID == 87 then
    gen.betterUnitManualWait()
end
</code>
<br><a href="#genbetterunitmanualwait">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

### Unprotecting Stacks

#### Description 

The Lua Scenario Template provides a built in way to thwart stacking air units on ground units for protection.  When a unit is activated, all adjacent tiles are checked to determine if any are air protected stacks, and if so, the air units are moved to alternate tiles.  

To activate this feature, open the `simpleSettings.lua` file in the `LuaRulesEvents` directory, and change the line
```lua
simpleSettings.clearAdjacentAirProtectionAI = false
simpleSettings.clearAdjacentAirProtectionHuman = false

```
to
```lua
simpleSettings.clearAdjacentAirProtectionAI = true
simpleSettings.clearAdjacentAirProtectionHuman = true
```

You can create other forms of stack "unprotecting" by using the functions in the next section.  Perhaps you have a unit type that shouldn't be able to 'hide' behind a strong defender, for example.

#### Functions


<details id="genunprotecttile"><summary><code>gen.unprotectTile(tile,isProtectingUnit,isProtectedUnit,isProtectedTile,destRankFn)-->void</code></summary><p style="margin-left: 25px">
<code>
gen.unprotectTile(tile,isProtectingUnit,isProtectedUnit,isProtectedTile)-->void
gen.unprotectTile(tile,isProtectingUnit,isProtectedUnit,isProtectedTile,destRankFn)-->void</code>
<br>Valid Arguments:
<code>
tile: tileObject
isProtectingUnit: function(unitObject) --> bool
isProtectedUnit: function(unitObject) --> bool
isProtectedTile: function(tileObject) --> bool
destRankFn: function(unitToMove,candidateTile) --> integer or false
(unitToMove:unitObject, candidateTile: tileObject)
</code>
This code checks all the units on a tile.  If there are any "protecting" units (air units in air protected stacks) on the tile <em>and also</em> any "protected" units (land/sea units in air protected stacks) <em>and finally</em> the tile is "protected" (doesn't have city/airbase or carrier unit in air protected stacks), then the "protecting" units are moved off the tile.  If any of these conditions are not met, the units stay where they are.
<code>
isProtectingUnit(unitObject): returns true if unit is a "protecting" unit
isProtectedUnit(unitObject): returns true if unit is a unit that can be "protected"
isProtectedTile(tileObject): returns true if the tile can be "protected"
</code>
See <a href="#genmoveunitadjacent"><code>gen.moveUnitAdjacent</code></a> for the destRankFn explanation and behaviour if absent.
<br><a href="#genunprotecttile">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

## Technical Functions[&uarr;](#general-library)
  These functions are necessary to integrate the General Library with the Lua Events.  You are unlikely to need these working with the Lua Scenario Template.


<details id="genlinkactivationfunction"><summary><code>gen.linkActivationFunction(unitActivationFunction)-->void</code></summary><p style="margin-left: 25px">
<code>gen.linkActivationFunction(unitActivationFunction)-->void</code>
Links the function to be run every time a unit is activated.  The TOTPP method <code>unit:activate()</code> doesn't trigger the <A href="LuaExecutionPoints.html#unit-activation">Unit Activation</A> execution point, so the general library provides <code>gen.activate</code> and <code>gen.activateSource</code> instead.
This function provides the code these functions will run once the unit is activated.  It is not necessary to provide the code for the <A href="LuaExecutionPoints.html#after-production"> execution point</A>.
<br>Valid Arguments:
<code>
unitActivationFunction: function(unit,source)-->void
(unit: unitType, source: boolean)
</code>
<br><a href="#genlinkactivationfunction">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

## Obsolete Functions[&uarr;](#general-library)
  These functions have functionality that has been rendered obsolete by more recent developments.  They are still included in the General Library for backwards compatibility.


