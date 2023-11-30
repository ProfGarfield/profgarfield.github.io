---
layout: page
title: diplomacy
tabTitle: diplomacy.lua Documentation
minTOC: 2
maxTOC: 3
---

# diplomacy

undefined



### allianceExists
```
function diplomacy.allianceExists(tribe1: tribeObject, tribe2: tribeObject)
  -> boolean
```
Returns true if an alliance exists between `tribe1` and `tribe2`, and false otherwise.




### alwaysEnableTreatyChanges
```
function diplomacy.alwaysEnableTreatyChanges(tribe1: tribeObject, tribe2: tribeObject)
```
Generates an error, so the scenario designer knows to update
to the new diplomacy functions.




### canTribesChangeTreatiesEndogenously
```
function diplomacy.canTribesChangeTreatiesEndogenously(tribe1: tribeObject, tribe2: tribeObject)
  -> boolean
```
Returns true if `tribe1` and `tribe2` are allowed to change their treaty status with each other through diplomacy.  This is the default behaviour, but it can be changed by calling `diplomacy.disableEndogenousTreatyChangesByDefault` in diplomacySettings.lua.  It can also be changed by calling `diplomacy.disableEndogenousTreatyChanges` or `diplomacy.enableEndogenousTreatyChanges` as part of normal events.




### ceaseFireExists
```
function diplomacy.ceaseFireExists(tribe1: tribeObject, tribe2: tribeObject)
  -> boolean
```
Returns true if a cease fire treaty exists between `tribe1` and `tribe2`, and false otherwise.




### checkTreaties
```
function diplomacy.checkTreaties()
```
The scenario designer should not need to call this function.
Checks the treaties between tribes and compares them to expectations.
If tribes are not allowed to change their treaty status with each other
through diplomacy, then the treaty status is reset to the expected value.
If they can change treaties, the expected value is updated to match the
actual value.




### clearAlliance
```
function diplomacy.clearAlliance(tribe1: tribeObject, tribe2: tribeObject)
```
Clears treaties so that an alliance does not exist between `tribe1` and `tribe2`.




### clearCeaseFire
```
function diplomacy.clearCeaseFire(tribe1: tribeObject, tribe2: tribeObject)
```
Clears treaties so that a cease fire does not exist between `tribe1` and `tribe2`.




### clearContact
```
function diplomacy.clearContact(tribe1: tribeObject, tribe2: tribeObject)
```
Clears treaties so that "contact" does not exist between `tribe1` and `tribe2`.




### clearEmbassyWith
```
function diplomacy.clearEmbassyWith(ownerTribe: tribeObject, hostTribe: tribeObject)
```
Clears treaties so that the `ownerTribe` does not have an embassy with the `hostTribe`.  That is, the `ownerTribe` will not receive an intelligence reports about `hostTribe`.




### clearPeaceTreaty
```
function diplomacy.clearPeaceTreaty(tribe1: tribeObject, tribe2: tribeObject)
```
Clears treaties so that a peace treaty does not exist between `tribe1` and `tribe2`.




### clearVendettaWith
```
function diplomacy.clearVendettaWith(angryTribe: tribeObject, offendingTribe: tribeObject)
```
Clears treaties so that the `angryTribe` does not have a vendetta with the `offendingTribe`.




### clearWar
```
function diplomacy.clearWar(tribe1: tribeObject, tribe2: tribeObject)
```
Clears the "war" "treaty" between `tribe1` and `tribe2`.  Does not establish
any other treaty between the tribes. 




### contactExists
```
function diplomacy.contactExists(tribe1: tribeObject, tribe2: tribeObject)
  -> boolean
```
Returns true if "contact" "treaties" exists between `tribe1` and `tribe2`, and false otherwise.




### defineEndogenousFlags
```
function diplomacy.defineEndogenousFlags()
```
It is not expected that the scenario designer will need to use this function.

This function is called in events.lua to define the flags that allow
the diplomacy module to keep track of whether two tribes can change
their treaty status with each other through diplomacy.

It is called in events.lua (instead of in diplomacy.lua) so that
`diplomacy.disableEndogenousTreatyChangesByDefault` can be called
in diplomacySettings.lua before the flags are defined, which
allows the default value to be set to false for some tribes.
    



