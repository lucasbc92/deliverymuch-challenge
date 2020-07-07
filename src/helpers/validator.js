const { getMessage } = require('./messages');

const getValidatorError = (error, messagePath) => {
    if(!error) return null;

    const errorMessages = {};

    error.details.map((detail) => {
        const message = detail.message;
        const type = detail.type;
        const key = detail.context.key;

        const path = `${messagePath}.${key}.${type}`;

        const customMessage = getMessage(path);
        if(!customMessage) {
            console.log('custom message not found for path: ', path)
        }

        errorMessages[key] = customMessage || message;
    });

    console.log(errorMessages);

    return errorMessages;
}

module.exports = { getValidatorError };