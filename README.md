# ns

 This is an (in progress) interpreter, written in javascript, for a high-level programming language called ns

## ns syntax

This language is like python and lua, because it is dynamically typed and also because it is written like English

Also there are no tabs and no encapsulating characters (except "" for strings) (at this point in dev). Expressions don't support PEMDAS (because of the lack of ()). So loops and ifs declare how many lines below 'belong' to them for example this if statement is holding the two lines underneath it:

```
if 2 => i > 5
var item = i
print item
```

A for loop takes the number of times it's going to loop and the number of lines under it, it will run that many times:

```
for 4 => 2
i = i + 1
print i
```

This code runs the two lines underneath it four times.