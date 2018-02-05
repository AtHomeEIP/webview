/**
 * The {CustomError} class fixes a bug when extending the base {Error} class.
 * It must be used whenever the {Error} class must be extended.
 * @class CustomError
 * @extends Error
 * @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
 */
export class CustomError extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
