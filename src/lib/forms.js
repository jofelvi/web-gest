export const handleInput = (setFieldValue, id) => (event) => {
    if (!event.target) {
      return setFieldValue(id, event);
    }

    return setFieldValue(id, event.target.value);
  };
  export const handleInputChecked = (setFieldValue, id) => (event) => {
    if (!event.target) {
      return setFieldValue(id, event);
    }
    return setFieldValue(id, event.target.checked);
  };

 