---
layout: page
title: data
tabTitle: data.lua Documentation
minTOC: 2
maxTOC: 3
---

# data

This module is used to save general data, with functionality similar
to that provided by modules like unitData and cityData.  Functions are used to
get the data and to change it, so you don't have to interact and maintain the underlying
tables directly.  These functions also check the data that you input, so that errors are
caught quickly rather than being saved in tables only to surface later.

This module provides "flags", which store boolean values, "counters", which store number
values, and "phrases", which store string values.  There is also some basic "generic"
data storage, which can store "state savable" data, and so is more flexible, but also has
fewer error checks and built in features.  

These flags, counters, and phrases have names, which are strings.  To access a piece of data,
you will need to have the name and know whether the
data is a flag, counter, or phrase.  Then, you can use one of the provided functions
to interact with that data.

By default, all data is nil.  However, flags, counters, and phrases will not return nil
when you get their values (generic, however, will).  Instead, when you define a
data entry, you will define a default value which is to be returned if the data is nil.
Functions are provided to check if the underlying value is actually nil, and to reset
the data to nil if you need to.  A data value stops being nil when you assign it an
actual value.

You can set data to update periodically, during the onTurn event.
Flags and Phrases can be reset to nil automatically, while counters and generic data
can be assigned update parameters or functions.  Usually, updates are only performed on
data which is already non-nil, but you can choose to update all if that is needed for your
functionality.  The update time can also be set to 'custom', which will only update the
data on specific function call.




### counterAdd
```
function data.counterAdd(counterName: string, increment: number, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Adds the increment to the counter counterName current value, but substituting minValue or maxValue
if the result is out of the range.  Then, the minimum and maximum values specified
when the counter was defined are applied (i.e. the minValue and maxValue here do not
override the defined min and max values).
Returns the value the counter was set to.



### counterGetValue
```
function data.counterGetValue(counterName: string, moduleName?: string)
  -> number
```
Returns the value associated with the counter of counterName.
If the value is nil, the default specified during the definition is returned.



### counterIsAtLeast
```
function data.counterIsAtLeast(counterName: string, threshold: number, moduleName?: string)
  -> boolean
```
Returns true if the counter counterName is at least the threshold
and false otherwise.



### counterIsAtMost
```
function data.counterIsAtMost(counterName: string, threshold: number, moduleName?: string)
  -> boolean
```
Returns true if the counter counterName is at most the threshold
and false otherwise.



### counterIsNil
```
function data.counterIsNil(counterName: string, moduleName?: string)
  -> boolean
```
 Returns true if the underlying value of the counterName counter is nil
 and false otherwise.



### counterReset
```
function data.counterReset(counterName: string, moduleName?: string)
  -> void
```
Sets the value associated with the counter counterName to nil
(meaning that it returns the default value set when it was defined).



### counterSetValue
```
function data.counterSetValue(counterName: string, value: number, moduleName?: string)
  -> number
```
Sets the value associated with the counter of counterName to value.
If this value is outside the counter's defined maxValue and minValue,
those values are then applied.
Returns the value the counter was set to.



### counterSetWithin
```
function data.counterSetWithin(counterName: string, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Sets the counter's current value within the minValue and maxValue specified
(This does not change the overall max and min set when defining the counter).
Returns the value the counter was set to.



### counterSubtract
```
function data.counterSubtract(counterName: string, increment: number, minValue?: number, maxValue?: number, moduleName?: string)
  -> number
```
Subtracts the increment from the counter's current value, but substituting minValue or maxValue
if the result is out of the range.  Then, the minimum and maximum values specified
when the counter was defined are applied (i.e. the minValue and maxValue here do not
override the defined min and max values).
Returns the value the counter was set to.



### defineCounter
```
function data.defineCounter(counterName: string, defaultValue?: number, minValue?: number, maxValue?: number, update?: "function"|"functionAll"|"increment"|"incrementAll"|"none"...(+3), updateTime?: "custom"|"never"|"onTurn", updateParameter?: number|function, nonInteger?: boolean)
```
Define a counter for  data, which keeps numerical values
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
        + "incrementAll" same as increment, but is also applied to s with nil as the underlying value of the counter
        + "set" means the counter is set to the updateParameter, but only applies if the counter isn't currently nil
        + "setAll" same as "set", but is also applied to s with nil as the underlying value of the counter
        + "reset" sets the underlying counter value to nil
        + "function" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,ID) (subject to maxValue and minValue), only for underlying values which are not nil
        + "functionAll" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,ID) (subject to maxValue and minValue), even for nil underlying values
    - Default is "none".
