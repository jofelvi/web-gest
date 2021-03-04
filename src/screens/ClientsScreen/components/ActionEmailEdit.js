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

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class ActionEmailEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    onSubmit() {
        //editClientIndas({id, email: values.email, ind_renovar_pass: values.ind_renovar_pass});

    }

    render() {
        return (
            <ModalTaskDetail
                visible={ loading == 'email' }
                handleCancel={ () => { this.setState( { loading: false} ) }}
                titleModal={
                    <div>
                        <ExclamationCircleOutlined style={{ color: 'orange', padding: '0px 10px 0px 0px' }}/>
                        Cambio de Email
                    </div>}
                footer={[
                    <Button
                        key="back"
                        onClick={(e)=> {
                            setFormKey();
                            this.setState( { loading: false} )
                            //setCurrentClientEmail({ currentEmail: '' });
                        }}>
                        Atrás
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={(e) => {
                            this.setState( { loading: false} )
                        }}>
                        Guardar
                    </Button>
                ]}
                content={
                    <ContentContainer>
                        <TextContainer>
                            {getMessageEditMail(nameClient)}
                        </TextContainer>
                        <ConfirmationText>Confirme por favor el cambio.</ConfirmationText>
                        <Label>Editar Email</Label>
                        <Input
                            id={'email'}
                            value={values.email}
                            onChange={handleInput(setFieldValue, 'email')}
                            onBlur={handleBlur}
                        />
                        {errorMessage === 'Este email ya existe' && (<div style={{ color: 'red' }}>{errorMessage}</div>)}
                        <CheckboxPasswordReset onChange={handleInputChecked(setFieldValue, 'ind_renovar_pass')} checked={values.ind_renovar_pass}>
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
    {  }
)( ActionEmailEdit );
