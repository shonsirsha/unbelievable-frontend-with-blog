export function secsToMin(seconds) {
	const format = (val) => `0${Math.floor(val)}`.slice(-2);
	const hours = seconds / 3600;
	const minutes = (seconds % 3600) / 60;

	if (hours >= 1) {
		return [hours, minutes, seconds % 60].map(format).join(":");
	}

	return [minutes, seconds % 60].map(format).join(":");
}
