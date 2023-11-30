---
layout: page
title: baseTerrainData
tabTitle: baseTerrainData.lua Documentation
minTOC: 2
maxTOC: 3
---

# baseTerrainData

This module is used to associate data with individual baseTerrains.  Functions are used to
get the data and to change it, so you don't have to interact and maintain the underlying
tables directly.  These functions also check the data that you input, so that errors are
caught quickly rather than being saved in tables only to surface later.

This module provides "flags", which store boolean values, "counters", which store number
values, and "phrases", which store string values.  There is also some basic "generic"
data storage, which can store "state savable" data, and so is more flexible, but also has
fewer error checks and built in features.  

These flags, counters, and phrases have names, which are strings.  To access a piece of data,
you will need to have the baseTerrain it is associated with, as well as the name, and whether the
data is a flag, counter, or phrase.  Then, you can use one of the provided functions
to interact with that data.

By default, all data is nil.  However, flags, counters, and phrases will not return nil
when you get their values (generic, however, will).  Instead, when you define a
data entry, you will define a default value which is to be returned if the data is nil.
Functions are provided to check if the underlying value is actually nil, and to reset
the data to nil if you need to.  A data value stops being nil when you assign it an
actual value.

You can set data to update periodically, during onTurn, onTribeTurnBegin, or onTribeTurnEnd
events.  Flags and Phrases can be reset to nil automatically, while counters and generic data
can be assigned update parameters or functions.  Usually, updates are only performed on
data which is already non-nil, but you can choose to update all if that is needed for your
functionality.  The update time can also be set to 'custom', which will only update the
data on specific function call.




### changeValidationInfo
```
function baseTerrainData.changeValidationInfo(baseTerrain: baseTerrainObject)
```
Replaces existing values of the sameItemCheck with new ones.



### counterAdd
```
function baseTerrainData.counterAdd(baseTerrain: baseTerrainObject, counterName: string, increment: number, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Adds the increment to the baseTerrain's counterName current value, but substituting minValue or maxValue
if the result is out of the range.  Then, the minimum and maximum values specified
when the counter was defined are applied (i.e. the minValue and maxValue here do not
override the defined min and max values).
Returns the value the counter was set to.



### counterGetValue
```
function baseTerrainData.counterGetValue(baseTerrain: baseTerrainObject, counterName: string, moduleName?: string)
  -> number
```
Returns the value associated with the baseTerrain's counter of counterName.
If the value is nil, the default specified during the definition is returned.



### counterIsAtLeast
```
function baseTerrainData.counterIsAtLeast(baseTerrain: baseTerrainObject, counterName: string, threshold: number, moduleName?: string)
  -> boolean
```
Returns true if the baseTerrain's counterName is at least the threshold
and false otherwise.



### counterIsAtMost
```
function baseTerrainData.counterIsAtMost(baseTerrain: baseTerrainObject, counterName: string, threshold: number, moduleName?: string)
  -> boolean
```
Returns true if the baseTerrain's counterName is at most the threshold
and false otherwise.



### counterIsNil
```
function baseTerrainData.counterIsNil(baseTerrain: baseTerrainObject, counterName: string, moduleName?: string)
  -> boolean
```
 Returns true if the underlying value of baseTerrain's counterName counter is nil
 and false otherwise.



### counterReset
```
function baseTerrainData.counterReset(baseTerrain: baseTerrainObject, counterName: string, moduleName?: string)
  -> void
```
Sets the value associated with the baseTerrain's counterName to nil
(meaning that it returns the default value set when it was defined).



### counterSetValue
```
function baseTerrainData.counterSetValue(baseTerrain: baseTerrainObject, counterName: string, value: number, moduleName?: string)
  -> number