* updateTime = "never"\|"onTurn"\|"custom"
    - Gives the time when the counter update happens
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "custom" means the update must be programmed in manually using data.update
    - Default is "never".
* updateParameter = number\|nil\|function
    - if update is "increment","incrementAll", "set", "setAll" then this must be a number
    - if update is "none" or "reset", this is ignored and can be nil
    - if update is "function", this is a function(numberOrNil) -> numberOrNil
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

@*param* `updateParameter` — if update is "increment","incrementAll", "set", "setAll" then this must be a number. if update is "none" or "reset", this is ignored and can be nil. if update is "function", this is a function(numberOrNil) -> numberOrNil. Default is nil.

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
    \| "custom"
```



### defineFlag
```
function data.defineFlag(flagName: string, defaultValue?: boolean, resetTime?: "custom"|"never"|"onTurn")
```
Defines a flag, which keeps boolean values
* flagName = string
    - the name of the flag
* defaultValue = boolean \| nil
    - If the underlying stored value is nil, this is the value the flag takes on.
    - Defaults to false.
* resetTime = "never"\|"onTurn"\|"custom"\|nil
    - Gives the time when the flag's stored value is reset to nil.
    - Defaults to "never".
    - "never" means never reset automatically
    - "onTurn" means at the very beginning of the onTurn event (before all other code)
    - "custom" means the update must be programmed in manually using data.update


@*param* `flagName` — the name of the flag

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the flag takes on. Defaults to false.

@*param* `resetTime` — Gives the time when the flag's stored value is reset to nil. Defaults to "never".

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "custom"
```



### defineGeneric
```
function data.defineGeneric(dataName: string, updateTime?: "custom"|"never"|"onTurn", updateAll?: boolean, updateFunction?: fun(value: any):any)
```
Defines a generic data entry, and can keep any item that is "state savable" (since it must be saved in the state table).
An item is "state savable" if it is one of the following:
    - nil
    - a number
    - a string
    - a boolean
    - a table with keys that are numbers or strings and with values that are also state savable
"generic" data doesn't have the same guards against misuse that the other data types have, but it is more flexible.
The function `gen.isStateSavable(item)` may be useful to you.
* dataName = string
    - The name of the data entry.
* updateTime = "never"\|"onTurn"\|"custom"
    - updateTime defines when the updateFunction is executed.
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "custom" means the update must be programmed in manually using data.update
    - Default is "never".
* updateAll = nil\|boolean
    - If true, the update function is applied to all , not just those with non-nil values for this generic data.
    - Default is nil.
* updateFunction = function(value) --> value
    - Takes the existing value for generic data under dataName and produces a new value for the generic data under dataName.
    - Default is nil.  However, this is only valid if updateTime is "never".


```lua
updateTime:
    \| "never"
    \| "onTurn"
    \| "custom"
```



### defineModuleCounter
```
function data.defineModuleCounter(moduleName: string, counterName: string, defaultValue?: number, minValue?: number, maxValue?: number, update?: "function"|"functionAll"|"increment"|"incrementAll"|"none"...(+3), updateTime?: "custom"|"never"|"onTurn", updateParameter?: number|function, nonInteger?: boolean)
```
Defines a counter for  data, which keeps numerical values.  This version of defineCounter allows you to add a moduleName to the counter,
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
        + "incrementAll" same as increment, but is also applied to s with nil as the underlying value of the counter
        + "set" means the counter is set to the updateParameter, but only applies if the counter isn't currently nil
        + "setAll" same as "set", but is also applied to s with nil as the underlying value of the counter
        + "reset" sets the underlying counter value to nil
        + "function" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,ID) (subject to maxValue and minValue), only for underlying values which are not nil
        + "functionAll" sets the underlying counter value to the result of updateParameter(formerUnderlyingValue,ID) (subject to maxValue and minValue), even for nil underlying values
    - Default is "none".
* updateTime = "never"\|"onTurn"\|"custom"
    - Gives the time when the counter update happens
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "custom" means the update must be programmed in manually using data.update
    - Default is "never".
* updateParameter = number\|nil\|function
    - if update is "increment","incrementAll", "set", "setAll" then this must be a number
    - if update is "none" or "reset", this is ignored and can be nil
    - if update is "function", this is a function(numberOrNil,ID) -> numberOrNil
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

