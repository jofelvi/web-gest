export const sortingQuantity = (statePVM, statePedidosNumero)=>{
    let dataCantidad = 'totalpvm';
        if(!statePVM &&  statePedidosNumero ){
         
          return dataCantidad = 'totalnumero';    
        }
        else if(statePVM  &&  !statePedidosNumero){
         
          return dataCantidad = 'totalpvm';     
        }
       
      }

export const sortingTime = (data)=>{
  
  let dataTiempo = '';
    if (data){ 
      data.map(dat =>{
        
       if(dat.month){ 
          dataTiempo = 'month';
          return dataTiempo;  
        }
       
        else if(dat.year){
        return dataTiempo = 'year';  
        }
        
        else if(dat.day){
          return dataTiempo = 'day';  
        }
        
        else if(dat.hour){
          return dataTiempo = 'hour';  
        }
       
      })
     
       return dataTiempo 
      }else{
        return dataTiempo = 'year'; 
      }
    }
 