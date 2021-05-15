import React, {useEffect, useState} from "react";
import axios from "axios";
import {Select} from 'antd';
import {useHistory} from "react-router-dom";
import utils from "../lib/utils";
import {useDispatch, useSelector} from "react-redux";
import {getCatalogoProductos, getSubmarcas, setCodCliente} from "../modules/acuerdosComer/actions";

const {Option} = Select;

function SearchInputEntidad(props) {
    let timeout;
    let currentValue;

    let token = utils.getAuthToken()
    const [data, setData] = useState([]);
    const [value, setValue] = useState(undefined);
    const dispatch = useDispatch()
    const limpiarBtn = useSelector((state) => state.acuerdosComer.limpiarBtn)

    useEffect(() => {
         resetVaLues()
    }, [limpiarBtn])

    const  search =(value)=> {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const searchData = () => {
            axios.get(
                `http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/entidad?como=${value}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}` }

                })
                .then((response) => {

                    const data = [];
                    response.data.forEach(r => {
                        data.push({
                            value: r.codentidad_cbim,
                            text: '['+r.codentidad_cbim+'] '+r.nomentidad_cbim+' - '+r.poblacion+', '+r.codigo_postal+', '+r.provincia+', '+r.direccion+'.',
                            entity: r,
                            idcliente: r.idcliente
                        });
                    });

                    setData(data)
            });
        };
        timeout = setTimeout(searchData, 200);
    }


    const handleSearch=(value)=>{
        if (value) {
           console.log('Buscador ')
            search(value);
        } else {
            setData([])
        }
    };

    const resetVaLues=()=>{
        setData([])
        setValue(undefined)
    }

    const handleChange=async (value)=> {
        console.log('value: ',value)
        setValue(
            value
        )
        let selectSeach = []
        await data.filter( f => f.entity.codcli_cbim == value && selectSeach.push({ "idcliente": f.idcliente, "codcli_cbim": f.entity.codcli_cbim }))
        dispatch(setCodCliente(selectSeach))

    };

    const options = data.map(d => (<Option key={d.value}>{d.text}</Option>) );


    return (
        <div>
            <Select
                showSearch
                value={props.desactivado? props.valorDefecto : value}
                style={{ width: '100%', marginTop: 10, marginLeft:10 }}
                placeholder="Escribe para buscar..."
                defaultActiveFirstOption={false}
                disabled={props.desactivado}
                showArrow={false}
                filterOption={false}
                onSearch={(value) => {
                    handleSearch(value)
                }}
                onChange={(value) => {
                    handleChange(value)
                }}
                notFoundContent={null}
                onClear={() => setData([])}
            >

                {options}
            </Select>
        </div>
    );

}


export default SearchInputEntidad;
