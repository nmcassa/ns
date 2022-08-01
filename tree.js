//check if a string contains a numeric value
function isNumeric(str) {
	if (typeof str != "string") {
		return false;
	}
	return !isNaN(str) && !isNaN(parseFloat(str));
}

//check if a string contains a valid operator
function isOperator(str) {
	if (str.length != 1 || typeof str != "string") {
		return false;
	}
	operators = ['+', '-', '*', '/', '==', '<', '>'];
	for (let i in operators) {
		if (operators[i] == str) {
			return true;
		}
	}
	return false;
}

//split the str up into an array
function get_array(str) {
	str = str.slice(1, -1);
	str = str.split(",");

	return str;
}

//creates a statement tree for certain types of tokens
function statement_tree(tokens) {
	for (let i in tokens) {
		const token = tokens[i];

		//adds the var_val to a declare token
		if (token.type == "Declare") {
			if (isNumeric(token.var_val)) {
				token.var_type = "int";
				token.var_val = Number(token.var_val);
			}
			else if (token.var_val[0] == '[') {
				token.var_type = "array";
				token.var_val = get_array(token.var_val);
				token.length = token.var_val.length
			} else {
				token.var_type = "str";
			}
		}

		//takes the lines under an if statement and adds them to a 
		//children parameter of the if statement token
		if (token.type == "If") {
			token.children = (tokens.splice(Number(i) + 1, token.lines));
		}

		//same as the if statement
		if (token.type == "For") {
			token.children = (tokens.splice(Number(i) + 1, token.lines));
		}
	}
	return tokens;
}

//creates an expression tree
function get_expression_tree(items) {
	let tree = []
	for (let i in items) {
		item = items[i];
		if (isNumeric(item)) {
			tree.push({type: 'Num', val: Number(item)});
		}
		else if (isOperator(item)) {
			tree.push({type: 'Op', val: item});
		}
		else {
			tree.push({type: 'Var', val: item});
		}
	}

	return tree;
}

//calls get expression tree for expressions 
function expression_tree(tokens) {
	for (let i in tokens) {
		const token = tokens[i];

		if (token.type == "Expression") {
			items = token.expression.split('');
			token.expression = get_expression_tree(items);
		}

		if (token.type == "If") {
			items = token.statement.expression.split('');
			token.statement.expression = get_expression_tree(items);

			expression_tree(token.children);
		}

		if (token.type == "For") {
			expression_tree(token.children);
		}
	}
	return tokens;
}

function tree(tokens) {
	const first = statement_tree(tokens);
	const second = expression_tree(tokens);

	return second;
}

module.exports = tree;