function tree(tokens) {
	for (let i in tokens) {
		token = tokens[i];

		if (token.type == "If") {
			count = 1
			token.children = []
			while (count < Number(token.lines)+1) {
				token.children.push(tokens[Number(i) + 1]);
				tokens.splice(Number(i) + 1, 1)
				count++;
			}
		}
	}
	return tokens
}

//expressions tree

module.exports = tree;