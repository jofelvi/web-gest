export const sortingQuantity = (statePVM, statePedidosNumero)=>{
    let dataCantidad = 'totalPVM';
        if(!statePVM &&  statePedidosNumero ){
         
          return dataCantidad = 'totalNumero';    
        }
        if(statePVM  &&  !statePedidosNumero){
         
          return dataCantidad = 'totalPVM';     
        }
        return dataCantidad 
      }

export const sortingTime = (data)=>{
    if (data){
      let dataTiempo = '';
      data.map(dat =>{
        
        if(dat.month){ 
          dataTiempo = 'month';
          return dataTiempo;  
        }
       
        if(dat.year){
        return dataTiempo = 'year';  
        }
        
        if(dat.day){
          return dataTiempo = 'day';  
        }
        
        if(dat.hour){
          return dataTiempo = 'hour';  
        }
        
      })
       return dataTiempo 
      }
    }