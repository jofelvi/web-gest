export const getToolTipVariableForinfo = (statePedidos, statePvm)=>{
    if(statePedidos){
      return 'subfamilia*totalnumero';
    }
    if(statePvm){
      return 'subfamilia*totalpvm';
    }

   }
  