import React, { FC } from 'react';
import { FormInstance, Tabs } from 'antd';
import UserForm from '../UserForm/UserForm';
import UserRole from '../UserRole/UserRole';
import { useRouter } from 'next/router';
import UserProject from '../UserProject/UserProject';
import UserAccess from '../UserAccess/UserAccess';
// import UserAccess from '../UserAccess.tsx/UserAccess';
// import UserAccessForm from '../UserAccessForm/UserAccessForm';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const UserAdd: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const { TabPane } = Tabs;
  const router = useRouter();
  const { id } = router.query;
  const isDisabled = id == undefined;
  console.log(initValues)

  function callback(key: any) {
    console.log(key);
  }
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Basic Info" key="1">
        <UserForm
          initValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isDisable={isDisable}
        />
      </TabPane>
      <TabPane tab="Roles" key="2" disabled={isDisabled}>
        <UserRole />
      </TabPane>

      <TabPane tab="Projects" key="3" disabled={isDisabled}>
        <UserProject />
      </TabPane>
      <TabPane tab="Access Tab" key="4" disabled={isDisabled}>
        <UserAccess /> 
      </TabPane>
    </Tabs>
  );
};
export default UserAdd;
