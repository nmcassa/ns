const fs = require("fs");
const lex = require("./lex.js");

function readFile(filename) {
  return fs.readFileSync(filename).toString();
}

function compile() {
  const filename = "hello.nick";
  const code = readFile(filename);
  const lexed = lex(code);
  console.log(lexed);
}
compile();