export function whitespace(str) {
	// only whitespace
	if (!str.replace(/\s/g, "").length) {
		return true;
	}
	return false;
}
