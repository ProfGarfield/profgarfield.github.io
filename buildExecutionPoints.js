fs = require("fs")
autoDoc = require("./autoDocFunctions")

function wrapCode(codeType,codeBody) {
    return "```"+codeType+"\n"+codeBody+"\n"+"```"
}

const usageDepth = "#####"
const usageEmph = "**"
const codeWrapType = "lua"
const titleDepth = "###"
const titleEmph = "**"
const howToUseDepth = "####"
const howToUseSection = howToUseDepth+" Usage"

autoDoc.setTemplateDirectory("/home/thomas/Desktop/Link to Test of Time 16/Template")
const eventFilesAutoDoc = autoDoc.getAutoDocFromEventsFiles()
const consolidatedAutoDoc = autoDoc.getAutoDocFromConsolidatedEvents()
const discreteAutoDoc = autoDoc.getAutoDocFromDiscreteEvents()
const combatSettingsAutoDoc = autoDoc.getAutoDocSections("MechanicsFiles/combatSettings.lua")
const onInitiateCombatAutoDocCode = combatSettingsAutoDoc["onInitiateCombatMakeCoroutine"].paragraph
const onChooseDefenderAutoDocCode = combatSettingsAutoDoc["onChooseDefender"].paragraph
const defenderValueModifierAutoDocCode = combatSettingsAutoDoc["defenderValueModifier"].paragraph
const onCalculateCityYieldAutoDocCode = autoDoc.getAutoDocSections("MechanicsFiles/calculateCityYield.lua")["onCalculateCityYield"].paragraph
const eventsLuaAutoDoc = autoDoc.getAutoDocSections("events.lua")
const onLoadAutoDoc = eventsLuaAutoDoc["onLoad"].paragraph
const onSaveAutoDoc = eventsLuaAutoDoc["onSave"].paragraph
const onGetRushBuyCost = autoDoc.getAutoDocSections("MechanicsFiles/rushBuySettings.lua")["onGetRushBuyCost"].paragraph

const onGetFormattedDate = autoDoc.getAutoDocSections("MechanicsFiles/onGetFormattedDate.lua")["onGetFormattedDate"].paragraph

const customMusicSections = autoDoc.getAutoDocSections("LuaParameterFiles/customMusicIntegration.lua")

function consolidatedUsage(code,parameterDescription) {
    let result = usageDepth+" "+usageEmph+"consolidatedEvents.lua"+usageEmph+"\n"
    result += "Change this function: \n"+wrapCode(codeWrapType,code)+"\n"
    result += parameterDescription+"\n"
    return result
}

