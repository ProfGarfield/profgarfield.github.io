---
layout: page
title: counter
tabTitle: counter.lua Documentation
minTOC: 2
maxTOC: 3
---

# counter

The functions in this module provide an alternative way to access
the data module.  The data module is recommended for new scenarios,
but this module is provided for backwards compatibility.




### add
```
function counter.add(key: string, increment: number, moduleName?: string)
  -> number
```
Adds `increment` to the counter associated with `key` and `moduleName`.
Returns the new value of the counter.
It is recommended to use data.counterAdd instead.



### define
```
function counter.define(key: string, initialValue: number, moduleName?: string)
```
Defines a counter with a given key and initial value.
It is recommended to use data.defineCounter instead.



### isAtLeast
```
function counter.isAtLeast(key: string, minValue: number, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is greater than or equal to `minValue`.
Returns false otherwise.
It is recommended to use data.counterIsAtLeast instead.



### isAtMost
```
function counter.isAtMost(key: string, maxValue: number, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is less than or equal to `maxValue`.
Returns false otherwise.
It is recommended to use data.counterIsAtMost instead.



### isNegative
```
function counter.isNegative(key: string, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is less than zero.
Returns false otherwise.
It is recommended to use data.counterIsAtMost instead.



### isPositive
```
function counter.isPositive(key: string, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is greater than or equal to zero.
Returns false otherwise.
It is recommended to use data.counterIsAtLeast instead.



### isStrictlyNegative
```
function counter.isStrictlyNegative(key: string, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is strictly less than zero.
Returns false otherwise.



### isStrictlyPositive
```
function counter.isStrictlyPositive(key: string, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is strictly greater than zero.
Returns false otherwise.



### isZero
```
function counter.isZero(key: string, moduleName?: string)
  -> boolean
```
Returns true if the counter associated with `key` and `moduleName` is exactly 0.
Returns false otherwise.



### linkState
```
counter.linkState --> function
```




### setAtLeast
```
function counter.setAtLeast(key: string, minValue: number, moduleName?: string)
  -> number
```
Considers the counter associated with `key` and `moduleName`.
If the counter is less than `minValue`, the counter is set to `minValue`.
Otherwise, the counter remains unchanged.
Returns the new value of the counter.
It is recommended to use data.counterSetWithin instead.



### setAtLeastZero
```
function counter.setAtLeastZero(key: string, moduleName: string)
  -> number
```
Considers the counter associated with `key` and `moduleName`.
If the counter is less than 0, the counter is set to 0.
Otherwise, the counter remains unchanged.
Returns the new value of the counter.
It is recommended to use data.counterSetWithin instead.



### setAtMost
```
function counter.setAtMost(key: string, maxValue: number, moduleName?: string)
  -> number
```
Considers the counter associated with `key` and `moduleName`.
If the counter is greater than `maxValue`, the counter is set to `maxValue`.
Otherwise, the counter remains unchanged.
Returns the new value of the counter.
It is recommended to use data.counterSetWithin instead.



### setAtMostZero
```
function counter.setAtMostZero(key: string, moduleName?: string)
  -> number
```
Considers the counter associated with `key` and `moduleName`.
If the counter is greater than 0, the counter is set to 0.
Otherwise, the counter remains unchanged.
Returns the new value of the counter.
It is recommended to use data.counterSetWithin instead.



### setValue
```
function counter.setValue(key: string, value: number, moduleName?: string)
  -> number
```
Sets the value of the counter associated with `key` and `moduleName` to `value`.
Returns the new value of the counter.
It is recommended to use data.counterSetValue instead.



### setWithin
```
function counter.setWithin(key: string, minValue: number, maxValue: number, moduleName?: string)
  -> number
```
Considers the counter associated with `key` and `moduleName`.
If the counter is less than `minValue`, the counter is set to `minValue`.
If the counter is greater than `maxValue`, the counter is set to `maxValue`.
Otherwise, the counter remains unchanged.
Returns the new value of the counter.
It is recommended to use data.counterSetWithin instead.



### subtract
```
function counter.subtract(key: string, increment: number, moduleName?: string)
  -> number
```
Subtracts `increment` from the counter associated with `key` and `moduleName`.
Returns the new value of the counter.
It is recommended to use data.counterSubtract instead.



### value
```
function counter.value(key: string, moduleName?: string)
  -> number
```
Returns the value of the counter associated with `key` and `moduleName`.
It is recommended to use data.counterGetValue instead.





