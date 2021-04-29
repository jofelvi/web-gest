import React, { useEffect, useState } from 'react';
import CreateCommercialDealNew from '../CommercialDealsScreenNew/createCommercialDeal/CreateCommercialDeal';
import { Button, Spin } from 'antd';
import { Maincontainer } from "../../lib/styled";
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import axios from 'axios'
import utils from "../../lib/utils";
import {getByIdAcuerdoComerciale} from "../../modules/acuerdosComer/actions";

const AcuerdosComercialesEdit = (props) => {
	const history = useHistory()
	const { id } = useParams()
	const [acuerdo, setAcuerdo] = useState({})
	const dispatch = useDispatch()
	const acuerdoAc = useSelector((state) => state.acuerdosComer.acuerdoAc);

	useEffect(()=>{
		//editAcuerdosComerciales()
		dispatch(getByIdAcuerdoComerciale(id))
	},[])



	return (
		<Maincontainer>
			<div className="table-indas table-indas-new">
				<Button type="link" onClick={() => { history.push('/acuerdos-comerciales') }}>
					<LeftOutlined /> Atrás
				</Button>
				{acuerdoAc ? (
					<CreateCommercialDealNew acuerdoComercial={acuerdoAc} />
				) : (<Spin style={{ display: 'block', marginBottom: '10px' }} />)}
				<Button type="link" onClick={() => { history.push('/acuerdos-comerciales') }}>
					<LeftOutlined /> Atrás
				</Button>
			</div>
		</Maincontainer>
	);

}

export default AcuerdosComercialesEdit