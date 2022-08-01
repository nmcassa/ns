let stack = [];

function find_var(arr, name) {
	if (typeof name != "string" || arr.length == 0) {
		throw new Error("No variable found in memory");
	}
	for (let i in arr) {
		if (arr[i][0] == name) {
			return i;
		}
	}
	throw new Error("No variable found in memory");
}

function expression_eval(arr) {
	for (let i in arr) {
		i = Number(i);
		let first, second;

		if (arr[i].type == 'Op') {
			if (arr[i-1].type == 'Var') {
				first = Number(stack[find_var(stack, arr[i-1].val)][1]);
			} else {
				first = arr[i-1].val;
			}
			if (arr[i+1].type == 'Var') {
				second = Number(stack[find_var(stack, arr[i+1].val)][1]);
			} else {
				second = arr[i+1].val;
			}

			if (arr[i].val == '+') {
				return first + second;
			}
			else if (arr[i].val == '-') {
				return first - second;
			}
			else if (arr[i].val == '*') {
				return first * second;
			}
			else if (arr[i].val == '/') {
				return first / second;
			}
			else if (arr[i].val == '<') {
				return first < second;
			}
			else if (arr[i].val == '>') {
				return first > second;
			}
			else if (arr[i].val == '==') {
				return first == second;
			}
		}
	}
	throw new Error("Invalid Expression");
}

function interpret(tokens){
	for (let i in tokens) {
		const token = tokens[i];

		if (token.type == 'Output') {
			if (token.output[0] == "\"") {
				console.log(token.output);
			} else {
				console.log(stack[find_var(stack, token.output)][1]);
			}
		}

		if (token.type == 'Declare') {
			stack.push([token.var_name, token.var_val]);
		}

		if (token.type == 'Expression') {
			if (token.assignment != 'statement') {
				stack[find_var(stack, token.assignment)][1] = expression_eval(token.expression);
			}
		}

		if (token.type == 'If') { //check if statement is true!!!!
			if (expression_eval(token.statement.expression))
				interpret(token.children);
		}

		if (token.type == 'For') {
			for (let i = 0; i < token.times; i++) {
				interpret(token.children);
			}
		}
	}	
	return tokens
}

module.exports = interpret;