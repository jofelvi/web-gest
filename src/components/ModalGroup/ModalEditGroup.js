import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select, Tooltip, Input, Checkbox, Divider  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { newGroup,editGroup,guardadoSuccess,convertirPadre} from '../../modules/group/actions';




const ModalEditGroup = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const successApiGrupo = useSelector((state) => state.products.success);
    let token = utils.getAuthToken();
    const [nombreGrupo, setnombreGrupo] = useState(props.nombreAGrupo);
    const dispatch = useDispatch()
    let padresGrupo = [];
    const [apiDataGrupos, setapiDataGrupos] = useState([]);
    const [idPadreSelect, setidPadreSelect] = useState();
    const [tienePadre, settienePadre] = useState('no');
    const [mostrarserPadre, setmostrarserPadre] = useState('no');
    const [activarBoton, setactivarBoton] = useState('none');
    const { Option,OptGroup } = Select;



    useEffect(() => {   
        LLamadaGetGrupos()
      }, [])



      ////////////////////////////////////////////////////////  LLAMADA API GET GRUPOS NO SE PONE EN REDUX POR DIFICULTAD DE VARIABLES (PENDIENTE)
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
    ///////////////////////////////////////////////////////////// PASAR UN HIJO A PADRE

    const pasarHijosPadre = async() =>{
        let body = {
            "nivel":"1",
            "idpadre":null
          }
           await dispatch(convertirPadre(props.idGrupo,body))
           await hiddenModal();      
           await LLamadaGetGrupos();
           dispatch(guardadoSuccess(!successApiGrupo))
     }

    ///////////////////////////////////////////////////////////// FUNCION PARA EDITAR EL GRUPO 
    const editarGroup = async() =>{
      let body;
      if(tienePadre == 'si'){
        body = {
          "nombre":nombreGrupo,
          "orden":"0",
          "nivel":"2",
          "idpadre": idPadreSelect
        }
      }
      else{
        body = {
          "nombre":nombreGrupo
        }
      }
      
         await dispatch(editGroup(props.idGrupo,body))
         await hiddenModal();      
         await LLamadaGetGrupos();
         dispatch(guardadoSuccess(!successApiGrupo))
   }

    ////////////////////////////////////////////////////////////    FUNCION DEL CHECKBOX , MUESTRA UN DESPLEGABLE CON LOS PADRES QUE PUEDE SELECCIONAR

    function onChange(e) {
        if (e.target.checked){
          document.getElementById("seleccionPadre").style.display = "block";
          if (mostrarserPadre == 'si'){document.getElementById("serPadre").style.display = "none";}
          settienePadre('si')
          
        }
        else{
          document.getElementById("seleccionPadre").style.display = "none";
          if (mostrarserPadre == 'si'){document.getElementById("serPadre").style.display = "inline";}
          settienePadre('no')

        }
      }

/////////////////////////////////////////////////////////////// FUNCION QUE MODIFICA EL DIVIDER SI EL GRUPO ES DE NIVEL 1 O 2
   function nombrePadre(idpadre,idgrupo){
    if(idpadre == idgrupo ){
        return(
            <>
                 <Divider><b>No tiene nivel superior asociado</b></Divider>
                <Checkbox onChange={onChange}>Seleccionar un nivel superior</Checkbox>
            </>
        )
    }
    else{
        let padreid = props.idPadre - 1
        return(
            <>
        <Divider>nivel superior asociado: <b>{apiDataGrupos.map( (stateObject,index) => {
                 if (stateObject.idgrupo == props.idPadre){
                         return (
                               stateObject.nombre
                             );
                    }   
             } )}</b>
        </Divider>
        <Checkbox onChange={onChange}>Seleccionar un nivel superior distinto</Checkbox>
        </>
        )
    }
   }
/////////////////////////////////////////////////////////////// 
    const showModal = () => {
    if (props.idPadre != props.idGrupo){
        setmostrarserPadre('si')
        setactivarBoton('inline')
    }
      setnombreGrupo(props.nombreAGrupo)
      setIsModalVisible(true);    
    };
  
    const hiddenModal = () => {
      setnombreGrupo(props.nombreAGrupo)
      setIsModalVisible(false);
      setmostrarserPadre('no')
      setactivarBoton('none')
    };
    

    const nuevoBoton = 
    <>
       <Button type="primary" id="serPadre" style={{display:activarBoton}} onClick={pasarHijosPadre}>Eliminar dependencias de nivel</Button>
       <Button type="primary" onClick={editarGroup}>Guardar</Button>
       <Button onClick={hiddenModal}>Cancelar</Button>
    </>



    return (
      <>

        <Tooltip title="Editar grupo"> 
             <Button  onClick={showModal}>Editar Grupo</Button>
        </Tooltip>

        <Modal
          title="Editar Grupo"
          visible={isModalVisible}
          footer={nuevoBoton}
          destroyOnClose={true}
          onCancel={hiddenModal}
        >
        
        <Row>
              <Col span={24} style={{textAlign:'center', marginTop:'-20px'}}>
                <Divider>Nombre del grupo: <b>{props.nombreAGrupo}</b></Divider>
                <Input onChange={event => setnombreGrupo(event.target.value)} placeholder='Nuevo nombre' />
                </Col>
         </Row>
         <br/>
         <Row>
         {nombrePadre(props.idPadre,props.idGrupo)}
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



export default ModalEditGroup

