import { Button, Drawer, Form, Select } from 'antd';
import React, { FC } from 'react';
import { ProjectFormDataWithID } from '../../../../type/projects';

interface Props {
  onClose: () => void;
  visible: boolean;
  notAssociateTools: ProjectFormDataWithID[];
  onHandleFinish: (values: { project_id: number }) => void;
}

const { Option } = Select;

const ProjectToolsAssociation: FC<Props> = ({
  onClose,
  visible,
  notAssociateTools,
  onHandleFinish,
}) => {
  return (
    <Drawer
      title="Assign Tools"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form layout="vertical" initialValues={{}} onFinish={onHandleFinish}>
        <Form.Item
          label="Tool"
          name="tool_id"
          rules={[{ required: true, message: 'Please Select tool!' }]}
        >
          <Select>
            {notAssociateTools.map((tools: ProjectFormDataWithID) => {
              return (
                <Option key={tools.id} value={tools.id}>
                  {tools.display_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign Tools
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ProjectToolsAssociation;
