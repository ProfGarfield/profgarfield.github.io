---
layout: page
title: imageInfo
tabTitle: imageInfo.lua Documentation
minTOC: 2
maxTOC: 3
---

# imageInfo

An `imageInfo` is one of the following:<br><br>
An `imageObject`. <br><br>
A `table` such that the first 5 values (some of which can be nil) are valid arguments for `civ.ui.loadImage`.  That is, `civ.ui.loadImage(imageObject[1],imageObject[2],imageObject[3],imageObject[4],imageObject[5])` returns a valid imageObject.<br><br>
A `string` that is the key corresponding to an `imageObject` in the `imageTable` registered by `text.setImageTable`.






