
const doc = require("./docConvertFunctions")
const autoDoc  = require("./autoDocFunctions")
autoDoc.setTemplateDirectory("/home/thomas/Desktop/Link to Test of Time 16/Template")

const genAutoDoc = autoDoc.getAutoDocSections("LuaCore/generalLibrary.lua")

const genFileName = "gen"


function writeGenerallyUsefulFunctions() {
doc.writeSection("Generally Useful Functions","These functions are generally useful for creating events.",[
	"gen.createUnit",
	"gen.copyUnitAttributes",
	"gen.defeatUnit",
	"gen.killUnit",
	"gen.deleteUnit",
	"gen.replaceUnit",
	"gen.limitedExecutions",
	"gen.justOnce",
	"gen.isWonderActiveForTribe",
	"gen.distance",
	"gen.tileDist",
	"gen.gameMechanicDistance",
	"gen.fullHealthMovementAllowance",
	"gen.maxMoves",
	"gen.moveRemaining",
	"gen.inPolygon",
	"gen.getRandomTileInPolygon",
	"gen.cityCanSupportAnotherUnit",
	"gen.homeToNearestCity",
	"gen.unitTypeOnTile",
	"gen.getAdjacentTiles",
	"gen.moveUnitAdjacent",
	"gen.unprotectTile",
	"gen.clearAirProtection",
	"gen.clearAdjacentAirProtection",
	"gen.cityRadiusTiles",
	"gen.getTilesInRadius",
	"gen.playMusic",
	"gen.isSinglePlayerGame",
	"gen.nearbyUnits",
	"gen.makeAllowedTerrainFunction",
	"gen.nearbyUnoccupiedTiles",
	"gen.getRandomNearbyUnoccupiedTile",
	"gen.nearbyOpenTilesForTribe",
	"gen.getRandomNearbyOpenTileForTribe",
	"gen.getTileProduction",
	"gen.computeBaseProduction",
	"gen.spendMovementPoints",
	"gen.getBearing",
	"gen.isInteger",
	"gen.getMapTransportFlagNumber",
	"gen.getNumberOfTerrainTypes",
	"gen.getState",
	"gen.getEphemeralTable",
	"gen.iterateUnitTypes",
	"gen.iterateImprovements",
	"gen.iterateWonders",
	"gen.iterateBaseTerrain",
	"gen.iterateTerrain",
	"gen.isRoadTradeBonus",
	"gen.giveRoadTradeBonus",
	"gen.removeRoadTradeBonus",
	"gen.fullHealthMovementAllowance",
],genFileName)}

function writeTileImprovementFunctions() {
doc.writeSection("Tile Improvement Functions", "These functions interact with tile improvements.",
[
	"gen.toTile",
	"gen.hasIrrigation",
	"gen.placeIrrigation",
	"gen.removeIrrigation",
	"gen.hasMine",
	"gen.placeMine",
	"gen.placeMineUnderCity",
	"gen.removeMine",
	"gen.removeMineUnderCity",
	"gen.hasFarmland",
	"gen.placeFarmland",
	"gen.removeFarmland",
	"gen.hasAgriculture",
	"gen.improveAgriculture",
	"gen.degradeAgriculture",
	"gen.removeAgriculture",
	"gen.hasRoad",
	"gen.placeRoad",
	"gen.removeRoad",
	"gen.hasRailroad",
	"gen.placeRailroad",
	"gen.removeRailroad",
	"gen.hasTransportation",
	"gen.upgradeTransportation",
	"gen.degradeTransportation",
	"gen.removeTransportation",
	"gen.hasFortress",
	"gen.placeFortress",
	"gen.placeFortressForce",
	"gen.removeFortress",
	"gen.hasAirbase",
	"gen.placeAirbase",
	"gen.placeAirbaseForce",
	"gen.removeAirbase",
	"gen.hasPollution",
	"gen.placePollution",
	"gen.placePollutionForce",
	"gen.removePollution",
	"gen.hasTransporter",
	"gen.placeTransporter",
	"gen.removeTransporter",
],genFileName)}

