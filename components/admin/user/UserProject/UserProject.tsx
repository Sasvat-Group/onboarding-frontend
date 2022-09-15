import { withRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { get, post } from '../../../../util/servercall';
import type { Router } from 'next/router';
import { Button, Table } from 'antd';
import {
  deleteProjectByUser,
  getUserProject,
  getUserProjectNotassociate,
} from '../../../../url/admin';
import ProjectRoleAssociation from '../../projects/ProjectToolsAssociation/ProjectToolsAssociation';
import UserProjectAssociation from '../UserProjectAssociation/UserProjectAssociation';
import DeAllocateItem from '../../../Actions/DeAllocateItem';
import { Modules } from '../../../../type/module';

interface Props {
  router: Router;
}

const UserProject: FC<Props> = (props) => {
  const id = props.router.query.id as string;
  const [userProject, setUserProject] = useState([]);
  const [notAssociateProject, setNotAssociateProject] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  console.log(notAssociateProject);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onComponentUpdate = () => {
    setLoading(true);
    get(getUserProject(id)).then((response) => {
      setUserProject(response.data.projects);
      setLoading(false);
    });

    get(getUserProjectNotassociate(id)).then((response) => {
      setNotAssociateProject(response.data);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const columns = [
    {
      title: 'Project Name',
      key: 'project_name',
      dataIndex: 'display_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => {
        return (
          <DeAllocateItem
            path={`/admin/users/${id}`}
            module={Modules.USER}
            deletePath={deleteProjectByUser(id)}
            onComponentUpdate={onComponentUpdate}
            body={{ project_id: record.id }}
          />
        );
      },
      width: '20%',
    },
  ];

  const onHandleUserAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: { project_id: number }) => {
    const id = props.router.query.id as string;
    post(getUserProject(id), values).then((response) => {
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
          Assign Project
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userProject}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <UserProjectAssociation
        onClose={onClose}
        visible={visible}
        notAssociateProject={notAssociateProject}
        onHandleFinish={onHandleFinish}
      />
    </div>
  );
};

export default withRouter(UserProject);
