---
layout: page
title: text
tabTitle: text.lua Documentation
minTOC: 2
maxTOC: 3
---

# text

The text module provides functions for displaying text boxes and menus.  It also provides code for manipulating strings, though
these are primarily useful to make messages that other functions
in the module will display.

The Civfanatics users [Knighttime](https://forums.civfanatics.com/members/knighttime.21777/) and [Pablostuka](https://forums.civfanatics.com/members/pablostuka.14725/) have contributed functionality to this module.




### addMultiLineTextToDialog
```
function text.addMultiLineTextToDialog(string: string, dialog: dialogObject)
```
Adds some text to the dialog object, in such a way that the
character sequence \\n^ will cause a line break when the
dialog is displayed.




### addToArchive
```
function text.addToArchive(tribeID: integer|tribeObject, messageBody: string, messageTitle: string, archiveTitle: string, imageInfo?: string|table|imageObject)
```
 Adds a message to a tribe's archive

@*param* `tribeID` — The tribe for whom the message should be added to the archive.

@*param* `messageBody` — The message to be displayed in the archive.

@*param* `messageTitle` — The title of the text box of the message.

@*param* `archiveTitle` — The title of the message in the archive menu.

@*param* `imageInfo` — The image to show in the text box.  Defaults to not showing an image.<br><br>An `imageInfo` is one of the following:<br><br>An `imageObject`. <br><br>A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.<br><br>A `string` that is the key corresponding to an `imageObject` in the `imageTable` registered by `text.setImageTable`.



### anglicise
```
function text.anglicise(str: any)
  -> string
```
 text.anglicise(string) --> string
  replaces international characters with English equivalents
  Intended for constructing object.lua file, but might have
  other uses



### checkboxMenu
```
text.checkboxMenu --> function
```




### convertTableToColumnText
```
text.convertTableToColumnText --> function
```




### coordinates
```
text.coordinates --> function
```




### copyTableAsText
```
text.copyTableAsText --> function
```




### deleteAIArchives
```
function text.deleteAIArchives()
```
Deletes all messages saved in archives owned by AI Tribes



### displayAccumulatedMessages
```
function text.displayAccumulatedMessages()
```
Displays to the current player all messages that were to be displayed
at the next opportunity, then either archives or deletes the messages.

If the player is an AI, the messages will not be displayed, unless the broadcast parameter was true.

In the Lua Scenario Template, this is in the onCityProcessingComplete 
execution point, and the scenario designer should not need to call it.




### displayArchivedMessage
```
text.displayArchivedMessage --> function
```




### displayNextOpportunity
```
function text.displayNextOpportunity(tribes: integer|table<any, integer|tribeObject>|tribeObject, messageBody: string, messageTitle?: string, archiveTitle?: string, imageInfo?: string|table|imageObject, broadcast?: boolean)
```
Displays a message to a tribe or tribes at the next possible opportunity,
either immediately (if the tribe is active), or during the onCityProcessingComplete execution point.

If an archive title is specified, the message will be added to the tribe's archive after it is shown.

Note: For backwards compatibility, the order of the last two arguments can be reversed.  The function will figure it out.


@*param* `tribes` — The tribe or tribes to whom the message should be displayed.  Integers reference the tribe's ID.

@*param* `messageBody` — The message to be displayed.

@*param* `messageTitle` — The title of the text box of the message.

@*param* `archiveTitle` — The title of the message in the archive menu.  If nil, the message will not be added to the archive.

@*param* `imageInfo` — The image to show in the text box.  Defaults to not showing an image.<br><br>An `imageInfo` is one of the following:<br><br>An `imageObject`. <br><br>A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.<br><br>A `string` that is the key corresponding to an `imageObject` in the `imageTable` registered by `text.setImageTable`.

@*param* `broadcast` — If true, the text box with the message will be displayed even if the tribe is controlled by an AI.  If false or absent, it will only be displayed if the tribe is controlled by a human.



### englishEquivalent
```
text.englishEquivalent --> table
```




### getLinesPerWindow
```
function text.getLinesPerWindow()
  -> integer
```
Returns the current setting for the number of lines per text box,
which functions in this module use to determine when to break a
message or menu into multiple text boxes.



### getShortVeteranTitle
```
text.getShortVeteranTitle --> function
```




### getVeteranTitle
```
text.getVeteranTitle --> function
```




### groupDigits
```
text.groupDigits --> function
```




### i
```
text.i --> function
```




### iLower
```
text.iLower --> function
```




### iUpper
```
text.iUpper --> function
```




### initCap
```
text.initCap --> function
```




### international
```
text.international --> function
```




### isMenuRecord
```
function text.isMenuRecord(item: any)
```
 text.isMenuRecord(item) --> bool
      returns true if item is a menuRecord, and false otherwise



### linkState
```
text.linkState --> function
```




### lower
```
text.lower --> function
```




### lpad
```
text.lpad --> function
```




### makeChooseNumberMenu
```
function text.makeChooseNumberMenu(increments: any, extremes: any, selectionKey: any, nextMenu: any, goBackOptions: any, menuName: any, plusOptionWrapper: any, minusOptionWrapper: any, confirmOptionWrapper: any)
  -> unknown
```




### makeReverseListNoGaps
```
text.makeReverseListNoGaps --> function
```




### makeTableText
```
text.makeTableText --> function
```




### menu
```
function text.menu(menuTable: table<integer, string>, menuText: string, menuTitle?: string, canCancel?: boolean, imageInfo?: string|table|imageObject, dimensions?: { width: integer|nil, height: integer|nil }, menuPage?: integer)
  -> choice: integer
  2. menuPage: integer
```
This function displays a menu of options to the user, as defined by the menuTable.  The user can choose one of the options, and may or may not be given the option to "cancel" as a choice.  The function returns the index of the menuTable entry that was chosen, or 0 if the user cancels the menu.  If the menu has multiple pages, the function returns the page where the choice was made.
    

@*param* `menuTable` — A table of menu options.  The keys are the numbers that will be returned when the option is chosen.  The values are the text to display for each option.

@*param* `menuText` — The text to display above the menu options.

@*param* `menuTitle` — The title of the menu's text box.  Defaults to "".

@*param* `canCancel` — Whether or not the menu should have a "Cancel" option, which returns 0.  Defaults to false.

@*param* `dimensions` — The dimensions of the menu text box.  If not specified, the game will choose.

@*param* `menuPage` — The page of the menu to start on.  Defaults to 1.

@*return* `choice` — The index of the menuTable entry that was chosen.

@*return* `menuPage` — The page of the menu where the choice was made.  This could be useful if you want to be able to re-open the menu on the same page.



### money
```
text.money --> function
```




### newMenuRecord
```
function text.newMenuRecord(specTable: any)
```
 text.newMenuRecord(specTable) --> menuRecord
      converts a specification table for a menuRecord
      into a menuRecord



### niceList
```
text.niceList --> function
```




### openArchive
```
text.openArchive --> function
```




### pad
```
text.pad --> function
```




### purgeArchive
```
function text.purgeArchive(tribeOrID: integer|tribeObject)
```
Purges (deletes) all archived messages that have been marked for purging
by the tribe.


@*param* `tribeOrID` — The tribe or tribe ID for whom to purge the archive.



### registerDictionary
```
function text.registerDictionary(dictionary: table)
```
Registers a 'dictionary' table with the text module.  The dictionary table
should have the following format:
```
dictionary[anyKey] = {singular=singularVersionOfWord, plural=pluralVersionOfWord, an=boolean}
```
an = true if it is 'an singularVersionOfWord' and false/nil if it is 'a singularVersionOfWord'

The keys in the dictionary table do not matter.

The dictionary table is used to enhance the functionality of text.substitute.


@*param* `dictionary` — A table with the above format



### registerUnitsImage
```
function text.registerUnitsImage(filename: any)
```
 text.registerUnitsImage(filename)
      registers the name of the units image file
      to be used for text.unitTypeImage
      



### rpad
```
text.rpad --> function
```




### setDigitGroupSeparator
```
text.setDigitGroupSeparator --> function
```




### setImageTable
```
function text.setImageTable(table: table, tableName: string)
```
This function lets you specify a table that is being used to store
imageObjects.  Some functions in this module will allow you to
specify an imageObject by providing a (string) table key.  
This function specifies the table that will be used to look up
the image.

If you generate an object.lua file using the script included
in the Lua Scenario Template, then the imageTable will be
set to the object file.


@*param* `table` — A table where images can be stored and looked up.

@*param* `tableName` — A name for the table to use in error messages.



### setLinesPerWindow
```
function text.setLinesPerWindow(numberOfLines: integer)
```
 Set the number of lines per text box for some functions provided
 by this module (especially menus).
 By default, there is a setting in the configuration module
 that will allow the player to change this setting.



### setMoney
```
text.setMoney --> function
```




### setShortVeteranTitle
```
text.setShortVeteranTitle --> function
```




### setVeteranTitle
```
text.setVeteranTitle --> function
```




### simple
```
function text.simple(stringOrTable: string|string[], boxTitle?: string, imageInfo?: string|table|imageObject)
```
Shows a text box with the message and title, splitting
into multiple text boxes if the string is very long.
If a table of strings is input, each string is shown in
order starting at tableOfStrings[1].  If an imageInfo
is provided, the image is shown in the text box.

The function determines how many lines of text are in the
message by counting newline characters (note that newline
characters by themselves do not cause a line break in the
text box).  If the message has too many lines, as determined
by the variable `linesPerWindow`, then the message is split
at a newline character.  (`linesPerWindow` can be changed
using text.setLinesPerWindow -- by default, the player can
change it using the configuration module.)

To create a line break in the text box, use the character
sequence \\n^ (newline, caret).

If you wish to break up a message into two text boxes
at a particular point, use the sequence of characters
'%PAGEBREAK' (not including quote marks).

If you wish to center a line of text, use the sequence
\\n^^ (newline, caret, caret).


@*param* `boxTitle` — The title for the text box.  Defaults to ""

@*param* `imageInfo` — The image to show in the text box.  Defaults to not showing an image.<br><br>An `imageInfo` is one of the following:<br><br>An `imageObject`. <br><br>A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.<br><br>A `string` that is the key corresponding to an `imageObject` in the `imageTable` registered by `text.setImageTable`.



### simpleTabTableToText
```
text.simpleTabTableToText --> function
```




### simpleTabulation
```
text.simpleTabulation --> function
```




### stateImageReference
```
text.stateImageReference --> function
```




### substitute
```
function text.substitute(rawText: string, substitutionTable: table<integer, any>)
  -> string
```
Substitutes values from the substitutionTable into the rawText, based on 
tags in the rawText.



@*param* `substitutionTable` — the values associated with the keys 0-9 are eligible to be used for substitution.



### tabulationMenu
```
text.tabulationMenu --> function
```




### tabulationWithOptions
```
text.tabulationWithOptions --> function
```




### toImage
```
function text.toImage(input: string|table|imageObject)
  -> imageObject
```
Converts an `imageInfo` to an `imageObject`.

@*param* `input` — An `imageInfo` is one of the following:<br><br>An `imageObject`. <br><br>A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.<br><br>A `string` that is the key corresponding to an `imageObject` in the `imageTable` registered by `text.setImageTable`.



### toStateImage
```
function text.toStateImage(imageInfo: string|table|imageObject)
  -> boolean|string|number|table<string|number, boolean|string|number|table>
```
Takes an imageInfo and returns a string or table that can be saved in the state table and used to recover the image later.

If the imageInfo is a table of arguments for civ.ui.loadImage, then the table is returned.  An error is thrown if civ.ui.loadImage doesn't return a valid imageObject when called with those arguments.

If the imageInfo is a string, then the string is returned if it is a key for an image in the `imageTable` (registered by `text.setImageTable`).  An error is thrown if the string is not a key for an image in the `imageTable`.

If the imageInfo is an imageObject, then the image is searched for in the `imageTable`, and the key for that image is returned.  If the image is not found in the `imageTable`, then an error is thrown.


@*param* `imageInfo` — An `imageInfo` is one of the following:<br><br>An `imageObject`. <br><br>A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.<br><br>A `string` that is the key corresponding to an `imageObject` in the `imageTable` registered by `text.setImageTable`.



### unitTypeImage
```
function text.unitTypeImage(unitTypeOrID: any)
  -> unknown
```
 text.unitTypeImage(unitTypeOrID) --> imageObject
      provides the image of a unit, found in the file provided to
      text.registerUnitsImage, or nil if there is no image



### upper
```
text.upper --> function
```






