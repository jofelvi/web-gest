import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Select, DatePicker, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { DatePickerFromTo, InputBox, InputsContainer } from '../../lib/styled'
import OrderFilterEntity from "../OrderListScreen/components/OrderFilterEntity"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import moment from "moment"
import { get } from 'lodash'

const { RangePicker } = DatePicker
const { Option } = Select
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YYYY']
const dateFormat = 'DD/MM/YYYY'



const PlanesCompraFiltersNew = (props) => {
    const { onFilterArray, resetFilter } = props
    const [expandFilters, setExpandFilters] = useState(false)
    // const [searchByEntity, setSearchByEntity] = useState("")
    // const [idcliente, setIdcliente] = useState("")
    // const [fechasValue, setFechasValue] = useState([])
    // const [idestado, setIdestado] = useState("")
    const listAcuerdos = useSelector((state) => state.acuerdosComer.listAcuerdosCom)
    const delegadosList = useSelector((state) => state.acuerdosComer.listaDelegados)
    const initialState = {
        idcliente: '',
        codcli_cbim: '',
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
    const [querySearch, setQuerySearch] = useState({
        nombre: '',
        idestado: '',
        coddelegado: '',
        idcliente: '',
        fecha_desde: '',
        fecha_hasta: '',
        formato: '',
        offset: 0,
        limit: 50
    })


    useEffect(() => {

    }, [])

    const customFormat = value => `custom format: ${value.format(dateFormat)}`

    const onChange = (value, dateString) => {

        setQuerySearch({ ...querySearch, fecha_desde: dateString[0], fecha_hasta: dateString[1] })

        let newArray = listAcuerdos.filter(f => checkIsBetweenDates(dateString[0].toString(), dateString[1].toString(), f.fechainicio) && f.codcli_cbim == '194722' && f.estado == "Activo")

        console.log('Selected Time: ', value)
        console.log('Formatted Selected Time: ', dateString)
        console.log('srray filted: ', newArray)

    }

    const checkIsBetweenDates = (dateFrom, dateTo, dateCheck) => {
        let dateCheckFormate = moment(dateCheck).format('DD/MM/YYYY')
        let fDate, lDate, cDate
        fDate = Date.parse(dateFrom)
        lDate = Date.parse(dateTo)
        cDate = Date.parse(dateCheckFormate)
        console.log('dateFrom Time: ', dateFrom)
        console.log('dateTo: ', dateTo)
        console.log('dateCheck: ', dateCheckFormate)
        if ((cDate <= lDate && cDate >= fDate)) {
            console.log(" esta en el rango ")
            return true
        }
        return false
    }

    const searchedValue = (key, value) => {
        if (typeof (value) == 'undefined') {
            setState({ ...state, [key]: '', isFilterChanged: true })
        } else {
            setQuerySearch({ ...querySearch, idcliente: parseInt(value) })
            setState({ ...state, [key]: value, isFilterChanged: true })
        }

    }

    const onReset = () => {
        resetFilter()
        setQuerySearch({
            codcli_cbim: '',
            coddelegado: '',
            idestado: ''
        })
        setState(initialState)
    }

    return (
        <div className="table-filters-indas">

            <InputsContainer style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
                <Row key={'filters_b'} style={{ width: '100%', marginBottom: 0 }}>
                    <Col span={18} style={{ padding: '10px' }} key={'col_1'}>
                        <span style={{ padding: '10px' }}>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                        <div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
                            <OrderFilterEntity
                                column={"object"}
                                key={'filters_entity_search'}
                                value={state.searchByEntity}
                                defaultClient={state.idcliente}
                                onChange={(entity) => searchedValue('searchByEntity', entity)}
                                onChangeClient={(client) => {
                                    const idCliente = client ? client.idcliente : ''
                                    const codcliCbim = client ? client.codcli_cbim : ''
                                    searchedValue('idcliente', idCliente)
                                    searchedValue('codcli_cbim', codcliCbim)
                                }}
                            />
                        </div>
                    </Col>
                    <Col span={6} style={{ padding: '10px' }} key={'col_2'}>
                        <span style={{ padding: '10px' }}>Código Cliente</span>
                        <InputBox
                            placeholder="Código Cliente"
                            value={querySearch.idcliente}
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
                        //value={fechasValue}
                        />

                        {/* <RangePicker
                                defaultValue={[moment(), moment()]}
                                format={dateFormat}
                                //placeholder={['desde', 'hasta']}
                                //placeholder={"aqui"}
                                onChange={ onChange}
                            />*/}
                    </Col>

                    <Col span={11} style={{ padding: '10px', paddingTop: 0 }}>
                        <span style={{ padding: '10px' }}>Delegado Comercial</span>
                        <Select
                            value={querySearch.coddelegado || ''}
                            name='coddelegado'
                            onChange={(value) => setQuerySearch({ ...querySearch, coddelegado: value })}
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
                            value={querySearch.idestado}
                            onChange={(value) => setQuerySearch({ ...querySearch, idestado: value })}
                            style={{ width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft: 10 }}
                        >
                            <Option value="" style={{ color: '#CCC' }}>- Seleccione -</Option>
                            <Option value={0}>Borrador</Option>
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
                                onClick={() => onFilterArray(querySearch)}
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
