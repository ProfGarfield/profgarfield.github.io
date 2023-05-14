const fs = require("fs")
// {mainEntry:string, supplementalEntry: string, replacementEntry:string,
//  defaultFile: string, examples:[list of strings], references:[list of strings], hideEntry:boolean }
class DocumentationEntry {
  constructor() {
    this.mainEntry = ""; // The entry generated based on doc.json
    this.supplementalEntry = ""; 
    this.replacementEntry = ""; // If not "", use this instead of main entry
    this.defaultFile = ""; // The file for which this will be included in the "leftovers" section 
    this.examples = []; // Strings here follow a #### Examples heading
    this.references = []; // Strings here follow a #### References heading
    this.excludeFromLeftovers = false; // If true, exclude from the "leftover" entries section  
  }

}

const autoDocFolder = "auto_doc"
const defaultFrontMatter = {layout: "page"}
function makeFrontMatter(frontMatter) {
  let output = "---\n"
  frontMatter = frontMatter || defaultFrontMatter
  for (const key in frontMatter) {
    output += `${key}: ${frontMatter[key]}\n`
  }
  output +="---\n"
  return output
}




const toExport = {}

// entries["moduleName.fieldName"] =  DocumentationEntry
const entries = {}

// writtenEntries[entryName] = fileName
// a place to record entries that have been written
const writtenEntries = {}

// fileData[fileName] = textToWriteToFile
const fileWriteInfo = {}

// customisedStructure[fileName] = true
// flags a file as having a customised structure
// so it is ignored by automaticFileHandling
const customisedStructure = {}


function markFileCustomised(fileName) {
    customisedStructure[fileName] = true
}
toExport.markFileCustomised = markFileCustomised

function removeFromWriteFileInfo(fileName) {
    delete fileWriteInfo[fileName]
}
toExport.removeFromWriteFileInfo = removeFromWriteFileInfo


function makeEntry(entryData,aboveName,defaultFileName) {
  const entryName = aboveName+"."+entryData.name;
  entries[entryName] = entries[entryName] || new DocumentationEntry();
  let result = `### ${entryData.name}\n`;
  let description = entryData.desc || "";
  if (entryData.extends.type === "function") {
    if (!entryData.extends.args[0]) {
      // function with no arguments
      result += "```lua\n"+entryData.extends.view+"\n```\n";
    } else if (entryData.extends.args[0].type === "self") {
      // method
      let baseView = entryData.extends.view;
      baseView = baseView.replace(aboveName+"."+entryData.name, 
        aboveName+":"+entryData.name);
      baseView = baseView.replace(/self:.*?,\ /g,"");
      result +="```lua\n"+baseView+"\n```\n";
    } else {
      // standard function
      result += "```lua\n"+entryData.extends.view+"\n```\n";
    }
  } else {
    result += "```\n"+aboveName+"."+entryData.name+" --> "+entryData.extends.view+"\n```\n";
  }
  result += description+"\n\n";
  entries[entryName]["mainEntry"] = result;
  entries[entryName]["defaultFile"] = defaultFileName;
}
toExport.makeEntry = makeEntry

// adds supplemental information to entryName, to be displayed after mainEntry
function makeSupplementalEntry(entryName,extraEntry) {
  entries[entryName] = entries[entryName] || new DocumentationEntry();
  entries[entryName]["supplementalEntry"] = extraEntry;
}
toExport.makeSupplementalEntry = makeSupplementalEntry

// replaces mainEntry for entryName
function makeReplacementEntry(entryName,replacement) {
  entries[entryName] = entries[entryName] || new DocumentationEntry();
  entries[entryName].replacementEntry = replacement;
}
toExport.makeReplacementEntry = makeReplacementEntry

function makeCustomEntry(entryName,defaultFileName) {
  entries[entryName] = entries[entryName] || new DocumentationEntry();
  entries[entryName].defaultFile = defaultFileName;
}
toExport.makeCustomEntry = makeCustomEntry

function addExample(entryName,exampleString) {
  entries[entryName] = entries[entryName] || new DocumentationEntry();
  entries[entryName].examples.push(exampleString);
}
toExport.addExample = addExample

function addReference(entryName,referenceString) {
  entries[entryName] = entries[entryName] || new DocumentationEntry();
  entries[entryName].references.push(referenceString);
}
toExport.addReference = addReference

function makeCustomFile(fileName,title,introduction) {
    let startText = `# ${title}\n\n`;
    startText += introduction+"\n\n";
    fileWriteInfo[fileName] = startText;
}
toExport.makeCustomFile = makeCustomFile

