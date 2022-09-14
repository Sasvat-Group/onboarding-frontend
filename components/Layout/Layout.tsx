import React, { FC } from 'react';
import { Layout as LayoutAntd, Breadcrumb } from 'antd';
import Header from '../Header/Header';
import SideHeader from '../SideHeader/SideHeader';
import { useSelector } from 'react-redux';
import { currentWidth } from '../../store/modules/appSlice';
const { Content, Footer } = LayoutAntd;

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const sideBarCurrentWidth = useSelector(currentWidth);
  return (
    <LayoutAntd className="relative min-h-screen">
      <Header />
      <LayoutAntd className="mt-12">
        <SideHeader />
        <Content
          style={{ marginLeft: sideBarCurrentWidth }}
          className=" bg-white px-5 py-3 transition-all duration-200"
        >
          {children}
        </Content>
      </LayoutAntd>
      <Footer className="py-1 px-3 text-right text-xs text-gray-500">
        Onboadrding @2022
      </Footer>
    </LayoutAntd>
  );
};

export default Layout;
