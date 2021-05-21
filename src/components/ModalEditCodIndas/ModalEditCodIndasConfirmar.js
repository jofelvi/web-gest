import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip, Input  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { guardadoSuccess } from '../../modules/products/actions';



const ModalEditCodIndasConfirmar = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const [respuestaNewGroup, setrespuestaNewGroup] = useState();
    let token = utils.getAuthToken();
    const [CodIndas, setCodIndas] = useState();
    const dispatch = useDispatch()
    const successApiGrupo = useSelector((state) => state.products.success);
    

    
        /////////////////////////////////////////////////////////

        const updateCodIndas = async() =>{
          let body = {
            "ind_bloqueo_codindas": false
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
              console.log("mensaje de error llamada API: ",error)   
          })
          
      }

        /////////////////////////////////////////////////////////

    const showModal = () => {
      setIsModalVisible(true);    
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
    };
  
    const nuevoBoton = 
    <>
       <Button type="primary" onClick={updateCodIndas}>Eliminar bloqueo por cambio de código INDAS</Button>
       <Button onClick={hiddenModal}>Cancelar</Button>
    </>

    return (
      <>

        <Tooltip title="Editar grupo">
              <EditOutlined style={{ fontSize: '20px' }} onClick={showModal}/>
          </Tooltip>

        <Modal
          title={props.nombreProducto}
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'left'}}>
                Esta refrencia tiene un cambio de código INDAS pendiente de finalizar. <br/><br/>
                Nuevo código INDAS: <b>{props.codindasactual}</b>. <br/><br/>
                Confirme que el código ya ha sido cambiado en CBIM y elimine el bloqueo temporal de los pedidos afectados
                 
              </Col>
         </Row>
        
         <Row>
              <Col span={8} />
              <Col span={8} />
              <Col span={8} />
        </Row>
        <h3>{props.codean}</h3>
        
        </Modal>
      </>
    );
  };



export default ModalEditCodIndasConfirmar









