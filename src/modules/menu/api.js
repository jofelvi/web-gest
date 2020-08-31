/*import { get, post } from '../../lib/restClient';*/
const mockMenu ={
  "data":[
    {
      id:1,
      label:"Inicio",
      url:'/'
    },
    {
      id:2,
      label:"Gestión Tareas",
      url:"/tasks"
    },
    {
      id:3,
      label:"Catálogo",
      url:"/catalog-list"
    },
    {
      id:4,
      label:"Clientes",
      children:[
        {
          id:8,
          label:"Clientes en TR",
          url:"/clients/tr"
        },
        {
          id:9,
          label:"Clientes en CBIM",
          url:"/clients/cbim"
        }
      ]
    },
    {
      id:5,
      label:"Condiciones Comerciales",
      url:"/commercial-deals"
    },
    {
      id:6,
      label:"Pedidos",
      url:"/orders"
    },
    {
      id:7,
      label:"Configuración",
      children:[
        {
          id:10,
          label:"Mi perfil",
          url:"/management/profile"
        },
        {
          id:11,
          label:"Gestión de usuarios",
          url:"/management/users"
        },
        {
          id:12,
          label:"Ayuda Online",
          url:"/management/online-help"
        }
      ]
    },
    
  ]
};

export const getMenuItems = () => {
  return new Promise((resolve,reject) =>{
    resolve(mockMenu);  
  });
}

export const getChildItems = (parentItem) =>{
  const _items = mockMenu.data.filter(item => {
    return item.id === parentItem.id
  });
  return new Promise((resolve, reject) => {
    resolve({"data":_items[0].children});
  });
}
