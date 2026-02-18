
export function validateUrl(targetUrl, userId) {

    if(!targetUrl) {
        return { error: 'url is required.'};
    };

    if(!userId) {
        return { error: 'userId is required.'};
    };

};