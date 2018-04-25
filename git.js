const { which, echo, exit, exec } = require('shelljs')

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = {
	/**
	 * Check if git exits 
	 */
	check() {
		if (!which('git')) {
			echo('Sorry, this script requires git');
			exit(1);
		}
	},
	/**
	 * Disable proxy conf
	 */
	disableProxy() {
		// Run external tool synchronously
		if (exec('git config --global --unset core.gitproxy').code !== 0) {
			echo('Error: Git unset proxy core failed')
		}
		if (exec('git config --global --unset http.proxy').code !== 0) {
			echo('Error: Git unset proxy http failed')
		}
		if (exec('git config --global --unset https.proxy').code !== 0) {
			echo('Error: Git unset proxy https failed')
		}
	},
	enableProxy({ host, port, username, password }) {
		// console.log('args:', host, port, username, password);
		password = this.prepare_password(password)
		//                    git config --global http.proxy http://USER:PASSWORD@URL:PORT
		let proxy_str_http = `git config --global http.proxy http:\/\/${username}:${password}@${host}:${port}`,
		//                   git config --global https.proxy http://USER:PASSWORD@URL:PORT
			proxy_str_https = `git config --global https.proxy http:\/\/${username}:${password}@${host}:${port}`;

		// console.log("Cadena 1:", proxy_str_http);
		// console.log("Cadena 2:", proxy_str_https);

		if (exec(proxy_str_http).code !== 0) {
			echo('Error: Git http.proxy failed')
		}
		if (exec(proxy_str_https).code !== 0) {
			echo('Error: Git https.proxy failed')
		}
	},
	
	/**
	 * 
	 * @param {string} pass 
	 */
	prepare_password(pass) {
		return pass
			.replaceAll('\@', '%40')  //
			.replaceAll('\!', '%21')  //     -----------------------------------------------------
			.replaceAll('\#', '%23')  //    |																										|
			.replaceAll('\\$', '%24') //    |  Encoding the url																	|
			.replaceAll('\&', '%26')  //    |  (especially any special character in a password)	|
			.replaceAll('\'', '%27')  //    |  is the right solution.														|
			.replaceAll('\\(', '%28') //    |  https://stackoverflow.com/a/6172831/5125608			|
			.replaceAll('\\)', '%29') //    | 																									|	
			.replaceAll('\\*', '%2A') //    |																										|
			.replaceAll('\\+', '%2B') //    ----------------------------------------------------
			.replaceAll('\,', '%2C')
			.replaceAll('\/\/', '%2F')
			.replaceAll('\:', '%3A')
			.replaceAll('\;', '%3B')
			.replaceAll('\=', '%3D')
			.replaceAll('\\?', '%3F')
			.replaceAll('\\[', '%5B')
			.replaceAll('\\]', '%5D');
	}
}