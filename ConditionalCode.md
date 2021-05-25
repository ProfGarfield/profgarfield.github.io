<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>


[&larr;Building Our First Event](BuildingFirstEvent.md) | [Home](index.md)  | [Loops&rarr;](Loops.md)

# Conditional Code

In the last lesson, we wrote an event that deducted money from tribes each time they were involved in combat.  This event always happens, regardless of who is fighting or how much money they have. In this lesson, we will see how to run code only if certain conditions are met.

If you are unsure if you followed the previous lessons correctly, extract `ClassicRome2.zip` and work from that scenario folder instead.  I will periodically provide new points of reference to work from, in case you make a significant mistake or simply change or add stuff while experimenting.

## 'if' Statements

The way we make code only happen sometimes is by using an "if statement".  The most basic type of if statement works as follows:
```lua
if condition then
    -- instructions
end
```
When the line `if condition then` is met, the lua interpreter determines if '`condition`' is `true` or `false`. If it is `true`, the code between `then` and `end` is executed. If the `condition` is `false`, the program skips to the `end` and continues after that.  The `condition` can be any value; we are not restricted to `true` or `false` in `if` statements.  It is important to know, however, that in Lua all values except `false` and `nil` are considered `true`. Even `0` is considered true (which is different from some other programming languages).  We will make use of these features in due course.

For our first event using an if statement, let's add a bit of flavour to our scenario.  We'll alternate the leader of the Romans every turn, to reflect the alternating nature of the consulship. We'll use Scipio and Fabius as the two leaders.

We must first decide which [Lua Execution Point](LuaExecutionPoints.md) to use for this event.  Since we want to have this happen every turn, Between Turns looks like a good choice:


>## Between Turns
>
>### Description
>Runs code at the "start" of a turn, after the Purple tribe has played, and before the Barbarians move.  Use `onTurn.lua` in the `UniversalTriggerEvents` folder, within the `LuaTriggerEvents` folder.
>
>```lua
>function onTurn.onTurn(turn)
>
>end
>
>```

This tells us to find the file `onTurn.lua` in the `UniversalTriggerEvents` folder, and work with that file.

The file is currently very empty.  These are the entire contents:
```lua
local onTurn = {}
function onTurn.onTurn(turn)

end

return onTurn
```
The first thing we should notice is that there are no `require` lines at the top of this file.  In order to access information not in our current file, we must use the `require` command.  We'll learn about how `require` works in a later lesson.  For now, we need the `object` table created in `object.lua`.  So, add this line to the top of the file:

```lua
local object = require("object")
```
Next, let us declare variables for our leader names:
```lua
local evenTurnLeader = "Scipio"
local oddTurnLeader = "Fabius"
```
Our file should look like this:
```lua
local object = require("object")
local onTurn = {}
local evenTurnLeader = "Scipio"
local oddTurnLeader = "Fabius"
function onTurn.onTurn(turn)

end

return onTurn
```
The `onTurn` function gives us the current turn as an argument, so what we need to do is figure out if the turn is even or odd.  One way to determine that is by using the "modulo" operator, denoted by `%`.   `a%b` returns the remainder after dividing `a` by `b`. The `turn % 2` will return 0 if the `turn` is even (an even number divided by 2 has no remainder), and `turn % 2` will be 1 if `turn` is odd.

To test whether this result is equal to 1 or 0, we use the operator `==`. `a==b` returns `true` if `a` and `b` are equal, and `false` otherwise.

Putting these together,
```lua
turn % 2 == 0
```
returns `true` if the turn is even, and false if it is not.  Similarly,
```lua
turn % 2 == 1
```
returns `true` if the turn is odd, and `false` if it is not.  If we put these in `if` statements, we get:
```lua
if turn % 2 == 0 then
    -- We only get here if the turn is even
end
if turn % 2 == 1 then
    -- We only get here if the turn is odd
end
```

Now, we need to change the name of the Roman leader.  This is done using the `leader` object, specifically
> __**name (get/set)**__  
> leader<span></span>.name -> string
>
> Returns the name of the leader.

We don't have leaders in the `object.lua` file, so we have to get a tribe's leader from:

>__**leader (get)**__  
>tribe.leader -> leader
>
>Returns the leader of the tribe.

Since we can get the Roman tribe from the object table, we can change the leader's name by using:
```lua
object.pRomans.leader.name = newName
```

Putting everything together, we get