function writeCityAttributeFunctions() {
doc.writeSection("City Attribute Functions","These functions change the attribute flags of cities.  Many of these flags have unknown effects.",
[
	"gen.isCivilDisorder",
	"gen.setCivilDisorder",
	"gen.clearCivilDisorder",
	"gen.isWeLoveTheKing",
	"gen.setWeLoveTheKing",
	"gen.clearWeLoveTheKing",
	"gen.isImprovementSold",
	"gen.setImprovementSold",
	"gen.clearImprovementSold",
	"gen.isTechnologyStolen",
	"gen.setTechnologyStolen",
	"gen.clearTechnologyStolen",
	"gen.isAutoBuild",
	"gen.setAutoBuild",
	"gen.clearAutoBuild",
	"gen.isAttribute6",
	"gen.setAttribute6",
	"gen.clearAttribute6",
	"gen.isAttribute7",
	"gen.setAttribute7",
	"gen.clearAttribute7",
	"gen.isBuildCoastal",
	"gen.setBuildCoastal",
	"gen.clearBuildCoastal",
	"gen.isAttribute9",
	"gen.setAttribute9",
	"gen.clearAttribute9",
	"gen.isAttribute10",
	"gen.setAttribute10",
	"gen.clearAttribute10",
	"gen.isAttribute11",
	"gen.setAttribute11",
	"gen.clearAttribute11",
	"gen.isBuildHydroPlant",
	"gen.setBuildHydroPlant",
	"gen.clearBuildHydroPlant",
	"gen.isAttribute13",
	"gen.setAttribute13",
	"gen.clearAttribute13",
	"gen.isAttribute14",
	"gen.setAttribute14",
	"gen.clearAttribute14",
	"gen.isAttribute15",
	"gen.setAttribute15",
	"gen.clearAttribute15",
	"gen.isAttribute16",
	"gen.setAttribute16",
	"gen.clearAttribute16",
	"gen.isUsedAirport",
	"gen.setUsedAirport",
	"gen.clearUsedAirport",
	"gen.isAttribute18",
	"gen.setAttribute18",
	"gen.clearAttribute18",
	"gen.isAttribute19",
	"gen.setAttribute19",
	"gen.clearAttribute19",
	"gen.isAttribute20",
	"gen.setAttribute20",
	"gen.clearAttribute20",
	"gen.isAttribute21",
	"gen.setAttribute21",
	"gen.clearAttribute21",
	"gen.isBuildShips",
	"gen.setBuildShips",
	"gen.clearBuildShips",
	"gen.isCityInvestigated",
	"gen.setCityInvestigated",
	"gen.clearCityInvestigated",
	"gen.isAttribute24",
	"gen.setAttribute24",
	"gen.clearAttribute24",
	"gen.isMilitaryAutoBuild",
	"gen.setMilitaryAutoBuild",
	"gen.clearMilitaryAutoBuild",
	"gen.isDomesticAutoBuild",
	"gen.setDomesticAutoBuild",
	"gen.clearDomesticAutoBuild",
	"gen.isObjective",
	"gen.setObjective",
	"gen.clearObjective",
	"gen.isAttribute28",
	"gen.setAttribute28",
	"gen.clearAttribute28",
	"gen.isMajorObjective",
	"gen.setMajorObjective",
	"gen.clearMajorObjective",
	"gen.isUsedTransporter",
	"gen.setUsedTransporter",
	"gen.clearUsedTransporter",
	"gen.isAttribute31",
	"gen.setAttribute31",
	"gen.clearAttribute31",
	"gen.isAttribute32",
	"gen.setAttribute32",
	"gen.clearAttribute32",
],genFileName)}

function writeUnitOrderFunctions() {
doc.writeSection("Unit Order Functions", "These functions interact with the orders given to units.",
[
	"gen.isFortifying",
	"gen.setToFortifying",
	"gen.isFortified",
	"gen.setToFortified",
	"gen.isSleeping",
	"gen.setToSleeping",
	"gen.isBuildingFortress",
	"gen.setToBuildingFortress",
	"gen.isBuildingRoad",
	"gen.setToBuildingRoad",
	"gen.isIrrigating",
	"gen.setToIrrigating",
	"gen.isMining",
	"gen.setToMining",
	"gen.isTransformingTerrain",
	"gen.setToTransformingTerrain",
	"gen.isBuildingAirbase",
	"gen.setToBuildingAirbase",
	"gen.isBuildingTransporter",
	"gen.setToBuildingTransporter",
	"gen.isCleaningPollution",
	"gen.setToCleaningPollution",
	"gen.isGoingTo",
	"gen.setToGoingTo",
	"gen.isNoOrder",
	"gen.setToNoOrders",
	"gen.isWaiting",
	"gen.setToWaiting",
	"gen.clearWaiting",
	"gen.isParadropped",
	"gen.setParadropped",
	"gen.clearParadropped",
	"gen.isMoved",
	"gen.setMoved",
	"gen.clearMoved",
],genFileName)}

