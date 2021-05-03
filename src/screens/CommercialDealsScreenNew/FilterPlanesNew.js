import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Select, DatePicker, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { DatePickerFromTo, InputBox, InputsContainer } from '../../lib/styled'
import OrderFilterEntity from "../OrderListScreen/components/OrderFilterEntity"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import moment from "moment"
import { get } from 'lodash'
import SearchInputEntidad from "../../components/SearchInputEntidad";
import {disableFilterTable, getFilterData} from "../../modules/acuerdosComer/actions";

const { RangePicker } = DatePicker
const { Option } = Select
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YYYY']
const dateFormat = 'DD/MM/YYYY'



const PlanesCompraFiltersNew = (props) => {
    const { onFilterArray, resetFilter } = props
    const [expandFilters, setExpandFilters] = useState(false)
    const dispatch = useDispatch()
    const delegadosList = useSelector((state) => state.acuerdosComer.listaDelegados)
    const idsBuscador = useSelector((state) => state.acuerdosComer.cod_Cliente)
    const codcli_cbimRedux = useSelector((state) => state.acuerdosComer.cod_Cliente.codcli_cbim)
    const idclienteRedux = useSelector((state) => state.acuerdosComer.cod_Cliente.idcliente)
    const [datesFromTo, setDatesFromTo] = useState([]);
    const initialState = {
        idcliente: idclienteRedux,
        codcli_cbim: codcli_cbimRedux,
        fechasValue: [],
        searchByEntity: get(props, 'filters.searchByEntity', ''),
        page: 0,
        coddelegado: '',
        idestado: '',
        fechas: [],
        expandedKeys: [],
        isFilterChanged: false,
        contareaspendientes: false
    }
    const [state, setState] = useState(initialState)
    const [parametros, setParametros] = useState({
        formato: "json",
        offset: 0,
        limit: 50
    })

    useEffect(() => {
        const checkNan =()=> isNaN( parseInt( idsBuscador[0].idcliente)) ?   null : setParametros({ ...parametros, "idcliente":  parseInt( idsBuscador[0].idcliente)})
        checkNan()
    }, [idsBuscador])


    const onChange = (value, dateString) => {
        setDatesFromTo(value)
       let dateFomart1=  moment(value[0]).format('YYYY-MM-DD');
       let dateFomart2=  moment(value[1]).format('YYYY-MM-DD');
       setParametros({ ...parametros, fecha_desde: dateFomart1, fecha_hasta: dateFomart2 })
    }

    const onReset = () => {
        resetFilter()
        setParametros({
            formato: "json",
            offset: 0,
            limit: 50
        })
        setState(initialState)
        setDatesFromTo([])
        dispatch(disableFilterTable())
    }

    const querySeach = ()=>{

       dispatch(getFilterData(parametros))
       console.log("querySeach", parametros)
    }

  console.log("----- valor id a buscar buscado", idsBuscador)
    return (
        <div className="table-filters-indas">

            <InputsContainer style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
                <Row key={'filters_b'} style={{ width: '100%', marginBottom: 0 }}>
                    <Col span={18} style={{ padding: '10px' }} key={'col_1'}>
                        <span style={{ padding: '10px' }}>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                        <div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
                            <SearchInputEntidad
                                //filterChange={}
                            />
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '10px' }} key={'col_2'}>
                        <span style={{ padding: '10px' }}>Código Cliente</span>
                        <InputBox
                            placeholder="Código Cliente"
                            value={parametros.codcli_cbim || idsBuscador[0].codcli_cbim }
                            disabled
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </InputsContainer>
            <InputsContainer hidden={!expandFilters} style={{ width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0 }} key={'filters_b_2'}>
                <Row style={{ width: '100%' }}>
                    <Col span={8} style={{ padding: '10px', paddingTop: 0 }}>
                        <span style={{ padding: '10px' }}>AC vigentes en este intervalo</span>

                        <DatePickerFromTo
                            style={{ width: '100%' }}
                            format={dateFormat}
                            onChange={onChange}
                            placeholder={['desde', 'hasta']}
                            value={datesFromTo}
                        />
                    </Col>

                    <Col span={11} style={{ padding: '10px', paddingTop: 0 }}>
                        <span style={{ padding: '10px' }}>Delegado Comercial</span>
                        <Select
                            value={parametros.coddelegado || ''}
                            name='coddelegado'
                            onChange={(value) => setParametros({ ...parametros, coddelegado: parseInt( value ) })}
                            style={{ width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft: 10 }}
                            showSearch
                            allowClear
                        >
                            <Option value='' style={{ color: '#CCC' }}>- Seleccione -</Option>
                            {delegadosList.map((option, index) => (
                                <Select.Option key={index} value={option.coddelegado}>{option.nombre}</Select.Option>
                            ))}

                        </Select>
                    </Col>

                    <Col span={5} style={{ padding: '10px', paddingTop: 0 }}>
                        <span style={{ padding: '10px' }}>Estado</span>
                        <Select
                            value={parametros.idestado}
                            onChange={(value) => setParametros({ ...parametros, idestado: parseInt( value ) })}
                            style={{ width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft: 10 }}
                        >
                            <Option value="" style={{ color: '#CCC' }}>- Seleccione -</Option>
                            <Option value={1}>Activo</Option>
                            <Option value={2}>Inactivo</Option>
                        </Select>
                    </Col>

                </Row>
            </InputsContainer>
            <InputsContainer style={{ width: '100%', marginTop: 0, paddingTop: 0 }}>
                <Row style={{ width: '100%' }}>
                    <Col span={24} align="right">
                        <div style={{ alignSelf: 'flex-end' }}>
                            <a
                                style={{ fontSize: 12 }}
                                onClick={() =>
                                    setExpandFilters(!expandFilters)
                                }
                            >
                                {expandFilters ? <React.Fragment><UpOutlined /> Mostar menos</React.Fragment> : <React.Fragment><DownOutlined /> Mostar más</React.Fragment>}
                            </a>

                            <Button
                                icon='search'
                                type="primary"
                                style={{ alignSelf: 'flex-end', margin: '0px 10px 0px 10px' }}
                                onClick={()=> querySeach()}
                            >Filtrar</Button>
                            <Button
                                icon='delete'
                                style={{ alignSelf: 'flex-end', margin: '0px 0px 0px 0px' }}
                                onClick={() => onReset()}
                            >
                                Limpiar
                                </Button>
                        </div>
                    </Col>
                </Row>
            </InputsContainer>
        </div>
    )


}


export default PlanesCompraFiltersNew
