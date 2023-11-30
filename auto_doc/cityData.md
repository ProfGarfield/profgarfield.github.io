---
layout: page
title: cityData
tabTitle: cityData.lua Documentation
minTOC: 2
maxTOC: 3
---

# cityData

This module is used to associate data with individual cities.  Functions are used to
get the data and to change it, so you don't have to interact and maintain the underlying
tables directly.  These functions also check the data that you input, so that errors are
caught quickly rather than being saved in tables only to surface later.

This module provides "flags", which store boolean values, "counters", which store number
values, and "phrases", which store string values.  There is also some basic "generic"
data storage, which can store "state savable" data, and so is more flexible, but also has
fewer error checks and built in features.  

These flags, counters, and phrases have names, which are strings.  To access a piece of data,
you will need to have the city it is associated with, as well as the name, and whether the
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




## Flags

### defineFlag
```
function cityData.defineFlag(flagName: string, defaultValue?: boolean, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a flag for city data, which keeps boolean values
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
    - if city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
    - during the onTurn update
    - "custom" means the update must be programmed in manually using cityData.update


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



### defineModuleFlag
```
function cityData.defineModuleFlag(moduleName: string, flagName: string, defaultValue?: boolean, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a flag for city data, which keeps boolean values.  This version of defineFlag allows you to add a moduleName to the flag name, which will prevent name collision between modules and code written for a specific scenario.,
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
    - if city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
    - during the onTurn update
    - "custom" means the update must be programmed in manually using cityData.update


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



### flagGetValue
```
function cityData.flagGetValue(city: cityObject, flagName: string, moduleName?: string)
  -> The: boolean
```
Returns the value associated with the `city`'s flag of `flagName`.
If the value is nil, the default specified during the definition is returned.

@*param* `flagName` — The name of the flag

@*param* `moduleName` — The name of the module (if applicable)

---

@*return* `The` — value associated with the `city`'s flag of `flagName`.



### flagSetTrue
```
function cityData.flagSetTrue(city: cityObject, flagName: string, moduleName?: string)
```
Sets the value associated with the city's flag of flagName to `true`.



### flagSetFalse
```
function cityData.flagSetFalse(city: cityObject, flagName: string, moduleName?: string)
```
Sets the value associated with the city's flag of flagName to `false`



### flagIsNil
```
function cityData.flagIsNil(city: cityObject, flagName: string, moduleName?: string)
  -> boolean
```
Returns true if the underlying value of city's flagName flag is nil
(including if all of the flag's keys are nil)
and false otherwise.



### flagReset
```
function cityData.flagReset(city: cityObject, flagName: string, moduleName?: string)
```
Sets the value associated with the city's flag of flagName to nil
(meaning that it returns the default value set when it was defined).







## Counters

### defineCounter
```
function cityData.defineCounter(counterName: string, defaultValue?: number, minValue?: number, maxValue?: number, update?: "function"|"functionAll"|"increment"|"incrementAll"|"none"...(+3), updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateParameter?: number|function, nonInteger?: boolean)
```
Define a counter for city data, which keeps numerical values
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
        + "incrementAll" same as increment, but is also applied to cities with nil as the underlying value of the counter
        + "set" means the counter is set to the updateParameter, but only applies if the counter isn't currently nil
        + "setAll" same as "set", but is also applied to cities with nil as the underlying value of the counter
        + "reset" sets the underlying counter value to nil
        + "function" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,cityID) (subject to maxValue and minValue), only for underlying values which are not nil
        + "functionAll" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,cityID) (subject to maxValue and minValue), even for nil underlying values
    - Default is "none".
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Gives the time when the counter update happens
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using cityData.update
    - Default is "never".
* updateParameter = number\|nil\|function
    - if update is "increment","incrementAll", "set", "setAll" then this must be a number
    - if update is "none" or "reset", this is ignored and can be nil
    - if update is "function", this is a function(numberOrNil,cityID) -> numberOrNil
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

@*param* `updateParameter` — if update is "increment","incrementAll", "set", "setAll" then this must be a number. if update is "none" or "reset", this is ignored and can be nil. if update is "function", this is a function(numberOrNil,cityID) -> numberOrNil. Default is nil.

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



### defineModuleCounter
```
function cityData.defineModuleCounter(moduleName: string, counterName: string, defaultValue?: number, minValue?: number, maxValue?: number, update?: "function"|"functionAll"|"increment"|"incrementAll"|"none"...(+3), updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateParameter?: number|function, nonInteger?: boolean)
```
Defines a counter for city data, which keeps numerical values.  This version of defineCounter allows you to add a moduleName to the counter,
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
        + "incrementAll" same as increment, but is also applied to cities with nil as the underlying value of the counter
        + "set" means the counter is set to the updateParameter, but only applies if the counter isn't currently nil
        + "setAll" same as "set", but is also applied to cities with nil as the underlying value of the counter
        + "reset" sets the underlying counter value to nil
        + "function" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,cityID) (subject to maxValue and minValue), only for underlying values which are not nil
        + "functionAll" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,cityID) (subject to maxValue and minValue), even for nil underlying values
    - Default is "none".
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Gives the time when the counter update happens
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using cityData.update
    - Default is "never".
