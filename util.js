String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
}

/**
 * 
 * @param {string} pass 
 */
module.exports = {
	prepare_password(pass) {
		return pass
			.replaceAll('\@', '%40')	//
			.replaceAll('\!', '%21')	//     ----------------------------------------------------
			.replaceAll('\#', '%23')	//    |																									
			.replaceAll('\\$', '%24')	//    |  Encoding the url																
			.replaceAll('\&', '%26')	//    |  (especially any special character in a password)
			.replaceAll('\'', '%27')	//    |  is the right solution.													
			.replaceAll('\\(', '%28')	//    |  https://stackoverflow.com/a/6172831/5125608		
			.replaceAll('\\)', '%29')	//    |																										
			.replaceAll('\\*', '%2A')	//    |																									
			.replaceAll('\\+', '%2B')	//    ----------------------------------------------------
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