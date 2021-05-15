import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const CompletedForm = () => 
    <Result
        status="success"
        title="¡ Tarea Completada !"
        subTitle=""
        extra={[
            <Link className="ant-btn ant-btn-primary" to="/tasks">Más Tareas</Link>      
            ]} 
    />;

export default CompletedForm;