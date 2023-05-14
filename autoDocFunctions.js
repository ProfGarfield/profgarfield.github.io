//const { fileURLToPath } = require("url");

const fs = require("fs")
const path = require("node:path")

let templateDirectory = ""

const toExport = {}
function setTemplateDirectory(templateDirectoryPath) {
    templateDirectory = templateDirectoryPath;
}
toExport.setTemplateDirectory = setTemplateDirectory

function extractAutoDocParagraph(wrappedParagraph) {
    const topLine = wrappedParagraph.match(/---&autoDoc.*\n/)[0]
    const bottomLine = wrappedParagraph.match(/---&endAutoDoc.*/)[0]
    const paragraph = wrappedParagraph.replace(topLine,"").replace(bottomLine,"")
    const paragraphName = topLine.replace("---&autoDoc ","").replace("\n","")
    return {
        paragraphName: paragraphName,
        paragraph: paragraph,
    }
}


function getAutoDocSections(fileName) {
    const sections = {};
    let text = fs.readFileSync(path.normalize(templateDirectory+"/"+fileName),'utf8').toString()
    const matches = text.match(/---&autoDoc(.|\n)*?---&endAutoDoc/g) || []
    for (const wrappedParagraph of matches) {
        const p = extractAutoDocParagraph(wrappedParagraph)
        sections[p.paragraphName] = {paragraph: p.paragraph, fileName: fileName}
    }
    return sections
}
toExport.getAutoDocSections = getAutoDocSections


function getAutoDocFromEventsFiles() {
    const fileNameList = fs.readdirSync(path.normalize(templateDirectory+"/"+"EventsFiles"),'utf8')    
    const autoDocSections = {};
    for (const fileName of fileNameList) {
        const s = getAutoDocSections("EventsFiles/"+fileName);
        for (const index in s) {
            autoDocSections[index] = s[index];
        }
    }
    return autoDocSections;
}
toExport.getAutoDocFromEventsFiles = getAutoDocFromEventsFiles

function getAutoDocFromDiscreteEvents() {
    return getAutoDocSections("discreteEvents.lua")
}
toExport.getAutoDocFromDiscreteEvents = getAutoDocFromDiscreteEvents

function getAutoDocFromConsolidatedEvents() {
    return getAutoDocSections("consolidatedEvents.lua")
}
toExport.getAutoDocFromConsolidatedEvents = getAutoDocFromConsolidatedEvents


module.exports = toExport