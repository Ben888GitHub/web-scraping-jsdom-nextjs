import Image from 'next/image';

import { Inter } from 'next/font/google';
import axios from 'axios';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [downloads, setDownloads] = useState('');
	const [packageName, setPackageName] = useState('');

	const getDownloads = async () => {
		// fetch download from npm package
		const { data } = await axios.post(`/api/getNpmDownloads`, {
			package_name: packageName
		});

		setDownloads(data.downloads);

		console.log(data);
	};

	return (
		<main
			className={`flex flex-col items-center justify-between p-16 ${inter.className}`}
		>
			<p className="text-2xl md:text-4xl lg:text-4xl m-10">
				Puppeteer Web Scraping with NextJS
			</p>
			<div className="flex flex-col items-center gap-6">
				<input
					type="text"
					className="rounded-md border-2 border-gray-300 p-2"
					placeholder="Enter package name"
					value={packageName}
					onChange={(e) => setPackageName(e.target.value)}
				/>
				<button
					onClick={getDownloads}
					className="rounded-md bg-pink-600 p-4 text-xl font-bold text-white"
				>
					Go
				</button>
				{downloads && (
					<p className="text-md">This Package has {downloads} downloads </p>
				)}
			</div>
		</main>
	);
}
