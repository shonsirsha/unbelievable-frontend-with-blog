export function checkPassword(str) {
	var re = /^(?=.*\d)(?=.*[!@#$%^&*._+-/()~{}])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return re.test(str);
}
