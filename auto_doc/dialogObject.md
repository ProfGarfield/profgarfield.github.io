---
layout: page
title: dialogObject
tabTitle: dialogObject.lua Documentation
minTOC: 2
maxTOC: 3
---

# dialogObject

A dialog object is a data type provided by the Test of Time Patch Project Lua Interpreter. It represents a text box that can be displayed to the player and provides properties and methods to customize it.
[Lua Function Reference](https://forums.civfanatics.com/threads/totpp-lua-function-reference.557527/#dialog)



### addCheckbox
```
(method) dialogObject:addCheckbox(string: string, id: integer, initial: boolean)
```
Adds a checkbox to the dialog, with label given by `string`. `id` is an integer value that can be used in dialog:getCheckboxState to retrieve the state after calling dialog:show. `initial` is an optional boolean parameter, if set to `true` the checkbox will be checked initially. Can not be used in conjunction with dialog:addOption.

@*param* `initial` — Default Value is false



### addImage
```
(method) dialogObject:addImage(image: imageObject)
```
Adds an image to the dialog.



### addOption
```
(method) dialogObject:addOption(string: string, id: integer)
```
Adds a selectable option to the dialog, with label given by `string`. `id` is an integer value returned by dialog:show if this option was selected. Can not be used in conjunction with dialog:addCheckbox.



### addText
```
(method) dialogObject:addText(string: string)
```
Adds a static text string to the dialog.



### getCheckboxState
```
(method) dialogObject:getCheckboxState(id: integer)
  -> boolean: boolean
```
Returns the state of the checkbox identified by `id` after dialog:show has been called.



### height
```
dialogObject.height --> integer
```
(get/set) Returns the height of the dialog. Normally this does not need to be set, since the height is automatically calculated from the height of the items.



### show
```
(method) dialogObject:show()
  -> integer: integer
```
Renders the dialog on screen. If this is an option dialog, returns the id of the selected option (see dialog:addOption). If this is a checkbox dialog, returns 0 if OK was pressed, -1 if Exit was pressed. Use dialog:getCheckboxState to query the individual checkboxes. This method can only be called once per dialog. It will return an error if invoked a second time.



### title
```
dialogObject.title --> string
```
(get/set) Returns the title of the dialog.



### width
```
dialogObject.width --> integer
```
(get/set) Returns the width of the dialog.





