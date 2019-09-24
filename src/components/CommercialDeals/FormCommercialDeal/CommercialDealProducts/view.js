import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Table, Switch} from 'antd';

//properties
var columnsProducts=[
    {
        title: 'Familia',
        dataIndex: 'nombrefamilia',
        key: 'nombrefamilia',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin,
        filterMultiple: true,
        onFilter: (value, record) => {
            return record.idfamilia == value
        }
    },
    {
        title: 'Sub Familia',
        dataIndex: 'nombresubfamilia',
        key: 'nombresubfamilia',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin,
        filterMultiple: true,
        onFilter: (value, record) => {return record.nombresubfamilia == value}
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcioncorta',
        key: 'descripcioncorta',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Asociado',
        dataIndex: 'indactivo',
        key: 'indactivo',
        filters: [
            {
                text:'SI',
                value:true
            },
            {
                text:"NO",
                value:false
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.indactivo == value,
        render: (indactivo) => <Switch checked={indactivo}></Switch>
    }
];

//methods
const getFilters = (families, subFamilies, products)=>{
    columnsProducts.map((el)=>{
        if(el.title == "Familia"){
            el.filters = families.map((family)=>{
                return {
                    text:family.nombre,
                    value:family.idfamilia
                }
            });
        } else if(el.dataIndex == "nombresubfamilia"){
            el.filters = subFamilies.map((subFamily)=>{
                return {
                    text:subFamily.nombre,
                    value:subFamily.nombre
                }
            });
        }
        else if(el.dataIndex == "nombre"){
            el.filters = products.map((product)=>{
                return {
                    text:product.nombre,
                    value:product.nombre
                }
            });
        }
        return el;
    });
};
const changeData = (filters,families, subFamilies, products, updateFilters)=>{
    console.log(filters);
    if(filters["nombrefamilia"] != null && filters["nombrefamilia"].length > 0){
        getFilterFamilies(filters["nombrefamilia"], subFamilies, products, updateFilters);
    } else if(filters["nombresubfamilia"] != null && filters["nombresubfamilia"].length > 0){
        //getFilterSubFamilies(filters["nombresubfamilia"], subFamilies, products, updateFilters);
    }
    else {
        getFilters(families, subFamilies, products); 
    }
};
const getFilterFamilies = (families, subFamilies, products, updateProductsFilter)=>{
    columnsProducts.map((el)=>{
        if(el.dataIndex == "nombresubfamilia"){
            const auxFilters = subFamilies.map((subFamily)=> {
                if(families.indexOf(subFamily.idfamilia) != -1){
                    return {
                        text:subFamily.nombre,
                        value:subFamily.nombre
                    }
                }
            });
            el.filters = auxFilters.filter((item)=> item != null && item != undefined); 
        } else if(el.dataIndex == "nombre"){
            const auxFilters = products.map((product)=> {
                if(families.indexOf(product.idfamilia) != -1){
                    return {
                        text:product.nombre,
                        value:product.nombre
                    }
                }
            });
            el.filters = auxFilters.filter((item)=> item != null && item != undefined);
        }
        return el;
    });
    updateProductsFilter(true);
};

//components
const CommercialDealProducts = ({
    currentCommercialDeal,
    families,
    subFamilies,
    products,
    updateProductsFilter,
    updateFilter
})=> {
    useEffect(()=>{
        updateProductsFilter(false);
    },[currentCommercialDeal,families, products,updateFilter]);
    return (
        <div>
            <Table 
                className="commercial-deals-products"
                dataSource={products}
                onChange={(pagination, filters) => changeData(filters, families, subFamilies, products, updateProductsFilter)}
                columns={columnsProducts}
                size='small'
                pagination={true}
                rowKey='codindas'
                locale={{filterConfirm:'ok', filterReset:'limpiar',filterTitle:'filtro'}}
            ></Table>
        </div>);
};

//defs
CommercialDealProducts.propTypes = {
    currentCommercialDeal: PropTypes.object,
    families:PropTypes.arrayOf(PropTypes.shape({})),
    subFamilies:PropTypes.arrayOf(PropTypes.shape({})),
    products:PropTypes.arrayOf(PropTypes.shape({})),
    updateProductsFilter: PropTypes.func
}

export default CommercialDealProducts;
