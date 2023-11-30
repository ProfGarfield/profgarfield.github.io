---
layout: page
title: nativeLuaDataTypes
tabTitle: nativeLuaDataTypes.lua Documentation
minTOC: 2
maxTOC: 3
---

# Data Types Native to Lua


This page contains a list of data types which are native to Lua.  They are not
based on features unique to the Test of Time Patch Project, so you can
refer to other online sources if you need information about these
data types.  Some of these data types are subsets of other data types,
but have a particular interpretation.




### nil

The 'nil' data type has a single value nil, and tends to represent the absence of a value. Nil is a data type which is native to Lua, and is considered 'falsy' in logical statements. Unassigned keys in a table return nil as their value.
<br>
[Programming in Lua, 2.1 -- Nil](https://www.lua.org/pil/2.1.html)
<br>
[Tutorialspoint Lua -- Data Types](https://www.tutorialspoint.com/lua/lua_data_types.htm)





### void

"Void" isn't a proper data type in Lua. Instead, it is an indication that a function or method is not returning a value at all. A function with a simple <code>return</code>, or without a <code>return</code> line will return (or, rather, not return) a "void", whereas <code>return nil</code> will return a proper nil value. If your function <em>never</em> returns useful information, returning "void" is appropriate. However, if your code <em>sometimes</em> returns useful data, it should return nil when it does not.





### boolean

A boolean is a data type native to Lua with exactly two possible values, <code>true</code> and <code>false</code>. These are often used when evaluating logical statements, but logical statements accept other values as well. All values except <code>false</code> and <code>nil</code> are considered 'truthy', even values such as 0 or the empty string.
<br>
[Programming in Lua, 2.2 -- Booleans](https://www.lua.org/pil/2.2.html)





### number

A number is a data type native to Lua, which allows numerical computations to be performed. Fundamentally, Lua does not have separate data types for integers and numbers with a component after the decimal point, so any integer is also a number.
<br>
[Programming in Lua, 2.3 -- Numbers](https://www.lua.org/pil/2.3.html)





### integer

An integer is a number without a fractional part. Unlike other programming Languages, Lua does not distinguish between integers and 'floating point' numbers. You can convert a number to an integer by using commands like <code>math.floor</code> and <code>math.ceil</code>.
<br>
[Programming in Lua, 2.3 -- Numbers](https://www.lua.org/pil/2.3.html)





### bitmask

A bitmask is an integer that is not meant to be interpreted as a number, but rather as a sequence of 1's and 0's (the binary representation of the number), with each 1 or 0 representing whether a condition is true or false. Bitmasks often have functions written to facilitate their manipulation. If none are available, Lua provides bitwise operators.</p><p>Typically, the leftmost bit (the bit representing the largest value) is interpreted as negative. Hence, the bitmask integer is not guaranteed to be positive.
<br>
[Lua 5.3 Reference Manual 3.4.2 -- Bitwise Operators](https://www.lua.org/manual/5.3/manual.html#3.4.2)
<br>
[Twos complement: Negative numbers in binary (Youtube Video)](https://www.youtube.com/watch?v=4qH4unVtJkE)





### id

An id number is a positive integer that corresponds to an object in the game or the rules.txt file. If you know what <em>kind</em> of object the id corresponds to, you can then use the id to get the specific item in question. The maximum value for an id will depend on its corresponding object. For example, the maximum id for a tribe object is 7, but (at least for programming purposes) there is no limit to the id number of a unit.





### string

A string is a data type native to Lua which consists of a sequence of characters. These often represent text to be displayed, but are also useful in other contexts. Strings are commonly used as keys in tables, since they make code more readable.
<br>
[Programming in Lua, 2.4 -- Strings](https://www.lua.org/pil/2.4.html)





### function

A function is a sequence of instructions, which frequently depend on values that are provided ("arguments"). In Lua, functions are considered values, and can be stored in variables or tables. They can also be supplied as arguments to other functions.
<br>
[Programming in Lua, 2.6 -- Functions](https://www.lua.org/pil/2.6.html)





### table

A table is a data type native to Lua, and links "keys" (usually numbers or strings) to "values" (any kind of data, including other tables). This is the only data structuring mechanism in Lua, and many of the data types documented here are simply tables with restrictions on their keys or values. If a key has not been assigned a value, the table returns nil as the corresponding value, and assigning nil as a value to a key removes that key from the table.
<br>
[Programming in Lua, 2.5 -- Tables](https://www.lua.org/pil/2.5.html)





### coroutine

A coroutine is a line of execution, with its own stack and its own local variables; but sharing global variables and mostly anything else with other coroutines. Coroutines are collaborative: A program with coroutines is, at any given time, running only one of its coroutines and this running coroutine only suspends its execution when it explicitly requests to be suspended.

[Programming in Lua, 9 -- Coroutines](https://www.lua.org/pil/9.html)

[Tutorialspoint Lua -- Coroutines](https://www.tutorialspoint.com/lua/lua_coroutines.htm)





### iterator

An iterator is a construct that enables a program to traverse the elements of a collection or container. Each time the iterator is called, a different element of the collection is provided. In practice, an iterator is usually used as part of a generic for loop:
```lua 
for unit in civ.iterateUnits() do
  civ.deleteUnit(unit)
end
```
<br>
[Tutorialspoint: Lua -- Iterators](https://www.tutorialspoint.com/lua/lua_iterators.htm)





### userdata

Userdata is a data type native to Lua which represents objects that are not part of the Lua language. This data type is an overall data type for Civilization objects, such as units, cities, and tribes, particularly when dealing with native Lua functions.  For example, <code>type(civ.getUnitType(0))</code> returns <code>"userdata"</code>. 
<br>
[Programming in Lua, 2.7 -- Userdata and Threads](https://www.lua.org/pil/2.7.html)







