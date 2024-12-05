import {genSaltSync, hashSync} from "bcrypt-ts";
import {hashLength, saltRounds} from "../constants/constants";

/**
 * Encrypts the password and generates a salted hash
 *
 * @param password The password to be encrypted
 */
export function generateSaltedHash(password: string): string {
    const salt = genSaltSync(saltRounds);
    return hashSync(password, salt);
}

/**
 * Compares and checks if the password corresponds with the hash
 *
 * @param password  The password the user entered
 * @param hash The encrypted password
 */
export function checkCorrectPassword(password: string, hash: string): boolean {
    if (typeof password !== "string" || typeof hash !== "string") {
        throw Error("Illegal arguments: " + typeof password + ", " + typeof hash);
    }

    if (hash.length !== hashLength) {
        return false;
    }

    return hashSync(password, hash.substring(0, hash.length - 31)) === hash;
}
