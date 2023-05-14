const doc = require("./docConvertFunctions")

doc.makeReplacementEntry("cityObject.tradeRoutes",
"### tradeRoutes\n"
+"```\ncityObject.tradeRoutes[id: 0|1|2] --> traderouteObject|nil\n```\n"
+"(get) Returns the trade route with id `id` (0-2), or `nil` if not in use.\n"
)


const totppFileName = "totpp"

doc.writeSection("totpp.mod", "", ["totpp.mod.premadeMap"],totppFileName)
doc.removeFromWriteFileInfo("totpp_mod")
doc.writeSection("totpp.movementMultipliers", "",[
    "totpp.movementMultipliers.aggregate",
    "totpp.movementMultipliers.alpine",
    "totpp.movementMultipliers.railroad",
    "totpp.movementMultipliers.river",
    "totpp.movementMultipliers.road"
],totppFileName)
doc.removeFromWriteFileInfo("totpp_movementMultipliers")
doc.mergeAllInto("totpp.patches","",totppFileName)
doc.mergeAllInto("totpp.version","",totppFileName)
doc.markFileCustomised(totppFileName)


const civFileName = "civ"
const civEntries = doc.getEntries("civ")

function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}
removeItemAll(civEntries,"civ.civ.cosmic")
removeItemAll(civEntries,"civ.civ.game")
removeItemAll(civEntries,"civ.civ.scen")
removeItemAll(civEntries,"civ.civ.ui")
removeItemAll(civEntries,"civ.cosmic")
removeItemAll(civEntries,"civ.game")
removeItemAll(civEntries,"civ.scen")
removeItemAll(civEntries,"civ.ui")
doc.writeSection("civ","",civEntries,civFileName)

doc.mergeAllInto("civ.ui","",civFileName)
doc.mergeAllInto("civ.cosmic","",civFileName)
//doc.mergeAllInto("civ.game","".civFileName)
const civGameSection = doc.getEntries("civ_game")
removeItemAll(civGameSection,"civ.game.civ.game.rules")
removeItemAll(civGameSection,"civ.game.rules")
doc.writeSection("civ.game","",civGameSection,civFileName)
doc.removeFromWriteFileInfo("civ_game")
doc.writeSection("civ.game.rules","",doc.getEntries("civ_game_rules"),civFileName)
doc.removeFromWriteFileInfo("civ_game_rules")
//doc.mergeAllInto("civ.game.rules","".civFileName)
doc.writeSection("civ.scen.params","",doc.getEntries("civ_scen_params"),civFileName)
doc.removeFromWriteFileInfo("civ_scen_params")
//doc.mergeAllInto("civ.scen.params","".civFileName)
doc.writeSection("civ.scen.compatibility","",doc.getEntries("civ_scen_compatibility"),civFileName)
doc.removeFromWriteFileInfo("civ_scen_compatibility")
//doc.mergeAllInto("civ.scen.compatibility","".civFileName)
const civScenSection = doc.getEntries("civ_scen")
removeItemAll(civScenSection,"civ.scen.params")
removeItemAll(civScenSection,"civ.scen.compatibility")
doc.writeSection("civ.scen","",civScenSection,civFileName)
doc.removeFromWriteFileInfo("civ_scen")
//doc.mergeAllInto("civ.scen","".civFileName)

doc.markFileCustomised(civFileName)



