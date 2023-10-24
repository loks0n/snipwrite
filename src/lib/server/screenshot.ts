import puppeteer from 'puppeteer';
import type { HtmlOptions } from '../../routes/api/screenshot/+server';
import { encodeHtmlOptions } from '$lib/utilities/encoding';

export async function generateScreenshot(options: HtmlOptions) {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	const encodedOptions = encodeHtmlOptions(options);

	const privateScreenshotUrl = `http://localhost:5173/private/screenshot?options=${encodedOptions}`;

	await page.goto(privateScreenshotUrl);

	await page.setViewport({
		width: 600,
		height: 600,
		deviceScaleFactor: 4
	});

	const element = await page.waitForSelector('.background');
	if (!element) {
		throw new Error('Could not find element');
	}

	const buffer = await element.screenshot({
		type: 'jpeg',
		encoding: 'base64',
		quality: 100
	});
	await browser.close();

	if (typeof buffer === 'string') {
		return buffer;
	}
	return buffer.toString('base64');
}
