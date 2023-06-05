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



function consolidatedUsage(code,parameterDescription) {
    let result = usageDepth+" "+usageEmph+"consolidatedEvents.lua"+usageEmph+"\n"
    result += "Change this function: \n"+wrapCode(codeWrapType,code)+"\n"
    result += parameterDescription+"\n"
    return result
}

function fileUsage(fileName,code,parameterDescription) {
    let result = usageDepth+" "+usageEmph+fileName+usageEmph+"\n"
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
saveQuick("Key Press","onKeyPress","","","")
// on load
// on save
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
Not standard implementation
`)
saveQuick("Unit Death","onUnitDeath","","","Not standard implementation")
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
// Get Formatted Date
// Select Music
// resolve combat
// choose defender
// can build



































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