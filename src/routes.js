import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import utils from "./lib/utils";
import HomeScreen from "./screens/HomeScreen";
import UsersListScreen from "./screens/UsersListScreen";
import LoginScreen from "./screens/LoginScreen";
import TaskListScreen from "./screens/TaskListScreen";
import SignupScreen from "./screens/SignupScreen";
import CompletedForm from "./screens/Forms/completedForm";
import TaskFormScreen from "./screens/TaskFormScreen";
import CommercialDealsScreen from "./screens/CommercialDealsScreen";
import Promociones from "./screens/CommercialDealsScreen/Promociones";
import PlanesCompra from "./screens/CommercialDealsScreen/PlanesCompra";
import PlanesCompraCreate from "./screens/CommercialDealsScreen/PlanesCompra/create";
import PlanesCompraCopy from "./screens/CommercialDealsScreen/PlanesCompra/copy";
import PlanesCompraEdit from "./screens/CommercialDealsScreen/PlanesCompra/edit";
import Campanas from "./screens/CampanasScreen";
import CreateCampana from "./screens/CampanasScreen/createCampana";
import EditCampana from "./screens/CampanasScreen/editCampana";
import ClientsScreen from "./screens/ClientsScreen";
import ClientsShowScreen from "./screens/ClientsScreen/show";
import ClientsPuntosScreen from "./screens/ClientsScreen/puntos";
import ValidarRegistro from "./screens/Forms/registrar_cliente/validarRegistro";
import ValidarEntidad from "./screens/Forms/registrar_nueva_entidad/validarEntidad";
import ValidarPedido from "./screens/Forms/tramitar_pedido/validarPedido";
import OrderListScreen from "./screens/OrderListScreen";
import CatalogListScreen from "./screens/CatalogListScreenv1/CatalogListScreen";
import CommercialDealNew from "./screens/CommercialDealsScreenNew/CommercialDealNew";
import CreateCommercialDealNew from "./screens/CommercialDealsScreenNew/createCommercialDeal/ScreenCreateCommercialDeal";

import EntidadPuntosNegativos from "./screens/Forms/incidencia_puntos/entidadPuntosNegativos";
import ScrenEditCommercialDeal from "./screens/CommercialDealsScreenNew/EditCommercialDeal/ScrenEditCommercialDeal";
import ScrenCopyCommercialDeal from "./screens/CommercialDealsScreenNew/CopyCommercialDeal/ScrenEditCommercialDeal";
import ScrenCopyCampana from "./screens/CampanasScreen/CopyCampana/ScrenCopyCampana";
import GroupListScreen from "./screens/GroupListScreen/GroupListScreen";

const { capitalizeWord } = utils;

const Routes = ({ location: { pathname }, process, taskName }) => {
  const DynamicProcess = Loadable({
    loader: process
      ? () => import(`./screens/Forms/${process}`)
      : () => import(`./screens/${capitalizeWord(pathname.split("/")[2])}Screen`),
    loading() {
      return <div>Loading...</div>;
    },
  });

  const DynamicProcessForm = Loadable({
    loader: process && taskName ? () => import(`./screens/Forms/${process}/${taskName}`) : () => import(`./screens/Forms/${process}`),
    loading() {
      return <div>Loading...</div>;
    },
  });

  return (
    <Switch>
      <PrivateRoute path="/" exact component={HomeScreen} />
      <PrivateRoute path="/users" exact component={UsersListScreen} />
      <PrivateRoute path="/tasks" exact component={TaskListScreen} />
      <PrivateRoute path={`/task/:taskId/process/:procId`} exact component={TaskFormScreen} />
      <PrivateRoute path={`/process/:process`} exact component={DynamicProcess} />
      <PrivateRoute path={`/process/:process/:task`} exact component={DynamicProcessForm} />
      <PrivateRoute path={`/process/:process/complete`} exact component={CompletedForm} />
      <PrivateRoute path={`/task/completed`} exact component={CompletedForm} />
      <Route path="/login" exact component={LoginScreen} />
      <Route path="/process/signup" exact component={SignupScreen} />
      <PrivateRoute path="/commercial-deals" exact component={CommercialDealsScreen} />
      <PrivateRoute path="/planes-de-compra/" exact component={PlanesCompra} />
      <PrivateRoute path="/planes-de-compra/crear" exact component={PlanesCompraCreate} />
      <PrivateRoute path="/planes-de-compra/:id/editar" exact component={PlanesCompraEdit} />
      <PrivateRoute path="/planes-de-compra/:id/copiar" exact component={PlanesCompraCopy} />
      {
        // nuevas rutas
      }
      <PrivateRoute path="/acuerdos-comerciales/" exact component={CommercialDealNew} />
      <PrivateRoute path="/acuerdos-comerciales/crear" exact component={CreateCommercialDealNew} />
      <PrivateRoute path="/acuerdos-comerciales/:id/editar" exact component={ScrenEditCommercialDeal} />
      <PrivateRoute path="/acuerdos-comerciales/:id/copiar" exact component={ScrenCopyCommercialDeal} />
      <PrivateRoute path="/promociones" exact component={Promociones} />
      <PrivateRoute path="/campaña/crear" exact component={CreateCampana} />
      <PrivateRoute path="/campañas" exact component={Campanas} />
      <PrivateRoute path="/campaña/:id/editar" exact component={EditCampana} />
      <PrivateRoute path="/campaña/:id/copiar" exact component={ScrenCopyCampana} />
      <PrivateRoute path="/clientes" exact component={ClientsScreen} />
      <PrivateRoute path="/clientes/:id/expediente" exact component={ClientsShowScreen} />
      <PrivateRoute path="/clientes/:idcliente/entidades/:codentidad_cbim/puntos" exact component={ClientsPuntosScreen} />
      <PrivateRoute path="/pruebaform" exact component={ValidarRegistro} />
      <PrivateRoute path="/pruebaform2" exact component={ValidarPedido} />
      <PrivateRoute path="/orders" exact component={OrderListScreen} />
      <PrivateRoute path="/pruebaform3" exact component={ValidarEntidad} />
      <PrivateRoute path="/catalog-list" exact component={CatalogListScreen} />
      <PrivateRoute path="/puntos" exact component={EntidadPuntosNegativos} />
      {/* <PrivateRoute path="/group-list" exact component={GroupListScreen}/> */}
    </Switch>
  );
};

export default withRouter(
  connect(
    (state) => ({
      process: state.forms.process,
      taskName: state.forms.taskName,
    }),
    {}
  )(Routes)
);
