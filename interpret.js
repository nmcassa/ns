function find_var(arr, name) {
	for (let i in arr) {
		if (arr[i][0] == name) {
			return arr[i][1];
		}
	}
}

function interpret(tokens){
	stack = [];

	for (let i in tokens) {
		token = tokens[i];

		if (token.type == 'Output') {
			if (token.output[0] == "\"") {
				console.log(token.output);
			} else {
				console.log(find_var(stack, token.output));
			}
		}

		if (token.type == 'Declare') {
			stack.push([token.var_name, token.var_val]);
		}

		//expression_tree.js to split apart expressions?
	}
}

module.exports = interpret;