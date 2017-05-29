/* server.js file is used in development mode with livereload
* for a more fun development process.
*
*/
var colors = require('colors')
var StaticServer = require('static-server')

const PORT = 3000
var server = new StaticServer({
	rootPath: './.development/',
	port: PORT
})

server.start(function () {
	console.log(colors.red.underline(`Server started on port: ${PORT}`))
})
