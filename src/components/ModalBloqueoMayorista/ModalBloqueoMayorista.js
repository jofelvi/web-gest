import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip, Table, Divider, Result  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { CheckSquareOutlined, DeleteRowOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { editProduct, eliminarBloqueosM, eliminarUnB, getMayoristas, getProductBloqMayorista, guardadoSuccess, newBloqueo } from '../../modules/products/actions';

const { Option,OptGroup } = Select;

const ModalBloqueoMayorista = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    let token = utils.getAuthToken();
    const dispatch = useDispatch()
    const successApiGrupo = useSelector((state) => state.products.success);
    const dataProdBlqM = useSelector((state) => state.products.getProductBloMay);
    const dataMayoristas = useSelector((state) => state.products.getMayoristas);
    const [slectMayorista, setslectMayorista] = useState();
    const [tieneBloq, settieneBloq] = useState('none');
    const [NOtieneBloq, setNOtieneBloq] = useState('inline');

    

    
  
    
  const newBloqueoF = async() =>{
          
      let body = {
        "idproducto":props.idProducto,
        "codmayorista": slectMayorista
      }
         await dispatch(newBloqueo(body))
         await dispatch(guardadoSuccess(!successApiGrupo))
         await dispatch(getProductBloqMayorista(props.idProducto))
         dispatch(guardadoSuccess(!successApiGrupo))
         hiddenNuevoBloqueo()
         settieneBloq('inline')
         setNOtieneBloq('none')      
   }

   const eliminarUNBLQ = async(idbloqueo) =>{
          
    let body = {
      "fecha_baja": new Date().toISOString()
    }
       await dispatch(eliminarUnB(idbloqueo,body))
       await dispatch(getProductBloqMayorista(props.idProducto))
       dispatch(guardadoSuccess(!successApiGrupo))
       if (dataProdBlqM.length == 1){
        settieneBloq('none')
        setNOtieneBloq('inline') 
       }
       

 }

   const eliminarBloqueos = async() =>{
       await dispatch(eliminarBloqueosM(props.idProducto,''))
       await dispatch(getProductBloqMayorista(props.idProducto))
       dispatch(guardadoSuccess(!successApiGrupo))
       settieneBloq('none')
       setNOtieneBloq('inline')         
  }
   

        

    const showModal = async() => {  
     await dispatch(getProductBloqMayorista(props.idProducto))
     await dispatch(getMayoristas())
     await setIsModalVisible(true);
     if (props.indbloqueoM){
      settieneBloq('inline')
      setNOtieneBloq('none')
      
     }
    };

    
  
    const hiddenModal = () => {
      setIsModalVisible(false);
      if (props.indbloqueoM){
        settieneBloq('inline')
        setNOtieneBloq('none')
        
       }
       else{
        settieneBloq('none')
        setNOtieneBloq('inline')
       }
    };

    function BloqueoMayorista(indbloqueoM){
      if (indbloqueoM){
        return(
          <>
          <p style={{marginLeft:'15px', paddingTop:'15px'}}>
          <WarningOutlined 
          style= {{color:'#faad14',fontSize:'18px'}}
          onClick= {showModal}
          />
          </p>
          </>
        )
      }
      else{
        return(
          <>
          <p style={{marginLeft:'15px',paddingTop:'15px'}}>
          <CheckSquareOutlined
          style= {{color:'grey',fontSize:'18px'}}
          onClick= {showModal}
          />
          </p>
          </>
        )
      }
    }
  
    const nuevoBoton = 
    <>
       <span id='btnCrearNB' style={{marginRight:'10px'}}><Button type="primary" onClick={shownuevoBloqueo}>Crear bloqueo</Button></span>
       <Button type="primary" id='btnConfirmarNB' style={{display:'none'}} onClick={newBloqueoF}>Confirmar nuevo bloqueo</Button>
       <Button type="primary" style={{display:tieneBloq}} onClick={eliminarBloqueos}>Eliminar todos</Button>
       <Button onClick={hiddenModal}>Cerrar</Button>
       
    </>

    function hiddenNuevoBloqueo(){
      document.getElementById("btnCrearNB").style.display = "inline";
      document.getElementById("textoinfo").style.display = " inline";
      document.getElementById("rowNuevoBM").style.display = "none";
      document.getElementById("btnConfirmarNB").style.display = "none";
    }

    function shownuevoBloqueo (){
      document.getElementById("btnCrearNB").style.display = "none";
      document.getElementById("textoinfo").style.display = "none";
      document.getElementById("rowNuevoBM").style.display = "block";
      document.getElementById("btnConfirmarNB").style.display = "inline";
      setNOtieneBloq('none')
    }

    const columns = [
      {
        title: 'Código',
        dataIndex: 'codmayorista',
        key: 'codmayorista',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre_mayorista',
        key: 'nombre_mayorista',
        render: text => <a>{text}</a>,
      },
      {
        title: '',
        dataIndex: '',
        key: '',
        render: (text,row) => <p style={{paddingTop:'10px' ,paddingLeft:'10px', textAlign:'center'}}><a><Tooltip title="Eliminar bloqueo"><DeleteRowOutlined onClick={() => eliminarUNBLQ(row.idbloqueo)} style={{color:'red'}}/></Tooltip></a></p>,
      }
      
    ]










    return (
      <>
      
        <Tooltip title="Editar grupo">
          {BloqueoMayorista(props.indbloqueoM)}
          </Tooltip>

        <Modal
          title={props.tituloModal}
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        <Row id='textoinfo' style={{display:tieneBloq}}>
              <Col span={24} style={{marginTop:'10px', textAlign:'center'}}>
                <p style={{textAlign:'left'}}>
                <b>Lista de mayoristas con bloqueos activos para esta referencia:</b>  <br/><br/></p>
                
                 
              </Col>
         </Row>
         <Row id='rowNuevoBM' style={{display:'none'}}>
          <Col span={24} style={{textAlign:'center'}}>
                 <Divider>NUEVO BLOQUEO</Divider>
                 <br/>
                 <Select
                     placeholder= {props.nombreGrupoActual}
                     style={{width: '100%', paddingLeft: 0, marginLeft:10, marginBottom:'30px'}}
                     onChange = {(evento) => setslectMayorista(evento)} >
                     { dataMayoristas.map( (stateObject,index) => {
                         return (
                             <Option value={stateObject.codmayorista} style={''} key={index}>{stateObject.nombre}</Option>
                         );
                     } ) }
                 </Select>
                 
          </Col>
          <br/>
          <Divider></Divider>
        </Row>
         <Row  >
              <Col span={24} style={{textAlign:'center',display:tieneBloq }}>
              <Table 
                    
                    columns={columns} 
                    dataSource={dataProdBlqM}
                    className="table"
                    pagination={{
                        pageSize: 500,
                        total: 5,
                        showSizeChanger: false,
                        position: ['bottomLeft']

                      }}
                /> 
              </Col>
              <Col span={24} style={{textAlign:'center',display:NOtieneBloq }}>
                   <Result
                      status="success"
                      title="No existen bloqueos asociados a mayoristas."
                      subTitle="Puede crear un nuevo bloqueo pulsando en el boton 'Crear Bloqueo' y seleccionando al mayorista."
                    />
              </Col>
        </Row>
        <br/>
        
        
        
        </Modal>
      </>
    );
  };



export default ModalBloqueoMayorista









