export function validatePhoneNumber(str) {
	var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
	return re.test(str);
}
