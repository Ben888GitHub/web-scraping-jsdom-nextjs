import { JSDOM } from 'jsdom';

const handler = async (req, res) => {
	const { package_name } = req.body;

	const response = await fetch(
		`https://www.npmjs.com/package/${package_name.toLowerCase()}`
	);

	const html = await response.text();

	// console.log('html', html);
	const dom = new JSDOM(html);
	const document = dom.window.document;

	const downloads = document.querySelector('._9ba9a726').textContent;

	console.log(`downloads: ${downloads}`);

	res.status(200).json({ downloads });
};

export default handler;
