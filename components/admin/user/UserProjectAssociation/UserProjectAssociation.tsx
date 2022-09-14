import { Button, Drawer, Form, Select } from 'antd';
import React, { FC } from 'react';
import { ProjectFormDataWithID } from '../../../../type/projects';

interface Props {
  onClose: () => void;
  visible: boolean;
  notAssociateProject: ProjectFormDataWithID[];
  onHandleFinish: (values: { project_id: number }) => void;
}

const { Option } = Select;

const UserProjectAssociation: FC<Props> = ({
  onClose,
  visible,
  notAssociateProject,
  onHandleFinish,
}) => {
  return (
    <Drawer
      title="Assign Project"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form layout="vertical" initialValues={{}} onFinish={onHandleFinish}>
        <Form.Item
          label="Project"
          name="project_id"
          rules={[{ required: true, message: 'Please Select project!' }]}
        >
          <Select>
            {notAssociateProject.map((project: ProjectFormDataWithID) => {
              return (
                <Option key={project.id} value={project.id}>
                  {project.display_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign Project
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserProjectAssociation;
