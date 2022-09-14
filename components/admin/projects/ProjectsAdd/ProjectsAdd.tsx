import React, { FC, useEffect, useState } from 'react';

import { Form, Input, Button, FormInstance, Skeleton, Row, Col, Tabs } from 'antd';
import { useRouter } from 'next/router';
import ProjectTools from '../ProjectTools/ProjectTools';
import ProjectKtLinks from '../ProjectKtLinks/ProjectKtLinks';
import ProjectDesgTools from '../ProjectDesgTools/ProjectDesgTools';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const ProjectsAdd: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const { TabPane } = Tabs;
  const disable = isDisable == undefined ? false : isDisable;
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isDisabled = id == undefined;
  function callback(key: any) {
    console.log(key);
  }

  const handleOnFinish = (values: any) => {
    setSaving(true);
    if (onFinish) {
      onFinish(form, values);
      setSaving(false);
    }
  };

  const handleOnFinishFail = (error: any) => {
    if (onFinishFailed) {
      onFinishFailed(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue(initValues);
  }, [form, initValues]);

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Basic Info" key="1">
        <Skeleton loading={isLoading}>
          <Row>
            <Col xl={8} lg={12} span={24}>
              <Form
                name="projects"
                form={form}
                initialValues={initValues}
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFail}
                autoComplete="off"
                layout="vertical"
              >
                <br />
                <Form.Item
                  label="Project Code"
                  name="project_code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Project Code!',
                    },
                  ]}
                >
                  <Input readOnly={disable} />
                </Form.Item>
{/* 
                <Form.Item
                  label="Project Name"
                  name="project_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Project Name!',
                    },
                  ]}
                >
                  <Input readOnly={disable} />
                </Form.Item> */}
                <Form.Item
                  label="Display Name"
                  name="display_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Display Name!',
                    },
                  ]}
                >
                  <Input readOnly={disable} />
                </Form.Item>

                <Form.Item
                  label="Project Details"
                  name="project_details"
                  rules={[
                    {
                      required: false,
                      message: 'Please input Project Details!',
                    },
                  ]}
                >
                  <Input.TextArea readOnly={disable} />
                </Form.Item>

                {/* <Form.Item
                  label="KT Description"
                  name="kt_description"
                  rules={[
                    {
                      required: false,
                      message: 'Please input KT Description!',
                    },
                  ]}
                >
                  <Input.TextArea readOnly={disable} />
                </Form.Item> */}

                {disable == false && (
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={disable}
                      loading={isSaving}
                    >
                      {id == undefined ? 'Submit' : 'Update'}
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </Col>
          </Row>
        </Skeleton>
      </TabPane>
      <TabPane tab="Tools" key="2" disabled={isDisabled}>
        <ProjectTools />
      </TabPane>
      <TabPane tab="Designation:Tools" key="3" disabled={isDisabled}>
        <ProjectDesgTools />
      </TabPane>
      <TabPane tab="KT Links" key="4" disabled={isDisabled}>
        <ProjectKtLinks />
      </TabPane>
    </Tabs>
  );
};

export default ProjectsAdd;
