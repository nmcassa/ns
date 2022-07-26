stack = [];

function find_var(arr, name) {
	for (let i in arr) {
		if (arr[i][0] == name) {
			return i;
		}
	}
}

function expression_eval(arr) {
	for (let i in arr) {
		i = Number(i);

		if (arr[i].type == 'Op') {
			if (arr[i-1].type == 'Var') {
				arr[i-1].val = Number(stack[find_var(stack, arr[i-1].val)][1]);
				arr[i-1].type = 'Num';
			}
			if (arr[i+1].type == 'Var') {
				arr[i+1].val = Number(stack[find_var(stack, arr[i+1].val)][1]);
				arr[i+1].type = 'Num';
			}

			if (arr[i].val == '+') {
				return arr[i-1].val + arr[i+1].val;
			}
			else if (arr[i].val == '-') {
				return arr[i-1].val - arr[i+1].val;
			}
			else if (arr[i].val == '*') {
				return arr[i-1].val * arr[i+1].val;
			}
			else if (arr[i].val == '/') {
				return arr[i-1].val / arr[i+1].val;
			}
			else if (arr[i].val == '<') {
				return arr[i-1].val < arr[i+1].val;
			}
			else if (arr[i].val == '>') {
				return arr[i-1].val > arr[i+1].val;
			}
			else if (arr[i].val == '==') {
				return arr[i-1].val == arr[i+1].val;
			}
		}
	}
}

function interpret(tokens){
	for (let i in tokens) {
		token = tokens[i];

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
			token.expression = expression_eval(token.expression);

			if (token.assignment != 'statement') {
				stack[find_var(stack, token.assignment)][1] = token.expression;
			}
		}

		if (token.type == 'If') { //check if statement is true!!!!
			if (expression_eval(token.statement.expression))
				interpret(token.children);
		}
	}	
	return tokens
}

module.exports = interpret;