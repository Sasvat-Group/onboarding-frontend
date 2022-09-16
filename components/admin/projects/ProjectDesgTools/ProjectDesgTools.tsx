import { withRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { get, post } from '../../../../util/servercall';
import type { Router } from 'next/router';
import { Button, Form, Table, Tag } from 'antd';
import ProjectDesgToolsAssociation from '../ProjectDesgToolsAssociation/ProjectDesgToolsAssociation';
import { allDesignationToolsURL, createProjectKtLinks, designationToolsURL, DESIGNATION_GETALL } from '../../../../url/admin';

interface Props {
  router: Router;
}


const ProjectDesgTools: FC<Props> = (props) => {
  const [designationTools, setDesignationTools] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedDesgnation, setSelectedDesignation] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    form.resetFields()
    setVisible(false);
  };
  const id = props.router.query.id as string;

  const onComponentUpdate = () => {
    
    setLoading(true);
    get(allDesignationToolsURL(id)).then((response) => {
      console.log(response)
      setDesignationTools(response.data);
      setLoading(false);
    });

    get(DESIGNATION_GETALL).then((response) => {
      setDesignations(response.data);
  });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  console.log(designations)

  const columns = [
    {
      title: 'Designation',
      key: 'designation_name',
      dataIndex: 'designation_name',
    },
    {
        title: "Tool",
        key: 'tools',
        dataIndex: 'tools',
        render: (tools: [string]) => {
          return (
            tools.map((tool: string) => <Tag color="blue" key={tool}>
                {tool}
              </Tag>)
          )
        }
    }
  ];

  const onHandleUserAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: any) => {
    
    const id = props.router.query.id as string;
    const project_id = Number(props.router.query.id as string)
    const designation_id = values.designation_name
    let body = values.desgn_tools.map((v: any) => ({tool_id: v, project_id: project_id, designation_id: designation_id}))
    body["designation_id"] = designation_id
    console.log(body)   
    form.resetFields()
    post(designationToolsURL(id), body).then((response) => {
      onComponentUpdate();
      onClose();
    });
  };

  return (
    <div>
      <div className="flex justify-end pb-3">
        <Button
          type="primary"
          className="button-right"
          onClick={onHandleUserAddClick}
        >
          Assign Tools To designation
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={designationTools}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <ProjectDesgToolsAssociation
        onClose={onClose}
        designations= {designations}
        visible={visible}
        onHandleFinish={onHandleFinish}
        project_id= {id}
        form = {form}
      />
    </div>
  );
};

export default withRouter(ProjectDesgTools);
