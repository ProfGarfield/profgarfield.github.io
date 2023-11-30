---
layout: page
tabTitle: Keyboard Code Documentation
---


<style>
  code {
    white-space : pre-wrap !important;
    word-break: break-word;
  }
</style>


# Reference for keyboard.lua Module
```lua
local keyboard = require("keyboard")
```
Use these codes to refer to the corresponding keys.  That is, if you need the key code for `K`, write in `keyboard.k`.  The actual key code is available here, but you probably shouldn't use the number itself in your code.

## Letters

<details><summary>keyboard.a</summary>Code: 65</details>
<details><summary>keyboard.b</summary>Code: 66</details>
<details><summary>keyboard.c</summary>Code: 67</details>
<details><summary>keyboard.d</summary>Code: 68</details>
<details><summary>keyboard.e</summary>Code: 69</details>
<details><summary>keyboard.f</summary>Code: 70</details>
<details><summary>keyboard.g</summary>Code: 71</details>
<details><summary>keyboard.h</summary>Code: 72</details>
<details><summary>keyboard.i</summary>Code: 73</details>
<details><summary>keyboard.j</summary>Code: 74</details>
<details><summary>keyboard.k</summary>Code: 75</details>
<details><summary>keyboard.l</summary>Code: 76</details>
<details><summary>keyboard.m</summary>Code: 77</details>
<details><summary>keyboard.n</summary>Code: 78</details>
<details><summary>keyboard.o</summary>Code: 79</details>
<details><summary>keyboard.p</summary>Code: 80</details>
<details><summary>keyboard.q</summary>Code: 81</details>
<details><summary>keyboard.r</summary>Code: 82</details>
<details><summary>keyboard.s</summary>Code: 83</details>
<details><summary>keyboard.t</summary>Code: 84</details>
<details><summary>keyboard.u</summary>Code: 85</details>
<details><summary>keyboard.v</summary>Code: 86</details>
<details><summary>keyboard.w</summary>Code: 87</details>
<details><summary>keyboard.x</summary>Code: 88</details>
<details><summary>keyboard.y</summary>Code: 89</details>
<details><summary>keyboard.z</summary>Code: 90</details>

## Numbers above Letters

<details><summary>keyboard.zero</summary>Code: 48</details>
<details><summary>keyboard.one</summary>Code: 49</details>
<details><summary>keyboard.two</summary>Code: 50</details>
<details><summary>keyboard.three</summary>Code: 51</details>
<details><summary>keyboard.four</summary>Code: 52</details>
<details><summary>keyboard.five</summary>Code: 53</details>
<details><summary>keyboard.six</summary>Code: 54</details>
<details><summary>keyboard.seven</summary>Code: 55</details>
<details><summary>keyboard.eight</summary>Code: 56</details>
<details><summary>keyboard.nine</summary>Code: 57</details>

## Miscellaneous Keys

<details><summary>keyboard.backspace</summary>Code: 214</details>
<details><summary>keyboard.tab</summary>Code: 211</details>
<details><summary>keyboard.enter</summary>Code: 208</details>
<details><summary>keyboard.escape</summary>Code: 210</details>
<details><summary>keyboard.esc</summary>Code: 210</details>
<details><summary>keyboard.delete</summary>Code: 217</details>
<details><summary>keyboard.numlockMinus</summary>Code: 173</details>
<details><summary>keyboard.numlockPlus</summary>Code: 171</details>
<details><summary>keyboard.numlockSlash</summary>Code: 175</details>
<details><summary>keyboard.numlockStar</summary>Code: 170</details>
<details><summary>keyboard.numlockAsterisk</summary>Code: 170</details>

## Arrows and Directions

<details><summary>keyboard.up</summary>Code: 192</details>
<details><summary>keyboard.north</summary>Code: 192</details>
<details><summary>keyboard.right</summary>Code: 195</details>
<details><summary>keyboard.east</summary>Code: 195</details>
<details><summary>keyboard.down</summary>Code: 193</details>
<details><summary>keyboard.south</summary>Code: 193</details>
<details><summary>keyboard.left</summary>Code: 194</details>
<details><summary>keyboard.west</summary>Code: 194</details>
<details><summary>keyboard.northEast</summary>Code: 197</details>
<details><summary>keyboard.pageUp</summary>Code: 197</details>
<details><summary>keyboard.southEast</summary>Code: 198</details>
<details><summary>keyboard.pageDown</summary>Code: 198</details>
<details><summary>keyboard.southWest</summary>Code: 199</details>
<details><summary>keyboard.endKey</summary>Code: 199</details>
<details><summary>keyboard.northWest</summary>Code: 196</details>
<details><summary>keyboard.home</summary>Code: 196</details>

## Number Pad Numbers

<details><summary>keyboard.numlock0</summary>Code: 160</details>
<details><summary>keyboard.numlock1</summary>Code: 161</details>
<details><summary>keyboard.numlock2</summary>Code: 162</details>
<details><summary>keyboard.numlock3</summary>Code: 163</details>
<details><summary>keyboard.numlock4</summary>Code: 164</details>
<details><summary>keyboard.numlock5</summary>Code: 165</details>
<details><summary>keyboard.numlock6</summary>Code: 166</details>
<details><summary>keyboard.numlock7</summary>Code: 167</details>
<details><summary>keyboard.numlock8</summary>Code: 168</details>
<details><summary>keyboard.numlock9</summary>Code: 169</details>

## F Keys

<details><summary>keyboard.F1</summary>Code: 176</details>
<details><summary>keyboard.F2</summary>Code: 177</details>
<details><summary>keyboard.F3</summary>Code: 178</details>
<details><summary>keyboard.F4</summary>Code: 179</details>
<details><summary>keyboard.F5</summary>Code: 180</details>
<details><summary>keyboard.F6</summary>Code: 181</details>
<details><summary>keyboard.F7</summary>Code: 182</details>
<details><summary>keyboard.F8</summary>Code: 183</details>
<details><summary>keyboard.F9</summary>Code: 184</details>
<summary>F10 key does not have a code, and can't be used.</summary>
<details><summary>keyboard.F11</summary>Code: 186</details>
<details><summary>keyboard.F12</summary>Code: 187</details>



## Shift and Ctrl

The Shift and Control keys modify the other keys, by adding `256` and `512`, respectively, to the key codes.  

If you reference a key by 
```
keyboard.keyName
```
Then, to get the ID of that key when Shift is held down, write
```
keyboard.shift.keyName
```
Similarly, to get the ID of a key when Ctrl is held down, write
```
keyboard.ctrl.keyName
```
For Ctrl and Shift at the same time, you can use either of these commands:
```
keyboard.ctrl.shift.keyName
keyboard.shift.ctrl.keyName
```

If you happen to need the value for Shift or Ctrl itself, use these:
<details><summary>keyboard.shiftOffset</summary>Code: 256</details>
<details><summary>keyboard.ctrlOffset</summary>Code: 512</details>

