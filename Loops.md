<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[&larr;Conditional Code](ConditionalCode.md) | [Home](index.md) | 

# Loops

Often, we want to execute the same lines of code many times, perhaps with small changes to the code each time. Cutting and pasting the same lines of code dozens or hundreds (or more) of times is impractical. Instead, we use a "loop."

## While Loops

Perhaps the easiest kind of loop to understand is the "while" loop.

```lua
while condition do
-- instructions
end
```
When the lua interpreter reaches the line with 'while', it checks if the condition evaluates to true (the same way an if statement would). If the condition is false, the interpreter skips everything between 'do' and the corresponding 'end' and continues executing code from there.

If the condition evaluates to true, the lua interpreter executes all the code between 'do' and 'end' and then jumps back to the 'while' line and checks the condition again.  We call the code within the loop the "body" of the loop. The lua interpreter will keep executing the code in the loop until the condition becomes false. Be careful when writing while loops, because if the condition doesn't eventually become false, the lua interpreter will run the code in the loop forever (and you will have to stop it by closing the game).

The key word `break` can also be used to immediately exit any loop, and `return` can be used to stop the entire function and return a value.

We can use a loop to calculate [factorials](https://en.wikipedia.org/wiki/Factorial), which you may have learned about in school.  In case you didn't, or you forgot, a factorial is indicated by a !, and tells you to multiply all integers between 1 and the given number.  That is,
```
N! = N*(N-1)*(N-2)*...*3*2*1
```
We can calculate factorials with the following function:
```lua
local function factorial(N)
    local productSoFar = 1
    local factor = 1
    while factor <= N do
        productSoFar = factor*productSoFar
        factor = factor + 1
    end
    return productSoFar
end
print(factorial(1))
print(factorial(2))
print(factorial(3))
print(factorial(4))
print(factorial(5))
print(factorial(6))
```
Go to the [Lua demo](https://www.lua.org/cgi-bin/demo), and run this code.  You will see that it prints the factorial values from 1 to 6.  Now, let us examine the actual function.

```lua
    local productSoFar = 1
```
Here, we are keeping track of our computation.  We will see this sort of variable a lot when dealing with loops.  Since we are multiplying, we start with 1 (if we were adding things, we would usually start with 0).

```lua
    local factor = 1
```
This is the number that we will be multiplying each time, starting at 1 and progressing to N.

```lua
    while factor <= N do
```
Here, we check if the value of the local variable `factor` is less than or equal to `N`.  If it is, we execute the body of the loop, if not, we proceed to the code after `end`.

```lua
        productSoFar = factor*productSoFar
        factor = factor + 1
    end
```
This is the body of the loop.  It multiplies the `productSoFar` by the factor, to produce a new `productSoFar`.  The body also increments `factor`, so that we can "visit" all the numbers between 1 and `N`, and multiply them into the `productSoFar`.

```lua
    while factor <= N do
```
Once `factor` > `N`, the loop no longer executes, and `productSoFar` has now has the product of 1 through `N`.

```lua
    return productSoFar
end
```
Since `productSoFar` now contains the value we are trying to compute, we simply return it.

If you want a "while" loop that will always execute the body at least once, Lua offers [`repeat...until`](https://www.tutorialspoint.com/lua/lua_repeat_until_loop.htm) loops.  You don't *need* them, so I won't explain them in these lessons, but they are occasionally more convenient than a regular "while" loop.

## Numeric For Loops

Lua offers a couple "flavours" of "for" loops.  We will first discuss the "numeric" for loop.

```lua
for index=startVal,stopVal,increment do
-- instructions
end
```
This kind of for loop defines a variable (in this case `index`) which can be used in the loop instructions. The loop `index` will be initialized to `startVal`, and after every loop will be incremented by the amount `increment`. Once `index` > `stopVal`, the loop body is no longer executed and the program moves on.

If `increment` is omitted, 1 is used as the `increment`. If the `increment` is less than 0, the loop stops when `index` < `stopVal`.

Returning to our factorial example, we could write it as:

```lua
local function factorial(N)
    local productSoFar = 1
    for factor=1,N do
        productSoFar = factor*productSoFar
    end
    return productSoFar
end
for i=0,12 do
    print(factorial(i))
end
```
First, notice how we could now easily group our `print` lines into a loop.

Let us now have a closer look at this version of the factorial code:

```
    local productSoFar = 1
```
This line serves the same function as it did in the while loop.
```lua
    for i=1,N do
```
This tells us that the body of the for loop will be executed for every integer between 1 and `N` (since there is no increment value), and that integer will be represented in the body of the for loop by the `factor` variable.).
```lua
        productSoFar = factor*productSoFar
    end
```
The product so far is multiplied by the factor.  Since the body will execute for every factor between 1 and `N`, every factor will be included in productSoFar at some point.  Therefore, when the loop finishes, productSoFar will be the answer we want.  Hence, it can be returned.
```lua
    return productSoFar
end
```

## Generic For Loop with Pairs

This kind of for loop operates on tables, and is used in the following way:
```lua
for key,value in pairs(table) do
    --instructions
end
```
This will execute the loop body for each key and value pair in the table. The order of the execution is whatever is most convenient for the lua interpreter.  It is not 'random', but it is also not necessarily in the order you would expect. If you need a particular order,use integers as keys and write either a numeric for loop or a while loop (or [look up how to use `ipairs`](https://stackoverflow.com/questions/55108794/what-is-the-difference-of-pairs-vs-ipairs-in-lua#55109411)).

Let us have an event that creates barbarian units on certain tiles, if those tiles are empty or already contain barbarians. We'll specify each location using a table with two entries (since we only have one map) and the unit with a ToTPP unittype object. Since we'll be using a generic for loop, we don't have to worry about the index, so we'll leave the defaults in place.

Copy the following code into the Between Turns execution point. The loop should go after the chariot code, but within `onTurn.onTurn`.

```lua
local barbTable = {
{location = {44,12}, unit = object.uArchers},
{location = {35,39}, unit = object.uHorsemen},
{location = {64,16}, unit = object.uHorsemen},
}-- close barbTable

for __, barbCreate in pairs(barbTable) do
    local tile = civ.getTile(barbCreate.location[1],barbCreate.location[2],0)
    if tile.defender == object.pBarbarians or tile.defender == nil then
        civ.createUnit(barbCreate.unit,object.pBarbarians,tile)
    end
end
```
Let us look at the loop:
```lua
for __, barbCreate in pairs(barbTable) do
```
This loop will look at every key/value pair in `barbTable`, in some order that we do not know.  Within the loop body, the variable name for the key will be `__` (two underscores), which is a typical name to use in this kind of loop if you're not using the key in the body.  Meanwhile, `barbCreate` will be the variable name for the values, which in this case will be tables.

```lua
    local tile = civ.getTile(barbCreate.location[1],barbCreate.location[2],0)
```
Our `barbCreate` value has a `location`, which represents a tile.  However, since it is not a tile object, we must change it to be one.  `barbCreate.location` returns the table representing the tile, so `barbCreate.location[1]` gives the x coordinate, while `barbCreate.location[2]` gives the y coordinate.  The z coordinate is known to be 0.  We use `civ.getTile` to convert the coordinates to a `tileObject`, which we store in the local variable called `tile`.
```lua
    if tile.defender == object.pBarbarians or tile.defender == nil then
        civ.createUnit(barbCreate.unit,object.pBarbarians,tile)
    end
```
This section of code should be familiar from the [previous lesson](ConditionalCode.md#using-and-and-or).  The only difference is that we are getting the unit type from the `barbCreate` table.

Test this code using `console.onTurn()`.  Make sure to test one or two tiles to make sure that units won't be created under a foreign unit.

## Generic For Loops With Iterators

The final type of "for loop" is also considered a "Generic" for loop and it is used with a special type of function called an "iterator." Iterators are a part of Lua (in fact `pairs` technically creates an iterator) and can be written by the user, but for our purposes we will get iterators when using certain ToTPP built in functionality.

A generic for loop using an iterator looks like this:
```lua
for object in iterator do
    -- loop body
end
```

These functions return iterators, and you will probably use them quite a bit:

>iterateCities  
>civ.iterateCities() -> iterator  
>Returns an iterator yielding all cities in the game.  

>iterateUnits  
>civ.iterateUnits() -> iterator  
>Returns an iterator yielding all units in the game.  

>units (get)  
>tile.units -> iterator  
>Returns an iterator yielding all units at the tile's location.  

For this example, let us make it difficult for an army to cross the desert.  Between turns, we will cut in half the remaining hitpoints of all units in desert terrain (rounded up, so that the unit will always have at least 1 hp).

```lua
for unit in civ.iterateUnits() do
    if unit.location.baseTerrain == object.bDesert then
        local newDamage = math.floor(unit.hitpoints/2)
        unit.damage = unit.damage+newDamage
    end
end
```
Let us again break down the the code here:
```lua
for unit in civ.iterateUnits() do
```
The function `civ.iterateUnits()` returns another function, which is the "iterator" over all the units in the game.  `unit` is the variable name for unit currently being processed in the body of the loop.

```lua
    if unit.location.baseTerrain == object.bDesert then
```
There are 3 different keys that extract terrain data from a tile.  `tile.baseTerrain` returns a `baseTerrain` object, which provides access to the aspects of the terrain type that don't change if there is a special resource on the tile or not.  Since we're not accounting for special resources in this example, this is the terrain data we want to check against.  `tile.terrain` returns a `terrain` object provides access to those parts of terrain data which change for special resources (terrain productivity and a few other 'housekeeping keys').  `tile.terrainType` is obsolete; ask in the [Scenario League Forum](https://forums.civfanatics.com/forums/civ2-scenario-league.428/) if you need information for some reason.
```lua
        local newDamage = math.floor(unit.hitpoints/2)
        unit.damage = unit.damage+newDamage
    end
```
A unit's heath is stored as "damage," not as remaining health.  `unit.hitpoints` will give us the remaining health of the unit, but it is not a "set" attribute, so we must set `unit.damage`.  We want to remove half of the unit's remaining hitpoints, so we add damage (`newDamage`) equal to half the unit's remaining hitpoints.  `math.floor` rounds down this damage.

Add this loop to `onTurn.onTurn`, and test the events once again.  When you place units in the desert, you will see their hitpoints drop until they have only 1 left, but it won't drop below that.









[&larr;Conditional Code](ConditionalCode.md) | [Home](index.md) | 