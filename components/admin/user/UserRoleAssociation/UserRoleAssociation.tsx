import { Button, Drawer, Form, Select } from 'antd';
import React, { FC } from 'react';
import { RoleFormDataWithID } from '../../../../type/roles';

interface Props {
  onClose: () => void;
  visible: boolean;
  notAssociateRole: RoleFormDataWithID[];
  onHandleFinish: (values: { role_id: number }) => void;
}

const { Option } = Select;

const UserRoleAssociation: FC<Props> = ({
  onClose,
  visible,
  notAssociateRole,
  onHandleFinish,
}) => {
  return (
    <Drawer
      title="Assign Role"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form layout="vertical" initialValues={{}} onFinish={onHandleFinish}>
        <Form.Item
          label="Role"
          name="role_id"
          rules={[{ required: true, message: 'Please Select role!' }]}
        >
          <Select>
            {notAssociateRole.map((role: RoleFormDataWithID) => {
              return (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign Role
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserRoleAssociation;
