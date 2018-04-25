const { isNumber } = require( 'util');
const prompt = require('prompt')

module.exports = {
	getCredentials() {
		prompt.start()

		return new Promise((resolve, reject) => {
			prompt.get([{
				name: 'host',
				required: true,
				conform: function (value) {
					return value.length > 1; //TODO: Validate host
				}
			}, {
				name: 'port',
				type: 'number',
				required: true,
				conform: function (value) {
					return !isNaN(value);
				}
			}, {
				name: 'username',
				required: true,
				conform: function (value) {
					return value.length > 0;
				}
			}, {
				name: 'password',
				hidden: true,
				conform: function (value) {
					return true;
				}
			}], function (err, result) {
				return err? reject(err) : resolve(result)
			});
		})
	}
}