import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip, Input, Checkbox, Divider, Result  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { EditOutlined, QuestionOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { guardadoSuccess} from '../../modules/products/actions';




const ModalDelGroup = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const successApiGrupo = useSelector((state) => state.products.success);
    let token = utils.getAuthToken();
    const dispatch = useDispatch()
    const [mensajeError409, setmensajeError409] = useState('none');
    const [botonConfirmarEliminado, setbotonConfirmarEliminado] = useState('inline');
    const [textoConfirmacion, settextoConfirmacion] = useState('inline');

 

    const { Option,OptGroup } = Select;


    /////////////////////////////////////////////////////////
    const deleteGroup = () => async() => {
        let response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}ntr/grupo/${props.idGrupo}`,{
            headers: {  
              'Content-Type': 'application/json',
               accept: 'application/json',
               Authorization: `Bearer ${token}` }
          }).then((response) => {
              hiddenModal();      
              dispatch(guardadoSuccess(!successApiGrupo))
          }).catch((error) => { 
            if (error.response.status == 409){
                setmensajeError409('inline')
                setbotonConfirmarEliminado('none')
                settextoConfirmacion('none')
              }   
            console.log("mensaje de error llamada API: ",error)   
        })
      }
    /////////////////////////////////////////////////////////

    const showModal = () => {
      setIsModalVisible(true);    
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
      setmensajeError409('none')
      setbotonConfirmarEliminado('inline')
      settextoConfirmacion('inline')
    };
    
    const nuevoBoton = 
    <>
       {/* <Button type="primary" style={{display:botonConfirmarEliminado}} onClick={deleteGroup()}>Confirmar eliminación</Button> */}
       <Button onClick={hiddenModal}>Cancelar</Button>
    </>

    let titulo = `Es necesaria la confirmacion para eliminar el grupo ${props.nombreGrupo}`

    return (
      <>

        <Tooltip title="Eliminar grupo"> 
             <Button style={{color:'Red', borderColor:'Red'}} onClick={showModal}>Eliminar Grupo</Button>
        </Tooltip>

        <Modal
          title="Eliminar Grupo"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center'}}>
                <span id="textoConfirmacion" style={{display:textoConfirmacion}}>    
                        <Result
                          icon={<QuestionOutlined style={{fontSize:'60px'}}/>}
                          title={titulo}
                          extra={<Button type="primary" onClick={deleteGroup()}>Confirmar eliminación</Button>}
                        />
                </span>
                <div id='mensajeError' style={{display:mensajeError409}}>
                <Result
                  status="warning"
                  title="Este producto no se puede eliminar por que tiene productos asociados."
                />
                </div>
                </Col>
         </Row>
        </Modal>
      </>
    );
  };



export default ModalDelGroup