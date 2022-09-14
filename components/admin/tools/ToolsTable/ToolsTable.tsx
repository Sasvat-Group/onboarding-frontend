import React, { FC } from 'react';
import { Table } from 'antd';
import toolsColumns from './toolsColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const ToolsTable: FC<Props> = ({ data , loading }) => {
  return (
    <Table
      columns={toolsColumns}
      dataSource={data}
      size="middle"
      rowKey="id"
      loading={loading}
    />
  );
};

export default ToolsTable;
