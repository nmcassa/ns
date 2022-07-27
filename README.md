# ns

 This is an (in progress) interpreter, written in javascript, for a high-level programming language called ns

## ns syntax

This language is like python and lua, because it is dynamically typed and also because it is written like English

Also there are no tabs and no encapsulating characters (except "" for strings) (at this point in dev). Expressions don't support PEMDOS (because of the lack of ()). So loops and ifs declare how many lines below 'belong' to them for example this if statement is holding the two lines underneath it:

```
if 2 => i > 5
var item = i
print item
```