export const sortingQuantity = (statePVM, statePedidosNumero)=>{
    let dataCantidad = 'totalpvm';
        if(!statePVM &&  statePedidosNumero ){
         
          return dataCantidad = 'totalnumero';    
        }
        if(statePVM  &&  !statePedidosNumero){
         
          return dataCantidad = 'totalpvm';     
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