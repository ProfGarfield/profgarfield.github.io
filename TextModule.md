

<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>


[Home](index.md)

# Text Module

```lua
local text = require("text")
```

The Text Module offers functionality to facilitate the creation of text boxes and menus.

## Function List

[`text.getLinesPerWindow()-->integer`](#textgetlinesperwindow)  
[`text.setLinesPerWindow(integer)`](#textsetlinesperwindow)  
[`text.addMultilineTextToDialog(string,dialogObject)`](#textaddmultilinetexttodialog)  
[`text.toImage(imageInfo)-->imageObject`](#texttoimage)  
[`text.toStateImage(stateImageInfo)-->stateImage`](#texttostateimage)  
[`text.simple(text,title,imageInfo)`](#textsimple)  
[`text.addToArchive(tribe,msgBody,msgTitle,archiveTitle,stateImageInfo)`](#textaddtoarchive)  
[`text.displayNextOpportunity(tribe,msgBody,msgTitle,archiveTitle,stateImageInfo)`](#textdisplaynextopportunity)  
[`text.displayAccumulatedMessages()`](#textdisplayaccumulatedmessages)  
[`text.menu(menuTable,menuText,menuTitle,canCancel,imageInfo)-->integer`](#textmenu)  
[`text.openArchive()`](#textopenarchive)  
[`text.deleteAIArchives()`](#textdeleteaiarchives)  
[`text.substitute(rawText,substitutionTable)`](#textsubstitute)  
[`text.convertTableToColumnText()`](#textconverttabletocolumntext)  
[`text.makeTableText()`](#textmaketabletext)  
[`text.copyTableAsText()`](#textcopytableastext)  
[`text.simpleTabulation()`](#textsimpletabulation)  
[`text.simpleTabTableToText()`](#textsimpletabtabletotext)  
[`text.tabulationMenu()`](#texttabulationmenu)  
[`text.checkboxMenu()`](#textcheckboxmenu)  
[`text.groupDigits()`](#textgroupdigits)  
[`text.setDigitGroupSeparator()`](#textsetdigitgroupseparator)  
[`text.money()`](#textmoney)  
[`text.setMoney()`](#textsetmoney)  
[`text.getVeteranTitle()`](#textgetveterantitle)  
[`text.setVeteranTitle()`](#textsetveterantitle)  
[`text.getShortVeteranTitle()`](#textgetshortveterantitle)  
[`text.setShortVeteranTitle()`](#textsetshortveterantitle)  
[`text.makeReverseListNoGaps()`](#textmakereverselistnogaps)  
[`text.niceList()`](#textnicelist)  
[`text.coordinates()`](#textcoordinates)  
[`text.linkState()`](#textlinkstate)  

## Data Definitions


The following terms are used for different data types in this document.


### `imageTable`

The `imageTable` is a table such that 
```lua
text.setImageTable(table,tableName)
``` 
was executed.  In the Lua Scenario Template, the `object` table (in `object.lua`) is also the `imageTable`.

The `imageTable` can have values which are not images.

### `imageObject`

An `imageObject` is the Test of Time Patch Project object that provides an image.  It is the result of a call to `civ.ui.loadImage`.  Note that:
```lua
img1 = civ.ui.loadImage("myImage.bmp")
img2 = civ.ui.loadImage("myImage.bmp")
print(img1 == img2)
```
prints `false`, since the two `imageObjects` are considered different.


### `imageInfo`

An `imageInfo` is one of the following:
* A `string` that is the key corresponding to an `imageObject` in the `imageTable`.  That is:
  ```lua
  imageTable[imageInfo] --> imageObject
  ```
* A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.  That is:
  ```lua
  civ.ui.loadImage(imageInfo[1],imageInfo[2],imageInfo[3],imageInfo[4],imageInfo[5]) --> imageObject
  ```
* An `imageObject`.

[`text.toImage`](#texttoimage) converts an `imageInfo` to an `imageObject`.

### `stateImage`

A `stateImage` is an `imageInfo` that can also be stored in the state table.  Because of this restriction, a `stateImage` can't be an `imageObject`.  Hence, it is one of the following:
* A `string` that is the key corresponding to an `imageObject` in the `imageTable`.  That is:
  ```lua
  imageTable[imageInfo] --> imageObject
  ```
* A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.  That is:
  ```lua
  civ.ui.loadImage(imageInfo[1],imageInfo[2],imageInfo[3],imageInfo[4],imageInfo[5]) --> imageObject
  ```
### `stateImageInfo`

A `stateImageInfo` is an `imageInfo` which can be changed into a `stateImage`.  The distinction is that an `imageObject` can only be a `stateImageInfo` if it is also in the `imageTable`.  Hence, it is one of the following:

* A `string` that is the key corresponding to an `imageObject` in the `imageTable`.  That is
  ```lua
  imageTable[imageInfo] --> imageObject
  ```
* A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.  That is:
  ```lua
  civ.ui.loadImage(imageInfo[1],imageInfo[2],imageInfo[3],imageInfo[4],imageInfo[5]) --> imageObject
  ```
* An `imageObject` which is a value in the `imageTable` (and has a string as a key).  That is:
  ```lua
  -- there is a string imageKey such that
  imageTable[imageKey] --> this imageObject
  ```
[`text.toStateImage`](#texttostateimage) converts a `stateImageInfo` to a `stateImage`.



## Functions[&uarr;](#text-module)

These are the functions provided by the Text Module.


### `text.getLinesPerWindow`[&uarr;](#functions)
```lua
text.getLinesPerWindow()-->integer
```
Returns the number of lines that a text box created by a function in this module will return.  (This is only approximate.)  Larger bodies of text (or large menus) will be broken into several boxes automatically.  Use [`text.setLinesPerWindow`](#textsetlinesperwindow) if the text boxes are too large.

### `text.setLinesPerWindow`[&uarr;](#functions)
```lua
text.setLinesPerWindow(integer) --> void
```
Sets the number of lines that a text box created by a function in this module will have.  (This is only approximate.)  Larger bodies of text (or large menus) will be broken into several boxes automatically.  Use [`text.getLinesPerWindow`](#textgetlinesperwindow) if  you want to know the current size of boxes.


### `text.addMultilineTextToDialog`[&uarr;](#functions)
```lua
text.addMultilineTextToDialog(string,dialogObject) --> void
```
Adds text to a `dialogObject`, even if it is multiple lines.

Note: `dialog:addText(func.splitlines(string))` only adds the first line of text in string (i.e. up to the first `\n` character).  If you don't use `func.splitlines`, then the text box will ignore your newline formatting (done by `\n^`).  This function performs `func.splitlines` *and* adds all the text to the `dialogObject`.

### `text.toImage`[&uarr;](#functions)
```lua
text.toImage(imageInfo)-->imageObject
```

Converts an [`imageInfo`](#imageInfo) to an `imageObject`.

### `text.toStateImage`[&uarr;](#functions)
```lua
text.toStateImage(stateImageInfo)-->stateImage
```

Converts a [`stateImageInfo`](#stateimageinfo) to a [`stateImage`](#stateimage).


### `text.simple`[&uarr;](#functions)
```lua
text.simple(text)
text.simple(text,title)
text.simple(text,title,imageInfo)
```
Displays a text box.  The default value for title is "" (no title).  The default value for imageInfo is `nil` (no image).

Valid Arguments:
```
text: string
title: string or nil
imageInfo: imageInfo or nil
```

### `text.addToArchive`[&uarr;](#functions)
```lua
text.addToArchive(tribe,msgBody,msgTitle,archiveTitle)
text.addToArchive(tribe,msgBody,msgTitle,archiveTitle,stateImageInfo)
```
Adds a message to the tribe's "archive," so it can be viewed again later.  
The `msgBody` is the message to be shown in the text box.  The `msgTitle` is the title of the text box when the message is shown.  The `archiveTitle` is the menu option for this message in the archive menu.  `stateImageInfo` provides the image to be shown with the message.  If `stateImageInfo` is `nil` (the default), no image is shown when accessing the archive.

Valid Arguments:
```
tribe: tribeObject or integer (tribe ID number)
msgBody: string
msgTitle: string
archiveTitle: string
stateImageInfo: nil or stateImageInfo
```

### `text.displayNextOpportunity`[&uarr;](#functions)
```lua
text.displayNextOpportunity(tribe,msgBody)
text.displayNextOpportunity(tribe,msgBody,msgTitle)
text.displayNextOpportunity(tribe,msgBody,msgTitle,stateImageInfo)
text.displayNextOpportunity(tribe,msgBody,msgTitle,archiveTitle)
text.displayNextOpportunity(tribe,msgBody,msgTitle,stateImageInfo,archiveTitle)
text.displayNextOpportunity(tribe,msgBody,msgTitle,stateImageInfo,archiveTitle,broadcast)
```

Displays a message to a tribe (or tribes), either immediately (if that tribe is currently playing), or during the next [after production](#LuaExectutionPoints.md#after-production) phase for that tribe.  Can also automatically archive the message.

The `tribe` is the tribe, or ID number of the tribe to receive the message.  If a table is submitted, all the tribes in the table receive the message.  The `msgBody` is the text of the message.  The `msgTitle` is the title of the message box, with `""` as the default.  `archiveTitle` is the menu option for the message in the archive menu.  If `nil`, the message is not stored in the archives.  The `stateImageInfo` provides the image to be shown with the message.  If `nil`, no image is shown.  If `broadcast` is `true`, the message is shown to all players at the time the tribe receives the message (i.e. if the tribe is "Greeks", all players see the message during the Greek turn).  Note that `stateImageInfo`, `archiveTitle`, and `broadcast` can be in any order as the last 3 arguments.  (`tribe`,`msgBody`,`msgTitle` must be first and in that order.)

Valid Arguments:

```
tribe: tribeObject, integer (tribe Id number),
        table of tribeObject or integers
msgBody: string
msgTitle: string or nil
stateImageInfo: stateImageInfo or nil
archiveTitle: string or nil
broadcast: boolean or nil
```

Note: I actually implemented the arbitrary order for the last 3 arguments for backward compatibility with code written before image support was added.

### `text.displayAccumulatedMessages`[&uarr;](#functions)
```lua
text.displayAccumulatedMessages()
```

Displays to the current player all messages that were to be [displayed
at the next opportunity](#textdisplaynextopportunity), then either archives or deletes the messages, based on the selection when they were created.
Meant to go in the [after production](#LuaExecutionPoint.md#after-production) execution point.


### `text.menu`[&uarr;](#functions)
```lua
text.menu(menuTable,menuText) -->integer
text.menu(menuTable,menuText,menuTitle) -->integer
text.menu(menuTable,menuText,menuTitle,canCancel) -->integer
text.menu(menuTable,menuText,menuTitle,imageInfo) -->integer
text.menu(menuTable,menuText,menuTitle,canCancel,imageInfo) -->integer
text.menu(menuTable,menuText,menuTitle,canCancel,imageInfo,page) -->integer,integer
```

Produces a menu based on the `menuTable`, automatically creating a multiple page menu (with navigation options) if there are too many items to fit on one table.

A `menuTable` is a table with integer keys and string values.  `text.menu` displays these strings as menu options, and returns the corresponding key for the option chosen.  The `menuTable` can't have a key less than 1, and all keys must be integers, but the menu table can skip keys, including 1.  If the "Cancel" option is chosen (only available if `canCancel` is `true`), 0 is returned.  

`text.menu` returns the page where the selection was made as a second integer value.  In most circumstances you will ignore it, but it useful if you want to be able to return to a particular page in a menu later on.  (2 integers are always returned, even if you don't use the `page` argument.)  If you are not interested in the second value, you can write

```lua
local choice = text.menu(menuTable,menuText,menuTitle,true)
```
and ignore the second returned value.

The `menuTable` is the table of options for the menu, as described above.  The `menuText` is text to be displayed along with the menu, above the options.  The `menuTitle` is the tile for the text box (or boxes) that display the menu.  The default is `""`.  `canCancel` determines if a "Cancel" option (returning 0) is provided as part of the menu, with `true` providing the option, and `false` or `nil` omitting it. `imageInfo` is an [`imageInfo`](#imageInfo) datum, and provides an image to be shown with the menu; `nil` means no image is shown.  The `page` is an integer determining which page of the menu will be displayed first, with `nil` defaulting to the first page.  If `page` is larger than the number of pages in the menu, the last page is used.

The last 3 arguments, `canCancel`, `imageInfo`, and `page`, can be provided (or omitted) in any order.  However, `menuTable`, `menuText`, and `menuTitle` must be provided as the first 3 arguments in that order.

Valid Arguments:
```
menuTable: table (restrictions described above)
menuText: string
menuTitle: string or nil
canCancel: boolean or nil
imageInfo: imageInfo or nil
page: integer or nil
```

Usage Tip:  
It will occasionally happen that you will wish that you could start your menu options at an integer less than 1.  This typically happens if you are generating menu options programmatically, since it is usually convenient to use existing id numbers.  Suppose we want the player to choose a technology that they currently possess.  It would make sense to put the technologies in the menu using their id number as the keys.  However, the id numbers start at 0, and our menu must start at 1, which is a problem.  We can work around this by adding an ‘offset’ value when we make the menu, and subtracting it from the selected choice, as we well see in this small example:
```lua
-- chooseTechnology()--> techObject
-- asks the active player to choose a technology
-- that they currently possess, and returns the
-- corresponding technology object
local function chooseTechnology()
	local activeTribe = civ.getCurrentTribe()
	local offset = 3
	local menuTable = {}
	menuTable[1] = "Return nil instead!"
	for techID=0,99 do
		local technology = civ.getTech(techID)
		if activeTribe:hasTech(technology) then
			-- add the offset to every menu option, so the least that
			-- the key can be is offset (3)
			-- we can subtract the offset from the choice later
			menuTable[techID+offset]=technology.name
		end
	end
	local choice = text.menu(menuTable,"Choose a technology to return.")
	if choice == 1 then
		-- player chose to return nil instead
		return nil
	end
	-- we subtract off the offset, so we can get the tech we want
	return civ.getTech(choice-offset)
end
```
We could have used an offset of 2 here, but nothing is hurt by using an offset of 3.

Note: Allowing the last 3 arguments to be in an arbitrary order was to allow for backwards compatibility without having to put `imageObject` after `page`.


### `text.openArchive`[&uarr;](#functions)
```lua
text.openArchive()
text.openArchive(archiveTitle, archiveText, archivePage,showHidden,tribe)
```

Opens a menu to allow the player to review the archived messages for his or her tribe.  In the Lua Scenario Template, this is part of the [key press](LuaExecutionPoints.md#key-press) execution point, found in `keyPressEvents.lua` in the `LuaRulesEvents` folder.

Archiving messages allows the player to review them at a later date.  [`text.addToArchive`](#textaddtoarchive) and [`text.displayNextOpportunity`](#textdisplaynextopportunity) can add messages to the archive.

`archiveTitle` is the "menuTitle" for the archive menu.  The default is "Archived Messages".  
`archiveText` is the "menuText" for the archive menu.  The default is "Choose a message to review."  
`archivePage` is the "page" of the archive menu to open first.  The default is 1.  
`showHidden` determines if the "hidden" messages are to be shown.  A player can "hide" messages so they won't show up in the archive menu by default, but can make them visible if desired.  
`tribe` is the tribe whose archive is being opened.  By default, it is the currently active tribe.

Valid Arguments:
```
archiveTitle:string or nil
archiveMessage: string or nil
archivePage: integer or nil
showHidden: boolean or nil
tribe: tribeObject or nil
```

### `text.deleteAIArchives`[&uarr;](#functions)
```lua
deleteAIArchives()
```

Deletes all messages in archives owned by AI tribes.

### `text.substitute`[&uarr;](#functions)
```lua
text.substitute(rawText,substitutionTable)
```
Substitutes %STRINGX (for X in 0-9) in the `rawText` with the corresponding value in the `substitutionTable`.  That is,
```
substitutes %STRING1 with tostring(substitutionTable[1])
substitutes %STRING2 with tostring(substitutionTable[2])
     .
     .
     .
substitutes %STRING9 with tostring(substitutionTable[9])
and 
substitutes %STRING0 with tostring(substitutionTable[0])
```
This is an alternative to piecing together a text with sting concatenation at the place you need it.  Instead, you can specify the entire string in advance (e.g. in the object table), and make substitutions at the time of use.

Valid Arguments:
```
rawText: string
substitutionTable: table with keys 0-9, that match the %STRINGX in the rawText
```

Note: Substitutions for %STRING10 and above are forbidden, since the %STRING1 in %STRING10 might be substituted first.  More than 10 replacements is very rare anyway.


### `text.convertTableToColumnText`[&uarr;](#functions)

### `text.makeTableText`[&uarr;](#functions)

### `text.copyTableAsText`[&uarr;](#functions)

### `text.simpleTabulation`[&uarr;](#functions)

### `text.simpleTabTableToText`[&uarr;](#functions)

### `text.tabulationMenu`[&uarr;](#functions)

### `text.checkboxMenu`[&uarr;](#functions)

### `text.groupDigits`[&uarr;](#functions)

### `text.setDigitGroupSeparator`[&uarr;](#functions)

### `text.money`[&uarr;](#functions)

### `text.setMoney`[&uarr;](#functions)

### `text.getVeteranTitle`[&uarr;](#functions)

### `text.setVeteranTitle`[&uarr;](#functions)

### `text.getShortVeteranTitle`[&uarr;](#functions)

### `text.setShortVeteranTitle`[&uarr;](#functions)

### `text.makeReverseListNoGaps`[&uarr;](#functions)

### `text.niceList`[&uarr;](#functions)

### `text.coordinates`[&uarr;](#functions)

### `text.linkState`[&uarr;](#functions)