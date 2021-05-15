export const transformData = (values, taskVar) => {
  const variables = [];
  Object.entries(values).map(value => {
		var tipo = taskVar && taskVar.find(v => v.name === value[0]) || 
			{type: (typeof(value[1])).charAt(0).toUpperCase() + (typeof(value[1])).slice(1)};
    const taskVariable = {
      name: value[0],
      value: value[1],
      type: tipo.type,
      transient: false,
    };
    return variables.push(taskVariable);
  });
  return variables;
};

export const selectTaskVariable = (taskVariables, value) => {
  const taskVariable =
    taskVariables.find(taskVariable => taskVariable.name === value) || null;
  return taskVariable;
};
