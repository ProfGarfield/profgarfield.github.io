---
layout: page
title: tileObject
tabTitle: tileObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# tileObject

A tile object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a map "square" in the game, and provides a means of interacting with it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#tile)



### baseTerrain
```
tileObject.baseTerrain --> baseTerrainObject
```
(get/set) Returns the baseterrain object associated with the tile.



### city
```
tileObject.city --> cityObject|nil
```
(get) Returns the city at the tile's location, or `nil` if there's no city there.



### defender
```
tileObject.defender --> tribeObject|nil
```
(get) Returns the tile's defender. Returns `nil` if the tile has no defender.



### fertility
```
tileObject.fertility --> integer
```
(get/set) Returns the tile's fertility.



### grasslandShield
```
tileObject.grasslandShield --> boolean
```
(get) Returns `true` if the tile would have a shield when changed to grassland, `false` otherwise.



### improvements
```
tileObject.improvements --> bitmask
```
(get/set) Returns the tile's improvements (bitmask).



### landmass
```
tileObject.landmass --> integer
```
(get/set) Returns the tile's landmass index.



### owner
```
tileObject.owner --> tribeObject
```
(get/set) Returns the tribe owning the tile.



### river
```
tileObject.river --> boolean
```
(get/set) Returns `true` if the tile has a river, `false` otherwise.



### terrain
```
tileObject.terrain --> terrainObject
```
(get/set) Returns the terrain object associated with the tile.



### terrainType
```
tileObject.terrainType --> integer
```
(get/set) Returns an integer representing the terrain type of the tile, as well as whether the tile has a river, whether there is an special resource being animated, and whether an ocean resource is suppressed for being too far from land. It is recommended to use the baseTerrain property to check and change terrain types instead of this. If checking a terrain type with this property, use % 16 to only get the terrain index.



### units
```
tileObject.units --> fun():unitObject
```
(get) Returns an iterator yielding all units at the tile's location.



### visibility
```
tileObject.visibility --> bitmask
```
(get/set) Returns the tile's visibility for each tribe (bitmask).



### visibleImprovements
```
tileObject.visibleImprovements --> bitmask
```
(get/set) Returns the tile's improvements as known by the given tribe (bitmask).



### x
```
tileObject.x --> integer
```
(get) Returns the `x` coordinate of the tile.



### y
```
tileObject.y --> integer
```
(get) Returns the `y` coordinate of the tile.



### z
```
tileObject.z --> integer
```
(get) Returns the `z` coordinate of the tile (map number).





