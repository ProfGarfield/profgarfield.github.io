---
layout: page
title: iterator
tabTitle: iterator.lua Documentation
minTOC: 2
maxTOC: 3
---

# iterator

An iterator is a construct that enables a program to traverse the elements of a collection or container. Each time the iterator is called, a different element of the collection is provided. In practice, an iterator is usually used as part of a generic for loop:
```lua 
for unit in civ.iterateUnits() do
  civ.deleteUnit(unit)
end
```
[Tutorialspoint: Lua -- Iterators](https://www.tutorialspoint.com/lua/lua_iterators.htm)





