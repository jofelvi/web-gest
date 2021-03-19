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
import {DatePickerFromTo, InputBox, InputsContainer} from "../../../../lib/styled";
import {DownOutlined, ExclamationCircleOutlined, UpOutlined} from "@ant-design/icons";
import {get} from "lodash";
import * as moment from "moment";
import {
    CheckboxPasswordReset,
    ConfirmationText,
    ContentContainer,
    Label,
    TextContainer
} from "../../../../components/Clients-Indas/styles";
import ModalTaskDetail from "../../../../components/ModalTaskDetail";

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class PuntosActionCreate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            puntos: '',
            descripcion: '',
            fecha: '',
            fechaValue: '',
            idpedido: '',
            errorMessage: false,
            loading: false,
        }

        this.onError = this.onError.bind( this );
        this.onSuccess = this.onSuccess.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    onError(error) {
        this.setState( { loading:false,errorMessage: 'Error al guardar movimiento.' } )
    }

    onSuccess() {
        const { onClose } = this.props;
        onClose();
        this.setState( { loading: false } )
    }

    onSubmit() {

    }

    render() {
        const { puntos, loading, errorMessage, fecha, fechaValue, descripcion, idpedido } = this.state;
        const { onClose, visible } = this.props;
        return (
            <ModalTaskDetail
                visible={ visible }
                handleCancel={ onClose }
                titleModal={
                    <div>
                        <ExclamationCircleOutlined style={{ color: 'orange', padding: '0px 10px 0px 0px' }}/>
                        Añadir movimiento de puntos
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
                        <Label>Puntos</Label>
                        <Input
                            id={'puntos'}
                            value={ puntos }
                            onChange={ ( { target } ) => { this.setState({ puntos: target.value })} }
                        />

                        <Label>Descripcion</Label>
                        <Input
                            id={'descripcion'}
                            value={ descripcion }
                            onChange={ ( { target } ) => { this.setState({ descripcion: target.value })} }
                        />

                        <Label>Puntos</Label>
                        <Input
                            id={'fecha'}
                            value={ fecha }
                            onChange={ ( { target } ) => { this.setState({ fecha: target.value })} }
                        />

                        <Label>Puntos</Label>
                        <Input
                            id={'idpedido'}
                            value={ idpedido }
                            onChange={ ( { target } ) => { this.setState({ idpedido: target.value })} }
                        />
                        {errorMessage && (<div style={{ color: 'red' }}>{errorMessage}</div>)}
                    </ContentContainer> }>
            </ModalTaskDetail>
        );
    };

}
PuntosActionCreate.propTypes = {
};

export default  connect(
    state => ({
    }),
    {  }
)( PuntosActionCreate );