function writeUniTypeFlagFunctions() {
doc.writeSection("Unit Type Flag Functions","These functions interact with the unit special ability flags.",
[
	"gen.isSeeTwoSpaces",
	"gen.giveSeeTwoSpaces",
	"gen.removeSeeTwoSpaces",
	"gen.isIgnoreZOC",
	"gen.giveIgnoreZOC",
	"gen.removeIgnoreZOC",
	"gen.isAmphibious",
	"gen.giveAmphibious",
	"gen.removeAmphibious",
	"gen.isSubmarine",
	"gen.giveSubmarine",
	"gen.removeSubmarine",
	"gen.isAttackAir",
	"gen.giveAttackAir",
	"gen.removeAttackAir",
	"gen.isCoastal",
	"gen.giveCoastal",
	"gen.removeCoastal",
	"gen.isIgnoreWalls",
	"gen.giveIgnoreWalls",
	"gen.removeIgnoreWalls",
	"gen.isCarryAir",
	"gen.giveCarryAir",
	"gen.removeCarryAir",
	"gen.isParadrop",
	"gen.giveParadrop",
	"gen.removeParadrop",
	"gen.isAlpine",
	"gen.giveAlpine",
	"gen.removeAlpine",
	"gen.isBonusAgainstHorse",
	"gen.giveBonusAgainstHorse",
	"gen.removeBonusAgainstHorse",
	"gen.isFreeSupportUnderFundamentalism",
	"gen.giveFreeSupportUnderFundamentalism",
	"gen.removeFreeSupportUnderFundamentalism",
	"gen.isDestroyedAfterAttacking",
	"gen.giveDestroyedAfterAttacking",
	"gen.removeDestroyedAfterAttacking",
	"gen.isBonusAgainstAir",
	"gen.giveBonusAgainstAir",
	"gen.removeBonusAgainstAir",
	"gen.isSpotSubmarines",
	"gen.giveSpotSubmarines",
	"gen.removeSpotSubmarines",
	"gen.isInvisibleUntilAttack",
	"gen.giveInvisibleUntilAttack",
	"gen.removeInvisibleUntilAttack",
	"gen.isNonDisbandable",
	"gen.giveNonDisbandable",
	"gen.removeNonDisbandable",
	"gen.isZeroRangeAirUnitDamageOverride",
	"gen.giveZeroRangeAirUnitDamageOverride",
	"gen.removeZeroRangeAirUnitDamageOverride",
	"gen.isCannotBuyOffBarbarian",
	"gen.giveCannotBuyOffBarbarian",
	"gen.removeCannotBuyOffBarbarian",
	"gen.isCanCrossImpassableTerrain",
	"gen.giveCanCrossImpassableTerrain",
	"gen.removeCanCrossImpassableTerrain",
	"gen.isBarbarianWillNotExpire",
	"gen.giveBarbarianWillNotExpire",
	"gen.removeBarbarianWillNotExpire",
	"gen.isOverrideSPR",
	"gen.giveOverrideSPR",
	"gen.removeOverrideSPR",
	"gen.isReducePopulationWhenBuilt",
	"gen.giveReducePopulationWhenBuilt",
	"gen.removeReducePopulationWhenBuilt",
	"gen.isRequiresFoodSupport",
	"gen.giveRequiresFoodSupport",
	"gen.removeRequiresFoodSupport",
	"gen.isCanFoundCities",
	"gen.giveCanFoundCities",
	"gen.removeCanFoundCities",
	"gen.isCanImproveTiles",
	"gen.giveCanImproveTiles",
	"gen.removeCanImproveTiles",
	"gen.isAllowedOnMap",
	"gen.giveAllowedOnMap",
	"gen.removeAllowedOnMap",
	"gen.isNativeTransportBetweenMaps",
	"gen.giveNativeTransportBetweenMaps",
	"gen.removeNativeTransportBetweenMaps",
	"gen.isBuildTransportBetweenMaps",
	"gen.giveBuildTransportBetweenMaps",
	"gen.removeBuildTransportBetweenMaps",
	"gen.isUseTransportBetweenMaps",
	"gen.giveUseTransportBetweenMaps",
	"gen.removeUseTransportBetweenMaps",
],genFileName)}

function writeMapVisibilityFunctions() {
doc.writeSection("Map Visibility Functions","These functions control what is shown to individual tribes on the map.",
[
	"gen.isTileRevealed",
	"gen.revealTile",
	"gen.coverTile",
	"gen.isUnitStackVisible",
	"gen.hideUnitStack",
	"gen.revealUnitStack",
	"gen.isCityCharted",
	"gen.chartCity",
	"gen.unchartCity",
	"gen.isIrrigationCharted",
	"gen.chartIrrigation",
	"gen.unchartIrrigation",
	"gen.isMineCharted",
	"gen.chartMine",
	"gen.unchartMine",
	"gen.isFarmlandCharted",
	"gen.chartFarmland",
	"gen.unchartFarmland",
	"gen.isRoadCharted",
	"gen.chartRoad",
	"gen.unchartRoad",
	"gen.isRailroadCharted",
	"gen.chartRailroad",
	"gen.unchartRailroad",
	"gen.unchartTransportation",
	"gen.isFortressCharted",
	"gen.chartFortress",
	"gen.unchartFortress",
	"gen.isAirbaseCharted",
	"gen.chartAirbase",
	"gen.unchartAirbase",
	"gen.isPollutionCharted",
	"gen.chartPollution",
	"gen.unchartPollution",
	"gen.isTransporterCharted",
	"gen.chartTransporter",
	"gen.unchartTransporter",
	"gen.chartTruthfully",
],genFileName)}

