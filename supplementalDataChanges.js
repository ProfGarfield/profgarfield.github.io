const doc = require("./docConvertFunctions")



function organizeSupplementalData(prefix,fileName) {
    doc.writeSection("Flags","",[
    `${prefix}.defineFlag`,
    `${prefix}.defineModuleFlag`,
    `${prefix}.flagGetValue`,
    `${prefix}.flagSetTrue`,
    `${prefix}.flagSetFalse`,
    `${prefix}.flagIsNil`,
    `${prefix}.flagReset`,
    ],fileName)

    doc.writeSection("Counters","",[
    `${prefix}.defineCounter`,
    `${prefix}.defineModuleCounter`,
    `${prefix}.counterGetValue`,
    `${prefix}.counterSetValue`,
    `${prefix}.counterIsNil`,
    `${prefix}.counterReset`,
    `${prefix}.counterAdd`,
    `${prefix}.counterSubtract`,
    `${prefix}.counterIsAtLeast`,
    `${prefix}.counterIsAtMost`,
    `${prefix}.counterSetWithin`,
    ],fileName)
    doc.writeSection("Generic Data","",[
    `${prefix}.defineGeneric`,
    `${prefix}.defineModuleGeneric`,
    `${prefix}.genericGetValue`,
    `${prefix}.genericSetValue`,
    ],fileName)

    doc.writeSection("Phrases","",[
    `${prefix}.definePhrase`,
    `${prefix}.defineModulePhrase`,
    `${prefix}.phraseGetValue`,
    `${prefix}.phraseSetValue`,
    `${prefix}.phraseIsNil`,
    `${prefix}.phraseReset`,
    ],fileName)

    doc.writeSection("General Tools","",[
    `${prefix}.deleteData`,
    `${prefix}.transferData`,
    `${prefix}.transferOrDeleteData`,
    `${prefix}.update`,
    `${prefix}.generalUpdate`,
    `${prefix}.validate`,
    `${prefix}.changeValidationInfo`,
    ],fileName)
}

organizeSupplementalData("cityData","cityData")
organizeSupplementalData("tileData","tileData")
organizeSupplementalData("tribeData","tribeData")
organizeSupplementalData("unitData","unitData")