@*param* `updateParameter` — if update is "increment","incrementAll", "set", "setAll" then this must be a number. if update is "none" or "reset", this is ignored and can be nil. if update is "function", this is a function(numberOrNil,ID) -> numberOrNil. Default is nil.

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
    \| "custom"
```



### defineModuleFlag
```
function data.defineModuleFlag(moduleName: string, flagName: string, defaultValue?: boolean, resetTime?: "custom"|"never"|"onTurn")
```
Defines a flag, which keeps boolean values.  This version of defineFlag allows you to add a moduleName to the flag name, which will prevent name collision between modules and code written for a specific scenario.,
for a specific scenario.
* moduleName = string
    - the name of the module
* flagName = string
    - the name of the flag
* defaultValue = boolean \| nil
    - If the underlying stored value is nil, this is the value the flag takes on.
    - Defaults to false.
* resetTime = "never"\|"onTurn"\|"custom"\|nil
    - Gives the time when the flag's stored value is reset to nil.
    - Defaults to "never".
    - "never" means never reset automatically
    - "onTurn" means at the very beginning of the onTurn event (before all other code)
    - "custom" means the update must be programmed in manually using data.update


@*param* `moduleName` — the name of the module

@*param* `flagName` — the name of the flag

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the flag takes on. Defaults to false.

@*param* `resetTime` — Gives the time when the flag's stored value is reset to nil. Defaults to "never".

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "custom"
```



### defineModuleGeneric
```
function data.defineModuleGeneric(moduleName: string, dataName: string, updateTime?: "custom"|"never"|"onTurn", updateAll?: boolean, updateFunction?: fun(value: any):any)
```
Defines a generic data entry, and can keep any item that is "state savable" (since it must be saved in the state table).  This version of defineGeneric allows you 
to add a module name to the generic name, which will prevent name collisions with
generic data from other modules and code written for a specific scenario.
An item is "state savable" if it is one of the following:
    - nil
    - a number
    - a string
    - a boolean
    - a table with keys that are numbers or strings and with values that are also state savable
"generic" data doesn't have the same guards against misuse that the other data types have, but it is more flexible.
The function `gen.isStateSavable(item)` may be useful to you.
* moduleName = string
    - The name of the module using this data
* dataName = string
    - The name of the data entry.
* updateTime = "never"\|"onTurn"\|"custom"
    - updateTime defines when the updateFunction is executed.
        + "never" means no update
        + "onTurn" means at the very beginning of the onTurn event (before all other code)
        + "custom" means the update must be programmed in manually using data.update
    - Default is "never".
* updateAll = nil\|boolean
    - If true, the update function is applied to all , not just those with non-nil values for this generic data.
    - Default is nil.
* updateFunction = function(value) --> value
    - Takes the existing value for the generic data under dataName and produces a new value for the generic data under dataName.
    - Default is nil.  However, this is only valid if updateTime is "never".


```lua
updateTime:
    \| "never"
    \| "onTurn"
    \| "custom"
```



### defineModulePhrase
```
function data.defineModulePhrase(moduleName: string, phraseName: string, defaultValue?: string, resetTime?: "custom"|"never"|"onTurn", allowedValuesTable?: table)
```
Defines a phrase, which keeps string values. This version of definePhrase allows you to add a module name to the phrase name, which
will prevent name collisions with phrases from other modules and code
written for a specific scenario.
* moduleName = string
    - The name of the module.
* phraseName = string
    - The name of the phrase.
* defaultValue = string
    - If the underlying stored value is nil, this is the value the phrase takes on.
    - Default value is "".
* resetTime = "never"\|"onTurn"\|"custom"
    - Gives the time when the phrase's stored value is reset to nil.
    - "never" means never reset automatically.
    - "onTurn" means at the very beginning of the onTurn event (before all other code).
    - "custom" means the update must be programmed in manually using data.update.
    - Default value is "never".


@*param* `moduleName` — The name of the module.

@*param* `phraseName` — The name of the phrase.

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the phrase takes on.

@*param* `resetTime` — Gives the time when the phrase's stored value is reset to nil.

