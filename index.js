const menu = require('menu-args')
const read = require('./read')
const cmd = require('./commands')
const log = console.log
// Menu
var args = menu(`
Commands
	enable	"Enable proxy"
	disable	"Disable proxy"

Options
	npm			"Set npm proxy"
	yarn		"Set yarn proxy"
	git			"Set git proxy"

	auth		(true)	"Usage auth"
	view		"View data proxy, i.e: -"
`)

const flags = args.parse(process.argv)

args.hasCommand = function (val) {
	if (typeof val === 'string') {
		return this.sub.indexOf(val) !== -1
	} else if (Array.isArray(val)) {
		let f = val.filter(e => this.sub.indexOf(e) !== -1)
		return f.length > 0
	}
};

(async () => {
	try {
		let with_auth = (JSON.parse(flags.a) || JSON.parse(flags.auth))

		if (flags.g || flags.git) {
			cmd.git.check()

			if (flags.v || flags.view) {
				log(cmd.exec(cmd.git.view))
			} else if (args.hasCommand(['e', 'enable'])) {
				log('Configure git proxy')
				const str = await read.getCredentials(with_auth)
				cmd.exec(cmd.git.enable(str))
				log('Git proxy success!')
			} else if (args.hasCommand(['d', 'disable'])) {
				let result = cmd.exec(cmd.git.disable, true)
				if (result.err) {
					console.error('->', result.output)
				} else {
					log('Git proxy removed!')
				}
			}
		}

		if (flags.n || flags.npm) {}
		if (flags.y || flags.yarn) {}
	} catch (error) {
		console.error('Error generic:', error);
	}
})()
// console.log(args.sub, flags)