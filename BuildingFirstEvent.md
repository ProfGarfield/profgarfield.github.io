# Programming Our First Event

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
function unitKilledEvents.unitKilledInCombat(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetSatus)
    loser.owner.money = math.max(loser.owner.money -campaignCost,0)
    winner.owner.money = math.max(winner.owner.money-campaignCost,0)
end
```
Create a couple enemy units and test out this event.  When a unit is killed, the winner's tribe and the loser's tribe both lose 1 gold.

## Building the Campaign Cost Event

So, now that we've created this event, why did we do what we did?

The first thing to do for any event is to choose when it will run (or, when to *check* if it will run, as we will see how to do later).  At certain points in the Civ 2 game, the Lua Interpreter is asked if there is any code to execute.  If so, that code is executed.  We'll call these points in the game "Lua Execution Points," or just "execution points."

How do we choose an execution point?  First thing is to look at the [execution point documentation](LuaExecutionPoints.md) to find out what the available execution points are:

>## Execution Points
>1. Unit Activation
>2. Unit Bribery
>3. City Yield Calculation
>3. Checking Production Availability
>3. Centauri Arrival
>3. City Destruction
>3. City Founded
>3. City Production
>3. City Captured
>3. Game End
>3. Initiate Combat
>3. Key Press
>3. On Load
>3. On Save
>3. Scenario Loaded
>3. Negotiation
>3. Schism
>3. Between Turns
>3. Unit Killed In Combat
>3. Unit Defeated
>3. Unit Death
>3. Unit Death Outside Combat
>3. After Production
>3. Before Production

The execution points that appear to be related to combat are:
* Initiate Combat
* Unit Killed in Combat
* Unit Defeated

The Initiate Combat execution point is relatively complicated to deal with, so we'll look at Unit Killed in Combat and Unit Defeated instead.

>## Unit Killed in Combat
>
>### Description
>This code is run when a unit is killed in "combat," which is to say in regular Civilization II combat.  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.
>
>```Lua
>function unitKilledEvents.unitKilledInCombat(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
>
>end
>```
>The `loser` is the unit that was killed, and the `winner` is the unit that survived combat.  The `aggressor` is the unit that initiated the combat, while the `victim` is the uni that was attacked (even if it won the combat).  The `winner` and `loser` `VetStatus` arguments determine whether the winner and loser were veterans *before* the combat began.

>## Unit Defeated
>
>### Description
>Runs code when a unit is "defeated," either in standard combat or by use of the `gen.defeatUnit` function.  Use `onUnitKilled.lua` within the `UniversalTriggerEvents` directory, found in the `LuaTriggerEvents` directory.
>
>
>```Lua
>function unitKilledEvents.unitDefeated(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
>
>end
>```
>The `loser` is the unit that was killed, and the `winner` is the unit that survived combat.  The `aggressor` is the unit that initiated the combat, while the `victim` is the uni that was attacked (even if it won the combat).  The `winner` and `loser` `VetStatus` arguments determine whether the winner and loser were veterans *before* the combat began.

These both do similar things, the difference being that Unit Killed in Combat doesn't apply if we use events to simulate combat.  Since we're not planning on doing that, we'll use Unit Killed in Combat.  In standard Civ II, all combat ends in a unit being killed, so this will capture all campaigning.

Next, we must know *where* to put our code.  The description lets us know that within the Lua Scenario Template, we have to find the `onUnitKilled.lua` file, and that the function in that file that is executed at the Unit Killed In Combat execution point is `unitKilledEvents.unitKilledInCombat`.  So, we'll be putting our code in that function.

We want to change the treasury of the combatant tribes, so we have to figure out how to do that.  One place to look is the [Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/) Civfanatics Forum Thread.  This thread is where The Nameless One (Creator of the TOTPP) documents the ways of using Lua to interact with the game.  One way to find this information is to search the webpage (`ctrl+F` on most web browsers) for what we want using a keyword.  We want to change the treasury, so we'll try searching for "treasury".

The only instance of "treasury" on the page brings us to:
>__**money (get/set)**__
>
>tribe.money -> integer
>
>Returns the amount of money/gold in the tribe's treasury.

(Searching for "gold" or "money" also brings us to this entry, although "money" does appear a few more times on the page.)

This tells us that by using the `money` key of the `tribe` object, we can get the tribe's treasury balance, and change it if we desire.  Now, we need to get the tribes that were involved in that particular combat.

The function that is executed at a particular execution point provides us with access to information about the *specific* instance of execution.

>```Lua
>function unitKilledEvents.unitKilledInCombat(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)
>
>end

In this case, we are provided with the units that were involved in combat.  Per the documentation for this execution point, `loser`, `winner`, `aggressor` and `victim` are just different names for the units involved in combat, not the tribes involved, and the other arguments don't help us either.  So, we have access to the units involved in combat, but not the tribes.  Let us return to the [Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/).  This time, we'll look at the index at the top of the thread:

>* The civ library
>* The civ.ui library
>* The city object
>* The tile object
>* The unit object
>* The unittype object
>* The tribe object
>* The improvement object
>* The tech object
>* The leader object
>* The wonder object
>* The spaceship object
>* The dialog object
>* The map object
>* The baseterrain object
>* The terrain object
>* The cosmic library
>* The game library
>* The game.rules library
>* The civ.scen library
>* The civ.scen.params library
>* The totpp library
>* The totpp.version library
>* The totpp.movementmultipliers library
>* The totpp.mod library

Since we have `unit` objects available to us, it looks like [The *unit* object](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#unit) is probably where we want to start looking.  If we scroll down through the various keys, we get to

> __**owner (get/set)**__  
>unit.owner -> tribe
>
>Returns the unit's owner.

This is what we want.  `unit.owner` is a tribe object, so `unit.owner.money` allows us to access the treasury of the unit's tribe.

We want to subtract 1 gold from the winner's treasury.  To do that, we need to get the winner's treasury:
```lua
winner.owner.money
```
Then, we need to subtract 1 from that:
```lua
winner.owner.money-1
```
Finally, we want to replace the existing amount in the treasury with this new value.  So, we place our new value on the Right Hand Side of an `=`, and place the location we wish to change on the Left Hand Side:
```lua
winner.owner.money = winner.owner.money-1
```
At this point, it occurs to us that a tribe might be involved in combat even if it has no money in its treasury.  Applying this code will result in a negative balance, which would be bad.  We decide that if the balance would be less than 0, we'll just make it 0.  How do we do this?  One way is to make the program choose the maximum of `winner.owner.money-1` and `0`.  This isn't something that is Civilization II specific, so we can search the wider Internet for how to do this.  Choosing a maximum value is a pretty basic thing, so there is probably a built in maximum function in Lua.  Let's search for "lua maximum function".

When I searched duckduckgo for "lua maximum function", these were my first four results:

1. [Lua - Functions - Tutorialspoint](https://www.tutorialspoint.com/lua/lua_functions.htm)
2. [Max | Roblox Lua Wiki | Fandom](https://arebeexlua.fandom.com/wiki/Max)
3. [lua - Returning key of maximum or minimum number in a ...](https://stackoverflow.com/questions/20827259/returning-key-of-maximum-or-minimum-number-in-a-table)
4. [Lua - Math library - Tutorialspoint](https://www.tutorialspoint.com/lua/lua_math_library.htm)

The first link is to a tutorialspoint page.  Tutorialspoint is a good resource for general Lua information, but this first page is about functions in general, not a maximum function specifically.  It does give us the code to write our own maximum function, if we really want to.

The second link is to a wiki for using Lua with Roblox.  We might as well check anyway, since we this information might work for us, and we do find a brief explanation of the `math.max` function.  If we plug it into the [lua demo](https://www.lua.org/cgi-bin/demo), we find that it works, so `math.max` is not exclusive to Roblox.  Technically, we're done, but let's have a quick look at the other links also. 

The third link is to Stackoverflow, which is a Q&A site for programming.  The question is
>A simple Lua problem here: how to find the index, or key, of the minimum or maximum number in a given table.
>
> `math.max`/`math.min` only gives the actual max or min number, not the key.

The question itself isn't what we want, but it does reference `math.max` and `math.min`, and `math.max` looks an awful lot like what we might want.  In fact, when I searched for "lua math.max", the first result was the same as result 4 above, so have a look there.

Link 4 is to another tutorialspoint page, this time about the "Math Library".

> We often need math operations in scientific and engineering calculations and we can avail this using the standard Lua library math. The list of functions available in math library is shown in the following table.

While much of this stuff probably won't be useful to us (we're probably not going to compute cosines for example), some of it will be.  In our case, we find

> **math.max (x, ...)**
>
> Returns the maximum value among its arguments.

The `...` argument means that you can input as many numbers as you like, and get the maximum of all of them.

Armed with this information, we can now write 
```lua
function unitKilledEvents.unitKilledInCombat(loser, winner, aggressor,victim, loserLocation, winnerVetStatus, loserVetStatus)
    loser.owner.money = math.max(loser.owner.money - 1,0)
    winner.owner.money = math.max(winner.owner.money - 1,0)
end
```

We could be done now, but should we be?  What happens if we decide that we want the cost of campaigning to be higher?  We'd have to go through all these lines of code, and change each 1 to some other number.  That could be a lot of work, and what if we missed a line somewhere?  What we can do instead is define a variable called `campaignCost`, and set that to `1`.  All our code can refer to `campaignCost`, and if we need to change the cost, we need only change it in one place.  Furthermore, when we're reading our code, `campaignCost` will remind us (or someone else reading our code) *why* we're subtracting from the treasury here.

We can define `campaignCost` outside of our function, and Lua will still know to reference it, as long as we define it *before* `unitKilledEvents.unitKilledInCombat` is defined.  Hence, we arrive at our code:

```lua
local campaignCost = 1
function unitKilledEvents.unitKilledInCombat(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetSatus)
    loser.owner.money = math.max(loser.owner.money -campaignCost,0)
    winner.owner.money = math.max(winner.owner.money-campaignCost,0)
end
```

This may have seemed like a lot of work, but very quickly you'll learn the Lua commands for the common ways to interact with the game.  Also, if you're stuck, these questions about what function you need to do something are typically easy to answer, so just ask in the forums.



