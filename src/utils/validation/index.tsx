// Frontend validation - only block truly dangerous patterns
const dangerousPattern = new RegExp([
	'(?:eval|alert|confirm|prompt)\\s*\\(',
	'\\bnew\\s+Function\\s*\\(',
	'\\bconstructor\\.prototype\\b',
	'XMLHttpRequest',
	'localStorage\\s*\\.\\s*(?:setItem|removeItem)',
	'sessionStorage\\s*\\.\\s*(?:setItem|removeItem)'
].join('|'), 'i'); 

export const validateCode = (code: string): boolean => {
	if (dangerousPattern.test(code)) {
		console.error('Blocked dangerous code pattern in frontend');
		return false;
	}
	return true;
};