* updateParameter = number\|nil\|function
    - if update is "increment","incrementAll", "set", "setAll" then this must be a number
    - if update is "none" or "reset", this is ignored and can be nil
    - if update is "function", this is a function(numberOrNil,cityID) -> numberOrNil
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

@*param* `updateParameter` — if update is "increment","incrementAll", "set", "setAll" then this must be a number. if update is "none" or "reset", this is ignored and can be nil. if update is "function", this is a function(numberOrNil,cityID) -> numberOrNil. Default is nil.

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



### counterGetValue
```
function cityData.counterGetValue(city: cityObject, counterName: string, moduleName?: string)
  -> number
```
Returns the value associated with the city's counter of counterName.
If the value is nil, the default specified during the definition is returned.



### counterSetValue
```
function cityData.counterSetValue(city: cityObject, counterName: string, value: number, moduleName?: string)
  -> number
```
Sets the value associated with the city's counter of counterName to value.
If this value is outside the counter's defined maxValue and minValue,
those values are then applied.
Returns the value the counter was set to.



### counterIsNil
```
function cityData.counterIsNil(city: cityObject, counterName: string, moduleName?: string)
  -> boolean
```
 Returns true if the underlying value of city's counterName counter is nil
 and false otherwise.



### counterReset
```
function cityData.counterReset(city: cityObject, counterName: string, moduleName?: string)
  -> void
```
Sets the value associated with the city's counterName to nil
(meaning that it returns the default value set when it was defined).



