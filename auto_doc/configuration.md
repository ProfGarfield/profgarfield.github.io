---
layout: page
title: configuration
tabTitle: configuration.lua Documentation
minTOC: 2
maxTOC: 3
---

# configuration

undefined



### defineSetting
```
function configuration.defineSetting(settingSpec: table)
```
 settingSpec is a table with the following fields
      name: the name of the setting (string)
      nameInMenu: the name of the setting as it appears in the menu (string)
      placement: the placement of the setting in the menu (integer)
      values: a table of the possible values for the setting
          The table should be indexed with integers starting at 1
      valueNames: a table of the names of the possible values for the setting
          The table should be indexed with integers starting at 1, 
          with the names corresponding to the values of the same 
          index in the values table.  Any omitted valueNames will 
          be replaced with the value from the values table after 
          applying the tostring function.
      defaultIndex: the index of the default value for the setting
      changeFunction: a function that is called when the setting 
          is changed.  If absent, no function is called.
          The function will be called with the following parameters:
          function(newValue, oldValue,tribeID,settingSpec)
          



### getSettingValue
```
function configuration.getSettingValue(settingName: string, tribeID?: integer)
  -> any
```
Returns the current value of settingName
By default, it returns the value for the player's tribe. (That is, the tribe of the human player returned by civ.getPlayerTribe().)
An optional parameter tribeID can be used to get the value for a different tribe.

@*param* `tribeID` — The tribeID of the tribe whose setting value you want to get.  If omitted, the player's tribeID is used.



### getSettingValueName
```
function configuration.getSettingValueName(settingName: string, tribeID?: integer)
  -> any
```
Returns the name of the current value of settingName
By default, it returns the value for the player's tribe. (That is, the tribe of the human player returned by civ.getPlayerTribe().)
An optional parameter tribeID can be used to get the value for a different tribe.

@*param* `tribeID` — The tribeID of the tribe whose setting value you want to get.  If omitted, the player's tribeID is used.



### openConfigurationMenu
```
function configuration.openConfigurationMenu()
```
Opens the configuration menu, so that the player can change settings.



### setSettingIndex
```
function configuration.setSettingIndex(settingName: string, tribeID: integer, valueIndex: integer, suppressChangeFunction?: boolean)
```
Sets the index of the value for the setting `settingName` for the tribe with `tribeID` to `valueIndex`
If `suppressChangeFunction` is true, the changeFunction for the setting will not be called.



### setSettingValue
```
function configuration.setSettingValue(settingName: string, tribeID: integer, value: any, suppressChangeFunction?: boolean)
```
Sets the value of `settingName` for the tribe with `tribeID` to `value`
If `suppressChangeFunction` is true, the changeFunction for the setting will not be called.





