import Utils from '../../lib/utils';


export const modifyOrderDate = (order) => {
    const newOderList = [];

    let orderFilterd = {}
    order.map(ord => {
      let date = ord.fecha_alta

      orderFilterd = {
        ...ord,
        fecha_alta: Utils.renderDate(date)
      };
      return newOderList.push(orderFilterd);
    })

    return newOderList;

  }

export const filterOrderType = (orderType, detailOrder) => {

    const orderFilteredArray = []
    let detailOrderFiltered = {}

    if (orderType === 'Puntos') {
      detailOrder.forEach(detail => {
        detailOrderFiltered = {
          ...detail,
          descuento: 'No Aplica',
          puntos_coste_unidad: detail.cantidad * detail.puntos_coste_unidad
        };
        return orderFilteredArray.push(detailOrderFiltered);
      })
      return orderFilteredArray;
    }
    if(orderType === 'Pedidos') {
      detailOrder.forEach(detail => {
        detailOrderFiltered = {
          ...detail,
          puntos_acumulados_unidad: detail.cantidad * detail.puntos_acumulados_unidad,
          descuento: detail.descuento + '%'
        };
        return orderFilteredArray.push(detailOrderFiltered);
      })
      return orderFilteredArray;
    }
  }

  export const searchedValue = (key, value) => {

    this.setState({ [key]: value })
  }