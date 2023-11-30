---
layout: page
title: stack
tabTitle: stack.lua Documentation
minTOC: 2
maxTOC: 3
---

# stack

A "stack" is a data structure where you can 'push' a value onto the top of the stack, or you can 'pop' a value off the top of the stack.  The popped value is returned, but is no longer on the stack.  This implementation of the stack also lets you find the ith element in the stack, starting from the top, and lets you see the size of the stack.  See: [Wikipedia: Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
<br><br> `stack.push = function(value:any)-->void` <br><br> When called, adds `value` to the top of the stack.<br>`stack.push(5)` adds `5` to the top of the stack.
<br><br> `stack.pop = function()-->any` <br><br> When called, removes the top item of the stack, and returns it.<br><br>If the stack is formed by<br>`stack.push(1)`<br>`stack.push(2)`<br>`stack.push(3)`<br>then<br>`stack.pop()`-->`3`<br>`stack.pop()`-->`2`<br>`stack.pop()`-->`1`<br>`stack.pop()`-->`nil`
<br><br> `stack.size = integer` <br><br> Returns the current size of the stack.
<br><br> `stack[i] = any` <br><br>`stack[i]` returns the ith value in the stack, counting from the top, or nil if there aren't `i` values in the stack. The stack remains unchanged.<br><br>If the stack is formed by `stack.push(1)`<br>`stack.push(2)`<br>`stack.push(3)`<br>then<br>`stack[1]`-->`3`<br>`stack[2]`-->`2`<br>`stack[3]`-->`1`<br>`stack[4]`-->`nil`



### [integer]
```
stack.[integer] --> any
```
<br>`stack[i]` returns the ith value in the stack, counting from the top, or nil if there aren't `i` values in the stack. The stack remains unchanged.<br><br>If the stack is formed by `stack.push(1)`<br>`stack.push(2)`<br>`stack.push(3)`<br>then<br>`stack[1]`-->`3`<br>`stack[2]`-->`2`<br>`stack[3]`-->`1`<br>`stack[4]`-->`nil`



### pop
```
stack.pop --> fun():any
```
When called, removes the top item of the stack, and returns it.<br><br>If the stack is formed by `stack.push(1)`<br>`stack.push(2)`<br>`stack.push(3)`<br>then<br>`stack.pop()`-->`3`<br>`stack.pop()`-->`2`<br>`stack.pop()`-->`1`<br>`stack.pop()`-->`nil`



### push
```
stack.push --> fun(value: any)
```
When called, adds `value` to the top of the stack.<br>`stack.push(5)` adds `5` to the top of the stack.



### size
```
stack.size --> integer
```
Returns the current size of the stack.





