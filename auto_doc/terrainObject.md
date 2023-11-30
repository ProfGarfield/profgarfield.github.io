---
layout: page
title: terrainObject
tabTitle: terrainObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# terrainObject

A terrain object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents the terrain characteristics which change for special resources. The 'base terrain' object deals with the characteristics that do not change for special resources.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#terrain)



### baseTerrain
```
terrainObject.baseTerrain --> baseTerrainObject
```
(get) The underlying baseterrain of the terrain object.



### food
```
terrainObject.food --> integer
```
(get/set - ephemeral) The amount of food produced by the terrain.



### map
```
terrainObject.map --> integer
```
(get) The map associated with the terrain object.



### name
```
terrainObject.name --> string
```
(get) The name of the terrain.



### resource
```
terrainObject.resource --> integer
```
(get) The resource associated with the terrain object.



### shields
```
terrainObject.shields --> integer
```
(get/set - ephemeral) The amount of shields produced by the terrain.



### trade
```
terrainObject.trade --> integer
```
(get/set - ephemeral) The amount of trade produced by the terrain.



### type
```
terrainObject.type --> integer
```
(get) The terrain type associated with the terrain object.





