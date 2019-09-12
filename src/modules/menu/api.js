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
      children:[
        {
          id:11,
          label:"Mis tareas",
          url:'/tasks/user'
        },
        {
          id:12,
          label:"Tareas de mi Equipo",
          url:'/tasks/group'
        },
        {
          id:13,
          label:"Todas las tareas",
          url:'/tasks'
        }
      ]
    },
    {
      id:3,
      label:"Usuarios Farmacia",
      url:'/process/signup'
    },
    {
      id:4,
      label:"Gestión",
      children:[
        {
          id:14,
          label:"Gestión",
          url:'/management/group'
        },
        {
          id:15,
          label:"Grupo Empresarial",
          url:'/management/enterprise-group'
        },
        {
          id:16,
          label:"Delegado",
          url:'/management/delegate'
        },
        {
          id:17,
          label:"Jefes de Zona",
          url:'/management/area-managers'
        },
        {
          id:18,
          label:"Producto",
          url:'/management/products'
        },
        {
          id:19,
          label:"Subgrupo",
          url:'/management/subgroup'
        },
        {
          id:20,
          label:"Pedidos Embargados",
          url:'/management/foreclosed-orders'
        },
        {
          id:21,
          label:"Acuerdos Comerciales",
          url:'/management/commercial-deals'
        }
      ]
    },
    {
      id:5,
      label:"Mayorista Farmacia",
      url:'/management/wholesaler-pharmacy'
    },
    {
      id:6,
      label:"Ofertas",
      url:"/deals"
    },
    {
      id:7,
      label:"Gestión Masiva",
      children:[
        {
          id:22,
          label:"Delegados y Farmacias",
          url:'/massive-management/delegates-pharmacy'
        },
        {
          id:23,
          label:"Relaciones",
          url:'/massive-management/relationships'
        },
        {
          id:24,
          label:"Limitación de compras",
          url:'/massive-management/purchase-limit'
        }
      ]
    },
    {
      id:8,
      label:"CMI",
      url:'/cmi'
    },
    {
      id:9,
      label:"Informes",
      url:'/reports'
    },
    {
      id:10,
      label:"Ayuda Online",
      url:'/online-help'
    }
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
