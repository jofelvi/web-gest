import React, {useState} from "react";
import axios from "axios";
import {Select} from 'antd';
import {useHistory} from "react-router-dom";
import utils from "../lib/utils";

const {Option} = Select;

function SearchInputEntidad(props) {
    let timeout;
    let currentValue;
    let history = useHistory();
    let token = utils.getAuthToken()
    const [data, setData] = useState([]);
    const [value, setValue] = useState(undefined);


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
                            entity: r
                        });
                    });

                    setData(data)
            });
        };
        timeout = setTimeout(searchData, 200);
    }


    const handleSearch=(value)=>{
        if (value) {
           // console.log('Buscador ')
            search(value);
        } else {
            setData([])
        }
    };

    const handleChange=(value)=> {
        console.log('value: ',value)
        setValue(
            value
        )
    };

    const options = data.map(d => (<Option key={d.value}>{d.text}</Option>) );


    return (
        <div>
            <Select
                showSearch
                value={value}
                style={{ width: '100%', marginTop: 10, marginLeft:10 }}
                placeholder="Escribe para buscar..."
                defaultActiveFirstOption={false}
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
