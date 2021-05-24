import React, {useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    Button,
    Checkbox,
    Col,
    DatePicker,
    Input,
    InputNumber,
    List,
    Modal,
    Row,
    Select,
    Switch,
    Tabs
} from "antd";
import SearchInputEntidad from "../../../components/SearchInputEntidad";
import {InputBox} from "../../OrderListScreen/styled";
import {isRequired, validateDate, validateEmail} from "../componets/ValidateFields";
import {AntDatePicker, AntInput, AntSelect} from "../componets/CreateAntdFields";
import {
    DeleteRowOutlined,
    DoubleLeftOutlined, DoubleRightOutlined, DownOutlined,
    ExclamationCircleOutlined,
    FolderAddOutlined,
    LeftOutlined, RightOutlined, UpOutlined
} from "@ant-design/icons";
import DualListFilter from "../DualListFilter";
import ExtendedDualListBox from "../ExtendedDualListBox";
import {
    createAcuerdosComerciales,
    eliminarItemsMarcados, getCatalogoProductos, getFamilia, getMarcas, getSubmarcas, handleBody,
    listItemMarcados, productosFiltrados
} from "../../../modules/acuerdosComer/actions";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {loadProducts} from "../../../modules/commercialDeals/actions";
import moment from "moment";


export const dateFormat = "DD-MM-YYYY";

const { confirm } = Modal;
const { Option } = Select;
const { TabPane } = Tabs;

const dualListIcons = {
    moveLeft: <LeftOutlined />,
    moveAllLeft: <DoubleLeftOutlined />,
    moveRight: <RightOutlined />,
    moveAllRight: <DoubleRightOutlined />,
    moveDown: <DownOutlined />,
    moveUp: <UpOutlined />,
};

