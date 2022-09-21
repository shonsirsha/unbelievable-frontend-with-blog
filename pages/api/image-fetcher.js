export default async function imageFetcher(req, res) {
	const url = decodeURIComponent(req.query.url);
	const result = await fetch(url);
	const body = result.body;
	return body.pipe(res);
}
