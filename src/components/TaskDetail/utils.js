export const returnTheLabelForData = (data, inputKey)=>{

  return  data.map(input => (input[inputKey]));
  
}