function writeMarkerFunctions() {
doc.writeSection("Marker Functions",
`Placing a marker on a tile changes the visible improvements for that tile, so that the tribe can now see the \`markerOption\` ("irrigation", "pollution", etc) on the tile.  However, information about the marker is stored in the state table (along with the originally visible improvements), so that the marker can be displayed again if it stops being visible, and removed if that is desired.  

The valid options for markers are: "irrigation", "mine", "farmland", "road", "railroad", "fortress", "airbase", "pollution", "transporter".  (Note: although the code works for using transporter markers, they may not be visible in practice.)
`,
[
	"gen.placeMarker",
	"gen.removeMarker",
	"gen.maintainTileMarkerTable",
	"gen.removeAllMarkers",
	"gen.removeMarkersFromTile",
	"gen.showAllMarkersOnTile",
	"gen.showAllMarkers",
	"gen.hasMarker",
	"gen.isMarkerVisible",
	"gen.hideMarker",
	"gen.hideAllMarkers",
	"gen.hideAllMarkersOnTile",
	"gen.showMarker",
	"gen.showMarkerOnAllTiles",
],genFileName)}

function writeBitmaskTools() {
doc.writeSection("Bitmask Tools",
`These tools can be helpful if you have a reason to perform bitwise operations.  Note, however, that the General Library might already have a function which can achieve your objective.`,
[
	"gen.checkBits",
	"gen.setBits",
	"gen.printBits",
	"gen.bitmaskToString",
	"gen.isBit1",
	"gen.isBit0",
	"gen.setBit1",
	"gen.setBit0",
	"gen.isTransportBetweenMaps",
	"gen.giveTransportBetweenMaps",
	"gen.removeTransportBetweenMaps",
],genFileName)}

function writeTableTools() {
doc.writeSection("Table Tools",
`These functions can be helpful when working with tables.`,
[
	"gen.inTable",
	"gen.copyTable",
	"gen.copyTableWithMetatable",
	"gen.isEmpty",
	"gen.mergeTableValues",
	"gen.clearGapsInArray",
	"gen.makeArrayOneToN",
	"gen.tableWrap",
	"gen.errorForNilKey",
	"gen.noNewKey",
	"gen.isStateSavable",
	"gen.tableToString",
	"gen.makeDataTable",
	"gen.forbidReplacement",
	"gen.allowReplacement",
	"gen.forbidNewKeys",
	"gen.allowNewKeys",
	"gen.forbidNilValueAccess",
	"gen.allowNilValueAccess",
	"gen.restrictValues",
	"gen.makeThresholdTable",
	"gen.persistentRandom",
	"gen.clearPersistentRandom",
	"gen.getPersistentRandomTable",
	"gen.newEmptyStack",
	"gen.newStack",
	"gen.isStack",
],genFileName)}

function writeNonstandardIDFunctions() {
doc.writeSection("Non-Standard ID Functions","These functions map Lua objects without an `id` field to suitable integers, or provide a way to go from the integer back to the original object.",
[
	"gen.getBaseTerrainID",
	"gen.getBaseTerrainFromID",
	"gen.getTerrainID",
	"gen.getTerrainFromID",
	"gen.getTileID",
	"gen.getTileFromID",
],genFileName)}

function writeEventAndModuleMachinery() {
doc.writeSection("Event and Module Machinery",
`These functions help modules work, or are used to provide functionality
which was not substantial enough to merit a separate module.`,
[
	"gen.rehomeUnitsInCapturedCity",
	"gen.linkActivationFunction",
	"gen.getActivationFunction",
	"gen.noGlobal",
	"gen.restoreGlobal",
	"gen.linkState",
	"gen.linkGeneralLibraryState",
	"gen.setDeathFunctions",
	"gen.setScenarioDirectory",
	"gen.getScenarioDirectory",
	"gen.setOutOfRangeMessage",
	"gen.outOfRangeMessage",
	"gen.activateRangeForLandAndSea",
	"gen.versionFunctions",
	"gen.registerEventsLuaVersion",
	"gen.setMusicDirectory",
	"gen.betterUnitManualWait",
	"gen.clearManualWait",
	"gen.selectNextActiveUnit",
	"gen.makeClearAirProtection",
	"gen.minEventsLuaVersion",
	"gen.registerAuthoritativeDefaultRules",
	"gen.registerCustomCosmic",
	"gen.requireIfAvailable",
],genFileName)}

