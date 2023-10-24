import { getHighlighter, type Lang, type Theme } from 'shiki-es';
import { derived, writable } from 'svelte/store';

export const themeName = writable<Theme | undefined>('github-dark');

export const language = writable<Lang | undefined>('javascript');

export const codeRaw = writable<string | undefined>(`function Counter() {
    const [count, setCount] = createSignal(0);
  
    setInterval(
        () => setCount(count() + 1),
        1000
    );

    return (
		<li class="form-item">
			The count is {count()}
		</li>
	)
}`);

export const highligher = derived([language, themeName], async ([$language, $themeName]) => {
	if (!$language || !$themeName) return undefined;
	return await getHighlighter({
		theme: $themeName,
		langs: [$language]
	});
});

export const codeHtml = derived(
	[highligher, codeRaw, language],
	async ([$highligher, $codeRaw, $language]) => {
		const highligher = await $highligher;
		if (!highligher || !$codeRaw) return undefined;
		return await highligher.codeToHtml($codeRaw, {
			lang: $language
		});
	}
);

export const theme = derived(highligher, async ($highligher) => {
	const highligher = await $highligher;
	if (!highligher) return undefined;
	return highligher.getTheme();
});
