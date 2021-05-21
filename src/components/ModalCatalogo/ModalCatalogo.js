import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Divider, Tooltip, Switch } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { CheckSquareOutlined, CloseSquareOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ModalEditProducto from '../ModalEditProducto/ModalEditProducto';








const ModalCatalogo = (props) => {

    const [apiDataPosts, setapiDataPosts] = useState([]);


    let token = utils.getAuthToken();




        const LLamadaGetProductoImagen = async() =>{
            let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}ntr/producto/${props.idproducto}/imagen-catalogo`, {
                headers: {  
                  'Content-Type': 'application/json',
                  accept: 'application/json',
                  Authorization: `Bearer ${token}` }
              })
              .then((response) => {
                setapiDataPosts(response.data)   
                console.log(JSON.stringify(response.data))                         
                })
             .catch((error) => { 
                console.log("mensaje de error llamada API: ",error)   
                 })
        }
    

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
  
    const showModal = () => {
      setIsModalVisible(true);
      LLamadaGetProductoImagen();
      
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
    };
  
    const nuevoBoton = <Button onClick={hiddenModal}>Cerrar</Button>;
    

////////////////////////////////////////////////////////////////////////////////////
 const estadoTrueAC = {
    fontSize: '30px'
 }
//-----------------------------------------------------------------------------------------// INDACTIVO
let indactivo;
    indactivo = <Switch defaultChecked={props.indactivo} style={estadoTrueAC} checkedChildren="SI" unCheckedChildren="NO" disabled={true}/>
//-----------------------------------------------------------------------------------------// INDSOLOFARMACIA
 let indsolofarmacia;
    indsolofarmacia = <Switch defaultChecked={props.indsolofarmacia} checkedChildren="SI" unCheckedChildren="NO" disabled={true}/>
//_---------------------------------------------------------------------------------------// INDCATPUNTOS
 let indcatpuntos;
    indcatpuntos = <Switch defaultChecked={props.indcatpuntos} checkedChildren="SI" unCheckedChildren="NO" disabled={true}/>

 //_---------------------------------------------------------------------------------------// OCULTAR RELACION
 let ocultarRelacion;
    ocultarRelacion = <Switch defaultChecked={props.ocultarRelacion} checkedChildren="SI" unCheckedChildren="NO" disabled={true}/>


/////////////////////////////////////////////////////////////////////////////////
  
    return (
      <>
        <Button type="" onClick={showModal}>
            Ver detalle
        </Button>
        <Modal
          width = "1000px"
          title="Detalle del producto"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >

        <Row>
              <Col span={24} style={{textAlign:'center'}}><Divider orientation="left"><b>NOMBRE</b></Divider><h1>{props.nombreProducto}</h1></Col>
         </Row>
         <Row>
              <Col span={12} style={{textAlign: "center", marginTop:40}}><img src={apiDataPosts}></img></Col>
              <Col span={12} style={{textAlign:'center'}}>
              <Divider/>
                  <Row>
                     <Col span={12} style={{textAlign:'right'}}><h4><b>IND SOLO FARMACIA&nbsp;&nbsp;</b> </h4></Col>
                     <Col span={12} style={{textAlign:'left'}}>{indsolofarmacia}</Col>
                  </Row>
                  <Row>
                     <Col span={12} style={{textAlign:'right'}}><h4><b>OCULTAR RELACION&nbsp;&nbsp;</b></h4></Col>
                     <Col span={12} style={{textAlign:'left'}}>{ocultarRelacion}</Col>
                  </Row>
                  <Row>
                     <Col span={12} style={{textAlign:'right'}}><h4><b>INDICADOR CATALOGO PUNTOS&nbsp;&nbsp;</b></h4></Col>
                     <Col span={12} style={{textAlign:'left'}}>{indcatpuntos}</Col>
                  </Row>
                  <Row>
                        <Col span={12} style={{textAlign:'right'}}><h4><b>PUNTOS ACUMULADOS: &nbsp;&nbsp;</b></h4></Col>
                        <Col span={12} style={{textAlign:'left'}}><h4>{props.puntosacumulado}&nbsp;&nbsp;
                            <Tooltip placement="right" title="Puntos que se ganan al comprar el producto por unidad." color='blue'><QuestionCircleOutlined /></Tooltip>
                            </h4>
                        </Col>
                  </Row>
                  <Row>
                        <Col span={12} style={{textAlign:'right'}}><h4><b>PUNTOS COSTE: &nbsp;&nbsp;</b></h4></Col>
                        <Col span={12} style={{textAlign:'left'}}><h4>{props.puntoscoste}&nbsp;&nbsp;
                            <Tooltip style={{Left:720}} placement="right" title="Coste en puntos del producto por unidad." color='blue'><QuestionCircleOutlined /></Tooltip>
                            </h4>
                        </Col>
                  </Row>
                  <Row>
                     <Col span={8}><Divider><Tooltip placement="bottom" title="Precio venta del laboratorio." color='blue'><h4><b>PVL </b></h4></Tooltip></Divider></Col>
                     <Col span={8}><Divider><Tooltip placement="bottom" title="Precio venta al público." color='blue'><h4><b>PVP </b></h4></Tooltip></Divider></Col>
                     <Col span={8}><Divider><Tooltip placement="bottom" title="Precio venta medio." color='blue'><h4><b>PVM </b></h4></Tooltip></Divider></Col>
                  </Row>
                  <Row>
                     <Col span={8}>{props.pvl}</Col>
                     <Col span={8}>{props.pvp}</Col>
                     <Col span={8}>{props.pvm}</Col>
                  </Row>  
              </Col>

              {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}


         </Row>
         <Row>
              <Col span={24} style={{textAlign:'center'}}><Divider orientation="left"><b>DESCRIPCIÓN</b></Divider><p style={{fontSize:18}}>{props.descripcion}</p></Col>
         </Row>
         <Divider/>
         <Row>
              <Col span={3} style={{textAlign:'center'}}><Divider><Tooltip title="Indica si el producto esta actualmente activo." color='blue'><b>ACTIVO</b></Tooltip></Divider></Col>
              <Col span={7} style={{textAlign:'center'}}><Divider><Tooltip title="Código INDAS del producto." color='blue'><b>CÓD. INDAS</b></Tooltip></Divider></Col>
              <Col span={7} style={{textAlign:'center'}}><Divider><Tooltip title="Código Nacional del producto." color='blue'><b>CÓD. NACIONAL</b></Tooltip></Divider> </Col>
              <Col span={7} style={{textAlign:'center'}}><Divider><Tooltip title="Código EAN/Barras del producto." color='blue'><b>CÓD. EAN</b></Tooltip></Divider></Col>
        </Row>
        <Row style={{fontSize:18}}>
              <Col span={3} style={{textAlign:'center'}}>{indactivo}</Col>
              <Col span={7} style={{textAlign:'center'}}><p>{props.codindas}</p></Col>
              <Col span={7} style={{textAlign:'center'}}><p>{props.codnacional}</p></Col>
              <Col span={7} style={{textAlign:'center'}}><p>{props.codean13}</p></Col>
        </Row>
         <Divider/>
         <Row>
              <Col span={6} style={{textAlign:'center'}}><Divider><b>CATEGORÍA</b></Divider> </Col>
              <Col span={6} style={{textAlign:'center'}}><Divider><b>MARCA</b></Divider></Col>
              <Col span={6} style={{textAlign:'center'}}><Divider><b>SUBMARCA</b></Divider></Col>
              <Col span={6} style={{textAlign:'center'}}><Divider><b>GRUPO</b> 
                    <a><ModalEditProducto
                        tituloModal = {props.nombreProducto}
                        nombreGrupoActual = {props.nombregrupo}
                        idProducto = {props.idproducto}
                      /></a>
                 </Divider>
             </Col>
        </Row>
         <Row style={{fontSize:18}}>
              <Col span={6} style={{textAlign:'center'}}><p>{props.nombrefamilia}</p></Col>
              <Col span={6} style={{textAlign:'center'}}><p>{props.nombremarca}</p></Col>
              <Col span={6} style={{textAlign:'center'}}><p>{props.nombresubmarca}</p></Col>
              <Col span={6} style={{textAlign:'center'}}><p>{props.nombregrupo}</p></Col>
        </Row>
        
        <Divider/>
        
        
        
        </Modal>
      </>
    );
  };



export default ModalCatalogo









