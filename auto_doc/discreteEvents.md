---
layout: page
title: discreteEvents
tabTitle: discreteEvents.lua Documentation
minTOC: 2
maxTOC: 3
---

# discreteEvents

The Discrete Events Registration Module allows the scenario designer to 
register code for events in discrete chunks, instead of having to program out
all the logic for events of a certain type in the same place.  Note, however, that 
the order of execution of different discrete events is not guaranteed.  If you need
events to happen in a specific order, you should either progrgram them all in the same
discrete event, or use either `consolidatedEvents.lua` or the appropriate file in the
`EventFiles` directory.  To import this module, use the following code:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
    



### getVersion
```
discreteEvents.getVersion --> integer
```




### linkStateToModules
```
function discreteEvents.linkStateToModules(code: fun(stateTable: table, stateTableKeys: table<string, true>))
```
Registers a function that will be called during civ.scen.onLoad, with which you can link state tables from inside individual modules.  `stateTable` is the table which is added to the saved game, `stateTableKeys` is a record of keys already used in the stateTable, and by adding keys, you can avoid accidental collision. Example:
```lua
local delayedActionState = "state not linked"
local savedActions = "state not linked"
local function linkState(tableInStateTable)
    if type(tableInStateTable) == "table" then
        delayedActionState = tableInStateTable
    else
        error("linkState: linkState takes a table as an argument.")
    end
    delayedActionState.savedActions = delayedActionState.savedActions or {}
    savedActions = delayedActionState.savedActions
end
delayedAction.linkState = linkState
discreteEvents.linkStateToModules(function(state,stateTableKeys)
    local keyName = "delayedAction"
    if stateTableKeys[keyName] then
        error('"'..keyName..'" is used as a key for the state table on at least two occasions.')
    else
        stateTableKeys[keyName] = true
    end
    -- link the state table to the module
    state[keyName] = state[keyName] or {}
    linkState(state[keyName])
end)
```




### minVersion
```
discreteEvents.minVersion --> function
```




### onActivateUnit
```
function discreteEvents.onActivateUnit(code: fun(unit: unitObject, source: boolean, repeatMove: boolean):boolean|function|nil)
```
@*param* `code` — unit: unitObject)

Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. `source` is `true` if activated by keyboard or mouse click, `false` if activated by the game itself. `repeatMove` is `true` if it's a repeat activation caused by moving (see civ.scen.compatibility), `false` otherwise.
As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.
If the function returns true, the unit activation will be cancelled.
No further activation code will be executed, and the unit's type
will temporarily be set to have 0 movement points.
If the function returns function(unit), then the unit activation
will be cancelled, and the function returned will be executed
just before another unit is activated.  (You may wish to put
the unit to sleep, for example.)
Not returning anything is equivalent to returning nil, which is
acceptable, and keeps the unit activation going.



### onBeforeProduction
```
function discreteEvents.onBeforeProduction(code: fun(turn: integer, tribe: tribeObject))
```
 Use discreteEvents.onTribeTurnBegin instead



### onBribeUnit
```
function discreteEvents.onBribeUnit(code: fun(unit: unitObject, previousOwner: tribeObject))
```
Registers a function that is called when a unit is bribed successfully. unit.owner is the new owner at this point, `previousOwner` the old owner.
As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCanFoundCity
```
function discreteEvents.onCanFoundCity(code: fun(unit: unitObject, advancedTribe: boolean):boolean)
```
Registers a function that is called to determine if `unit` can found a city at the unit's location. `advancedTribe` is `true` when picking up a hut with `unit` triggers an advanced tribe. Return `true` to allow, `false` to disallow.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.
This is combined with the consolidated events, the legacy events, and the separate onCanFoundCity.lua file.  If any of these functions return false, the city can't be built.



### onCentauriArrival
```
function discreteEvents.onCentauriArrival(code: fun(tribe: tribeObject))
```
Registers a function that is called when a tribe's spaceship reaches its target. Just registering this function causes the game to not end at this point ("endgame override").

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onChooseSeason
```
function discreteEvents.onChooseSeason(code: fun())
```
Registers code to be executed during civ.scen.onTurn and civ.scen.onScenarioLoaded.  This way, the correct "season" can be chosen when the scenario is loaded, and can be updated for each new turn.
    
