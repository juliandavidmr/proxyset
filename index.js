const menu = require('menu-args')
const read = require('./read')
const git = require('./git')

// Menu
var args = menu(`
Commands
    enable	"Enable proxy"
    disable	"Disable proxy"

Options
    npm			"Set up npm proxy"
		yarn		"Setup yarn proxy"
		git			"Setup git proxy"
`)

const flags = args.parse(process.argv)

args.hasCommand = function (val) {
	if (typeof val === 'string') {
		return this.sub.indexOf(val) !== -1
	} else if (Array.isArray(val)) {
		let f = val.filter(e => this.sub.indexOf(e) !== -1)
		return f.length > 0
	}
}

git.check();

(async () => {
	if (args.hasCommand(['e', 'enable'])) {
		console.log("Enable proxy");
		let credentials = await read.getCredentials()
		if (flags.g || flags.git) {
			console.log('Configure git proxy');
			git.enableProxy(credentials)
		}
	} else if (args.hasCommand(['d', 'disable'])) {
		console.log("Disable proxy");
		git.disableProxy()
	}
})()
// console.log(args.sub, flags)