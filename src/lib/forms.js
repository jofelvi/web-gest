export const handleInput = (setFieldValue, id) => (event) => {
    if (!event.target) {
      return setFieldValue(id, event);
    }
    console.log("handle input", setFieldValue(id, event.target.value))

    return setFieldValue(id, event.target.value);
  };

 