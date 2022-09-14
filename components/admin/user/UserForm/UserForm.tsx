import { Button, Form, FormInstance, Input, Row, Col, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const UserForm: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const disable = isDisable == undefined ? false : isDisable;

  const [form] = Form.useForm();
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

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
            name="user"
            form={form}
            initialValues={initValues}
            onFinish={handleOnFinish}
            onFinishFailed={handleOnFinishFail}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="ID" name="id" hidden={true}>
              <Input readOnly={disable} hidden={true} />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input readOnly={disable} />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name">
              <Input readOnly={disable} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input readOnly={disable} />
            </Form.Item>

            <Form.Item
              label="Employee Id"
              name="employee_id"
              rules={[{ required: true, message: 'Please input for employee_id!' }]}
            >
              <Input readOnly={disable} />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <Input readOnly={disable} />
            </Form.Item>
            <Form.Item
              label="Base Location"
              name="base_location"
              rules={[{ required: true, message: 'Please input for base location!' }]}
            >
              <Input readOnly={disable} />
            </Form.Item>
            <Form.Item
              hidden={id == undefined ? false : true}
              label="Password"
              name="password"
              rules={[
                { required: false, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder="input password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              {/* <Input readOnly={disable} type="password" /> */}
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

export default UserForm;
