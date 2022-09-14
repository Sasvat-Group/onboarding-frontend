import { Modules } from '../../../../type/module';
import { PROJECT_DELETE, TOOLS_DELETE } from '../../../../url/admin';
import Actions from '../../../Actions/Actions';

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    className: 'font-semibold',
  },
  {
    title: 'Display Name',
    dataIndex: 'display_name',
    key: 'display_name',
    className: 'text-gray-600',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => (
      <Actions
        path={`/admin/tools/${record.id}`}
        module={Modules.TOOLS}
        deletePath={TOOLS_DELETE} 
        record_id={record.id}
      />
    ),
    width: 10,
  },
];

export default columns;
