---
layout: page
title: mapObject
tabTitle: mapObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# mapObject

A map object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents the overall properties of one of the four possible maps in the game, and provides a means of interacting with it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#map)



### copyDefaultResources
```
(method) mapObject:copyDefaultResources()
```
Enables custom resources for this map and copies the default resource pattern. Requires the "Custom resources" patch.



### customResources
```
mapObject.customResources --> boolean
```
(get/set) Returns `true` if custom resources are enabled for this map, `false` otherwise.



### getBaseTerrain
```
(method) mapObject:getBaseTerrain(terrainId: integer)
  -> baseTerrain: baseTerrainObject
```
Alias for `civ.getBaseTerrain(map, terrainType)`

@*param* `terrainId` — The id number of the base terrain type sought



### getTerrain
```
(method) mapObject:getTerrain(terrainId: integer, resource: 0|1|2)
  -> terrain: terrainObject
```
Alias for `civ.getTerrain(map, terrainType, resource)`

@*param* `terrainId` — The id number of the base terrain type sought.

```lua
resource:
    \| 0 -- no resource
    \| 1 -- fish resource
    \| 2 -- whales resource
```



### height
```
mapObject.height --> integer
```
(get) Returns the height of the map.



### id
```
mapObject.id --> integer
```
(get) Returns the id of the map.



### width
```
mapObject.width --> integer
```
(get) Returns the width of the map.





