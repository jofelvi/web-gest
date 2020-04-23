import { 
    editCommercialDeal
  } from '../../../../modules/commercialDeals/actions';
  

const alertMessage = (tipo, dataToAdd)=>{
    alert(`Edita la condicion comercial de tipo ${tipo} y añade ${dataToAdd}`)
}

export const validationCommercialDeal = (currentCommericialDeal, editCommercialDeal) =>{

    const hasProducts = currentCommericialDeal && currentCommericialDeal.productos.length > 0;
    const hasClients = currentCommericialDeal && currentCommericialDeal.clientes.length > 0;
    const hasCode = currentCommericialDeal && currentCommericialDeal.codcupon;

    if(currentCommericialDeal.tipo === "Promoción"){
        //debe tener productos asociados
        if (!hasProducts){
            alertMessage(currentCommericialDeal.tipo, "productos");
        }else if(hasProducts){
            editCommercialDeal({id: currentCommericialDeal.idcondcomercial, values:{ idestado: 1, codcupon: null, margen: 0, productos: currentCommericialDeal.productos, escalados: currentCommericialDeal.escalados, clientes: [] }})

        }
        //no debe tener clientes asociados
        //No debe tener código de campaña asociado
        //El margen debe ser 0
    }

    if(currentCommericialDeal.tipo === "Acuerdo Comercial"){
        // 1. Debe tener productos asociados
        // 2. Debe tener clientes asociados
        
        if(hasProducts && hasClients){
            editCommercialDeal({id: currentCommericialDeal.idcondcomercial, values:{ idestado: 1, codcupon: null, margen: 0, productos: currentCommericialDeal.productos, escalados: currentCommericialDeal.escalados, clientes: currentCommericialDeal.clientes }})
        }else{
            if(!hasProducts){
                alertMessage(currentCommericialDeal.tipo, "productos");
            }
            if(!hasClients){
                alertMessage(currentCommericialDeal.tipo, "clientes");
            }
        }
        // 3. No debe tener código de campaña informado
        // 4. El margen debe ser 0%
        
    }
    if(currentCommericialDeal.tipo === "Plan de Compra"){
        // 1. Debe tener productos asociados  
        // 2. Debe tener clientes asociados
        if(hasProducts && hasClients){
            editCommercialDeal({id: currentCommericialDeal.idcondcomercial, values:{ idestado: 1, codcupon: null, margen: 0, productos: currentCommericialDeal.productos, escalados: currentCommericialDeal.escalados, clientes: currentCommericialDeal.clientes }})
        }else{
            if(!hasProducts){
                alertMessage(currentCommericialDeal.tipo, "productos");
            }
            if(!hasClients){
                alertMessage(currentCommericialDeal.tipo, "clientes");
            }
        }
        // 3. No debe tener código de campaña informado
        
    }
    if(currentCommericialDeal.tipo === "Campaña"){
        // 1. Debe tener productos asociados
        if(hasCode && hasProducts){
            editCommercialDeal({id: currentCommericialDeal.idcondcomercial, values:{ idestado: 1, codcupon: null, margen: 0, productos: currentCommericialDeal.productos, escalados: currentCommericialDeal.escalados, clientes: [] }})

        }else{
            if (!hasProducts){
                alertMessage(currentCommericialDeal.tipo, "productos");
            }
            if(!hasCode){
                alertMessage(currentCommericialDeal.tipo, "código campaña");
            }
        }
        
        // 2. No debe tener Clientes asociados, de hecho, en el alta no hay que llegar hasta el paso de asociación de clientes.
        // 3. Debe tener código de campaña informado
        // 4. El margen debe ser 0%
        
    }

}
