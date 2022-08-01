let stack = [];

function find_var(arr, name) {
	if (typeof name != "string" || arr.length == 0) {
		throw new Error("No variable found in memory");
	}
	name = name.replace(' ', '')
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
			} else if (arr[i-1].type == 'Num') {
				first = arr[i-1].val;
			} else {
				throw new Error("Invalid Expression");
			}
			if (arr[i+1].type == 'Var') {
				second = Number(stack[find_var(stack, arr[i+1].val)][1]);
			} else if (arr[i+1].type == 'Num') {
				second = arr[i+1].val;
			} else {
				throw new Error("Invalid Expression");
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

//can handle string concat
function string_handler(str) {
	let ret = "";
	str = str.split('+');

	for (let i in str) {
		let item = str[i];
		if (item[0] == " ") {
			item = item.slice(1);
		}
		if (item[item.length-1] == " ") {
			item = item.slice(0, -1);
		}
		if (item[0] == "\"") {
			ret += item.slice(1, -1);
		} else {
			ret += stack[find_var(stack, item)][1];
		}
	}

	return ret;
}

function interpret(tokens){
	for (let i in tokens) {
		const token = tokens[i];

		if (token.type == 'Output') {
			console.log(string_handler(token.output));
		}

		if (token.type == 'Declare') {
			if (token.var_type == "str") {
				token.var_val = string_handler(token.var_val);
			}
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