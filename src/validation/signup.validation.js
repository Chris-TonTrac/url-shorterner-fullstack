
export function validateSignUp(firstName, lastName, email, password) {

    if(!firstName) {
        return { error: 'first name is required.'};
    };

    if(!email) {
        return { error: 'email is required.'};
    };

    if(!password) {
        return { error: 'password is required.'};
    };
};