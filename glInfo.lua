

local thresholdTableMetatable = { __index = function(thresholdTable,key)
            if type(key) ~= "number" then
                return rawget(thresholdTable,key)
            else
                local bestIndexSoFar = -math.huge
                local bestValueSoFar = false
                for index,value in pairs(thresholdTable) do
                    if type(index) == "number" and key >= index and index >= bestIndexSoFar then
                        bestIndexSoFar = index
                        bestValueSoFar = value
                    end
                end
                return bestValueSoFar
            end
        end,}
-- A threshold table is a table where if a numerical key is indexed, and that
-- numerical key doesn't correspond to an index, the value of the largest
-- numerical index less than the key is used.
-- If there is no numerical index smaller than the key, false is returned
-- (nil is returned for non-numerical keys not in table)
-- Use an index -math.huge to provide values for arbitrarily small numerical keys
-- example 
-- myTable = gen.makeThresholdTable({[-1]=-1,[0]=0,[1]=1,})
-- myTable[-2] = false
-- myTable[-1] = -1
-- myTable[-0.6] = -1
-- myTable[3.5]=1
-- myTable["three"] = nil
-- myTable[0.5]=0
--

<details id="genmakethresholdtable"><summary><code>gen.makeThresholdTable(table or nil)-->thresholdTable</code></summary><p style="margin-left: 25px">
<code>gen.makeThresholdTable(table or nil)-->thresholdTable
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genmakethresholdtable">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


-- gen.makeThresholdTable(table or nil)-->thresholdTable
-- makes an input a threshold table or creates an empty thresholdTable
-- Also returns the table value
function gen.makeThresholdTable(inputTable)
    inputTable = inputTable or {}
    return setmetatable(inputTable,thresholdTableMetatable)
end



<details id="gensetterraintype"><summary><code>gen.setTerrainType(tile,terrainID)-->void</code></summary><p style="margin-left: 25px">
<code>gen.setTerrainType(tile,terrainID)-->void
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gensetterraintype">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


-- gen.setTerrainType(tile,terrainID)-->void
-- changes the terrain type of tile to terrainID
-- have this function, so that if
-- terrainType key functionality is changed, this
-- function can change instead of all code everywhere
function gen.setTerrainType(tile,terrainID)
    tile = toTile(tile)
    tile.terrainType = terrainID
end
--


<details id="generrorfornilkey"><summary><code>gen.errorForNilKey(table,tableName)-->void</code></summary><p style="margin-left: 25px">
<code>gen.errorForNilKey(table,tableName)-->void
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#generrorfornilkey">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

--#gen.errorForNilKey(table,tableName)-->void
-- generates an error when a key with a nil
-- value is accessed from the table
-- useful for debugging in certain circumstances
function gen.errorForNilKey(table,tableName)
    local mt = getmetatable(table) or {}
    setmetatable(table,mt)
    mt.__index = function(myTable,key) error("The "..tableName.." table doesn't have a value associated with "..tostring(key)..".") end
end


<details id="gennonewkey"><summary><code>gen.noNewKey(table,tableName)-->void</code></summary><p style="margin-left: 25px">
<code>gen.noNewKey(table,tableName)-->void
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gennonewkey">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

-- gen.noNewKey(table,tableName)-->void
-- generates an error if attempting to set a key in
-- a table that doesn't already exist
function gen.noNewKey(table,tableName)
    local mt = getmetatable(table) or {}
    setmetatable(table,mt)
    mt.__newindex = function(myTable,key)
        error("The "..tableName.." table can't accept values for indices that don't already exist.  Key value is: "..tostring(key))end
end

<details id="gennoglobal"><summary><code>gen.noGlobal()</code></summary><p style="margin-left: 25px">
<code>gen.noGlobal()
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gennoglobal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



