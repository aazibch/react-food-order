import { useState, useCallback } from 'react';

const useForm = (formObj) => {
    const [form, setForm] = useState(formObj);

    const createFormInputs = () => {
        return Object.values(form).map((inputConfig) => {
            return inputConfig.createInput(
                inputChangeHandler,
                inputBlurHandler,
                inputConfig.value,
                inputConfig.touched,
                inputConfig.error
            );
        });
    };

    const updateFieldValidityState = useCallback(
        (inputField) => {
            for (const rule of inputField.validationRules) {
                if (!rule.validate(inputField.value, form)) {
                    inputField.valid = false;
                    inputField.error = inputField.touched
                        ? rule.errorMessage
                        : null;
                    return inputField;
                }
            }

            inputField.valid = true;
            inputField.error = null;
            return inputField;
        },
        [form]
    );

    const inputBlurHandler = useCallback(
        (event) => {
            let inputObj = { ...form[event.target.id] };
            inputObj.touched = true;

            // Update validity state
            inputObj = updateFieldValidityState(inputObj);

            setForm({ ...form, [event.target.id]: inputObj });
        },
        [form, updateFieldValidityState]
    );

    const inputChangeHandler = useCallback(
        (event) => {
            let inputObj = { ...form[event.target.id] };

            // Update value
            inputObj.value = event.target.value;

            // Update validity state

            inputObj = updateFieldValidityState(inputObj);

            setForm({ ...form, [event.target.id]: inputObj });
        },
        [form, updateFieldValidityState]
    );

    const isFormValid = useCallback(() => {
        const inputs = Object.values(form);
        return inputs.every((input) => input.valid === true);
    }, [form]);

    const getFormValues = () => {
        const formFieldNames = Object.keys(form);
        const formValues = {};

        for (let name of formFieldNames) {
            formValues[name] = form[name].value;
        }

        return formValues;
    };

    return { createFormInputs, isFormValid, getFormValues };
};

export default useForm;
