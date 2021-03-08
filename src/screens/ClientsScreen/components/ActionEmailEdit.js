import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Checkbox,
    Switch,
    DatePicker,
    Input,
    Button,
    Col,
    Row,
    Select,
    Tooltip,
    ConfigProvider,
    Radio,
    Spin
} from 'antd';
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
            loading: false,
            name: props.entidad ? props.entidad.nombre : '',
        }

        this.onError = this.onError.bind( this );
        this.onSuccess = this.onSuccess.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    onError(error, email_is_used) {
        if ( email_is_used ) {
            this.setState( { loading:false, errorMessage: 'El email ya está en uso.' } )
        } else {
            this.setState( { loading:false,errorMessage: 'Error al guardar cliente.' } )
        }
    }

    onSuccess() {
        const { onClose } = this.props;
        onClose();
        this.setState( { loading: false } )
    }

    onSubmit() {
        const { email, ind_renovar_pass } = this.state;
        const { editClientIndas, entidad } = this.props;
        this.setState( { loading: true })
        editClientIndas({
            id: entidad.idcliente, email, ind_renovar_pass,
            success: this.onSuccess,
            error: this.onError,
        });
    }

    render() {
        const { ind_renovar_pass, email, nombre, errorMessage, loading } = this.state;
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
                        Cancelar
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={ this.onSubmit }>
                        { loading ? <Spin /> : 'Guardar' }
                    </Button>
                ]}
                content={
                    <ContentContainer>
                        <TextContainer>
                            {getMessageEditMail(entidad.nomcli_cbim)}
                        </TextContainer>
                        <ConfirmationText>Confirme por favor el cambio.</ConfirmationText>
                        <Label>Editar Email</Label>
                        <Input
                            id={'email'}
                            value={ email == '' ? entidad.cliente_email : email }
                            onChange={ ( { target } ) => { this.setState({ email: target.value })} }
                        />
                        {errorMessage && (<div style={{ color: 'red' }}>{errorMessage}</div>)}
                        <CheckboxPasswordReset
                            onChange={ ({target} ) => { this.setState({ ind_renovar_pass: target.checked })} }
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
