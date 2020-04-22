import { connect } from 'react-redux';
import View from './view';

import { 
  updateProductsFilter,
  editCommercialDeal,
  setProductsCommercialDeal,
  setAsociatedProducts,
  
} from '../../../../modules/commercialDeals/actions'

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      families: state.commercialDeals.families,
      subFamilies: state.commercialDeals.subFamilies,
      products: state.commercialDeals.products,
      brands:state.commercialDeals.brands,
      subBrands:state.commercialDeals.subBrands,
      updateFilter:state.commercialDeals.updateFilter,
      idCommercialDeal: state.commercialDeals.idCommercialDeal,
      productos: state.commercialDeals.currentCommercialDeal.productos,
      escalados: state.commercialDeals.currentCommercialDeal.escalados,
      clientes: state.commercialDeals.currentCommercialDeal.clientes,
      isAsociatedProduct: state.commercialDeals.isAsociatedProduct

    }),
    { 
      updateProductsFilter, 
      editCommercialDeal, 
      setProductsCommercialDeal, 
      setAsociatedProducts
    }
  )(View);