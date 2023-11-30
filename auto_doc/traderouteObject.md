---
layout: page
title: traderouteObject
tabTitle: traderouteObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# traderouteObject

A traderoute object is a data type that describes a trade route that exists between two cities, and offers a means of interacting with it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#traderoute)



### commodity
```
traderouteObject.commodity --> commodityObject
```
(get/set) The commodity of the trade route.



### from
```
traderouteObject.from --> cityObject
```
(get) The origin of the trade route.



### id
```
traderouteObject.id --> integer
```
(get) The id of the trade route.



### remove
```
(method) traderouteObject:remove()
```
Alias for city:removeTradeRoute(id).



### to
```
traderouteObject.to --> cityObject
```
(get/set) The destination of the trade route.





