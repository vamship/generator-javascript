'use strict';

const { argValidator: _argValidator } = require('@vamship/arg-utils');
const GREETINGS = {
    en: 'Hello',
    fr: 'Bonjour'
};

/**
 * Handler that greets the end user.
 *
 * @param input The input to the handler.
 * @param context The execution context for the handler.
 * @param ext Extended properties for the handler.
 */
const greetingHandler = (input, context, ext) => {
    const { name, language } = input;
    const greeting = GREETINGS[language] || 'Hello';

    let messageName = name;
    if (!_argValidator.checkString(name, 1)) {
        messageName = 'there';
    }

    return {
        message: `${greeting}, ${messageName}`
    };
};

module.exports = greetingHandler;
