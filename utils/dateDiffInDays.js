const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export function dateDiffInDays(a, b) {
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);
	const mths = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	if (days === 0) {
		return "Hari ini";
	}

	if (days <= 31) {
		return `${days} hari yang lalu`;
	}

	return `${a.getDate()} ${mths[a.getMonth()]} ${a.getFullYear()}`;
}
