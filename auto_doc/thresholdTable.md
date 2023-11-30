---
layout: page
title: thresholdTable
tabTitle: thresholdTable.lua Documentation
minTOC: 2
maxTOC: 3
---

# thresholdTable

 A threshold table is a table where if a numerical key is indexed, and that
 numerical key doesn't correspond to an index, the value of the largest
 numerical index less than the key is used.
 If there is no numerical index smaller than the key, false is returned
 (nil is returned for non-numerical keys not in table)
 Use an index -math.huge to provide values for arbitrarily small numerical keys
 example 
 myTable = gen.makeThresholdTable({[-1]=-1,[0]=0,[1]=1,})
 myTable[-2] = false
 myTable[-1] = -1
 myTable[-0.6] = -1
 myTable[3.5]=1
 myTable["three"] = nil
 myTable[0.5]=0





