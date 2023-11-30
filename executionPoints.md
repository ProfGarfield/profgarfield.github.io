---
tabTitle: Execution Points for Code
layout: page
title: Lua Execution Points
navTitle: Execution Points
minTOC: 2
maxTOC: 3
---

Lua Events function by running code at certain predetermined points during the Civilization II: Test of Time game.  The term "Execution Point"
refers to one of these points where code that has been registered is executed.  Everything that can be achieved with Lua 
must be done through these execution points.  Sometimes, complicated events will use more than one of these execution
points to achieve their effect.

In some cases, the execution point expects code which will return a value that influences how the game works.

The Test of Time Patch Project provides many execution points.  However, in order to improve programming convenience, the Lua Scenario Template
provides even more execution points by running the pre-existing execution points only at certain times.

### **Unit Activation**
This code is executed whenever a unit is activated or has moved but still has movement points left.
In `LuaParameterFilesparameters.lua`, the field `civ.scen.compatibility.activateUnitEveryMove` is
set to true.  If this is not done (or in old versions of the Test of Time Patch Project), human
units don't execute the registered activation code after moving.

This event can optionally return `true` or a function.  In either case, the activation of the unit is cancelled.  The movement allowance of the unit's type will
temporarily be set to 0, and all further code for this event will be cancelled.

If the event returns a function, that function will be called just before the next unit
is activated.  (You may wish to put the unit to sleep, for example.)

Failure to return a value here is equivalent to returning nil, which will make 
the activation code execute as normal.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- Unit Activation
--Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. `source` is `true` if activated by keyboard or mouse click, `false` if activated by the game itself. `repeatMove` is `true` if it's a repeat activation caused by moving, `false` otherwise.
--If the function returns true, the unit activation will be cancelled.
--No further activation code will be executed, and the unit's type
--will temporarily be set to have 0 movement points.
--If the function returns function(unit), then the unit activation
--will be cancelled, and the function returned will be executed
--just before another unit is activated.  (You may wish to put
--the unit to sleep, for example.)
--Not returning anything is equivalent to returning nil, which is
--acceptable, and keeps the unit activation going.
function events.onActivateUnit(unit,source,repeatMove)
    --civ.ui.text("Unit activation consolidated test")

end

```

The `unit` parameter is the unit that has been activated.

The `source` parameter is `true` if the unit was activated by keyboard or mouse, and
`false` if it was activated by the game itself.

The `repeatMove` parameter is `true` if the execution point is triggered by a repeated activation.


##### **EventsFiles\onActivateUnit.lua**
Change this function: 
```lua
--Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. `source` is `true` if activated by keyboard or mouse click, `false` if activated by the game itself. `repeatMove` is `true` if it's a repeat activation caused by moving, `false` otherwise.
--If the function returns true, the unit activation will be cancelled.
--No further activation code will be executed, and the unit's type
--will temporarily be set to have 0 movement points.
--If the function returns function(unit), then the unit activation
--will be cancelled, and the function returned will be executed
--just before another unit is activated.  (You may wish to put
--the unit to sleep, for example.)
--Not returning anything is equivalent to returning nil, which is
--acceptable, and keeps the unit activation going.
function register.onActivateUnit(unit,source,repeatMove)
    --civ.ui.text("unit activation separate file")

end

```

The `unit` parameter is the unit that has been activated.

The `source` parameter is `true` if the unit was activated by keyboard or mouse, and
`false` if it was activated by the game itself.

The `repeatMove` parameter is `true` if the execution point is triggered by a repeated activation.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Unit Activation event within `discreteEvents.lua`:
```lua
--Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. `source` is `true` if activated by keyboard or mouse click, `false` if activated by the game itself. `repeatMove` is `true` if it's a repeat activation caused by moving, `false` otherwise.
--If the function returns true, the unit activation will be cancelled.
--No further activation code will be executed, and the unit's type
--will temporarily be set to have 0 movement points.
--If the function returns function(unit), then the unit activation
--will be cancelled, and the function returned will be executed
--just before another unit is activated.  (You may wish to put
--the unit to sleep, for example.)
--Not returning anything is equivalent to returning nil, which is
--acceptable, and keeps the unit activation going.
discreteEvents.onActivateUnit(function(unit,source,repeatMove)
    if _global.eventTesting then
        civ.ui.text("Unit activation Discrete Event")
    end
end)

```

The `unit` parameter is the unit that has been activated.

The `source` parameter is `true` if the unit was activated by keyboard or mouse, and
`false` if it was activated by the game itself.

The `repeatMove` parameter is `true` if the execution point is triggered by a repeated activation.

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onActivateUnit`.


### **Unit Bribery**
Code will be executed whenever a unit is bribed.
#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On Unit Bribery
function events.onBribeUnit(unit,previousOwner)
    --civ.ui.text("Bribe unit consolidated test")

end

```
 The `unit` is the unit that was just bribed.

The `previous owner` is the tribe that owned the unit before.

##### **EventsFiles\onBribeUnit.lua**
Change this function: 
```lua
function register.onBribeUnit(unit,previousOwner)
    --civ.ui.text("On bribe unit separate file")
end

```
 The `unit` is the unit that was just bribed.

The `previous owner` is the tribe that owned the unit before.

##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Unit Bribery event within `discreteEvents.lua`:
```lua
discreteEvents.onBribeUnit(function(unit,previousOwner)
    if _global.eventTesting then
        civ.ui.text("Bribe unit discrete event test")
    end
end)

```
 The `unit` is the unit that was just bribed.

The `previous owner` is the tribe that owned the unit before.
#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onBribeUnit`.


### **City Yield Calculation**

Allows code to be executed whenever a city computes its production.  This can happen both at the start of the turn, and when the human player opens the city screen.  It can also happen when a player changes the tax rate.

Additionally, the returned values of the registered function
can be used to modify the city's production.

This execution point registers a function to be called every time a city calculates its total resource yield. The function inputs are the city, and the food, shields and trade of its tiles. Returns a 5-tuple of modifiers, food change, shield change before waste, shield change after waste, trade change before corruption, trade change after corruption. These modifiers are applied at the following points in the calculation:

1. Calculate yield from all worked tiles
2. **Run onCalculateCityYield**
3. **Add foodChange, shieldChangeBeforeWaste and tradeChangeBeforeCorruption**
4. Add changes from food trade routes
5. Add shields from improvements
6. Calculate and subtract waste
6. Calculate corruption and add changes from commodity trade routes
6. Calculate corruption again (now using the value after trade routes) and subtract.
6. **Add shieldChangeAfterWaste and tradeChangeAfterCorruption**
6. Calculate Tax/Lux/Sci

#### Usage
##### **MechanicsFiles\calculateCityYield.lua**
In the `MechanicsFiles` folder, change the file called `calculateCityYield.lua`.  Change the function `cityYield.onCalculateCityYield` in order to change this event.

```lua
function cityYield.onCalculateCityYield(city,food,shields,trade)
    local extraFood,extraShields,extraTrade = 0,0,0 -- resources to add to compensate
            -- for terrain changes made during the city yield calculation
            -- If you remove the above line, remember to remove the references to
            -- these variables in the return line at the end of this function
    -- If you are not making any terrain production value changes in this
    -- function, you can take out the code below this line and above a
    -- corresponding line below
    -- Any changes to terrain production should go here
    
    -- verify strategic targets, in case terrain changes or something
    if strategicTargetsAvailable then
        for target in strat.iterateTargets(city) do
            strat.verifyTarget(target)
        end
    end
    


    -- Any changes to terrain production should be before this line
    local correctFood,correctShields,correctTrade = baseProduction(city,true)
    extraFood = correctFood-food
    food = correctFood
    extraShields = correctShields - shields
    shields = correctShields
    extraTrade = correctTrade - trade
    trade = correctTrade
    -- If you are not making any terrain production value change in this
    -- function, you can take out the code above this line and below
    -- the corresponding line above
    -- You can take out the lines even if you have a beforeProduction event
    -- that changes terrain production, since that has been compensated for
    -- in the events.lua file


    -- After this point, the variables food, shields, and trade will refer to their
    -- 'correct' values, even if you've changed terrain production values

    -- change the values of these variables to reflect the changes you would like to
    -- make to these different production values
    local foodChange = 0
    local shieldChangeBeforeWaste = 0 -- changes the value before factory/power plant applied
    local shieldChangeAfterWaste = 0 -- changes the value after factory/power plant applied
    local tradeChangeBeforeCorruption = 0 
    local tradeChangeAfterCorruption = 0 

    return  foodChange+extraFood,
            shieldChangeBeforeWaste + extraShields,
            shieldChangeAfterWaste,
            tradeChangeBeforeCorruption+ extraTrade,
            tradeChangeAfterCorruption
end

```

If you desire to make changes to terrain production, you should do so between the lines 
```-- Any changes to terrain production should go here```
and
```-- Any changes to terrain production should be before this line```.

This is because the `food`, `shield`, and `trade` arguments are computed before any changes are made to terrain production, and so these variables must be updated, which is done by the time the code reaches the lines

```lua
-- After this point, the variables food, shields, and trade will refer to their
-- 'correct' values, even if you've changed terrain production values
```

You may wish to consider using the Custom Cosmic module if you are interested in making changes to terrain production.

If you are interested in making changes to food, shield, or trade production which does not depend on special changes to terrain productivity, you can do so by changing the values of the variables `foodChange`, `shieldChangeBeforeWaste`, `shieldChangeAfterWaste`, `tradeChangeBeforeCorruption`, and `tradeChangeAfterCorruption`.

Note that there are two different shield changes.  The first one is applied before the factory, power plant, and waste modifications are computed, and the second one is applied after.  The same is true for the trade changes, except that the first one is applied before the corruption is applied, and the second one is applied after the corruption is applied.

The `city` parameter is the city whose production is being calculated.

The `food` parameter is the amount of food the city is producing.  This is updated part way through the function, to account for any changes to terrain production.

