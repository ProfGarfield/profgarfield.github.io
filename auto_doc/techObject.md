---
layout: page
title: techObject
tabTitle: techObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# techObject

A technology object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a technology entry in the rules.txt, and provides a means of interacting with it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#tech)



### aiValue
```
techObject.aiValue --> integer
```
(get/set - ephemeral) Returns the AI value of the tech.



### category
```
techObject.category --> integer
```
(get/set - ephemeral) Returns the category of the tech.



### epoch
```
techObject.epoch --> integer
```
(get/set - ephemeral) Returns the epoch of the tech.



### group
```
techObject.group --> integer
```
(get/set - ephemeral) Returns the group of the tech.



### id
```
techObject.id --> integer
```
(get) Returns the id of the tech.



### modifier
```
techObject.modifier --> integer
```
(get/set - ephemeral) Returns the modifier to the AI value based on leader personality.



### name
```
techObject.name --> string
```
(get) Returns the name of the tech.



### prereq1
```
techObject.prereq1 --> techObject
```
(get/set - ephemeral) Returns the first prerequisite of the tech.



### prereq2
```
techObject.prereq2 --> techObject
```
(get/set - ephemeral) Returns the second prerequisite of the tech.



### researched
```
techObject.researched --> boolean
```
(get) Returns whether or not any tribe has researched the tech.





