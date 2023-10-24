export function checkTab(event: KeyboardEvent) {
	if (event.key !== 'Tab') return;

	event.preventDefault();
	const target = event.target as HTMLTextAreaElement;

	if (isTextSelected(target)) {
		indentSelectedText(target);
	} else {
		insertTabAtCaret(target);
	}

	target.dispatchEvent(new Event('input'));
}

function isTextSelected(target: HTMLTextAreaElement): boolean {
	return target.selectionStart !== target.selectionEnd;
}

function indentSelectedText(target: HTMLTextAreaElement): void {
	const start = target.selectionStart;
	const end = target.selectionEnd;

	const lines = target.value.slice(start, end).split('\n');
	const newLines = lines.map((line) => '\t' + line).join('\n');
	target.value = target.value.slice(0, start) + newLines + target.value.slice(end);

	target.selectionStart = start;
	target.selectionEnd = end + newLines.length - lines.length * 2;
}

function insertTabAtCaret(target: HTMLTextAreaElement): void {
	const start = target.selectionStart;
	const end = target.selectionEnd;

	target.value = target.value.slice(0, start) + '\t' + target.value.slice(end);

	target.selectionStart = start + 1;
	target.selectionEnd = start + 1;
}

export function syncScroll(event: Event) {
	const target = event.target as HTMLTextAreaElement;
	const pre = target.nextElementSibling as HTMLPreElement;

	pre.scrollTop = target.scrollTop;
	pre.scrollLeft = target.scrollLeft;
}
