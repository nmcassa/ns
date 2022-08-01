function get_subarray(arr, start) {
	let text = "";

	while (start < arr.length) {
		text += arr[start];
		start++;
	}

	return text;
}

function lex(code){
	const tokens = [];

	const lines = code.split("\n");

	for (let i in lines) {
		const line = lines[i].replace('\r', '');
		const broken = line.split(" ");

		//variable declaration var name = "nick" 
		if (broken[0] == "var") {
			if (broken.length < 4) {
				throw new Error("Invalid declaration");
			}
			tokens.push({type: "Declare", var_name: broken[1], var_val: get_subarray(broken, 3)});
		}

		//expressions like name = 9 + 11
		if (broken[1] == "=") {
			if (broken.length < 3) {
				throw new Error("Invalid expression");
			}
			tokens.push({type: "Expression", assignment: broken[0], expression: get_subarray(broken, 2)});
		}

		//print
		if (broken[0] == "print") {
			if (broken.length == 1) {
				throw new Error("Invalid print");
			}
			tokens.push({type: "Output", output: get_subarray(broken, 1)});
		}

		//if statement
		if (broken[0] == "if") {
			if (broken.length < 4) {
				throw new Error("Invalid if statement");
			}
			if (broken[2] != "=>") {
				throw new Error("Invalid if statement");
			}
			tokens.push({type: "If", lines: broken[1], statement: 
					{type: "Expression", assignment: 'statement', expression: get_subarray(broken, 3)}});
		}

		if (broken[0] == "for") {
			if (broken.length < 2 || broken[2] != "=>") {
				throw new Error("Invalid for statement");
			}
			tokens.push({type: "For", lines: broken[3], times: broken[1]})
		}
	}
	return tokens;
}

module.exports = lex;