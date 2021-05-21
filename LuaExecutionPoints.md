# Lua Execution Points

Lua Events function by "injecting" code into the Civilization II: Test of Time game at certain predetermined points of the game.  We'll use the term Lua Execution Point, (or just Execution Point) to refer to these parts of the game.  Everything we want to achieve with Lua will must happen at one of these Execution Points.  We may occasionally need to use several of these in order to make more complicated events work.

## Execution Points
1. [Unit Activation](#unit-activation&uarr;)
2. [Unit Bribery](#unit-bribery&uarr;)
3. [City Yield Calculation](#city-yield-calculation&uarr;)
3. [Checking Production Availability](#checking-production-availability&uarr;)
3. [Centauri Arrival](#centauri-arrival&uarr;)
3. [City Destruction](#city-destruction&uarr;)
3. [City Founded](#city-founded&uarr;)
3. [City Production](#City-production&uarr;)
3. [City Captured](#city-captured&uarr;)
3. [Game End](#game-end&uarr;)
3. [Initiate Combat](#initiate-combat&uarr;)
3. [Key Press](#key-press&uarr;)
3. [On Load](#on-load&uarr;)
3. [On Save](#on-save&uarr;)
3. [Scenario Loaded](#scenario-loaded&uarr;)
3. [Negotiation](#negotiation&uarr;)
3. [Schism](#schism&uarr;)
3. [Between Turns](#between-turns&uarr;)
3. [Unit Killed In Combat](#unit-killed-in-combat&uarr;)
3. [Unit Defeated](#unit-defeated&uarr;)
3. [Unit Death](#unit-death&uarr;)
3. [Unit Death Outside Combat](#unit-death-outside-combat&uarr;)
3. [After Production](#after-production&uarr;)
3. [Before Production](#before-production&uarr;)

## Unit Activation[&uarr;](#execution-points)

### Description

Code can be executed whenever a unit is activated.
Use the file `unitActivation.lua` in the `LuaRulesEvents` folder.

```Lua
function unitActivation.activateFunction(unit,source)


end
```

### Linkage Details

Uses function
```
civ.scen.onActivateUnit(function (unit, source) -> void) -> void)
```
>Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. Source is `true` if activated by keyboard or mouse click, `false` if activated by the game itself.

## Unit Bribery[&uarr;](#execution-points)

### Description
Code will be executed whenever a unit is bribed.  Use the file `onBribeUnit.lua` in the `LuaUniversalTriggers` folder, found in the `LuaTriggerEvents` folder.

```Lua
function bribeUnitEvents.onBribeUnit(unit,previousOwner)

end
```

### Linkage Details
Uses function
```
civ.scen.onBribeUnit(function (unit, previousOwner) -> void)
```

## City Yield Calculation[&uarr;](#execution-points)

### Description

Code can be executed whenever a city computes its production.
Use the file `calculateCityYield.lua` in the `LuaRulesEvents` folder.

In addition to executing code for arbitrary purposes, this execution point allows for changing city production levels.

```Lua
function cityYield.onCalculateCityYield(city,food,shields,trade)
    local extraFood,extraShields,extraTrade = 0,0,0 -- resources to add to compensate
            -- for terrain changes made during the city yield calculation
            -- If you remove the above line, remember to remove the references to
            -- these variables in the return line at the end of this function
    -- If you are not making any terrain production value changes in this
    -- function, you can take out the code below this line and above a
    -- corresponding line below
    -- Any changes to terrain production should go here
    




    -- Any changes to terrain production should be before this line
    local correctFood,correctShields,correctTrade = baseProduction(city)
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

### Linkage Details

```
civ.scen.onCalculateCityYield(function (city, food, shields, trade) -> (foodChange, shieldChangeBeforeWaste, shieldChangeAfterWaste, tradeChangeBeforeCorruption, tradeChangeAfterCorruption)) -> void
```
>Registers a function to be called every time a city calculates its total resource yield. Input is the city, and the food, shields and trade of its tiles. Returns a 5-tuple of modifiers, food change, shield change before waste, shield change after waste, trade change before corruption, trade change after corruption. These modifiers are applied at the following points in the calculation:

>1. Calculate yield from all worked tiles
>2. **Run onCalculateCityYield**
>3. **Add foodChange, shieldChangeBeforeWaste and tradeChangeBeforeCorruption**
>4. Add changes from food trade routes
>5. Add shields from improvements
>6. Calculate and subtract waste
>6. Calculate corruption and add changes from commodity trade routes
>6. Calculate corruption again (now using the value after trade routes) and subtract.
>6. **Add shieldChangeAfterWaste and tradeChangeAfterCorruption**
>6. Calculate Tax/Lux/Sci

## Checking Production Availability[&uarr;](#execution-points)

### Description

The Lua Scenario Template doesn't provide for executing arbitrary code during the check for whether a production item is available in a city menu.

The production availability can be changed within the file `canBuildSettings.lua` found in the `LuaRulesEvents` folder.  The changes are made by altering data tables.

### Linkage Details
```
civ.scen.onCanBuild(function (defaultBuildFunction, city, item) -> boolean)
```
>Registers a function to be called every time a check is done whether a city can build something or not. It is called for all unit types, improvements and wonders. The first parameter of the callback is the default build function, as implemented by the game. It takes the city and item as parameters. You can call this to produce a result for cases you don't need to handle yourself. `item` can be a unittype, improvement or wonder.
>
>Return `true` if `city` is allowed to produce `item`, `false` if not.

## Centauri Arrival[&uarr;](#execution-points)

### Description

Run code when a tribe wins the space race.  Use the file `onCentauriArrival.lua` within the `UniversalTriggerEvents` folder, found in the `LuaTriggerEvents` folder.

```Lua 
function centauriArrival.onCentauriArrival(tribe)

end
```

### Linkage Details

```
civ.scen.onCentauriArrival(function (tribe) -> void)
```

## City Destruction[&uarr;](#execution-points)

### Description

Run code when a city is destroyed.  Use the file `onCityDestroyed.lua` in the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.

```Lua
function cityDestroyed.onCityDestroyed(city)

end
```

### Linkage Details
```
civ.scen.onCityDestroyed(function (city) -> void)
```

## City Founded[&uarr;](#execution-points)

### Description

Runs code when a city is founded.  Code is executed when the player presses `b` to found the city, even if they decide not to build the city during the name selection.  (Relevant if making changes to the terrain or whatnot.)  Use the file `onCityFounded.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.

```Lua
function cityFounded.onCityFounded(city)

end
```

### Linkage Details

```
civ.scen.onCityFounded(function (city) -> void)
```

>Registers a function to be called every time a city is founded. The callback takes the city as a parameter.

## City Production[&uarr;](#execution-points)

### Description

Runs code when a city completes production on something.  Use the file `onCityProduction.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` folder.

```Lua
function cityProduction.onCityProduction(city,prod)

end
```

### Linkage Details
```
civ.scen.onCityProduction(function (city, prod) -> void)
```

## City Captured[&uarr;](#execution-points)

### Description
Runs code when a city is captured.  Use the file `onCityTaken.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` folder.
 
```Lua
function cityTaken.onCityTaken(city,defender)

end
```
To get the conquerer tribe, use `city.owner`.  `defender` is the tribe that lost the city.

### Linkage Details

```
civ.scen.onCityTaken(function (city, defender) -> void)
```

## Game End[&uarr;](#execution-points)

### Description

Code to run when the game ends.  Use the file `onGameEnds.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` folder.
```Lua
function gameEnd.onGameEnds(reason)

end
```
This functionality hasn't been explored at all, and is not documented elsewhere at the time of writing.

### Linkage Details

```
civ.scen.onGameEnds(function (reason) -> boolean)
```

## Initiate Combat[&uarr;](#execution-points)

Code to run before combat starts.  This also allows altering the rules of combat, and even allowing combat to end before a unit is killed.  Use the file `initiateCombat.lua` found in the `LuaRulesEvents` directory.

```Lua
function onInitiateCombat.makeCoroutine(attacker,defender,attackerDie,attackerPower,defenderDie,defenderPower)

    local maxCombatRounds = math.huge -- If you want to limit combat to a specific number of
                                        -- turns, set this variable
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

                local newAttackerDie = nil
                local newAttackerFirepower = nil
                local newDefenderDie = nil
                local newDefenderFirepower = nil
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

### Linkage Details

```
civ.scen.onInitiateCombat(function (attacker, defender, attackerDie, attackerPower, defenderDie, defenderPower) -> coroutine)
```
>Registers a function to be called every time combat is initiated. The callback takes up to six parameters, the attacker, the defender, attackerDie ('die' as in dice, the attacker's chance to hit), attackerPower (attacker's firepower), defenderDie and defenderPower. Returns a coroutine that yields every time it wants to process a round, and returns when it wants combat to end.
>
>Example:
```Lua
civ.scen.onInitiateCombat(function (attacker, defender, attackerDie, attackerPower, defenderDie, defenderPower)
  print("Attacker's die: 1d" .. attackerDie .. ", firepower: " .. attackerPower)
  print("Defender's die: 1d" .. defenderDie .. ", firepower: " .. defenderPower)
  return coroutine.create(function ()
    local round = 0
    while (round < 5 and attacker.hitpoints >= 0 and defender.hitpoints >= 0) do
      print("Round " .. round)
      print(attacker, defender)
      if round % 2 == 0 then
        attacker.damage = attacker.damage + 2
        coroutine.yield(true, defender) -- either attacker or defender
      else
        print("Attack bonus!")
        result = coroutine.yield(false, attackerDie * 2, attackerPower * 2)
        print(result.winner, result.attackerRoll, result.defenderRoll, result.reroll)
      end
      round = round + 1
    end
    print("End of combat")
  end)
end)
```
>This example shows how to limit combat to five rounds, damages the attacker on even rounds and doubles the attacker's values on odd rounds.
>
>If the coroutine yields true as its first value, the game's default combat resolution is skipped for that round and the designer is responsible for updating damage. The second value yielded is either the attacker or the defender, this is used to render animations etc. In this case the coroutine resumes without any values.
>
>If the coroutine yields false as its first value, the game runs its default combat algorithm. The designer can additionally yield modified values for attackerDie, attackerPower, defenderDie and defenderPower (in this order) which will be used by the game for that round. In this case the coroutine resumes with the result of the round, a table containing four values:
>
>1. winner, this is either attacker or defender.
>
>2. attackerRoll, the result of the attacker's die roll
>
>3. defenderRoll, the result of the defender's die roll
>
>4. reroll, true if a reroll happened. This can happen only if the attacker is tribe 0, the defender is a unit guarding a city, and the city is the capital or the tribe has less than 8 cities in total and the attacker's die roll is higher than the defender's. A reroll can happen at most once.

## Key Press[&uarr;](#execution-points)

Code can be run when keys are pressed.  See the [Keyboard](Keyboard.md) documentation to get the codes for each key.  Use the file `keyPressEvents.lua` in the `LuaRulesEvents` folder.
```Lua
keyPressFunctions[keyboard.zero] = function()

end

keyPressFunctions[keyboard.one] = function()
    text.openArchive()
end
keyPressFunctions[keyboard.two] = function()
    diplomacySettings.diplomacyMenu()
end
keyPressFunctions[keyboard.three] = function()

end
keyPressFunctions[keyboard.four] = function()

end
keyPressFunctions[keyboard.five] = function()

end
keyPressFunctions[keyboard.six] = function()

end
keyPressFunctions[keyboard.seven] = function()

end
keyPressFunctions[keyboard.eight] = function()

end
keyPressFunctions[keyboard.nine] = function()

end
keyPressFunctions[keyboard.k] = function()
    if civ.getActiveUnit() then
        munitionsSettings.primaryAttack(civ.getActiveUnit())
    end
end
keyPressFunctions[keyboard.u] = function()
    if civ.getActiveUnit() then
        munitionsSettings.secondaryAttack(civ.getActiveUnit())
    end
end
keyPressFunctions[keyboard.h] = function()
    if civ.getActiveUnit() then
        civ.sleep(100)
        munitionsSettings.payloadRestrictionCheck(civ.getActiveUnit())
    end
end
keyPressFunctions[keyboard.tab] = function()
   helpKeySettings.doHelpKey() 
end
keyPressFunctions[keyboard.escape] = function()
    return logSettings.combatReportFunction()
end
keyPressFunctions[keyboard.backspace] = function()

end
keyPressFunctions[keyboard.w] = function()
    if simpleSettings.enableCustomUnitSelection then
        gen.betterUnitManualWait()
    end
end

-- Use this if it makes sense to group several keys
-- into a single event
local function generalKeyPress(keyID)

end

local function doKeyPress(keyID)
    if keyPressFunctions[keyID] then
        keyPressFunctions[keyID]()
    end
    generalKeyPress(keyID)
end

```

### Linkage Details

```
civ.scen.onKeyPress(function (keyCode) -> void)
```
>Registers a function to be called every time a key is pressed.

## On Load[&uarr;](#execution-points)

### Description

Run when the game is loaded.  Restores the "`state table`" (a table of saved Lua information).  The Lua Scenario Template doesn't provide access to this.
Use [Scenario Loaded](#scenario-loaded) instead.  If you really need this in the template, you can look in `events.lua`.

### Linkage Details
```
civ.scen.onLoad(function (buffer) -> void)
```
>Buffer is a string attached to the end of a saved game file. It can be unserialized back into a state table.

## On Save[&uarr;](#execution-points)

### Description

Runs code when the game is saved, and adds the "`state table`" (a table of saved Lua information) to the end of the saved game.  The Lua Scenario Template doesn't provide direct access to this Execution Point.  If you really need this, you can look in `events.lua`.

### Linkage Details
```
civ.scen.onSave( function () --> string)
```
>The string returned is attached to the end of the saved game file.

## Scenario Loaded[&uarr;](#execution-points)

### Description

Code here is run when you start a new game, or load a game.  If your scenario has "seasons" or similar mechanics, you will set them up here so that they are applied when you load the game, in addition to wherever you make the seasons change in the middle of a session.  Use the file `scenarioLoaded.lua` in the `LuaRulesEvents` folder.

```Lua
function scenarioLoaded.scenarioLoadedFn()
    legacy.doScenarioLoadedEvents()
end
```

### Linkage Details

```
civ.scen.onScenarioLoaded(function () -> void)
```

## Negotiation[&uarr;](#execution-points)

### Description

Runs code whenever a tribe (the `talker`) attempts to negotiate with another tribe (the `listener`).  The function returns a `boolean` which determines if the tribes can, in fact, negotiate.  Use the `negotiationSettings.lua` file in the `LuaRulesEvents` folder.

```Lua
function negotiationSettings.negotiation(talker,listener)
    legacy.doNegotiationEvents(talker,listener)
    --return false
    return legacy.canNegotiate(talker,listener)
    --return true
end
```

### Linkage Details
```
civ.scen.onNegotiation(function (talker, listener) -> boolean)
```

## Schism[&uarr;](#execution-points)

### Description
Runs code when a 'schism' (civil war) could happen as the result of the loss of a capital.  The returned value also determines if a schism can actually take place.  Use the `onSchism.lua` within the `LuaRulesEvents` folder.
```Lua
function onSchism.onSchism(tribe)
    return legacy.doNoSchismEvents(tribe)
end
```

### Linkage Details
```
civ.scen.onSchism(function (tribe) -> boolean)
```

## Between Turns[&uarr;](#execution-points)

### Description
Runs code at the "start" of a turn, after the Purple tribe has played, and before the Barbarians move.  Use `onTurn.lua` in the `UniversalTriggerEvents` folder, within the `LuaTriggerEvents` folder.

```Lua
function onTurn.onTurn(turn)

end

```
### Linkage Details
```
civ.scen.onTurn(function (turn) -> void)
```

## Unit Killed In Combat[&uarr;](#execution-points)

### Description
This code is run when a unit is killed in "combat," which is to say in regular Civilization II combat.  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.

```Lua
function unitKilledEvents.unitKilledInCombat(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)

end
```
The `loser` is the unit that was killed, and the `winner` is the unit that survived combat.  The `aggressor` is the unit that initiated the combat, while the `victim` is the uni that was attacked (even if it won the combat).  The `winner` and `loser` `VetStatus` arguments determine whether the winner and loser were veterans *before* the combat began.

### Linkage Details
This uses `onUnitKilled`.
```
civ.scen.onUnitKilled(function (loser, winner) -> void)
```
Also, information about the loserLocation and the combatant veteran statuses are gathered from the [onInitiateCombat](#initiate-combat&uarr;) Execution Point.

## Unit Defeated[&uarr;](#execution-points)

### Description
Runs code when a unit is "defeated," either in standard combat or by use of the `gen.defeatUnit` function.  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.


```Lua
function unitKilledEvents.unitDefeated(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)

end
```
The `loser` is the unit that was killed, and the `winner` is the unit that survived combat.  The `aggressor` is the unit that initiated the combat, while the `victim` is the uni that was attacked (even if it won the combat).  The `winner` and `loser` `VetStatus` arguments determine whether the winner and loser were veterans *before* the combat began.

### Linkage Details

In `events.lua`, there is code to link this both to the General Library `gen.defeatUnit` function and to the [killed in combat](#unit-killed-in-combat&uarr;) execution point.

## Unit Death[&uarr;](#execution-points)

### Description
Runs code when a unit 'dies,' either in combat, or through use of `gen.killUnit` or `gen.defeatUnit` as long as that unit is not replaced.  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.

```Lua
function unitKilledEvents.unitDeath(dyingUnit)

end
```

### Linkage Details

In `events.lua`, there is code to link this both to the General Library `gen.defeatUnit` and `gen.killUnit` functions and to the [killed in combat](#unit-killed-in-combat&uarr;) execution point.  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.

```Lua
function unitKilledEvents.unitDeathOutsideCombat(dyingUnit)

end
```

## Unit Death Outside Combat[&uarr;](#execution-points)

### Description
Runs code when a unit dies through use of the `gen.killUnit` function, but not through "combat" or "defeat."  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.

```Lua
function unitKilledEvents.unitDeathOutsideCombat(dyingUnit)

end
```

### Linkage Details

In `events.lua` there is code to link this to the General Library for use with the `gen.killUnit` function.

## After Production[&uarr;](#execution-points)

### Description

Executes code after all cities have been processed for the current player, and before that player gets a chance to move units.  Use `afterProduction.lua` in the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` folder.

```Lua
function afterProdEvents.afterProduction(turn,tribe)
   -- civ.ui.text("After Production for turn "..tostring(turn).." and tribe "..tribe.name)

end
```
The `turn` is the current turn number, and the `tribe` is the currently active tribe.

### Linkage Details

Uses the [unit activation](#unit-activation&uarr;) execution point (set up in `events.lua`) to create the action.  The flag module is used to keep track of whether After Production has been done for the current turn, with the [on turn](#between-turns&uarr;) execution point used to reset the flags each turn.

If the tribe doesn't have any active units on a given turn, this execution point will fail to activate.

## Before Production[&uarr;](#execution-points)

### Description

Executes code before any cities are processed for the current player.  Use `beforeProduction.lua` in the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` folder.
```Lua
function beforeProduction.beforeProduction(turn,tribe)

end
```
The `turn` is the current turn number, and the `tribe` is the currently active tribe.

### Linkage Details

Uses the [City Yield Calculation](#city-yield-calculation&uarr;) execution point (set up in `events.lua`) to create the action.  The flag module is used to keep track of whether After Production has been done for the current turn, with the [on turn](#between-turns&uarr;) execution point used to reset the flags each turn.





