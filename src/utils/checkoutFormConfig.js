import Input from '../components/UI/Input';

import {
    requiredRule,
    minLengthRule,
    maxLengthRule,
    emailRule
} from './inputValidationRules';

const createFormFieldConfig = (label, id, type, defaultValue = '') => {
    return {
        createInput: (changeHandler, blurHandler, value, touched, error) => {
            return (
                <Input
                    input={{
                        id,
                        type,
                        value,
                        onChange: changeHandler,
                        onBlur: blurHandler
                    }}
                    key={id}
                    id={id}
                    type={type}
                    label={label}
                    value={value}
                    touched={touched}
                    changeHandler={changeHandler}
                    blurHandler={blurHandler}
                    error={error}
                />
            );
        },
        label,
        value: defaultValue,
        valid: false,
        error: null,
        touched: false
    };
};

export const checkoutFormConfig = {
    name: {
        ...createFormFieldConfig('Name', 'name', 'text'),
        validationRules: [requiredRule('Name'), minLengthRule('Name', 3)]
    },
    email: {
        ...createFormFieldConfig('Email', 'email', 'email'),
        validationRules: [requiredRule('Email'), emailRule()]
    },
    street: {
        ...createFormFieldConfig('Street', 'street', 'text'),
        validationRules: [requiredRule('Street'), minLengthRule('Street', 5)]
    },
    postalCode: {
        ...createFormFieldConfig('Postal Code', 'postalCode', 'text'),
        validationRules: [
            requiredRule('Postal Code'),
            minLengthRule('Postal code', 5),
            maxLengthRule('Postal code', 5)
        ]
    },
    city: {
        ...createFormFieldConfig('City', 'city', 'text'),
        validationRules: [requiredRule('City'), minLengthRule('City', 3)]
    }
};
