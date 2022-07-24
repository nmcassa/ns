function get_quoted(line) {
	text = "";

	t = line.split('');
	i = 0;

	while (i < t.length) {
		if (t[i] == "\"") {
			i++;
			while (t[i] != "\"") {
				text += t[i];
				i++;
			}
			break;
		}
		i++;
	}

	return text;
}

function lex(code){
	tokens = [];

	lines = code.split("\n");

	for (let i in lines) {
		line = lines[i].replace('\r', '');
		broken = line.split(" ");

		//variable declaration var name = "nick" 
		//(need to add variable via reference) var name; name = "nick"
		if (broken[0] == "var") {
			tokens.push({type:"Declare", var_name: broken[1], var_val: get_quoted(line)});
		}

		//print
		if (broken[0] == "print") {
			tokens.push({type: "Output", output:broken[1]})
		}
	}

	return tokens
}

module.exports = lex;