function writeItemWeightFunctions() {
doc.writeSection("Item Weight Functions", 
`These functions provide a way to assign "weights" to items, based on a standard set
of criteria. Choosing item(s) with large (or small) weights can be a convenient way
for a program to choose between different options.`,
[
	"gen.calculateWeight",
	"gen.getExtremeWeights",
	"gen.getBiggestWeights",
	"gen.getSmallestWeights",
],genFileName) }

function writeCustomDataValidation() {
doc.writeSection("Custom Data Types and Validation",
`
The functions in this section can be used to check that functions 
have received valid data as arguments, or to create tables
which can only have values assigned to particular keys, and
only specific kinds of values.  These tools can aid development
by causing invalid data to be detected at its source rather than
when it actually breaks the program.  
These functions are built on a data structure called the \`valueSpecification\`.  It is a table with the following keys and values:<br><br>["nil"] = true or nil<br>If this key is true, the specified value can be nil.<br><br>["boolean"] = true, "true", "false", or nil<br>If this key is true (boolean value), the specified value can be a boolean.<br>If this key is "true" (string), then the specified value can be true, but not false.<br>If this key is "false" (string), then the specified value can be false, but not true.<br>If this key is nil, the specified value can't be a boolean.<br><br>["function"] = true, string, or nil<br>if this key is true or string, the specified value can be a function.<br>If string, the string describes the function, e.g. \`function(unit)-->number\`.  Value specification checks do not check if the function actually matches the description, only that it is a function.<br>If this key is nil, the specified value can't be a function.<br><br>["number"] = true or nil or {minVal=number/nil, maxVal=number/nil, integer=true/nil}<br>If true, the specified value can be any number.  If nil, the specified value can't be a number.<br>If table, any number must also be larger than the \`minVal\` (if specified) and smaller than the \`maxVal\` (if specified).  If the \`integer\` key is true, the value must also be an integer.<br><br>["string"] = true or {[validString] = truthy} or nil<br>If this key is true, any string is allowed.<br>If it is a table, any string value must be a key in that table, with a truthy (anything other than false/nil) associated value.<br>If nil, the value can't be a string.<br><br>["table"]=string, true, nil, or {[1]=function(table)->true or string, [2]=string}<br>If the key is a string, any table is accepted, and the string describes the kind of table needed.<br>If true, any table is accepted, and a generated description will be 'table'.<br>If the key is a table, the table's value for \`1\` is a function, which returns true if specified value is an acceptable table, and a string describing the problem if it is not.  The value for \`2\` is a string describing the required table, for generated descriptions/errors.<br>If nil, the specified value can't be a table.<br><br>["userdata"] = {[dataTypeName]=isDataTypeFn} or nil<br>The keys to this table are strings that describe acceptable userdata, and the values are functions which return true if the specified value matches the type, and false otherwise.<br>E.g.<br>\`{["unitTypeObject"] = civ.isUnitType, ["cityObject"] = civ.isCity}\`<br>Allows unitTypeObjects and cityObjects, but not other kinds of userdata.
`,[
	"gen.valueSatisfiesSpecification",
	"gen.validateFunctionArgument",
	"gen.createDataType",
	"gen.valueSpecForCustomData",
	"gen.describeAllowableValues",
	"gen.validateTableValue",
	"gen.tableOfValueSpecification",
	"gen.valueSpecificationOrTableOfValueSpecification",
	"gen.validateValueSpecificationKeys",
],genFileName)}




const alternateNamesArray = []
doc.markAsAlternateName("gen.isAttribute17","gen","isUsedAirport",alternateNamesArray)
doc.markAsAlternateName("gen.setAttribute17","gen","setUsedAirport",alternateNamesArray)
doc.markAsAlternateName("gen.clearAttribute17","gen","clearUsedAirport",alternateNamesArray)

doc.markAsAlternateName("gen.isAttribute23","gen","isCityInvestigated",alternateNamesArray)
doc.markAsAlternateName("gen.setAttribute23","gen","setCityInvestigated",alternateNamesArray)
doc.markAsAlternateName("gen.clearAttribute23","gen","clearCityInvestigated",alternateNamesArray)

