/*import { get, post } from '../../lib/restClient';*/
const mockCommercialDeals ={
  "data": [
  {
    "id":1,
    "nombre":"acuerdo uno",
    "descripcion":"eleifend tortor nisl, ut commodo lectus efficitur scel",
    "tipocondicion":"Acuerdo Comercial",
    "fechainicio":"21/02/2019",
    "fechafin":"21/10/2019",
    "codigocampania":"1232",
    "estado":"Activo",
    "lineasescalado":[
      {
        "id":1,
        "unidadesmin":2,
        "unidadesmax":3,
        "descuesto":20,
        "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
        "id":2,
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
      "descripcion":"us mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Acuerdo Comercial",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1233",
      "estado":"Borrador",
      "lineasescalado":[
        {
          "id":3,
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        },
        {
          "id":4,
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
      "descripcion":"auris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Promoción",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1211",
      "estado":"Borrador",
      "lineasescalado":[
        {
          "id":5,
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
      ],
      "products":[
        {
          "codindas":"2021608",
          "nombre":"ADDERMIS BIACTIV Aceite",
          "descripcioncorta": "Aceite Protector Hidratante. Envase 100 ml.",
          "familia":"PRODUCTOS PARA USO MÉDICO-SANITARIO",
          "subfamilia":"APÓSITOS DE GASA ESTERILIZADOS",
          "indactivo": true
        },
        {
          "codindas":"2021607",
          "nombre":"ADDERMIS BIACTIV Crema",
          "descripcioncorta": "Crema Protectora y Reparadora. Envase 100 g.",
          "Familia":"PRODUCTOS PARA USO MÉDICO-SANITARIO",
          "SubFamilia":"APÓSITOS DE GASA ESTERILIZADOS",
          "indactivo": false
        },
        {
          "codindas":"2021609",
          "nombre": "ADDERMIS BIACTIV Esponjas",
          "descripcioncorta": "Esponjas Jabonosas 20 Uds.",
          "familia":"PRODUCTOS PARA USO MÉDICO-SANITARIO",
          "subfamilia":"APÓSITOS DE TEJIDO SIN TEJER ALGODON ESTERILIZADOS",
          "indactivo": true
        },
        {
          "codindas":"2021675",
          "nombre": "ADDERMIS BIACTIV Manoplas",
          "descripcioncorta": "Manoplas cuidado y lavado corporal 40 Uds.",
          "Familia":"PRODUCTOS PARA USO MÉDICO-SANITARIO",
          "SubFamilia":"APÓSITOS DE TEJIDO SIN TEJER ALGODON ESTERILIZADOS",
          "indactivo": false
        },
      ]
  },
  {
      "id":4,
      "nombre":"acuerdo cuatro",
      "descripcion":"uctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Promoción",
      "fechainicio":"21/02/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1223",
      "estado":"Activo",
      "lineasescalado":[
      {
          "id":5,
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
          "id":6,
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
      "descripcion":"ctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Plan de Compra",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"12331",
      "estado":"Borrador",
      "lineasescalado":[
        {
          "id":7,
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        },
        {
          "id":8,
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
      "descripcion":"Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Plan de Compra",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"1232",
      "estado":"Borrador",
      "lineasescalado":[
      {
          "id":9,
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
          "id":10,
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
      "descripcion":"tus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Campaña",
      "fechainicio":"21/01/2019",
      "fechafin":"21/05/2019",
      "codigocampania":"1222",
      "estado":"Inactivo",
      "lineasescalado":[
        {
         "id":11,
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
        },
        {
          "id":12,
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
      "descripcion":"e turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
      "tipocondicion":"Campaña",
      "fechainicio":"21/09/2019",
      "fechafin":"21/10/2019",
      "codigocampania":"456",
      "estado":"Borrador",
      "lineasescalado":[
      {
          "id":13,
          "unidadesmin":2,
          "unidadesmax":3,
          "descuesto":20,
          "textoequivalencia":" et dolor ut finir inceptos hime"
      },
      {
          "id":14,
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
