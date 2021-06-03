

<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[&larr;MoreLogic](MoreLogic.md) | [Home](index.md) | [Example Events&rarr;](Examples1.md)


# Example Events

We now know enough about how Lua works to start writing more events. We will continue using the Classic Rome Scenario.  Your existing scenario should be fine, but if you think you are running into problems due to an earlier mistake, you can download a good version of events [here](ClassicRome3.zip).

[Capturing an Enemy Unit](#capturing-an-enemy-unit)  
[Distance in Civilization II](#distance-in-civilization-ii)  
[Finding the Nearest City](#finding-the-nearest-city)  
[Counting Things](#counting-things)  
[Specifying a Region](#specifying-a-region)  

## Capturing an Enemy Unit

In many situations, we would like to be able to "capture" units instead of kill them. In an Age of Sail scenario, for example, we might like to capture a defeated ship instead of sink it. Perhaps we would like to "plunder" a city or unit, and have a "treasure" to transport home to be disbanded. Maybe we would like to capture "slaves".

In our Classic Rome scenario, we will allow military units to "capture" settlers instead of kill them. To do this, we will once again use the [Unit Killed in Combat](LuaExecutionPoints.md#unit-killed-in-combat) execution point. 

The first step of this unit killed event is to activate it when a settler is killed. Therefore, we wrap everything in an appropriate if statement:

```lua
if loser.type == object.uSettlers then
end
```

Now, we create the unit at the location of the winner:

```lua
if loser.type == object.uSettlers then
    local newSettler = civ.createUnit(object.uSettlers, winner.owner, winner.location)
end
```
As it stands, this code will create a settler for the winning unit's tribe at that unit's location.  Add this code to the appropriate file and try it.  (If you don't know where, reference the [Unit Killed in Combat](LuaExecutionPoints.md#unit-killed-in-combat) execution point documentation.)

If this is the entire function, we do not need to include `local newSettler =` in the code.  However, we might like to change the characteristics of the settler that has just been created.

The `civ.createUnit` function sets the home city to the 'nearest' city, the same way a city is assigned to a unit created via the cheat menu. Perhaps we do not like this, and would like for the new settler not to have a home city. Perhaps, also, we wish for the created unit not to have any movement points for this turn, to give the other side a chance to liberate the settlers again. Finally, perhaps we would like the new settler to have only 5 hitpoints remaining after capture.  Use what you have learned and any resources at your disposal (such as the [TOTPP Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/)) to make these three changes to the newly created settler.

<details><summary> Solution </summary>

We add the following three lines:

<code>
newSettler.homeCity = nil
newSettler.moveSpent = 255
newSettler.damage = newSettler.type.hitpoints - 5
</code>


Now let us look at each line to make sure we understand.


<code>
newSettler.homeCity = nil
</code>


Not much to say about this. <code>nil</code> is how to make a unit not have a home city.


<code>
newSettler.moveSpent = 255
</code>


This will guarantee that the unit can't move, since 255 is the maximum amount of movement points a unit can have. Another valid option is


<code>
newSettler.moveSpent = newSettler.type.move
</code>


Which will set the expended movement points equal to the maximum movement points the unit has.  (Note that both <code>unit.moveSpent</code> and <code>unitType.move</code> use <a href="Jargon.html#atomic-movement-points"> "atomic" movement points</a>.)  Beware, however, that this will not work for a ship whose owner has Lighthouse, Magellan's or Nuclear Power, since that unit will have extra movement points that are not caught by <code>unitType.move</code>.  (You could, however, use <a href="GeneralLibrary.html#genmaxmoves"> <code>gen.maxMoves</code></a>.)


<code>newSettler.damage = newSettler.type.hitpoints - 5</code>


We can't use <code>unit.hitpoints</code>, since that is only a 'get' command. We must set damage, and in order to do that, we must get the hitpoints for the settler type, which we do by newSettler.type.hitpoints, and then subtract 5 from that for the answer.

Also, using <code>object.uSettlers</code> in place of <code>newSettler.type</code> is fine.

All together, then, is

<code>
if loser.type == object.uSettlers then
    local newSettler = civ.createUnit(object.uSettlers, winner.owner, winner.location)
    newSettler.homeCity = nil
    newSettler.moveSpent = 255
    newSettler.damage = newSettler.type.hitpoints - 5
end
</code>
</details>

## Distance in Civilization II

For our next event, we are going to find the distance to the nearest city.  Before we do that, however, we need to talk about what we mean by "distance."

At some point in school, you probably learned that the distance between two points (x<sub>1</sub>,y<sub>1</sub>) and (x<sub>2</sub>,y<sub>2</sub>) is given by the formula

<span style="font-size: 20px">distance = &radic;</span><span style="border-top: 1px solid #000000; font-size: 17px;">(x<sub>1</sub>-x<sub>2</sub>)<sup>2</sup>+(y<sub>1</sub>-y<sub>2</sub>)<sup>2</sup></span>

This is known as the ["Euclidean Distance"](https://en.wikipedia.org/wiki/Euclidean_distance), and, generally speaking, when a Civ II game mechanic needs a distance measure of some sort, it will use an approximation of this calculation.
Moving "diagonally" (using the 1,3,7, or 9 key) has a cost of 1, while moving horizontally or vertically (using the 2,4,6, or 8 key) has a distance of 1.5.
Using the above formula, the horizontal and vertical distances "should" be about 1.41 if a diagonal move is scaled to have a distance of 1.
However, this means that when units move, the "distance" they move in one "step" will be different depending on the direction of the step.
This can make thinking about distance in Civ II difficult, especially if you want to think in terms of unit "steps".

It turns out that mathematicians have other notions of "distance" than <span style="font-size: 17px">&radic;</span><span style="border-top: 1px solid #000000; font-size: 14px;">(x<sub>1</sub>-x<sub>2</sub>)<sup>2</sup>+(y<sub>1</sub>-y<sub>2</sub>)<sup>2</sup></span>, and one of them happens to be extremely convenient for Civilization II:

<span style="font-size: 20px">distance = |x<sub>1</sub>-x<sub>2</sub>|+|y<sub>1</sub>-y<sub>2</sub>|</span>

This is typically known as the ["Taxicab Distance"](https://en.wikipedia.org/wiki/Taxicab_geometry) or "Manhattan Distance," because it is the distance between two points when you have to travel on a grid road system. Under this distance system, all unit "steps" have a distance of 2, regardless of direction.  Simply dividing by 2 changes the distance scale so that adjacent squares have a "distance" of 1 between them.

"Circles" (by which we mean all the points which are located at a specified distance from a "center") are "diamond" shaped by this distance measure, which is the same shape as all the tiles an air unit can reach in a turn from its own tile.

If you need a distance measure in your scenario, it is highly likely that the Taxicab distance will be as good, if not better better, than the ordinary "Euclidean" distance you are used to. I'm pretty sure that every time I needed a "distance" in Over the Reich, I used the Taxicab distance.

The General Library provides the following distance functions:  
[`gen.distance`](GeneralLibrary.md#gendistance)  
[`gen.tileDistance`](GeneralLibrary.md#gentiledist)    
[`gen.gameMechanicDistance`](GeneralLibrary.md#gengamemechanicdistance)  

## Finding the Nearest City

Now, we're going to build an event to plunder caravans.  In this event, when a caravan is killed, the nearest friendly city gets some shields added to the production box.  In order to implement this event, 

## Counting Things

## Specifying a Region


[&larr;MoreLogic](MoreLogic.md) | [Home](index.md) | [Example Events&rarr;](Examples1.md)