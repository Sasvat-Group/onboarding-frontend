import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  HeatMapOutlined,
} from '@ant-design/icons';

import React, { FC } from 'react';

import type { Router } from 'next/router';
import { withRouter } from 'next/router';

import { getActiveMenu } from '../../util/headerUtil';

import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from '../../store/modules/appSlice';
import adminMenus from './adminMenu';
// import pdeskMenu from './pdeskMenu';
// import tdeskASMenu from './tdeskASMenu';

import MenuItem from '../common/MenuItem/MenuItem';

const { Sider } = Layout;

interface Props {
  router: Router;
}

type MenuItemCustom = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemCustom[]
): MenuItemCustom => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemCustom;
};

const SideHeader: FC<Props> = ({ router }) => {
  const dispatch = useDispatch();

  const isUserLoad = useSelector((state: RootState) => state.user.isUserLoad);

  const isAdmin = useSelector(
    (state: RootState) => state.user.currentUser.isAdmin
  );

  const userPermission = useSelector(
    (state: RootState) => state.user.userPermissions
  );

  console.log(userPermission);
  const { isCollapsed, collapsedWidth, fullWidth } = useSelector(
    (state: RootState) => state.app.sideBar
  );

  if (!isUserLoad) {
    return null;
  }

  const menus = [
    {
      key: 'admin',
      icon: <UserOutlined />,
      title: 'Admin',
      subMenus: adminMenus,
    },
    // {
    //   key: 'pdesk',
    //   icon: <BarChartOutlined />,
    //   title: 'Pdesk',
    //   subMenus: pdeskMenu,
    // },
    // {
    //   key: 'tdeskAS',
    //   icon: <HeatMapOutlined />,
    //   title: 'TDesk AS (Lot)',
    //   subMenus: tdeskASMenu,
    // },
  ];

  const validMenus = menus.map((menu) => {
    return {
      key: menu.key,
      icon: menu.icon,
      title: menu.title,
      subMenus: menu.subMenus.filter((subMenu) => {
        return (
          isAdmin ||
          (userPermission[subMenu.module] != undefined &&
            userPermission[subMenu.module].includes(subMenu.permission))
        );
      }),
    };
  });
  const filterMainMenu = validMenus.filter((menu) => menu.subMenus.length > 0);

  const pathname = router.pathname as string;
  const activeMenu = getActiveMenu(pathname);

  const items = filterMainMenu.map((menu) => {
    const children = menu.subMenus.map((subMenu) =>
      getItem(
        <MenuItem path={subMenu.path} module={subMenu.module} />,
        subMenu.path,
        subMenu.icon
      )
    );
    return getItem(menu.title, menu.key, menu.icon, children);
  });

  const toggle = () => {
    dispatch(toggleSideBar());
  };
  return (
    <Sider
      className="fixed z-[999] h-full shadow-md"
      collapsible
      collapsed={isCollapsed}
      width={fullWidth}
      collapsedWidth={collapsedWidth}
      theme="light"
      breakpoint="lg"
      onCollapse={toggle}
    >
      <div className="h-full overflow-auto pb-20">
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={[activeMenu]}
          selectedKeys={[pathname]}
          items={[...items]}
          className="border-0 font-medium"
        />
      </div>
    </Sider>
  );
};

export default withRouter(SideHeader);