### counterAdd
```
function cityData.counterAdd(city: cityObject, counterName: string, increment: number, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Adds the increment to the city's counterName current value, but substituting minValue or maxValue
if the result is out of the range.  Then, the minimum and maximum values specified
when the counter was defined are applied (i.e. the minValue and maxValue here do not
override the defined min and max values).
Returns the value the counter was set to.



### counterSubtract
```
function cityData.counterSubtract(city: cityObject, counterName: string, increment: number, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Subtracts the increment to the city's current value, but substituting minValue or maxValue
if the result is out of the range.  Then, the minimum and maximum values specified
when the counter was defined are applied (i.e. the minValue and maxValue here do not
override the defined min and max values).
Returns the value the counter was set to.



### counterIsAtLeast
```
function cityData.counterIsAtLeast(city: cityObject, counterName: string, threshold: number, moduleName?: string)
  -> boolean
```
Returns true if the city's counterName is at least the threshold
and false otherwise.



### counterIsAtMost
```
function cityData.counterIsAtMost(city: cityObject, counterName: string, threshold: number, moduleName?: string)
  -> boolean
```
Returns true if the city's counterName is at most the threshold
and false otherwise.



### counterSetWithin
```
function cityData.counterSetWithin(city: cityObject, counterName: string, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Sets the counter's current value within the minValue and maxValue specified
(This does not change the overall max and min set when defining the counter).
Returns the value the counter was set to.







## Generic Data

### defineGeneric
```
function cityData.defineGeneric(dataName: string, updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateAll?: boolean, updateFunction?: fun(value: any, cityID: number):any)
```
Defines a generic entry for city data, and can keep any item that is "state savable" (since it must be saved in the state table).
An item is "state savable" if it is one of the following:
    - nil
    - a number
    - a string
    - a boolean
    - a table with keys that are numbers or strings and with values that are also state savable
"generic" data doesn't have the same guards against misuse that the other cityData types have, but it is more flexible.
The function `gen.isStateSavable(item)` may be useful to you.
* dataName = string
    - The name of the data entry.
* updateTime = "never"\|"onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - updateTime defines when the updateFunction is executed.
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "onTribeTurnBegin" means at the very start of the onTribeTurnBegin event for the owner (before all other code)
        + "onTribeTurnEnd" means at the very end of the onTribeTurnEnd event for the owner (after all other code)
        + if city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using cityData.update
    - Default is "never".
* updateAll = nil\|boolean
    - If true, the update function is applied to all city, not just those with non-nil values for this generic data.
    - Default is nil.
* updateFunction = function(value,cityID) --> value
    - Takes the existing value for city's generic data under dataName and the city's ID number, and produces a new value for the generic data under dataName.
    - Default is nil.  However, this is only valid if updateTime is "never".


```lua
updateTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### defineModuleGeneric
```
function cityData.defineModuleGeneric(moduleName: string, dataName: string, updateTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", updateAll?: boolean, updateFunction?: fun(value: any, cityID: number):any)
```
Defines a generic entry for city data, and can keep any item that is "state savable" (since it must be saved in the state table).  This version of defineGeneric allows you 
to add a module name to the generic name, which will prevent name collisions with
generic data from other modules and code written for a specific scenario.
An item is "state savable" if it is one of the following:
    - nil
    - a number
    - a string
    - a boolean
    - a table with keys that are numbers or strings and with values that are also state savable
"generic" data doesn't have the same guards against misuse that the other cityData types have, but it is more flexible.
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
        + if city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen
        during the onTurn update
        + "custom" means the update must be programmed in manually using cityData.update
    - Default is "never".
* updateAll = nil\|boolean
    - If true, the update function is applied to all city, not just those with non-nil values for this generic data.
    - Default is nil.
* updateFunction = function(value,cityID) --> value
    - Takes the existing value for city's generic data under dataName and the city's ID number, and produces a new value for the generic data under dataName.
    - Default is nil.  However, this is only valid if updateTime is "never".


```lua
updateTime:
    \| "never"
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### genericGetValue
```
function cityData.genericGetValue(city: cityObject, keyName: string, moduleName?: string)
  -> any
```
Returns the value stored by the city's keyName, or the default value if the keyName is not set.



### genericSetValue
```
function cityData.genericSetValue(city: cityObject, keyName: string, value: any, moduleName?: string)
  -> any
```
Changes the value stored by the city's keyName to value.
Returns the value that was just set.







## Phrases

### definePhrase
```
function cityData.definePhrase(phraseName: string, defaultValue?: string, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a phrase for city data, which keeps string values.
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
    - If city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen during the onTurn update.
    - "custom" means the update must be programmed in manually using cityData.update.
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



### defineModulePhrase
```
function cityData.defineModulePhrase(moduleName: string, phraseName: string, defaultValue?: string, resetTime?: "custom"|"never"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn")
```
Defines a phrase for city data, which keeps string values.   This version of defineCounter allows you to add a module name to the phrase name, which
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
    - If city has no owner, onTribeTurnBegin and onTribeTurnEnd updates happen during the onTurn update.
    - "custom" means the update must be programmed in manually using cityData.update.
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



### phraseGetValue
```
function cityData.phraseGetValue(city: cityObject, phraseName: string, moduleName?: string)
  -> string
```
Returns the value associated with the city's phrase of phraseName.
If the associated value is nil, the default specified during the definition is returned.



### phraseSetValue
```
function cityData.phraseSetValue(city: cityObject, phraseName: string, value: string, moduleName?: string)
```
Sets the value associated with city's phraseName to value.



### phraseIsNil
```
function cityData.phraseIsNil(city: cityObject, phraseName: string, moduleName?: string)
  -> boolean
```
Returns true if the underlying value of city's phraseName phrase is nil, and false otherwise.



### phraseReset
```
function cityData.phraseReset(city: cityObject, phraseName: string, moduleName?: string)
```
Sets the value associated with the city's phraseName to nil.
(meaning that it returns the default value set when it was defined)







## General Tools

### deleteData
```
function cityData.deleteData(city: cityObject)
```
Deletes the data associated with the city.



### transferData
```
function cityData.transferData(oldCity: cityObject, newCity: cityObject)
```
Associates the cityData from the old city to the new one (deleting the association with the old one).
newCity can't be nil.



### transferOrDeleteData
```
function cityData.transferOrDeleteData(oldCity: cityObject, newCity: cityObject|nil)
```
If newCity is not nil, transfers the data from the old city to the new one (deleting the data for the old one).  If newCity is nil, the data is deleted for oldCity.



### update
```
function cityData.update(city: cityObject, time?: "custom"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", tribe?: tribeObject, key?: string, moduleName?: string)
```
Updates all of city's data keys that have an updateTime of time, unless
key is specified, in which case, update that key only.
* time = "onTurn"\|"onTribeTurnBegin"\|"onTribeTurnEnd"\|"custom"
    - Update the city's data keys that have this updateTime.
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



### generalUpdate
```
function cityData.generalUpdate(time?: "custom"|"onTribeTurnBegin"|"onTribeTurnEnd"|"onTurn", tribe?: tribeObject)
```
Updates data keys that have an updateTime of `time` for all cities.

@*param* `time` — Default is "custom".

@*param* `tribe` — The tribe to consider the active tribe for onTribeTurnBegin and onTribeTurnEnd updates. Default is nil.

```lua
time:
    \| "onTurn"
    \| "onTribeTurnBegin"
    \| "onTribeTurnEnd"
    \| "custom"
```



### validate
```
function cityData.validate(city: cityObject)
```
Checks that the item is still the same city it was before (i.e. that the city hasn't been deleted and the ID reused).  If it has, eliminate all data for that city.



### changeValidationInfo
```
function cityData.changeValidationInfo(city: cityObject)
```
Replaces existing values of the sameItemCheck with new ones.







### flagSetValue
```
function cityData.flagSetValue(city: cityObject, flagName: string, value: boolean, moduleName?: string)
```
Sets the value associated with the city's flag of flagName to the `value` 
(true or false) specified.



### onCityDestroyed
```
function cityData.onCityDestroyed(city: any)
```






