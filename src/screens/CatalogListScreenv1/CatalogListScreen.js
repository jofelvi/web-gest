import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import utils from "../../lib/utils"
import {getHeaders} from "../../lib/restClient"
import { Table, Tag, Button, Space, Pagination,Switch, Select } from 'antd';
import {Maincontainer} from './styled';
import ModalCatalogo from '../../components/ModalCatalogo/ModalCatalogo';
import ModalEditProducto from '../../components/ModalEditProducto/ModalEditProducto';
import Select_MP from '../../components/ModalEditProducto/Select_MP';


const { Option,OptGroup } = Select;


function CatalogListScreen(props){   

const [apiDataPosts, setapiDataPosts] = useState([]);
const [visible, setvisible] = useState(false);
const [order_id, setorder_id] = useState("");


// const token = useSelector((state) => state.auth.token);
let token = utils.getAuthToken()

    useEffect(() => {   
      LLamadaGetProducto()
    }, [])

        const LLamadaGetProducto = async() =>{
            let response = await axios.get('http://ec2-54-194-246-228.eu-west-1.compute.amazonaws.com:8083/ntr/producto', {
                headers: {  
                  'Content-Type': 'application/json',
                  accept: 'application/json',
                  Authorization: `Bearer ${token}` }
              })
              .then((response) => {
                setapiDataPosts(response.data)   
                console.log(JSON.stringify(response.data[0]))                         
                })
             .catch((error) => { 
                console.log("mensaje de error llamada API: ",error)   
                 })
        }

        
    const showModal = (id) => {
        setvisible(true)
        setorder_id(id)
     };

     function onChange(checked) {
      alert ("El producto esta desactivado")
    }
    

    
   
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        render: text => <a>{text}</a>,
        sorter: (a, b) =>  a.nombre.localeCompare(b.nombre),
      },
      {
        title: 'COD Indas',
        dataIndex: 'codindas',
        key: 'codindas',
        render: text => <a>{text}</a>,
        sorter: (a, b) => a.codindas - b.codindas,
      },
      {
        title: 'COD Nacional',
        dataIndex: 'codnacional',
        key: 'codnacional',
        render: text => <a>{text}</a>,
        sorter: (a, b) => a.codnacional - b.codnacional,
      },
      {
        title: 'Familia',
        dataIndex: 'nombrefamilia',
        key: 'nombrefamilia',
        render: text => <a>{text}</a>,
        sorter: (a, b) =>  a.nombrefamilia.localeCompare(b.nombrefamilia),
      },
      {
        title: 'Marca',
        dataIndex: 'nombremarca',
        key: 'nombremarca',
        render: text => <a>{text}</a>,
        sorter: (a, b) =>  a.nombremarca.localeCompare(b.nombremarca),
      },
      {
        title: 'Submarca',
        dataIndex: 'nombresubmarca',
        key: 'nombresubmarca',
        render: text => <a>{text}</a>,
        sorter: (a, b) =>  a.nombresubmarca.localeCompare(b.nombresubmarca),
      },
      {
        title: 'Grupo',
        dataIndex: 'nombregrupo',
        key: 'nombregrupo',
        render: text => <a>{text}</a>,
        sorter: (a, b) =>  a.nombregrupo.localeCompare(b.nombregrupo),
      },
      {
          title: 'Activo',
          dataIndex: 'indactivo',
          key: 'indactivo',
          render: (text, row) => 
          
          <Switch defaultChecked={row.indactivo} onChange={onChange}></Switch>
        },
        {
          render:(text, row) => 
              <ModalEditProducto
               //codean = {row.codean13}
              >
            </ModalEditProducto>
        },
          {
            // title: 'OPERACION',
            // dataIndex: 'descripcion',
            // key: 'descripcion',
            render:(text, row) => 
                
                <ModalCatalogo
                 codean = {row.codean13}
                 idproducto = {row.idproducto}
                 onClick={() => {
                const id = row.idproducto
                showModal(id);
              }}>
              </ModalCatalogo>
          }
        
    ]

 





    




        return(
            <Maincontainer>
                <div className="table-indas table-indas-new">
                <h2 className="table-indas-title">Catálogo</h2>
            <Table 
                    columns={columns} 
                    dataSource={apiDataPosts}
                    className="table"
                    pagination={{
                        pageSize: 500,
                        total: 5,
                        showSizeChanger: false,
                        position: ['bottomLeft']

                      }}
                /> 
             
                </div>
            </Maincontainer>
        )


}



export default CatalogListScreen;