### disableEndogenousTreatyChanges
```
function diplomacy.disableEndogenousTreatyChanges(tribe1: tribeObject, tribe2: tribeObject)
```
Calling this function prevents `tribe1` and `tribe2` from changing their treaty status with each other through diplomacy.  If they change
their treaty status, events will undo the change at the earliest opportunity.  All treaty changes will have to be made using the diplomacy module.
The function `diplomacy.enableEndogenousTreatyChanges` can be used to re-enable treaty changes through diplomacy.
Vendetta and Embassy status can still be changed.
    



### disableEndogenousTreatyChangesByDefault
```
function diplomacy.disableEndogenousTreatyChangesByDefault(tribe1: tribeObject, tribe2: tribeObject)
```
Call this function in diplomacySettings.lua to disable the ability of `tribe1` and `tribe2` to change their treaty status with each other through diplomacy by default.  This is useful if you want to use the diplomacy module to control all treaty changes, and you don't want the AI to change treaties on its own.  You can use `diplomacy.enableEndogenousTreatyChanges` if you want two tribes to be able to change their treaty status with each other through diplomacy during
part of your scenario.
Vendetta and Embassy status can still be changed.




### disableTreatyChanges
```
function diplomacy.disableTreatyChanges(tribe1: tribeObject, tribe2: tribeObject)
```
Calls diplomacy.disableEndogenousTreatyChanges for `tribe1` and `tribe2`.
This is the name of a function from an earlier version of the diplomacy module.




### enableEndogenousTreatyChanges
```
function diplomacy.enableEndogenousTreatyChanges(tribe1: tribeObject, tribe2: tribeObject)
```
Calling this function enables `tribe1` and `tribe2` to change their treaty status with each other through diplomacy.  This ability
may have been disabled by a call to `diplomacy.disableEndogenousTreatyChanges`, or it may have been disabled by default (see `diplomacy.disableEndogenousTreatyChangesByDefault`).




### enableTreatyChanges
```
function diplomacy.enableTreatyChanges(tribe1: tribeObject, tribe2: tribeObject)
```
Calls diplomacy.enableEndogenousTreatyChanges for `tribe1` and `tribe2`.
This is the name of a function from an earlier version of the diplomacy module.




### giveGiftMenu
```
function diplomacy.giveGiftMenu()
```




### hasEmbassyWith
```
function diplomacy.hasEmbassyWith(ownerTribe: tribeObject, hostTribe: tribeObject)
  -> boolean
```
Returns true if the `ownerTribe` has an embassy with the `hostTribe`, and false otherwise.  That is, the `ownerTribe` receives an intelligence report about `hostTribe`.




### hasVendettaWith
```
function diplomacy.hasVendettaWith(angryTribe: tribeObject, offendingTribe: tribeObject)
  -> boolean
```
Returns true if the `angryTribe` has a vendetta with the `offendingTribe`, and false otherwise.




### linkState
```
diplomacy.linkState --> function
```




### onActivateUnit
```
function diplomacy.onActivateUnit(unit: any, source: any, repeatedActivation: any)
```




### onCityTaken
```
function diplomacy.onCityTaken(city: any, defender: any)
```




### onDateCheck
```
function diplomacy.onDateCheck()
```




### onNegotiation
```
function diplomacy.onNegotiation(talker: any, listener: any, canNegotiate: any)
```




### peaceTreatyExists
```
function diplomacy.peaceTreatyExists(tribe1: tribeObject, tribe2: tribeObject)
  -> boolean
```
Returns true if a peace treaty exists between `tribe1` and `tribe2`, and false otherwise.




### registerCanGiveAwayTileFn
```
function diplomacy.registerCanGiveAwayTileFn(canGiveAwayTileFn: fun(tile: tileObject, givingTribe: tribeObject, receivingTribe: tribeObject):boolean)
```
Registers a function(tile,givingTribe,receivingTribe)  
to determine whether the givingTribe can transfer ownership
of everything (units and city) on the tile to the receivingTribe.

There is no need to check that the giving tribe owns the units/city
on the tile.  That is taken care of within the diplomacy module.




### registerCanGiveGiftFunction
```
function diplomacy.registerCanGiveGiftFunction(canGiveGiftFunction: fun(giftGiver: tribeObject, giftReceiver: tribeObject):boolean)
```
Registers a function(giftGiver,giftReceiver) that determines whether the `giftGiver` can give a gift to the `giftReceiver` through the gift giving menu.

