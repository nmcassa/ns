const fs = require("fs");
const lex = require("./lex.js");
const interpret = require("./interpret.js")
const tree = require("./tree.js")

function readFile(filename) {
  return fs.readFileSync(filename).toString();
}

function compile() {
  const filename = "hello.nick";
  const code = readFile(filename);
  const lexed = lex(code);
  const treed = tree(lexed);
  const interpreted = interpret(treed);
  //console.log(JSON.stringify(interpreted, null, 2));
}
compile();