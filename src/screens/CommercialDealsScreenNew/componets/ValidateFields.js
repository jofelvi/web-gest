import moment from "moment";
export const dateFormat = "DD-MM-YYYY";

export const validateDate = value => {
    let errors;

    if (!value) {
        errors = "Required!";
    } else if (
        moment(value).format(dateFormat) < moment(Date.now()).format(dateFormat)
    ) {
        errors = "Fecha invalida!";
    }

    return errors;
};

export const validateEmail = value => {
    let errors;

    if (!value) {
        errors = "el Email debe tener formato E-mail!";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errors = "Invalid email address!";
    }

    return errors;
};

export const isRequired = value => (!value ? "No se puede dejar en blanco!" : "");
