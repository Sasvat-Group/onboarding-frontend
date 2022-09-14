import { Modules } from '../../../../type/module';
import { DESIGNATION_DELETE } from '../../../../url/admin';
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
        path={`/admin/designations/${record.id}`}
        module={Modules.DESIGNATIONS}
        deletePath={DESIGNATION_DELETE} 
        record_id={record.id}
      />
    ),
    width: 10,
  },
];

export default columns;
