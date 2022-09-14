import { Modules } from '../../../../type/module';
import { PROJECT_DELETE } from '../../../../url/admin';
import Actions from '../../../Actions/Actions';

const columns = [
  {
    title: 'Project Code',
    dataIndex: 'project_code',
    key: 'project_name',
    className: 'font-semibold',
  },
  {
    title: 'Project Name',
    dataIndex: 'display_name',
    key: 'display_name',
    className: 'text-gray-600',
    // width: '12%',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => {
      return (
        <Actions path={`/admin/projects/${record.id}`} 
                 module={Modules.PROJECTS} 
                 deletePath={PROJECT_DELETE} 
                 record_id={record.id} />
      );
    },
    width: 10,
  },
];

export default columns;