function fileUsage(fileName,code,parameterDescription) {
    let result = usageDepth+" "+usageEmph+
    fileName.replace(/\//g,"\\") +usageEmph+"\n"
    result += "Change this function: \n"+wrapCode(codeWrapType,code)+"\n"
    result += parameterDescription+"\n"
    return result
}

function discreteEventUsage(code,parameterDescription,executionPointTitle) {
    let result = usageDepth+" "+usageEmph+"Discrete Events"+usageEmph+"\n"
    result += "In any file in which you wish to register discrete events, you must require the Discrete Events Module:\n"
    result += wrapCode(codeWrapType,'local discreteEvents = require("discreteEventsRegistrar")')+"\n"
    result += "This is the example of a discrete "+executionPointTitle+" event within `discreteEvents.lua`:\n"
    result += wrapCode(codeWrapType,code)+"\n"
    result += parameterDescription
    return result
}

function standardImplementation(civScenFn) {
    return howToUseDepth+" Implementation\n"+"This execution point is provided by the Test of Time Patch Project function `"+civScenFn+"`."
}


const points = {}
const titles = {}


function buildQuick(title,commandKey,description,paramDescription,implementation) {
    let section = titleDepth+" "+titleEmph+title+titleEmph+"\n";
    section +=description+"\n";
    section +=howToUseSection+"\n";
    const consolidatedCode = consolidatedAutoDoc[commandKey];
    if (consolidatedCode) {
        section +=consolidatedUsage(consolidatedCode.paragraph,paramDescription)+"\n"
    }
    const fileSection = eventFilesAutoDoc[commandKey];
    if (fileSection) {
        section +=fileUsage(fileSection.fileName,fileSection.paragraph,paramDescription)+"\n"
    }
    const discreteCode = discreteAutoDoc[commandKey];
    if (discreteCode) {
        section +=discreteEventUsage(discreteCode.paragraph,paramDescription,title)+"\n"
    }
    if (implementation === "") {
        section +=standardImplementation("civ.scen."+commandKey)+"\n"
    } else {
        section += howToUseDepth+" Implementation\n\n"+implementation
    }
    section += "\n\n"
    return section 
}
function saveQuick(title,commandKey,description,paramDescription,implementation) {
    points[title] = buildQuick(title,commandKey,description,paramDescription,implementation);
    titles[title] = true;
}

function buildCustom(title,fileName,description,usage,implementation) {
    let section = titleDepth+" "+titleEmph+title+titleEmph+"\n"
    section +=description+"\n"
    section +=howToUseSection+"\n"
    section +=usageDepth+" "+usageEmph+fileName+usageEmph+"\n"
    section +=usage+"\n"
    section += howToUseDepth+" Implementation\n\n"+implementation + "\n"
    return section
}
function saveCustom(title,fileName,description,usage,implementation) {
    points[title] = buildCustom(title,fileName,description,usage,implementation)
    titles[title] = true
}

function buildStandard(title,fileName,description,consolidatedCode,fileCode,discreteCode,paramDescription,civScenFn) {
    let section = titleDepth+" "+titleEmph+title+titleEmph+"\n"
    section +=description+"\n"
    section +=howToUseSection+"\n"
    section +=consolidatedUsage(consolidatedCode,paramDescription)+"\n"
    section +=fileUsage(fileName,fileCode,paramDescription)+"\n"
    section +=discreteEventUsage(discreteCode,paramDescription,title)+"\n"
    section +=standardImplementation(civScenFn)+"\n"
    return section 
}

function saveStandard(title,fileName,description,consolidatedCode,fileCode,discreteCode,paramDescription,civScenFn) {
    points[title] = buildStandard(title,fileName,description,consolidatedCode,fileCode,discreteCode,paramDescription,civScenFn)
    titles[title] = true
}

/*
saveStandard("Unit Activation","EventsFiles\onActivateUnit.lua",
`This code is executed whenever a unit is activated or has moved but still has movement points left.
In \`LuaParameterFiles\parameters.lua\`, the field \`civ.scen.compatibility.activateUnitEveryMove\` is
set to true.  If this is not done (or in old versions of the Test of Time Patch Project), human
units don't execute the registered activation code after moving.
`,
`
-- Unit Activation
--Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. \`source\` is \`true\` if activated by keyboard or mouse click, \`false\` if activated by the game itself. \`repeatMove\` is \`true\` if it's a repeat activation caused by moving, \`false\` otherwise.
function events.onActivateUnit(unit,source,repeatMove)
    --civ.ui.text("Unit activation consolidated test")

end
`,
`
--Registers a function to be called every time a unit is activated. The callback takes the unit activated as a parameter, and the source of unit activation. \`source\` is \`true\` if activated by keyboard or mouse click, \`false\` if activated by the game itself. \`repeatMove\` is \`true\` if it's a repeat activation caused by moving, \`false\` otherwise.
function register.onActivateUnit(unit,source,repeatMove)
    --civ.ui.text("unit activation separate file")

end
`,
`
discreteEvents.onActivateUnit(function(unit,source,repeatMove)
    -- event code
end)
`,
`
The \`unit\` parameter is the unit that has been activated.

The \`source\` parameter is \`true\` if the unit was activated by keyboard or mouse, and
\`false\` if it was activated by the game itself.

The \`repeatMove\` parameter is \`true\` if the execution point is triggered by a repeated activation.
`,"civ.scen.onActivateUnit")


points["Get Rush Buy Cost"] =
`
### **Get Rush Buy Cost**


Called when calculating the cost to rush-buy a city's current production. Returns an integer which is the cost to rush-buy the item currently in production.

${howToUseSection}

${usageDepth} ${usageEmph}MechanicsFiles\\rushBuySettings.lua${usageEmph}

To change the rush-buy cost, change the returned value of 
\`\`\`lua
--Registers a function that is called when calculating 
--the cost to rush-buy a city's current production.
--It takes the city and the cost as calculated by the
--game as parameters. Returns an integer representing the new costs.
function register.onGetRushBuyCost(city,cost)
    return cost
end
\`\`\`
The \`city\` parameter is the city where the current production is to be rushed.

The \`cost\` parameter is the cost as calculated by the game.

${howToUseDepth} Implementation

This is implemented directly using the function \`civ.scen.onGetRushBuyCost\`.
`

saveStandard("Unit Bribery","EventsFiles\\onBribeUnit.lua",
`Code will be executed whenever a unit is bribed.`,
`-- On Unit Bribery
function events.onBribeUnit(unit,previousOwner)
    --civ.ui.text("Bribe unit consolidated test")

end`,
`function register.onBribeUnit(unit,previousOwner)
    --civ.ui.text("On bribe unit separate file")
end
`,
`discreteEvents.onBribeUnit(function(unit,previousOwner)
    -- some code
end)`,
` The \`unit\` is the unit that was just bribed.

The \`previous owner\` is the tribe that owned the unit before.`,
"civ.scen.onBribeUnit")


saveStandard("Centauri Arrival", "EventsFiles\\onCentauriArrival.lua",
`Executes code when a tribe's spaceship reaches its target.`,
`function events.onCentauriArrival(tribe)
    --civ.ui.text(tribe.name.." has reached Alpha Centauri.")

end`,
`function register.onCentauriArrival(tribe)
    --civ.ui.text("centauri arrival separate file")

end`,
`discreteEvents.onCentauriArrival(function(tribe)
    --civ.ui.text(tribe.name.." arrived at centauri discrete event")
end)`,`The \`tribe\` is the tribe whose spaceship has reached its destination.`,
"civ.scen.onCentauriArrival")

/*
saveStandard("City Destruction","EventsFiles\\onCityDestroyed",
`Executes code when a city is destroyed.`,
`-- City destruction
function events.onCityDestroyed(city)
    --civ.ui.text("City destroyed consolidated test")

end`,
`-- This function will be registered for the onCityDestroyed
-- execution point
function register.onCityDestroyed(city)
    --civ.ui.text("on city destroyed separate file")
end`
*/


saveQuick("Unit Activation","onActivateUnit",
`This code is executed whenever a unit is activated or has moved but still has movement points left.
In \`LuaParameterFiles\parameters.lua\`, the field \`civ.scen.compatibility.activateUnitEveryMove\` is
set to true.  If this is not done (or in old versions of the Test of Time Patch Project), human
units don't execute the registered activation code after moving.
`,
`
The \`unit\` parameter is the unit that has been activated.

The \`source\` parameter is \`true\` if the unit was activated by keyboard or mouse, and
\`false\` if it was activated by the game itself.

The \`repeatMove\` parameter is \`true\` if the execution point is triggered by a repeated activation.
`,"")
saveQuick("Unit Bribery","onBribeUnit",`Code will be executed whenever a unit is bribed.`,
` The \`unit\` is the unit that was just bribed.

The \`previous owner\` is the tribe that owned the unit before.`,"")


// City Yield Calculation
saveCustom("City Yield Calculation","MechanicsFiles\\calculateCityYield.lua",`
Allows code to be executed whenever a city computes its production.  This can happen both at the start of the turn, and when the human player opens the city screen.  It can also happen when a player changes the tax rate.

Additionally, the returned values of the registered function
can be used to modify the city's production.

This execution point registers a function to be called every time a city calculates its total resource yield. The function inputs are the city, and the food, shields and trade of its tiles. Returns a 5-tuple of modifiers, food change, shield change before waste, shield change after waste, trade change before corruption, trade change after corruption. These modifiers are applied at the following points in the calculation:

1. Calculate yield from all worked tiles
2. **Run onCalculateCityYield**
3. **Add foodChange, shieldChangeBeforeWaste and tradeChangeBeforeCorruption**
4. Add changes from food trade routes
5. Add shields from improvements
6. Calculate and subtract waste
6. Calculate corruption and add changes from commodity trade routes
6. Calculate corruption again (now using the value after trade routes) and subtract.
6. **Add shieldChangeAfterWaste and tradeChangeAfterCorruption**
6. Calculate Tax/Lux/Sci
`,
"In the `MechanicsFiles` folder, change the file called `calculateCityYield.lua`.  Change the function `cityYield.onCalculateCityYield` in order to change this event."+
`

\`\`\`lua
${onCalculateCityYieldAutoDocCode}
\`\`\`

If you desire to make changes to terrain production, you should do so between the lines 
\`\`\`-- Any changes to terrain production should go here\`\`\`
and
\`\`\`-- Any changes to terrain production should be before this line\`\`\`.

This is because the \`food\`, \`shield\`, and \`trade\` arguments are computed before any changes are made to terrain production, and so these variables must be updated, which is done by the time the code reaches the lines

\`\`\`lua
-- After this point, the variables food, shields, and trade will refer to their
-- 'correct' values, even if you've changed terrain production values
\`\`\`

You may wish to consider using the Custom Cosmic module if you are interested in making changes to terrain production.

If you are interested in making changes to food, shield, or trade production which does not depend on special changes to terrain productivity, you can do so by changing the values of the variables \`foodChange\`, \`shieldChangeBeforeWaste\`, \`shieldChangeAfterWaste\`, \`tradeChangeBeforeCorruption\`, and \`tradeChangeAfterCorruption\`.

Note that there are two different shield changes.  The first one is applied before the factory, power plant, and waste modifications are computed, and the second one is applied after.  The same is true for the trade changes, except that the first one is applied before the corruption is applied, and the second one is applied after the corruption is applied.

The \`city\` parameter is the city whose production is being calculated.

The \`food\` parameter is the amount of food the city is producing.  This is updated part way through the function, to account for any changes to terrain production.

The \`shields\` parameter is the amount of shields the city is producing.  This is updated part way through the function, to account for any changes to terrain production.

The \`trade\` parameter is the amount of trade the city is producing.  This is updated part way through the function, to account for any changes to terrain production.


`,
`
${howToUseDepth} Implementation

This execution point is implemented using the function \`civ.scen.onCalculateCityYield\`.

`)


saveQuick("Centauri Arrival","onCentauriArrival",`Executes code when a tribe's spaceship reaches its target.`,`The \`tribe\` is the tribe whose spaceship has reached its destination.`,"")
saveQuick("City Destruction","onCityDestroyed",`Executes code when a city is destroyed.`,`The \`city\` it the city that was just destroyed.`,"")
saveQuick("City Founded","onCityFounded",
`
Executes code when a city is founded, just before the "What Shall We
 Name This City" dialog box.  You can change the suggested name for the city
at this time by changing the [\`city.name\`](auto_doc/cityObject.html#name) field.

You can (optionally) return a function to be called if the city is
not built after all (if the city is cancelled during the naming
process).  For example, if you change the terrain under or around the city
when it is founded, you can change it back here.  If you write city founded code in more than one place
(such as multiple discrete events, or using both the Events Files and
consolidated events), all returned functions are executed.
`,`The \`city\` is the city that is being founded.`,"")
saveQuick("City Production","onCityProduction","Executes code when a city completes production of something.",
`
The \`city\` is the city which just completed production.

The \`prod\` is the item that was produced.  If a unit was produced,
it is a unit Object (not a unitType object).  If an improvement or
wonder was completed, \`prod\` is the corresponding improvement object
 or wonder object.
`,"")
saveQuick("City Captured","onCityTaken","","","")
saveQuick("Game End","onGameEnd","","","")

// Initiate Combat
saveCustom("Combat Declared", "MechanicsFiles/combatSettings.lua",
`When combat is initiated, the function registered for this execution point is called, and returns an iterator (coroutine) which is called for every round of
combat.  Combat will end when the iterator stops returning values (or returns \`nil\`).

The scenario designer can either handle all the effects of combat manually for
a round of combat by telling the iterator to yield true, and the unit over which
the combat 'explosion' should be animated.  Alternatively, the coroutine can
return false, along with that round's combat statistics, and the game's combat
system will "roll the dice" and determine who should be damaged and where
the combat explosion should be animated.
`,
`In the \`MechanicsFiles\` folder, change the file called \`combatSettings.lua\`.  Change the function \`register.onInitiateCombatMakeCoroutine\` in order to change this event.

\`\`\`lua
${onInitiateCombatAutoDocCode}
\`\`\`

The \`attacker\` is the unit which is attacking.

The \`defender\` is the unit which is being attacked.

The \`attackerDie\` is the the game's standard calculation for the attack value of the attacker.

The \`attackerPower\` is the attackers firepower, as determined by the game's standard calculations.

The \`defenderDie\` is the the game's standard calculation for the defense value of the defender.

The \`defenderPower\` is the defenders firepower, as determined by the game's standard calculations.

The \`isSneakAttack\` parameter is true if a "sneak attack" is in progress. That is, If the attacker is conducting a sneak attack (i.e., breaking a Cease Fire or Peace Treaty) and the defender belongs to a tribe controlled by a human player, the attacker receives a x2 adjustment (bonus).

A round of combat can be thought of as the attacker rolling an attackerDie-sided die, and the defender rolling a defenderDie-sided die.  The attacker's roll is compared to the defender's roll, and the higher number wins
that round of combat (if the rolls are equal, the defender wins).  The loser 

This function and the iterator returned can be heavily modified depending on how the scenario designer wants combat to happen.  What follows describes 
are notes on the default behaviour.

\`\`\`lua
    leaderBonus.updateCommander(attacker)
    leaderBonus.updateCommander(defender)
\`\`\`
Here, the Leader Bonus Module confirms that the units have the correct leader.  (If you're not using the Leader Bonus Module, then this doesn't matter.)

\`\`\`lua
    local maxCombatRounds = math.huge -- If you want to limit combat to a specific number of
                                        -- turns, set this variable
\`\`\`

This variable is used to limit the number of rounds of combat.  If you want to limit combat to a specific number of turns, set this variable.  Otherwise, it will be set to infinity (in which case, hp reduction will end combat).

\`\`\`lua
    local calculatedAttackerStrength, 
            calculatedAttackerFirepower,
            calculatedDefenderStrength, 
            calculatedDefenderFirepower = computeCombatStatistics(attacker,defender,isSneakAttack)
\`\`\`

Instead of relying on the game's standard calculations of combat strength,
this code uses the function \`computeCombatStatistics\` (found earlier in the same file) to calculate the
statistics.  By default, this function takes account of combat changes
defined in other modules (such as the Combat Modifiers Module) and
combines them with [Knighttime's combat calculation code](https://forums.civfanatics.com/threads/civilization-ii-combat-guide-v2-0-updates.673992/).


\`\`\`lua
    if calculatedAttackerStrength == 0 then
        maxCombatRounds = 0
        if attacker.owner.isHuman then
            text.simple("Our "..attacker.type.name.." unit can't fight the defending "..defender.type.name..".  The attack has been cancelled.","Defense Minister")
        end
    end
\`\`\`

In the standard Civilization II game, units with 0 attack are unable to initiate combat.  However, it may be that the \`computeCombatStatistics\`
gives a unit 0 attack, even though the unit type normally can make attacks (for example, if a unit is ineffective against a particular defender).  In this case, the code sets the maximum number of combat rounds to 0, thereby stopping the attack, and displays a message to the human player.

\`\`\`lua
    -- %Report Combat Strength%
    --civ.ui.text("Attacker: "..tostring(calculatedAttackerStrength/8).." FP:"..calculatedAttackerFirepower.." Defender: "..tostring(calculatedDefenderStrength/8).." FP:"..calculatedDefenderFirepower)
\`\`\`

Comment out this line if you don't want a text box to display the combat statistics.  Having this active during development is likely to be useful,
but you will probably want to do something fancier if you intend to display
combat statistics in your final release.

\`\`\`lua
        while(round < maxCombatRounds and attacker.hitpoints >0 and defender.hitpoints > 0) do
\`\`\`

This is the main loop of the combat.  Combat will continue until the maximum number of combat rounds is reached, or until one of the units is killed.

\`\`\`lua
    if false then
        -- If the coroutine yields true as its first value, 
        -- the game's default combat resolution is skipped for that round 
        -- and the designer is responsible for updating damage. 
        -- The second value yielded is either the attacker or the defender, 
        -- this is used to render animations etc. 
        -- In this case the coroutine resumes without any values.

        coroutine.yield(true,defender)
\`\`\`

By default, the combat iterator won't return true.  If the coroutine yields true as its first value, the game's default combat resolution is skipped for that round and the designer is responsible for updating damage.  The second value yielded is either the attacker or the defender, this is used to render animations etc.  In this case the coroutine resumes without any values.

\`\`\`lua
    --If the coroutine yields false as its first value, 
    --the game runs its default combat algorithm. The designer 
    --can additionally yield modified values for attackerDie, 
    --attackerPower, defenderDie and defenderPower (in this order) 
    --which will be used by the game for that round.

    local newAttackerDie = calculatedAttackerStrength
    local newAttackerFirepower = calculatedAttackerFirepower
    local newDefenderDie = calculatedDefenderStrength
    local newDefenderFirepower = calculatedDefenderFirepower
    local result = coroutine.yield(false,newAttackerDie,newAttackerFirepower,newDefenderDie,newDefenderFirepower)

    --In this case the coroutine resumes with the result of the round, 
    --a table containing four values:
        -- winner, this is either attacker or defender.
        -- attackerRoll, the result of the attacker's die roll
        -- defenderRoll, the result of the defender's die roll
        -- reroll, true if a reroll happened. This can happen only 
             -- if the attacker is tribe 0, the defender is a unit 
             -- guarding a city, and the city is the capital or 
             -- the tribe has less than 8 cities in total and 
             -- the attacker's die roll is higher than the 
             -- defender's. A reroll can happen at most once.
\`\`\`

By default, the combat iterator will yield false as its first value.  The game
will run standard combat calculations based on the values assigned to
\`newAttackerDie\`, \`newAttackerFirepower\`, \`newDefenderDie\` and \`newDefenderFirepower\`.  Change these from their calculated values if
you want to change combat effectiveness based on events that happen during combat.

The \`result\` variable will contain the result of the round, a table containing four values assigned to the keys \`winner\`, \`attackerRoll\`, \`defenderRoll\` and \`reroll\`.  \`winner\` will be either \`attacker\` or \`defender\`.  \`attackerRoll\` and \`defenderRoll\` will be the results of the die rolls.  \`reroll\` will be \`true\` if a reroll happened. This can happen only if the attacker is tribe 0, the defender is a unit guarding a city, and the city is the capital or the tribe has less than 8 cities in total and the attacker's die roll is higher than the defender's. A reroll can happen at most once.

`,
`
This execution point is implemented using the TOTPP function \`civ.scen.onInitiateCombat\`.
`)


saveQuick("Key Press","onKeyPress","","","")

// on load
saveCustom("Game Loaded", "events.lua",`
The Game Loaded execution point is triggered when a game is loaded from a saved game file.  This happens after the \`events.lua\` file is executed, and before the Scenario Loaded execution point is triggered.  The main purpose of this execution point is to read data which has been added to the saved game file by the Game Saved execution point, and convert it back to a table (known as the "state table", so that Lua events can have custom data saved between sessions.`,`
The Game Loaded execution point is not meant to be used by scenario designers.  The Scenario Loaded execution point is preferred.  That is why it is only accessible through the \`events.lua\` file.  However, if you need to change it for some reason, you should change ths
code within that file:
\`\`\`lua
${onLoadAutoDoc}
\`\`\`

The \`buffer\` is a string, which will be converted back into the state
table using \`civlua.unserialize\`.  This template uses the lualzw module
to compress the data, so it is decompressed here as well.  (If the data isn't
compressed, \`lualzw.decompress\` returns \`nil\`, so the raw string is used instead.)

${usageDepth} ${usageEmph}Discrete Events${usageEmph}

The Discrete Events module allows access to the Game Loaded execution point.  This
is so that scenario modules can save data between sessions, by linking to the
state table.  The state table is a table which is saved to the saved game file.

Here is an example of how to use \`discreteEvents.linkStateToModules\` to provide access to the state table within a module.  This code is from the \`LuaCore\navy.lua\` file:

\`\`\`lua
local discreteEvents = require("discreteEventsRegistrar"):minVersion(1)
\`\`\`

This module needs to keep track of whether a ship can unload, because there are
circumstances where a unit has the ability to unload for the rest of the turn,
even though the function determining if the unit can unload would no longer 
return true.  Since we want this to persist between saving and loading, we
must use the state table.

\`\`\`lua
local canUnload = "state not linked"
-- canUnload[unit.id] = tileID or nil
-- a unit in this table can unload itself or carried units even
-- if it otherwise wouldn't be able to, as long
-- as it is still on the tile specified
\`\`\`

Here, the variable \`canUnload\` is defined.  At the moment, it is a string,
but during the Game Loaded execution point, the variable's value will be
changed to one of the tables in the state table.  So, any functions
in this module can treat this variable as a table, as long as they are not
called until after the Game Loaded execution point has passed.

We need to write a "link state" function to associate the variable with the
an appropriate table in the state table.

\`\`\`lua
function navy.linkState(canUnloadTableFromState)
    if type(canUnloadTableFromState) == "table" then
        canUnload = canUnloadTableFromState
    else
        error("navy.linkState: table expected as argument.  Received: "..tostring(canUnloadTableFromState))
    end
end
\`\`\`

When called, this function assigns the \`canUnloadTableFromState\` as the value
for the canUnload variable.  An error is generated if it isn't an actual table.

Next, we register an event using \`discreteEvents.linkStateToModules\`:

\`\`\`lua
discreteEvents.linkStateToModules( function(state,stateTableKeys)
    local keyName = "navyModuleState"
    if stateTableKeys[keyName] then
        error('"'..keyName..'" is used as a key for the state table on at least two occasions.')
    else
        stateTableKeys[keyName] = true
    end
    -- link the state table to the module
    state[keyName] = state[keyName] or {}
    navy.linkState(state[keyName])
end)
\`\`\`

The \`discreteEvents.linkStateToModules\` event provides the entire state table as the first argument, and a table containing the names of all the keys in the state table as the second argument (in the form stateTableKeys[keyName] = true).

In this function, we decide that the table for this module will have the key
"navyModuleState" in the overall state table.  Next, we check to see if that
key is already in use.  If it is, we generate an error.  If it isn't, we add
it to the list of keys in use.

Next, we make sure that the table for this module exists in the state table.
If it doesn't, we create an empty table for it.  Finally, we call the \`navy.linkState\` function defined earlier, passing the table for this module as the argument.
`,`
This execution point is implemented using the TOTPP function \`civ.scen.onLoad\`.`)

// 

// on save
saveCustom("Game Saved", "events.lua",`
The Game Saved execution point is triggered when a game is saved to a
file.  As part of this process, the state table is converted to a string
and saved to the file.    The Game Loaded execution point
converts the string back into a table, once the game is loaded.

Strictly speaking, any string could be saved to
the end of the file, but the Lua Scenario Template saves the state table and
I know of no scenarios where something other than
a string conversion of the state table is saved.

In the Lua Scenario Template, the saved string is compressed using the
lualzw module.  This is done to reduce the size of the saved game file.
`,
`
If you need to change the string that is saved to the file, you must
change this code within the \`events.lua\` file:

\`\`\`lua
${onSaveAutoDoc}
\`\`\`

This will probably never be necessary, since you can simply add some
extra information as an entry in the state table.  Accessing this
execution point through using the Discrete Events module does not
let you change the string that is saved to the file.

${usageDepth} ${usageEmph}Discrete Events${usageEmph}

The Discrete Events module allows access to the Game Saved execution point 
by registering code using the function \`discreteEvents.onSave\`.  The
registered function receives no arguments.

\`\`\`lua
local discreteEvents = require("discreteEventsRegistrar")
\`\`\`

\`\`\`lua
discreteEvents.onSave( function()
    -- code to execute when the game is saved
end)
\`\`\`
`,
`This execution point is implemented using the TOTPP function \`civ.scen.onSave\`.`)

saveQuick("Scenario Loaded","onScenarioLoaded","","","")
saveQuick("Negotiation","onNegotiation",`
This execution point is triggered when a tribe (the \`talker\`) attempts
to negotiate with a different tribe (the \`listener\`).  If the registered
function returns \`true\`, the tribes can talk.  If \`false\`,
they can't (and won't appear in the foreign minister menu).

The Lua Scenario Template offers multiple ways to register functions
for this execution point.  If any of them return false, then negotiation
between the two parties is disabled.
`,"","")
saveQuick("Tribe Schism","onSchism",`
The code from this execution point is executed when a \`tribe\` could be split
because its capital is taken.  The event will trigger even if there is no
free civ slot for the rebel tribe to occupy, but will not occur
if a schism is not possible because of other schism mechanics.

If the registered function returns \`true\`, then the schism is allowed
(as long as there is an empty tribe slot).  If \`false\` is returned, 
then schism is prevented.

The Lua Scenario Template offers multiple ways to register functions
for this execution point.  If any of them return false, then schism
is prevented in this instance.

I think (but don't know for sure) that the requirements for a schism
are that:
1. The tribe capturing the capital must have a weaker power rating than the defending tribe.
2. The defending tribe must be controlled by an AI.

`,`
The \`tribe\` is the tribe that just lost its capital and will undergo schism if there is an available tribe slot (unless this
event prevents it).
`,"")
saveQuick("Between Turns","onTurn","This execution point occurs at the very beginning of a game turn, before the Barbarian tribe begins its movement.","","")
saveQuick("Unit Killed In Combat","onUnitKilled","This execution point is triggered when a unit is killed as a result of standard Civ II combat.  It is not triggered if a unit is killed by the [gen.defeatUnit](/auto_doc/gen.html#defeatunit) function.  The [Unit Defeated](#unit-defeated) execution point triggers for both standard combat defeat and event driven defeat.",`
The \`loser\` is the unit which was defeated in combat.

The \`winner\` is the unit which won the combat.

The \`aggressor\` is the unit which initiated the combat.

The \`victim\` is the unit which was attacked.

The \`loserLocation\` is the tile where the \`loser\` was standing.  If the \`aggressor\` is the \`loser\`, the code \`loser.location\` will point to a "tile" off the map.

The \`winnerVetStatus\` is the veteran status of the \`winner\` before the battle took place (this event triggers after the game assigns veteran status for victory in combat).

The \`loserVetStatus\` is the veteran status of the \`loser\` before the battle
took place.
`,`
This event is based primarily on the function \`civ.scen.onUnitKilled\`
function provided by the standard Test of Time Patch Project.  However,
information is also gathered by the function registered to 
\`civ.scen.onInitiateCombat\` in order to populate these variables 
(which are defined outside of either registered function):
- \`aggressor\`
- \`aggressorLocation\`
- \`aggressorVetStatus\`
- \`victim\`
- \`victimVetStatus\`

These variables are used to populate the following \`onUnitKilled\` function
parameters, which are not provided by the game itself:
- \`aggressor\`
- \`victim\`
- \`loserLocation\`
- \`winnerVetStatus\`
- \`loserVetStatus\`
`)
saveQuick("Unit Defeated","onUnitDefeated",`
This execution point is triggered when a unit is killed as a result of 
standard Civ II combat, or when it is killed by events through
the use of the [gen.defeatUnit](/auto_doc/gen.html#defeatunit) function.
`,`
`,`
The Unit Defeated execution point is implemented using the TOTPP function
\`civ.scen.onUnitKilled\`, as well as making the function \`gen.defeatUnit\`
call the registered functions for this execution point.
`)
saveQuick("Unit Death","onUnitDeath",`
This execution point is triggered when a unit "dies."  This includes when it is defeated in combat or by the use of [gen.defeatUnit](/auto_doc/gen.html#defeatunit) (as long as it isn't demoted into another unit by events), and also when the function [gen.killUnit](/auto_doc/gen.html#killunit) is called.
`,"",`
The Unit Death execution point is implemented using the TOTPP function
\`civ.scen.onUnitKilled\`, as well as making the functions \`gen.defeatUnit\` and \`gen.killUnit\`
call the registered function for this execution point.
`)
saveQuick("Unit Death Outside Combat","onUnitDeathOutsideCombat","","","Not standard implementation")
saveQuick("Unit Deleted","onUnitDeleted","","","Not Standard implementation")
saveQuick("City Processing Complete","onCityProcessingComplete","","","")
saveQuick("Before City Processing","onTribeTurnBegin","","","")
saveQuick("City Processed","onCityProcessed","","","Not standard implementation")
saveQuick("Unit Enters Tile","onEnterTile","","","Not Standard Implementation")
saveQuick("Unit Given Last Order","onFinalOrderGiven","","","Not standard implementation")
saveQuick("Nuclear Attack","onUseNuclearWeapon",
`This execution point is triggered when an attack is made by a nuclear 
weapon (either a unit with 99 attack, or a spy).  A nuclear attack does not trigger \`civ.scen.onUnitKilled\`, so
events.lua makes sure to execute the related events.
If the registered function returns \`false\`, the attack is aborted.
`
,
`The \`unit\` is the weapon or spy which is making the nuclear attack.

The \`tile\` is the location of the attack.`
,"")

// Rush Buy Cost
saveCustom("Get Rush Buy Cost","MechanicsFiles\\rushBuySettings.lua",`
This execution point is called when a player checks what the cost is to rush 
buy the city's current production item.  The registered function must return
an integer with the cost.`,
`
In the file MechanicsFiles\rushBuySettings.lua, change the following code:

\`\`\`lua
${onGetRushBuyCost}
\`\`\`

The \`city\` parameter is the city where rush-buying is being considered.

The \`cost\` parameter is the game's default cost to rush buy the current production item.
`,
`This execution point is implemented using the TOTPP function \`civ.scen.onGetRushBuyCost\`.`)


// Get Formatted Date
saveCustom("Get Formatted Date","MechanicsFiles\\onGetFormattedDate",`
This execution point is triggered whenever the game needs to display a date.
Usually, this is because the game is updating the status window for the game,
but the date is also displayed when a city window is open, and also when
the spaceship window is open.  There may be other situations also.

The registered function must return a string to display where the date should
be.  This doesn't actually have to be a date.  For example, If you have an 
active unit, you might want to display information about the unit in the
status window instead of the date.

Since the status window is recalculated so frequently, the Get Formatted Date
execution point can work almost like an 'on click' execution point.  The
Final Order Given and Unit Enters Tile execution points leverage this
ability so that they function properly even when another unit isn't activated
immediately.  (This is handled in events.lua, so you don't have to worry about
it when changing the code in onGetFormattedDate.lua.)
`,
`
You can modify the effects of this execution point by changing the following code
in \`MechanicsFiles\\onGetFormattedDate\`:

\`\`\`lua
${onGetFormattedDate}
\`\`\`

The \`turn\` parameter is the turn for the date which is to be displayed.  This is usually the current turn, but not always.  For example, the game
displays the date for a future turn when you are looking at the spaceship
window for a spaceship which has already departed.

The \`defaultDateString\` is the date string which the game would normally
display.  Return this if you do not want to make any changes to the date.

Here is some example code for showing information from the leaderBonus module for the active unit in the status window, instead of the date.  If the unit
is a leader, its rank is displayed.  Otherwise, if the unit has a commander,
the commander's rank is displayed.  If the unit is neither a leader, nor under
the command of a leader, "No Leader" is displayed.

Note that if there is no active unit, or a city window is opened, the default
date is displayed.

\`\`\`lua
local leaderBonus = require("leaderBonus")
function register.onGetFormattedDate(turn,defaultDateString)
    if civ.getCurrentTribe().isHuman and civ.getActiveUnit() and not civ.getOpenCity() then
        local activeUnit = civ.getActiveUnit()
        local rank = leaderBonus.getRank(activeUnit)
        if rank then
            return "Rank: "..rank
        elseif leaderBonus.getCommanderRank(activeUnit) then
            return "Ldr: "..leaderBonus.getCommanderRank(activeUnit)
        else
            return "No Leader"
        end
    else
        return defaultDateString
    end
    return defaultDateString
end
\`\`\`

`,`
This execution point is implemented using the TOTPP function \`civ.scen.onGetFormattedDate\`.`)


// Select Music
saveCustom("Select Music","LuaParameterFiles\\customMusicIntegration.lua",`
The Select Music execution point is called whenever the game selects a new
music track to play.  This allows for the scenario designer to ship
customised music with his or her scenario.

This execution point is also used by my [Extended Music For TOTPP](https://github.com/ProfGarfield/ExtendedMusicForTOTPP) program.  If your scenario ships customised
music, that overrides the Extended Music Patch.`,
`
Adding custom music to your scenario is done by modifying the file \`LuaParameterFiles\\customMusicIntegration.lua\`.  Begin by adding a 
directory called \`Music\` to the scenario's folder, and put your music files
in that directory.  Then, rename the \`@PICMUSICTOT\` section of \`Game.txt\`
to give appropriate names to the tracks.

Next, change the \`useCustomMusic\` variable to \`true\`.

\`\`\`lua
${customMusicSections["useCustomMusic"].paragraph}
\`\`\`
If this is not done, the scenario won't have custom music.  (It also won't have
custom music if the Direct Show Music Patch is not enabled.)

Then, go to this section of code, and change the values in the \`trackList\`
table to reflect the names of the tracks in your \`Music\` directory.  If some
of the tracks are neither in your scenario's music directory, the game will
search for them in the main \`Test of Time\\Music\` directory.  If the track
is not found in either place, a message will be displayed to the player, unless
the scenario's music directory has a file \`missingmusic.txt\`.  (This file can be empty.)

\`\`\`lua
${customMusicSections["trackList"].paragraph}
\`\`\`

Note that although the game ships with 13 tracks, you can have more or fewer
tracks if you prefer.  You should update \`@PICKMUSICTOT\` appropriately,
by adding or removing lines as necessary.

Also, note that tracks 0 and 1 will be played when
civilizations are destroyed and cities celebrate We Love The King Day,
respectively.  Choose appropriate tracks, or leave them with their default
names, and let them be found in the player's main music directory.

`,`
This execution point is implemented using the TOTPP function \`civ.scen.onSelectMusic\`.  Note, however, that unlike other execution points, this
function is not called in \`events.lua\`.  Instead, it is called within \`LuaParameterFiles\\customMusicIntegration.lua\`.
`)


// resolve combat

saveCustom("Combat Resolution","Deprecated",`
The Combat Resolution execution point has been superseded by the Combat Declared execution point, and is not in the current version of the Lua Scenario Template.

The registered function is called before every round of combat.  If it returns
true, the combat continues for another round.  If false, the combat ends, and
one of the combatants is destroyed.  (If one has 0 hp, it will be that one.)
`,`
This execution point is deprecated, so the Lua Scenario Template has no section dedicated to it.  If you wish to use it, define a function to be
registered, similar to the following:
\`\`\`lua
local function resolutionFunction(defaultResolutionFunction,defender,attacker)
    return defaultResolutionFunction(defender,attacker)
end
\`\`\`
Then, register it as follows:
\`\`\`lua
civ.scen.onResolveCombat(resolutionFunction)
\`\`\`
The \`defaultResolutionFunction\` is a function which takes two parameters, the defender and the attacker, and returns true if the combat should continue, and false if it should end.  This function is how the game would normally
determine if combat should continue.  You should change the returned value
when you wish to do something different.

The \`defender\` and \`attacker\` parameters are the units which are engaged
in combat.
`,`
This execution point can be implemented with the TOTPP function \`civ.scen.onResolveCombat\`.`)


// choose defender
saveCustom("Choose Tile Defender","MechanicsFiles\\combatSettings.lua",
`The code registered tot he Choose Tile Defender execution point is called when the game checks what unit will defend a tile.  This happens both when a tile is actually attacked, and when the AI is determining its goals.  A unit must be returned by the registered function, and that unit will defend the tile if combat actually takes place.  The defending unit can be chosen from a different tile.`,`
You can change the behaviour of the Choose Tile Defender execution point by modifying the function \`register.onChooseDefender\` in the file \`MechanicsFiles\\combatSettings.lua\`.  The default implementation is as follows:

\`\`\`lua
${onChooseDefenderAutoDocCode}
\`\`\`

The \`tile\` parameter is the tile which is being attacked.

The \`attacker\` parameter is the unit which is attacking the tile.

The \`isCombat\` parameter is \`true\` if combat will actually take place, and \`false\` if the function is called for AI planning purposes.

The \`defaultFunction\` is the game's standard function for determining what unit will defend the tile.  To use it, return the result of \`defaultFunction(tile,attacker)\`.

The standard Civ II method for choosing the defender is to choose the unit with the highest "defenderValue", computed in the following way:

$$ unitValue = \\frac{unitDefense \\times unitHitpoints}{unitMaxHitpoints} $$


With the division rounded down to the nearest integer.  Although unitDefense takes into account bonuses like the veteran status and the pikeman bonus, this computation does not take unit hitpoints or firepower into account.  For example, a damaged Armor unit (with more than 20 HP remaining) could defend after an Alpine Troops unit, even though it would be a better defender.

The default implementation of \`register.onChooseDefender\` keeps this basic choice system, but does not use the \`defaultFunction\` so that it can take into account combat customisations made in \`computeCombatStatistics\`.  The most notable change is that instead of relying on only the defense value of the candidate unit, the ratio of 
$$ \\frac{candidateDefenseValue}{attackersValue} $$ 
is used instead (without integer division).  This is because the base Civilization II game rarely modifies the attack value of a unit (I think the only case of this is a Partisan attacking a 0 attack unit), while this is an obvious thing to do with Lua.

If the attacker has 0 attack value when facing a certain unit, that unit's defense value is set to ten million, so that it will be chosen as the defender by default.  (This can be changed in the next step.)

After assigning a value to the candidate defensive unit, that value is altered by adding the result of the following function:

\`\`\`lua
${defenderValueModifierAutoDocCode}
\`\`\`

The \`defenderValueModifier\` function is meant to force certain units to defend with either higher or lower priority, even if some other unit would be a better defender.  For example, if \`MechanicsFiles\\simpleSettings.lua\` has been changed to make fighters attack air first, then \`defenderValueModifier\` adds 100 million (\`1e8\`) to the value of all air
units when a fighter unit attacks.  This ensures that air units will always be chosen as defenders when a fighter attacks, even if they are not the best defenders.  Similarly, ground units on ocean tiles subtract 100 million, so they'll never defend if a ship can defend them.

With a finalized defender value, \`register.onChooseDefender\` determines if the candidate defender is the best found so far, and, if so, updates the \`bestDefender\` variable.  After checking all units, \`bestDefender\` is returned.

`,`
The Choose Tile Defender execution point is implemented using the TOTPP function \`civ.scen.onChooseDefender\`.`)


// can build

saveCustom("Check If City Can Build Item","MechanicsFiles\\canBuildSettings.lua",`
The code for this execution point is executed whenever a city needs to determine if it can build an item.  If the called function returns \`true\`, then the item can be built by the city; if \`false\` it can't.  This usually (possibly always, but I don't know for sure) means that this execution point is run in batches of 256, for all the possible units, improvements, and wonders, that a city could build.

`,`
The Lua Scenario Template allows you to register tables in the file \`MechanicsFiles\\canBuildSettings.lua\` which will be translated by the \`canBuild\` module into a suitable function to be registered with the \`civ.scen.onCanBuild\` function.  The Template does not provide a way to directly provide a function for this execution point.  However, the \`conditionFunction\` key allows you to register arbitrary code for whether a city can build a certain item, so you can make arbitrary conditions.

If you are not using the Template, this is the outline for registering the function:

\`\`\`lua
local function canCityBuild(defaultBuildFunction,city,item)
    return defaultBuildFunction(city,item)
end
\`\`\`

The \`city\` parameter is the city that is checking if the \`item\` can be built.

The \`item\` parameter is the unitTypeObject, improvementObject, or wonderObject that the city is checking if it can build.

The \`defaultBuildFunction\` is the game's standard function for determining if a city can build an item.  The call \`defaultBuildFunction(city,item)\` returns true if the \`city\` can build the \`item\` under regular Civ II rules (prerequisite technology required, unitType not expired, improvement not already built, etc.).

You don't have to use the result of the \`defaultBuildFunction\` if you don't want to.  You can allow a city to build the \`item\` by returning \`true\` even if the \`defaultBuildFunction\` would return \`false\`.

Once you've written your \`canCityBuild\` function, you would register it using the function call
\`\`\`lua
civ.scen.onCanBuild(canCityBuild)
\`\`\`

`,`
This execution point is implemented with the TOTPP function \`civ.scen.onCanBuild\`.`)



































const outputList = [
    "Unit Activation",
    //"Get Rush Buy Cost",
    "Unit Bribery",
    "Centauri Arrival",
    "City Destruction",
]
function completeOutputList() {
    for (const title of outputList) {
        delete titles[title]
    }
    for (const title in titles) {
        outputList.push(title)
    }
}

function buildFile() {

    let output =
`---
tabTitle: Execution Points for Code
layout: page
title: Lua Execution Points
navTitle: Execution Points
minTOC: 2
maxTOC: 3
---

Lua Events function by running code at certain predetermined points during the Civilization II: Test of Time game.  The term "Execution Point"
refers to one of these points where code that has been registered is executed.  Everything that can be achieved with Lua 
must be done through these execution points.  Sometimes, complicated events will use more than one of these execution
points to achieve their effect.

In some cases, the execution point expects code which will return a value that influences how the game works.

The Test of Time Patch Project provides many execution points.  However, in order to improve programming convenience, the Lua Scenario Template
provides even more execution points by running the pre-existing execution points only at certain times.

`
    completeOutputList()
    /*
    output += "## List of Execution Points\n"
    for (const fileName of outputList) {
        output += `1. [${fileName}](#${fileName.replace(/\ /g,"-").toLowerCase()})`+"\n"
    }
    output += "\n"
    */
    for (const fileName in points) {
        output += points[fileName]
    }
   /*
    const eventFilesAutoDoc = autoDoc.getAutoDocFromEventsFiles()
    for (let autoDocName in eventFilesAutoDoc) {
        //console.log(autoDocName)
        output += "#### "+autoDocName+"\n\n"
        const adData = eventFilesAutoDoc[autoDocName];
        output += adData.fileName+"\n\n";
        output +="```lua\n"+adData.paragraph+"\n```\n\n"
    }
    */
    fs.writeFileSync(__dirname+"/executionPoints.md",output)
}
buildFile()