const sh = require('shelljs')

module.exports = {
	git: {
		check() {
			if (!sh.which('git')) {
				sh.echo('Sorry, this script requires git');
				sh.exit(1);
			}
		},
		enable: str => [
			`git config --global http.proxy "${str}"`,
			`git config --global https.proxy "${str}"`
		],
		get disable() {
			return [
				`git config --global --unset core.gitproxy`,
				`git config --global --unset http.proxy`,
				`git config --global --unset https.proxy`,
				`git config --global --unset http.sslVerify`
			]
		},
		view: () => [
			`git config --global http.proxy`,
			`git config --global https.proxy`
		]
	},
	npm: {
		check() {
			if (!sh.which('npm')) {
				sh.echo('Sorry, this script requires npm');
				sh.exit(1);
			}
		},
	},
	yarn(str) {
		return [``]
	},
	/**
	 * 
	 * @param {Array<string>} arr 
	 * @param {Boolean} _continue
	 */
	exec(arr, _continue) {
		let exec, result = {
				err: false,
				output: ''
			},
			count = 0;
		for (const it of arr) {
			//console.log("Exec:", sh.exec(it));

			if ((exec = sh.exec(it)).code !== 0) {
				if (!_continue) {
					throw `Error ${count++}: ${exec.stderr}`
				} else {
					result.output += `${count++}: ${JSON.stringify(exec)}`
					result.err = true
					result.err
				}
			}
			result.output += `${exec.stdout}\n`
		}
		return result
	}
}