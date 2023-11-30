---
layout: page
title: unitObject
tabTitle: unitObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# unitObject

A unit object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a unit in the game, and provides a means of interacting with it. This should not be confused with the unit type object.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#unit)



### activate
```
(method) unitObject:activate()
```
Activates a unit, clearing its orders, and, if it has a human owner and movement points left, selects it on the map.



### attributes
```
unitObject.attributes --> bitmask
```
(get/set) Returns the attributes of the unit (bitmask).



### carriedBy
```
unitObject.carriedBy --> unitObject|nil
```
(get/set) Returns the carrying unit if this unit is currently on board, `nil` otherwise.



### damage
```
unitObject.damage --> integer
```
(get/set) Returns the damage taken by the unit in hitpoints.



### domainSpec
```
unitObject.domainSpec --> integer
```
(get/set) Returns the value of the 'domain-specific counter' of the unit.



### gotoTile
```
unitObject.gotoTile --> tileObject|nil
```
(get/set) Returns the tile the unit is moving to under the goto order, or `nil` if it doesn't have the goto order.



### hitpoints
```
unitObject.hitpoints --> integer
```
(get) Returns the number of hitpoints left. It is defined as unit.type.hitpoints - unit.damage.



### homeCity
```
unitObject.homeCity --> cityObject|nil
```
(get/set) Returns the unit's home city, or `nil` if it doesn't have one.



### id
```
unitObject.id --> integer
```
(get) Returns the unit's id.



### location
```
unitObject.location --> tileObject
```
(get) Returns the unit's location.



### moveSpent
```
unitObject.moveSpent --> integer
```
(get/set) Returns the number of moves spent by the unit.  Consider using `gen.spendMovementPoints` instead of setting directly.



### order
```
unitObject.order --> integer
```
(get/set) Returns the current order of the unit.



### owner
```
unitObject.owner --> tribeObject
```
(get/set) Returns the unit's owner.



### teleport
```
(method) unitObject:teleport(tile: tileObject)
```
Alias for `civ.teleportUnit(unit, tile)`.



### type
```
unitObject.type --> unitTypeObject
```
(get) Returns the unit's type.



### veteran
```
unitObject.veteran --> boolean
```
(get/set) Returns the veteran status of the unit.



### visibility
```
unitObject.visibility --> bitmask
```
(get/set) Returns the visibility of the unit for each tribe (bitmask).





