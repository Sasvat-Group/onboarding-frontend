import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Form, FormInstance, Input, Row, Skeleton } from 'antd';
import { useRouter } from 'next/router';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const RoleForm: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const disable = isDisable == undefined ? false : isDisable;

  const router = useRouter();
  const { id } = router.query;

  const [form] = Form.useForm();
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
    <Skeleton loading={isLoading}>
      <Row>
        <Col xl={8} lg={12} span={24}>
          <Form
            name="roles"
            form={form}
            initialValues={initValues}
            onFinish={handleOnFinish}
            onFinishFailed={handleOnFinishFail}
            autoComplete="off"
            layout="vertical"
          >
            <br/>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input Name!',
                },
              ]}
            >
              <Input readOnly={disable} />
            </Form.Item>

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
  );
};

export default RoleForm;