If the function returns true, then the giftReceiver will be an option in
the gift giving menu for giftGiver.




### registerForbidTechFromConquestFunction
```
function diplomacy.registerForbidTechFromConquestFunction(forbidTechFromConquest: fun(tech: techObject, conqueringTribe: tribeObject, losingTribe: tribeObject):boolean)
```
Register a function to determine whether a tribe can receive a technology when conquering another tribe's city.<br><br>
forbidTechFromConquest(tech,conqueringTribe,losingTribe)-->bool
 If true, the `conqueringTribe` can't receive the `tech`
 from the `losingTribe` as a result of conquering a city
 owned by the `losingTribe`.
 If false (or nil), the `conqueringTribe` can receive the `tech`
 from the `losingTribe` as a result of conquering a city
 owned by the `losingTribe`.



### registerForbidTechTheftFunction
```
function diplomacy.registerForbidTechTheftFunction(forbidTechTheft: fun(tech: techObject, thievingTribe: tribeObject, thievingUnit: unitObject):boolean)
```
 Register a function to determine whether a tribe can
 steal a technology using a diplomatic (role 6) unit.<br><br>
 forbidTechTheft(tech,thievingTribe,thievingUnit)-->boolean
 If true, the `thievingTribe` can't steal the `tech`
 from another tribe using the `thievingUnit` (if it has 
 role 6 for diplomatic units).
 If false (or nil), the `thievingTribe` can steal the `tech`.
 (The giving tribe can't be specified, because there isn't a
 way to control which tribe the spy or diplomat steals from.)



