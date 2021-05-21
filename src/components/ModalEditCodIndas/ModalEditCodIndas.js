import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip, Input  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { guardadoSuccess } from '../../modules/products/actions';



const ModalEditCodIndas = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const [respuestaNewGroup, setrespuestaNewGroup] = useState();
    let token = utils.getAuthToken();
    const [CodIndas, setCodIndas] = useState();
    const dispatch = useDispatch()
    const successApiGrupo = useSelector((state) => state.products.success);
    const [verMensajeError, setverMensajeError] = useState('none');
    const [textoError422, settextoError422] = useState();
    

    
        /////////////////////////////////////////////////////////
    let mensajeError = ''
        const updateCodIndas = async() =>{
          let body = {
            "codindas": CodIndas,
            "ind_bloqueo_codindas": true
          }
          console.log(body)
           let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}ntr/producto/${props.idProducto}`, body ,{
              headers: {  
                'Content-Type': 'application/json',
                 accept: 'application/json',
                 Authorization: `Bearer ${token}` }
            }).then((response) => {
              
              setrespuestaNewGroup(response.status) 
              dispatch(guardadoSuccess(!successApiGrupo))
              hiddenModal()
            }).catch((error) => { 
              if (error.response.status == 422){
                settextoError422(error.response.data)
                setverMensajeError('inline')
              }   
          })
          
      }

        /////////////////////////////////////////////////////////

    const showModal = () => {
      setIsModalVisible(true);    
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
      setverMensajeError('none')
    };
  
    const nuevoBoton = 
    <>
       <Button type="primary" onClick={updateCodIndas}>Guardar</Button>
       <Button onClick={hiddenModal}>Cancelar</Button>
    </>

    return (
      <>

        <Tooltip title="Editar grupo">
              <EditOutlined style={{ fontSize: '20px' }} onClick={showModal}/>
          </Tooltip>

        <Modal
          title="Editar Código INDAS"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center'}}>
              <b>{props.tituloModal}</b> <br/>
                El Código INDAS actual del producto es: <b>{props.codindasactual}</b>. <br/><br/>

                
                <Input onChange={event => setCodIndas(event.target.value)} placeholder="Nuevo Código INDAS" />
                 
              </Col>
         </Row>
        
         <Row>
              <Col span={24} ><br/> <p style={{color:'red', display:verMensajeError}}>{textoError422}</p></Col>
              
        </Row>
        <h3>{props.codean}</h3>
        
        </Modal>
      </>
    );
  };



export default ModalEditCodIndas









