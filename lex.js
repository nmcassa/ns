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

function get_subarray(arr, start) {
	text = "";

	while (start < arr.length) {
		text += arr[start];
		start++;
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
		if (broken[0] == "var") {
			tokens.push({type: "Declare", var_name: broken[1], var_val: get_subarray(broken, 3)});
		}

		//expressions like name = 9 + 11
		if (broken[1] == "=") {
			tokens.push({type: "Expression", var_name: broken[0], expression: get_subarray(broken, 2)});
		}

		//print
		if (broken[0] == "print") {
			tokens.push({type: "Output", output: get_subarray(broken, 1)});
		}

		//if statement
		if (broken[0] == "if") {
			count = broken[1];
			tokens.push({type: "If", lines: count, statement: 
						{type: "Expression", expression: get_subarray(broken, 3)}});
		}
	}

	return tokens;
}

module.exports = lex;