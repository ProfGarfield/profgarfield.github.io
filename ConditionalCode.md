[&larr;Building Our First Event](BuildingFirstEvent.md) | [Home](index.md) 

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

Now, let us make a more complicated event.  We will give the Celts a bonus against the Romans.  Our goal is that if the Celts own Milan and the square (37,15) is either empty or defended by the Celts, then the Celts get a chariot at the square every turn.



## Next Lesson: 

[&larr;Building Our First Event](BuildingFirstEvent.md) | [Home](index.md) 