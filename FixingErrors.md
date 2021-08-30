
<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[&larr;Example Events](Examples1.md) | [Home](index.md) | 

# Fixing Coding Errors

You will make mistakes when writing code.  This will continue (but a bit less frequently) even after you gain a lot of experience.  It is normal, so you must learn how to interpret and correct errors.  We have already fixed some errors, but now that we can write and understand more complex code, we can explore this topic more closely.

For our purposes, there are three classes of errors we can make when writing code in lua. The first kind are "syntax errors" that will be caught when you try to load a script into the Lua interpreter. The TOTPP lua interpreter will warn you of the first error and print the kind of error it thinks it is in the console, along with a line number, where it realized the error exists. Usually, this is the result of forgetting to insert a '`do`' or '`then`' or a comma, or to close a table, or string, or something similar. The fix will usually be at the line number specified in the error message, and if not, somewhere close by.

The second class of errors are the "run time errors." Code that passed the "syntax check" turns out to be bad at run time, usually because the wrong type of value was passed to a function. Often, these happen because you misspell a variable name (either at use or at assignment), or you accidentally misused a function.

The final class of errors are the "logic errors." Logic errors mean that your code is running properly and without run time errors, but it is not doing what you want it to do. These are caught by carefully testing your code and fixed by carefully analyzing your algorithm for performing the event to make sure that your proposed solution actually solves the problem and then by analyzing your code to make sure it actually does what your proposed solution requires. One thing to try if you have a logic error that you can't figure out how to correct is to put 'print' at various places in your code to figure out what is being executed and on what arguments. You can also ask for help on the forums; sometimes a fresh eye can spot mistakes that you missed.

You may wish to download [this sample scenario folder](#ClassicRome4.zip), so that all your code is good before adding the buggy code in that we will use for this exercise.

## Carthaginian Surrender Event

Let us write an event that represents Carthaginian Surrender in a Punic War.  If more than 50% of the population of North West Africa is controlled by the Romans, the Carthaginians "surrender," and the following happens:

All Romans troops are teleported out of North West Africa (which will be defined as a polygon) and back to Rome, and all Roman cities in North West Africa are given to the Carthaginians.  All Carthaginian troops outside of North West Africa are teleported to North West Africa, and distributed evenly among the cities there.  All Carthaginian cities outside North West Africa are given to the Romans, and each of those cities are given a free Phalanx to defend.  For simplicity, all units homed to transferred cities will be made NONE units.

For this event, we first decide on an [execution point](#LuaExecutionPoints.md).  We could either check each time a city is captured, or we could check periodically (say between turns or after production).  We will check every time a city is captured by the Romans.  For that, we will use the `onCityTaken.lua` file, found in the `UniversalTriggerEvents` directory.

