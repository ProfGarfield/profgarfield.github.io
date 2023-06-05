const toExport = require("./autoDocFunctions")
const doc = require("./docConvertFunctions")

const nativeDataFileName = "nativeLuaDataTypes"
doc.makeCustomFile(nativeDataFileName,"Data Types Native to Lua",`
This page contains a list of data types which are native to Lua.  They are not
based on features unique to the Test of Time Patch Project, so you can
refer to other online sources if you need information about these
data types.  Some of these data types are subsets of other data types,
but have a particular interpretation.
`)

doc.addFileAsSectionIn("nil_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("void_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("boolean_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("number_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("integer_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("bitmask",nativeDataFileName,"##")
doc.addFileAsSectionIn("id",nativeDataFileName,"##")
doc.addFileAsSectionIn("string_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("function_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("table_doc",nativeDataFileName,"##")
doc.addFileAsSectionIn("coroutine",nativeDataFileName,"##")
doc.addFileAsSectionIn("iterator",nativeDataFileName,"##")
doc.addFileAsSectionIn("userdata_doc",nativeDataFileName,"##")

/*
doc.setFrontMatter(nativeDataFileName,"tabTitle","Lua Data Types")
console.log(doc.getEntries("coroutine"))
doc.writeSection("","",["coroutine"],nativeDataFileName)
doc.removeFromWriteFileInfo("coroutine")
//doc.writeSection("","",["bitmask"],nativeDataFileName)
doc.removeFromWriteFileInfo("bitmask")
*/
