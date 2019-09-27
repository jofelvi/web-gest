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
  fetchTask,
  history,
  match: {
    params: { taskId, procId },
  },
  task,
}) => {
  useEffect(() => {
    getTaskVariables({ history, taskId });
    if (!task) {
      fetchTask(taskId);
    }
  }, []);

  return (
    <Row type="flex" justify="center">
      <Formik
        initialValues={{
          password:
            taskVariables && selectTaskVariable(taskVariables, 'password')
              ? selectTaskVariable(taskVariables, 'password').value
              : '',
          useTrello:
            taskVariables && selectTaskVariable(taskVariables, 'useTrello')
              ? selectTaskVariable(taskVariables, 'useTrello').value
              : false,
        }}
        onSubmit={values => {
          const variables = transformData(values);
          completeTask({ variables, history, taskId, procId });
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
                    value={values.password}
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
                    value={values.useTrello}
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
