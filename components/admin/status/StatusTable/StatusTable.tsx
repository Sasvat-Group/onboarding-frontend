import React, { FC } from 'react';
import { Table } from 'antd';
import statusColumns from './statusColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const StatusTable: FC<Props> = ({ data , loading }) => {
  return (
    <Table
      columns={statusColumns}
      dataSource={data}
      size="middle"
      rowKey="id"
      loading={loading}
    />
  );
};

export default StatusTable;
