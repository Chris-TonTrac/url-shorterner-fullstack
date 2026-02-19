
// Make sure the URL is actually a valid http/https URL.
// We lean on the built-in URL constructor to do the heavy lifting — if it throws
// the string isn't a real URL.
export function validateUrl(targetUrl) {

    if(!targetUrl) {
        return { error: 'url is required.'};
    };

    try {
        const url = new URL(targetUrl);
        // Reject things like ftp://, file://, etc. — we only redirect to web URLs
        if(url.protocol !== 'http:' && url.protocol !== 'https:') {
            return { error: 'url must start with http:// or https://' };
        }
    } catch {
        return { error: 'url is invalid.' };
    }
};

// Short codes end up in URLs so we need to keep them URL-safe.
// Letters, numbers, hyphens, and underscores are fine — anything else causes problems.
export function validateShortCode(shortCode) {
    if(!shortCode) {
        return { error: 'shortCode is required.' };
    }

    // 20 chars feels like a reasonable upper limit — long enough to be custom, short enough to be a "short" code
    if(shortCode.length > 20) {
        return { error: 'shortCode max length is 20 characters.' };
    }

    const shortCodeRegex = /^[A-Za-z0-9_-]+$/;

    if(!shortCodeRegex.test(shortCode)) {
        return { error: 'shortCode can only contain letters, numbers, underscore, and hyphen.' };
    }
};