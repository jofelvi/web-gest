import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider, Radio} from 'antd';
import {DatePickerFromTo, InputBox, InputsContainer} from "../../../lib/styled";
import OrderFilterEntity from "../../OrderListScreen/components/OrderFilterEntity";
import {DownOutlined, ExclamationCircleOutlined, UpOutlined} from "@ant-design/icons";
import {get} from "lodash";
import * as moment from "moment";
import {
    CheckboxPasswordReset,
    ConfirmationText,
    ContentContainer,
    Label,
    TextContainer
} from "../../../components/Clients-Indas/styles";
import {getMessageEditMail} from "../../../components/Clients-Indas/constants";
import {handleInput, handleInputChecked} from "../../../lib/forms";
import ModalTaskDetail from "../../../components/ModalTaskDetail";
import { editClientIndas } from '../../../modules/clients-indas/actions';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class ActionEmailEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.entidad ? props.entidad.codcli_cbim : 0,
            ind_renovar_pass: false,
            email: props.entidad && props.entidad.cliente_email ? props.entidad.cliente_email : '',
            errorMessage: false,
            name: props.entidad ? props.entidad.nombre : '',
        }

        this.onError = this.onError.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    onError(error, email_is_used) {
        if ( email_is_used ) {
            this.setState( { errorMessage: 'El email ya está en uso.' } )
        } else {
            this.setState( { errorMessage: 'Error al guardar cliente.' } )
        }
    }

    onSubmit() {
        const { email, ind_renovar_pass } = this.state;
        const { onClose, editClientIndas, entidad } = this.props;
        editClientIndas({
            id: entidad.idcliente, email, ind_renovar_pass,
            success: onClose,
            error: this.onError,
        });
    }

    render() {
        const { ind_renovar_pass, email, nombre, errorMessage } = this.state;
        const { onClose, visible, entidad } = this.props;
        return (
            <ModalTaskDetail
                visible={ visible }
                handleCancel={ onClose }
                titleModal={
                    <div>
                        <ExclamationCircleOutlined style={{ color: 'orange', padding: '0px 10px 0px 0px' }}/>
                        Cambio de Email
                    </div>}
                footer={[
                    <Button
                        key="back"
                        onClick={ onClose }>
                        Atrás
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={ this.onSubmit }>
                        Guardar
                    </Button>
                ]}
                content={
                    <ContentContainer>
                        <TextContainer>
                            {getMessageEditMail(entidad.nombre)}
                        </TextContainer>
                        <ConfirmationText>Confirme por favor el cambio.</ConfirmationText>
                        <Label>Editar Email</Label>
                        <Input
                            id={'email'}
                            value={ email == '' ? entidad.cliente_email : email }
                            onChange={ ( { target } ) => { this.setState({ email: target.value })} }
                        />
                        {errorMessage === 'Este email ya existe' && (<div style={{ color: 'red' }}>{errorMessage}</div>)}
                        <CheckboxPasswordReset
                            onChange={ ( value ) => { this.setState({ ind_renovar_pass: value })} }
                            checked={ ind_renovar_pass }
                        >
                            Enviar correo de renovación de contraseña.
                        </CheckboxPasswordReset>
                    </ContentContainer> }>
            </ModalTaskDetail>
        );
    };

}
ActionEmailEdit.propTypes = {
};

export default  connect(
    state => ({
    }),
    { editClientIndas }
)( ActionEmailEdit );
