import { withRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { get, post } from '../../../../util/servercall';
import type { Router } from 'next/router';
import { Button, Table } from 'antd';
import UserRoleAssociation from '../UserRoleAssociation/UserRoleAssociation';
import {
  deleteRoleByUser,
  getUserRole,
  getUserRoleNotassociate,
} from '../../../../url/admin';
import { Modules } from '../../../../type/module';
import DeAllocateItem from '../../../Actions/DeAllocateItem';

interface Props {
  router: Router;
}

const UserRole: FC<Props> = ({ router }) => {
  const id = router.query.id as string;

  const [userRole, setUserRole] = useState([]);
  const [notAssociateRole, setNotAssociateRole] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  console.log(notAssociateRole);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onComponentUpdate = () => {
    setLoading(true);
    get(getUserRole(id)).then((response) => {
      setUserRole(response.data.roles);
      setLoading(false);
    });

    get(getUserRoleNotassociate(id)).then((response) => {
      setNotAssociateRole(response.data);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const columns = [
    {
      title: 'Role Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => {
        return (
          <DeAllocateItem
            path={`/admin/users/${id}`}
            module={Modules.USER}
            deletePath={deleteRoleByUser(id)}
            onComponentUpdate={onComponentUpdate}
            body={{ role_id: record.id }}
          />
        );
      },
      width: '20%',
    },
  ];

  const onHandleUserAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: { role_id: number }) => {
    const id = router.query.id as string;
    post(getUserRole(id), values).then((response) => {
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
          Assign Role
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userRole}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <UserRoleAssociation
        onClose={onClose}
        visible={visible}
        notAssociateRole={notAssociateRole}
        onHandleFinish={onHandleFinish}
      />
    </div>
  );
};

export default withRouter(UserRole);
