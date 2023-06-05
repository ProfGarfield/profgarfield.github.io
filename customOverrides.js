const doc = require("./docConvertFunctions")

const fs = require("fs")
const path = require("node:path")

const keyboardText = fs.readFileSync(path.normalize(__dirname+"/custom_doc/keyboard.md")).toString()

doc.overrideFile("keyboard","Keyboard Module", keyboardText)