function isNumeric(str) {
	if (typeof str != "string") {
		return false;
	}
	return !isNaN(str) && !isNaN(parseFloat(str));
}

function isOperator(str) {
	if (str.length != 1 || typeof str != "string") {
		return false;
	}
	operators = ['+', '-', '*', '/'];
	for (let i in operators) {
		if (operators[i] == str) {
			return true
		}
	}
	return false
}

function statement_tree(tokens) {
	for (let i in tokens) {
		token = tokens[i];

		if (token.type == "If") {
			token.children = (tokens.splice(Number(i) + 1, token.lines))
		}
	}
	return tokens
}

function get_expression_tree(items) {
	tree = []
	for (let i in items) {
		item = items[i];
		if (isNumeric(item)) {
			tree.push({type: 'Num', val: Number(item)});
		}
		else if (isOperator(item)) {
			tree.push({type: 'Op', val: item});
		}
		else {
			tree.push({type: 'var', val: item});
		}
	}

	return tree
}

function expression_tree(tokens) {
	for (let i in tokens) {
		token = tokens[i];

		if (token.type == "Expression") {
			items = token.expression.split('');
			token.expression = get_expression_tree(items);
		}

		if (token.type == "If") {
			items = token.statement.expression.split('');
			token.statement.expression = get_expression_tree(items);

			expression_tree(token.children);
		}
	}
	return tokens;
}

function tree(tokens) {
	first = statement_tree(tokens);
	second = expression_tree(tokens);

	return second;
}

module.exports = tree;