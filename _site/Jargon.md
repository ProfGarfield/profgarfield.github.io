<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>

[Home](index.md)

# Civilization II Lua Jargon

This is a glossary of terms used to describe aspects of programming with Lua for Civilization II.  The main purpose of this page is to be able to use jargon and link here, rather than explaining exactly what it means in place.

### Atomic Movement Points

In Civilization II, a unit can move a fraction of a movement point.  For example, in a standard game, a unit requires 1/3 of a movement point to move along a road.  However, the game's data for movement points does not use fractional values.  Instead, it multiplies all movement cost figures we see in game by a special value (`totpp.movementMultipliers.aggregate`), and keeps track of these values.  One of these movement points is an "Atomic Movement Point."  Atomic movement points are returned by `unitType.move` and `unit.moveSpent`.

#### Examples:
1. Standard Civilization II Game:  
    Road Multiplier: 3
    Rail Multiplier: Unlimited
    `totpp.movementMultipliers.aggregate`: 3  
    Settler Atomic Movement allowance: 3  
    Armor Atomic Movement allowance: 9
    Cost to move along road: 1
    Cost to move into plains: 3
    Cost to move into hills: 6
2. Alternate Transportation Multipliers:  
    Road Multiplier: 4  
    Rail Multiplier: 5  
    River Multiplier: 2  
    `totpp.movementMultipliers.aggregate`: 20  
    Settler Atomic Movement allowance: 20    
    Armor Atomic Movement allowance: 60  
    Cost to move along road: 5  
    Cost to move along rail: 4  
    Cost to move along river: 10  
    Cost to move into plains: 20  
    Cost to move into hills: 40  

