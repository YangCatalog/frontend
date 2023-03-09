export class ValidationError extends Error {
    type: any;
    constructor(message, type) {
        super(message);
        Object.setPrototypeOf(this, ValidationError.prototype);
        this.type = type;
    }
}