```
Sets the value associated with the baseTerrain's counter of counterName to value.
If this value is outside the counter's defined maxValue and minValue,
those values are then applied.
Returns the value the counter was set to.



### counterSetWithin
```
function baseTerrainData.counterSetWithin(baseTerrain: baseTerrainObject, counterName: string, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Sets the counter's current value within the minValue and maxValue specified
(This does not change the overall max and min set when defining the counter).
Returns the value the counter was set to.



### counterSubtract
```
function baseTerrainData.counterSubtract(baseTerrain: baseTerrainObject, counterName: string, increment: number, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Subtracts the increment to the baseTerrain's current value, but substituting minValue or maxValue
if the result is out of the range.  Then, the minimum and maximum values specified
when the counter was defined are applied (i.e. the minValue and maxValue here do not
override the defined min and max values).
Returns the value the counter was set to.



### defineCounter
```
function baseTerrainData.defineCounter(counterName: string, defaultValue?: number, minValue?: number, maxValue?: number, update?: "function"|"functionAll"|"increment"|"incrementAll"|"none"...(+3), updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateParameter?: number|function, nonInteger?: boolean)
```
Define a counter for baseTerrain data, which keeps numerical values
* counterName = string
    - the name of the counter
* defaultValue = number
    - If the underlying stored value is nil, this is the value the counter takes on.
    - Default is 0.
* minValue = number
    - This is the smallest number the counter can be.  If anything would set the counter below this number,
    the counter is set to this number instead.
    - Default is `-math.huge`.
* maxValue = number
    - This is the largest number the counter can be.  If anything would set the counter above this number,
    the counter is set to this number instead
    - Default is `math.huge`.
* update = "none"\|"increment"\|"set"\|"reset"\|"function"\| "incrementAll"\|"setAll"\|"functionAll"
    - This is the kind of update the counter receives each turn
        + "none" means no update
        + "increment" means that the updateParameter is added to the current value of the counter (subject to maxValue and minValue) ,
        +   but only if the counter isn't currently nil
        + "incrementAll" same as increment, but is also applied to baseTerrains with nil as the underlying value of the counter
        + "set" means the counter is set to the updateParameter, but only applies if the counter isn't currently nil
        + "setAll" same as "set", but is also applied to baseTerrains with nil as the underlying value of the counter
        + "reset" sets the underlying counter value to nil
        + "function" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,baseTerrainID) (subject to maxValue and minValue), only for underlying values which are not nil
        + "functionAll" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,baseTerrainID) (subject to maxValue and minValue), even for nil underlying values
    - Default is "none".
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Gives the time when the counter update happens
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using baseTerrainData.update
    - Default is "never".
* updateParameter = number\|nil\|function
    - if update is "increment","incrementAll", "set", "setAll" then this must be a number
    - if update is "none" or "reset", this is ignored and can be nil
    - if update is "function", this is a function(numberOrNil,baseTerrainID) -> numberOrNil
    - Default is nil.
* nonInteger = bool\|nil
    - if true, the counter can take on non-integer values
    - if false, the value is rounded using math.floor(initialValue+0.5)
    - if nil, an error is thrown when the counter is set to a non-integer value
    - Default is nil.


@*param* `counterName` — the name of the counter

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the counter takes on. Default is 0.

@*param* `minValue` — This is the smallest number the counter can be.  If anything would set the counter below this number, the counter is set to this number instead. Default is `-math.huge`.

@*param* `maxValue` — This is the largest number the counter can be.  If anything would set the counter above this number, the counter is set to this number instead. Default is `math.huge`.

@*param* `update` — This is the kind of update the counter receives each turn. Default is "none".

@*param* `updateTime` — Gives the time when the counter update happens. Default is "never".

@*param* `updateParameter` — if update is "increment","incrementAll", "set", "setAll" then this must be a number. if update is "none" or "reset", this is ignored and can be nil. if update is "function", this is a function(numberOrNil,baseTerrainID) -> numberOrNil. Default is nil.

@*param* `nonInteger` — if true, the counter can take on non-integer values. if false, the value is rounded using math.floor(initialValue+0.5). if nil, an error is thrown when the counter is set to a non-integer value. Default is nil.

```lua
update:
    \| "none"
    \| "increment"
    \| "set"
    \| "reset"
    \| "function"
    \| "incrementAll"
    \| "setAll"
    \| "functionAll"

updateTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineFlag
```
function baseTerrainData.defineFlag(flagName: string, defaultValue?: boolean, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a flag for baseTerrain data, which keeps boolean values
* flagName = string
    - the name of the flag
* defaultValue = boolean \| nil
    - If the underlying stored value is nil, this is the value the flag takes on.
    - Defaults to false.
* resetTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"\|nil
    - Gives the time when the flag's stored value is reset to nil.
    - Defaults to "never".
    - "never" means never reset automatically
    - "onTurn" means at the very beginning of the onTurn event (before all other code)
    - "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
    - "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
    - if baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
    - during the onTurn update
    - "custom" means the update must be programmed in manually using baseTerrainData.update


@*param* `flagName` — the name of the flag

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the flag takes on. Defaults to false.

@*param* `resetTime` — Gives the time when the flag's stored value is reset to nil. Defaults to "never".

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineGeneric
```
function baseTerrainData.defineGeneric(dataName: string, updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateAll?: boolean, updateFunction?: fun(value: any, baseTerrainID: number):any)
```
Defines a generic entry for baseTerrain data, and can keep any item that is "state savable" (since it must be saved in the state table).
An item is "state savable" if it is one of the following:
    - nil
    - a number
    - a string
    - a boolean
    - a table with keys that are numbers or strings and with values that are also state savable
"generic" data doesn't have the same guards against misuse that the other baseTerrainData types have, but it is more flexible.
The function `gen.isStateSavable(item)` may be useful to you.
* dataName = string
    - The name of the data entry.
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - updateTime defines when the updateFunction is executed.
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using baseTerrainData.update
    - Default is "never".
* updateAll = nil\|boolean
    - If true, the update function is applied to all baseTerrain, not just those with non-nil values for this generic data.
    - Default is nil.
* updateFunction = function(value,baseTerrainID) --> value
    - Takes the existing value for baseTerrain's generic data under dataName and the baseTerrain's ID number, and produces a new value for the generic data under dataName.
    - Default is nil.  However, this is only valid if updateTime is "never".


```lua
updateTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineModuleCounter
```
function baseTerrainData.defineModuleCounter(moduleName: string, counterName: string, defaultValue?: number, minValue?: number, maxValue?: number, update?: "function"|"functionAll"|"increment"|"incrementAll"|"none"...(+3), updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateParameter?: number|function, nonInteger?: boolean)
```
Defines a counter for baseTerrain data, which keeps numerical values.  This version of defineCounter allows you to add a moduleName to the counter,
which will prevent name collisions with counters written for other modules 
and code written for a specific scenario.
* moduleName = string
    - the name of the module
* counterName = string
    - the name of the counter
* defaultValue = number
    - If the underlying stored value is nil, this is the value the counter takes on.
    - Default is 0.
* minValue = number
    - This is the smallest number the counter can be.  If anything would set the counter below this number,
    the counter is set to this number instead.
    - Default is `-math.huge`.
* maxValue = number
    - This is the largest number the counter can be.  If anything would set the counter above this number,
    the counter is set to this number instead
    - Default is `math.huge`.
* update = "none"\|"increment"\|"set"\|"reset"\|"function"\| "incrementAll"\|"setAll"\|"functionAll"
    - This is the kind of update the counter receives each turn
        + "none" means no update
        + "increment" means that the updateParameter is added to the current value of the counter (subject to maxValue and minValue) ,
        +   but only if the counter isn't currently nil
        + "incrementAll" same as increment, but is also applied to baseTerrains with nil as the underlying value of the counter
        + "set" means the counter is set to the updateParameter, but only applies if the counter isn't currently nil
        + "setAll" same as "set", but is also applied to baseTerrains with nil as the underlying value of the counter
        + "reset" sets the underlying counter value to nil
        + "function" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,baseTerrainID) (subject to maxValue and minValue), only for underlying values which are not nil
        + "functionAll" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,baseTerrainID) (subject to maxValue and minValue), even for nil underlying values
    - Default is "none".
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Gives the time when the counter update happens
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using baseTerrainData.update
    - Default is "never".
