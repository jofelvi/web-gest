import moment from "moment";
export const dateFormat = "DD-MM-YYYY";
export const dateFormat2 = "YYYY-MM-DD";
export const validateDate = (value) => {
    let errors = "";
        if (!value) {
            errors = "No se puede dejar en blanco!!";
        } else if (
            moment(value).format(dateFormat2) < moment(Date.now()).format(dateFormat2)
        ) {
            errors = "Fecha invalida no puede ser menor al dia de hoy!";
        }
    console.log("errores fecha", value)
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


export const validateDatesMoment = (date1, date2) => {
    let errors = "";
    let dateFor;
    console.log("errores date1", date1)
    console.log("errores date2", date2)

    dateFor = moment(date1).format(dateFormat2)
    console.log("errores date3", dateFor)
     if (moment(date2).isSameOrAfter(dateFor)) {
         console.log("Fecha es mayor")
         errors = "la fecha no puede  de fin no puede ser menor que la fecha de inicio"
     }else{
         console.log("Fecha es es menor")
         errors = ""
     }

    return errors;
};