@*param* `allowedValuesTable` — A table of allowed values for the phrase.  If this is provided, then the phrase can only be set to a string that is a key or value in the table.  If it is not provided, then any string value is allowed.

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "custom"
```



### definePhrase
```
function data.definePhrase(phraseName: string, defaultValue?: string, resetTime?: "custom"|"never"|"onTurn", allowedValuesTable?: table)
```
Defines a phrase for data, which keeps string values.
* phraseName = string
    - The name of the phrase.
* defaultValue = string
    - If the underlying stored value is nil, this is the value the phrase takes on.
    - Default value is "".
* resetTime = "never"\|"onTurn"\|"custom"
    - Gives the time when the phrase's stored value is reset to nil.
    - "never" means never reset automatically.
    - "onTurn" means at the very beginning of the onTurn event (before all other code).
    - "custom" means the update must be programmed in manually using data.update.
    - Default value is "never".


@*param* `phraseName` — The name of the phrase.

@*param* `defaultValue` — If the underlying stored value is nil, this is the value the phrase takes on.

@*param* `resetTime` — Gives the time when the phrase's stored value is reset to nil.

@*param* `allowedValuesTable` — A table of allowed values for the phrase.  If this is provided, then the phrase can only be set to a string that is a key or value in the table.  If it is not provided, then any string value is allowed.

```lua
resetTime:
    \| "never"
    \| "onTurn"
    \| "custom"
```



### flagGetValue
```
function data.flagGetValue(flagName: string, moduleName?: string)
  -> The: boolean
```
Returns the value associated with the flag `flagName`.
If the value is nil, the default specified during the definition is returned.

@*param* `flagName` — The name of the flag

@*param* `moduleName` — The name of the module (if applicable)

---

@*return* `The` — value associated with the flag `flagName`.



### flagIsNil
```
function data.flagIsNil(flagName: string, moduleName?: string)
  -> boolean
```
Returns true if the underlying value of flagName flag is nil
and false otherwise.



### flagReset
```
function data.flagReset(flagName: string, moduleName?: string)
```
Sets the value associated with the flag of flagName to nil
(meaning that it returns the default value set when it was defined).



### flagSetFalse
```
function data.flagSetFalse(flagName: string, moduleName?: string)
```
Sets the value associated with the flag flagName to `false`



### flagSetTrue
```
function data.flagSetTrue(flagName: string, moduleName?: string)
```
Sets the value associated with the flag of flagName to `true`.



### flagSetValue
```
function data.flagSetValue(flagName: string, value: boolean, moduleName?: string)
```
Sets the value associated with the flag flagName to the `value`
specified (true or false).



### genericGetValue
```
function data.genericGetValue(keyName: string, moduleName?: string)
  -> any
```
Returns the value stored by keyName, or the default value if the keyName is not set.



### genericSetValue
```
function data.genericSetValue(keyName: string, value: any, moduleName?: string)
  -> any
```
Changes the value stored by keyName to `value`.
Returns the value that was just set.



### listOfCounterKeys
```
function data.listOfCounterKeys()
  -> table
```
 Returns the list of all counter keys that have been defined without
 a module component.



### listOfFlagKeys
```
function data.listOfFlagKeys()
  -> table
```
 Returns the list of all flag keys that have been defined without
 a module component.



### listOfGenericKeys
```
function data.listOfGenericKeys()
  -> table
```
 Returns the list of all generic keys that have been defined without
 a module component.



### listOfPhraseKeys
```
function data.listOfPhraseKeys()
  -> table
```
 Returns the list of all phrase keys that have been defined without
 a module component.



### phraseGetValue
```
function data.phraseGetValue(phraseName: string, moduleName?: string)
  -> string
```
Returns the value associated with the phrase phraseName.
If the associated value is nil, the default specified during the definition is returned.



### phraseIsNil
```
function data.phraseIsNil(phraseName: string, moduleName?: string)
  -> boolean
```
Returns true if the underlying value of the phraseName phrase is nil, and false otherwise.



### phraseReset
```
function data.phraseReset(phraseName: string, moduleName?: string)
```
Sets the value associated with the phrase phraseName to nil.
(meaning that it returns the default value set when it was defined)



### phraseSetValue
```
function data.phraseSetValue(phraseName: string, value: string, moduleName?: string)
```
Sets the value associated with the phrase phraseName to value.



### update
```
function data.update(time?: "custom"|"onTurn", key?: string, moduleName?: string)
```
Updates all data keys that have an updateTime of time, unless
key is specified, in which case, update that key only.
    * time = "onTurn"\|"custom"
        - Update the 's data keys that have this updateTime.
        - Default is "custom".
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
    \| "custom"
```





