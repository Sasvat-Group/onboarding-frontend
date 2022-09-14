import React, { FC } from 'react';
import { Table } from 'antd';
import roleColumns from './RoleColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const RoleTable: FC<Props> = ({ data, loading }) => {
  return (
    <Table
      columns={roleColumns}
      loading={loading}
      size="middle"
      dataSource={data}
      rowKey="id"
    />
  );
};

export default RoleTable;
