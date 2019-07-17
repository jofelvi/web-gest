import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropType from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Form, Input, Row, Col, Button, Checkbox } from 'antd';
import { transformData, selectTaskVariable } from '../../lib';

const validationSchema = Yup.object().shape({
  useTrello: Yup.bool().required(),
  password: Yup.string().required(),
});

const RemainingDataTask = ({
  getTaskVariables,
  taskVariables,
  completeTask,
  history,
}) => {
  useEffect(() => {
    getTaskVariables();
  }, [getTaskVariables]);

  return (
    <Row type="flex" justify="center">
      <Formik
        initialValues={{
          useTrello:
            taskVariables && selectTaskVariable(taskVariables, 'useTrello')
              ? selectTaskVariable(taskVariables, 'useTrello').value
              : false,
          password:
            taskVariables && selectTaskVariable(taskVariables, 'password')
              ? selectTaskVariable(taskVariables, 'password').value
              : '',
        }}
        onSubmit={values => {
          const variables = transformData(values);
          completeTask({ variables, history });
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col span={24}>
                <Form.Item label="Contraseña">
                  <Input
                    className="mb-4"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.password}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Uso Trello como gestor de tareas">
                  <Checkbox
                    type="checkbox"
                    name="useTrello"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.useTrello}
                    checked={values.useTrello}
                  />{' '}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" onClick={handleSubmit}>
                    Enviar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

RemainingDataTask.propTypes = {
  completeTask: PropType.func.isRequired,
  getTaskVariables: PropType.func.isRequired,
};

export default withRouter(RemainingDataTask);
