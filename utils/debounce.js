export default function debounce(func, wait) {
	if (window) {
		const { clearTimeout } = window;
		let timerId = null;
		return function (...args) {
			timerId && clearTimeout(timerId);
			timerId = setTimeout(function () {
				return func.apply(this, args);
			}, wait);
		};
	}
}
