import React, { useEffect, useState } from "react";
import { InputBox } from "../../OrderListScreen/styled";
import {
  Alert,
  Checkbox,
  Col,
  DatePicker,
  Input,
  List,
  Row,
  Select,
  Switch,
  Button,
  message,
  InputNumber,
  Tabs,
  Tooltip,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";
import {
  createAcuerdosComerciales,
  eliminarItemsMarcados,
  getCatalogoProductos,
  getSubmarcas,
  listItemMarcados,
  productosFiltrados,
  getMarcas,
  getFamilia,
  resetItemsMarcados,
} from "../../../modules/acuerdosComer/actions";
import * as moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import PlanesCompraSaved from "../../CommercialDealsScreen/PlanesCompra/components/PlanesCompraSaved";
import SearchInputEntidad from "../../../components/SearchInputEntidad";
import { get, keys } from "lodash";
import ExtendedDualListBox from "../ExtendedDualListBox";
import DualListFilter from "../DualListFilter";
import { loadProducts } from "../../../modules/commercialDeals/actions";
import {
  UpOutlined,
  DownOutlined,
  RightOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  DoubleLeftOutlined,
  DeleteRowOutlined,
  FolderAddOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { validateDate, validateDatesMoment } from "../componets/ValidateFields";

const { Option } = Select;
const { TabPane } = Tabs;
const dateFormat = "DD/MM/YYYY";

const dualListIcons = {
  moveLeft: <LeftOutlined />,
  moveAllLeft: <DoubleLeftOutlined />,
  moveRight: <RightOutlined />,
  moveAllRight: <DoubleRightOutlined />,
  moveDown: <DownOutlined />,
  moveUp: <UpOutlined />,
};

const FormCreateAcuerdosComerciales = (props) => {
  const { acuerdoComercial } = props;
  let { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const [errorDate, setErrorDate] = useState(false);
  const [errorDateInit, setErrorDateInit] = useState(false);
  const [errorEscalados, setErrorEscalados] = useState({ error: false, mensaje: "" });
  const idsBuscador = useSelector((state) => state.acuerdosComer.cod_Cliente);
  const productosArrayRedux = useSelector((state) => state.acuerdosComer.productoArray);
  const marcadosRedux = useSelector((state) => state.acuerdosComer.marcadosArray);
  const productsfilted = useSelector((state) => state.acuerdosComer.productsfilted);
  const [body, setBody] = useState({
    productos: [],
    clientes: [],
    escalados: [
      {
        descuento: 1.0,
        udsmaximas: 50,
        udsminimas: 1,
        txtdescuento: "",
      },
    ],
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
      descuento: 1.0,
      udsmaximas: 50,
      udsminimas: 1,
      txtdescuento: "",
    },
  ]);
  const subMarcasArrayRedux = useSelector((state) => state.acuerdosComer.subMarcaArray);
  const marcasArrayRedux = useSelector((state) => state.acuerdosComer.marcasArray);
  const familiaArrayRedux = useSelector((state) => state.acuerdosComer.familiaArray);
  console.log(familiaArrayRedux);
  console.log(productosArrayRedux);
  const [initialDate, setInitialDate] = useState(typeof body === "undefined" ? "" : body.fechainicio);
  const [finalDate, setFinalDate] = useState(typeof body === "undefined" ? "" : body.fechafin);
  const [codcli_cbim, setCodcli_cbim] = useState();
  const successCreate = useSelector((state) => state.acuerdosComer.createAcuerdoSucces);
  const [bodyError, setBodyError] = useState([]);

  const [filterProducts, setFilterProducts] = useState({
    seleccion_individual_filtro_submarca: "",
    seleccion_individual_filtro_categoria: "",
    seleccion_individual_filtro_marca: "",
  });

  const callbackSave = (action) => {
    if (typeof action === "undefined") {
      console.log("no hay action");
    } else {
      action();
    }
  };

  const changeBody = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getCatalogoProductos());
    dispatch(getSubmarcas());
    dispatch(getMarcas());
    dispatch(getFamilia());
    catalogoProducts();
    loadProducts();
  }, [marcadosRedux, acuerdoComercial, id]);

  useEffect(() => {
    handleSeletClient(idsBuscador);
    console.log("idsBuscador ", idsBuscador);
  }, [idsBuscador]);

  useEffect(() => {
    callbackSave();
  }, [bodyError]);

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

  const onSelectChange = async (e, item) => {
    await handleValues(e, item);
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

  const handleSeletClient = (idsBuscadorObj) => {
    console.log("onblur select");
    setBody({ ...body, clientes: [{ idcliente: parseInt(idsBuscadorObj[0].idcliente) }] });
  };

  const handleEscaladosBody = () => {
    setBody({ ...body, escalados: inputList });
  };

  const validate = (body, success, errorCallback) => {
    const validations = [
      {
        field: "clientes[0].idcliente",
        validator: (value) => value != "",
        message: "No se puede dejar en blanco. Seleccione una entidad para rellenarlo.",
      },
      { field: "nombre", validator: (value) => value != "", message: "No se puede dejar en blanco" },
      {
        field: "fechainicio",
        validator: (value) =>
          body && moment(body.fechainicio).isSame(value, "day") ? true : moment(value).startOf("day") >= moment().startOf("day"),
        message: "No puede ser una fecha pasada.",
      },
      {
        field: "fechafin",
        validator: (value) =>
          body && moment(body.fechafin).isSame(value, "day") ? true : moment(value).startOf("day") >= moment().startOf("day"),
        message: "No puede ser una fecha pasada.",
      },
      {
        field: "fechafin",
        validator: (value, record) => moment(value).startOf("day") >= moment(record.fechainicio).startOf("day"),
        message: "Debe ser posterior a la fecha de inicio.",
      },
      { field: "margen", validator: (value) => parseFloat(value) > 0 && parseFloat(value) < 100, message: "Debe ser un porcentaje." },
      {
        field: "idestado",
        validator: (value, record) => value !== null,
        message: "Debe seleccionar un estado",
      },
    ];

    const validationErrors = [];

    for (let i in validations) {
      const validation = validations[i];
      const value = get(body, validation.field, "");
      if (!validation.validator(value, body)) {
        validationErrors[validation.field] = validation.message;
        setBodyError(validationErrors);
      }
    }
    callbackSave(keys(validationErrors).length > 0 ? errorCallback : success);
  };

  function validateDiscountInputs() {
    let wrong = 0;
    let result = inputList.reduce((previous, current) => {
      if (current.udsmaximas < previous.udsmaximas) wrong++;
      return current;
    });
    return wrong ? false : true;
  }

  const hasError = (field) => {
    return get(bodyError, field, false) !== false;
  };

  const getError = (field, spaced = false) => {
    if (hasError(field)) {
      const validationError = get(bodyError, field, false);
      return (
        <div style={{ display: "inline" }}>
          <Alert message={validationError} type="error" />
        </div>
      );
    }
    return "";
  };

  const onSubmit = () => {
    validate(
      body,
      () => {
        dispatch(createAcuerdosComerciales(body));
        dispatch(resetItemsMarcados());
      },
      () => {
        document.querySelector(".ant-layout-content").scrollTo(0, 0);
      }
    );
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
        udsmaximas: 50,
        udsminimas: 1,
        txtdescuento: "",
      },
    ]);
  };

  const filterSeleccionIndividual = (item) => {
    const filtro_familia = filterProducts.seleccion_individual_filtro_categoria;
    const filtro_marca = filterProducts.seleccion_individual_filtro_marca;
    const filtro_submarca = filterProducts.seleccion_individual_filtro_submarca;

    return (
      (filtro_familia == "" || item.idfamilia == filtro_familia) &&
      (filtro_marca == "" || item.idmarca == filtro_marca) &&
      (filtro_submarca == "" || item.idsubmarca == filtro_submarca)
    );
  };

  if (successCreate) {
    return <PlanesCompraSaved redirectURL="/acuerdos-comerciales" mensaje={"El Acuerdo Comercial fue creado exitosamente"} ac={true} />;
  }

  const { confirm } = Modal;

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

  const validateErrorEscalados = () => {
    let mensajeError = "";
    body.escalados.map((item, index) => {
      if (item.udsminimas >= item.udsmaximas) {
        mensajeError = "Existe un error Pedidos Minimo no puede ser mayor o igual que unidades Maximas";
      } else if (item.udsmaximas <= item.udsminimas) {
        mensajeError = "Existe un error Unidades maximas no puede ser menor o igual que unidades Minimas";
      }
    });
    if (mensajeError !== "") {
      return (
        <div style={{ display: "inline" }}>
          <Alert message={mensajeError} type="error" />
        </div>
      );
    }
  };

  const checkErrorDateInit = (date) => {
    let mensaje = validateDate(date);
    mensaje === "" ? setErrorDateInit(false) : setErrorDateInit(true);
  };

  const checkErrorDates = () => {
    let mensaje = validateDatesMoment(body.fechainicio, finalDate);
    mensaje === "" ? setErrorDate(true) : setErrorDate(false);
  };

  const renderErrorDates = (
    <div style={{ display: "inline" }}>
      <Alert message={"Fecha invalida"} type="error" />
    </div>
  );

  const validateArrays = () => {
    let mensajeError = "Asociación de productos no puede queda vacio!";
    if (body.productos.length === 0) {
      return (
        <div style={{ display: "inline" }}>
          <Alert message={mensajeError} type="error" />
        </div>
      );
    }
  };

  return (
    <>
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
              style={hasError("clientes[0].idcliente") ? inputErrorStyle : inputStyle}
            />
            {getError("clientes[0].idcliente")}
          </Col>
        </Row>
        <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
          <Col span={6}>
            <label>Nombre del Acuerdo Comeroooocial</label>
            <Input
              name="nombre"
              value={typeof body === "undefined" ? "" : body.nombre}
              onChange={changeBody}
              style={hasError("nombre") ? inputErrorStyle : inputStyle}
            />
            {getError("nombre")}
          </Col>
          <Col span={18}>
            <label>Descripción del Acuerdo Comercial</label>
            <Input
              name="descripcion"
              value={typeof body === "undefined" ? "" : body.descripcion}
              onChange={changeBody}
              style={inputStyle}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
          <Col span={8}>
            <label>Fecha de inicio</label>
            <DatePicker
              value={body.fechainicio === "" ? "" : moment(body.fechainicio)}
              onChange={(date, dateString) => {
                let d = new Date(date);
                let dateIso = d.toISOString();
                setInitialDate(date);
                setBody({ ...body, fechainicio: dateIso });
                checkErrorDateInit(d);
              }}
              locale={locale}
              format={dateFormat}
              placeholder={"Seleccionar fecha"}
              style={hasError("fechainicio") ? inputErrorStyle : inputStyle}
            />
            {errorDateInit ? renderErrorDates : null}
          </Col>
          <Col span={8}>
            <label>Fecha de fin</label>
            <DatePicker
              format={dateFormat}
              allowClear
              value={typeof body === "undefined" ? "" : moment(body.fechafin)}
              onChange={(date, dateString) => {
                let d = new Date(date);
                let dateIso = d.toISOString();
                setFinalDate(moment(d).format("YYYY-MM-DD"));
                setBody({ ...body, fechafin: dateIso });
                checkErrorDates();
              }}
              placeholder={"Seleccionar fecha"}
              style={hasError("fechafin") ? inputErrorStyle : inputStyle}
              onBlur={() => checkErrorDates()}
            />
            {errorDate ? renderErrorDates : null}
          </Col>
        </Row>
        <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
          <Col span={6}>
            <label>Estado</label>

            <Select
              onChange={(value) => {
                setBody({ ...body, idestado: value });
              }}
              value={typeof body === "undefined" ? "" : body.idestado}
              style={inputStyle}
            >
              <Option value={0} style={{ color: "#CCC" }}>
                Borrador
              </Option>
              <Option value={1}>Activo</Option>
              <Option value={2}>Inactivo</Option>
            </Select>
            {getError("estado")}
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
                  style={inputStyle}
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
                  style={hasError("descuento") ? inputErrorStyle : inputStyle}
                  onBlur={() => handleEscaladosBody()}
                  stringMode
                  decimalSeparator=","
                />
              </Col>
              <Col span={3}>
                <div className="btn-box">
                  {inputList.length !== 1 && (
                    <Button
                      onClick={() => handleRemoveClick(i)}
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
        {validateErrorEscalados()}
      </div>

      <h3 style={{ margin: "20px 0 10px 0" }}>Asociación de productos</h3>
      <Row style={{ width: "100%" }}>
        {validateArrays()}
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
                <label style={{ fontWeight: "bold" }}>Categoría </label>
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
                <label style={{ fontWeight: "bold" }}>Marca</label>
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
                <label style={{ fontWeight: "bold" }}>Submarca</label>
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
      <Button size="large" type="primary" onClick={() => onSubmit()} style={{ marginTop: "10px" }}>
        Guardar
      </Button>
      <Button
        type="link"
        onClick={() => {
          history.push("/acuerdos-comerciales");
        }}
      >
        <LeftOutlined /> Atrás
      </Button>
    </>
  );
};

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

export default FormCreateAcuerdosComerciales;
