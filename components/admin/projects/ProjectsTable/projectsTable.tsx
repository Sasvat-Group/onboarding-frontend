import React, { FC } from 'react';
import { Table } from 'antd';
import ProjectsColumn from './projectsColumns';

interface Props {
  data: any[];
  loading: boolean;
}

const ProjectsTable: FC<Props> = ({ data, loading }) => {
  return (
    <Table
      columns={ProjectsColumn}
      dataSource={data}
      rowKey="id"
      size="middle"
      loading={loading}
    />
  );
};

export default ProjectsTable;
