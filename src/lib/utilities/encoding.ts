import type { HtmlOptions } from '../../routes/api/screenshot/+server';

export function encodeHtmlOptions(options: HtmlOptions) {
	return Buffer.from(JSON.stringify(options)).toString('base64');
}

export function decodeHtmlOptions(encodedOptions: string) {
	return JSON.parse(Buffer.from(encodedOptions, 'base64').toString('utf-8')) as HtmlOptions;
}