function getLeftoverEntries(fileName) {
  const leftoverList = [];
  for (const name in entries) {
    const entry = entries[name];
    if (entry.defaultFile === fileName && !writtenEntries[name]) {
      leftoverList.push(name)
    }
  }
  leftoverList.sort()
  return leftoverList
}

function getEntries(defaultFileName) {
    const entryList = [];
    for (const name in entries) {
        const entry = entries[name];
        if (entry.defaultFile === defaultFileName) {
            entryList.push(name)
        }
    }
    entryList.sort()
    return entryList
}
toExport.getEntries = getEntries

// Returns the markdown for the documentation associated
// with entryName (retrieved from the entries object)
// Notes in writtenEntries that the entry was written
// to fileName
// Entry titles are ### level
function writeEntry(entryName,fileName) {
  let result = "";
  let entry = entries[entryName];
  writtenEntries[entryName] = fileName;
  if (entry.replacementEntry !== "") {
    result += entry.replacementEntry;
  } else {
    result += entry.mainEntry;
  }
  if (entry.supplementalEntry !== "") {
    result += "\n\n"+entry.supplementalEntry;
  }
  if (entry.examples.length == 1) {
    result += "\n\n#### Example";
    entry.examples.forEach( function(text,index) {
      result += "\n\n"+text;
    })
  } else if (entry.examples.length >= 2) {
    result += "\n\n#### Examples";
    entry.examples.forEach( function(text,index) {
      result += "\n\n"+text;
    })
  }
  if (entry.references.length == 1) {
    result += "\n\n#### Reference";
    entry.references.forEach( function(text,index) {
      result += "\n\n"+text;
    })
  } else if (entry.references.length >= 2) {
    result += "\n\n#### References";
    entry.examples.forEach( function(text,index) {
      result += "\n\n"+text;
    })
  }
  result = result.replace(/\|/g,"\\|")
  return result
}


// Returns the markdown for documenting a section with
// sectionTitle: A title for the section
//    If "", no title, otherwise ## title
// sectionIntro: Introductory text for the section (string)
// entryList: array of [entryName] or "leftovers"
//    The entryList is the list of entryNames for entries to be written
//    In this section (info retrieved from entries object)
//    if "leftovers", a list of all entries not yet written is generated
//    (in alphabetical order)
// fileName: file name of the file this section is for (tells where
//    entries have been written to, and which leftover entries to get
//    if applicable)
function prepareSection(sectionTitle,sectionIntro,entryList,fileName) {
  if (entryList === "leftovers") {
    entryList = getLeftoverEntries(fileName);
  }
  let result = ""
  if (sectionTitle !== "") {
    result +=`## ${sectionTitle}\n\n`;
  }
  if (sectionIntro !== "") {
    result += sectionIntro+"\n\n";
  }
  //console.log(entryList)
  entryList.forEach(function(entryName,index) {
    result += writeEntry(entryName,fileName);
  })
  result += "\n\n"
  return result
}

// Appends a section of text to fileData[fileName] in preparation
// to be written
// sectionTitle: A title for the section
//    If "", no title, otherwise ## title
// sectionIntro: Introductory text for the section (string)
// entryList: array of [entryName] or "leftovers"
//    The entryList is the list of entryNames for entries to be written
//    In this section (info retrieved from entries object)
//    if "leftovers", a list of all entries not yet written is generated
//    (in alphabetical order)
// fileName: file name of the file this section is for (tells where
//    entries have been written to, and which leftover entries to get
//    if applicable)
function writeSection(sectionTitle,sectionIntro,entryList,fileName) {
  fileWriteInfo[fileName] = fileWriteInfo[fileName] + "\n\n" + 
    prepareSection(sectionTitle,sectionIntro,entryList,fileName)
}
toExport.writeSection = writeSection

function parseDocumentation(documentation) {
    for (let i=0; i<documentation.length; i++) {
        let fileName = documentation[i].name;
        //console.log(fileName,makeNoFile(documentation[i]))
        fileName = fileName.replace(/\./g,"_");
        parseToEntries(documentation[i],fileName);
        if (!makeNoFile(documentation[i])) {
            let topOfFile = "";
            topOfFile += "# "+documentation[i].name+"\n\n";
            topOfFile += documentation[i].desc+"\n\n";
            fileWriteInfo[fileName] = topOfFile;
        }
    }
    /*
    for (const entryName in entries) {
      if (entries[entryName].defaultFile !== "gen") {
        console.log(entryName, entries[entryName].defaultFile)
      }
    }
    /**/
}
toExport.parseDocumentation = parseDocumentation

