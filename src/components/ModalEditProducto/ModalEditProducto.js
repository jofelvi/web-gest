import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { guardadoSuccess } from '../../modules/products/actions';

const { Option,OptGroup } = Select;

const ModalEditProducto = (props) => {

    const [apiDataPosts, setapiDataPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const [respuestaNewGroup, setrespuestaNewGroup] = useState();
    let token = utils.getAuthToken();
    let padresGrupo = [];
    const [apiDataGrupos, setapiDataGrupos] = useState([]);
    const [idGrupoSelect, setidGrupoSelect] = useState();
    const dispatch = useDispatch()
    const successApiGrupo = useSelector((state) => state.products.success);
    // alert(props.visible);
    

    

        /////////////////////////////////////////////////////////

        const updateGrupos = async() =>{

          let body = {
            "idgrupo": idGrupoSelect
          }
          console.log(JSON.stringify(body))
          console.log(token)
          console.log(props.idProducto)

          let response = await axios.patch(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/producto/${props.idProducto}`, body ,{
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


        const LLamadaGetGrupos = async() =>{
          let response = await axios.get(`http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/grupo`, {
              headers: {  
                'Content-Type': 'application/json',
                 accept: 'application/json',
                 Authorization: `Bearer ${token}` }
            }).then((response) => {
             
              setapiDataGrupos(response.data)   
               console.log(response.data)
               response.data.map((obj) => {

               
                if (obj.idpadre === null){

                  padresGrupo.push({
                    'idgrupo': obj.idgrupo,
                    'nombre': obj.nombre,
                    'idpadre': obj.idgrupo,
                    'children':false

                  })
                }
                else{
                  padresGrupo.push({
                    'idgrupo':obj.idgrupo,
                    'nombre':obj.nombre,
                    'idpadre':obj.idpadre,
                    'children':true
                  })
                }

              })
              
              padresGrupo.sort((a,b)=>{
                  return( a.idpadre - b.idpadre)
              })

          }).catch((error) => { 
              console.log("mensaje de error llamada API: ",error)   
          })
          setapiDataGrupos(padresGrupo)
      }


    const modificarGrupo = (evento) => {
      // evento.preventdefault()
      setidGrupoSelect(evento)
    }


    const showModal = () => {
      setIsModalVisible(true);
      LLamadaGetGrupos();      
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
    };
  
    const nuevoBoton = 
    <>
       <Button type="primary" onClick={updateGrupos}>Guardar</Button>
       <Button onClick={hiddenModal}>Cancelar</Button>
    </>

    return (
      <>
      
        {/* <Button type="primary" onClick={showModal}>
          Editar Grupo
        </Button> */}
        <Tooltip title="Editar grupo">
              <EditOutlined style={{ fontSize: '20px' }} onClick={showModal}/>
          </Tooltip>

        <Modal
          title={props.tituloModal}
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center'}}>
                El grupo actual del producto es: <b>{props.nombreGrupoActual}</b>. <br/> 
                <Select
                     placeholder= {props.nombreGrupoActual}
                     style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                     onChange = {(evento) => modificarGrupo(evento)}
                 >

                     { apiDataGrupos.map( (stateObject,index) => {
                         return (

                             <Option value={stateObject.idgrupo} style={ stateObject.children ? {paddingLeft: 40 } : null} key={index}>{stateObject.nombre}</Option>
                         );
                     } ) }
                 </Select>
                 
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









