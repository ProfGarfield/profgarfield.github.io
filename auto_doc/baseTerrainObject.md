---
layout: page
title: baseTerrainObject
tabTitle: baseTerrainObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# baseTerrainObject

A base terrain object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents the 'basic' terrain characteristics for a terrain type, which is to say those aspects of terrain which do not change for special resources. The 'terrain' object deals with the characteristics that do change for special resources.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#baseterrain)



### abbrev
```
baseTerrainObject.abbrev --> string
```
(get) The terrain abbreviation for this baseTerrain (e.g. 'Drt', 'Pln' etc.).



### canIrrigate
```
baseTerrainObject.canIrrigate --> boolean
```
(get/set - ephemeral) Returns `true` if the underlying terrain type allows irrigation, `false` otherwise.



### canMine
```
baseTerrainObject.canMine --> boolean
```
(get/set - ephemeral) Returns `true` if the underlying terrain type allows mining, `false` otherwise.



### defense
```
baseTerrainObject.defense --> integer
```
(get/set - ephemeral) The defense factor of the underlying terrain type.



### getTerrain
```
(method) baseTerrainObject:getTerrain(resource: 0|1|2)
  -> terrain: terrainObject
```
Returns the terrain object corresponding to the underlying terrain type and the given resource.

```lua
resource:
    \| 0 -- no resource
    \| 1 -- fish resource
    \| 2 -- whales resource
```



### impassable
```
baseTerrainObject.impassable --> boolean
```
(get/set - ephemeral) Returns `true` if the underlying terrain type is impassable, `false` otherwise.



### irrigateAI
```
baseTerrainObject.irrigateAI --> integer
```
(get/set - ephemeral) The minimum government level needed for the AI to consider irrigating.



### irrigateBonus
```
baseTerrainObject.irrigateBonus --> integer
```
(get/set - ephemeral) The extra amount of food from irrigation.



### irrigateTo
```
baseTerrainObject.irrigateTo --> baseTerrainObject|nil
```
(get/set - ephemeral) If the irrigation order changes the underlying terrain type return the baseTerrain of the new terrain type, `nil` otherwise.



### irrigateTurns
```
baseTerrainObject.irrigateTurns --> integer
```
(get/set - ephemeral) The number of turns for settlers to irrigate.



### map
```
baseTerrainObject.map --> integer
```
(get) The map associated with the baseTerrain object.



### mineAI
```
baseTerrainObject.mineAI --> integer
```
(get/set - ephemeral) The minimum government level needed for the AI to consider mining.



### mineBonus
```
baseTerrainObject.mineBonus --> integer
```
(get/set - ephemeral) The extra amount of production from mining.



### mineTo
```
baseTerrainObject.mineTo --> baseTerrainObject|nil
```
(get/set - ephemeral) If the mine order changes the underlying terrain type return the baseTerrain of the new terrain type, `nil` otherwise.



### mineTurns
```
baseTerrainObject.mineTurns --> integer
```
(get/set - ephemeral) The number of turns for settlers to mine.



### moveCost
```
baseTerrainObject.moveCost --> integer
```
(get/set - ephemeral) The movement cost of the underlying terrain type.



### name
```
baseTerrainObject.name --> string
```
(get) The name of this baseTerrain.



### transformTo
```
baseTerrainObject.transformTo --> baseTerrainObject|nil
```
(get/set - ephemeral) If the underlying terrain type can be transformed return the baseTerrain of the new terrain type, `nil` otherwise.



### type
```
baseTerrainObject.type --> integer
```
(get) The terrain type associated with the baseTerrain object.





