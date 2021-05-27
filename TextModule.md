

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

### Function List

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



## Functions[&uarr;](#text-module)

These are the functions provided by the text library.




### `text.getLinesPerWindow`[&uarr;](#functions)

### `text.setLinesPerWindow`[&uarr;](#functions)

### `text.addMultilineTextToDialog`[&uarr;](#functions)

### `text.toImage`[&uarr;](#functions)

### `text.toStateImage`[&uarr;](#functions)

### `text.simple`[&uarr;](#functions)

### `text.addToArchive`[&uarr;](#functions)

### `text.displayNextOpportunity`[&uarr;](#functions)

### `text.displayAccumulatedMessages`[&uarr;](#functions)

### `text.menu`[&uarr;](#functions)

### `text.displayArchivedMessage`[&uarr;](#functions)

### `text.openArchive`[&uarr;](#functions)

### `text.purgeArchive`[&uarr;](#functions)

### `text.deleteAIArchives`[&uarr;](#functions)

### `text.substitute`[&uarr;](#functions)

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