As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCityDestroyed
```
function discreteEvents.onCityDestroyed(code: fun(city: cityObject))
```
Registers a function that is called when a city is destroyed.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCityFounded
```
function discreteEvents.onCityFounded(code: fun(city: cityObject)|fun(city: cityObject):fun())
```
Registers a function to be called every time a city is founded. The callback takes the city as a parameter, and can optionally return a function (since 0.18) that is called to perform cleanup when the user cancels founding the city.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.  This includes any code returned to cleanup after the user cancels founding the city.



### onCityProcessed
```
function discreteEvents.onCityProcessed(code: fun(city: cityObject))
```
Deprecated.  Use onJustBeforeCityProcessed instead.  (It is an equivalent event, but with a better name.)

Registers a function that is called immediately before each city is processed (which happens at the start of a tribe's turn).  (This is achieved through use of civ.scen.onCalculateCityYield.)

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCityProcessingComplete
```
function discreteEvents.onCityProcessingComplete(code: fun(turn: integer, tribe: tribeObject))
```
Registers a function that is called when a tribe's cities have been processed for that turn. See `onTurn` for interaction with other "turn" triggers.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCityProduction
```
function discreteEvents.onCityProduction(code: fun(city: cityObject, prod: improvementObject|unitObject|wonderObject))
```
Registers a function that is called when a city completes its production order. The produced item `prod` is either a unit, improvement or wonder (this can be checked with the civ.is* functions).

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCityTaken
```
function discreteEvents.onCityTaken(code: fun(city: cityObject, defender: tribeObject))
```
Registers a function that is called when a city is captured. `city` is the city changing hands, at this point city.owner is the new owner already. `defender` is the old owner.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onCityWindowOpened
```
function discreteEvents.onCityWindowOpened(code: fun(city: cityObject))
```
Registers code to be executed when a city window is opened.  `city` is the city whose window is being opened.  Note that the AI doesn't open city windows.




### onEnterTile
```
function discreteEvents.onEnterTile(code: fun(unit: unitObject, previousTile: tileObject, previousDomainSpec: integer):boolean|nil)
```
Registers code to be executed when a unit enters a tile.  (Implemented using several civ.scen functions.)  `unit` is the unit which entered the tile, `previousTile` is where the unit was before it moved, and `previousDomainSpec` is the value of unit.domainSpec before it moved into the square (useful for units with range).
If true is returned, no further discrete events are executed for this event.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onEnterTilePriority
```
function discreteEvents.onEnterTilePriority(code: fun(unit: unitObject, previousTile: tileObject, previousDomainSpec: integer):boolean|nil)
```
 Registers an onEnterTile event before all other onEnterTile events.  It is used for "transport" events, so that units can "drag" other units into the tile before the regular onEnterTile event.



### onFinalOrderGiven
```
function discreteEvents.onFinalOrderGiven(code: fun(unit: unitObject))
```
Registers code to be executed when a unit has been given its last order for the turn.  That is, when a new unit is active, and the previous unit has spent all its movement points (or, at the end of the turn)




### onGameEnds
```
function discreteEvents.onGameEnds(code: fun(reason: gameEndReasons):(gameIsOver: boolean))
```
<br>Registers a function that is called when the game ends. `reason` is an integer between 1 and 6:
<br>1 and 2 - Space race victory. This does not trigger if `onCentauriArrival` has a callback registered. 1 means victory by active player.
<br>3 - Conquest victory
<br>4 - Defeat
<br>5 - Retirement
<br>6 - Macro ENDGAME action
<br>Return `true` to end the game, `false` to keep playing.
--
As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.
This is combined with the consolidated events, the legacy events, and the separate onGameEnds.lua file. If any of these return false, the game end is prevented.



### onJustAfterCityProcessed
```
function discreteEvents.onJustAfterCityProcessed(code: fun(city: cityObject))
```
Registers a function that is called just after a city is processed for the turn (which happens at the start of a tribe's turn).  (This is achieved through use of civ.scen.onCalculateCityYield.)

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onJustBeforeCityProcessed
```
function discreteEvents.onJustBeforeCityProcessed(code: fun(city: cityObject))
```
Registers a function that is called immediately before each city is processed (which happens at the start of a tribe's turn).  (This is achieved through use of civ.scen.onCalculateCityYield.)

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onKeyPress
```
function discreteEvents.onKeyPress(code: function)
```
Registers a function to be called every time a key is pressed.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.

@*param* `code` — (keyCode:integer)



### onNegotiation
```
function discreteEvents.onNegotiation(code: fun(talker: tribeObject, listener: tribeObject):(canTalk: boolean))
```
Registers a function that is called when two tribes attempt negotiations. `talker` is the tribe initiating the contact, `listener` the receiver. Return `true` to allow the negotiations to commence, `false` to deny.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.
This is combined with the consolidated events, the legacy events, and the separate onNegotiation.lua file.  If any of these return false, then negotiation is prevented.



### onSave
```
function discreteEvents.onSave(code: fun())
```
Registers a function that is called when the game is saved.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.  However, you can't add extra data to be saved on the end of the file with this function.



### onScenarioLoaded
```
function discreteEvents.onScenarioLoaded(code: fun())
```
Registers a function that is called when the scenario is loaded.  (This is whenever a game is loaded, not just when the scenario is started.)

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onSchism
```
function discreteEvents.onSchism(code: fun(tribe: tribeObject):(allowSchism: boolean))
```
Registers a function that is called when a schism is triggered. This happens when the capital of a AI-controlled tribe with more than four cities is captured, and, if the attacker is human-controlled, it is ranked lower in power than the defender. If the attacker is AI-controlled the best human tribe must be ranked lower than the defender for the schism to trigger.
If the schism is allowed, a new tribe will be created that takes over about half the cities of the old tribe. If no new tribe can be created, the schism does not occur.
Return `true` to allow the schism to happen, `false` to deny.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.
This is combined with the consolidated events, the legacy events, and the separate onSchism.lua file.  If any of these return false, then schism is prevented.



### onTribeTurnBegin
```
function discreteEvents.onTribeTurnBegin(code: fun(turn: integer, tribe: tribeObject))
```
Registers a function that is called at the start of a tribe's turn. See `onTurn` for interaction with other "turn" triggers.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onTribeTurnEnd
```
function discreteEvents.onTribeTurnEnd(code: fun(turn: integer, tribe: tribeObject))
```
Registers a function that is called at the end of a tribe's turn. See `onTurn` for interaction with other "turn" triggers.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onTurn
```
function discreteEvents.onTurn(code: fun(turn: integer))
```
Registers a function that is called at the start of a turn. The basic sequence of this and other "turn" triggers is as follows:
<br>`onTurn` fires
<br>Non-tribe-specific updates take place
<br>`onTribeTurnBegin` fires for tribe 0.
<br>Tribe 0 cities are processed.
<br>`onCityProcessingComplete` fires for tribe 0 (this fires even when a tribe has no cities).
<br>Tribe 0 units move
<br>`onTribeTurnEnd` fires for tribe 0.
<br>All active tribes are processed in order according to the sequence for tribe 0
<br>`onTribeTurnEnd` fires for tribe 7.
<br>`onTurn` fires for the next turn

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onUnitDefeated
```
function discreteEvents.onUnitDefeated(code: fun(loser: unitObject, winner: unitObject, aggressor: unitObject, victim: unitObject, loserLocation: tileObject, winnerVetStatus: boolean, loserVetStatus: boolean))
```
Registers a function that is called whenever a unit is killed, either in standard Civ II combat or by events. `loser` is the unit that is killed, `winner` is the unit responsible for it.  `aggressor` is the unit that initiated the attack, and `victim` is the unit that was attacked.  `loserLocation` is the tile where the unit that lost combat stood (if the loser is the aggressor, loser.location and aggressor.location return a tile off the map).  `winnerVetStatus` and `loserVetStatus` are true if the corresponding unit was a veteran before combat took place.  (winner.veteran is checked after the unit is promoted) 

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onUnitDeleted
```
function discreteEvents.onUnitDeleted(code: fun(deletedUnit: unitObject, replacingUnit: unitObject|nil))
```
Registers a function that is called when a unit is deleted (either through combat death, or by some other even, but not if the unit is disbanded).  `deletedUnit` is the unit being deleted, while `replacing unit` is the unit replacing it (e.g. from promotion/demotion), or _nil_ if there is no such unit.

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### onUnitKilled
```
function discreteEvents.onUnitKilled(code: fun(loser: unitObject, winner: unitObject, aggressor: unitObject, victim: unitObject, loserLocation: tileObject, winnerVetStatus: boolean, loserVetStatus: boolean))
```
Registers a function that is called whenever a unit is killed in standard Civ II combat. `loser` is the unit that is killed, `winner` is the unit responsible for it.  `aggressor` is the unit that initiated the attack, and `victim` is the unit that was attacked.  `loserLocation` is the tile where the unit that lost combat stood (if the loser is the aggressor, loser.location and aggressor.location return a tile off the map).  `winnerVetStatus` and `loserVetStatus` are true if the corresponding unit was a veteran before combat took place.  (winner.veteran is checked after the unit is promoted) 

As a Discrete Event, this function can be called multiple times, and all code will be registered to the event.



### performLinkStateToModules
```
function discreteEvents.performLinkStateToModules(state: any, stateTableKeys: any)
```
 state is the state table (after the buffer has been extracted)
 stateTableKeys are keys for the state table that have
 already been used, (this enables errors upon collision of keys) 



### performOnActivateUnit
```
function discreteEvents.performOnActivateUnit(unit: any, source: any, rep: any)
  -> unknown
```




### performOnAfterProduction
```
function discreteEvents.performOnAfterProduction(turn: any, tribe: any)
```




### performOnBeforeProduction
```
function discreteEvents.performOnBeforeProduction(turn: any, tribe: any)
```




### performOnBribeUnit
```
function discreteEvents.performOnBribeUnit(unit: any, previousOwner: any)
```




### performOnCanFoundCity
```
function discreteEvents.performOnCanFoundCity(unit: any)
  -> unknown
```




### performOnCentauriArrival
```
function discreteEvents.performOnCentauriArrival(tribe: any)
```




### performOnChooseSeason
```
function discreteEvents.performOnChooseSeason()
```




### performOnCityDestroyed
```
function discreteEvents.performOnCityDestroyed(city: any)
```




### performOnCityFounded
```
function discreteEvents.performOnCityFounded(city: any)
  -> function
```




### performOnCityProcessed
```
function discreteEvents.performOnCityProcessed(city: any)
```




### performOnCityProcessingComplete
```
function discreteEvents.performOnCityProcessingComplete(turn: any, tribe: any)
```




### performOnCityProduction
```
function discreteEvents.performOnCityProduction(city: any, item: any)
```




### performOnCityTaken
```
function discreteEvents.performOnCityTaken(city: any, defender: any)
```




### performOnCityWindowOpened
```
function discreteEvents.performOnCityWindowOpened(city: any)
```




### performOnEnterTile
```
function discreteEvents.performOnEnterTile(unit: any, previousTile: any, previousDomainSpec: any)
  -> unknown
```




### performOnEnterTilePriority
```
function discreteEvents.performOnEnterTilePriority(unit: any, previousTile: any, previousDomainSpec: any)
  -> unknown
```




### performOnFinalOrderGiven
```
function discreteEvents.performOnFinalOrderGiven(unit: any)
```




### performOnGameEnds
```
function discreteEvents.performOnGameEnds(reason: any)
  -> unknown
```




### performOnJustAfterCityProcessed
```
function discreteEvents.performOnJustAfterCityProcessed(city: any)
```




### performOnJustBeforeCityProcessed
```
function discreteEvents.performOnJustBeforeCityProcessed(city: any)
```




### performOnKeyPress
```
function discreteEvents.performOnKeyPress(keyId: any)
```




### performOnNegotiation
```
function discreteEvents.performOnNegotiation(talker: any, listener: any)
  -> unknown
```




### performOnSave
```
function discreteEvents.performOnSave()
```




### performOnScenarioLoaded
```
function discreteEvents.performOnScenarioLoaded()
```




### performOnSchism
```
function discreteEvents.performOnSchism(tribe: any)
  -> unknown
```




### performOnTribeTurnBegin
```
function discreteEvents.performOnTribeTurnBegin(turn: any, tribe: any)
```




### performOnTribeTurnEnd
```
function discreteEvents.performOnTribeTurnEnd(turn: any, tribe: any)
```




### performOnTurn
```
function discreteEvents.performOnTurn(turn: any)
```




### performOnUnitDefeated
```
function discreteEvents.performOnUnitDefeated(loser: any, winner: any, aggressor: any, victim: any, loserLocation: any, winnerVetStatus: any, loserVetStatus: any)
```




### performOnUnitDeleted
```
function discreteEvents.performOnUnitDeleted(deletedUnit: any, replacingUnit: any)
```




### performOnUnitKilled
```
function discreteEvents.performOnUnitKilled(loser: any, winner: any, aggressor: any, victim: any, loserLocation: any, winnerVetStatus: any, loserVetStatus: any)
```




### recommendedVersion
```
discreteEvents.recommendedVersion --> function
```






