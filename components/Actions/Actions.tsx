import React, { FC } from 'react';
import { Space } from 'antd';
import EyeIconLink from '../common/EyeIconLink/EyeIconLink';
import EditIconLink from '../common/EditIconLink/EditIconLink';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import ModulePermission from '../common/ModulePermissions/ModulePermission';
import DeleteIconLink from '../common/DeleteIconLink/DeleteIconLink';

interface Props {
  path: string;
  module: Modules;
  deletePath: string;
  record_id: number;
}

const Actions: FC<Props> = ({ path, module, deletePath, record_id }) => {
  console.log(deletePath)
  return (
    <Space size="middle">
      <ModulePermission module={module} permission={Permissions.EDIT}>
        <EyeIconLink path={path} display={true} />
      </ModulePermission>

      <ModulePermission module={module} permission={Permissions.EDIT}>
        <EditIconLink path={path} display={false} />
      </ModulePermission>

      <ModulePermission module={module} permission={Permissions.DELETE}>
        <a className="text-gray-500">
        {deletePath &&
          <DeleteIconLink path={deletePath} module={module} record_id={record_id} />
          }
        </a>
      </ModulePermission>
    </Space>
  );
};

export default Actions;