The `shields` parameter is the amount of shields the city is producing.  This is updated part way through the function, to account for any changes to terrain production.

The `trade` parameter is the amount of trade the city is producing.  This is updated part way through the function, to account for any changes to terrain production.



#### Implementation


#### Implementation

This execution point is implemented using the function `civ.scen.onCalculateCityYield`.


### **Centauri Arrival**
Executes code when a tribe's spaceship reaches its target.
#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On Centauri Arrival
-- This is available with games started as an extended original game,
-- but not with games started as a standard game (I think, this hasn't been looked at too closely)
function events.onCentauriArrival(tribe)
    --civ.ui.text(tribe.name.." has reached Alpha Centauri.")

end

```
The `tribe` is the tribe whose spaceship has reached its destination.

##### **EventsFiles\onCentauriArrival.lua**
Change this function: 
```lua
function register.onCentauriArrival(tribe)
    --civ.ui.text("centauri arrival separate file")

end

```
The `tribe` is the tribe whose spaceship has reached its destination.

##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Centauri Arrival event within `discreteEvents.lua`:
```lua
discreteEvents.onCentauriArrival(function(tribe)
    --civ.ui.text(tribe.name.." arrived at centauri discrete event")
end)

```
The `tribe` is the tribe whose spaceship has reached its destination.
#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onCentauriArrival`.


### **City Destruction**
Executes code when a city is destroyed.
#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- City destruction
function events.onCityDestroyed(city)
    --civ.ui.text("City destroyed consolidated test")

end

```
The `city` it the city that was just destroyed.

##### **EventsFiles\onCityDestroyed.lua**
Change this function: 
```lua
-- This function will be registered for the onCityDestroyed
-- execution point
function register.onCityDestroyed(city)
    --civ.ui.text("on city destroyed separate file")
end

```
The `city` it the city that was just destroyed.

##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete City Destruction event within `discreteEvents.lua`:
```lua
discreteEvents.onCityDestroyed(function(city) 
    if _global.eventTesting then
        civ.ui.text("City destroyed discrete event test")
    end
end)

```
The `city` it the city that was just destroyed.
#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onCityDestroyed`.


### **City Founded**

Executes code when a city is founded, just before the "What Shall We
 Name This City" dialog box.  You can change the suggested name for the city
at this time by changing the [`city.name`](auto_doc/cityObject.html#name) field.

You can (optionally) return a function to be called if the city is
not built after all (if the city is cancelled during the naming
process).  For example, if you change the terrain under or around the city
when it is founded, you can change it back here.  If you write city founded code in more than one place
(such as multiple discrete events, or using both the Events Files and
consolidated events), all returned functions are executed.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On City Founded
function events.onCityFounded(city)
    if _global.eventTesting then
        civ.ui.text("consolidated.onCityFounded for "..city.name)
    end
    -- the cityCancelled() function is executed if the player
    -- decides not to found the city after all
    -- (so you can undo terrain changes, etc.
    local function cityCancelled()
        if _global.eventTesting then
            civ.ui.text("consolidated.onCityFounded city cancelled for "..city.name)
        end
    end
    return cityCancelled
end

```
The `city` is the city that is being founded.

##### **EventsFiles\onCityFounded.lua**
Change this function: 
```lua
function register.onCityFounded(city)
    if _global.eventTesting then
        civ.ui.text("separate file onCityFounded for "..city.name)
    end
    -- the cityCancelled() function is executed if the player
    -- decides not to found the city after all
    -- (so you can undo terrain changes, etc.
    local function cityCancelled()
        if _global.eventTesting then
            civ.ui.text("separate file onCityFounded city cancelled for "..city.name)
        end
    end
    return cityCancelled
end

```
The `city` is the city that is being founded.

##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete City Founded event within `discreteEvents.lua`:
```lua
discreteEvents.onCityFounded(function(city) 
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onCityFounded for "..city.name)
    end
    -- the cityCancelled() function is executed if the player
    -- decides not to found the city after all
    -- (so you can undo terrain changes, etc.
    local function cityCancelled()
        if _global.eventTesting then
            civ.ui.text("discreteEvents.onCityFounded city cancelled for "..city.name)
        end
    end
    return cityCancelled
end)

```
The `city` is the city that is being founded.
#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onCityFounded`.


### **City Production**
Executes code when a city completes production of something.
#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On city production (when a city produces a unit/improvement/wonder)
function events.onCityProduction(city,prod)
    --civ.ui.text(city.name.." has procuded something.")

end

```

The `city` is the city which just completed production.

The `prod` is the item that was produced.  If a unit was produced,
it is a unit Object (not a unitType object).  If an improvement or
wonder was completed, `prod` is the corresponding improvement object
 or wonder object.


##### **EventsFiles\onCityProduction.lua**
Change this function: 
```lua
function onCityProduction.onCityProduction(city,prod)
    --civ.ui.text("City production separate file")


end

```

The `city` is the city which just completed production.

The `prod` is the item that was produced.  If a unit was produced,
it is a unit Object (not a unitType object).  If an improvement or
wonder was completed, `prod` is the corresponding improvement object
 or wonder object.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete City Production event within `discreteEvents.lua`:
```lua
discreteEvents.onCityProduction(function(city,item) 
    --civ.ui.text("City production discrete event test")

end)

```

The `city` is the city which just completed production.

The `prod` is the item that was produced.  If a unit was produced,
it is a unit Object (not a unitType object).  If an improvement or
wonder was completed, `prod` is the corresponding improvement object
 or wonder object.

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onCityProduction`.


### **City Captured**

This execution point is triggered when a city is captured by another tribe.  The execution point takes place after the city has been captured, but before the units supported by the city are disbanded.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On City Taken
-- (get conqueror by using city.owner)
function events.onCityTaken(city,defender)
    --civ.ui.text(city.name.." captured from the "..defender.name.." by the "..city.owner.name..". Consolidated Events.")

end

```

The `city` is the city that was captured.

The `defender` is the tribe that owned the city before it was captured.  To get the tribe that captured the city, use `city.owner`.


##### **EventsFiles\onCityTaken.lua**
Change this function: 
```lua
function register.onCityTaken(city,defender)
    --civ.ui.text("city taken separate file test")

end

```

The `city` is the city that was captured.

The `defender` is the tribe that owned the city before it was captured.  To get the tribe that captured the city, use `city.owner`.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete City Captured event within `discreteEvents.lua`:
```lua
discreteEvents.onCityTaken(function(city,defender) 
    --civ.ui.text(city.name.." taken from "..defender.name.." discrete event")


end)

```

The `city` is the city that was captured.

The `defender` is the tribe that owned the city before it was captured.  To get the tribe that captured the city, use `city.owner`.

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onCityTaken`.


### **City Window Opened**

This execution point is triggered when a city window is opened.  Note that the AI does not open city windows.

#### Usage
##### **EventsFiles\onCityWindowOpened.lua**
Change this function: 
```lua
---Add any events to happen when a city window is opened.
---(Note that the AI doesn't open city windows.)
---@param city cityObject The city that is being examined.
function register.onCityWindowOpened(city)
    if _global.eventTesting then
        civ.ui.text("eventsFiles\\onCityWindowOpened.lua: onCityWindowOpened called with city: "..city.name)
    end
end

```
The `city` is the city whose window is being opened.

##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete City Window Opened event within `discreteEvents.lua`:
```lua
-- Executes when a city window is opened.
-- Note that the AI doesn't open city windows.
discreteEvents.onCityWindowOpened(function(city)
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onCityWindowOpened: The city window for "..city.name.." has been opened.")
    end
end)

```
The `city` is the city whose window is being opened.
#### Implementation


This execution point is implemented using the TOTPP function `civ.scen.onGetFormattedDate` and checking if there is currently a city window open by using `civ.getOpenCity`.  The most recently opened city is kept track of, to make sure that the execution point is only triggered once per city window, particularly so that a window hidden behind the map doesn't continuously trigger the execution point.  Closing and opening the same city window will trigger the execution point again.


### **Game End**

This execution point is triggered when the game ends.  If the registered function returns true, then the game actually ends (default behavior).  If the registered function returns false, then the game does not end.  Since there are multiple ways to register a function for this execution point, if any of the registered functions returns false, then the game does not end.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On Game Ends
-- Return true if the game ends as normal,
-- and false otherwise.
-- This is combined with the discrete events and the
-- legacy events, as well as a separate onGameEnds.lua file
-- If any of these return false, then game end is prevented
-- Lua Function Reference Info:
--onGameEnds
--civ.scen.onGameEnds(function (reason) -> boolean) -> void
--
--Registers a function that is called when the game ends. `reason` is an integer between 1 and 6:
--1 and 2 - Space race victory. This does not trigger if `onCentauriArrival` has a callback registered.
--3 - Conquest victory
--4 - Defeat
--5 - Retirement
--6 - Macro ENDGAME action
--Return `true` to end the game, `false` to keep playing.
--
function events.onGameEnds(reason)

    return true
end

```

The `reason` is an integer with 6 possible values:
1. Space race victory achieved by the active player.  (Can't happen if `civ.scen.onCentauriArrival` is registered.)
2. Space race victory achieved by another player.  (Can't happen if `civ.scen.onCentauriArrival` is registered.)
3. Conquest Victory
4. Defeat
5. Retirement
6. [civ.endGame](auto_doc/civ.html#endGame) was called.  (Or the Macro Language equivalent.)


##### **EventsFiles\onGameEnds.lua**
Change this function: 
```lua
-- discreteEvents.onGameEnds and
-- consolidated.onGameEnds
-- also return booleans.  True means that the 
-- game ends as normal, which is the default behaviour.
-- If any of the registered functions return false, then
-- the game doesn't end
function register.onGameEnds(reason)

    return true
end

```

The `reason` is an integer with 6 possible values:
1. Space race victory achieved by the active player.  (Can't happen if `civ.scen.onCentauriArrival` is registered.)
2. Space race victory achieved by another player.  (Can't happen if `civ.scen.onCentauriArrival` is registered.)
3. Conquest Victory
4. Defeat
5. Retirement
6. [civ.endGame](auto_doc/civ.html#endGame) was called.  (Or the Macro Language equivalent.)


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Game End event within `discreteEvents.lua`:
```lua
-- On Game Ends
-- Return true if the game ends as normal,
-- and false otherwise.
-- This is combined with the consolidated events and the
-- legacy events, as well as a separate onGameEnds.lua file
-- If any of these return false, then game end is prevented
-- Not documented or experimented with much
-- based on legacy event engine code, reason is an integer
discreteEvents.onGameEnds(function(reason)
    -- return false to stop the game from ending
    return true
end)

```

The `reason` is an integer with 6 possible values:
1. Space race victory achieved by the active player.  (Can't happen if `civ.scen.onCentauriArrival` is registered.)
2. Space race victory achieved by another player.  (Can't happen if `civ.scen.onCentauriArrival` is registered.)
3. Conquest Victory
4. Defeat
5. Retirement
6. [civ.endGame](auto_doc/civ.html#endGame) was called.  (Or the Macro Language equivalent.)

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onGameEnds`.


### **Combat Declared**
When combat is initiated, the function registered for this execution point is called, and returns an iterator (coroutine) which is called for every round of
combat.  Combat will end when the iterator stops returning values (or returns `nil`).

The scenario designer can either handle all the effects of combat manually for
a round of combat by telling the iterator to yield true, and the unit over which
the combat 'explosion' should be animated.  Alternatively, the coroutine can
return false, along with that round's combat statistics, and the game's combat
system will "roll the dice" and determine who should be damaged and where
the combat explosion should be animated.

#### Usage
##### **MechanicsFiles/combatSettings.lua**
In the `MechanicsFiles` folder, change the file called `combatSettings.lua`.  Change the function `register.onInitiateCombatMakeCoroutine` in order to change this event.

```lua
function register.onInitiateCombatMakeCoroutine(attacker,defender,attackerDie,attackerPower,defenderDie,defenderPower,isSneakAttack)

    leaderBonus.updateCommander(attacker)
    leaderBonus.updateCommander(defender)
    local maxCombatRounds = math.huge -- If you want to limit combat to a specific number of
                                        -- turns, set this variable

    local calculatedAttackerStrength, 
            calculatedAttackerFirepower,
            calculatedDefenderStrength, 
            calculatedDefenderFirepower = computeCombatStatistics(attacker,defender,isSneakAttack)
    --if calculatedAttackerStrength ~= attackerDie then
    --    civ.ui.text("Attacker: calculated: "..calculatedAttackerStrength.." actual: "..attackerDie)
    --end
    --if calculatedDefenderStrength ~= defenderDie then
    --    civ.ui.text("Defender: calculated: "..calculatedDefenderStrength.." actual: "..defenderDie)
    --end
    --if calculatedAttackerFirepower ~= attackerPower then
    --    civ.ui.text("AttackerFP: calculated: "..calculatedAttackerFirepower.." actual: "..attackerPower)
    --end
    --if calculatedDefenderFirepower ~= defenderPower then
    --    civ.ui.text("DefenderFP: calculated: "..calculatedDefenderFirepower.." actual: "..defenderPower)
    --end
    if calculatedAttackerStrength == 0 then
        maxCombatRounds = 0
        if attacker.owner.isHuman then
            text.simple("Our "..attacker.type.name.." unit can't fight the defending "..defender.type.name..".  The attack has been cancelled.","Defense Minister")
        end
    end
    -- %Report Combat Strength%
    --civ.ui.text("Attacker: "..tostring(calculatedAttackerStrength/8).." FP:"..calculatedAttackerFirepower.." Defender: "..tostring(calculatedDefenderStrength/8).." FP:"..calculatedDefenderFirepower)
            
    return coroutine.create(function()
        local round = 0
        while(round < maxCombatRounds and attacker.hitpoints >0 and defender.hitpoints > 0) do

            if false then
                -- If the coroutine yields true as its first value, 
                -- the game's default combat resolution is skipped for that round 
                -- and the designer is responsible for updating damage. 
                -- The second value yielded is either the attacker or the defender, 
                -- this is used to render animations etc. 
                -- In this case the coroutine resumes without any values.

                coroutine.yield(true,defender)
            else

                --If the coroutine yields false as its first value, 
                --the game runs its default combat algorithm. The designer 
                --can additionally yield modified values for attackerDie, 
                --attackerPower, defenderDie and defenderPower (in this order) 
                --which will be used by the game for that round.

                local newAttackerDie = calculatedAttackerStrength
                local newAttackerFirepower = calculatedAttackerFirepower
                local newDefenderDie = calculatedDefenderStrength
                local newDefenderFirepower = calculatedDefenderFirepower
                local result = coroutine.yield(false,newAttackerDie,newAttackerFirepower,newDefenderDie,newDefenderFirepower)

                --In this case the coroutine resumes with the result of the round, 
                --a table containing four values:
                    -- winner, this is either attacker or defender.
                    -- attackerRoll, the result of the attacker's die roll
                    -- defenderRoll, the result of the defender's die roll
                    -- reroll, true if a reroll happened. This can happen only 
                         -- if the attacker is tribe 0, the defender is a unit 
                         -- guarding a city, and the city is the capital or 
                         -- the tribe has less than 8 cities in total and 
                         -- the attacker's die roll is higher than the 
                         -- defender's. A reroll can happen at most once.


            end
            round = round+1
        end
        -- once we get here, combat stops
    end)
end

```

The `attacker` is the unit which is attacking.

The `defender` is the unit which is being attacked.

The `attackerDie` is the the game's standard calculation for the attack value of the attacker.

The `attackerPower` is the attackers firepower, as determined by the game's standard calculations.

The `defenderDie` is the the game's standard calculation for the defense value of the defender.

The `defenderPower` is the defenders firepower, as determined by the game's standard calculations.

The `isSneakAttack` parameter is true if a "sneak attack" is in progress. That is, If the attacker is conducting a sneak attack (i.e., breaking a Cease Fire or Peace Treaty) and the defender belongs to a tribe controlled by a human player, the attacker receives a x2 adjustment (bonus).

A round of combat can be thought of as the attacker rolling an attackerDie-sided die, and the defender rolling a defenderDie-sided die.  The attacker's roll is compared to the defender's roll, and the higher number wins
that round of combat (if the rolls are equal, the defender wins).  The loser 

This function and the iterator returned can be heavily modified depending on how the scenario designer wants combat to happen.  What follows describes 
are notes on the default behaviour.

```lua
    leaderBonus.updateCommander(attacker)
    leaderBonus.updateCommander(defender)
```
Here, the Leader Bonus Module confirms that the units have the correct leader.  (If you're not using the Leader Bonus Module, then this doesn't matter.)

```lua
    local maxCombatRounds = math.huge -- If you want to limit combat to a specific number of
                                        -- turns, set this variable
```

This variable is used to limit the number of rounds of combat.  If you want to limit combat to a specific number of turns, set this variable.  Otherwise, it will be set to infinity (in which case, hp reduction will end combat).

```lua
    local calculatedAttackerStrength, 
            calculatedAttackerFirepower,
            calculatedDefenderStrength, 
            calculatedDefenderFirepower = computeCombatStatistics(attacker,defender,isSneakAttack)
```

Instead of relying on the game's standard calculations of combat strength,
this code uses the function `computeCombatStatistics` (found earlier in the same file) to calculate the
statistics.  By default, this function takes account of combat changes
defined in other modules (such as the Combat Modifiers Module) and
combines them with [Knighttime's combat calculation code](https://forums.civfanatics.com/threads/civilization-ii-combat-guide-v2-0-updates.673992/).


```lua
    if calculatedAttackerStrength == 0 then
        maxCombatRounds = 0
        if attacker.owner.isHuman then
            text.simple("Our "..attacker.type.name.." unit can't fight the defending "..defender.type.name..".  The attack has been cancelled.","Defense Minister")
        end
    end
```

In the standard Civilization II game, units with 0 attack are unable to initiate combat.  However, it may be that the `computeCombatStatistics`
gives a unit 0 attack, even though the unit type normally can make attacks (for example, if a unit is ineffective against a particular defender).  In this case, the code sets the maximum number of combat rounds to 0, thereby stopping the attack, and displays a message to the human player.

```lua
    -- %Report Combat Strength%
    --civ.ui.text("Attacker: "..tostring(calculatedAttackerStrength/8).." FP:"..calculatedAttackerFirepower.." Defender: "..tostring(calculatedDefenderStrength/8).." FP:"..calculatedDefenderFirepower)
```

Comment out this line if you don't want a text box to display the combat statistics.  Having this active during development is likely to be useful,
but you will probably want to do something fancier if you intend to display
combat statistics in your final release.

```lua
        while(round < maxCombatRounds and attacker.hitpoints >0 and defender.hitpoints > 0) do
```

This is the main loop of the combat.  Combat will continue until the maximum number of combat rounds is reached, or until one of the units is killed.

```lua
    if false then
        -- If the coroutine yields true as its first value, 
        -- the game's default combat resolution is skipped for that round 
        -- and the designer is responsible for updating damage. 
        -- The second value yielded is either the attacker or the defender, 
        -- this is used to render animations etc. 
        -- In this case the coroutine resumes without any values.

        coroutine.yield(true,defender)
```

By default, the combat iterator won't return true.  If the coroutine yields true as its first value, the game's default combat resolution is skipped for that round and the designer is responsible for updating damage.  The second value yielded is either the attacker or the defender, this is used to render animations etc.  In this case the coroutine resumes without any values.

```lua
    --If the coroutine yields false as its first value, 
    --the game runs its default combat algorithm. The designer 
    --can additionally yield modified values for attackerDie, 
    --attackerPower, defenderDie and defenderPower (in this order) 
    --which will be used by the game for that round.

    local newAttackerDie = calculatedAttackerStrength
    local newAttackerFirepower = calculatedAttackerFirepower
    local newDefenderDie = calculatedDefenderStrength
    local newDefenderFirepower = calculatedDefenderFirepower
    local result = coroutine.yield(false,newAttackerDie,newAttackerFirepower,newDefenderDie,newDefenderFirepower)

    --In this case the coroutine resumes with the result of the round, 
    --a table containing four values:
        -- winner, this is either attacker or defender.
        -- attackerRoll, the result of the attacker's die roll
        -- defenderRoll, the result of the defender's die roll
        -- reroll, true if a reroll happened. This can happen only 
             -- if the attacker is tribe 0, the defender is a unit 
             -- guarding a city, and the city is the capital or 
             -- the tribe has less than 8 cities in total and 
             -- the attacker's die roll is higher than the 
             -- defender's. A reroll can happen at most once.
```

By default, the combat iterator will yield false as its first value.  The game
will run standard combat calculations based on the values assigned to
`newAttackerDie`, `newAttackerFirepower`, `newDefenderDie` and `newDefenderFirepower`.  Change these from their calculated values if
you want to change combat effectiveness based on events that happen during combat.

The `result` variable will contain the result of the round, a table containing four values assigned to the keys `winner`, `attackerRoll`, `defenderRoll` and `reroll`.  `winner` will be either `attacker` or `defender`.  `attackerRoll` and `defenderRoll` will be the results of the die rolls.  `reroll` will be `true` if a reroll happened. This can happen only if the attacker is tribe 0, the defender is a unit guarding a city, and the city is the capital or the tribe has less than 8 cities in total and the attacker's die roll is higher than the defender's. A reroll can happen at most once.


#### Implementation


This execution point is implemented using the TOTPP function `civ.scen.onInitiateCombat`.

### **Key Press**

The Key Press execution point is triggered every time a key is pressed.  A code for the key that
was pressed is passed to the registered function.  The [keyboard module](auto_doc/keyboard.html) provides a table of codes with human readable index values.

Many key press events are registered in the file `MechanicsFiles\keyPressSettings.lua`.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On key press
function events.onKeyPress(keyCode)
    --if keyCode == keyboard.backspace then
    --    civ.ui.text("backspace pressed")
    --end

end

```

The `keyCode` parameter is an integer corresponding to a keyboard key.

##### **EventsFiles\onKeyPress.lua**
Change this function: 
```lua
function register.onKeyPress(keyCode)
    --civ.ui.text("key press test separate file")
end

```

The `keyCode` parameter is an integer corresponding to a keyboard key.

##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Key Press event within `discreteEvents.lua`:
```lua
-- The keyCode is an integer that corresponds to a particular key on the keyboard.
-- The keyboard module provides names for these codes.
discreteEvents.onKeyPress(function(keyCode)
    if _global.eventTesting and keyboard.backspace == keyCode then
        civ.ui.text("discreteEvents.onKeyPress: The backspace key has been pressed.")
    end
end)

```

The `keyCode` parameter is an integer corresponding to a keyboard key.
#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onKeyPress`.


### **Game Loaded**

The Game Loaded execution point is triggered when a game is loaded from a saved game file.  This happens after the `events.lua` file is executed, and before the Scenario Loaded execution point is triggered.  The main purpose of this execution point is to read data which has been added to the saved game file by the Game Saved execution point, and convert it back to a table (known as the "state table", so that Lua events can have custom data saved between sessions.
#### Usage
##### **events.lua**

The Game Loaded execution point is not meant to be used by scenario designers.  The Scenario Loaded execution point is preferred.  That is why it is only accessible through the `events.lua` file.  However, if you need to change it for some reason, you should change ths
code within that file:
```lua
local function doOnLoad(buffer)-->void
    -- if buffer is compressed, it is decompressed, otherwise the
    -- buffer itself is used
    state = civlua.unserialize(lualzw.decompress(buffer) or buffer)
    local stateTableKeys = {}
    discreteEvents.performLinkStateToModules(state,stateTableKeys)
    --linkStateTableToModules()
    print("Enter console.commands() to see a list of keys in the console table.  Some give access to functions in modules, others will run event code.")
end

```

The `buffer` is a string, which will be converted back into the state
table using `civlua.unserialize`.  This template uses the lualzw module
to compress the data, so it is decompressed here as well.  (If the data isn't
compressed, `lualzw.decompress` returns `nil`, so the raw string is used instead.)

##### **Discrete Events**

The Discrete Events module allows access to the Game Loaded execution point.  This
is so that scenario modules can save data between sessions, by linking to the
state table.  The state table is a table which is saved to the saved game file.

Here is an example of how to use `discreteEvents.linkStateToModules` to provide access to the state table within a module.  This code is from the `LuaCore
avy.lua` file:

```lua
local discreteEvents = require("discreteEventsRegistrar"):minVersion(1)
```

This module needs to keep track of whether a ship can unload, because there are
circumstances where a unit has the ability to unload for the rest of the turn,
even though the function determining if the unit can unload would no longer 
return true.  Since we want this to persist between saving and loading, we
must use the state table.

```lua
local canUnload = "state not linked"
-- canUnload[unit.id] = tileID or nil
-- a unit in this table can unload itself or carried units even
-- if it otherwise wouldn't be able to, as long
-- as it is still on the tile specified
```

Here, the variable `canUnload` is defined.  At the moment, it is a string,
but during the Game Loaded execution point, the variable's value will be
changed to one of the tables in the state table.  So, any functions
in this module can treat this variable as a table, as long as they are not
called until after the Game Loaded execution point has passed.

We need to write a "link state" function to associate the variable with the
an appropriate table in the state table.

```lua
function navy.linkState(canUnloadTableFromState)
    if type(canUnloadTableFromState) == "table" then
        canUnload = canUnloadTableFromState
    else
        error("navy.linkState: table expected as argument.  Received: "..tostring(canUnloadTableFromState))
    end
end
```

When called, this function assigns the `canUnloadTableFromState` as the value
for the canUnload variable.  An error is generated if it isn't an actual table.

Next, we register an event using `discreteEvents.linkStateToModules`:

```lua
discreteEvents.linkStateToModules( function(state,stateTableKeys)
    local keyName = "navyModuleState"
    if stateTableKeys[keyName] then
        error('"'..keyName..'" is used as a key for the state table on at least two occasions.')
    else
        stateTableKeys[keyName] = true
    end
    -- link the state table to the module
    state[keyName] = state[keyName] or {}
    navy.linkState(state[keyName])
end)
```

The `discreteEvents.linkStateToModules` event provides the entire state table as the first argument, and a table containing the names of all the keys in the state table as the second argument (in the form stateTableKeys[keyName] = true).

In this function, we decide that the table for this module will have the key
"navyModuleState" in the overall state table.  Next, we check to see if that
key is already in use.  If it is, we generate an error.  If it isn't, we add
it to the list of keys in use.

Next, we make sure that the table for this module exists in the state table.
If it doesn't, we create an empty table for it.  Finally, we call the `navy.linkState` function defined earlier, passing the table for this module as the argument.

#### Implementation


This execution point is implemented using the TOTPP function `civ.scen.onLoad`.
### **Game Saved**

The Game Saved execution point is triggered when a game is saved to a
file.  As part of this process, the state table is converted to a string
and saved to the file.    The Game Loaded execution point
converts the string back into a table, once the game is loaded.

Strictly speaking, any string could be saved to
the end of the file, but the Lua Scenario Template saves the state table and
I know of no scenarios where something other than
a string conversion of the state table is saved.

In the Lua Scenario Template, the saved string is compressed using the
lualzw module.  This is done to reduce the size of the saved game file.

#### Usage
##### **events.lua**

If you need to change the string that is saved to the file, you must
change this code within the `events.lua` file:

```lua
local function doOnSave() --> string
    discreteEvents.performOnSave()
    -- compress the text representation of the state table, so saved game files are smaller
    return lualzw.compress(civlua.serialize(state))
end

```

This will probably never be necessary, since you can simply add some
extra information as an entry in the state table.  Accessing this
execution point through using the Discrete Events module does not
let you change the string that is saved to the file.

##### **Discrete Events**

The Discrete Events module allows access to the Game Saved execution point 
by registering code using the function `discreteEvents.onSave`.  The
registered function receives no arguments.

```lua
local discreteEvents = require("discreteEventsRegistrar")
```

```lua
discreteEvents.onSave( function()
    -- code to execute when the game is saved
end)
```

#### Implementation

This execution point is implemented using the TOTPP function `civ.scen.onSave`.
### **Scenario Loaded**

The Scenario Loaded execution point is triggered when the game is loaded, but before anything else happens.  Despite its name, it is not triggered solely by starting a new scenario.  It is also triggered when a save file is loaded.

The Scenario Loaded execution point is triggered after the Game Loaded execution point.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On Scenario Loaded
function events.onScenarioLoaded()
    --civ.ui.text("Scenario Loaded consolidated event")

end

```


##### **EventsFiles\onScenarioLoaded.lua**
Change this function: 
```lua
function register.onScenarioLoaded()
    --civ.ui.text("on scenario loaded separate event file")

end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Scenario Loaded event within `discreteEvents.lua`:
```lua
discreteEvents.onScenarioLoaded(function() 
    --civ.ui.text("discrete event on scenario loaded")

end)

```

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onScenarioLoaded`.


### **Negotiation**

This execution point is triggered when a tribe (the `talker`) attempts
to negotiate with a different tribe (the `listener`).  If the registered
function returns `true`, the tribes can talk.  If `false`,
they can't (and won't appear in the foreign minister menu).

The Lua Scenario Template offers multiple ways to register functions
for this execution point.  If any of them return false, then negotiation
between the two parties is disabled.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On Negotiation 
-- Return true if the talker can contact the listener,
-- and false otherwise.
-- This is combined with the discrete events and the
-- legacy events, as well as a separate onNegotiation.lua file
-- If any of these return false, then negotiation is prevented
function events.onNegotiation(talker,listener)

    return true
end

```


##### **EventsFiles\onNegotiation.lua**
Change this function: 
```lua
-- discreteEvents.onNegotiation and
-- consolidated.onNegotiation
-- also return booleans.  True means that the talker
-- can begin negotiations with the listener.
-- If any of the events return false, negotiations are
-- prevented, even if other negotiation events return true
function register.onNegotiation(talker,listener)
    return true
end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Negotiation event within `discreteEvents.lua`:
```lua
-- On Negotiation 
-- Return true if the talker can contact the listener,
-- and false otherwise.
-- This is combined with the consolidated events and the
-- legacy events, as well as a separate onNegotiation.lua file
-- If any of these return false, then negotiation is prevented
discreteEvents.onNegotiation(function(talker,listener)

    return true
end)

```

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onNegotiation`.


### **Tribe Schism**

The code from this execution point is executed when a `tribe` could be split
because its capital is taken.  The event will trigger even if there is no
free civ slot for the rebel tribe to occupy, but will not occur
if a schism is not possible because of other schism mechanics.

If the registered function returns `true`, then the schism is allowed
(as long as there is an empty tribe slot).  If `false` is returned, 
then schism is prevented.

The Lua Scenario Template offers multiple ways to register functions
for this execution point.  If any of them return false, then schism
is prevented in this instance.

I think (but don't know for sure) that the requirements for a schism
are that:
1. The tribe capturing the capital must have a weaker power rating than the defending tribe.
2. The defending tribe must be controlled by an AI.


#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On Schism 
-- Return true (default) if the tribe can schism,
-- and false otherwise.
-- This is combined with the discrete events and the
-- legacy events, as well as a separate onSchism.lua file
-- If any of these return false, then schism is prevented
function events.onSchism(tribe)

    return true
end

```

The `tribe` is the tribe that just lost its capital and will undergo schism if there is an available tribe slot (unless this
event prevents it).


##### **EventsFiles\onSchism.lua**
Change this function: 
```lua
-- discreteEvents.onSchism and
-- consolidated.onSchism
-- also return booleans.  True means that the tribe can schism
-- (default behaviour).
-- If any of the events return false, schism is 
-- prevented, even if other schism events return true
function register.onSchism(tribe)

    return true
end

```

The `tribe` is the tribe that just lost its capital and will undergo schism if there is an available tribe slot (unless this
event prevents it).


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Tribe Schism event within `discreteEvents.lua`:
```lua
-- On Schism 
-- Return true (default) if the tribe can schism,
-- and false otherwise.
-- This is combined with the consolidated events and the
-- legacy events, as well as a separate onSchism.lua file
-- If any of these return false, then schism is prevented
discreteEvents.onSchism(function(tribe)

    return true
end)

```

The `tribe` is the tribe that just lost its capital and will undergo schism if there is an available tribe slot (unless this
event prevents it).

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onSchism`.


### **Between Turns**
This execution point occurs at the very beginning of a game turn, before the Barbarian tribe begins its movement.
#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- Between Turns
function events.onTurn(turn)
    --civ.ui.text("The turn is "..tostring(turn)..".")

end

```


##### **EventsFiles\onTurn.lua**
Change this function: 
```lua
function onTurn.onTurn(turn)
    if _global.eventTesting then
        civ.ui.text("on turn test separate file")
    end
end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Between Turns event within `discreteEvents.lua`:
```lua
discreteEvents.onTurn(function(turn) 
    --civ.ui.text("discrete on turn event 1")
end)

```

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onTurn`.


### **Unit Killed In Combat**
This execution point is triggered when a unit is killed as a result of standard Civ II combat.  It is not triggered if a unit is killed by the [gen.defeatUnit](/auto_doc/gen.html#defeatunit) function.  The [Unit Defeated](#unit-defeated) execution point triggers for both standard combat defeat and event driven defeat.
#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On unit killed in combat
function events.onUnitKilled(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
    --civ.ui.text("A "..loser.type.name.." has been defeated by a "..winner.type.name..".")

end

```

The `loser` is the unit which was defeated in combat.

The `winner` is the unit which won the combat.

The `aggressor` is the unit which initiated the combat.

The `victim` is the unit which was attacked.

The `loserLocation` is the tile where the `loser` was standing.  If the `aggressor` is the `loser`, the code `loser.location` will point to a "tile" off the map.

The `winnerVetStatus` is the veteran status of the `winner` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The `loserVetStatus` is the veteran status of the `loser` before the battle
took place.


##### **EventsFiles\onUnitKilled.lua**
Change this function: 
```lua
-- This will only run when a unit is killed in combat (i.e. not when an event
-- 'kills' a unit)
-- note that if the aggressor loses, aggressor.location will not work
-- note: use loserLocation instead of loser.location, since loser.location doesn't work if the attacker loses
-- (the game returns a 'tile' off the map)
function onUnitKilled.onUnitKilled(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
    if _global.eventTesting then
        civ.ui.text(loser.type.name.." killed by "..winner.type.name.." separate file test killed in combat.")
    end

end

```

The `loser` is the unit which was defeated in combat.

The `winner` is the unit which won the combat.

The `aggressor` is the unit which initiated the combat.

The `victim` is the unit which was attacked.

The `loserLocation` is the tile where the `loser` was standing.  If the `aggressor` is the `loser`, the code `loser.location` will point to a "tile" off the map.

The `winnerVetStatus` is the veteran status of the `winner` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The `loserVetStatus` is the veteran status of the `loser` before the battle
took place.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Unit Killed In Combat event within `discreteEvents.lua`:
```lua
discreteEvents.onUnitKilled(function(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus) 
    if _global.eventTesting then
        civ.ui.text(loser.type.name.." was killed by "..winner.type.name.." discrete event 1")
    end
end)

```

The `loser` is the unit which was defeated in combat.

The `winner` is the unit which won the combat.

The `aggressor` is the unit which initiated the combat.

The `victim` is the unit which was attacked.

The `loserLocation` is the tile where the `loser` was standing.  If the `aggressor` is the `loser`, the code `loser.location` will point to a "tile" off the map.

The `winnerVetStatus` is the veteran status of the `winner` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The `loserVetStatus` is the veteran status of the `loser` before the battle
took place.

#### Implementation


This event is based primarily on the function `civ.scen.onUnitKilled`
function provided by the standard Test of Time Patch Project.  However,
information is also gathered by the function registered to 
`civ.scen.onInitiateCombat` in order to populate these variables 
(which are defined outside of either registered function):
- `aggressor`
- `aggressorLocation`
- `aggressorVetStatus`
- `victim`
- `victimVetStatus`

These variables are used to populate the following `onUnitKilled` function
parameters, which are not provided by the game itself:
- `aggressor`
- `victim`
- `loserLocation`
- `winnerVetStatus`
- `loserVetStatus`


### **Unit Defeated**

This execution point is triggered when a unit is killed as a result of 
standard Civ II combat, or when it is killed by events through
the use of the [gen.defeatUnit](/auto_doc/gen.html#defeatunit) function.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On unit defeated in combat or by some other event
function events.onUnitDefeated(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
    --civ.ui.text("unit defeated consolidated test")

end

```


The `loser` is the unit which was defeated.

The `winner` is the unit which won the combat.

The `aggressor` is the unit which initiated the combat.

The `victim` is the unit which was attacked.

The `loserLocation` is the tile where the `loser` was standing.  If the `aggressor` is the `loser`, the code `loser.location` will point to a "tile" off the map.

The `winnerVetStatus` is the veteran status of the `winner` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The `loserVetStatus` is the veteran status of the `loser` before the battle
took place.



##### **EventsFiles\onUnitDefeated.lua**
Change this function: 
```lua
-- This will run any time a unit is killed, either in combat or by events
function onUnitDefeated.onUnitDefeated(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
    --civ.ui.text(loser.type.name.." defeated (possibly in an event rather than combat) by "..winner.type.name.." separate file test")

end

```


The `loser` is the unit which was defeated.

The `winner` is the unit which won the combat.

The `aggressor` is the unit which initiated the combat.

The `victim` is the unit which was attacked.

The `loserLocation` is the tile where the `loser` was standing.  If the `aggressor` is the `loser`, the code `loser.location` will point to a "tile" off the map.

The `winnerVetStatus` is the veteran status of the `winner` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The `loserVetStatus` is the veteran status of the `loser` before the battle
took place.



##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Unit Defeated event within `discreteEvents.lua`:
```lua
discreteEvents.onUnitDefeated(function(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus) 
    if _global.eventTesting then
    civ.ui.text(loser.type.name.." was defeated (possibly by event) by "..winner.type.name.." discrete event")
    end
end)

```


The `loser` is the unit which was defeated.

The `winner` is the unit which won the combat.

The `aggressor` is the unit which initiated the combat.

The `victim` is the unit which was attacked.

The `loserLocation` is the tile where the `loser` was standing.  If the `aggressor` is the `loser`, the code `loser.location` will point to a "tile" off the map.

The `winnerVetStatus` is the veteran status of the `winner` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The `loserVetStatus` is the veteran status of the `loser` before the battle
took place.


#### Implementation


The Unit Defeated execution point is implemented using the TOTPP function
`civ.scen.onUnitKilled`, as well as making the function `gen.defeatUnit`
call the registered functions for this execution point.  The function is registered for `gen.defeatUnit` by the function [gen.setDeathFunctions](/auto_doc/gen.html#setdeathfunctions).


### **Unit Death**

This execution point is triggered when a unit "dies."  This includes when it is defeated in combat or by the use of [gen.defeatUnit](/auto_doc/gen.html#defeatunit) (as long as it isn't demoted into another unit by events), and also when the function [gen.killUnit](/auto_doc/gen.html#killunit) is called.

#### Usage
##### **EventsFiles\onUnitDeath.lua**
Change this function: 
```lua
-- this happens whenever a unit 'dies', regardless of combat, as long as it is not replaced
function onUnitDeath.onUnitDeath(dyingUnit)
    --civ.ui.text(dyingUnit.type.name.." died separate file test")

end

```

The `dyingUnit` is the unit which has just been killed.


#### Implementation


The Unit Death execution point is implemented using the TOTPP function
`civ.scen.onUnitKilled`, as well as making the functions `gen.defeatUnit` and `gen.killUnit`
call the registered function for this execution point.


### **Unit Death Outside Combat**

This execution point is triggered when a unit is "killed" using the function [gen.killUnit](/auto_doc/gen.html#killunit).  It is not triggered when a unit is defeated in combat or by the use of [gen.defeatUnit](/auto_doc/gen.html#defeatunit).

#### Usage
##### **EventsFiles\onUnitDeath.lua**
Change this function: 
```lua
-- this happens whenever a unit 'dies', but not through combat (or 'defeat')
function onUnitDeath.onUnitDeathOutsideCombat(dyingUnit)
    --civ.ui.text(dyingUnit.type.name.." died outside combat separate file test")

end

```

The `dyingUnit` is the unit which has just been killed.


#### Implementation


The Unit Death Outside Combat execution point is implemented by making the function `gen.killUnit` call the registered function for this execution point.  That function is registered using [gen.setDeathFunctions](/auto_doc/gen.html#setdeathfunctions).

### **Unit Deleted**

This execution point is triggered when a unit is deleted from the game.  This includes when it is defeated in combat or by the use of [gen.defeatUnit](/auto_doc/gen.html#defeatunit) (even if the unit is "demoted" into another unit), when the function [gen.killUnit](/auto_doc/gen.html#killunit) is called, and when the function [gen.deleteUnit](/auto_doc/gen.html#deleteunit) is called.  It is not triggered when a unit is disbanded by the player (as of TOTPPv0.18.4), and is not triggered by the use of [civ.deleteUnit](/auto_doc/civ.html#deleteunit).



#### Usage
##### **EventsFiles\onUnitDeath.lua**
Change this function: 
```lua
-- this happens if a unit is deleted (either through combat death, or by some other event,
-- but not if the unit is disbanded)
-- If the unit isn't being replaced, replacingUnit is nil
function onUnitDeath.onUnitDeleted(deletedUnit,replacingUnit)
    --civ.ui.text(deletedUnit.type.name.." deleted and replaced by "..tostring(replacingUnit).." separate file")

end

```

The `deletedUnit` is the unit which has just been deleted.

The `replacementUnit` is the unit which has replaced the `deletedUnit` (if any).  If the `deletedUnit` was not replaced, this parameter is `nil`.


#### Implementation


The Unit Deleted execution point is implemented using the TOTPP function
`civ.scen.onUnitKilled`, as well as making the functions `gen.defeatUnit`, `gen.killUnit`, and `gen.deleteUnit` call the registered function for this execution point.  The function is registered for `gen.defeatUnit` by the function [gen.setDeathFunctions](/auto_doc/gen.html#setdeathfunctions).


### **City Processing Complete**

This execution point is triggered when the game has finished processing city production for a tribe, and before it has a chance to move units.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- After Production
function events.onCityProcessingComplete(turn,tribe)
    if _global.eventTesting then
        civ.ui.text("consolidated.onCityProcessingComplete for turn "..tostring(turn).." and tribe "..tribe.name)
    end

end

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which has just finished processing cities.


##### **EventsFiles\onCityProcessingComplete.lua**
Change this function: 
```lua
function register.onCityProcessingComplete(turn,tribe)
    --civ.ui.text('after production separate file')
    if _global.eventTesting then
        civ.ui.text("onCityProcessingComplete for turn "..turn.." and tribe "..tribe.name.." separate file")
    end

end

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which has just finished processing cities.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete City Processing Complete event within `discreteEvents.lua`:
```lua
discreteEvents.onCityProcessingComplete(function(turn,tribe) 
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onCityProcessingComplete for "..tribe.name.." on turn "..tostring(turn))
    end
end)

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which has just finished processing cities.

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onCityProcessingComplete`.


### **Before City Processing**

This execution point is triggered at the start of a tribe's turn, before the game processes its cities.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- Before Production
function events.onTribeTurnBegin(turn,tribe)
    if _global.eventTesting then
        civ.ui.text("consolidated.onTribeTurnBegin for turn "..tostring(turn).." and tribe "..tribe.name)
    end

end

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which is about to process cities.


##### **EventsFiles\onTribeTurnBegin.lua**
Change this function: 
```lua
function register.onTribeTurnBegin(turn,tribe)
    if _global.eventTesting then
        civ.ui.text("onTribeTurnBegin for turn "..turn.." and tribe "..tribe.name.." separate file")
    end
end

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which is about to process cities.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Before City Processing event within `discreteEvents.lua`:
```lua
discreteEvents.onTribeTurnBegin(function(turn,tribe) 
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onTribeTurnBegin for "..tribe.name.." on turn "..tostring(turn))
    end
end)

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which is about to process cities.

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onTribeTurnBegin`.


### **Tribe Turn Finished**

This execution point is triggered at the end of a tribe's turn.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
function events.onTribeTurnEnd(turn,tribe)
    if _global.eventTesting then
        civ.ui.text("consolidated.onTribeTurnEnd for turn "..tostring(turn).." and tribe "..tribe.name)
    end

end

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which has just finished its turn.


##### **EventsFiles\onTribeTurnEnd.lua**
Change this function: 
```lua
function register.onTribeTurnEnd(turn,tribe)
    if _global.eventTesting then
        civ.ui.text("onTribeTurnEnd for turn "..turn.." and tribe "..tribe.name.." separate file")
    end
end

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which has just finished its turn.


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Tribe Turn Finished event within `discreteEvents.lua`:
```lua
discreteEvents.onTribeTurnEnd(function(turn,tribe) 
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onTribeTurnEnd for "..tribe.name.." on turn "..tostring(turn))
    end
end)

```

The `turn` is the turn number (an integer).

The `tribe` is the tribe which has just finished its turn.

#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onTribeTurnEnd`.


### **Just Before City Processed**

This execution point is triggered just before the game processes a city's production, at the start of its owner's turn.  This execution point is implemented during the City Yield Calculation execution point, so anything that can't be effectively changed during that execution point can't be changed here either.  For example, changing the cosmic parameter `sizeAquaduct` will not change the size a city can grow without an aquaduct, because the size is in place before this execution point is triggered.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On City Processed
function events.onJustBeforeCityProcessed(city)
    if _global.eventTesting then
        civ.ui.text("consolidated.onJustBeforeCityProcessed for "..city.name)
    end

end

```


##### **EventsFiles\onJustBeforeCityProcessed.lua**
Change this function: 
```lua
function register.onJustBeforeCityProcessed(city)
    if _global.eventTesting then
        civ.ui.text("just before city processed separate file")
    end
end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Just Before City Processed event within `discreteEvents.lua`:
```lua
discreteEvents.onJustBeforeCityProcessed(function(city) 
    if _global.eventTesting then
        civ.ui.text("Just before city processed discrete event test for city "..city.name)
    end
end)

```

#### Implementation


The Just Before City Processed execution point is implemented using the TOTPP function `civ.scen.onCalculateCityYield`.   During the Before City Processing execution point, a list of the cities that will be processed is created.  (Cities are processed with highest ID number starting first, then working backwards.)  If the previous city processed is just before the current city, then the Just Before City Processed execution point is triggered on the next call to `civ.scen.onCalculateCityYield`.  Checks are made to prevent the "Zoom to Home City Trick" from triggering this execution point prematurely.  These checks can fail if a city screen was left open at the end of the player's last turn, and the player uses the "Zoom to Home City Trick" to open the city screen of the city to be processed next.


### **Just After City Processed**

This execution point is triggered just after the game processes a city's production, at the start of its owner's turn.  

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- On City Processed
function events.onJustAfterCityProcessed(city)
    if _global.eventTesting then
        civ.ui.text("consolidated.onJustAfterCityProcessed for "..city.name)
    end

end

```


##### **EventsFiles\onJustAfterCityProcessed.lua**
Change this function: 
```lua
function register.onJustAfterCityProcessed(city)
    if _global.eventTesting then
        civ.ui.text("just after city processed separate file")
    end
end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Just After City Processed event within `discreteEvents.lua`:
```lua
discreteEvents.onJustAfterCityProcessed(function(city) 
    if _global.eventTesting then
        civ.ui.text("Just after city processed discrete event test for city "..city.name)
    end
end)

```

#### Implementation


The Just After City Processed execution point is implemented using the TOTPP function `civ.scen.onCalculateCityYield`, checking that the last time `civ.scen.onCalculateCityYield` was called, the Just Before City Processed execution point was triggered.  As part of the city processing, each city has its yield calculated at least twice, once before production is applied, and once after.


### **Unit Enters Tile**

This execution point is triggered when a unit enters a tile from another tile.

Optionally, the function can return true, in which case no more code will be executed for this event.  This is useful if your event kills the unit, so other events expecting a non-nil unit will not cause errors.

This execution point will not work properly if `civ.scen.compatibility.activeUnitEveryMove` is set to `false`.  (In the Lua Scenario Template, it is set to `true` in the file `LuaParameterFiles\parameters.lua`.)

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- onEnterTile(unit,previousTile,previousDomainSpec)
-- executes when a unit successfully enters a tile (so not when it attacks
-- a unit or fails to enter a tile because it lacks movement points)
function events.onEnterTile(unit,previousTile,previousDomainSpec)
    if _global.eventTesting then
        civ.ui.text("consolidated.onEnterTile: "..unit.type.name.." has entered tile ("..text.coordinates(unit.location)..") from tile ("..text.coordinates(previousTile)..").")
    end
end

```


##### **EventsFiles\onEnterTile.lua**
Change this function: 
```lua
-- onEnterTile(unit,previousTile,previousDomainSpec)
-- executes when a unit successfully enters a tile (so not when it attacks
-- a unit or fails to enter a tile because it lacks movement points)
function register.onEnterTile(unit,previousTile,previousDomainSpec)
    if _global.eventTesting then
        civ.ui.text("onEnterTile.onEnterTile: "..unit.type.name.." has entered tile ("..text.coordinates(unit.location)..") from tile ("..text.coordinates(previousTile)..").")
    end
    --if gen.isParadrop(unit.type) and not unit.location.city then
    --    unit:teleport(previousTile)
    --    gen.clearParadropped(unit)
    --end
    --gen.original.uParatroopers.hold = 1
    --gen.original.uParatroopers.domain = 2

end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Unit Enters Tile event within `discreteEvents.lua`:
```lua
-- onEnterTile(unit,previousTile)
-- executes when a unit successfully enters a tile (so not when it attacks
-- a unit or fails to enter a tile because it lacks movement points)
discreteEvents.onEnterTile(function(unit,previousTile,previousDomainSpec)
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onEnterTile: "..unit.type.name.." has entered tile ("..text.coordinates(unit.location)..") from tile ("..text.coordinates(previousTile)..").")
    end
end)

```

#### Implementation


This execution point is mostly implemented using the Unit Activation execution point.  Since the execution point is executed when the unit is ready to move again, code can check whether a unit has moved.

When a unit is activated, some information about it is recorded by Lua, including its location.  The next time the a Unit Activation execution point is triggered, the location is compared to the recorded location.  If the unit is now in a different location, the Unit Enters Tile execution point is triggered. 

The Get Formatted Date execution point will also check to see if a unit has been moved, in case there is no new active unit to trigger the Unit Activation execution point.  Since the status window is recalculated almost every time a click is made, a human player shouldn't be able to do much without having this execution point trigger if it is appropriate.  The Tribe Turn Finished execution point also checks to see if a unit has been moved without having this execution point trigger, and if so, triggers this execution point. 


### **Unit Given Final Order**

This execution point is triggered when a unit is given its final order for the turn.  This can happen because the unit has been detected to have spent all its movement points, or because the tribe's turn has ended.

#### Usage
##### **consolidatedEvents.lua**
Change this function: 
```lua
-- onFinalOrderGiven(unit)
-- executes when a unit has been given its final order for the turn.
-- that is, when a new unit is active and the previous unit has spent
-- all its movement points
function events.onFinalOrderGiven(unit)
    if _global.eventTesting then
        civ.ui.text("consolidated.onFinalOrderGiven: "..unit.type.name.." has been given its order.")
    end
end

```


##### **EventsFiles\onFinalOrderGiven.lua**
Change this function: 
```lua
function register.onFinalOrderGiven(unit)
    if _global.eventTesting then
        civ.ui.text("onFinalOrderGiven.onFinalOrderGiven: "..unit.type.name.." has been given its order.")
    end
end

```


##### **Discrete Events**
In any file in which you wish to register discrete events, you must require the Discrete Events Module:
```lua
local discreteEvents = require("discreteEventsRegistrar")
```
This is the example of a discrete Unit Given Final Order event within `discreteEvents.lua`:
```lua
-- onFinalOrderGiven(unit)
-- executes when a unit has been given its final order for the turn.
-- that is, when a new unit is active and the previous unit has spent
-- all its movement points
discreteEvents.onFinalOrderGiven(function(unit)
    if _global.eventTesting then
        civ.ui.text("discreteEvents.onFinalOrderGiven: "..unit.type.name.." has been given its order.")
    end
end)

```

#### Implementation


This execution point is implemented using the Unit Activation execution point and the Tribe Turn Finished execution point.  When a unit is activated, some information about it is recorded by Lua.  The code checks the previously activated unit, and, if it no longer has any movement points remaining, triggers this execution point.  At the end of the tribe's turn, the Tribe Turn Finished execution point checks to see if the unit has any movement points left.  If it does, the Unit Given Final Order execution point is triggered for that unit.


### **Nuclear Attack**
This execution point is triggered when an attack is made by a nuclear 
weapon (either a unit with 99 attack, or a spy).  A nuclear attack does not trigger `civ.scen.onUnitKilled`, so
events.lua makes sure to execute the related events.
If the registered function returns `false`, the attack is aborted.

#### Usage
#### Implementation
This execution point is provided by the Test of Time Patch Project function `civ.scen.onUseNuclearWeapon`.


### **Get Rush Buy Cost**

This execution point is called when a player checks what the cost is to rush 
buy the city's current production item.  The registered function must return
an integer with the cost.
#### Usage
##### **MechanicsFiles\rushBuySettings.lua**

In the file MechanicsFilesushBuySettings.lua, change the following code:

```lua
function register.onGetRushBuyCost(city,cost)
    return cost
end

```

The `city` parameter is the city where rush-buying is being considered.

The `cost` parameter is the game's default cost to rush buy the current production item.

#### Implementation

This execution point is implemented using the TOTPP function `civ.scen.onGetRushBuyCost`.
### **Get Formatted Date**

This execution point is triggered whenever the game needs to display a date.
Usually, this is because the game is updating the status window for the game,
but the date is also displayed when a city window is open, and also when
the spaceship window is open.  There may be other situations also.

The registered function must return a string to display where the date should
be.  This doesn't actually have to be a date.  For example, If you have an 
active unit, you might want to display information about the unit in the
status window instead of the date.

Since the status window is recalculated so frequently, the Get Formatted Date
execution point can work almost like an 'on click' execution point.  The
Final Order Given and Unit Enters Tile execution points leverage this
ability so that they function properly even when another unit isn't activated
immediately.  (This is handled in events.lua, so you don't have to worry about
it when changing the code in onGetFormattedDate.lua.)

#### Usage
##### **MechanicsFiles\onGetFormattedDate**

You can modify the effects of this execution point by changing the following code
in `MechanicsFiles\onGetFormattedDate`:

```lua
function register.onGetFormattedDate(turn,defaultDateString)
    if _global.eventTesting then
        --print(turn,civ.getTurn())
        return "Testing Turn "..turn
    end
    return defaultDateString
end

```

The `turn` parameter is the turn for the date which is to be displayed.  This is usually the current turn, but not always.  For example, the game
displays the date for a future turn when you are looking at the spaceship
window for a spaceship which has already departed.

The `defaultDateString` is the date string which the game would normally
display.  Return this if you do not want to make any changes to the date.

Here is some example code for showing information from the leaderBonus module for the active unit in the status window, instead of the date.  If the unit
is a leader, its rank is displayed.  Otherwise, if the unit has a commander,
the commander's rank is displayed.  If the unit is neither a leader, nor under
the command of a leader, "No Leader" is displayed.

Note that if there is no active unit, or a city window is opened, the default
date is displayed.

```lua
local leaderBonus = require("leaderBonus")
function register.onGetFormattedDate(turn,defaultDateString)
    if civ.getCurrentTribe().isHuman and civ.getActiveUnit() and not civ.getOpenCity() then
        local activeUnit = civ.getActiveUnit()
        local rank = leaderBonus.getRank(activeUnit)
        if rank then
            return "Rank: "..rank
        elseif leaderBonus.getCommanderRank(activeUnit) then
            return "Ldr: "..leaderBonus.getCommanderRank(activeUnit)
        else
            return "No Leader"
        end
    else
        return defaultDateString
    end
    return defaultDateString
end
```


#### Implementation


This execution point is implemented using the TOTPP function `civ.scen.onGetFormattedDate`.
### **Select Music**

The Select Music execution point is called whenever the game selects a new
music track to play.  This allows for the scenario designer to ship
customised music with his or her scenario.

This execution point is also used by my [Extended Music For TOTPP](https://github.com/ProfGarfield/ExtendedMusicForTOTPP) program.  If your scenario ships customised
music, that overrides the Extended Music Patch.
#### Usage
##### **LuaParameterFiles\customMusicIntegration.lua**

Adding custom music to your scenario is done by modifying the file `LuaParameterFiles\customMusicIntegration.lua`.  Begin by adding a 
directory called `Music` to the scenario's folder, and put your music files
in that directory.  Then, rename the `@PICMUSICTOT` section of `Game.txt`
to give appropriate names to the tracks.

Next, change the `useCustomMusic` variable to `true`.

```lua
-- By default, custom music is disabled
-- If you don't plan to use custom music, you
-- may wish to delete @PICKMUSICTOT from Game.txt,
-- so that the list from the Original folder is used instead.
-- (There is an "Extended Music For TOTPP" addition that I wrote
-- which benefits from modifying @PICKMUSICTOT, and which this
-- module will supersede if active
local useCustomMusic = false

```
If this is not done, the scenario won't have custom music.  (It also won't have
custom music if the Direct Show Music Patch is not enabled.)

Then, go to this section of code, and change the values in the `trackList`
table to reflect the names of the tracks in your `Music` directory.  If some
of the tracks are neither in your scenario's music directory, the game will
search for them in the main `Test of Time\Music` directory.  If the track
is not found in either place, a message will be displayed to the player, unless
the scenario's music directory has a file `missingmusic.txt`.  (This file can be empty.)

```lua
local trackList = {}

-- These are the files played for each of the options in
-- @PICKMUSICTOT
-- You can add extra entries to trackList, but you should
-- probably also add entries to @PICKMUSICTOT if you do
-- (stuff won't break if you don't, just some tracks won't
-- be selectable, or selected when being played)

trackList[0] =  "Funeral March.mp3"
trackList[1] =  "Ode to Joy.mp3"
trackList[2] =  "Crusade.mp3"
trackList[3] =  "Alien.mp3"
trackList[4] =  "Mongol Horde.mp3"
trackList[5] =  "The Apocalypse.mp3" -- note that in @PICKMUSICTOT, this is misspelled
trackList[6] =  "Jurassic Jungle.mp3"
trackList[7] =  "New World.mp3"
trackList[8] =  "Tolkien.mp3"
trackList[9] =  "Mars Expedition.mp3"
trackList[10] = "Jules Verne.mp3"
trackList[11] = "They're Here.mp3"
trackList[12] = "The Dome.mp3"


-- A check will be made to make sure all the files are available
-- If the scenario directory does not contain a music folder,
-- failure will be silent, and missing tracks will be replaced
-- with default tracks known to be available
-- Failure will also be silent if a file called missingmusic.txt
-- is in the music directory
-- Otherwise, an error will be thrown detailing the missing tracks.

```

Note that although the game ships with 13 tracks, you can have more or fewer
tracks if you prefer.  You should update `@PICKMUSICTOT` appropriately,
by adding or removing lines as necessary.

Also, note that tracks 0 and 1 will be played when
civilizations are destroyed and cities celebrate We Love The King Day,
respectively.  Choose appropriate tracks, or leave them with their default
names, and let them be found in the player's main music directory.


#### Implementation


This execution point is implemented using the TOTPP function `civ.scen.onSelectMusic`.  Note, however, that unlike other execution points, this
function is not called in `events.lua`.  Instead, it is called within `LuaParameterFiles\customMusicIntegration.lua`.

### **Combat Resolution**

The Combat Resolution execution point has been superseded by the Combat Declared execution point, and is not in the current version of the Lua Scenario Template.

The registered function is called before every round of combat.  If it returns
true, the combat continues for another round.  If false, the combat ends, and
one of the combatants is destroyed.  (If one has 0 hp, it will be that one.)

#### Usage
##### **Deprecated**

This execution point is deprecated, so the Lua Scenario Template has no section dedicated to it.  If you wish to use it, define a function to be
registered, similar to the following:
```lua
local function resolutionFunction(defaultResolutionFunction,defender,attacker)
    return defaultResolutionFunction(defender,attacker)
end
```
Then, register it as follows:
```lua
civ.scen.onResolveCombat(resolutionFunction)
```
The `defaultResolutionFunction` is a function which takes two parameters, the defender and the attacker, and returns true if the combat should continue, and false if it should end.  This function is how the game would normally
determine if combat should continue.  You should change the returned value
when you wish to do something different.

The `defender` and `attacker` parameters are the units which are engaged
in combat.

#### Implementation


This execution point can be implemented with the TOTPP function `civ.scen.onResolveCombat`.
### **Choose Tile Defender**
The code registered tot he Choose Tile Defender execution point is called when the game checks what unit will defend a tile.  This happens both when a tile is actually attacked, and when the AI is determining its goals.  A unit must be returned by the registered function, and that unit will defend the tile if combat actually takes place.  The defending unit can be chosen from a different tile.
#### Usage
##### **MechanicsFiles\combatSettings.lua**

You can change the behaviour of the Choose Tile Defender execution point by modifying the function `register.onChooseDefender` in the file `MechanicsFiles\combatSettings.lua`.  The default implementation is as follows:

```lua
function register.onChooseDefender(defaultFunction,tile,attacker,isCombat)
    local bestDefenderValue = -math.huge
    local bestDefender = nil
    for possibleDefender in tile.units do
        local attackerStrength, attackerFirepower, defenderStrength, defenderFirepower
            = computeCombatStatistics(attacker,possibleDefender,false)
        -- below is what appears to be the standard civ II calculation
        --local defenderValue = defenderStrength*possibleDefender.hitpoints//possibleDefender.type.hitpoints
        -- instead of defender strength, however, defenderStrength/attackerStrength is used to account
        -- for attack buffs/debuffs (which are very few in original game)
        local defenderValue = nil
        if attackerStrength == 0 then
            defenderValue = 1e7 -- 10 million
        else
            defenderValue = (defenderStrength/attackerStrength)*possibleDefender.hitpoints/possibleDefender.type.hitpoints
        end
        defenderValue = defenderValue + defenderValueModifier(possibleDefender,tile,attacker)
        if defenderValue > bestDefenderValue or 
            (defenderValue == bestDefenderValue and possibleDefender.id < bestDefender.id) then
            bestDefenderValue = defenderValue
            bestDefender = possibleDefender
        end
    end
    return bestDefender
    --return defaultFunction(tile,attacker)
end

```

The `tile` parameter is the tile which is being attacked.

The `attacker` parameter is the unit which is attacking the tile.

The `isCombat` parameter is `true` if combat will actually take place, and `false` if the function is called for AI planning purposes.

The `defaultFunction` is the game's standard function for determining what unit will defend the tile.  To use it, return the result of `defaultFunction(tile,attacker)`.

The standard Civ II method for choosing the defender is to choose the unit with the highest "defenderValue", computed in the following way:

$$ unitValue = \frac{unitDefense \times unitHitpoints}{unitMaxHitpoints} $$


With the division rounded down to the nearest integer.  Although unitDefense takes into account bonuses like the veteran status and the pikeman bonus, this computation does not take unit hitpoints or firepower into account.  For example, a damaged Armor unit (with more than 20 HP remaining) could defend after an Alpine Troops unit, even though it would be a better defender.

The default implementation of `register.onChooseDefender` keeps this basic choice system, but does not use the `defaultFunction` so that it can take into account combat customisations made in `computeCombatStatistics`.  The most notable change is that instead of relying on only the defense value of the candidate unit, the ratio of 
$$ \frac{candidateDefenseValue}{attackersValue} $$ 
is used instead (without integer division).  This is because the base Civilization II game rarely modifies the attack value of a unit (I think the only case of this is a Partisan attacking a 0 attack unit), while this is an obvious thing to do with Lua.

If the attacker has 0 attack value when facing a certain unit, that unit's defense value is set to ten million, so that it will be chosen as the defender by default.  (This can be changed in the next step.)

After assigning a value to the candidate defensive unit, that value is altered by adding the result of the following function:

```lua
-- use this function to add to (or subtract from) the calculated
-- defender value in order to change onChooseDefender
-- e.g. if you add 1e8 (100 million) to all air in air protected stacks
-- when attacked by a fighter, air units will always defend first if they
-- are available.
-- If the combat calculator gives an attacker an attack value of 0,
-- this is converted to a defenderValue of 1e7 (10 million)
-- If you want this to defend (and cancel the attack) instead of the air unit
-- (presuming it isn't an air unit itself), you could add 1e6 (1 million) instead
-- calculated defenderValues are defenderStrength/attackerStrength*healthPercentage.
-- This should be less than 10,000 (127*8 = 1016), unless you have defense multipliers 
-- of 10 or more, and an attacker with 1 attack and facing a 1/8 penalty.
local function defenderValueModifier(defender,tile,attacker)
    if simpleSettings.fightersAttackAirFirst and
        gen.isAttackAir(attacker.type) and defender.type.domain == domain.air 
        and defender.type.range >= 2 and
        not gen.hasAirbase(tile) and not tile.city and
        not tileHasCarrierUnit(tile) then
        return 1e8
    end
    if defender.type.domain == domain.ground and tile.baseTerrain.type == 10 then
        return -1e8
    end
    if not landAirCargo.canDefend(defender) then
        return -1e8
    end
    return 0
end

```

The `defenderValueModifier` function is meant to force certain units to defend with either higher or lower priority, even if some other unit would be a better defender.  For example, if `MechanicsFiles\simpleSettings.lua` has been changed to make fighters attack air first, then `defenderValueModifier` adds 100 million (`1e8`) to the value of all air
units when a fighter unit attacks.  This ensures that air units will always be chosen as defenders when a fighter attacks, even if they are not the best defenders.  Similarly, ground units on ocean tiles subtract 100 million, so they'll never defend if a ship can defend them.

With a finalized defender value, `register.onChooseDefender` determines if the candidate defender is the best found so far, and, if so, updates the `bestDefender` variable.  After checking all units, `bestDefender` is returned.


#### Implementation


The Choose Tile Defender execution point is implemented using the TOTPP function `civ.scen.onChooseDefender`.
### **Check If City Can Build Item**

The code for this execution point is executed whenever a city needs to determine if it can build an item.  If the called function returns `true`, then the item can be built by the city; if `false` it can't.  This usually (possibly always, but I don't know for sure) means that this execution point is run in batches of 256, for all the possible units, improvements, and wonders, that a city could build.


#### Usage
##### **MechanicsFiles\canBuildSettings.lua**

The Lua Scenario Template allows you to register tables in the file `MechanicsFiles\canBuildSettings.lua` which will be translated by the `canBuild` module into a suitable function to be registered with the `civ.scen.onCanBuild` function.  The Template does not provide a way to directly provide a function for this execution point.  However, the `conditionFunction` key allows you to register arbitrary code for whether a city can build a certain item, so you can make arbitrary conditions.

If you are not using the Template, this is the outline for registering the function:

```lua
local function canCityBuild(defaultBuildFunction,city,item)
    return defaultBuildFunction(city,item)
end
```

The `city` parameter is the city that is checking if the `item` can be built.

The `item` parameter is the unitTypeObject, improvementObject, or wonderObject that the city is checking if it can build.

The `defaultBuildFunction` is the game's standard function for determining if a city can build an item.  The call `defaultBuildFunction(city,item)` returns true if the `city` can build the `item` under regular Civ II rules (prerequisite technology required, unitType not expired, improvement not already built, etc.).

You don't have to use the result of the `defaultBuildFunction` if you don't want to.  You can allow a city to build the `item` by returning `true` even if the `defaultBuildFunction` would return `false`.

Once you've written your `canCityBuild` function, you would register it using the function call
```lua
civ.scen.onCanBuild(canCityBuild)
```


#### Implementation


This execution point is implemented with the TOTPP function `civ.scen.onCanBuild`.
