

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
[`text.substitute(rawText,substitutionTable)-->string`](#textsubstitute)  
[`text.convertTableToColumnText(colTable,dataTable,borderWidth)--> string`](#textconverttabletocolumntext)  
[`text.makeTableText(table)`](#textmaketabletext)  
[`text.copyTableAsText(table)-->table`](#textcopytableastext)  
[`text.simpleTabulation(tabulationData,title)`](#textsimpletabulation)  
[`text.simpleTabTableToText(tabulationData)-->string`](#textsimpletabtabletotext)  
[`text.tabulationMenu(tabMenuTable,menuText,menuTitle)-->integer`](#texttabulationmenu)  
[`text.tabulationWithOptions(...)-->integer`](#texttabulationwithoptions)
[`text.checkboxMenu(checkboxNameTable,checkboxStatusTable,menuText,menuTitle)`](#textcheckboxmenu)  
[`text.groupDigits(number)-->string`](#textgroupdigits)  
[`text.setDigitGroupSeparator(character)`](#textsetdigitgroupseparator)  
[`text.money(amount)-->string`](#textmoney)  
[`text.setMoney(substitutionString)`](#textsetmoney)  
[`text.getVeteranTitle()-->string`](#textgetveterantitle)  
[`text.setVeteranTitle()`](#textsetveterantitle)  
[`text.getShortVeteranTitle()-->string`](#textgetshortveterantitle)  
[`text.setShortVeteranTitle()`](#textsetshortveterantitle)  
[`text.makeReverseListNoGaps(tableOfStrings)-->string`](#textmakereverselistnogaps)  
[`text.niceList(table)-->string`](#textnicelist)  
[`text.coordinates(tileObject)-->string`](#textcoordinates)  
[`text.linkState(tableInState)`](#textlinkstate)  

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
text.substitute(rawText,substitutionTable)-->
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
```lua
text.convertTableToColumnText(colTable,dataTable)--> string
text.convertTableToColumnText(colTable,dataTable,borderWidth)--> string
```

The `dataTable` is a table of "`rowTables`".  Each `rowTable` has keys and values for those keys.

The `colTable` is a table of "`columnSpecifications`".  Each `columnSpecification` is a table of 2 keys: `"column"` and `"align"`.  The value for the `"column"` key is one of the keys for the `rowTables`.  The optional `"align"` key determines if data in the row will be aligned to the `"left"`, `"center"`, or `"right"`.  The default is `"left"`.  Due to the limitation of the text box display, this alignment is only approximate.

The order of the `columnSpecifications` in the `colTable` determines the order of the columns produced.

`borderWidth` determines the spacing between columns.  Default value is 1.

Valid Arguments:
```
colTable: table (integer keys) of
          {["column"]=dataKey, ["align"]= "left" or "right" or "center"}
rowTable: table (integer keys) of
          {[dataKey]=dataValue}
borderWidth: integer
```

This code was written by the Civfanatics user [Knighttime](https://forums.civfanatics.com/members/knighttime.21777/).  Small changes to the code have been made.

<details>
<summary>Example Code</summary>
Use this as an events.lua file to run the example.
<p><code>
--[[
events.lua
by Knighttime
Example implementation of the columnText.lua module

This example displays a table containing basic information on your first 15 cities
	(a portion of what you see on the City Status popup available by pressing F1)
	when you press the plus sign key [+] on the numeric keyboard (not the [Shift][=] combination!)
	
As a result, the code here is placed within the civ.scen.onKeyPress() trigger,
	but you could use this in any trigger and to display any information of your choosing.

Step-by-step instructions are inline below.
]]

local func = require "functions"

local eventsPath = string.gsub(debug.getinfo(1).source, "@", "")
local scenarioFolderPath = string.gsub(eventsPath, "events.lua", "?.lua")
if string.find(package.path, scenarioFolderPath, 1, true) == nil then
   package.path = package.path .. ";" .. scenarioFolderPath
end

package.loaded["columnText"] = nil
local columnText = require("columnText")

civ.scen.onKeyPress(function (keyCode)  
	-- keyCode 171 is the plus sign on the numeric keypad (right side of a standard full-size keyboard)
	if keyCode == 171 then
			-- STEP 1: Create and populate a table that defines the layout of the information you want to present
		--		This table itself is not displayed, rather, it's where you explain the structure of your content
		--		Each display column is added as a separate table element
		--		The field named "column" is required and must be populated with a string that will be used as a table key for a data element (column)
		--			that you wish to populate and display (see Steps 2 and 3)
		--		The field named "align" is optional.  Valid values are "center" and "right".  Any other value, including nil, means "left".
		local columnTable = {
			{column = "size", align = "right"},
			{column = "city"},
			{column = "food", align = "right"},
			{column = "shields", align = "right"},
			{column = "trade", align = "right"}
		}
		-- STEP 2: Create a table that will contain the content you wish to display
		--		You can initialize it to { } if you do not wish to display a header row
		--		If you wish to display a header row of labels, define those statically here as the first table element
		--		Notice that the *fields* in this table (size, city, etc.) must exactly match the values of the *column* field
		--			in the rows of the columnTable defined in Step 1
		local dataTable = { {size = "SIZE", city = "CITY", food = "FOOD", shields = "SHIELDS", trade = "TRADE"} }
		for city in civ.iterateCities() do				
			if city.owner == civ.getPlayerTribe() and #dataTable <= 16 then
				-- STEP 3: Append an element to your data table for each row of content that it should contain
				--		As was pointed out in Step 2, notice that the *fields* in this table (size, city, etc.) must exactly match
				--			the values of the *column* field in the rows of the columnTable defined in Step 1
				--		Any other fields that you include (which do not match those defined in step 1) are ignored
				table.insert(dataTable, {
					size = city.size,
					city = city.name, 
					food = city.totalFood,
					shields = city.totalShield,
					trade = city.totalTrade
				})
			end
		end
		-- STEP 4: Call "columnText.convertTableToColumnText" to convert the content of your dataTable to a single string
		--		The first parameter is the name of the table you created in Step 1, with the data structure
		--		The second parameter is the name of the table you created in Step 2 and populated in Step 3, with the actual content to display
		--		The third parameter is the number of blank spaces you want to appear *between* each column in your output
		-- 			i.e., how widely spaced apart the columns should be
		local textString = columnText.convertTableToColumnText(columnTable, dataTable, 4)
		-- STEP 5: Display the string
		--		Note that you could combine this with the previous step and avoid introducing a separate textString variable;
		--			the separate variable is used here just for clarity
		--		Also, as an alternative to using civ.ui.text() to display the content, you could instead use civ.ui.createDialog() to
		--			create a dialog object, and then pass your string to the addText() function of that object
		civ.ui.text(func.splitlines(textString))
	end
end)
</code>
</p>
</details>

### `text.makeTableText`[&uarr;](#functions)
```lua
text.makeTableText(table)
```

Changes all values in the `table` to strings, by applying the `tostring` function.  If any values are tables, `tostring` is instead applied to the values of those tables (and so on, down the line).

Valid Argument:
```
table: table
```


### `text.copyTableAsText`[&uarr;](#functions)
```lua
text.copyTableAsText(table) --> table
```

Duplicates a table (that is, leaves the original table unchanged), and all its subtables.  All values are transformed to strings using the `tostring` function.  Returns the duplicate table.

Valid Argument:
```
table: table
```

### `text.simpleTabulation`[&uarr;](#functions)
```lua
text.simpleTabulation(tabulationData)
text.simpleTabulation(tabulationData,title)
text.simpleTabulation(tabulationData,title,borderWidth)
text.simpleTabulation(tabulationData,title,borderWidth,page)
```
Displays a formatted text based on the entries in `tabulationData` table.
If `tabulationData` has many rows, it is split into multiple pages, with navigation options.

`tabulationData[m][n]` is the value of the `n`th column in row `m`.  
`tabulationData[0][n]` is the header for the `n`th column.  The header is displayed on every page.  `tabulationData[0]=nil` means no header.

Columns are left aligned.

`title` determines the title of the text box(es). Default is `""`.

`borderWidth` determines the spacing between columns.  Default is 4.

`page` determines which page of the data will be opened.  Default is 1.

Valid Arguments:
```
tabulationData: table of tables, both having integer keys (keys start at 1, no gaps)
title: string or nil
borderWidth: integer or nil
page: integer or nil
```

Note: Uses [Knighttime](https://forums.civfanatics.com/members/knighttime.21777/)'s [text.convertTableToColumnText](#textconverttabletocolumntext).

### `text.simpleTabTableToText`[&uarr;](#functions)

```lua
text.simpleTabTableToText(tabulationData)-->string
text.simpleTabTableToText(tabulationData,borderWidth)-->string
```


Creates a formatted string based on the entries in `tabulationData` table.

`tabulationData[m][n]` is the value of the `n`th column in row `m`.  
`tabulationData[0][n]` is the header for the `n`th column.  
`tabulationData[0]=nil` means no header.  (You could also use the first row as the header.)

Columns are left aligned.

`borderWidth` determines the spacing between columns.  Default is 4.


Valid Arguments:
```
tabulationData: table of tables, both having integer keys (keys start at 1, no gaps)
borderWidth: integer or nil
```
Notes: You can also submit `borderWidth` as a third argument instead of the second.  Older versions of this module had a "title" as a second argument, but it had no use.  Allowing a third argument to be the borderWidth allows for backwards compatibility.  
Uses [Knighttime](https://forums.civfanatics.com/members/knighttime.21777/)'s [text.convertTableToColumnText](#textconverttabletocolumntext).

### `text.tabulationMenu`[&uarr;](#functions)
```lua
text.tabulationMenu(tabMenuTable,menuText)-->integer
text.tabulationMenu(tabMenuTable,menuText,menuTitle)-->integer
text.tabulationMenu(tabMenuTable,menuText,menuTitle,canCancel)-->integer
text.tabulationMenu(tabMenuTable,menuText,menuTitle,canCancel,page)-->integer
```
Produces a menu based on `tabMenuTable`.

`tabMenuTable[m][n]` is the value of the `n`th column in row `m`.  Returns the number `m` of the row selected.  `tabMenuTable` must have keys starting at 1 and be uninterrupted.  Columns are left aligned.

`menuText` is the text is the text displayed before the menu options.  If you want a header for each column, place it here.  `menuTitle` is the text box title for the menu.  Default is `""`.  `canCancel` determines if a "Cancel" option (returning 0) is provided by the menu.  Default is no cancel option.  `menuPage` is the page of the menu to open.  Default is 1.

Valid Arguments:
```
tabMenuTable: table of tables, both having integer keys (keys start at 1, no gaps)
menuText: string
menuTtile: string or nil
canCancel: boolean or nil
page: integer or nil
```

Note: Uses [Knighttime](https://forums.civfanatics.com/members/knighttime.21777/)'s [text.convertTableToColumnText](#textconverttabletocolumntext).


### `text.tabulationWithOptions`[&uarr;](#functions)
```lua
text.tabulationWtihOptions(dataTable,colTable,title,borderWidth,headerRows,
             firstPagePreviousSubstitute,lastPageCloseSubstitute,
             regPageExtraOptionsTable,lastPageExtraOptionsTable,page)-->integer
```
`dataTable` is a table of "`dataRow`s".  Each data row is a table of key-value pairs.  `dataTable[n]` will be displayed in the `n`th row.  Navigation options between pages are provided.

The `colTable` is a table of "`columnSpecifications`".  Each `columnSpecification` is a table of 2 keys: `"column"` and `"align"`.  The value for the `"column"` key is one of the keys for the `rowTables`.  The optional `"align"` key determines if data in the row will be aligned to the `"left"`, `"center"`, or `"right"`.  The default is `"left"`.  Due to the limitation of the text box display, this alignment is only approximate.

The order of the `columnSpecifications` in the `colTable` determines the order of the columns produced.  That is, if `columnTable[m]={column=dataKey}` then `dataTable[n][dataKey]` will be displayed in row `n`, column `m`.

`title` is a string to be shown as the title of the text box.  Default value is `""`.

`borderWidth` determines the spacing between columns.  Default value is 4.

`headerRows` is the number of rwos taht should be repeated at the top of each page.  For example, if `headerRows=2`, then `dataTable[1]` and `dataTable[2]` will be repeated at the top of each page.  Default is 0.

`firstPagePreviousSubstitute` is an option that replaces the "previous page" option on the first page of the menu.  If selected, -1 is returned.  By default, there is no substitute argument for the first page.

`lastPageCloseSubstitute` is the option that replaces the "next page" option on the last page of the menu.  If selected, 0 is returned.  By default, `"Close"` is the option.

`regPageExtraOptionsTable` is a table indexed by integers that are at least 1, and with string values, and provides menu options at the bottom of each page, except the last page.  Choices are displayed key in order, and keys do not need to be consecutive.  Returns the key of the choice made.  Default is no extra options.

`lastPageExtraOptionsTable` is a table indexed by integers that are at least 1, and with values, and provides menu options at the bottom of the last page.  Choices are displayed in key order, and keys do not need to be consecutive.  Returns the key of the choice made.  Default is no extra options.

`page` determines which page to open to.  Default is 1.


Valid Arguments:
```
dataTable: table (integer keys) of
          {[dataKey]=dataValue}
colTable: table (integer keys) of
          {["column"]=dataKey, ["align"]= "left" or "right" or "center"}
title: string or nil
borderWidth: integer or nil
headerRows: integer or nil
firstPagePreviousSubstitute: string or nil
lastPageCloseSubstitute: string or nil
regPageExtraOptionsTable: {[integer]=string} or nil
lastPageExtraOptionsTable: {[integer]=string} or nil
page: nil or integer
```


Note: Uses [Knighttime](https://forums.civfanatics.com/members/knighttime.21777/)'s [text.convertTableToColumnText](#textconverttabletocolumntext).

### `text.checkboxMenu`[&uarr;](#functions)
```lua
text.checkboxMenu(checkboxNameTable,checkboxStatusTable)
text.checkboxMenu(checkboxNameTable,checkboxStatusTable,menuText)
text.checkboxMenu(checkboxNameTable,checkboxStatusTable,menuText,menuTitle)
text.checkboxMenu(checkboxNameTable,checkboxStatusTable,menuText,menuTitle,menuPage)
```
Creates a menu using `checkboxNameTable` to change the (boolean) values in `checkboxStatusTable`.  If multiple pages are required, they will be shown in sequence.  It is not possible to navigate to previous pages.

`checkboxNameTable` is a table with integer keys and string values.  The string values are shown beside the appropriate checkbox.  Nil value means option does not appear.  Keys start at 1, appear in order, and non integer keys cause errors.

`checkboxStatusTable` is a table with integer keys and boolean (or nil) values.  If the box for `checkboxNameTable[i]` is checked, then `checkboxStatusTable[i]` is set to `true`.  If it is unchecked, the value is set to `false`.

The `menuText` is text shown before the checkboxes.  Default is `""`.

The `menuTitle` is the title of the text boxes.  Default is `""`.

`menuPage` is the page of the menu first displayed.  Default is 1.

Valid Arguments:
```
checkboxNameTable: {[integer]=string}
checkboxStatusTable: {[integer]=boolean}
menuText: string or nil
menuTitle: string or nil
menuPage: nil or integer
```

### `text.groupDigits`[&uarr;](#functions)
```lua
text.groupDigits(number)-->string
```

Takes the [floor](https://www.tutorialspoint.com/lua/lua_math_library.htm) of `number`, converts it to a string, adds a digit group separator, and returns that string.

By default, the separator is `,`, but it can be changed using [`text.setDigitGroupSeparator`](#textsetdigitgroupseparator).

Examples:
```lua
text.groupDigits(12345) --> "12,345"
text.groupDigits(1234567.89) --> "1,234,567"
```

Valid Argument:
```
number: number
```

### `text.setDigitGroupSeparator`[&uarr;](#functions)
```lua
text.setDigitGroupSeparator(character)
```

Changes the "Digit Group Separator" (used when displaying numbers with [`text.groupDigits`](#textgroupdigits) and [`text.money`](#textmoney)) from the default of `,` to `character`.  If you want no separator, use `""`.

Valid Argument:
```
character: string
```

### `text.money`[&uarr;](#functions)
```lua
text.money(amount)-->string
```
Converts an integer to an appropriate string denoting money, also applying [`text.groupDigits`](#textgroupdigits) to the amount.  By default, returns `"<amount> Gold"`, but that can be changed using [`text.setMoney`](#textsetmoney).

Examples:
```lua
text.setMoney(12345) --> "12,345 Gold"
text.setMoney(55) --> "55 Gold"
```

Valid Arguments:
```
amount: integer
```

### `text.setMoney`[&uarr;](#functions)
```lua
text.setMoney(substitutionString)
```

Sets the method of conversion of an integer to a money amount for [`text.money`](#textmoney).

[`text.money`](#textmoney) will substitute `%STRING1` in `substitutionString` fo the money amount, add [digit separators](#textgroupdigits), and return the string.

Examples:
```lua
text.setMoney("%STRING1 Drachmae")
text.money(1450) --> "1,450 Drachmae"
text.setMoney("$%STRING1,000")
text.money(456) -->"$456,000"
```

Valid Argument:
```
substitutionString: string containing %STRING1
```



### `text.getVeteranTitle`[&uarr;](#functions)
```lua
text.getVeteranTitle()-->string
```

### `text.setVeteranTitle`[&uarr;](#functions)
```lua
text.setVeteranTitle()
```

### `text.getShortVeteranTitle`[&uarr;](#functions)
```lua
text.getShortVeteranTitle()-->string
```

### `text.setShortVeteranTitle`[&uarr;](#functions)
```lua
text.setShortVeteranTitle()
```

### `text.makeReverseListNoGaps`[&uarr;](#functions)
```lua
text.makeReverseListNoGaps(tableOfStrings)-->string
```

### `text.niceList`[&uarr;](#functions)
```lua
text.niceList(table)-->string
```

### `text.coordinates`[&uarr;](#functions)
```lua
text.coordinates(tileObject)-->string
```

### `text.linkState`[&uarr;](#functions)
```lua
text.linkState(tableInState)
```