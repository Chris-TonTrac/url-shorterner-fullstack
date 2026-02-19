
export function validateUrl(targetUrl) {

    if(!targetUrl) {
        return { error: 'url is required.'};
    };

    try {
        const url = new URL(targetUrl);
        if(url.protocol !== 'http:' && url.protocol !== 'https:') {
            return { error: 'url must start with http:// or https://' };
        }
    } catch {
        return { error: 'url is invalid.' };
    }

};