* updateParameter = number\|nil\|function
    - if update is "increment","incrementAll", "set", "setAll" then this must be a number
    - if update is "none" or "reset", this is ignored and can be nil
    - if update is "function", this is a function(numberOrNil,baseTerrainID) -> numberOrNil
    - Default is nil.
* nonInteger = boolean\|nil
    - if true, the counter can take on non-integer values
    - if false, the value is rounded using math.floor(initialValue+0.5)
    - if nil, an error is thrown when the counter is set to a non-integer value
    - Default is nil.


@*param* `moduleName` — the name of the module

@*param* `counterName` — the name of the counter

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the counter takes on. Default is 0.

@*param* `minValue` — This is the smallest number the counter can be.  If anything would set the counter below this number, the counter is set to this number instead. Default is `-math.huge`.

@*param* `maxValue` — This is the largest number the counter can be.  If anything would set the counter above this number, the counter is set to this number instead. Default is `math.huge`.

@*param* `update` — This is the kind of update the counter receives each turn. Default is "none".

@*param* `updateTime` — Gives the time when the counter update happens. Default is "never".

@*param* `updateParameter` — if update is "increment","incrementAll", "set", "setAll" then this must be a number. if update is "none" or "reset", this is ignored and can be nil. if update is "function", this is a function(numberOrNil,baseTerrainID) -> numberOrNil. Default is nil.

