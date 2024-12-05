import Cookies from 'universal-cookie';
const cookies = new Cookies();

/**
 * Sets the user as logged in, and stores info into cookies
 *
 * @param username  The user's username
 * @param hash  The user's encrypted password
 */
export function setLoggedIn(username: string, hash: string) {
    try {
        cookies.set('sessionLoggedIn', true, {path: '/'});
        cookies.set('user', username, {path: '/'});
        cookies.set('hashedPw', hash, {path: '/'});
        console.log("Logged in:" + username);
    } catch (e) {
        console.error("Error creating account:" + e);
        alert("Error creating account");
        logout();
    } finally {
        console.log("Login Status:" + getLoggedIn() + ", " + getUsername() + ", " + getHash());
    }
}

/**
 * Logs the user out
 */
export function logout() {
    try {
        cookies.set('sessionLoggedIn', false, {path: '/'});
        cookies.set('user', 'Guest', {path: '/'});
        cookies.set('hashedPw', 'Guest', {path: '/'});
        console.log("Logged out");
    } catch (e) {
        console.error("Error logging out:" + e);
        alert("Error logging out");
    }
}

/**
 * Gets user login status
 */
export function getLoggedIn(): boolean {
    console.log("Logged In: " + cookies.get('sessionLoggedIn'));
    return cookies.get('sessionLoggedIn');
}

/**
 * Gets the user's username
 */
export function getUsername(): string {
    console.log("Retrieved username")
    return cookies.get('user');
}

/**
 * Gets the user's encrypted password
 */
export function getHash(): string {
    console.log("Retrieved hash")
    return cookies.get('hashedPw');
}
