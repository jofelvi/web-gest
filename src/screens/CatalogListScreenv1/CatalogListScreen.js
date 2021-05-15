import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import utils from "../../lib/utils"
import {getHeaders} from "../../lib/restClient"
import { Table, Tag, Button, Space, Pagination,Switch, Select, Tooltip, Row, Input } from 'antd';
import {Maincontainer} from './styled';
import ModalCatalogo from '../../components/ModalCatalogo/ModalCatalogo';
import ModalEditProducto from '../../components/ModalEditProducto/ModalEditProducto';
import { EditOutlined } from '@ant-design/icons';
import { activarModal } from '../../modules/products/actions';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Option,OptGroup } = Select;


function CatalogListScreen(props){   

const [apiDataPosts, setapiDataPosts] = useState([]);
const [visible, setvisible] = useState(false);
const [order_id, setorder_id] = useState("");
const dispatch = useDispatch()

const successApiGrupo = useSelector((state) => state.products.success);
let token = utils.getAuthToken()


/////////////////////////////////////////////////////////////////////////////////



const [searchText, setsearchText] = useState("");
const [searchedColumn, setsearchedColumn] = useState("");

let searchInput 

const getColumnSearchProps = dataIndex => ({
      
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
              searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        {/* <Space>                                 NO FUNCIONA EN LA VERSION 3.19 DE ANTD REVISAR EN UN FUTURO - Guillermo L.*/}  
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
                 &nbsp;&nbsp; {/*Se añade este espacio en blanco forzado por que no funciona "Space" de antd.*/}
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpiar
          </Button>
          
        {/* </Space> */}
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setsearchText( selectedKeys[0])
    setsearchedColumn(dataIndex)
  };


  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('')
  };


////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {   
      LLamadaGetProducto()
    }, [successApiGrupo])

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
   
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        render: text => <a>{text}</a>,
        sorter: (a, b) =>  a.nombre.localeCompare(b.nombre),
        ...getColumnSearchProps('nombre')
      },
      {
        title: 'COD Indas',
        dataIndex: 'codindas',
        key: 'codindas',
        render: text => <>{text}</>,
        sorter: (a, b) => a.codindas - b.codindas,
      },
      {
        title: 'COD Nacional',
        dataIndex: 'codnacional',
        key: 'codnacional',
        render: text => <>{text}</>,
        sorter: (a, b) => a.codnacional - b.codnacional,
      },
      {
        title: 'Categoria',
        dataIndex: 'nombrefamilia',
        key: 'nombrefamilia',
        render: text => <>{text}</>,
        sorter: (a, b) =>  a.nombrefamilia.localeCompare(b.nombrefamilia),
        ...getColumnSearchProps('nombrefamilia')
      },
      {
        title: 'Marca',
        dataIndex: 'nombremarca',
        key: 'nombremarca',
        render: text => <>{text}</>,
        sorter: (a, b) =>  a.nombremarca.localeCompare(b.nombremarca),
        ...getColumnSearchProps('nombremarca')
      },
      {
        title: 'Submarca',
        dataIndex: 'nombresubmarca',
        key: 'nombresubmarca',
        render: text => <>{text}</>,
        sorter: (a, b) =>  a.nombresubmarca.localeCompare(b.nombresubmarca),
        ...getColumnSearchProps('Submarca')
      },
      {
        title: 'Grupo',
        dataIndex: 'nombregrupo',
        key: 'nombregrupo',
        ...getColumnSearchProps('nombregrupo'),
        render: (text,row) => 
        <div>
          {text} 
          <a>
          <ModalEditProducto
            tituloModal = {row.nombre}
            nombreGrupoActual = {row.nombregrupo}
            idProducto = {row.idproducto}
          />
          </a>
        </div>  ,
        sorter: (a, b) =>  a.nombregrupo.localeCompare(b.nombregrupo),
      },
      {
          title: 'Activo',
          dataIndex: 'indactivo',
          key: 'indactivo',
          render: (text, row) => 
          
          <Switch defaultChecked={row.indactivo} checkedChildren="SI" unCheckedChildren="NO" disabled={true} onChange={""}></Switch>
        },
          {
            render:(text, row) => 
                
                <ModalCatalogo
                nombreProducto = {row.nombre}
                 codean = {row.codean13}
                 indactivo = {row.indactivo}
                 indcatpuntos = {row.indcatpuntos}
                 ocultarRelacion = {row.ocultar_rela}
                 indsolofarmacia = {row.indsolofarmacia}
                 idproducto = {row.idproducto}
                 pvp = {row.pvp}
                 pvm = {row.pvm}
                 pvl = {row.pvl}
                 puntosacumulado = {row.puntosacumulado}
                 puntoscoste = {row.puntoscoste}
                 descripcion = {row.descripcion}
                 codindas = {row.codindas}
                 codnacional = {row.codnacional}
                 codean13 = {row.codean13}
                 nombrefamilia ={row.nombrefamilia}
                 nombremarca ={row.nombremarca}
                 nombresubmarca ={row.nombresubmarca}
                 nombregrupo ={row.nombregrupo}
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