export const transformData = values => {
  const variables = [];
  Object.entries(values).map(value => {
    const taskVariable = {
      name: value[0],
      value: value[1],
      type: `${(typeof value[1])
        .charAt(0)
        .toUpperCase()}${(typeof value[1]).slice(1)}`,
      transient: false,
    };
    return variables.push(taskVariable);
  });
  return variables;
};

export const selectTaskVariable = (taskVariables, value) => {
  const taskVariable =
    taskVariables.find(taskVariable => taskVariable.name === value) || null;
  console.log(taskVariable);
  return taskVariable;
};
