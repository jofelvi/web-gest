import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import Select_MP from './Select_MP';

const { Option,OptGroup } = Select;

const ModalEditProducto = (props) => {

    const [apiDataPosts, setapiDataPosts] = useState([]);
    let token = utils.getAuthToken();
    let padresGrupo = [];
    let hijosGrupo = [];
    let PadreHijoGrupo = [];
    


    

        const LLamadaGetGrupos = async() =>{
            let response = await axios.get(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/grupo`, {
                headers: {  
                  'Content-Type': 'application/json',
                   accept: 'application/json',
                   Authorization: `Bearer ${token}` }
              }).then((response) => {
               
                setapiDataPosts(response.data)   
                 console.log(response.data)
                 response.data.map((obj) => {

                  // console.log("obj" ,obj)
                 
                  if (obj.idpadre === null){
                    padresGrupo.push({
                      'idgrupo': obj.idgrupo,
                      'nombre': obj.nombre
                    })
                  }
                  else{
                    hijosGrupo.push({
                      'idgrupo':obj.idgrupo,
                      'nombre':obj.nombre,
                      'idpadre':obj.idpadre
                    })
                  }

                })
                
                let identificador = 0;
        
                padresGrupo.map((obj)=>{
        
                  
                  PadreHijoGrupo.push({
                    'identificador': identificador,
                    'idgrupo': obj.idgrupo,
                    'nombre': obj.nombre,
                    'children': false
                  })
                  hijosGrupo.map((obj2) =>{
                    if (obj.idgrupo === obj2.idpadre){
                      PadreHijoGrupo.push({
                        'identificador': identificador,
                        'idgrupo': obj2.idgrupo,
                        'nombre':  obj2.nombre,
                        'children': true
                      })
                    }
                  })
                  ++identificador 
        
                })
                console.log(JSON.stringify(PadreHijoGrupo))
            }).catch((error) => { 
                console.log("mensaje de error llamada API: ",error)   
            })
         
        }


        function handleChange(value) {
          console.log(`selected ${value}`);
        }
           
             
        
        

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
  
    const showModal = () => {
      setIsModalVisible(true);
      LLamadaGetGrupos();      
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
    };
  
    const nuevoBoton = <Button onClick={hiddenModal}>Close</Button>;

    let render_select = PadreHijoGrupo.map((obj, index)=>{
       
      console.log("entro")
      return(
        <Option key={index} value={obj.idgrupo}  style={ obj.children ? {marginLeft: 30 } : null}>{obj.nombre}</Option>
      )
    })
  
    return (
      <>
      
        <Button type="primary" onClick={showModal}>
          Editar Grupo
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center'}}>

                reopeiogoireoiiroe
              <Select_MP></Select_MP>
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



export default ModalEditProducto









