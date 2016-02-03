
function main() {

	var h = require('mercury').h;

	function render(count)  {
	    return h('div', {
	        style: {
	            textAlign: 'center'
	        }
	    }, [String(count)]);
	}

	console.log("Hello World");

	var tree = render(3);

	console.log(JSON.parse(JSON.stringify(tree)));
}

if (require.main === module) {
	main();
}
