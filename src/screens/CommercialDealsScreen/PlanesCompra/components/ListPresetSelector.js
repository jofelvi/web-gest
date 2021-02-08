import React from 'react';
import PropTypes from 'prop-types';
import {List, Typography, Divider, Select, Modal, Checkbox, Button, Col, Row, Input, Spin} from 'antd';
import { UpOutlined, DownOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import _ from 'underscore';

const { Option } = Select;

class ListPresetSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            preset: [],
            selected: '',
            showCreateModal: false,
            createPresetName: '',
            saveLoading: false,
        }

        this.isPresetChanged = this.isPresetChanged.bind( this );
        this.savePreset = this.savePreset.bind( this );
        this.cancelSavePreset = this.cancelSavePreset.bind( this )
        this.savePresetSuccessCallback = this.savePresetSuccessCallback.bind( this );
        this.savePresetErrorCallback = this.savePresetErrorCallback.bind( this );
        this.onSetPreset = this.onSetPreset.bind( this );
    }

    onSetPreset(selected) {
        const { options, onSetPreset } = this.props;
        const preset = _.find(options, (o) => (o.label==selected) )

        this.setState({ selected, preset:  _.clone( preset.options ) })
        onSetPreset( preset )

    }

    componentWillUpdate(props) {
    }

    isPresetChanged() {
        const { preset, selected } = this.state;
        const { values, options } = this.props;

        if ( preset.length != values.length ) {
            return true;
        }

        for ( let i in values  ) {
            if ( preset.indexOf( preset[ i ] ) == -1 ) {
                return true;
            }
        }
        return false;
    }

    savePreset() {
        this.props.savePreset( this.state.createPresetName, this.props.values, this.savePresetSuccessCallback, this.savePresetErrorCallback)
        this.setState({ saveLoading: true })
    }
    savePresetSuccessCallback( preset ) {
        this.setState( { createPresetName: '', showCreateModal: false, saveLoading: false, selected: preset.nombre, preset: _.clone(preset.submarcas) })
        this.props.reload()

    }
    savePresetErrorCallback() {
        this.setState( { saveLoading: false })
    }
    cancelSavePreset() {
        this.setState({ showCreateModal: false })
    }

    render() {
        const { options } = this.props;
        const { createPresetName } = this.state;
        const { saveLoading, loading } = this.state;

        return (
            <React.Fragment>
                <Select
                    style={{width:'200px', marginBottom: '10px', marginRight: '10px'}}
                    value={ this.isPresetChanged() ? '' : this.state.selected }
                    onChange={this.onSetPreset}
                >
                    <Option value={''}>- Personalizado - </Option>
                    { options.map((option) => (
                        <Option value={ option.value }>{ option.label }</Option>
                    )) }
                </Select>
                <Button disabled={ ! this.isPresetChanged() } onClick={() => { this.setState({ showCreateModal: true } ) }}>Guardar selección</Button>
                <Modal
                    title="Guardar colección de submarcas"
                    visible={this.state.showCreateModal}
                    onOk={this.savePreset}
                    onCancel={this.cancelSavePreset}
                    okButtonProps={{
                        disabled: saveLoading
                    }}
                    okText={ saveLoading ? (<Spin/>) : 'Crear' }
                >
                    Especificar nombre:
                    <Input disabled={saveLoading} value={ createPresetName } onChange={ ( e ) => { this.setState({ createPresetName: e.target.value }) } } />
                </Modal>
            </React.Fragment>
        );
    };

}
ListPresetSelector.propTypes = {
};

export default ListPresetSelector;
