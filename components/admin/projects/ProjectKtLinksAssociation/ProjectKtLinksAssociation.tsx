import { Button, Drawer, Form, Select, Input, Space } from 'antd';
import React, { FC } from 'react';
import { ProjectFormDataWithID } from '../../../../type/projects';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


interface Props {
  onClose: () => void;
  visible: boolean;
  onHandleFinish: (values: { project_id: number }) => void;
  project_id: any;
}

const { Option } = Select;

const ProjectKtLinksAssociation: FC<Props> = ({
  onClose,
  visible,
  onHandleFinish,
  project_id
}) => {
  return (
    <Drawer
      title="Assign Kt Links"
      placement="right"
      onClose={onClose}
      visible={visible}
      width='50%'
    >
        {/* onFinish={onFinish} */}
     <Form name="dynamic_form_nest_item"  autoComplete="off" onFinish={onHandleFinish}>
      <Form.List name="kt_links">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'display_name']}
                  rules={[{ required: true, message: 'Missing Document Name' }]}
                >
                  <Input placeholder="Document Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'kt_url']}
                  rules={[{ required: true, message: 'Missing Document URL' }]}
                >
                  <Input placeholder="Document URL" />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Drawer>
  );
};

export default ProjectKtLinksAssociation;
