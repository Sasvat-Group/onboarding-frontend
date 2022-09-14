import React, { FC } from 'react';
import { Table } from 'antd';
import designationColumns from './designationColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const DesignationsTable: FC<Props> = ({ data , loading }) => {
  return (
    <Table
      columns={designationColumns}
      dataSource={data}
      size="middle"
      rowKey="id"
      loading={loading}
    />
  );
};

export default DesignationsTable;
