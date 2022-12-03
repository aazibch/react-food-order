const createValidationRule = (name, errorMessage, validationFunc) => {
    return {
        name,
        errorMessage,
        validate: validationFunc
    };
};

export const requiredRule = (inputName) => {
    return createValidationRule(
        'required',
        `${inputName} is required.`,
        (inputValue) => inputValue.length !== 0
    );
};

export const minLengthRule = (inputName, minChars) => {
    return createValidationRule(
        'minLength',
        `${inputName} should contain atleast ${minChars} characters.`,
        (inputValue) => inputValue.length >= minChars
    );
};

export const maxLengthRule = (inputName, maxChars) => {
    return createValidationRule(
        'maxLength',
        `${inputName} cannot contain more than ${maxChars} characters.`,
        (inputValue) => inputValue.length <= maxChars
    );
};

export const emailRule = () => {
    return createValidationRule(
        'emailSyntax',
        'Please enter a valid email address.',
        (inputValue) => inputValue.includes('@')
    );
};