const FormCreateAc = ({ values, submitCount, props, handleSubmit }) => {

    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const subMarcasArrayRedux = useSelector((state) => state.acuerdosComer.subMarcaArray);
    const marcasArrayRedux = useSelector((state) => state.acuerdosComer.marcasArray);
    const familiaArrayRedux = useSelector((state) => state.acuerdosComer.familiaArray);
    const marcadosRedux = useSelector((state) => state.acuerdosComer.marcadosArray);
    const productsfilted = useSelector((state) => state.acuerdosComer.productsfilted);
    const productosArrayRedux = useSelector((state) => state.acuerdosComer.productoArray);
    const idsBuscador = useSelector((state) => state.acuerdosComer.cod_Cliente);
    const [filterProducts, setFilterProducts] = useState({
        seleccion_individual_filtro_submarca: "",
        seleccion_individual_filtro_categoria: "",
        seleccion_individual_filtro_marca: "",
    });
    const [codcli_cbim, setCodcli_cbim] = useState();
    const [body, setBody] = useState({
        productos: [],
        clientes: [],
        escalados: [],
        submarcas: [],
        margen: parseFloat(1.0),
        idestado: 1,
        idtipo: 1,
        ind_renovar: false,
        ind_seleccion_conjunta: true,
        ind_surtido: false,
        fechainicio: new Date().toISOString(),
        fechafin: new Date().toISOString(),
    });
    const [inputList, setInputList] = useState([
        {
            descuento: 10.1,
            udsmaximas: 50,
            udsminimas: 1,
            txtdescuento: "",
        },
    ]);


    useEffect(() => {
        dispatch(getCatalogoProductos());
        dispatch(getSubmarcas());
        dispatch(getMarcas());
        dispatch(getFamilia());
        catalogoProducts();
        loadProducts();
    }, [marcadosRedux, id]);

    useEffect(() => {
        handleSeletClient(idsBuscador);
        console.log("idsBuscador ", idsBuscador);
    }, [idsBuscador]);


    const handleSeletClient = (idsBuscadorObj) => {
        console.log("onblur select");
        setBody({ ...body, clientes: [{ idcliente: parseInt(idsBuscadorObj[0].idcliente) }] });
    };

    const catalogoProducts = async () => {
        const res = await productosArrayRedux.filter((f) => marcadosRedux.find((item) => item.id === f.idsubmarca));
        let productosBody = [];
        await productosArrayRedux.filter((f) =>
            marcadosRedux.find((item) => item.id === f.idsubmarca && productosBody.push({ idproducto: f.idproducto }))
        );
        dispatch(productosFiltrados(res));

        setBody({
            ...body,
            productos: productosBody,
        });
    };

    const changeBody = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputChange = (value, index, key) => {
        console.log("evento", value);

        if (key === "udsminimas" || key === "udsmaximas") {
            const list = [...inputList];
            list[index][key] = typeof value === "string" || typeof value === "object" ? 0 : parseInt(value);
            setInputList(list);
        } else {
            const list = [...inputList];
            list[index][key] = typeof value === "string" || typeof value === "object" ? 0 : parseFloat(value).toFixed(2);
            setInputList(list);
        }
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([
            ...inputList,
            {
                descuento: 1.0,
                udsmaximas: 1,
                udsminimas: 1,
                txtdescuento: "",
            },
        ]);
    };

    const handleEscaladosBody = () => {
        setBody({ ...body, escalados: inputList });
    };

    const ValidateErrorEscalados = () => {
      const mensaje =  body.escalados.map((item,index)=>{
            if (item.udsminimas >= item.udsmaximas){
                return "Existe un error Pedidos Minimo no puede ser mayor que unidades Maximas"
            }else{
                return "sin error"
            }
        })


       let respuesta=  mensaje[0] !== "sin error" ? (
           <div style={{ display: "inline" }}>
               <Alert message={mensaje} type="error" />
           </div>
       ) : null
        console.log("respuesta",respuesta )
        console.log("mensaje",mensaje )
        return respuesta
    };

    const onSubmitEve = async (formProps) => {
             await setBody({...body,formProps })
             await   dispatch(createAcuerdosComerciales(body));

    };

    const confirmChangePanel = (tipo, value) => {
        if (body.productos.length === 0 && body.submarcas.length === 0) {
            setBody({ ...body, ind_seleccion_conjunta: value === "1" ? true : false });
        } else {
            const messageContent = `¿Desea cambiar a ${tipo}? Se perderán los productos agregados`;
            confirm({
                title: `Confirmar acción`,
                icon: <ExclamationCircleOutlined />,
                content: messageContent,
                onOk: () => {
                    setBody({ ...body, ind_seleccion_conjunta: value === "1" ? true : false, productos: [], submarcas: [] });
                },
                onCancel() {
                    setBody({ ...body, ind_seleccion_conjunta: body.ind_seleccion_conjunta });
                },
            });
        }
    };

    const onSelectChange = async (e, item) => {
        await handleValues(e, item);
    };

    const handleValues = async (e, item) => {
        console.log(item);

        let objArraySub = {};

        let objArra = {
            id: e.target.value,
            active: e.target.checked,
        };

        if (e.target.checked) {
            console.log("entro if", e.target.value);

            objArraySub = {
                idsubmarca: item.idsubmarca,
            };

            setBody({ ...body, submarcas: [...body.submarcas, objArraySub] });

            if (!marcadosRedux.indexOf(e.target.value) >= 0) {
                await dispatch(listItemMarcados(objArra));
            }
        } else {
            let deleteItemArraySub = body.submarcas.filter((prev) => prev.idsubmarca !== item.idsubmarca);
            setBody({ ...body, submarcas: deleteItemArraySub });
            let elementosFilted = marcadosRedux.filter(function (item) {
                return item.id !== e.target.value;
            });
            await dispatch(eliminarItemsMarcados(elementosFilted));
        }
    };

    const filterSeleccionIndividual = (item) => {
        const filtro_categoria = filterProducts.seleccion_individual_filtro_categoria;
        const filtro_marca = filterProducts.seleccion_individual_filtro_marca;
        const filtro_submarca = filterProducts.seleccion_individual_filtro_submarca;

        return (
            (filtro_categoria === "" || parseInt(item.idgrupo) == parseInt(filtro_categoria)) &&
            (filtro_marca === "" || parseInt(item.idmarca) == parseInt(filtro_marca)) &&
            (filtro_submarca === "" || parseInt(item.idsubmarca) == parseInt(filtro_submarca))
        );
    };

    const handleBodyRedux = ()=>{
        dispatch(handleBody(body))
    }
    return(
        <Form className="form-container" onSubmit={(formProps)=>handleSubmit(formProps)}>

            <h3 style={{ margin: "20px 0 10px 0" }}>Datos generales</h3>

            <div className="table-filters-indas" style={{ padding: 20 }}>
                <Row style={{ width: "100%" }}>
                    <Col span={17} style={{ padding: "0px" }}>
            <span>
              Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small>
            </span>
                        <div style={{ padding: "0px", paddingTop: "0", paddingRight: "20px" }}>
                            <SearchInputEntidad />
                        </div>
                    </Col>

                    <Col span={6}>
                        <span>Código Cliente</span>

                        <InputBox
                            placeholder="Código Cliente"
                            value={codcli_cbim || idsBuscador[0].codcli_cbim}
                            disabled
                            style={ inputStyle}
                        />
                    </Col>
                </Row>
                <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
                    <Col span={6}>
                        <label>Nombre del Acuerdo Comercial</label>

                        <Field
                            name="nombre"
                            type="text"
                            //label="Nombre"
                            validate={isRequired}
                            submitCount={submitCount}
                            hasFeedback
                            component={AntInput}
                        />

                    </Col>
                    <Col span={18}>
                        <label>Descripción del Acuerdo Comercial</label>
                        <Field
                            component={AntInput}
                            name="descripcion"
                            type="text"
                            //label="descripcion"
                            validate={isRequired}
                            submitCount={submitCount}
                            hasFeedback
                        />
                    </Col>
                </Row>
                <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
                    <Col span={8}>
                        <label>Fecha de inicio</label>
                        <Field
                            component={AntDatePicker}
                            name="fechainicio"
                            //label="Booking Date"
                            defaultValue={values.fechainicio}
                            format={dateFormat}
                            validate={validateDate}
                            submitCount={submitCount}
                            hasFeedback
                        />
                    </Col>
                    <Col span={8}>
                        <label>Fecha de fin</label>
                        <Field
                            component={AntDatePicker}
                            name="fechafin"
                            //label="Fecha Inicio"
                            defaultValue={values.fechafin}
                            format={dateFormat}
                            validate={validateDate}
                            submitCount={submitCount}
                            hasFeedback
                        />
                    </Col>
                </Row>
                <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
                    <Col span={6}>
                        <label>Estado</label>
                        <Field
                            component={AntSelect}
                            name="estado"
                            //label="Estado"
                            defaultValue={values.bookingClient}
                            selectOptions={values.selectOptions}
                            validate={isRequired}
                            submitCount={submitCount}
                            tokenSeparators={[","]}
                            style={{ width: 200 }}
                            hasFeedback
                            //onChange={(e,i)=> console.log(e,i)}
                        />
                    </Col>
                    <Col span={6}>
                        <Switch
                            checkedChildren="Si"
                            unCheckedChildren="No"
                            value={body.ind_surtido}
                            defaultChecked={typeof body === "undefined" ? "" : body.ind_surtido}
                            onChange={(value) => {
                                setBody({ ...body, ind_surtido: value });
                            }}
                        />
                        <label style={{ display: "inline-block", marginTop: "35px", marginLeft: "10px" }}>Surtido</label>
                    </Col>
                    <Col span={6} style={{ display: "none" }}>
                       <Switch
                            checkedChildren="Si"
                            unCheckedChildren="No"
                            value={typeof body === "undefined" ? "" : body.ind_renovar}
                            defaultChecked={body.ind_renovar}
                            onChange={(value) => {
                                setBody({ ...body, ind_renovar: value });
                            }}
                        />
                        <label style={{ display: "inline-block", marginTop: "35px", marginLeft: "10px" }}>Renovar</label>
                    </Col>
                    <Col span={6} style={{ display: "none" }}>
                      <Switch
                            checkedChildren="Si"
                            unCheckedChildren="No"
                            value={typeof body === "undefined" ? "" : body.ind_seleccion_conjunta}
                            defaultChecked={body.ind_seleccion_conjunta}
                            onChange={(value) => {
                                setBody({ ...body, ind_seleccion_conjunta: value });
                            }}
                        />
                        <label style={{ display: "inline-block", marginTop: "35px", marginLeft: "10px" }}>Seleccion conjunta</label>
                    </Col>
                </Row>
            </div>
            <h3 style={{ margin: "20px 0 10px 0" }}>Lineas de descuento</h3>
            <div className="table-filters-indas" style={{ padding: "5px 20px 20px 20px" }}>
                {inputList.map((x, i) => {
                    return (
                        <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0, marginTop: 10 }}>
                            <Col span={6}>
                                <label>{i <= 0 ? "Pedido mínimo" : ""}</label>
                                <InputNumber
                                    name="udsminimas"
                                    placeholder="Ingresar la cantidad minima para la linea de descuento"
                                    min={1}
                                    defaultValue={1}
                                    onChange={(e) => handleInputChange(e, i, "udsminimas")}
                                    style={ inputStyle}
                                    onBlur={() => handleEscaladosBody()}
                                    value={x.udsminimas}
                                />
                            </Col>
                            <Col span={6}>
                                <label>{i <= 0 ? "Unidades Maximas" : ""} </label>
                                <InputNumber
                                    name="udsmaximas"
                                    placeholder="Ingresar la cantidad minima para la linea de descuento"
                                    min={0}
                                    max={50}
                                    defaultValue={6}
                                    onChange={(e) => handleInputChange(e, i, "udsmaximas")}
                                    style={inputStyle}
                                    onBlur={() => handleEscaladosBody()}
                                    stringMode
                                    value={x.udsmaximas}
                                />
                            </Col>
                            <Col span={6}>
                                <label>{i <= 0 ? "Descuento" : ""} </label>

                                <InputNumber
                                    name="descuento"
                                    placeholder="Ingresar % de descuento"
                                    min={0}
                                    value={x.descuento}
                                    defaultValue={10}
                                    step="0,1"
                                    onChange={(e) => handleInputChange(e, i, "descuento")}
                                    style={ inputStyle}
                                    onBlur={() => handleEscaladosBody()}
                                    stringMode
                                    decimalSeparator=","
                                />
                            </Col>
                            <Col span={3}>
                                <div className="btn-box">
                                    {inputList.length !== 1 && (
                                        <Button
                                            onClick={handleRemoveClick}
                                            style={i <= 0 ? { marginTop: "30px" } : { marginTop: "10px" }}
                                            className="ant-btn-dangerous"
                                        >
                                            <DeleteRowOutlined />
                                        </Button>
                                    )}
                                </div>
                            </Col>
                            <Col span={3}>
                                {inputList.length - 1 === i && (
                                    <Button onClick={handleAddClick} style={i <= 0 ? { marginTop: "30px" } : { marginTop: "10px" }} className="ant-btn">
                                        <FolderAddOutlined />
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    );
                })}
                {ValidateErrorEscalados()}
            </div>


            <h3 style={{ margin: "20px 0 10px 0" }}>Asociación de productos</h3>
            <Row style={{ width: "100%" }}>

                <Tabs
                    defaultActiveKey={body.ind_seleccion_conjunta ? "1" : "2"}
                    onChange={(value) => confirmChangePanel(value === "1" ? "Selección conjunta" : "Selección individual", value)}
                >
                    <TabPane tab="Selección por submarca" key="1">
                        <Col span={12} style={{ height: "1150px", overflow: "auto", paddingRight: "10px" }}>
                            <List
                                size="small"
                                header={<div>Submarcas</div>}
                                bordered
                                dataSource={subMarcasArrayRedux.sort((a, b) => a.nombre.localeCompare(b.nombre))}
                                //onChange={catalogoProducts}
                                onBlur={()=>handleBodyRedux()}
                                renderItem={(item) => (
                                    <List.Item style={{ cursor: "pointer" }}>
                                        <Checkbox
                                            value={item.idsubmarca}
                                            onChange={async (e) => {
                                                await onSelectChange(e, item);
                                            }}
                                            //onChange={()=> onChangeArray( item.idsubmarca ) }
                                            defaultValue={() => marcadosRedux.indexOf(item.idsubmarca) > -1 || body.submarcas.indexOf(item.idsubmarca) > -1}
                                        >
                                            {item.nombre}
                                        </Checkbox>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12} style={{ height: "1150px", overflow: "auto", paddingLeft: "10px" }}>
                            <List
                                //onChange={catalogoProducts}
                                size="small"
                                header={<div>Seleccionados</div>}
                                bordered
                                dataSource={productsfilted}
                                renderItem={(item) => <List.Item>{item.nombre}</List.Item>}
                            />
                        </Col>
                    </TabPane>
                    <TabPane tab="Selección individual" key="2">
                        <Row style={{ marginBottom: "10px" }}>
                            <Col span={8}>
                                <label style={{ fontWeight: "bold" }}>Familias</label>
                                <DualListFilter
                                    options={familiaArrayRedux.map((family) => {
                                        return {
                                            label: family.nombre,
                                            value: family.idfamilia,
                                        };
                                    })}
                                    value={filterProducts.seleccion_individual_filtro_categoria}
                                    onChange={(seleccion_individual_filtro_categoria) => {
                                        setFilterProducts({ ...filterProducts, seleccion_individual_filtro_categoria: seleccion_individual_filtro_categoria });
                                    }}
                                />
                            </Col>
                            <Col span={8}>
                                <label style={{ fontWeight: "bold" }}>Marcas</label>
                                <DualListFilter
                                    options={marcasArrayRedux.map((brand) => {
                                        return {
                                            label: brand.nombre,
                                            value: brand.idmarca,
                                        };
                                    })}
                                    value={filterProducts.seleccion_individual_filtro_marca}
                                    onChange={(seleccion_individual_filtro_marca) => {
                                        setFilterProducts({ ...filterProducts, seleccion_individual_filtro_marca: seleccion_individual_filtro_marca });
                                    }}
                                />
                            </Col>
                            <Col span={8}>
                                <label style={{ fontWeight: "bold" }}>Submarcas</label>
                                <DualListFilter
                                    options={subMarcasArrayRedux.map((subBrand) => {
                                        return {
                                            label: subBrand.nombre,
                                            value: subBrand.idsubmarca,
                                        };
                                    })}
                                    value={filterProducts.seleccion_individual_filtro_submarca}
                                    onChange={(seleccion_individual_filtro_submarca) => {
                                        setFilterProducts({ ...filterProducts, seleccion_individual_filtro_submarca: seleccion_individual_filtro_submarca });
                                    }}
                                />
                            </Col>
                        </Row>
                        <ExtendedDualListBox
                            icons={dualListIcons}
                            options={productosArrayRedux.map((product) => ({ ...product, value: product.idproducto, label: product.nombre }))}
                            selectedKeys={body.productos.map((producto) => producto.idproducto)}
                            filter={filterSeleccionIndividual}
                            onChange={(productos) => {
                                setBody({ ...body, productos: productos.map((idproducto) => ({ idproducto })) });
                            }}
                        />
                    </TabPane>
                </Tabs>
            </Row>
      {/*      <Button type="submit" size="large" type="primary" onClick={() => onSubmitEve()} style={{ marginTop: "10px" }}>
                Guardar
            </Button>*/}
            <Button
                type="link"
                onClick={() => {
                    history.push("/acuerdos-comerciales");
                }}
            >
                <LeftOutlined /> Atrás
            </Button>

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </Form>
    )
  }

const inputStyle = {
    width: "calc(100% - 40px)",
    margin: "10px",
};

const inputErrorStyle = {
    width: "calc(100% - 40px)",
    margin: "10px",
    border: "1px solid red",
    borderRadius: "4px",
};
export default FormCreateAc