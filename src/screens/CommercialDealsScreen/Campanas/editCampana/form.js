import React, { useEffect, useState } from "react";
import { InputBox } from "../../../OrderListScreen/styled";
import { Alert, Checkbox, Col, DatePicker, Input, List, Row, Select, Switch, Button, message, InputNumber, Tabs, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";

import {
  eliminarItemsMarcados,
  getCatalogoProductos,
  getSubmarcas,
  listItemMarcados,
  productosFiltrados,
  getMarcas,
  getFamilia,
  getIndividualCampana,
  editCampana,
} from "../../../../modules/campanas/actions";

import * as moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import PlanesCompraSaved from "../../../CommercialDealsScreen/PlanesCompra/components/PlanesCompraSaved";
import SearchInputEntidad from "../../../../components/SearchInputEntidad";
import { get, keys } from "lodash";
import ExtendedDualListBox from "../../../CommercialDealsScreenNew/ExtendedDualListBox";
import DualListFilter from "../../../CommercialDealsScreenNew/DualListFilter";

import { loadProducts } from "../../../../modules/commercialDeals/actions";

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
import { LoadingComponents } from "../../../../components/LoadingComponents";

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

const FormEditCampana = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productosArrayRedux = useSelector((state) => state.campanas.productoArray);

  const marcadosRedux = useSelector((state) => state.campanas.marcadosArray);
  const productsfilted = useSelector((state) => state.campanas.productsfilted);

  const [body, setBody] = useState({
    submarcas: [],
    productos: [],
    escalados: [],
    margen: parseFloat(1.0),
    idtipo: 1,
    ind_renovar: false,
    ind_seleccion_conjunta: false,
    ind_surtido: false,
  });

  const [inputList, setInputList] = useState([
    {
      descuento: 10.0,
      udsmaximas: 1,
      udsminimas: 1,
      txtdescuento: "",
    },
  ]);
  const subMarcasArrayRedux = useSelector((state) => state.campanas.subMarcaArray);
  const marcasArrayRedux = useSelector((state) => state.campanas.marcasArray);
  const familiaArrayRedux = useSelector((state) => state.campanas.familiaArray);
  const [initialDate, setInitialDate] = useState(typeof body === "undefined" ? "" : body.fechainicio);
  const [finalDate, setFinalDate] = useState(typeof body === "undefined" ? "" : body.fechafin);
  const [codcli_cbim, setCodcli_cbim] = useState();
  const successCreate = useSelector((state) => state.campanas.createCampanaSuccess);
  const [bodyError, setBodyError] = useState([]);
  const [filterProducts, setFilterProducts] = useState({
    seleccion_individual_filtro_submarca: "",
    seleccion_individual_filtro_categoria: "",
    seleccion_individual_filtro_marca: "",
  });
  const [nomcli_cbim, setNomcli_cbim] = useState("");
  const [ind_surtido, setInd_surtido] = useState(false);
  const [ind_seleccion_conjunta, setInd_seleccion_conjunta] = useState();

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
    callbackSave();
  }, [bodyError]);

  useEffect(() => {
    handleApi();
  }, [id]);

  useEffect(() => {
    callApis();
  }, []);

  useEffect(() => {
    catalogoProducts();
  }, [body.submarcas, productosArrayRedux]);

  const callApis = () => {
    dispatch(getSubmarcas());
    dispatch(getCatalogoProductos());
    dispatch(getMarcas());
    dispatch(getFamilia());
    loadProducts();
  };

  const handleApi = async () => {
    let objAc = await dispatch(getIndividualCampana(id));

    setLoading(false);
    setCodcli_cbim(objAc.codcli_cbim);
    setNomcli_cbim(objAc.nomcli_cbim);

    const { clientes, ind_surtido, escalados, ind_seleccion_conjunta } = objAc;
    let objResult = delete objAc.clientes;
    let objResult2 = delete objAc.codcli_cbim;
    let objResult3 = delete objAc.coddelegado;
    let objResult4 = delete objAc.delegado;
    let objResult5 = delete objAc.estado;
    let objResult6 = delete objAc.estado2;
    let objResult7 = delete objAc.idcliente;
    let objResult8 = delete objAc.nomcli_cbim;
    let objResult9 = delete objAc.tipo;

    console.log("verificar ind_surtido", objAc);
    setInd_surtido(ind_surtido);
    setInputList(escalados);
    setInd_seleccion_conjunta(ind_seleccion_conjunta);

    setBody(objAc);
    console.log(objAc);
  };

  const handleValues = async (e, item) => {
    if (e.target.checked) {
      console.log("entro if", e.target.value);

      if (!body.submarcas.some((submarca) => submarca.idsubmarca == item.idsubmarca)) {
        setBody({ ...body, submarcas: body.submarcas.concat({ idsubmarca: item.idsubmarca, nombre: item.nombre }) });
      }
    } else {
      let elementosFilted = body.submarcas.filter(function (item) {
        return item.idsubmarca !== e.target.value;
      });
      setBody({ ...body, submarcas: elementosFilted });
    }
  };

  const onSelectChange = async (e, item) => {
    await handleValues(e, item);
  };

  const catalogoProducts = async () => {
    //const res = productosArrayRedux.filter((f) => body.submarcas.find((item) => item.idsubmarca === f.idsubmarca));
    let productosBody = [];

    productosArrayRedux.filter((f) =>
      body.submarcas.find((item) => item.idsubmarca === f.idsubmarca && productosBody.push({ idproducto: f.idproducto, nombre: f.nombre }))
    );

    //dispatch(productosFiltrados(res));

    if (productosBody.length) {
      setBody({
        ...body,
        productos: productosBody,
      });
    }
  };

  const handleEscaladosBody = () => {
    setBody({ ...body, escalados: inputList });
  };

  const validate = (body, success, errorCallback) => {
    const validations = [
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
      { field: "escalados[0].udsmaximas", validator: (value) => parseInt(value) > 0, message: "Debe ser mayor que 0." },
      {
        field: "escalados[0].udsmaximas",
        validator: (value) => parseInt(value).toString() == value,
        message: "Debe ser un numero entero.",
      },
      {
        field: "escalados[0].descuento",
        validator: (value) => parseFloat(value) > 0 && parseFloat(value) < 100,
        message: "Debe ser un porcentaje.",
      },
      { field: "margen", validator: (value) => parseFloat(value) > 0 && parseFloat(value) < 100, message: "Debe ser un porcentaje." },
      {
        field: "submarcas",
        validator: (value, record) => record.ind_seleccion_conjunta == false || value.length > 0,
        message: "Debe seleccionar por lo menos una submarca.",
      },
      {
        field: "productos",
        validator: (value, record) => record.ind_seleccion_conjunta == true || value.length > 0,
        message: "Debe seleccionar por lo menos un producto.",
      },
    ];

    console.log(validations);
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
      async () => {
        await dispatch(editCampana(body, id));
      },
      () => {
        document.querySelector(".ant-layout-content").scrollTo(0, 0);
      }
    );
  };

  const handleInputChange = (value, index, key) => {
    if (key === "udsminimas" || key === "udsmaximas") {
      const list = [...inputList];
      list[index][key] = value;
      setInputList(list);
    } else {
      const list = [...inputList];
      list[index][key] = value;
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

  if (successCreate) {
    return <PlanesCompraSaved redirectURL="/campañas" mensaje={"Su campaña fue creada exitosamente"} ac={true} />;
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

  if (loading) {
    return <LoadingComponents />;
  }
  return (
    <>
      <h3 style={{ margin: "20px 0 10px 0" }}>Datos generales</h3>

      <div className="table-filters-indas" style={{ padding: 20 }}>
        <Row style={{ width: "100%" }}>
          <Col span={17} style={{ padding: "0px" }}>
            <span>Cupón de Campaña</span>
            <div style={{ padding: "0px", paddingTop: "0", paddingRight: "20px" }}>
              <SearchInputEntidad desactivado={true} valorDefecto={typeof body === "undefined" ? "" : nomcli_cbim} />
            </div>
          </Col>
        </Row>
        <Row style={{ width: "100%", marginBottom: 0, paddingBottom: 0 }}>
          <Col style={{ padding: "10px" }} span={6}>
            <label>Nombre de la Campaña</label>
            <Input
              name="nombre"
              value={typeof body === "undefined" ? "" : body.nombre}
              onChange={changeBody}
              style={hasError("nombre") ? inputErrorStyle : inputStyle}
            />
            {getError("nombre")}
          </Col>
          <Col style={{ padding: "10px" }} span={18}>
            <label>Descripción de la Campaña</label>
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
              value={typeof body === "undefined" ? "" : moment(body.fechainicio)}
              onChange={(date, dateString) => {
                let d = new Date(date);
                let dateIso = d.toISOString();
                setInitialDate(date);
                setBody({ ...body, fechainicio: dateIso });
              }}
              locale={locale}
              format={dateFormat}
              placeholder={"Seleccionar fecha"}
              style={hasError("fechainicio") ? inputErrorStyle : inputStyle}
            />
            {getError("fechainicio")}
          </Col>
          <Col span={8}>
            <label>Fecha de fin</label>
            <DatePicker
              format={dateFormat}
              value={typeof body === "undefined" ? "" : moment(body.fechafin)}
              onChange={(date, dateString) => {
                let d = new Date(date);
                let dateIso = d.toISOString();
                setFinalDate(date);
                setBody({ ...body, fechafin: dateIso });
              }}
              placeholder={"Seleccionar fecha"}
              style={hasError("fechafin") ? inputErrorStyle : inputStyle}
            />
            {getError("fechafin")}
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
          </Col>
          <Col span={6} style={{ display: "none" }}>
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              checked={typeof body === "undefined" ? "" : body.ind_renovar}
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
              checked={typeof body === "undefined" ? "" : body.ind_seleccion_conjunta}
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
                {getError("escalados[0].descuento")}
              </Col>
            </Row>
          );
        })}
      </div>

      <h3 style={{ margin: "20px 0 10px 0" }}>Asociación de productos</h3>
      <Row style={{ width: "100%" }}>
        {getError("submarcas")}
        {getError("productos")}
        <Tabs
          activeKey={body.ind_seleccion_conjunta ? "1" : "2"}
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
                renderItem={(item) => {
                  return (
                    <List.Item style={{ cursor: "pointer" }}>
                      <Checkbox
                        value={item.idsubmarca}
                        onChange={async (e) => {
                          await onSelectChange(e, item);
                        }}
                        //onChange={()=> onChangeArray( item.idsubmarca ) }
                        checked={body.submarcas.some((submarca) => submarca.idsubmarca === item.idsubmarca)}
                      >
                        {item.nombre}
                      </Checkbox>
                    </List.Item>
                  );
                }}
              />
            </Col>
            <Col span={12} style={{ height: "1150px", overflow: "auto", paddingLeft: "10px" }}>
              <List
                //onChange={catalogoProducts}
                size="small"
                header={<div>Seleccionados</div>}
                bordered
                dataSource={body.productos}
                renderItem={(item) => <List.Item>{item.nombre}</List.Item>}
              />
            </Col>
          </TabPane>
          <TabPane tab="Selección individual" key="2">
            <Row style={{ marginBottom: "10px" }}>
              <Col span={8}>
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
              onChange={(idproductos) => {
                let p = [];
                idproductos.map((id) => {
                  productosArrayRedux.map((productoRedux) => {
                    if (id === productoRedux.idproducto) {
                      p.push({
                        idproducto: id,
                        nombre: productoRedux.nombre,
                      });
                    }
                  });
                });

                let newArray = [...body.productos, ...p];
                setBody({ ...body, productos: newArray });
              }}
            />
          </TabPane>
        </Tabs>
      </Row>
      <Row>
        <Col>
          <Button size="large" type="primary" onClick={() => onSubmit()} style={{ marginTop: "10px" }}>
            Guardar
          </Button>
          <Button
            type="link"
            onClick={() => {
              history.push("/campañas");
            }}
          >
            <LeftOutlined /> Atrás
          </Button>
        </Col>
      </Row>
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

export default FormEditCampana;
