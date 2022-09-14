import React, { FC, useRef, useState } from 'react';
import { InputRef, Table, Tag } from 'antd';
// import userColumn from './userColumns';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import Actions from '../../../Actions/Actions';
import { Modules } from '../../../../type/module';
import Highlighter from 'react-highlight-words';
import roles from '../../../../pages/admin/roles';
import internal from 'stream';
import { USER_Delete } from '../../../../url/admin';

interface Roles{
  id: number;
  name: string;
  allow_all: boolean;
  status: number;
}

interface DataType {
  employee_id: number;
  first_name: string;
  email: string;
  roles: Roles[];
  projects: any[];
}

interface Props {
  data: DataType[];
  loading: boolean;
}

type DataIndex = keyof DataType;



const UserTable: FC<Props> = ({ data, loading }) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const rolesData = data.map((ele: DataType) => ele.roles.map((e:Roles)=> e.name))
  

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    console.log(`selected key is ${selectedKeys[0]}`)
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
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ), onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: text =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
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
      ...getColumnSearchProps('email')
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => {
        return (
          <Actions path={`/admin/users/${record.id}`} module={Modules.USER} deletePath={USER_Delete} record_id={record.id} />
        );
      },
      width: '20%',
    },
  ];


  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      size="middle"
      loading={loading}
    />
  );
};

export default UserTable;
