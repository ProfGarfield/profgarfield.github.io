---
layout: page
title: dataTable
tabTitle: dataTable.lua Documentation
minTOC: 2
maxTOC: 3
---

# dataTable

A dataTable acts as an ordinary table, but, if desired, you can forbid values from being changed, forbid new key-value pairs from being stored, and forbid trying to access keys with a `nil` value.  These features can make debugging easier by causing an error to happen on the line the mistake is made.

The following functions can be used to control the data table's features:

gen.forbidReplacement(dataTable) --> void

gen.allowReplacement(dataTable) --> void

gen.forbidNewKeys(dataTable) --> void

gen.allowNewKeys(dataTable) --> void

gen.forbidNilValueAccess(dataTable) --> void

gen.allowNilValueAccess(dataTable) --> void

gen.restrictValues(dataTable,isValidValueFn,makeValidValueFn) --> void






