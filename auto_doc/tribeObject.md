---
layout: page
title: tribeObject
tabTitle: tribeObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# tribeObject

A tribe object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a tribe, which is to say the characteristics of the tribe overall, in the game, and provides a means of interacting with it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#tribe)



### active
```
tribeObject.active --> boolean
```
(get) Returns whether the tribe is active, i.e. a human or AI player in the current game.



### adjective
```
tribeObject.adjective --> string
```
(get/set) Returns the adjectival form of the tribe's name (e.g. "Roman").



### attitude
```
tribeObject.attitude --> integer
```
(get/set) Returns the tribe's attitude to `otherTribe`.



### betrayals
```
tribeObject.betrayals --> integer
```
(get/set) Returns the number of times the tribe has betrayed another tribe.



### enableTechGroup
```
(method) tribeObject:enableTechGroup(techgroup: integer, value: 0|1|2)
```
Alias for `civ.enableTechGroup(tribe, techgroup, value)`.
Sets the value of tech group `techgroup` (0-7) to value `value` (0-2, 0 = can research, can own, 1 = can't research, can own, 2 = can't research, can't own) for tribe.

@*param* `techgroup` — integer in [0,7]

```lua
value:
    \| 0 -- can research, can own
    \| 1 -- can't research, can own
    \| 2 -- can't research, can't own
```



### futureTechs
```
tribeObject.futureTechs --> integer
```
(get/set) Returns the number of future techs the tribe has researched.



### giveTech
```
(method) tribeObject:giveTech(tech: techObject)
```
Alias for `civ.giveTech(tribe, tech)`.



### government
```
tribeObject.government --> integer
```
(get/set) Returns the government (0 - 6) of the tribe.



### hasTech
```
(method) tribeObject:hasTech(tech: techObject)
  -> boolean: boolean
```
Alias for `civ.hasTech(tribe, tech)`.



### id
```
tribeObject.id --> integer
```
(get) Returns the id of the tribe.



### isHuman
```
tribeObject.isHuman --> boolean
```
(get/set) Returns whether the tribe is a/the human player.



### kill
```
(method) tribeObject:kill()
```
Alias for `civ.killTribe(tribe)`.



### leader
```
tribeObject.leader --> leaderObject
```
(get) Returns the leader of the tribe.



### money
```
tribeObject.money --> integer
```
(get/set) Returns the amount of money/gold in the tribe's treasury.



### name
```
tribeObject.name --> string
```
(get/set) Returns the name of the tribe (e.g. "Romans").



### numCities
```
tribeObject.numCities --> integer
```
(get) Returns the number of cities the tribe has.



### numTechs
```
tribeObject.numTechs --> integer
```
(get) Returns the number of techs the tribe has.



### numUnits
```
tribeObject.numUnits --> integer
```
(get) Returns the number of units the tribe has.



### patience
```
tribeObject.patience --> integer
```
(get/set) Returns the tribe's patience.



### reputation
```
tribeObject.reputation --> integer
```
(get/set) Returns the tribe's reputation with `otherTribe`.



### researchCost
```
tribeObject.researchCost --> integer
```
(get) Returns the research cost of the tribe.



### researchProgress
```
tribeObject.researchProgress --> integer
```
(get/set) Returns the progress towards the current research (range between 0 and tribe.researchCost).



### researching
```
tribeObject.researching --> techObject|nil
```
(get/set) Returns the tech the tribe is currently researching, or `nil` if not researching anything.



### scienceRate
```
tribeObject.scienceRate --> integer
```
(get) Returns the science rate of the tribe.



### spaceship
```
tribeObject.spaceship --> spaceshipObject
```
(get) Returns the space ship object of the tribe.



### takeTech
```
(method) tribeObject:takeTech(tech: techObject, collapse: boolean)
```
Alias for `civ.takeTech(tribe, tech, collapse=false)`.

@*param* `collapse` — Default value is false.



### taxRate
```
tribeObject.taxRate --> integer
```
(get) Returns the tax rate of the tribe.



### treaties
```
tribeObject.treaties --> integer
```
(get/set) Returns the tribe's treaties with `otherTribe`.





