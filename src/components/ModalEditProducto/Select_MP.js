import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Row, Col, Slider, Select  } from 'antd';
import utils from "../../lib/utils"
import axios from 'axios';

const { Option,OptGroup } = Select;

const Select_MP = (props) => {




    const [apiDataPosts, setapiDataPosts] = useState([]);
    let token = utils.getAuthToken()
    let padresGrupo = [];
    let hijosGrupo = [];
    let PadreHijoGrupo = [];
    

    useEffect(()=>{
        LLamadaGetGrupos()
    },[])

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
            setapiDataPosts(padresGrupo)
        }







///////////////////////////////////////////////////////////////



// const [apiDataPosts, setapiDataPosts] = useState([]);



// // const token = useSelector((state) => state.auth.token);
// let token = utils.getAuthToken()

//     useEffect(() => {   
//       LLamadaGetProducto()
//     }, [])

//         const LLamadaGetProducto = async() =>{
//             let response = await axios.get('http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/producto', {
//                 headers: {  
//                   'Content-Type': 'application/json',
//                   accept: 'application/json',
//                   Authorization: `Bearer ${token}` }
//               })
//               .then((response) => {
//                 setapiDataPosts(response.data)   
//                 console.log(JSON.stringify(response.data[0]))                         
//                 })
//              .catch((error) => { 
//                 console.log("mensaje de error llamada API: ",error)   
//                  })
//         }


/////////////////////////////////////////////////////////////








    return (
      <>
     {console.log(JSON.stringify(apiDataPosts))}

        <Select
            placeholder= "Seleccione grupo"
            style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
        >
            
            { apiDataPosts.map( (stateObject,index) => {
                return (
                    
                    <Option style={ stateObject.children ? {paddingLeft: 40 } : null} key={index}>{stateObject.nombre}</Option>
                );
            } ) }
        </Select>

      </>
      );
    
    }




export default Select_MP









