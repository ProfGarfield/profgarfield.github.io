---
layout: page
title: flag
tabTitle: flag.lua Documentation
minTOC: 2
maxTOC: 3
---

# flag

The functions in this module provide an alternative way to access
the data module.  The data module is recommended for new scenarios,
but this module is provided for backwards compatibility.




### define
```
function flag.define(key: string, initialValue: boolean, moduleName?: string)
```
Defines a flag with the given key and initial value.
It is recommended to use data.defineFlag instead.



### linkState
```
flag.linkState --> function
```




### setFalse
```
function flag.setFalse(key: string, moduleName?: string)
```
Sets the value of the flag associated with `key` and `moduleName` to false.



### setTrue
```
function flag.setTrue(key: string, moduleName?: string)
```
Sets the value of the flag associated with `key` and `moduleName` to true.



### toggle
```
function flag.toggle(key: string, moduleName?: string)
```
Changes the flag associated with `key` and `moduleName` to the opposite of its current value.



### value
```
function flag.value(key: string, moduleName?: string)
  -> boolean
```
Returns the value of the flag associated with `key` and `moduleName`.





