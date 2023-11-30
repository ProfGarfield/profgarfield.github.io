---
layout: page
title: menuTable
tabTitle: menuTable.lua Documentation
minTOC: 2
maxTOC: 3
---

# menuTable

A menuTable represents the options that will appear in a menu.

The options will appear in order based on the keys of the table.

When an option is chosen in the menu, the key of the option will be returned.

The keys of the table must be integers, and the lowest allowable key is 1.
(0 represents the "cancel" option, which is not part of the menuTable.)  The menuTable does not have to have an option associated with every integer.  (It is even permissible to not have the key 1 associated with an option.)