doc.markAsAlternateName("gen.isAttribute30","gen","isUsedTransporter",alternateNamesArray)
doc.markAsAlternateName("gen.setAttribute30","gen","setUsedTransporter",alternateNamesArray)
doc.markAsAlternateName("gen.clearAttribute30","gen","clearUsedTransporter",alternateNamesArray)
doc.markAsAlternateName("gen.describeAllowableData","gen","describeAllowableValues",alternateNamesArray)
doc.markAsAlternateName("gen.checkValidDataInfo","gen","validateValueSpecificationKeys",
alternateNamesArray)
doc.markAsAlternateName("gen.valueSatisfiesValidDataInfo","gen","validateValueSpecificationKeys",alternateNamesArray)
doc.markAsAlternateName("gen.tableOfVDI","gen","tableOfValueSpecification",alternateNamesArray)
doc.markAsAlternateName("gen.vDIOrTableOfVDI","gen", "valueSpecificationOrTableOfValueSpecification",alternateNamesArray)
doc.markAsAlternateName("gen.valueSpecOrTable","gen", "valueSpecificationOrTableOfValueSpecification",alternateNamesArray)
doc.markAsAlternateName("gen.wonderModifiedMoves","gen","fullHealthMovementAllowance",alternateNamesArray)
doc.markAsAlternateName("gen.getBaseTerrainFromId","gen","getBaseTerrainFromID",alternateNamesArray)
doc.markAsAlternateName("gen.getBaseTerrainId","gen","getBaseTerrainID",alternateNamesArray)
doc.markAsAlternateName("gen.getTerrainFromId","gen","getTerrainFromID",alternateNamesArray)
doc.markAsAlternateName("gen.getTerrainId","gen","getTerrainID",alternateNamesArray)
doc.markAsAlternateName("gen.getTileFromId","gen","getTileFromID",alternateNamesArray)
doc.markAsAlternateName("gen.getTileId","gen","getTileID",alternateNamesArray)
doc.markAsAlternateName("gen.giveAmpibious","gen","giveAmphibious",alternateNamesArray)
doc.markAsAlternateName("gen.giveIngoreWalls","gen","giveIgnoreWalls",alternateNamesArray)
doc.markAsAlternateName("gen.removeSeeTowSpaces","gen","removeSeeTwoSpace",alternateNamesArray)


function writeAlternateNames() {
doc.writeSection("Alternate Names","This section contains entries with alternate names for functions.  This is often because the function's primary name was changed, but the original name is kept available for backwards compatibility.  Sometimes, the alternate name is simply shorter.",alternateNamesArray,genFileName)}

function writeObsoleteFunctions() {
doc.writeSection("Obsolete Functions","These functions exist for backwards compatibility, but they're no longer the preferred (or required) way of doing things.",
[
	"gen.isMapFlat",
	"gen.isMapRound",
	"gen.declareMapFlat",
	"gen.declareMapRound",
	"gen.setTerrainType",
	"gen.activate",
	"gen.activateWithSource",
],genFileName)}

doc.excludeFromLeftovers([
	"gen.c","gen.constants","gen.markerOptions","gen.original","gen.validMarkerOptionsList",
])

function writeUncategorised() {
doc.writeSection("Uncategorised", "These functions have not been assigned to a section.  Some might be new functions which have been automatically documented, but not yet assigned to a section of this page.",
"leftovers",genFileName)}

writeGenerallyUsefulFunctions()
writeTableTools()
writeCustomDataValidation()
writeNonstandardIDFunctions()
writeMarkerFunctions()
writeItemWeightFunctions()
writeTileImprovementFunctions()
writeCityAttributeFunctions()
writeUnitOrderFunctions()
writeUniTypeFlagFunctions()
writeMapVisibilityFunctions()
writeBitmaskTools()
writeAlternateNames()
writeEventAndModuleMachinery()
writeObsoleteFunctions()
writeUncategorised()

doc.setFrontMatter(genFileName,"title","General Library")
doc.setFrontMatter(genFileName,"tabTitle","gen.lua Documentation")
doc.setFrontMatter(genFileName,"minTOC","2")
doc.setFrontMatter(genFileName,"maxTOC","3")
//doc.setFrontMatter(genFileName,"introduction",genAutoDoc["generalLibrary"].paragraph)
doc.markFileCustomised(genFileName)

const genOriginalFileName = "gen_original"
doc.setFrontMatter(genOriginalFileName,"title","The gen.original Table")
doc.setFrontMatter(genOriginalFileName,"tabTitle","gen.original Reference")
doc.setFrontMatter(genOriginalFileName,"minTOC","2")
doc.setFrontMatter(genOriginalFileName,"maxTOC","3")

