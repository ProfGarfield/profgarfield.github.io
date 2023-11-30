---
layout: page
title: improvementObject
tabTitle: improvementObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# improvementObject

An improvement object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents an improvement entry in the rules.txt, and provides a means of interacting with it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#improvement)



### cantSell
```
improvementObject.cantSell --> boolean
```
(get/set - ephemeral) Returns `true` if the improvement cannot be sold, `false` otherwise. Requires the "Improvement flags" patch.



### cost
```
improvementObject.cost --> integer
```
(get/set - ephemeral) Returns the cost of the improvement in rows. Multiply by civ.cosmic.shieldRows for the actual production cost.



### id
```
improvementObject.id --> integer
```
(get) Returns the id of the improvement.



### name
```
improvementObject.name --> string
```
(get) Returns the name of the improvement (e.g. "Barracks").



### onCapture
```
improvementObject.onCapture --> integer
```
(get/set - ephemeral) Returns what happens to this improvement when a city is captured (0 - Default, 1 - Preserve, 2 - Destroy, 3 - Random). Requires the "Improvement flags" patch.



### prereq
```
improvementObject.prereq --> techObject
```
(get/set - ephemeral) Returns the prerequisite tech of the improvement.



### upkeep
```
improvementObject.upkeep --> integer
```
(get/set - ephemeral) Returns the upkeep cost of the improvement.





