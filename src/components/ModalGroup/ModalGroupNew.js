import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip, Input, Checkbox, Divider  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { newGroup,guardadoSuccess} from '../../modules/group/actions';
// import { guardadoSuccess} from '../../modules/products/actions';




const ModalGroupNew = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const successApiGrupo = useSelector((state) => state.products.success);
    let token = utils.getAuthToken();
    const [nombreGrupo, setnombreGrupo] = useState();
    const dispatch = useDispatch()
    let padresGrupo = [];
    const [apiDataGrupos, setapiDataGrupos] = useState([]);
    const [idPadreSelect, setidPadreSelect] = useState();
    const [tienePadre, settienePadre] = useState('no');

    const { Option,OptGroup } = Select;
      ///////////////////////////////////////////////////////////////////////////  LLAMADA API GET GRUPOS
      useEffect(() => {   
        LLamadaGetGrupos()
      }, [])

    const LLamadaGetGrupos = async() =>{
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}ntr/grupo`, {
            headers: {  
              'Content-Type': 'application/json',
               accept: 'application/json',
               Authorization: `Bearer ${token}` }
          }).then((response) => {  
            setapiDataGrupos(response.data)   
             response.data.map((obj) => {
              if (obj.idpadre === null){
                padresGrupo.push({
                  'idgrupo': obj.idgrupo,
                  'nombre': obj.nombre,
                  'idpadre': obj.idgrupo
                })
              }
            })
        }).catch((error) => { 
            console.log("mensaje de error llamada API: ",error)   
        })
        setapiDataGrupos(padresGrupo)
    }
    /////////////////////////////////////////////////////////////////////////// 

    const nuevoGrupo = async() =>{
      let body;
      if(tienePadre == 'si'){
        body = {
          "nombre":nombreGrupo,
          "indactivo":true,
          "orden":"0",
          "nivel":"2",
          "idpadre": idPadreSelect
        }
      }
      else{
        body = {
          "nombre":nombreGrupo,
          "indactivo":true,
          "orden":"0",
          "nivel":"1"
        }
      }
      
         await dispatch(newGroup(body))
         await hiddenModal();      
         await LLamadaGetGrupos();
         dispatch(guardadoSuccess(!successApiGrupo))
   }

    /////////////////////////////////////////////////////////////////////////// 

    const showModal = () => {
      setIsModalVisible(true);    
    };
  
    const hiddenModal = () => {
      setIsModalVisible(false);
    };
    
    function onChange(e) {
      if (e.target.checked){
        document.getElementById("seleccionPadre").style.display = "block";
        settienePadre('si')
      }
      else{
        document.getElementById("seleccionPadre").style.display = "none";
        settienePadre('no')
      }
    }

    const nuevoBoton = 
    <>
       <Button type="primary" onClick={nuevoGrupo}>Guardar</Button>
       <Button onClick={hiddenModal}>Cancelar</Button>
    </>

    return (
      <>

        <Tooltip title="Crear un nuevo grupo"> 
             <Button type="primary" onClick={showModal}>Nuevo</Button>
        </Tooltip>

        <Modal
          title="Crear nuevo grupo"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center', marginTop:'-20px'}}>
                <Divider>Nombre del nuevo grupo</Divider>
                <Input onChange={event => setnombreGrupo(event.target.value)} placeholder="Nombre del nuevo grupo" />
                </Col>
         </Row>
         <br/>
         <Row>
              <Col span={24} style={{textAlign:'left'}}>
                <Checkbox onChange={onChange}>Este grupo pertenece a otro de nivel superior</Checkbox>
              </Col>
              <Col id='seleccionPadre' span={24} style={{textAlign:'center',display:'none'}}>
                <Select
                     placeholder= {props.nombreGrupoActual}
                     style={{width: '100%', marginTop: '10px', paddingLeft: 0 }}
                     onChange = {(evento) => setidPadreSelect(evento)}
                 >

                     { apiDataGrupos.map( (stateObject,index) => {
                         return (

                             <Option value={stateObject.idgrupo} key={index}>{stateObject.nombre}</Option>
                         );
                     } ) }
                 </Select>
              </Col>
         </Row>
        <h3>{props.codean}</h3>
        
        </Modal>
      </>
    );
  };



export default ModalGroupNew