function writeAdvances() {
doc.writeSection("Advances","",[
	"gen.original.aAdvancedFlight",
"gen.original.aAlphabet",
"gen.original.aAmphibiousWarfare",
"gen.original.aAstronomy",
"gen.original.aAtomicTheory",
"gen.original.aAutomobile",
"gen.original.aBanking",
"gen.original.aBridgeBuilding",
"gen.original.aBronzeWorking",
"gen.original.aCeremonialBurial",
"gen.original.aChemistry",
"gen.original.aChivalry",
"gen.original.aCodeofLaws",
"gen.original.aCodeOfLaws",
"gen.original.aCombinedArms",
"gen.original.aCombustion",
"gen.original.aCommunism",
"gen.original.aComputers",
"gen.original.aConscription",
"gen.original.aConstruction",
"gen.original.aCorporation",
"gen.original.aCurrency",
"gen.original.aDemocracy",
"gen.original.aEconomics",
"gen.original.aElectricity",
"gen.original.aElectronics",
"gen.original.aEngineering",
"gen.original.aEnvironmentalism",
"gen.original.aEspionage",
"gen.original.aExplosives",
"gen.original.aFeudalism",
"gen.original.aFlight",
"gen.original.aFundamentalism",
"gen.original.aFusionPower",
"gen.original.aGeneticEngineering",
"gen.original.aGuerrillaWarfare",
"gen.original.aGunpowder",
"gen.original.aHorsebackRiding",
"gen.original.aIndustrialization",
"gen.original.aInvention",
"gen.original.aIronWorking",
"gen.original.aLaborUnion",
"gen.original.aLaser",
"gen.original.aLeadership",
"gen.original.aLiteracy",
"gen.original.aMachineTools",
"gen.original.aMagnetism",
"gen.original.aMapMaking",
"gen.original.aMasonry",
"gen.original.aMassProduction",
"gen.original.aMathematics",
"gen.original.aMedicine",
"gen.original.aMetallurgy",
"gen.original.aMiniaturization",
"gen.original.aMobileWarfare",
"gen.original.aMonarchy",
"gen.original.aMonotheism",
"gen.original.aMysticism",
"gen.original.aNavigation",
"gen.original.aNuclearFission",
"gen.original.aNuclearPower",
"gen.original.aPhilosophy",
"gen.original.aPhysics",
"gen.original.aPlastics",
"gen.original.aPlumbing",
"gen.original.aPolytheism",
"gen.original.aPottery",
"gen.original.aRadio",
"gen.original.aRailroad",
"gen.original.aRecycling",
"gen.original.aRefining",
"gen.original.aRefrigeration",
"gen.original.aRepublic",
"gen.original.aRobotics",
"gen.original.aRocketry",
"gen.original.aSanitation",
"gen.original.aSeafaring",
"gen.original.aSpaceFlight",
"gen.original.aStealth",
"gen.original.aSteamEngine",
"gen.original.aSteel",
"gen.original.aSuperconductor",
"gen.original.aTactics",
"gen.original.aTheology",
"gen.original.aTheoryofGravity",
"gen.original.aTheoryOfGravity",
"gen.original.aTrade",
"gen.original.aUniversity",
"gen.original.aWarriorCode",
"gen.original.aWheel",
"gen.original.aWriting",
"gen.original.aFutureTechnology",
"gen.original.aUserDefTechA",
"gen.original.aUserDefTechB",
"gen.original.aUserDefTechC",
"gen.original.aExtraAdvance1",
"gen.original.aExtraAdvance2",
"gen.original.aExtraAdvance3",
"gen.original.aExtraAdvance4",
"gen.original.aExtraAdvance5",
"gen.original.aExtraAdvance6",
"gen.original.aExtraAdvance7",
],genOriginalFileName)
}

function writeImprovements() {
doc.writeSection("Improvements","",[
"gen.original.iNothing",
"gen.original.iPalace",
"gen.original.iBarracks",
"gen.original.iGranary",
"gen.original.iTemple",
"gen.original.iMarketPlace",
"gen.original.iLibrary",
"gen.original.iCourthouse",
"gen.original.iCityWalls",
"gen.original.iAqueduct",
"gen.original.iBank",
"gen.original.iCathedral",
"gen.original.iUniversity",
"gen.original.iMassTransit",
"gen.original.iColosseum",
"gen.original.iFactory",
"gen.original.iManufacturingPlant",
"gen.original.iSDIDefense",
"gen.original.iRecyclingCenter",
"gen.original.iPowerPlant",
"gen.original.iHydroPlant",
"gen.original.iNuclearPlant",
"gen.original.iStockExchange",
"gen.original.iSewerSystem",
"gen.original.iSupermarket",
"gen.original.iSuperhighways",
"gen.original.iResearchLab",
"gen.original.iSAMMissileBattery",
"gen.original.iCoastalFortress",
"gen.original.iSolarPlant",
"gen.original.iHarbor",
"gen.original.iOffshorePlatform",
"gen.original.iAirport",
"gen.original.iPoliceStation",
"gen.original.iPortFacility",
"gen.original.iTransporter",
"gen.original.iSSStructural",
"gen.original.iSSComponent",
"gen.original.iSSModule",
"gen.original.iCapitalization",
],genOriginalFileName)


}