//  The entries with these names in the top level Autodocumentation JSON should be ignored
const topLevelIgnore = {
    "compassPoints" : true,
    "defaultChooseDefender" : true,
    "gameEndReasons" : true,
    "gameEndReasons.Conquest Victory" : true,
    "gameEndReasons.Defeat" : true,
    "gameEndReasons.Macro ENDGAME action" : true,
    "gameEndReasons.Retirement" : true,
    "gameEndReasons.Space Race Victory by Active Player" : true,
    "gameEndReasons.Space Race Victory by Another Player" : true,
    "genCU" : true,
    "markerOptions" : true,
    "markerOptions.airbase" : true,
    "markerOptions.farmland" : true,
    "markerOptions.fortress" : true,
    "markerOptions.irrigation" : true,
    "markerOptions.mine" : true,
    "markerOptions.pollution" : true,
    "markerOptions.railroad" : true,
    "markerOptions.road" : true,
    "markerOptions.transporter" : true,
    "prodItem" : true,
    "producedItem" : true,
    "resourceNumber" : true,
    "tribeToInt" : true,
    "void" : true,
}

function makeNoEntries(docI) {
  if (topLevelIgnore[docI.name]) {
    return true
  }
  if (docI.type == "variable") {
    return true
  }
  if (docI.defines[0].type == "tablefield") {
    return true
  } 
  if (docI.defines[0].type == "tableindex") {
    return true
  } 
  return false
}

// Maybe there will be cases where we want entries, but not files
function makeNoFile(docI) {
    if (makeNoEntries(docI)) {
        return true
    }
    return false
}

function parseToEntries(fileSection,fileName) {
    if (makeNoEntries(fileSection)) {
        return
    }
    if (fileSection.fields) {
        for (let i=0; i<fileSection.fields.length; i++) {
            makeEntry(fileSection.fields[i],fileSection.name,fileName)
        }
    }
}

function writeFiles() {
    for (const fileName in fileWriteInfo) {
        automaticFileHandling(fileName)
    }
    for (const fileName in fileWriteInfo) {
        try {
          fs.writeFileSync(__dirname+'/'+autoDocFolder+'/'+fileName+".md",makeFrontMatter({layout: "page",tabTitle: fileName+".lua Documentation"})+fileWriteInfo[fileName]);
          // file written successfully
        } catch (err) {
          console.error(err);
        }
    }
}
toExport.writeFiles = writeFiles

// automatically structures the file
function automaticFileHandling(fileName) {
    if (customisedStructure[fileName]) {
        return;
    }
    writeSection("","","leftovers",fileName)
}

function mergeAllInto(subFile,preamble,intoFile) {
    const fileName = subFile.replace(/\./g,"_")
    writeSection(subFile,preamble,getEntries(fileName),intoFile)
    removeFromWriteFileInfo(fileName)
    //console.log(fileName)
    //console.log(getEntries(fileName))
}
toExport.mergeAllInto = mergeAllInto

// indexSubstitutions[fileName] = indexName
const indexSubstitutions = {}
function registerIndexSubstitution(fileName,indexName) {
  indexSubstitutions[fileName] = indexName;
}
toExport.registerIndexSubstitution = registerIndexSubstitution

function prepareAutodocumentationIndexFile(preamble,orderedFiles) {
  const otherFiles = [];
  for (const fileName in fileWriteInfo) {
    if (!orderedFiles.includes(fileName)){
      otherFiles.push(fileName);
    }
  }
  let text = preamble+"\n\n"
  for (const fileName of orderedFiles) {
    let fileTitle = indexSubstitutions[fileName];
    if (!fileTitle) {
      const fileText = fileWriteInfo[fileName];
      fileTitle = fileText.match(/^#\ .+\n/)[0]
      fileTitle = fileTitle.replace("# ","").replace("\n","")
    }
    text+= `* ${fileTitle} \n`
  }
  for (const fileName of otherFiles) {
    let fileTitle = indexSubstitutions[fileName];
    if (!fileTitle) {
      const fileText = fileWriteInfo[fileName];
      fileTitle = fileText.match(/^#\ .+\n/)[0]
      fileTitle = fileTitle.replace("# ","").replace("\n","")
    }
    text+= `* [${fileTitle}](${fileName}.html) \n`
  }
  return text
}
toExport.prepareAutodocumentationIndexFile = prepareAutodocumentationIndexFile

function writeAutoDocIndexFile(preamble,orderedFiles) {
  const text = prepareAutodocumentationIndexFile(preamble,orderedFiles)
  fs.writeFileSync(__dirname+'/'+autoDocFolder+'/'+"autoIndex.md",makeFrontMatter({layout: "page",tabTitle: "Template Documentation"})+text)
}
toExport.writeAutoDocIndexFile = writeAutoDocIndexFile






module.exports = toExport