/*import { get, post } from '../../lib/restClient';*/
const mockCommercialDeals ={
  "data": [
  {
    "id":1,
    "nombre":"acuerdo uno",
    "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
    "tipocondicion":"Acuerdo Comercial",
    "fechainicio":"21/02/2019",
    "fechafin":"21/10/2019",
    "codigocampania":"1232",
    "estado":"Activo",
    "lineasescalado":[
      {
        "unidadesmin":2,
        "unidadesmax":3,
        "descuesto":20,
        "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
        "unidadesmin":4,
        "unidadesmax":8,
        "descuesto":20,
        "textoequivalencia":" et dolor ut finir inceptos hime"
      }
    ]
  },
  {
      "id":2,
      "nombre":"acuerdo dos",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Acuerdo Comercial",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1233",
      "estado":"Borrador",
      "lineasescalado":[
        {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        },
        {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        }
      ]
  },
  {
      "id":3,
      "nombre":"acuerdo tres",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Promoción",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1211",
      "estado":"Borrador",
      "lineasescalado":[
        {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        },
        {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        }
      ]
  },
  {
      "id":4,
      "nombre":"acuerdo cuatro",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Promoción",
      "fechainicio":"21/02/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1223",
      "estado":"Activo",
      "lineasescalado":[
      {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      }
      ]
  },
  {
      "id":5,
      "nombre":"acuerdo cinco",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Plan de Compra",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"12331",
      "estado":"Borrador",
      "lineasescalado":[
          {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
          },
          {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
          }
      ]
  },
  {
      "id":6,
      "nombre":"acuerdo seis",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Plan de Compra",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1232",
      "estado":"Borrador",
      "lineasescalado":[
      {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      }
      ]
  },
  {
      "id":7,
      "nombre":"acuerdo siete",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Campaña",
      "fechainicio":"21/01/2019",
      "fechafin":"21/05/2019",
      "codigocampania":"1222",
      "estado":"Inactivo",
      "lineasescalado":[
          {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
          },
          {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
          }
      ]
  },
  {
      "id":8,
      "nombre":"acuerdo ocho",
      "descripcion":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Campaña",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"456",
      "estado":"Borrador",
      "lineasescalado":[
      {
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
          "unidadesmin":4,
          "unidadesmax":8,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      }
      ]
  }
]};

export const getCommercialDeals = () => {
  return new Promise((resolve,reject) =>{
    resolve(mockCommercialDeals);  
  });
}

export const getOffers = (listOfDeals) =>{
  const items = listOfDeals.filter(deal => {
    return deal.tipocondicion === "Promoción"
  });
  return new Promise((resolve, reject) => {
    resolve({"data":items});
  });
}
export const getAgreements = (listOfDeals) =>{
  return new Promise((resolve, reject) => {
    resolve({
      "data":listOfDeals.filter(deal => {
        return deal.tipocondicion === "Acuerdo Comercial"
      })
    });
  });
}
export const getPlans = (listOfDeals) =>{
  return new Promise((resolve, reject) => {
    resolve({
      "data":listOfDeals.filter(deal => {
        return deal.tipocondicion === "Plan de Compra"
      })
    });
  });
}
export const getCampaigns = (listOfDeals) =>{
  return new Promise((resolve, reject) => {
    resolve({
      "data":listOfDeals.filter(deal => {
        return deal.tipocondicion === "Campaña"
      })
    });
  });
}
