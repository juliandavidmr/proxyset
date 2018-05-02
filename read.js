const prompt = require('prompt')
const util = require('./util')

const schemaBasic = [{
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
}]

const schemaCredential = [{
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
}]


module.exports = {
	/**
	 * 
	 * @param {Boolean} with_credential 
	 */
	async getCredentials(with_credential) {
		prompt.start()

		let schema = []
		if (with_credential) {
			schema = [].concat(schemaBasic).concat(schemaCredential)
		} else {
			schema = [].concat(schemaBasic)
		}

		let credentials = await (new Promise((resolve, reject) => {
			prompt.get(schema, function (err, result) {
				return err? reject(err) : resolve(result)
			});
		}))

		credentials.password = util.prepare_password(credentials.password)

		if (with_credential) {
			return `http:\/\/${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}`
		} else {
			return `http:\/\/${credentials.host}:${credentials.port}`
		}
	}
}