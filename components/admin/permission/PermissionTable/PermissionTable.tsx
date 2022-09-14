import React, { FC } from 'react';
import { Table } from 'antd';
import permissionColumns from './PermissionColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const PermissionTable: FC<Props> = ({ data , loading }) => {
  return (
    <Table
      columns={permissionColumns}
      size="middle"
      dataSource={data}
      rowKey="id"
      loading={loading}
    />
  );
};

export default PermissionTable;
