import { Tag } from 'antd';
import { Modules } from '../../../../type/module';

const columns = [
  {
    title: 'Project',
    dataIndex: 'project_name',
    key: 'project_name',
    className: 'font-semibold',
  },
  {
    title: 'Employee',
    dataIndex: 'employee_email',
    key: 'employee_email',
    className: 'text-gray-600',
  },
  {
    title: 'Manager',
    dataIndex: 'manager_name',
    key: 'manager_name',
    className: 'text-gray-600',
  },
  {
    title: 'Config Manager',
    dataIndex: 'config_managers',
    key: 'config_managers',
    className: 'text-gray-600',
    render: (config_managers: any) => (
      <>
        {config_managers.map((config_manager: any) => (
          <Tag color="blue" key={config_manager}>
            {config_manager}
          </Tag>
        ))}
      </>
    )},
    {
      title: 'Tools',
      dataIndex: 'tools',
      key: 'tools',
      className: 'text-gray-600',
      render: (tools: any) => (
        <>
          {tools.map((tool: any) => (
            <Tag color="orange" key={tool}>
              {tool}
            </Tag>
          ))}
        </>
      )},
    {
      title: 'Status',
      dataIndex: 'req_status',
      key: 'req_status',
      className: 'text-gray-600',
    },
];


export default columns;
