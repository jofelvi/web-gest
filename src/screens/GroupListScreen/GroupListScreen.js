import React,{useEffect,useState} from 'react';
import { Maincontainer } from '../CatalogListScreenv1/styled';
import utils from "../../lib/utils"
import axios from 'axios';
import { Col, Table, Row, Divider } from 'antd';




const GroupListScreen = (props) => {  
   
    
    let token = utils.getAuthToken();
    let padresGrupo = [];
    const [apiDataGrupos, setapiDataGrupos] = useState([]);
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
                  'idpadre': obj.idgrupo,
                  'hijo':false

                })
              }
              else{
                padresGrupo.push({
                  'idgrupo': `\u00a0\u00a0\u00a0 ${obj.idgrupo}`,
                  'nombre':`\u00a0\u00a0\u00a0 ${obj.nombre}`,
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
          render: (text, row) =><a>{text}</a>
        },  
        {
            title: 'Id Padre',
            dataIndex: 'idpadre',
            key: 'idpadre',
            render: text => <a>{text}</a>
          }  
      ]



        return(  /////////////////////////////////////////////////////////////////// RENDER GENERAL DE LA PAGINA
            <Maincontainer>
                <div className="table-indas table-indas-new">
                <h2 className="table-indas-title">Grupos</h2>
                <Row>
                <Col span={12} style={{textAlign:'center'}}><Divider><b>LISTADO DE GRUPOS</b></Divider>
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
                <Col span={12} style={{textAlign:'center'}}><Divider><b>CATEGORÍA</b></Divider> </Col>
                </Row>
                
             
                </div>
            </Maincontainer>
        )

  
}


export default GroupListScreen