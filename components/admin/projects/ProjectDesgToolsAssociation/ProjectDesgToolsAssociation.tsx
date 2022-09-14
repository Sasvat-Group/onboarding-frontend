import { Button, Checkbox, Divider, Drawer, Form, List, Select, Typography } from 'antd';
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { FC, useEffect, useState } from 'react';
import { DesignationsFormDataWithID } from '../../../../type/designations';
import { ProjectFormDataWithID } from '../../../../type/projects';
import { designationToolsURL } from '../../../../url/admin';
import { get } from '../../../../util/servercall';

interface Props {
  onClose: () => void;
  visible: boolean;
  designations: DesignationsFormDataWithID[];
  onHandleFinish: (values: { project_id: number }) => void;
  project_id: string;
  form: any;
}

const { Option } = Select;



const ProjectDesgToolsAssociation: FC<Props> = ({
  onClose,
  visible,
  designations,
  onHandleFinish,
  project_id,
  form
}) => {
  const [projectDesignationTools, setProjectDesignationTools] = useState([]);
  const [selectedProjectDesignationTools, setSelectedProjectDesignationTools] = useState([]);
  const [selectedDesgnation, setSelectedDesignation] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let selectedTools: any =[]
  let pdt: any = []

  const getToolsByDesg = async (value: { value: string; label: React.ReactNode }) => {
    setSelectedDesignation(true)
    const designationTools = await get(designationToolsURL(project_id) + `?designation_id=${value}`)
    const json_data = await designationTools.data
    selectedTools = json_data.selcted_desgn_tools_obj.map((tool: any) => (tool.tool_name))
    // selectedTools = Array.from({length: 3}, () => Math.floor(Math.random() * 6))
    console.log(selectedTools)
    pdt = json_data.all_tools.map((tool: any) => ({ label: tool.tool_name, value: tool.tool_id }))
    setProjectDesignationTools(pdt)
    setSelectedProjectDesignationTools(selectedTools)
  
  }

  console.log(selectedProjectDesignationTools)
  console.log(projectDesignationTools)
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log(checkedValues)
  };
  
  return (
    <Drawer
      title="Select Designation"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Form form={form} layout="vertical" initialValues={{designation_tools: selectedProjectDesignationTools}} onFinish={onHandleFinish}>
        <Form.Item
          label="Designation"
          name="designation_name"
          rules={[{ required: true, message: 'Please Select tool!' }]}
        >
          <Select onSelect={getToolsByDesg}>
            {designations.map((desg: DesignationsFormDataWithID) => {
              return (
                <Option key={desg.id} value={desg.id}>
                  {desg.display_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {
          selectedDesgnation &&
          <Form.Item name="desgn_tools" valuePropName="checked">
          <Checkbox.Group
            options={projectDesignationTools}
            // value={selectedProjectDesignationTools}
            // onChange={onChange}
          />
        </Form.Item>


          // <Form.Item
          //   label="Tools"
          //   name="desgnation_tools"
          //   initialValue={[selectedProjectDesignationTools]}
          // >
          //   {/* // {selectedProjectDesignationTools && */}
          //   <Checkbox.Group options={projectDesignationTools}
          //     onChange={onChange} />
          //   {/* // } */}
          // </Form.Item>

        }
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign Tools
          </Button>
        </Form.Item>
      </Form>
      { selectedDesgnation &&
      <><Divider>Assigned Tools</Divider><List
          // footer={<div>Footer</div>}
          bordered
          dataSource={selectedProjectDesignationTools}
          renderItem={item => (
            <List.Item>
              {item}
              {/* <Typography.Text mark></Typography.Text> */}
            </List.Item>
          )} /></>}
    </Drawer >
  );
};

export default ProjectDesgToolsAssociation;