-- gen.noGlobal()
-- after gen.noGlobal is run, errors will be generated when trying to create a new
-- global variable, or when accessing a global variable that doesn't already exist
-- if you want to have a 'console' table to access certain functions from the console,
-- you should declare it (but you don't have to fill it) before running this function
function gen.noGlobal()
    local mt = getmetatable(_G) or {}
    setmetatable(_G,mt)
    mt.__index = function(myTable,key) 
        error("\nThe variable name '"..key.."' doesn't match any available local variables.\n"
        .."Consider the following possibilities:\n"
        .."Is '"..key.."' misspelled?\n"
        .."Was '"..key.."' misspelled on the line where it was defined?\n"
        .."(That is, was 'local "..key.."' misspelled?)\n"
        .."Was 'local "..key.."' defined inside a lower level code block?\n"
        .."For example:\n"
        .."if x > 3 then\n"
        .."    local "..key.." = 3\n"
        .."else\n"
        .."    local "..key.." = x\n"
        .."end\n"
        .."print("..key..")\n"
        .."If so, define '"..key.."' before the code block:\n"
        .."local "..key.." = nil -- add this line\n"
        .."if x > 3 then\n"
        .."    "..key.." = 3 -- remove local from this line\n"
        .."else\n"
        .."    "..key.." = x -- remove local from this line\n"
        .."end\n"
        .."print("..key..")\n"
        .."If you really did mean to access a global variable, write:\n"
        .."_global."..key.."\n"
        .."If you are trying to work in the console, use the command:\n"
        .."console.restoreGlobal()\n"
        .."to restore access to global variables (locals don't work well in the console)")
    end

    mt.__newindex = function(myTable,key)
        error("\nYou appear to have forgotten to put \'local\' before '"..key.."' the first time you used it.\n"
        .."If you really did mean to make a global variable, write:\n"
        .."_global."..key.."\n"
        .."If you are trying to define a variable in the console, use the command:\n"
        .."console.restoreGlobal()\n"
        .."to restore access to global variables (locals don't work well in the console)")
    end
    print('Global variables are disabled')
end

<details id="genrestoreglobal"><summary><code>gen.restoreGlobal()</code></summary><p style="margin-left: 25px">
<code>gen.restoreGlobal()
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genrestoreglobal">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

function gen.restoreGlobal()
    local mt = getmetatable(_G) or {}
    setmetatable(_G,mt)
    mt.__index = nil
    mt.__newindex = nil
    print("You can now use global variables, including in the console.")
end
if rawget(_G,"console") then
    _G.console.restoreGlobal = gen.restoreGlobal
end

local state = "stateNotLinked"

<details id="genlinkstate"><summary><code>gen.linkState(stateTable)</code></summary><p style="margin-left: 25px">
<code>gen.linkState(stateTable)
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genlinkstate">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



-- gen.linkState(stateTable)
-- links the state table to the General Library
-- provides access to the state table so that
-- gen.getState() can provide it


function gen.linkState(stateTable)
    if type(stateTable) == "table" then
        state = stateTable
    else
        error("gen.linkState: linkState takes a table as an argument.")
    end
end

<details id="gengetstate"><summary><code>gen.getState()</code></summary><p style="margin-left: 25px">
<code>gen.getState()
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gengetstate">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



-- gen.getState()
-- returns the state table submitted to gen.linkState
-- If you're writing a module intended for use by others,
-- it is recommended that
-- you use a linkState system with a sub table, so that
-- table keys don't accidentally conflict
function gen.getState()
    return state
end





-- the ephemeralTable is a table for shared data
-- since it is not saved, it doesn't have to be serializeable,
-- so you don't have to worry about making keys and
-- values text or numbers
-- However, the information will not be preserved after a save and load
local ephemeralTable = {}


<details id="gengetephemeraltable"><summary><code>gen.getEphemeralTable()-->table</code></summary><p style="margin-left: 25px">
<code>gen.getEphemeralTable()-->table
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gengetephemeraltable">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

-- gen.getEphemeralTable()-->table
function gen.getEphemeralTable()
    return ephemeralTable
end

local genStateTable = "stateTableNotLinked"


<details id="genlinkgenerallibrarystate"><summary><code>gen.linkGeneralLibraryState(stateTable) --> void</code></summary><p style="margin-left: 25px">
<code>gen.linkGeneralLibraryState(stateTable) --> void
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genlinkgenerallibrarystate">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

-- gen.linkGeneralLibraryState(stateTable) --> void
-- links a sub table of the state table for the purposes of
-- providing a table for functions in the General Library
-- this is distinct from getState, which provides a state
-- 'visible' state table to the end user
function gen.linkGeneralLibraryState(stateTable)
    if type(stateTable) == "table" then
        genStateTable = stateTable
    else
        error("gen.linkGeneralLibraryState: linkGeneralLibraryState takes a table as an argument.")
    end
    genStateTable.limitedExecutions = genStateTable.limitedExecutions or {}
    genStateTable.persistentRandom = genStateTable.persistentRandom or {}
end







--
--
--

local defeatFunction = nil
local deathFunction = nil 
local deletionFunction = nil
local deathOutsideCombat = nil


<details id="gensetdeathfunctions"><summary><code>gen.setDeathFunctions(defeatFunction,deathFunction,deletionFunction) --> void</code></summary><p style="margin-left: 25px">
<code>gen.setDeathFunctions(defeatFunction,deathFunction,deletionFunction) --> void
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gensetdeathfunctions">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


-- gen.setDeathFunctions(defeatFunction,deathFunction,deletionFunction) --> void
--      defeatFunction(loser,winner,aggressor,victim,loserLocation,winnerVetStatus,loserVetStatus)--> nil or unit
--          function for when a unit is defeated either in game combat or in an event representing combat
--          if a unit is returned, that is a replacement unit for demotion
--      deathFunction(dyingUnit) --> void
--          for when a unit 'dies', either in standard or event combat, or through some other event 'kill'
--      deletionFunction(deletedUnit,replacingUnit=nil) --> void
--          maintenance for when a unit is deleted, either because of combat, death, replacement or some other 'administrative' situation.  If no replacing unit, the replacingUnit argument is nil
--  registers functions to be performed when a unit is defeated (either in game combat or events)
--  or deleted by events in some other way
--      deathNoCombatFn(dyingUnit) --> void
--          for when a unit dies, but not in combat or through the gen.defeatUnit function
function gen.setDeathFunctions(defeatFn,deathFn,deletionFn,deathNoCombatFn)
    defeatFunction = defeatFn
    deathFunction = deathFn
    deletionFunction = deletionFn
    deathOutsideCombat = deathNoCombatFn
end


<details id="genmakeallowedterrainfunction"><summary><code>gen.makeAllowedTerrainFunction(allowedTilesTable) --> function(tile)-->bool</code></summary><p style="margin-left: 25px">
<code>gen.makeAllowedTerrainFunction(allowedTilesTable) --> function(tile)-->bool
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genmakeallowedterrainfunction">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


-- gen.makeAllowedTerrainFunction(allowedTilesTable) --> function(tile)-->bool
--      converts a table of integer values into a function that returns
--      true if tile.terrainType%16 is a value in the table, and false otherwise
--      if nil is entered, all terrain is allowed
--
function gen.makeAllowedTerrainFunction(allowedTilesList)
    allowedTilesList = allowedTilesList or {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15}
    local allowedTilesTable = {}
    for __,terrainID in pairs(allowedTilesList) do
        allowedTilesTable[terrainID] = true
    end
    local function allowedTile(tile)
        return allowedTilesTable[(tile.terrainType % 16)] or false
    end
    return allowedTile
end

<details id="gennearbyunoccupiedtiles"><summary><code>gen.nearbyUnoccupiedTiles(tile,distance,allowedTiles) --> table</code></summary><p style="margin-left: 25px">
<code>gen.nearbyUnoccupiedTiles(tile,distance,allowedTiles) --> table
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gennearbyunoccupiedtiles">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>
-- 
-- gen.nearbyUnoccupiedTiles(tile,distance,allowedTiles) --> table
--      returns the table of nearby unoccupied tiles
--      Indices start at 1 without gaps, but tiles are in no particular order
--      tile is that you want to find other tiles near to (on same map)
--      distance is the number of squares away that you can search
--      allowetiles is either a table of integers such that a tile is acceptable if
--          possibleTile.terrainType % 16 appears as a value in the table
--      or a function allowedtiles(possibletile)-->bool
--          that returns true if the tile is allowed, and false if not
--      if nil is entered, all terrain is allowed
function gen.nearbyUnoccupiedTiles(centerTile,distance,allowedTiles)
    centerTile = toTile(centerTile)
    if type(allowedTiles) == "table" or type(allowedTiles) == "nil" then
        allowedTiles = gen.makeAllowedTerrainFunction(allowedTiles)
    end
    local newIndex = 1
    local tileList = {}
    for __,tile in pairs(gen.getTilesInRadius(centerTile,distance)) do
        if tile.defender == nil and tile.city == nil and allowedTiles(tile) then
            tileList[newIndex] = tile
            newIndex = newIndex+1
        end
    end
    return tileList
end

<details id="gengetrandomnearbyunoccupiedtile"><summary><code>gen.getRandomNearbyUnoccupiedTile(tile,distance,allowedTiles) --> tile</code></summary><p style="margin-left: 25px">
<code>gen.getRandomNearbyUnoccupiedTile(tile,distance,allowedTiles) --> tile
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gengetrandomnearbyunoccupiedtile">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

-- gen.getRandomNearbyUnoccupiedTile(tile,distance,allowedTiles) --> tile
--      returns a random square near tile, on the same map
--      tile is that you want to find other tiles near to (on same map)
--      returns nil if no suitable tile is found
--      distance is the number of squares away that you can search
--      allowetiles is either a table {[terraintype]=bool or nil}
--          such that a tile is acceptable if allowedtiles[possibletile.terraintype % 16] == true
--      or a function allowedtiles(possibletile)-->bool
--          that returns true if the tile is allowed, and false if not
--      if nil is entered, all terrain is allowed
function gen.getRandomNearbyUnoccupiedTile(tile,distance,allowedTiles)
    local tileList = gen.nearbyUnoccupiedTiles(tile,distance,allowedTiles)
    local numberOfTiles = #tileList
    if numberOfTiles > 0 then
        return tileList[math.random(1,numberOfTiles)]
    else
        return nil
    end
end


 <details id="gennearbyopentilesfortribe"><summary><code>gen.nearbyOpenTilesForTribe(centerTile,distance,allowedTiles,tribe)</code></summary><p style="margin-left: 25px">
<code> gen.nearbyOpenTilesForTribe(centerTile,distance,allowedTiles,tribe)
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gennearbyopentilesfortribe">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

--  gen.nearbyOpenTilesForTribe(centerTile,distance,allowedTiles,tribe)
--      returns a table of nearby tiles that are either unoccupied or occupied
--      by a specific tribe
--      centerTile is the tile that you want to find other tiles nearby to (on the same map)
--      distance is the number of squares away that you can search
--      allowedTiles is either a table of integers such that a tile is acceptable if
--          possibleTile.terrainType % 16 appears as a value in the table
--      or a function allowedTiles(possibleTile)-->bool
--          that returns true if the tile is allowed, and false if not
--      if nil is entered, all terrain is allowed
function gen.nearbyOpenTilesForTribe(centerTile,distance,allowedTiles,tribe)
    centerTile = toTile(centerTile)
    if type(allowedTiles) == "table"  or type(allowedTiles) == "nil" then
        allowedTiles = gen.makeAllowedTerrainFunction(allowedTiles)
    end
    local newIndex = 1
    local tileList = {}
    for __,tile in pairs(gen.getTilesInRadius(centerTile,distance)) do
        if (tile.defender == nil or tile.defender == tribe) and
            (tile.city == nil or (tile.city and tile.city.owner == tribe)) and
            allowedTiles(tile) then
            tileList[newIndex] = tile
            newIndex = newIndex+1
        end
    end
    return tileList
end

<details id="gengetrandomnearbyopentilefortribe"><summary><code>gen.getRandomNearbyOpenTileForTribe(tile,distance,allowedTiles,tribe) --> tile</code></summary><p style="margin-left: 25px">
<code>gen.getRandomNearbyOpenTileForTribe(tile,distance,allowedTiles,tribe) --> tile
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gengetrandomnearbyopentilefortribe">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>


-- gen.getRandomNearbyOpenTileForTribe(tile,distance,allowedTiles,tribe) --> tile
--      returns a random square near tile, on the same map, that is either
--      empty or only has units/city of the same tribe
--      tile is that you want to find other tiles near to (on same map)
--      returns nil if no suitable tile is found
--      distance is the number of squares away that you can search
--      allowetiles is either a table {[terraintype]=bool or nil}
--          such that a tile is acceptable if allowedtiles[possibletile.terraintype % 16] == true
--      or a function allowedtiles(possibletile)-->bool
--          that returns true if the tile is allowed, and false if not
--      tribe is the tribe that can be occupying 
--      if nil is entered, all terrain is allowed
function gen.getRandomNearbyOpenTileForTribe(centerTile,distance,allowedTiles,tribe)
    tileList = gen.nearbyOpenTilesForTribe(centerTile,distance,allowedTiles,tribe)
    local numberOfTiles = #tileList
    if numberOfTiles > 0 then
        return tileList[math.random(1,numberOfTiles)]
    else
        return nil
    end
end

<details id="gencreateunit"><summary><code>gen.createUnit(unitType,tribe,locations,options) --> table of units</code></summary><p style="margin-left: 25px">
<code>gen.createUnit(unitType,tribe,locations,options) --> table of units
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gencreateunit">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

-- gen.createUnit(unitType,tribe,locations,options) --> table of units
--      This is a createUnit function, meant to supersede civlua.createUnit
--      returns a table of units, indexed by integers starting at 1 (unless no units were created
--      unitType is the type of unit to be created
--      tribe is the tribe that will own the unit(s)
--      locations is one of the following
--          a tile object
--          a table of 3 elements, (indexed by integers 1,2,3) corresponding to x,y,z coordinate
--          a table of tile objects (indexed by integers)
--          a table of coordinate triple tables (indexed by integers)
--      options is a table with the following keys
--          count = integer
--              the number of units to create
--              nil means 1
--          randomize = bool or nil
--              if true, randomize the list of locations
--              if false or nil, try to place at the tile with the smallest index in table first
--          scatter = bool or nil
--              if true, and if randomize is true, each unit is created on a random tile
--              in the location table
--          inCapital = bool or nil
--              if true, attempt to place in the capital before other locations
--              in case of multiple capitals, capitals are ranked with smallest city id first
--              randomize/scatter applies to list of capitals if this is selected
--          veteran = bool or fraction in 0-1 or integer or nil
--              if true, make the created unis veteran
--              if a fraction in 0-1, each unit created has that chance of being veteran
--              if number >= 1, this many of the count are veteran (take floor)
--              nil or false means no veterans
--          homeCity = city or true or nil
--              if city, that city is the home city
--              if true, the game selects the home city (probably the same way a city is chosen if you
--              create a unit by using the cheat menu)
--              if nil, no home city
--          overrideCanEnter = bool or nil
--              if true, unit will be placed even if unitType:canEnter(tile) returns false
--              false or nil means follow the restriction 
--              civ.canEnter appears to check if the terrain is impassible, or the unit can cross impassible
--          overrideDomain = bool or nil
--              if true, sea units can be created on land outside cities, and land units at sea
--              false or nil means units can only be created where they could travel naturally
--          overrideDefender = bool or nil
--              if true, unit can be placed on tiles with enemy units or cities
--              false or nil means the tile must have no enemy cities, and no enemy defender
--
--

function gen.createUnit(unitType,tribe,locations,options)
    options = options or {}
    -- must copyTable locations, in case that table is used for multiple things
    -- mutating the original table could cause errors that are difficult to diagnose
    -- note: copyTable returns the input for things that are not tables
    locations = gen.copyTable(locations)
    if civ.isTile(locations) then
        -- toTile(locations) so that an error will be thrown if an invalid tile
        -- is used (e.g. loser.location if the loser is an attacker)
        locations = {toTile(locations)}
    elseif type(locations) =="table" then
        -- must copy the table, just in case it is referenced again
        if type(locations[1]) == "number" then
            -- if first index is a number, the table represents a single coordinate triple
            -- if the table is of tiles or coordinate triples, the first element will be either
            -- a table, a tile, or nil
            locations = {toTile(locations)}
        else
            -- make all the locations tiles
            for key,loc in pairs(locations) do
                locations[key] = toTile(loc)
            end
        end
    else
        error("gen.createUnit: Invalid argument for locations (arg 3).")
    end
    local function checkCanEnter(tile)
        return civ.canEnter(unitType,tile) or options.overrideCanEnter
    end
    local function checkDomain(tile)
        if options.overrideDomain then
            return true
        elseif unitType.domain == 2 then
            -- sea unit
            return (tile.terrainType % 16) == 10 or (tile.city and tile.city.coastal)
        elseif unitType.domain == 0 then
            -- land unit
            return (tile.terrainType % 16) ~= 10
        else
            -- air unit
            return true
        end
    end
    local function checkDefender(tile)
        if options.overrideDefender then
            return true
        end
        if tile.city and (tile.city.owner ~= tribe) then
            return false
        end
        if tile.defender and tile.defender ~= tribe then
            return false
        end
        return true
    end
    local function isTileValid(tile)
        if not tile then
            return false
        end
        return checkCanEnter(tile) and checkDomain(tile) and checkDefender(tile)
    end
    local capitals = {}
    if options.inCapital then
        for city in civ.iterateCities() do
            if city.owner == tribe and city:hasImprovement(civ.getImprovement(1)) then
                capitals[city.id] = city.location
            end
        end
    end
    for key,loc in pairs(capitals) do
        if not isTileValid(loc) then
            capitals[key] = nil
        end
    end
    for key,loc in pairs(locations) do
        if not isTileValid(loc) then
            locations[key] = nil
        end
    end
    local placementTable = nil
    if gen.isEmpty(capitals) then
        placementTable = locations
    else
        placementTable = capitals
    end
    gen.makeArrayOneToN(placementTable)
    local returnUnits = {}
    if gen.isEmpty(placementTable) then
        print("No units placed, since no valid location.")
        return returnUnits
    end
    local numToPlace = options.count or 1
    local vetCount = 0 
    local vetChance = 0  
    if options.veteran == true then
        vetCount = numToPlace
        vetChance = 1
    elseif type(options.veteran) == "number" and options.veteran < 1 then
        vetCount = numToPlace
        vetChance = options.veteran
    elseif type(options.veteran) == "number" then
        vetCount = math.floor(options.veteran)
        vetChance = 1
    end
    local placementTile = nil
    local placementTableSize = #placementTable
    if options.randomize then
        placementTile = placementTable[math.random(1,placementTableSize)]
    else
        placementTile = placementTable[1]
    end
    for i=1,numToPlace do
        if options.scatter and options.randomize then
            placementTile = placementTable[math.random(1,placementTableSize)]
        end
        local newUnit = civ.createUnit(unitType,tribe,placementTile)
        returnUnits[i] = newUnit
        if i<=vetCount and (math.random() <= vetChance) then
            newUnit.veteran = true
        end
        if options.homeCity ~= true then
            -- if homeCity is true, the unit keeps the default home city it got when it was
            -- created
            -- if homeCity not specified, that means the unit has no home city, so next line works
            -- if homeCity is specified, next line works also
            newUnit.homeCity = options.homeCity
        end
    end
    return returnUnits
end


<details id="genpersistentrandom"><summary><code>gen.persistentRandom(key) --> number between 0 and 1</code></summary><p style="margin-left: 25px">
<code>gen.persistentRandom(key) --> number between 0 and 1
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genpersistentrandom">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>

-- gen.persistentRandom(key) --> number between 0 and 1
-- checks the persistentRandom table (within the state table)
-- for a value associated with key. If it exits, the value is
-- returned.  If it does not exist, a random number between
-- 0 and 1 is generated, stored in the table under the key,
-- and also returned
-- example of use: WWII scenario with seasons
-- You may want to have some games where the 1941 spring starts
-- in April, and other games where it starts in May.  When
-- determining whether to load winter or summer terrain stats during
-- 1941, you would use gen.persistentRandom("EarlySpring1941") < 0.5
-- as part of the season check in April, and load summer if the value is less than 0.5
-- and winter otherwise.  This way, each when each player starts their
-- game that month, they will all either get winter or summer terrain
function gen.persistentRandom(key)
    genStateTable.persistentRandom[key] = genStateTable.persistentRandom[key] or math.random()
    return genStateTable.persistentRandom[key]
end

<details id="genclearpersistentrandom"><summary><code>gen.clearPersistentRandom(key) --> void</code></summary><p style="margin-left: 25px">
<code>gen.clearPersistentRandom(key) --> void
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#genclearpersistentrandom">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>




-- gen.clearPersistentRandom(key) --> void
-- sets the value associated with the key in the
-- persistentRandom table.  This could either be for reuse of the key,
-- or to prevent the key from staying in the state table indefinitely
function gen.clearPersistentRandom(key)
    genStateTable.persistentRandom[key] = nil
end

<details id="gengetpersistentrandomtable"><summary><code>gen.getPersistentRandomTable() --> table</code></summary><p style="margin-left: 25px">
<code>gen.getPersistentRandomTable() --> table
</code>
Description Here.
<br>Valid Arguments:
<code>

</code>
<br><a href="#gengetpersistentrandomtable">Link to here.</a> (Click link, then copy the link from your browser address bar.)
<br>
</p>
</details>



-- gen.getPersistentRandomTable() --> table
-- returns the persistentRandom table
function gen.getPersistentRandomTable()
    return genStateTable.persistentRandom
end


    
return gen
