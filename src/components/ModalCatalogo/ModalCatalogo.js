import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';



const ModalCatalogo = (props) => {

    const [apiDataPosts, setapiDataPosts] = useState([]);
    let token = utils.getAuthToken();




        const LLamadaGetProductoImagen = async() =>{
            let response = await axios.get(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/producto/${props.idproducto}/imagen-catalogo`, {
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
  
    const nuevoBoton = <Button onClick={hiddenModal}>Close</Button>;
  
    return (
      <>
        <Button type="primary" onClick={showModal}>
            Ver detalle
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center'}}><h1>Detalle de producto</h1></Col>
         </Row>
         <Row>
              <Col span={24} style={{textAlign:'center'}}><img src={apiDataPosts}></img></Col>
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



export default ModalCatalogo









