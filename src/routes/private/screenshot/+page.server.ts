import { decodeHtmlOptions } from '$lib/utilities/encoding.js';

export async function load({ url }) {
	const serializedOptions = url.searchParams.get('options');

	if (!serializedOptions) {
		throw new Error('No options provided');
	}

	const options = decodeHtmlOptions(serializedOptions);

	return options;
}
