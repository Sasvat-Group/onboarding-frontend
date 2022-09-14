import { Button, Form, FormInstance, Input, Row, Col, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
import { UserDataSchema } from '../../../../type/user';
const { Option } = Select;

interface Props {
    user_data: UserDataSchema;
    tools_data: any;
    config_data: any;
    onFinish: (form: FormInstance, values: any) => void;
    onFinishFailed: (error: any) => void;
    isDisable?: boolean;
}

const UserAccessForm: FC<Props> = ({
    user_data,
    tools_data,
    config_data,
    onFinish,
    onFinishFailed,
    isDisable,
}) => {
    const disable = isDisable == undefined ? false : isDisable;
    // const project_data_list = user_data.projects.map(p=>p.project_name)
    // const children: React.ReactNode[] = [];
    // console.log("length::")
    // console.log(user_data.projects)
    // console.log(user_data.projects.length)
// for (let i = 0; i < user_data.projects.length; i++) {
//     console.log(user_data.projects[i])
//   children.push(<Option key={user_data.projects[i].project_name}>{user_data.projects[i].project_name}</Option>);
// }
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
        user_data["projects"] = user_data.projects
        
        form.setFieldsValue(user_data);
    }, [form, user_data]);

   

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
      };
    console.log(user_data)
    return (
        <Skeleton loading={isLoading}>
            <Row>
                <Col xl={8} lg={12} span={24}>
                    <Form
                        name="user"
                        form={form}
                        initialValues={user_data}
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
                            rules={[{ message: 'Please input your email!' }]}
                        >
                            <Input readOnly={disable} />
                        </Form.Item>
                        <Form.Item
                            label="Employee Id"
                            name="employee_id"
                            rules={[{ message: 'Please input employee!' }]}
                        >
                            <Input readOnly={disable} />
                        </Form.Item>
                        <Form.Item
                            label="Base Location"
                            name="base_location"
                            rules={[{ message: 'Please base location!' }]}
                        >
                            <Input readOnly={disable} />
                        </Form.Item>
                        <p> {typeof(user_data.projects)} </p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handleChange}
                        >
                            {/* {
                            user_data.projects.map((data: any) => {
            return (
              <Option key={data.project_id} value={data.project_name}>
                {data.project_name}
              </Option> */}
            {/* );
          } */}
                            {/* {children}  */}
                        </Select>
                        <br />
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

export default UserAccessForm;
