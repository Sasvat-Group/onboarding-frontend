import { withRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { get, post } from '../../../../util/servercall';
import type { Router } from 'next/router';
import { Button, Table } from 'antd';
import ProjectToolsAssociation from '../ProjectToolsAssociation/ProjectToolsAssociation';
import { createProjectKtLinks, getProjectKtLinks, getProjectTools, getProjectToolsNotassociate } from '../../../../url/admin';
import ProjectKtLinksAssociation from '../ProjectKtLinksAssociation/ProjectKtLinksAssociation';

interface Props {
  router: Router;
}


const ProjectKtLinks: FC<Props> = (props) => {
  const [projectKtLinks, setprojectKtLinks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const id = props.router.query.id as string;

  const onComponentUpdate = () => {
    
    setLoading(true);
    get(getProjectKtLinks(id)).then((response) => {
      console.log(response)
      setprojectKtLinks(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const columns = [
    {
      title: 'Name',
      key: 'display_name',
      dataIndex: 'display_name',
    },
    {
        title: "Url",
        key: 'kt_url',
        dataIndex: 'kt_url',
    }
  ];

  const onHandleUserAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: any) => {
    const id = props.router.query.id as string;
    const body = values.kt_links.map((v: any) => ({...v, project_id: id}))
    console.log(body)
    post(createProjectKtLinks, body).then((response) => {
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
          Assign KT Links
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={projectKtLinks}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <ProjectKtLinksAssociation
        onClose={onClose}
        visible={visible}
        onHandleFinish={onHandleFinish}
        project_id= {id}
      />
    </div>
  );
};

export default withRouter(ProjectKtLinks);
