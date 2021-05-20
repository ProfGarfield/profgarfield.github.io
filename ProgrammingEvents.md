# Programming Events

Although we've learned a bit about Lua, we've only written tables to specify what already existing functionality should do.
 This has given us some power, but a lot more power will come from actually writing some programs.  Before we begin, make sure that your `canBuildSettings.lua` file doesn't have any errors.  If you have trouble, just comment out the offending code. 
For the start of the next lesson, I will provide a new Classic Rome scenario folder to work from, and we won't be using buildability settings in this tutorial.

## Campaign Cost Example Event

For our first event, navigate to the `LuaTriggerEvents` directory, then to the `UniversalTriggerEvents` directory within that.  Finally, open the file `onUnitKilled.lua`.

Within `onUnitKilled.lua`, find the following lines of code:
```Lua
function unitKilledEvents.unitKilledInCombat(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetSatus)

end
```
Above this code, create a local variable campaignCost, and set it equal to 1:
```Lua
local campaignCost = 1
function unitKilledEvents.unitKilledInCombat(loser, winner, aggressor,victim,loserLocation,winnerVetStatus,loserVetSatus)

end
```
Next, within the function, add these two lines:
```Lua
    loser.owner.money = math.max(loser.owner.money -campaignCost,0)
    winner.owner.money = math.max(winner.owner.money-campaignCost,0)
```
The relevant code all together will look like this:
```Lua
-- This will only run when a unit is killed in combat (i.e. not when an event
-- 'kills' a unit)
-- note that if the aggressor loses, aggressor.location will not work
--
local campaignCost = 1
function unitKilledEvents.unitKilledInCombat(loser ,winner ,aggressor,victim,loserLocation,winnerVetStatus,loserVetSatus)
    loser.owner.money = math.max(loser.owner.money -campaignCost,0)
    winner.owner.money = math.max(winner.owner.money-campaignCost,0)
end
```
Create a couple enemy units and test out this event.  When a unit is killed, the winner's tribe and the loser's tribe both lose 1 gold.

## Campaign Cost Event Explained

So, now that we've created this event, why did we do what we did?

The first thing to do for any event is to choose when it will run (or, when to *check* if it will run, as we will see how to do later).  At certain points in the Civ 2 game, the Lua Interpreter is asked if there is any code to execute.  If so, that code is executed.  We'll call these points in the game  