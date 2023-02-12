import React from "react";

const typesValidation = {
    email: {
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: "Preencha um e-mail válido.",
    },
    number: {
        regex: /^\d+$/,
        message: "Utilize apenas números",
    },
};

const useForm = (type) => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(null);

    function validate(value) {
        if (type === false) return true;
        if (value.length === 0) {
            setError("Preencha um valor.");
            return false;
        } else if (
            typesValidation[type] &&
            !typesValidation[type].regex.test(value)
        ) {
            setError(typesValidation[type].message);
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    const onChange = ({ target }) => {
        if (error) validate(target.value);
        setValue(target.value);
    };

    return {
        value,
        error,
        setValue,
        onChange,
        validate: () => validate(value),
        onBlur: () => validate(value),
    };
};

export default useForm;
