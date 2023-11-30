---
layout: page
title: wonderObject
tabTitle: wonderObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# wonderObject

A wonder object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a Wonder of the World, both its entry in the rules.txt and also its characteristics within the game.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#wonder)



### city
```
wonderObject.city --> cityObject|nil
```
(get/set) Returns the city that has built the wonder, `nil` if not built yet or destroyed.



### cost
```
wonderObject.cost --> integer
```
(get/set - ephemeral) Returns the cost of the wonder.



### destroy
```
(method) wonderObject:destroy()
```
Alias for `civ.destroyWonder(wonder)`.



### destroyed
```
wonderObject.destroyed --> boolean
```
(get) Returns whether or not the wonder is destroyed. Use wonder:destroy() to set this field.



### expires
```
wonderObject.expires --> techObject|nil
```
(get/set - ephemeral) Returns the tech that renders the wonder obsolete, or `nil` if there isn't any.



### id
```
wonderObject.id --> integer
```
(get) Returns the id of the wonder.



### name
```
wonderObject.name --> string
```
(get) Returns the name of the wonder.



### prereq
```
wonderObject.prereq --> techObject
```
(get/set - ephemeral) Returns the prerequisite technology of the wonder.





