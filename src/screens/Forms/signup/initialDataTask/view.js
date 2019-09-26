import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Form, Input, Checkbox, Row, Col, Button } from 'antd';

import { selectTaskVariable } from '../../lib';

const validationSchema = Yup.object().shape({
  user: Yup.string().required(),
  nif: Yup.string().required(),
  isDemo: Yup.bool().required(),
  acceptTerms: Yup.bool().required(),
});

const InitialDataTask = ({
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
          user:
            taskVariables && selectTaskVariable(taskVariables, 'user')
              ? selectTaskVariable(taskVariables, 'user').value
              : '',
          nif:
            taskVariables && selectTaskVariable(taskVariables, 'nif')
              ? selectTaskVariable(taskVariables, 'nif').value
              : '',
          isDemo:
            taskVariables && selectTaskVariable(taskVariables, 'isDemo')
              ? selectTaskVariable(taskVariables, 'isDemo').value
              : false,
          acceptTerms:
            taskVariables && selectTaskVariable(taskVariables, 'acceptTerms')
              ? selectTaskVariable(taskVariables, 'acceptTerms').value
              : false,
        }}
        onSubmit={values => {
          const variables = [];
          Object.entries(values).map(value => {
            const taskVariable = {
              name: value[0],
              value: value[1],
              type: `${(typeof value[1])
                .charAt(0)
                .toUpperCase()}${(typeof value[1]).slice(1)}`,
              transient: false,
            };
            return variables.push(taskVariable);
          });
          completeTask({ variables, history, taskId, procId });
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <Col span={12}>
            <Form onSubmit={handleSubmit}>
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Form.Item label="Usuario">
                    <Input
                      value={values.user}
                      onChange={handleChange('user')}
                      onBlur={handleBlur('user')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Form.Item label="NIF">
                    <Input
                      value={values.nif}
                      onChange={handleChange('nif')}
                      onBlur={handleBlur('nif')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Form.Item label="Solicito periodo de Demo">
                    <Checkbox
                      checked={values.isDemo}
                      value={values.isDemo}
                      onChange={handleChange('isDemo')}
                      onBlur={handleBlur('isDemo')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Form.Item label="Acepto las condiciones legales">
                    <Checkbox
                      checked={values.acceptTerms}
                      value={values.acceptTerms}
                      onChange={handleChange('acceptTerms')}
                      onBlur={handleBlur('acceptTerms')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
      </Formik>
    </Row>
  );
};

InitialDataTask.propTypes = {
  completeTask: PropTypes.func.isRequired,
};

export default withRouter(InitialDataTask);