function writeUnits() {
doc.writeSection("Unit Types","",[
"gen.original.uSettlers",
"gen.original.uEngineers",
"gen.original.uWarriors",
"gen.original.uPhalanx",
"gen.original.uArchers",
"gen.original.uLegion",
"gen.original.uPikemen",
"gen.original.uMusketeers",
"gen.original.uFanatics",
"gen.original.uPartisans",
"gen.original.uAlpineTroops",
"gen.original.uRiflemen",
"gen.original.uMarines",
"gen.original.uParatroopers",
"gen.original.uMechInf",
"gen.original.uHorsemen",
"gen.original.uChariot",
"gen.original.uElephant",
"gen.original.uCrusaders",
"gen.original.uKnights",
"gen.original.uDragoons",
"gen.original.uCavalry",
"gen.original.uArmor",
"gen.original.uCatapult",
"gen.original.uCannon",
"gen.original.uArtillery",
"gen.original.uHowitzer",
"gen.original.uFighter",
"gen.original.uBomber",
"gen.original.uHelicopter",
"gen.original.uStlthFtr",
"gen.original.uStlthBmbr",
"gen.original.uTrireme",
"gen.original.uCaravel",
"gen.original.uGalleon",
"gen.original.uFrigate",
"gen.original.uIronclad",
"gen.original.uDestroyer",
"gen.original.uCruiser",
"gen.original.uAEGISCruiser",
"gen.original.uBattleship",
"gen.original.uSubmarine",
"gen.original.uCarrier",
"gen.original.uTransport",
"gen.original.uCruiseMsl",
"gen.original.uNuclearMsl",
"gen.original.uDiplomat",
"gen.original.uSpy",
"gen.original.uCaravan",
"gen.original.uFreight",
"gen.original.uExplorer",
"gen.original.uExtraLand",
"gen.original.uExtraShip",
"gen.original.uExtraAir",
],genOriginalFileName)

}

function writeWonders() {
doc.writeSection("Wonders","",[
"gen.original.wPyramids",
"gen.original.wHangingGardens",
"gen.original.wColossus",
"gen.original.wLighthouse",
"gen.original.wGreatLibrary",
"gen.original.wOracle",
"gen.original.wGreatWall",
"gen.original.wSunTzusWarAcademy",
"gen.original.wKingRichardsCrusade",
"gen.original.wMarcoPolosEmbassy",
"gen.original.wMichelangelosChapel",
"gen.original.wCopernicusObservatory",
"gen.original.wMagellansExpedition",
"gen.original.wShakespearesTheatre",
"gen.original.wLeonardosWorkshop",
"gen.original.wJSBachsCathedral",
"gen.original.wIsaacNewtonsCollege",
"gen.original.wAdamSmithsTradingCo",
"gen.original.wDarwinsVoyage",
"gen.original.wStatueofLiberty",
"gen.original.wEiffelTower",
"gen.original.wWomensSuffrage",
"gen.original.wHooverDam",
"gen.original.wManhattanProject",
"gen.original.wUnitedNations",
"gen.original.wApolloProgram",
"gen.original.wSETIProgram",
"gen.original.wCureforCancer",
],genOriginalFileName)

}
function writeBaseTerrain() {
doc.writeSection("Base Terrain","",[
"gen.original.bDesert",
"gen.original.bPlains",
"gen.original.bGrassland",
"gen.original.bForest",
"gen.original.bHills",
"gen.original.bMountains",
"gen.original.bTundra",
"gen.original.bGlacier",
"gen.original.bSwamp",
"gen.original.bJungle",
"gen.original.bOcean",
],genOriginalFileName)

}
function writeTerrain() {
doc.writeSection("Terrain","",[
"gen.original.tDesert",
"gen.original.tOasis",
"gen.original.tDesertOil",
"gen.original.tPlains",
"gen.original.tBuffalo",
"gen.original.tWheat",
"gen.original.tGrassland",
"gen.original.tForest",
"gen.original.tPheasant",
"gen.original.tSilk",
"gen.original.tHills",
"gen.original.tCoal",
"gen.original.tWine",
"gen.original.tMountains",
"gen.original.tGold",
"gen.original.tIron",
"gen.original.tTundra",
"gen.original.tGame",
"gen.original.tFurs",
"gen.original.tGlacier",
"gen.original.tIvory",
"gen.original.tGlacierOil",
"gen.original.tSwamp",
"gen.original.tPeat",
"gen.original.tSpice",
"gen.original.tJungle",
"gen.original.tGems",
"gen.original.tFruit",
"gen.original.tOcean",
"gen.original.tFish",
"gen.original.tWhales",
],genOriginalFileName)

}

writeAdvances()
writeImprovements()
writeUnits()
writeWonders()
writeBaseTerrain()
writeTerrain()
doc.markFileCustomised(genOriginalFileName)


const genConstantsFileName = "gen_constants"
doc.writeSection("",
"",[
	"gen.constants"
],genConstantsFileName)
doc.setFrontMatter(genConstantsFileName,"title","The gen.constants Table")
doc.setFrontMatter(genConstantsFileName,"tabTitle","gen.constants Reference")
doc.setFrontMatter(genConstantsFileName,"introduction",genAutoDoc["genConstants"].paragraph)
doc.markFileCustomised(genConstantsFileName)