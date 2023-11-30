---
layout: page
title: unitTypeObject
tabTitle: unitTypeObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# unitTypeObject

A unit type object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a unit type entry in the rules.txt, and provides a means of interacting with it. This should not be confused with the unit object.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#unittype)



### advancedFlags
```
unitTypeObject.advancedFlags --> bitmask
```
(get/set - ephemeral) Returns the 'advanced flags' settings of the unit type (bitmask).



### attack
```
unitTypeObject.attack --> integer
```
(get/set - ephemeral) Returns the attack factor of the unit type.



### buildTransport
```
unitTypeObject.buildTransport --> bitmask
```
(get/set) Returns the 'build transport site' settings of the unit type (bitmask).



### canEnter
```
(method) unitTypeObject:canEnter(tile: tileObject)
  -> boolean: boolean
```
Alias for `civ.canEnter(unittype, tile)`



### cost
```
unitTypeObject.cost --> integer
```
(get/set - ephemeral) Returns the cost of the unit type.



### defense
```
unitTypeObject.defense --> integer
```
(get/set - ephemeral) Returns the defense factor of the unit type.



### domain
```
unitTypeObject.domain --> integer
```
(get/set - ephemeral) Returns the domain of the unit type (0 - Ground, 1 - Air, 2 - Sea).



### expires
```
unitTypeObject.expires --> techObject|nil
```
(get/set - ephemeral) Returns the tech that renders the unit obsolete, or `nil` if there isn't any.



### firepower
```
unitTypeObject.firepower --> integer
```
(get/set - ephemeral) Returns the firepower of the unit type.



### flags
```
unitTypeObject.flags --> bitmask
```
(get/set - ephemeral) Returns the flags of the unit type (bitmask).



### hitpoints
```
unitTypeObject.hitpoints --> integer
```
(get/set - ephemeral) Returns the number of hit points of the unit type.



### hold
```
unitTypeObject.hold --> integer
```
(get/set - ephemeral) Returns the number of holds of the unit type.



### id
```
unitTypeObject.id --> integer
```
(get) Returns the id of the unit type.



### minimumBribe
```
unitTypeObject.minimumBribe --> integer
```
(get/set - ephemeral) Returns the minimum amount to bribe the unit type.



### move
```
unitTypeObject.move --> integer
```
(get/set - ephemeral) Returns the movement rate of the unit type.



### name
```
unitTypeObject.name --> string
```
(get) Returns the name of the unit type.



### nativeTransport
```
unitTypeObject.nativeTransport --> bitmask
```
(get/set) Returns the 'native transport' settings of the unit type (bitmask).



### notAllowedOnMap
```
unitTypeObject.notAllowedOnMap --> bitmask
```
(get/set - ephemeral) Returns the 'not allowed on map' settings of the unit type (bitmask).



### prereq
```
unitTypeObject.prereq --> techObject|nil
```
(get/set - ephemeral) Returns the prerequisite technology of the unit type, or `nil` if it doesn't have one.



### range
```
unitTypeObject.range --> integer
```
(get/set - ephemeral) Returns the range of the unit type.



### role
```
unitTypeObject.role --> integer
```
(get/set - ephemeral) Returns the role of the unit type.



### tribeMayBuild
```
unitTypeObject.tribeMayBuild --> bitmask
```
(get/set - ephemeral) Returns the 'tribe may build' settings of the unit type (bitmask).



### useTransport
```
unitTypeObject.useTransport --> bitmask
```
(get/set) Returns the 'use transport site' settings of the unit type (bitmask).





