import { get, post } from '../../lib/restClient';

export const getCommercialDeals = () => 
  new Promise((resolve,reject) =>{
    const mockCommercialDeals ={
      "data": [
      {
        "id":1,
        "nombre":"acuerdo uno",
        "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
        "tipocondicion":"Acuerdo Comercial",
        "fechainicio":"",
        "fechafin":"",
        "codigocampania":"",
        "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Acuerdo Comercial",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Promoción",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Promoción",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Plan de Compra",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Plan de Compra",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Campaña",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
          "descripción":"rus consequat, pretium lectus sed, molestie turpis. Morbi luctus mauris nunc. In eleifend tortor nisl, ut commodo lectus efficitur scel",
          "tipocondicion":"Campaña",
          "fechainicio":"",
          "fechafin":"",
          "codigocampania":"",
          "estado":"",
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
    resolve(mockCommercialDeals);  
  });
