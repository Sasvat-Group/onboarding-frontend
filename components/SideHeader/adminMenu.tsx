import {
  UserOutlined,
  ApartmentOutlined,
  ForkOutlined,
  TeamOutlined,
  LockOutlined,
  FundProjectionScreenOutlined
} from '@ant-design/icons';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';

export default [
  {
    path: '/admin/users',
    icon: <UserOutlined />,
    module: Modules.USER,
    permission: Permissions.VIEW,
  }, 
  {
    path: '/admin/projects',
    icon: <FundProjectionScreenOutlined />,
    module: Modules.PROJECTS,
    // module: "PROJECTS",
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/tools',
    icon: <FundProjectionScreenOutlined />,
    module: Modules.TOOLS,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/designations',
    icon: <FundProjectionScreenOutlined />,
    module: Modules.DESIGNATIONS,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/roles',
    icon: <TeamOutlined />,
    module: Modules.ROLE,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/permission',
    icon: <LockOutlined />,
    module: Modules.PERMISSION,
    permission: Permissions.VIEW,
  },
  {
    path: '/admin/status',
    icon: <LockOutlined />,
    module: Modules.STATUS,
    permission: Permissions.VIEW,
  }
];
