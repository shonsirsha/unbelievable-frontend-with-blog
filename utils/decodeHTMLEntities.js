export default function decodeHTMLEntities(str) {
	if (str && typeof str === "string") {
		var txt = document.createElement("textarea");
		txt.innerHTML = str;
		return txt.value;
	}
	return str;
}
