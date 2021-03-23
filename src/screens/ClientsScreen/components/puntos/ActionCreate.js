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
import { InputBox, InputsContainer} from "../../../../lib/styled";
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
import { createEntityPuntos } from '../../../../modules/clients-indas/actions';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class PuntosActionCreate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            puntos: '',
            descripcion: '',
            fecha: moment().startOf('day').format( 'YYYY-MM-DD' ),
            fechaCaducidad: '',
            fechaValue: moment(),
            fechaCaducidadValue: '',
            idpedido: '',
            errorMessage: false,
            loading: false,
        }

        this.onError = this.onError.bind( this );
        this.onSuccess = this.onSuccess.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
        this.clearState = this.clearState.bind( this );
        this.onChangeDate = this.onChangeDate.bind( this );
    }

    clearState() {
        this.setState( {
            puntos: '',
            descripcion: '',
            fecha: moment().startOf('day').format( 'YYYY-MM-DD' ),
            fechaCaducidad: '',
            fechaValue: moment(),
            fechaCaducidadValue: '',
            idpedido: '',
            errorMessage: false,
            loading: false,
        } )
    }
    onError(error) {
        this.setState( { loading:false,errorMessage: 'Error al guardar movimiento.' } )
    }

    onSuccess() {
        const { onClose } = this.props;
        this.clearState()
        onClose();
    }

    onChangeDate( field, value ) {
        this.setState( { [field+'Value']: moment(value), [field]:   moment(value).startOf('day').format( 'YYYY-MM-DD' ) })
    }

    onSubmit() {
        this.setState( { loading: true } )
        this.props.createEntityPuntos( {
            codentidad_cbim: this.props.codentidad_cbim,
            movimiento: {
                puntos: this.state.puntos,
                descripcion: this.state.descripcion,
                fecha: this.state.fecha,
                idpedido: '' === this.state.idpedido ? null : this.state.idpedido,
            },
            success: this.onSuccess,
            error: this.onError,
        })
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
                        disabled={loading}
                        onClick={ onClose }>
                        Cancelar
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={loading}
                        onClick={ this.onSubmit }>
                        { loading ? <Spin /> : 'Guardar' }
                    </Button>
                ]}
                content={
                    <ContentContainer>
                        <Row>
                            <Col span={8} style={{padding: '10px'}}>
                                <Label>Puntos</Label>
                                <Input
                                    id={'puntos'}
                                    value={ puntos }
                                    onChange={ ( { target } ) => { this.setState({ puntos: target.value })} }
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} style={{padding: '10px'}}>
                        <Label>Descripcion</Label>
                        <Input
                            id={'descripcion'}
                            value={ descripcion }
                            onChange={ ( { target } ) => { this.setState({ descripcion: target.value })} }
                        />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{padding: '10px'}}>
                        <Label>Fecha Movimiento</Label>
                        <DatePicker
                            style={{width: '100%'}}
                            format={dateFormat}
                            disabled={true}
                            onChange={( value ) => ( this.onChangeDate('fecha', value ) ) }
                            value={this.state.fechaValue}
                        />
                            </Col>
                            <Col span={12} style={{padding: '10px'}}>

                        <Label>ID Pedido</Label>
                        <Input
                            id={'idpedido'}
                            value={ idpedido }
                            onChange={ ( { target } ) => { this.setState({ idpedido: target.value })} }
                        />
                            </Col>
                        </Row>
                        <br />

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
    { createEntityPuntos }
)( PuntosActionCreate );
