import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

import {
  watchFetchTasks,
  watchFetchTask,
  watchFetchTasksCount,
  watchFetchTasksByUser,
  watchFetchTaskList,
  watchFetchTaskForm,
  watchEditTask,
  watchFetchTaskMessage,
  watchEditTaskMessage,
  watchFetchTaskAssigneeUser,
  watchFetchTaskListUser
} from './tasks/sagas';

import {
  watchRefreshToken,
  watchLogin,
  watchLogout,
  watchCheckLogin
} from './auth/sagas';

import {
  watchStartProcess,
  watchGetTaskVariables,
  watchContinueProcess,
  watchCompleteTaskProcess,
  watchGetTaskForm
} from './forms/sagas';

import {
  watchloadCommercialDeals,
  watchCreateCommercialDeal,
  watchloadFamilies,
  watchloadSubFamilies,
  watchloadProducts,
  watchloadUsers,
  watchgetUsersCount,
  watchloadBrands,
  watchloadSubBrands,
  watchloadDealTypes,
  watchEditCommercialDeal
} from './commercialDeals/sagas';

import {
  watchfetchPlans,
  watchcreatePlan,
  watchfetchDelegados,
  watchfetchSubmarcaCollections,
  watchcreateSubmarcaCollection,
  watchupdatePlan,
  watchfetchPlan,
  watchupdatePlans,
} from './planes-compra/sagas'

import{
  watchloadMenuItems,
  watchloadChildItems
} from './menu/sagas';

import{
  watchfetchOrders,
  watchsearchOrder,
  watchfetchOrdersById,
  watchcountOrders,
  watchdeleteOrderById,
  watchdeleteOrderLineById,
  watchchangeOrderStatusById,
  watchfetchOrderStates,
  watchfetchOrderProducts,
} from './orders/sagas';

import{
  watchfetchProducts,
} from './products/sagas';

import{
  watchfetchSalesByYear,
  watchfetchSalesByMonth,
  watchfetchSalesByDay,
  watchfetchSalesByHour,
  watchfetchClientsData,
  watchfetchPendingTasks
} from './charts/sagas';


import {
  watchloadClientsIndas,
  watchloadEntitiesInda,
  watchloadWholesalersIndas,
  watchEditClientIndas,
  // watchSearchClientBy,
  watchGetClientsCount,
  watchupdateClient,
  watchgetClient,
  watchgetClientEntities,
  watchgetClientStatisticsPurchase,
  watchgetClientStatisticsPurchaseGroups,
    watchgetClientPlans,
  watchgetEntityPuntos,
  watchcreateEntityPuntos,
} from './clients-indas/sagas';

import {
	watchloadClientesCbim,
	watchloadClienteCbimEntidades,
} from './clientes-cbim/sagas';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchUserById(),
    watchFetchTasks(),
    watchFetchTask(),
    watchFetchTasksCount(),
    watchFetchTasksByUser(),
    watchFetchTaskForm(),
    watchFetchTaskList(),
    watchRefreshToken(),
    watchCheckLogin(),
    watchLogin(),
    watchLogout(),
    watchStartProcess(),
    watchGetTaskForm(),
    watchGetTaskVariables(),
    watchContinueProcess(),
    watchCompleteTaskProcess(),
    watchloadCommercialDeals(),
    watchloadFamilies(),
    watchloadSubFamilies(),
    watchloadProducts(),
    watchloadBrands(),
    watchloadSubBrands(),
    watchloadUsers(),
    watchgetUsersCount(),
    watchloadDealTypes(),
    watchloadMenuItems(),
    watchloadChildItems(),
    watchCreateCommercialDeal(),
    watchloadClientsIndas(),
    watchloadEntitiesInda(),
    watchloadWholesalersIndas(),
    watchfetchOrders(),
    watchcountOrders(),
    watchsearchOrder(),
    watchfetchOrdersById(),
    watchdeleteOrderById(),
    watchfetchSalesByYear(),
    watchfetchSalesByMonth(),
    watchfetchSalesByDay(),
    watchfetchSalesByHour(),
    watchfetchClientsData(),
    watchfetchPendingTasks(),
    watchloadClientesCbim(),
    watchdeleteOrderLineById(),
    watchloadClienteCbimEntidades(),
    watchEditTask(),
    watchEditCommercialDeal(),
    watchFetchTaskMessage(),
    watchEditTaskMessage(),
    watchFetchTaskAssigneeUser(),
    watchEditClientIndas(),
    // watchSearchClientBy(),
    watchGetClientsCount(),
    watchFetchTaskListUser(),
    watchchangeOrderStatusById(),
    watchfetchOrderStates(),
    watchfetchOrderProducts(),
    watchfetchPlans(),
    watchcreatePlan(),
    watchfetchDelegados(),
    watchfetchSubmarcaCollections(),
    watchcreateSubmarcaCollection(),
    watchfetchPlan(),
    watchupdatePlan(),
    watchupdatePlans(),
    watchgetClient(),
    watchgetClientEntities(),
    watchgetClientStatisticsPurchase(),
    watchgetClientStatisticsPurchaseGroups(),
    watchgetClientPlans(),
    watchupdateClient(),
    watchgetEntityPuntos(),
    watchcreateEntityPuntos(),
  ]);
}
