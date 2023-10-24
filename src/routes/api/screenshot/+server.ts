import { generateScreenshot } from '$lib/server/screenshot.js';
import { json } from '@sveltejs/kit';

export type HtmlOptions = {
	codeRaw: string;
	language: string;
	themeName: string;
	tabs: string[];
	selectedTab: number;
	exportOptions: {
		width: number;
		height: number;
	};
};

export async function POST({ request }) {
	const options = (await request.json()) as HtmlOptions;

	const screenshot = await generateScreenshot(options);

	return json({
		screenshot
	});
}
