Outline
    Hello World
    Use the Template to Introduce Lua
    Run the make object script
    Introduce data types
    Use data types for basic can build settings
    Basic (non civ II) programming with Lua








# Data Types and Storing Data

The Test of Time Patch Project has provided support for Lua events because they are much more powerful than the old style 'macro' events.  The reason for this is that Lua is a fully fledged programming language, and so can interact with the game in far more flexible ways than were programmed into the 'macro' events system.  However, to use that power, we must learn the language of the computer.

Our first step is to understand how to create, store, and access data.  Without this, our computations would be very limited indeed, and not particularly useful.  Perhaps more importantly for our purposes, it will allow us to tap the large scenario making power of build list settings.

## Local Variables

In programmer speak, a 'variable' is a location in memory that stores some data and can be re-assigned when desired.  Earlier, we had a look at the `canBuildSettings.lua` file (found in `LuaRulesEvents`).  Here is some relevant code:

```Lua
local unitTypeBuild = {}
unitTypeBuild[object.uLegion.id]={allImprovements={object.iBarracks}}

local improvementBuild = {}
local wonderBuild = {}
```
Let's unpack this line more closely:
```Lua
local unitTypeBuild = {}
```
The `local` keyword tells the Lua Interpreter that we want to define a new space in memory that we can refer to later.  `unitTypeBuild` is the name that we will use to refer to that piece of memory.  The `=` symbol tells the interpreter that we will be assigning whatever is to the right hand side of the `=` to the location in memory denoted by the left hand side.  The `{}` tells the Lua interpreter to create a new `table`, and to provide the 'name' of that table to be stored in the `unitTypeBuild` variable.

If you want to change what is currently stored in an already existing local variable, you omit the `local` keyword.  For example:

```Lua
local myVariable = 5
myVariable = 7
```
This declares a local variable called `myVariable`, and assigns it a `5` as the value.  On the next line, the existing `5` in `myVariable` is discarded and replaced with a `7`.

"Local" variables get their name from the fact that they can only be accessed from certain parts of your code.  We'll learn more about exactly how they work, but for now, know that if you use a local variable, you do not need to worry about using a variable with the same name in another file.

[This page](https://www.lua.org/pil/1.3.html) tells what is a valid variable name. Basically, "any [sequence] of letters, digits, and underscores, not beginning with a digit." There are some reserved words as well (they all appear as bold dark blue in Notepad++).

## Lua Tables

The most basic way to store data in Lua is by using local variables.  However, we can also store data 'in' Lua `tables`, which are Lua's data type for storing structured data.

In Lua, a local variable can only store one 'piece' of data at a time.  This 'piece' can be simple like a `number` or complicated like a `string` (sequence of characters) or even a `function` (sequence of instructions).  Sometimes, we find it very convenient to group multiple pieces of data together, and we can use tables for that.

Tables are also useful if we need to store a large amount of data.  One reason for this is that Lua limits the number of local variables to 200 per function.  In nearly all circumstances, this is plenty, but it does create a problem if you are storing large numbers of parameters or names of objects, such as we have in `object.lua`.  

Another reason for using tables is that we don't need to know in advance how much memory will be needed by our program.  Our program can allocate extra space in memory when it is needed, and access it based on the results of other computations.  Using local variables, the programmer must know in advance when the data will be used.

Now that we know a little bit about why we need tables, how do we actually use them?  First, we should know what a table actually does.  A table is an association between `keys` (we'll restrict our keys to `numbers` and `strings`, but they can be other data types also) and `values` (any data type), with each key in the table associated with a single value.

The first thing we should do is to create an empty table.  Creating a table is done with curly braces `{}`.  Let us return to `canBuildSettings.lua`, and look once again at the table constructor line:

```Lua
local unitTypeBuild = {}
```
As we saw above, this line creates a new table, and stores that table (though, as we'll see later, it is better to think of it as storing the name of the table) in the local variable named `unitTypeBuild`.




# Programming Basics