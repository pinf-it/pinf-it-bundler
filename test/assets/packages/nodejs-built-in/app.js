
const ASSERT = require("assert");
const PATH = require("path");

function main() {

	ASSERT(typeof PATH, "object");

	console.log("Hello World");
}

if (require.main === module) {
	main();
}
