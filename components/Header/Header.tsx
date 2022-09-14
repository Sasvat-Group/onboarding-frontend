import React, { FC } from 'react';
import { Layout, Avatar, Menu, Dropdown, Space } from 'antd';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';

const { Header: HeaderAntd } = Layout;
import Image from 'next/image';
import logo from '../../public/images/logo_horizontal.png';

interface Props {}

const Header: FC<Props> = () => {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.replace('/login');
  };

  const handleMenuClick = (e: any) => {
    if (e.key == 3) {
      logout();
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'My Profile',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: 'Settings',
          key: '2',
          icon: <SettingOutlined />,
        },
        {
          type: 'divider',
        },
        {
          label: 'Logout',
          key: '3',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <HeaderAntd className="line-hei fixed top-0 left-0 right-0 z-50 h-12 bg-indigo-500 px-6 leading-none shadow-sm">
      <div className="flex h-12 items-center justify-between text-white">
        <div className="flex items-center">
          <Image src={logo} alt="Onboarding Portal" width="80" height="40"/>
        </div>
        <div className="hover:text-gray-100">
          <Dropdown
            overlay={menu}
            trigger={['click']}
            className="cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Avatar
                shape="square"
                className="bg-gray-50 text-gray-600"
                icon={<UserOutlined />}
              />
              <div>{currentUser.email}</div>
              <div>
                <CaretDownOutlined />
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </HeaderAntd>
  );
};

export default Header;
