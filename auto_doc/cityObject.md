---
layout: page
title: cityObject
tabTitle: cityObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# cityObject

A city object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a city in the game, and provides a means of interacting with that city.
<br>
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#city)



### addImprovement
```
(method) cityObject:addImprovement(improvement: improvementObject)
```
Alias for `civ.addImprovement(city, improvement)`.



### addTradeRoute
```
(method) cityObject:addTradeRoute(destination: cityObject, commodity: commodityObject)
```
Adds a new trade route to city `destination`, with commodity `commodity`. Returns an error if all 3 trade slots are already in use.

@*param* `destination` — The destination city for the trade route.

@*param* `commodity` — The trade route commodity.



### attributes
```
cityObject.attributes --> bitmask
```
(get/set) Returns the city's attributes (bitmask).



### baseTrade
```
cityObject.baseTrade --> integer
```
(get) Returns the number of trade arrows before trade routes.



### canBuild
```
(method) cityObject:canBuild(item: improvementObject|unitTypeObject|wonderObject)
  -> boolean: boolean
```
Returns whether or not `item` can currently be built in the city. `item` can be a unitType, improvement or wonder.



### coastal
```
cityObject.coastal --> boolean
```
(get) Returns whether or not the city is on a coast (can build coastal improvements).



### currentProduction
```
cityObject.currentProduction --> improvementObject|unitTypeObject|wonderObject
```
(get/set) Returns the city's current production.



### food
```
cityObject.food --> integer
```
(get/set) Returns the quantity of food in store.



### hasImprovement
```
(method) cityObject:hasImprovement(improvement: improvementObject)
  -> boolean: boolean
```
Alias for `civ.hasImprovement(city, improvement)`.



### id
```
cityObject.id --> integer
```
(get) Returns the city's id.



### knownTo
```
cityObject.knownTo --> bitmask
```
(get/set) Returns a bitmask indicating the tribes that have knowledge of this city.



### location
```
cityObject.location --> tileObject
```
(get) Returns the city's location. See the `relocate` method for a way to set this.



### name
```
cityObject.name --> string
```
(get/set) Returns the city's name.



### numHappy
```
cityObject.numHappy --> integer
```
(get) Returns the number of happy citizens.



### numTradeRoutes
```
cityObject.numTradeRoutes --> integer
```
(get) Returns the number of trade routes of the city.



### numUnhappy
```
cityObject.numUnhappy --> integer
```
(get) Returns the number of unhappy citizens.



### originalOwner
```
cityObject.originalOwner --> tribeObject
```
(get/set) Returns the city's original owner. This can be different from `owner` if the city was captured in the past.



### owner
```
cityObject.owner --> tribeObject
```
(get/set) Returns the city's owner.



### popTradeRoute
```
(method) cityObject:popTradeRoute()
```
Removes the last trade route, or does nothing if no trade routes are in use.



### relocate
```
(method) cityObject:relocate(tile: tileObject)
  -> boolean: boolean
```
Relocates the city to the location given by `tile`. Returns `true` if successful, `false` otherwise (if a city is already present for example).



### removeImprovement
```
(method) cityObject:removeImprovement(improvement: improvementObject)
```
Alias for `civ.removeImprovement(city, improvement)`.



### removeTradeRoute
```
(method) cityObject:removeTradeRoute(id: integer)
```
Removes the trade route with index `id` (0-2). This shifts elements after `id` to fill gaps in the array, so references to trade routes may not be valid anymore after calling this.



### science
```
cityObject.science --> integer
```
(get) Returns the amount of science the city produces.



### shields
```
cityObject.shields --> integer
```
(get/set) Returns the number of shields towards the current item in production.



### size
```
cityObject.size --> integer
```
(get/set) Returns the city's size.



### sizeForTribe
```
cityObject.sizeForTribe --> tribeToInt
```
(get/set) cityObject.sizeForTribe[tribe] -> integer Returns the city's size as known by the given tribe.



### specialists
```
cityObject.specialists --> integer
```
(get/set) Returns the city's specialists as a integer, 16 x 2 bits per specialist (0 - No specialist, 1 - Entertainer, 2 - Taxman, 3 - Scientist)



### tax
```
cityObject.tax --> integer
```
(get) Returns the amount of tax the city produces.



### totalFood
```
cityObject.totalFood --> integer
```
(get) Returns the total amount of food the city produces.



### totalShield
```
cityObject.totalShield --> integer
```
(get) Returns the total amount of shields the city produces.



### totalTrade
```
cityObject.totalTrade --> integer
```
(get) Returns the total amount of trade arrows the city produces (including trade routes).



### tradeRoutes
```
cityObject.tradeRoutes[id: 0|1|2] --> traderouteObject|nil
```
(get) Returns the trade route with id `id` (0-2), or `nil` if not in use.


### turnsSinceCapture
```
cityObject.turnsSinceCapture --> integer
```
(get/set) Returns the number of turns since the city was last captured.



### workers
```
cityObject.workers --> bitmask
```
(get/set) Returns a bitmask with the workers and specialists of the city.





