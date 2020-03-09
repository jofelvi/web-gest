import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

import {
  watchFetchTasks,
  watchFetchTask,
  watchFetchTasksCount,
  watchFetchTasksByUser,
  watchFetchTaskList,
  watchFetchTaskForm,
 
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
  watchloadBrands,
  watchloadSubBrands,
  watchloadDealTypes
} from './commercialDeals/sagas';

import{
  watchloadMenuItems,
  watchloadChildItems
} from './menu/sagas';

import{
  watchfetchOrders,
  watchsearchOrder,
  watchfetchOrdersById,
  
} from './orders/sagas';
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
  watchloadWholesalersIndas
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
    watchloadDealTypes(),
    watchloadMenuItems(),
    watchloadChildItems(),
    watchCreateCommercialDeal(),
    watchloadClientsIndas(),
    watchloadEntitiesInda(),
    watchloadWholesalersIndas(),
    watchfetchOrders(),
    watchsearchOrder(),
    watchfetchOrdersById(),
    watchfetchSalesByYear(),
    watchfetchSalesByMonth(),
    watchfetchSalesByDay(),
    watchfetchSalesByHour(),
    watchfetchClientsData(),
    watchfetchPendingTasks(),
		watchloadClientesCbim(),    
		watchloadClienteCbimEntidades(),    
  ]);
}
