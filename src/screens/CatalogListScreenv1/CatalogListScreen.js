import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import utils from "../../lib/utils"
import {getHeaders} from "../../lib/restClient"
import { Table, Tag, Button, Space, Pagination,Switch, Select, Tooltip, Row, Input } from 'antd';
import {Maincontainer} from './styled';
import ModalCatalogo from '../../components/ModalCatalogo/ModalCatalogo';
import ModalEditProducto from '../../components/ModalEditProducto/ModalEditProducto';
import { CheckSquareOutlined, EditOutlined, WarningOutlined } from '@ant-design/icons';
import { activarModal, getProductRedux } from '../../modules/products/actions';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ModalEditCodIndas from '../../components/ModalEditCodIndas/ModalEditCodIndas';
import ModalEditCodIndasConfirmar from '../../components/ModalEditCodIndas/ModalEditCodIndasConfirmar';
import ModalBloqueoMayorista from '../../components/ModalBloqueoMayorista/ModalBloqueoMayorista';

const { Option,OptGroup } = Select;


function CatalogListScreen(props){   

// const [apiDataPosts, setapiDataPosts] = useState([]);
const [visible, setvisible] = useState(false);
const [order_id, setorder_id] = useState("");
const dispatch = useDispatch()
const successApiGrupo = useSelector((state) => state.products.success);
const apiDataPosts = useSelector((state) => state.products.getAllProducts);
const [searchText, setsearchText] = useState("");
const [searchedColumn, setsearchedColumn] = useState("");



useEffect(() => {   
  dispatch(getProductRedux())
}, [successApiGrupo])



/////////////////////////////////////////////////////////////////////////////////

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

  function colores (indbloqueo,campoNombre,campoCod,campoID,texto){
      if (indbloqueo){
        return(
        <>
        <p style= {{color: '#fbbe41'}}>{texto}<a>
        <ModalEditCodIndasConfirmar
        nombreProducto = {campoNombre}
        codindasactual = {campoCod}
        idProducto = {campoID}
      /></a></p></>);
      }
      else{
        return(
          <><p style= {{color: '#32a6ff'}}>{texto}<a>
        <ModalEditCodIndas
        tituloModal = {campoNombre}
        codindasactual = {campoCod}
        idProducto = {campoID}
      /></a></p></>
        );
      }
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
        width: '7%',
        render: (text,row) => 
        <p>{colores(row.ind_bloqueo_codindas,row.nombre,row.codindas,row.idproducto,text)}</p>,
        sorter: (a, b) => a.codindas - b.codindas,
      },
      
      {
        title: 'COD Nacional',
        dataIndex: 'codnacional',
        key: 'codnacional',
        width: '8%',
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
        title: 'Bloqueo Mayorista',
        dataIndex: 'ind_bloqueo_mayorista',
        key: 'ind_bloqueo_mayorista',
        render: (text, row) => 
        
        <ModalBloqueoMayorista 
        tituloModal = {row.nombre}
        indbloqueoM = {row.ind_bloqueo_mayorista}
        idProducto = {row.idproducto}
        />,
        sorter: (a, b) => a.ind_bloqueo_mayorista - b.ind_bloqueo_mayorista,

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