### registerForbidTechTradeFunction
```
function diplomacy.registerForbidTechTradeFunction(forbidTechTrade: fun(tech: techObject, receiverTribe: tribeObject, giverTribe: tribeObject):boolean)
```
Register a function to determine whether a tribe can receive a technology from another tribe through diplomacy.<br><br>
 forbidTechTrade(tech,receiverTribe,giverTribe)-->bool
 If true, the `giverTribe` can't give or trade the tech
 to the `receiverTribe`. (Either in in-game negotiations, or
 using the diplomacy module's gift system.)
 If false (or nil), the `giverTribe` can give or trade the tech
 to the `receiverTribe`.



### reservedTechGroup
```
diplomacy.reservedTechGroup --> integer
```




### resetEndogenousTreatyChanges
```
function diplomacy.resetEndogenousTreatyChanges(tribe1: tribeObject, tribe2: tribeObject)
```
Calling this function changes whether `tribe1` and `tribe2` can change their treaty status with each other through diplomacy.  Ordinarily, the
ability to change treaty status is enabled by default (in which case this function restores the default behaviour after a call to `diplomacy.disableEndogenousTreatyChanges`).  However, if `diplomacy.disableEndogenousTreatyChangesByDefault` was called during initialization, then the ability to change treaty status is disabled by default (in which case this function restores the default behaviour after a call to `diplomacy.enableEndogenousTreatyChanges`).




### setAlliance
```
function diplomacy.setAlliance(tribe1: tribeObject, tribe2: tribeObject)
```
Sets treaties so that an alliance exists between `tribe1` and `tribe2`.




### setCeaseFire
```
function diplomacy.setCeaseFire(tribe1: tribeObject, tribe2: tribeObject)
```
Sets treaties so that a cease fire exists between `tribe1` and `tribe2`.




### setContact
```
function diplomacy.setContact(tribe1: tribeObject, tribe2: tribeObject)
```
Sets treaties so that "contact" exists between `tribe1` and `tribe2`.




### setDiplomacyReversalMessage
```
function diplomacy.setDiplomacyReversalMessage(message: string|false|nil)
```
Sets the message that is displayed when a treaty change is undone.
%STRING1 and %STRING2 are replaced with the names of the tribes that
changed their treaty status.
Calling this function with a value of nil or false will prevent a message
from being displayed.
The default value is "You may have received a message that the %STRING1 and %STRING2 have changed their treaty status.  This has been undone."


```lua
-- A string is a data type native to Lua which consists of a sequence of characters. These often represent text to be displayed, but are also useful in other contexts. Strings are commonly used as keys in tables, since they make code more readable.
-- <br>
-- [Programming in Lua, 2.4 -- Strings](https://www.lua.org/pil/2.4.html)
-- A string is a data type native to Lua which consists of a sequence of characters. These often represent text to be displayed, but are also useful in other contexts. Strings are commonly used as keys in tables, since they make code more readable.
-- <br>
-- [Programming in Lua, 2.4 -- Strings](https://www.lua.org/pil/2.4.html)
-- The 'nil' data type has a single value nil, and tends to represent the absence of a value. Nil is a data type which is native to Lua, and is considered 'falsy' in logical statements. Unassigned keys in a table return nil as their value.
-- <br>
-- [Programming in Lua, 2.1 -- Nil](https://www.lua.org/pil/2.1.html)
-- <br>
-- [Tutorialspoint Lua -- Data Types](https://www.tutorialspoint.com/lua/lua_data_types.htm)
-- The 'nil' data type has a single value nil, and tends to represent the absence of a value. Nil is a data type which is native to Lua, and is considered 'falsy' in logical statements. Unassigned keys in a table return nil as their value.
-- <br>
-- [Programming in Lua, 2.1 -- Nil](https://www.lua.org/pil/2.1.html)
-- <br>
-- [Tutorialspoint Lua -- Data Types](https://www.tutorialspoint.com/lua/lua_data_types.htm)
message:
    \| false
```



### setEmbassyWith
```
function diplomacy.setEmbassyWith(ownerTribe: tribeObject, hostTribe: tribeObject)
```
Sets treaties so that the `ownerTribe` has an embassy with the `hostTribe`.  That is, the `ownerTribe` will receive an intelligence reports about `hostTribe`.




### setEventTreatiesOnly
```
function diplomacy.setEventTreatiesOnly(eventTreatiesMsg: string)
```
Generates an error, so the scenario designer knows to update
to the new diplomacy functions.




### setPeaceTreaty
```
function diplomacy.setPeaceTreaty(tribe1: tribeObject, tribe2: tribeObject)
```
Sets treaties so that a peace treaty exists between `tribe1` and `tribe2`.




### setVendettaWith
```
function diplomacy.setVendettaWith(angryTribe: tribeObject, offendingTribe: tribeObject)
```
Sets treaties so that the `angryTribe` has a vendetta with the `offendingTribe`.




### setWar
```
function diplomacy.setWar(tribe1: tribeObject, tribe2: tribeObject)
```
Sets treaties so that `tribe1` and `tribe2` are at war with each other.
(Note, you may also have to use `civ.makeAggression` to make the tribes actually fight each other.) 




### techTransferTableToFunctions
```
function diplomacy.techTransferTableToFunctions(stopTechTransferTable: table)
  -> forbidTechTrade: fun(tech: techObject, receiverTribe: tribeObject, giverTribe: tribeObject):boolean
  2. forbidTechFromConquest: fun(tech: techObject, conqueringTribe: tribeObject, losingTribe: tribeObject):boolean
  3. forbidTechTheft: fun(tech: techObject, thievingTribe: tribeObject, thievingUnit: unitObject):boolean
```
stopTechTransferTable[techObject.id] = {
    * noPrereqs = bool
        - If true, then the tech can't be given or traded to another tribe, or conquered, or stolen, if the receiving tribe doesn't have the tech's prerequisites.
        - If false (or nil), a tribe can receive the tech even if it  doesn't have the tech's prerequisites.
    * noTrade = bool
        - If true, then the tech can't be given or traded to another tribe.
        - If false (or nil), a tribe can receive the tech through diplomacy.
    * noConquest = bool
        - If true, then the tech can't be received by conquering a city.
        - If false (or nil), a tribe can receive the tech by conquering a city.
    * noTheft = bool
        - If true, then the tech can't be stolen with a diplomat or spy.
        - If false (or nil), a tribe can steal the tech.
    }
    If there is no value for a particular tech object, then all these
    values are considered false


@*param* `stopTechTransferTable` — stopTechTransferTable[techObject.id] = {noPrereqs=bool,noTrade=bool,noConquest=bool,noTheft=bool}



### warExists
```
function diplomacy.warExists(tribe1: tribeObject, tribe2: tribeObject)
  -> boolean
```
Returns true if `tribe1` and `tribe2` are at war with each other, and false otherwise.  (Note that if tribes have no contact with each other, they can attack each other's units but will not be at war.)





