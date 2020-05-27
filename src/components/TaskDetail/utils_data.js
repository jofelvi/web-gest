export const transformData = (values, taskVar) => {
  const variables = [];
  Object.entries(values).map(value => {
		var tipo = taskVar && taskVar.find(v => v.name === value[1].name) || 
      {type: (typeof(value[1])).charAt(0).toUpperCase() + (typeof(value[1])).slice(1)};
    const label = taskVar && taskVar.find(taskLabel => taskLabel.name === value[1].name);
    const visible =  taskVar && taskVar.find(task => task.visible && (task.name === value[1].name)) ;
    const taskVariable = {
      name: value[1].name,
      value: value[1].value,
      type: tipo.type,
      label: label? label.label : '',
      transient: false,
      visible: visible ? visible.visible: false,
    }
    if(taskVariable.visible){
      return variables.push(taskVariable);
    }else{
      console.log('do not push')
    }
    return variables;
  });
  return variables;
};

export const selectTaskVariable = (taskVariables, value) => {
  const taskVariable =
    taskVariables.find(taskVariable => taskVariable.name === value) || null;
  return taskVariable;
};
