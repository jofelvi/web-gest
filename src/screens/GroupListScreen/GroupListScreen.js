import React,{useEffect,useState} from 'react';
import { Maincontainer } from '../CatalogListScreenv1/styled';
import {useDispatch, useSelector} from 'react-redux';
import utils from "../../lib/utils"
import axios from 'axios';
import { Col, Table, Row, Divider } from 'antd';
import ModalGroupNew from '../../components/ModalGroup/ModalGroupNew';
import ModalEditGroup from '../../components/ModalGroup/ModalEditGroup';
import ModalDelGroup from '../../components/ModalGroup/ModalDelGroup';




const GroupListScreen = (props) => {  
   
    
    let token = utils.getAuthToken();
    let padresGrupo = [];
    const [apiDataGrupos, setapiDataGrupos] = useState([]);
    const successReloadGroup = useSelector((state) => state.products.successG);
    const successApiGrupo = useSelector((state) => state.products.success);


    ///////////////////////////////////////////////////////////////////////////  LLAMADA API GET GRUPOS
    useEffect(() => {   
        LLamadaGetGrupos()
      }, [successApiGrupo])

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
                  'idpadre': obj.idgrupo,
                  'hijo':false

                })
              }
              else{
                padresGrupo.push({
                  'idgrupo': `${obj.idgrupo}`,
                  'nombre':`${obj.nombre}`,
                  'idpadre':obj.idpadre,
                  'hijo':true
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


    /////////////////////////////////////////////////////////////////////////// FORMACION COLUMNAS TABLA GRUPOS

    


    const columns = [
        {
          title: 'Id Grupo',
          dataIndex: 'idgrupo',
          key: 'idgrupo',
          render: text => <a>{text}</a>
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          render: (text,row) =>{
             if (row.idgrupo != row.idpadre){
               return(
                <a>{`\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 ${text}`}</a>
               )
             }
             else{
               return(
                 <a>{text}</a>
               )
             }


          }
          
          // <a>{text}</a>
        },  
        {
            title: '',
            dataIndex: '',
            key: '',
            render: (text,row) => <ModalEditGroup
            nombreAGrupo = {row.nombre}
            idPadre = {row.idpadre}
            idGrupo = {row.idgrupo}
            />
          },
        {
          title: '',
          dataIndex: '',
          key: '',
          render: (text,row) => <ModalDelGroup
          nombreGrupo = {row.nombre}
          idGrupo = {row.idgrupo}

          />
        }   
      ]



        return(  /////////////////////////////////////////////////////////////////// RENDER GENERAL DE LA PAGINA
            <Maincontainer>
                <div className="table-indas table-indas-new">
                <h2 className="table-indas-title">Grupos</h2>
                <Row>
                     <Col span={24} style={{textAlign:'left'}}>
                        <ModalGroupNew></ModalGroupNew>
                     </Col> 
                </Row>
                <br/>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                         <Table 
                             columns={columns} 
                             dataSource={apiDataGrupos}
                             className="table"
                             pagination={{
                                 pageSize: 500,
                                 total: 5,
                                 showSizeChanger: false,
                                 position: ['bottomLeft']
                            
                               }}
                         /> 
                     </Col>
                </Row>
                <br/>
                <Row>
                     <Col span={24} style={{textAlign:'right'}}>
                        <ModalGroupNew></ModalGroupNew>
                     </Col> 
                </Row>
                
             
                </div>
            </Maincontainer>
        )

  
}


export default GroupListScreen