import React from 'react'
import { Select } from 'antd'
import _ from 'underscore'

const DualListFilter = (props) => {
    const { options, value } = props
    const { Option } = Select

    const changeValue = (value) => {
        props.onChange(value)
    }

    return (
        <>
            <Select value={value || ''} style={{ width: '96%', marginLeft: '2%' }} onChange={changeValue} disabled={options.length === 0}>
                <Option value={''}>- Seleccionar -</Option>
                {options.map((option) => {
                    return (<Option value={option.value}>{option.label}</Option>)
                })}
            </Select>
        </>
    )
}

export default DualListFilter