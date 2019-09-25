import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Table, Switch} from 'antd';
//properties
var columnsProducts=[
    {
        title: 'Familia',
        dataIndex: 'nombrefamilia',
        key: 'nombrefamilia',
        sorter: (a,b) => a.nombrefamilia - b.nombrefamilia,
        filterMultiple: true,
        onFilter: (value, record) => {
            return record.idfamilia === value
        }
    },
    {
        title: 'Sub Familia',
        dataIndex: 'nombresubfamilia',
        key: 'nombresubfamilia',
        sorter: (a,b) => a.nombresubfamilia - b.nombresubfamilia,
        filterMultiple: true,
        onFilter: (value, record) => {return record.idsubfamilia === value}
    },
    {
        title: 'Marca',
        dataIndex: 'nombremarca',
        key: 'nombremarca',
        sorter: (a,b) => a.nombremarca - b.nombremarca,
        filterMultiple: true,
        onFilter: (value, record) => {return record.idmarca === value}
    },
    {
        title: 'Sub Marca',
        dataIndex: 'nombresubmarca',
        key: 'nombresubmarca',
        sorter: (a,b) => a.nombresubmarca - b.nombresubmarca,
        filterMultiple: true,
        onFilter: (value, record) => {return record.idsubmarca === value}
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: (a,b) => a.nombre - b.nombre
    },
    /*{
        title: 'Descripción',
        dataIndex: 'descripcioncorta',
        key: 'descripcioncorta'
    },*/
    {
        title: 'Asociado',
        dataIndex: 'indactivo',
        key: 'indactivo',
        render: (colVal, record) => {}
    }
];

//methods
const getFilters = (families, subFamilies, products, brands, subBrands, currentCommercialDeal)=>{
    columnsProducts.map((el)=>{
        if(el.title === "Familia"){
            el.filters = families.map((family)=>{
                return {
                    text:family.nombre,
                    value:family.idfamilia
                }
            });
        } else if(el.dataIndex === "nombresubfamilia"){
            el.filters = subFamilies.map((subFamily)=>{
                return {
                    text:subFamily.nombre,
                    value:subFamily.idsubfamilia
                }
            });
        } else if(el.dataIndex === "nombre"){
            el.filters = products.map((product)=>{
                return {
                    text:product.nombre,
                    value:product.nombre
                }
            });
        } else if(el.dataIndex === "nombremarca"){
            el.filters = brands.map((brand)=>{
                return {
                    text:brand.nombre,
                    value:brand.idmarca
                }
            });
        } else if (el.dataIndex === "nombresubmarca"){
            el.filters = subBrands.map((subBrand)=>{
                return {
                    text:subBrand.nombre,
                    value:subBrand.idsubmarca
                }
            });
        } else if(el.dataIndex === 'indactivo'){
            el.render = ({},record) =>{ return getRender(currentCommercialDeal, record)};
        }
        return el;
    });
    return true;
};
const getRender = (currentCommercialDeal, record) => {
    if(currentCommercialDeal.productos !== null && currentCommercialDeal.productos !== undefined){
        const exist = currentCommercialDeal.productos.filter((product) => {
            return product.codindas === record.codindas
        }).length > 0;

        if(exist){
            return <Switch defaultChecked/>
        }  
    }
    return <Switch/>
    
}
const filterProductByColumn = (filters, product, columnName, property) => {
    const filterValues = filters[columnName];
    if(validateFilter(filterValues)){
        if(filterValues.indexOf(product[property]) !== -1){
            return {
                text:product.nombre,
                value:product.codindas
            }
        }
    }
    return null;
}
const applyFiltersToProduct = (pColumn, filters, products)=>{
    const auxFilters = products.map((product)=> {
        var validProduct = filterProductByColumn(filters,product,'nombrefamilia','idfamilia');
        validProduct = filterProductByColumn(filters,product,'nombresubfamilia','idsubfamilia');
        validProduct = filterProductByColumn(filters,product,'nombremarca','idmarca');
        validProduct = filterProductByColumn(filters,product,'nombresubmarca','idsubmarca');
        return validProduct;
    });
    pColumn.filters = auxFilters.filter((item)=> item !== null && item !== undefined);
}
const validateFilter = (filterValues) => {
    if(filterValues !== undefined && filterValues !== null){
        return filterValues.length > 0;
    }
    return false;
}
const changeData = (filters,families, subFamilies, products, brands, subBrands, currentCommercialDeal, updateProductsFilter)=>{
    var applyFilters = false;
    if(Object.keys(filters).length > 0){
        columnsProducts.map((column)=> {
            if(column.dataIndex === 'nombre'){
                const validColumn =  applyFiltersToProduct(column,filters,products);
                applyFilters = validColumn !== null;
            } else if(column.dataIndex === 'Asociado'){
                column.render = (colVal, record) =>{ return getRender(currentCommercialDeal, record)};
            }
            return null;
        });
    }
    if(!applyFilters){
        getFilters(families, subFamilies, products, brands, subBrands, currentCommercialDeal); 
        updateProductsFilter(true);
    }
    return true;
};

const getFilterFamilies = (families, subFamilies, products, updateProductsFilter)=>{
    columnsProducts.map((el)=>{
        if(el.dataIndex === "nombresubfamilia"){
            const auxFilters = subFamilies.map((subFamily)=> {
                if(families.indexOf(subFamily.idfamilia) !== -1){
                    return {
                        text:subFamily.nombre,
                        value:subFamily.idsubfamilia
                    }
                }
                return null;
            });
            el.filters = auxFilters.filter((item)=> item !== null && item !== undefined); 
        } else if(el.dataIndex === "nombre"){
            const auxFilters = products.map((product)=> {
                if(families.indexOf(product.idfamilia) !== -1){
                    return {
                        text:product.nombre,
                        value:product.nombre
                    }
                }
                return null;
            });
            el.filters = auxFilters.filter((item)=> item !== null && item !== undefined);
        }
        return el;
    });
    updateProductsFilter(true);
    return true;
};

//components
const CommercialDealProducts = ({
    currentCommercialDeal,
    families,
    subFamilies,
    products,
    brands,
    subBrands,
    updateProductsFilter,
    updateFilter
})=> {
    useEffect(()=>{
        if(!updateFilter){
            console.log(updateFilter);
            changeData({},families, subFamilies, products, brands, subBrands, currentCommercialDeal, updateProductsFilter);
        }
        updateProductsFilter(false);
    },[currentCommercialDeal,families, products,updateFilter,brands,subBrands,updateProductsFilter]);
    return (
        <div>
            <Table 
                className="commercial-deals-products"
                dataSource={products}
                onChange={(pagination, filters) => 
                    changeData(filters, families, subFamilies, products, brands, subBrands,currentCommercialDeal, updateProductsFilter)}
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