```lua
local object = require("object")
local onTurn = {}
local evenTurnLeader = "Scipio"
local oddTurnLeader = "Fabius"
function onTurn.onTurn(turn)
    if turn % 2 == 0 then
        -- We only get here if the turn is even
        object.pRomans.leader.name = evenTurnLeader
    end
    if turn % 2 == 1 then
        -- We only get here if the turn is odd
        object.pRomans.leader.name = oddTurnLeader
    end
end

return onTurn
```
Make these changes to `onTurn.lua`, and load the game.  The Trade Advisor is one place where you can see your leader's name.  At the moment on the first turn of the game, it will be Scipio.  End the turn, and wait for the next turn.  If you open the Trade Advisor again, you should see that your name is now Fabius.

## Using "and" and "or"

### Using "or"

Now, let us make a more complicated event.  We will give the Celts a bonus against the Romans.  Our goal is that if the Celts own Milan and the square (37,15) is either empty or defended by the Celts, then the Celts get a chariot at the square every turn.

The first thing we must do is choose an [execution point](LuaExecutionPoints.md) for our code.  Since we want this to happen every turn, there are three suitable execution points: [Between Turns](LuaExecutionPoints.md#between-turns), [After Production](LuaExecutionPoints.md#after-production), and [Before Production](LuaExecutionPoints.md#before-production).  We will again use the Between Turns execution point, so we again open `onTurn.lua`.

Let us first give a name to the tile that we wish to produce a chariot on.  Add this line:
```lua
local oddTurnLeader = "Fabius" --This line is already in the file.
local chariotSquare = civ.getTile(37,15,0) -- This is the new line.
```
`civ.getTile` is the basic function that converts 3 coordinates to a tile.  Now, the first thing we want to do is to check if we can place the chariot on the tile, which we only want to do if the tile either has no units on it, or has Celtic units on it.  The function `civ.createUnit` won't stop us from creating units on tiles occupied by units of a different tribe, so we have to check this ourselves.  (`civlua.createUnit` and [`gen.createUnit](GeneralLibrary.md#gencreateunit) do offer that feature.)

For a given tile, `tile.defender` gives the tribe that has a unit on the tile, or `nil` if no tribe has a unit on the tile.  Hence, we check if `chariotSquare` is undefended by using:
```lua
chariotSquare.defender == nil
```
And we check if `chariotSquare` is defended by the Celts by the code
```lua
chariotSquare.defender == object.pCelts
```

We will ignore the Milan ownership requirement for now.  What we want is an if statement that will run if either of these conditions is true.  For that, we use `or`.  The expression
```lua
A or B
```
is true if either A is true, or B is true (or both).
```lua
true or false --> true
false or true --> true
true or true --> true
false or false --> false
```
Hence, for our if statement, we have:
```lua
if chariotSquare.defender == nil or chariotSquare.defender == object.pCelts then
```

Next, we must create the unit.  From the [Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/), `civ.createUnit` has the following information:

> __createUnit__  
>`civ.createUnit(unittype, tribe, tile) -> unit`
>
>Creates a unit of type `unittype`, owned by `tribe`, at the location given by `tile`.

So, to create our unit, we replace `unittype` with `object.uChariot`, `tribe` with `object.pCelts`, and `tile` with `chariotSquare`.  We will name the newly created unit `newChariot`.  Hence:
```lua
```lua
if chariotSquare.defender == nil or chariotSquare.defender == object.pCelts then
    local newChariot = civ.createUnit(object.uChariot, object.pCelts, chariotSquare)
```
Now, we want to give our `newChariot` a couple attributes.  We want to make sure it is not veteran (it won't be anyway, but this won't hurt), and we want to make sure it has no home city (I think if you don't do anything, the home city is determined the same way as if you used cheat mode to create the unit.)  For this, we set a couple of the keys for newChariot:
```lua
    newChariot.veteran = false
    newChariot.homeCity = nil
```
Putting this all together, we get
```lua
if chariotSquare.defender == nil or chariotSquare.defender == object.pCelts then
    local newChariot = civ.createUnit(object.uChariot, object.pCelts, chariotSquare)
    newChariot.veteran = false
    newChariot.homeCity = nil
end
```

Type this code into the `onTurn.onTurn` function.  It doesn't matter if it is before or after the code to change leader names.  All together, your `onTurn.lua` file should look like this:

```lua
local object = require("object")
local onTurn = {}
local evenTurnLeader = "Scipio"
local oddTurnLeader = "Fabius"
local chariotSquare = civ.getTile(37,15,0)
function onTurn.onTurn(turn)
    if turn % 2 == 0 then
        -- We only get here if the turn is even
        object.pRomans.leader.name = evenTurnLeader
    end
    if turn % 2 == 1 then
        -- We only get here if the turn is odd
        object.pRomans.leader.name = oddTurnLeader
    end
    if chariotSquare.defender == nil or chariotSquare.defender == object.pCelts then
        local newChariot = civ.createUnit(object.uChariot, object.pCelts, chariotSquare)
        newChariot.veteran = false
        newChariot.homeCity = nil
    end
end

return onTurn
```
Save `onTurn.lua`, load the testing save, and test the new code.  Make sure you've revealed all units on the map.  Be sure to test with no defender on the tile, with a Celtic unit on the tile, and with a unit from a different tribe on the tile.

### Using "and"

Now that we're creating our chariot, we'd like to add the condition that Milan is controlled by the Celts.  To find the owner of a city, we use `city.owner`.  We will get the city Milan from the object table.  Since Milan was in the scenario when we constructed the table, we don't have to add anything.  By default, `object.lua` doesn't create references to city objects (that section is wrapped in an `if false then` statement), and we will see the reason before we finish testing this event.  Instead, we will use `object.lMilan` as our reference name, which will give us the tile Milan is located on.

To check if Milan is owned by the Celts, we can use:
```lua
object.lMilan.city.owner == object.pCelts
```

To combine this with our check to see if the square is available to place a chariot, we use the `and` operator.  `A and B` returns `true` if both `A` and `B` are `true`, and `false` otherwise.  That is:

```lua
true and false --> false
false and true --> false 
true and true --> true
false and false --> false
```
Putting our code together, we get
```lua
if object.lMilan.city.owner == object.pCelts and
    (chariotSquare.defender == nil or chariotSquare.defender == object.pCelts) then
    local newChariot = civ.createUnit(object.uChariot, object.pCelts, chariotSquare)
    newChariot.veteran = false
    newChariot.homeCity = nil
end
```

Note the use of parentheses around `(chariotSquare.defender == nil or chariotSquare.defender == object.pCelts)`.  These ensure that the `or` operation is performed before the `and` operation, just as the parentheses in `5*(4+3)` ensures the addition is performed before the multiplication.  If you need it, here is a page on [operators precedence for Lua](https://www.tutorialspoint.com/lua/lua_operators.htm), but I would recommend just using parentheses to denote what should be computed first, rather than memorizing whether `and` or `or` is computed first.

Let us now test this code.  You may have found it inconvenient to test the between turns execution point by allowing all tribes to move their units.  Fortunately, the Lua Scenario Template provides another way to test this code.  Open the Lua Console, and run the following command `console.onTurn()`.  A chariot should be created Southwest of Milan.

Now, delete the units in Milan, and capture it with a Roman unit.  Using `console.onTurn()` once more, we now see that the chariot is no longer being created, so our event appears to be working as desired.  But, we're not done yet.

Next, we will delete Milan, and try this again.  To do so, move the cursor over Milan, and press `Shift+D` to disband the city.  You will have to disband/delete the units there first.  Run `console.onTurn()` once more.  This time, you will get an error:

```
...cRome\LuaTriggerEvents\UniversalTriggerEvents\onTurn.lua:15: attempt to index a nil value (field 'city')
stack traceback:
	...cRome\LuaTriggerEvents\UniversalTriggerEvents\onTurn.lua:15: in function 'UniversalTriggerEvents\onTurn.onTurn'
	...Scenarios\ClassicRome\LuaTriggerEvents\triggerEvents.lua:102: in function 'triggerEvents.onTurn'
	...op\drive_c\Test of Time\Scenarios\ClassicRome\events.lua:152: in upvalue 'onTurnFn'
	...op\drive_c\Test of Time\Scenarios\ClassicRome\events.lua:160: in function <...op\drive_c\Test of Time\Scenarios\ClassicRome\events.lua:160>
	(...tail calls...)
```

The key part of this error is the following line:
> onTurn.lua:15: attempt to index a nil value (field 'city')

On line 15 in `onTurn.lua`, we "attempt to index a nil value."  What this means is that we're trying to use a key to get a value, but instead of doing this on a table or civilization object, we're trying to do this on a `nil`, which isn't allowed.  Line 15 (perhaps a different line when you try this) is

```lua
    if object.lMilan.city.owner == object.pCelts and
```
(I split the condition into 2 lines, so your corresponding line might have more on it.)

The problem here is that, since Milan has been deleted, `object.lMilan.city` yields `nil`, and then we're trying to that with the `owner` key.  The fact that cities can be destroyed (or disbanded) is the reason why `object.lua` doesn't create keys for cities by default.  You can prevent city destruction in the `rules.txt` through `@COSMIC2` and the City Population Loss Patch:

>Enables the @COSMIC2 keys 'CityPopulationLossAttack' and 'CityPopulationLossCapture'.
>
>They determine whether a city suffers population loss after a successful attack/capture. Valid values are 0, 1 and 2:  
>0 - default, will lose population;  
>1 - will not lose population;  
>2 - will lose population, except when size=1 and the loss would destroy the city

### "Guarding" Against Errors with "and"

So, given that our scenario *does* allow for cities to be destroyed, how do we avoid this kind of error?  The solution is to check to make sure that `object.lMilan.city` is, in fact, a `cityObject` before we index it with `owner`.

One thing we could do is to have 2 levels of `if statement`, where the first level checks if `object.lMilan.city` is a city (we can use `civ.isCity` for that), and the second level runs our event.  It would look something like this:
```lua
if civ.isCity(object.lMilan.city) then
    if object.lMilan.city.owner == object.pCelts and
        (chariotSquare.defender == nil or chariotSquare.defender == object.pCelts) then
        local newChariot = civ.createUnit(object.uChariot, object.pCelts, chariotSquare)
        newChariot.veteran = false
        newChariot.homeCity = nil
    end
end
```

This is a bit cumbersome, but, fortunately, we do have an alternative. The Lua `and` and `or` operators employ "short circuiting" .  What that means is that if Lua knows what the result of `and` or `or` will be based on the value to the left, it will not evaluate the value to the right. That is,

```lua
false and expression --> false, so expression not evaluated
true or expression --> true, so expression not evaluated
```
We still need to use another aspect of the Lua logical operators: everything except `nil` and `false` is considered true, including the `cityObject`.  This, combined with the fact that `tile.city` returns either a `cityObject` or `nil`, means we can avoid indexing a nil value by using the following expression:
```lua
object.lMilan.city and object.lMilan.city.owner == object.pCelts
```
To see why this works, let us go through each "step" of evaluating this expression, first with Milan existing, then with Milan not existing.
```lua
object.lMilan.city and object.lMilan.city.owner == object.pCelts
(milanTileObject).city and object.lMilan.city.owner == object.pCelts -- evaluate object.lMilan
(milanCityObject) and object.lMilan.city.owner == object.pCelts -- evaluate milanTileObject.city
milanCityObject and milanTileObject.city.owner == object.pCelts -- milanCityObject counts as true, so start evaluating to the right of and; evaluate object.lMilan
milanCityObject and milanCityObject.owner == object.pCelts -- evaluate milanTileObject.city
milanCityObject and milanOwnerObject == object.pCelts -- evaluate milanCityObject.owner, this is where we would get an error if Milan didn't exist and there was no short circuiting
milanCityObject and milanOwnerObject == celtsTribeObject -- evaluate object.pCelts
milanCityObject and true -- evaluate milanOwnerObject == celtsTribeObject, true assuming Milan is owned by the Celts
true -- evaluate milanCityObject and true, since milanCityObject counts as true, so true and true
```
It may occur to you to wonder how we knew to skip over the `==` while evaluating, other than it was kind of "obvious."  For that, we would turn to this page again, [operators precedence for Lua](https://www.tutorialspoint.com/lua/lua_operators.htm) and see that "Unary Operators" (operators on one object) are checked before "Equality Operators" (`==`,`~=`).

Now, consider the situation where Milan doesn't exist.
```lua
object.lMilan.city and object.lMilan.city.owner == object.pCelts
(milanTileObject).city and object.lMilan.city.owner == object.pCelts -- evaluate object.lMilan
nil and object.lMilan.city.owner == object.pCelts -- evaluate milanTileObject.city
false -- nil and always returns false, so Lua "short circuits" the evaluation, and returns false.  
```
Here, we see that short circuiting has effectively "guarded" us from accidentally evaluating an expression that would result in an error, and returned the `false` value that we want anyway.  (Strictly speaking, it returns nil, not false, but that will be discussed in a later lesson, and we're interested in the logic here.)

Add this "guarding" code to `onTurn.lua`, and test again
```lua
if (object.lMilan.city and object.lMilan.city.owner == object.pCelts) and
    (chariotSquare.defender == nil or chariotSquare.defender == object.pCelts) then
    local newChariot = civ.createUnit(object.uChariot, object.pCelts, chariotSquare)
    newChariot.veteran = false
    newChariot.homeCity = nil
end
```
Note: the parentheses around `(object.lMilan.city and object.lMilan.city.owner == object.pCelts)` were not strictly necessary, but they make it clear what we are checking.

Test the events again, with Celts owning Milan, Romans owning Milan, and Milan destroyed.

You can read a bit more about short circuiting in general [here](https://blog.webdevsimplified.com/2019-10/what-is-short-circuiting/), if you are interested.

## Next Lesson: [Loops](Loops.md)

[&larr;Building Our First Event](BuildingFirstEvent.md) | [Home](index.md) | [Loops&rarr;](Loops.md)