@*param* `nonInteger` — if true, the counter can take on non-integer values. if false, the value is rounded using math.floor(initialValue+0.5). if nil, an error is thrown when the counter is set to a non-integer value. Default is nil.

```lua
update:
    \| "none"
    \| "increment"
    \| "set"
    \| "reset"
    \| "function"
    \| "incrementAll"
    \| "setAll"
    \| "functionAll"

updateTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineModuleFlag
```
function baseTerrainData.defineModuleFlag(moduleName: string, flagName: string, defaultValue?: boolean, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a flag for baseTerrain data, which keeps boolean values.  This version of defineFlag allows you to add a moduleName to the flag name, which will prevent name collision between modules and code written for a specific scenario.,
for a specific scenario.
* moduleName = string
    - the name of the module
* flagName = string
    - the name of the flag
* defaultValue = boolean \| nil
    - If the underlying stored value is nil, this is the value the flag takes on.
    - Defaults to false.
* resetTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"\|nil
    - Gives the time when the flag's stored value is reset to nil.
    - Defaults to "never".
    - "never" means never reset automatically
    - "onTurn" means at the very beginning of the onTurn event (before all other code)
    - "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
    - "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
    - if baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
    - during the onTurn update
    - "custom" means the update must be programmed in manually using baseTerrainData.update


@*param* `moduleName` — the name of the module

@*param* `flagName` — the name of the flag

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the flag takes on. Defaults to false.

@*param* `resetTime` — Gives the time when the flag's stored value is reset to nil. Defaults to "never".

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineModuleGeneric
```
function baseTerrainData.defineModuleGeneric(moduleName: string, dataName: string, updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateAll?: boolean, updateFunction?: fun(value: any, baseTerrainID: number):any)
```
Defines a generic entry for baseTerrain data, and can keep any item that is "state savable" (since it must be saved in the state table).  This version of defineGeneric allows you 
to add a module name to the generic name, which will prevent name collisions with
generic data from other modules and code written for a specific scenario.
An item is "state savable" if it is one of the following:
    - nil
    - a number
    - a string
    - a boolean
    - a table with keys that are numbers or strings and with values that are also state savable
"generic" data doesn't have the same guards against misuse that the other baseTerrainData types have, but it is more flexible.
The function `gen.isStateSavable(item)` may be useful to you.
* moduleName = string
    - The name of the module using this data
* dataName = string
    - The name of the data entry.
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - updateTime defines when the updateFunction is executed.
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using baseTerrainData.update
    - Default is "never".
* updateAll = nil\|boolean
    - If true, the update function is applied to all baseTerrain, not just those with non-nil values for this generic data.
    - Default is nil.
* updateFunction = function(value,baseTerrainID) --> value
    - Takes the existing value for baseTerrain's generic data under dataName and the baseTerrain's ID number, and produces a new value for the generic data under dataName.
    - Default is nil.  However, this is only valid if updateTime is "never".


```lua
updateTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineModulePhrase
```
function baseTerrainData.defineModulePhrase(moduleName: string, phraseName: string, defaultValue?: string, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a phrase for baseTerrain data, which keeps string values.   This version of definePhrase allows you to add a module name to the phrase name, which
will prevent name collisions with phrases from other modules and code
written for a specific scenario.
* moduleName = string
    - The name of the module.
* phraseName = string
    - The name of the phrase.
* defaultValue = string
    - If the underlying stored value is nil, this is the value the phrase takes on.
    - Default value is "".
* resetTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Gives the time when the phrase's stored value is reset to nil.
    - "never" means never reset automatically.
    - "onTurn" means at the very beginning of the onTurn event (before all other code).
    - "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code).
    - "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code).
    - If baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen during the onTurn update.
    - "custom" means the update must be programmed in manually using baseTerrainData.update.
    - Default value is "never".


@*param* `moduleName` — The name of the module.

@*param* `phraseName` — The name of the phrase.

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the phrase takes on.

@*param* `resetTime` — Gives the time when the phrase's stored value is reset to nil.

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### definePhrase
```
function baseTerrainData.definePhrase(phraseName: string, defaultValue?: string, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a phrase for baseTerrain data, which keeps string values.
* phraseName = string
    - The name of the phrase.
* defaultValue = string
    - If the underlying stored value is nil, this is the value the phrase takes on.
    - Default value is "".
* resetTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Gives the time when the phrase's stored value is reset to nil.
    - "never" means never reset automatically.
    - "onTurn" means at the very beginning of the onTurn event (before all other code).
    - "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code).
    - "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code).
    - If baseTerrain has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen during the onTurn update.
    - "custom" means the update must be programmed in manually using baseTerrainData.update.
    - Default value is "never".


@*param* `phraseName` — The name of the phrase.

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the phrase takes on.

@*param* `resetTime` — Gives the time when the phrase's stored value is reset to nil.

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### deleteData
```
function baseTerrainData.deleteData(baseTerrain: baseTerrainObject)
```
Deletes the data associated with the baseTerrain.



### flagGetValue
```
function baseTerrainData.flagGetValue(baseTerrain: baseTerrainObject, flagName: string, moduleName?: string)
  -> The: boolean
```
Returns the value associated with the `baseTerrain`'s flag of `flagName`.
If the value is nil, the default specified during the definition is returned.

@*param* `flagName` — The name of the flag

@*param* `moduleName` — The name of the module (if applicable)

---

@*return* `The` — value associated with the `baseTerrain`'s flag of `flagName`.



### flagIsNil
```
function baseTerrainData.flagIsNil(baseTerrain: baseTerrainObject, flagName: string, moduleName?: string)
  -> boolean
```
Returns true if the underlying value of baseTerrain's flagName flag is nil
(including if all of the flag's keys are nil)
and false otherwise.



### flagReset
```
function baseTerrainData.flagReset(baseTerrain: baseTerrainObject, flagName: string, moduleName?: string)
```
Sets the value associated with the baseTerrain's flag of flagName to nil
(meaning that it returns the default value set when it was defined).



### flagSetFalse
```
function baseTerrainData.flagSetFalse(baseTerrain: baseTerrainObject, flagName: string, moduleName?: string)
```
Sets the value associated with the baseTerrain's flag of flagName to `false`



### flagSetTrue
```
function baseTerrainData.flagSetTrue(baseTerrain: baseTerrainObject, flagName: string, moduleName?: string)
```
Sets the value associated with the baseTerrain's flag of flagName to `true`.



### flagSetValue
```
function baseTerrainData.flagSetValue(baseTerrain: baseTerrainObject, flagName: string, value: boolean, moduleName?: string)
```
Sets the value associated with the baseTerrain's flag of flagName to the `value` 
(true or false) specified.



### generalUpdate
```
function baseTerrainData.generalUpdate(time?: "custom"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", tribe?: tribeObject)
```
Updates data keys that have an updateTime of `time` for all baseTerrains.

@*param* `time` — Default is "custom".

@*param* `tribe` — The tribe to consider the active tribe for onTribeTurnBegin and onTribeTurnEnd updates. Default is nil.

```lua
time:
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### genericGetValue
```
function baseTerrainData.genericGetValue(baseTerrain: baseTerrainObject, keyName: string, moduleName?: string)
  -> any
```
Returns the value stored by the baseTerrain's keyName, or the default value if the keyName is not set.



### genericSetValue
```
function baseTerrainData.genericSetValue(baseTerrain: baseTerrainObject, keyName: string, value: any, moduleName?: string)
  -> any
```
Changes the value stored by the baseTerrain's keyName to value.
Returns the value that was just set.



### phraseGetValue
```
function baseTerrainData.phraseGetValue(baseTerrain: baseTerrainObject, phraseName: string, moduleName?: string)
  -> string
```
Returns the value associated with the baseTerrain's phrase of phraseName.
If the associated value is nil, the default specified during the definition is returned.



### phraseIsNil
```
function baseTerrainData.phraseIsNil(baseTerrain: baseTerrainObject, phraseName: string, moduleName?: string)
  -> boolean
```
Returns true if the underlying value of baseTerrain's phraseName phrase is nil, and false otherwise.



### phraseReset
```
function baseTerrainData.phraseReset(baseTerrain: baseTerrainObject, phraseName: string, moduleName?: string)
```
Sets the value associated with the baseTerrain's phraseName to nil.
(meaning that it returns the default value set when it was defined)



### phraseSetValue
```
function baseTerrainData.phraseSetValue(baseTerrain: baseTerrainObject, phraseName: string, value: string, moduleName?: string)
```
Sets the value associated with baseTerrain's phraseName to value.



### transferData
```
function baseTerrainData.transferData(oldbaseTerrain: baseTerrainObject, newbaseTerrain: baseTerrainObject)
```
Associates the baseTerrainData from the old baseTerrain to the new one (deleting the association with the old one).
newbaseTerrain can't be nil.



### transferOrDeleteData
```
function baseTerrainData.transferOrDeleteData(oldbaseTerrain: baseTerrainObject, newbaseTerrain: baseTerrainObject|nil)
```
If newbaseTerrain is not nil, transfers the data from the old baseTerrain to the new one (deleting the data for the old one).  If newbaseTerrain is nil, the data is deleted for oldbaseTerrain.



### update
```
function baseTerrainData.update(baseTerrain: baseTerrainObject, time?: "custom"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", tribe?: tribeObject, key?: string, moduleName?: string)
```
Updates all of baseTerrain's data keys that have an updateTime of time, unless
key is specified, in which case, update that key only.
    * time = "onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
        - Update the baseTerrain's data keys that have this updateTime.
        - Default is "custom".
    * tribe = nil\|tribeObject
        - The tribe to consider the active tribe for onTribeTurnBegin and onTribeTurnEnd updates.
        - Default is nil.
    * key = nil\|string
        - The key to update.
        - Default is nil, in which case all keys with the updateTime specified by time are updated.
    * moduleName = nil\|string
        - The name of the module using this name, if applicable.
        - Default is nil.


---

```lua
time:
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### validate
```
function baseTerrainData.validate(baseTerrain: baseTerrainObject)
```
Checks that the item is still the same baseTerrain it was before (i.e. that the baseTerrain hasn't been deleted and the ID reused).  If it has, eliminate all data for that baseTerrain.





