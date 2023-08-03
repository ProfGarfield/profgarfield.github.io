const fs = require("fs")
const documentation = JSON.parse(fs.readFileSync("./doc.json","utf8"))
const doc = require("./docConvertFunctions")

doc.parseDocumentation(documentation)



require("./civFileChanges.js")
require("./genFileChanges.js")
require("./nativeLuaDataChanges.js")
require("./customOverrides.js")
require("./supplementalDataChanges.js")


doc.writeFiles()
const indexPreamble = 
`
# Lua Scenario Template Documentation

These files contain the documentation for the Lua Scenario Template.
`
doc.writeAutoDocIndexFile(indexPreamble,[])

const index = {}



/*
function makeField(fieldData,aboveName) {
  if (makeFieldOverride.makeFieldOverride[aboveName+"."+fieldData.name]) {
    return makeFieldOverride.makeFieldOverride[aboveName+"."+fieldData.name]
  }
  let result = `### ${fieldData.name}\n`
  let description = fieldData.desc || ""
  if (fieldData.extends.type === "function") {
    if (!fieldData.extends.args[0]) {
      result += "```\n"+fieldData.extends.view+"\n```\n"
    } else if (fieldData.extends.args[0].type === "self") {
      // method
      let baseView = fieldData.extends.view
      baseView = baseView.replace(aboveName+"."+fieldData.name,
        aboveName+":"+fieldData.name)
      baseView = baseView.replace(/self:.*?,\ /,"")
      result +="```\n"+baseView+"\n```\n"
    } else {
      result += "```\n"+fieldData.extends.view+"\n```\n"
    }
  } else {
    result += "```\n"+aboveName+"."+fieldData.name+" --> "+fieldData.extends.view+"\n```\n"
  }
  result += description+"\n\n"
  return result
}
*/



/*

function createFile(fileData,fileName) {
    index[fileData.name] = fileName
    let fileOutput = ""
    fileOutput += "# "+fileData.name+"\n"
    fileOutput += fileData.desc+"\n"
    if (fileData.fields) {
      for (let i=0;i< fileData.fields.length; i++){
        if (fileData.fields[i].extends.type !== "function") {
          fileOutput += makeField(fileData.fields[i],fileData.name)
        }
      }
      for (let i=0;i< fileData.fields.length; i++){
        if (fileData.fields[i].extends.type === "function") {
          fileOutput += makeField(fileData.fields[i],fileData.name)
        }
      }
    }
    try {
      fs.writeFileSync(__dirname+'/autodoc_markdown/'+fileName, fileOutput);
      // file written successfully
    } catch (err) {
      console.error(err);
    }
}


const subFiles = {


}





console.log(documentation.length)
let gen = {}
for (let i=0; i<documentation.length; i++) {
    if (!makeNoFile(documentation[i])){
        console.log(documentation[i].name)
        createFile(documentation[i],documentation[i].name.replace(".","_")+".md")
    }
}


let indexData = ""
for (const [key,value] of Object.entries(index)) {
    indexData+=`* [${key}](${value})\n`
}
try {
  fs.writeFileSync(__dirname+'/autodoc_markdown/'+"autoIndex.md", indexData);
  // file written successfully
} catch (err) {
  console.error(err);
}
*/

/*
"defines":[{file,finish,start,type}]
"desc": string
"fields":[{desc,extends{finish,start,type,types[{finish,start,type,view}]]
*/

    