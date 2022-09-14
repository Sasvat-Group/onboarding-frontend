import { Button, Tag } from 'antd';
import { Modules } from '../../../../type/module';
import Actions from '../../../Actions/Actions';
import React, { FC, useRef, useState } from 'react';
import { InputRef, Table } from 'antd';
import userColumn from './userColumns';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';

interface DataType {
  employee_id: number;
  first_name: string;
  email: string;
  roles: string;
  projects: string;
}

interface Props {
  data: DataType[];
  loading: boolean;
}

type DataIndex = keyof DataType;



const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef<InputRef>(null);

const handleSearch = (
  selectedKeys: string[],
  confirm: (param?: FilterConfirmProps) => void,
  dataIndex: DataIndex,
) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters: () => void) => {
  clearFilters();
  setSearchText('');
};

const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
});


const columns = [
  {
    title: 'Employee Id',
    dataIndex: 'employee_id',
    width: '20%',
    key: 'employee_id',
    className: 'text-gray-600',
  },
  {
    title: 'Name',
    dataIndex: 'first_name',
    key: 'first_name',
    width: '20%',
    className: 'font-semibold',
    ...getColumnSearchProps('first_name')
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    className: 'text-gray-600',
    width: '20%',
    ...getColumnSearchProps('first_name')
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    width: '20%',
    key: 'roles',
    render: (roles: any) => {
      return (
        roles.map((role: {
          id: any; name: any;
        }) => <Tag color="blue" key={role.id}>
            {role.name}
          </Tag>)
      )
    },
    className: 'text-gray-600',
  },
  {
    title: 'Projects',
    dataIndex: 'projects',
    width: '20%',
    key: 'projects',
    render: (projects: any) => {
      return (
        projects.map((project: {
          id: any; display_name: any;
        }) => <Tag color="orange" key={project.id}>
            {project.display_name}
          </Tag>)
      )
    },
    className: 'text-gray-600',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => {
      return (
        <Actions path={`/admin/users/${record.id}`} module={Modules.USER} deletePath={`/admin/users/delete`} />
      );
    },
    width: '20%',
  },
];

export default columns;
