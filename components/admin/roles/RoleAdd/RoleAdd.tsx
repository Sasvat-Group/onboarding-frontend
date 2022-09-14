import React, { FC } from 'react';
import { Tabs } from 'antd';
import { FormInstance } from 'antd';
import RoleForm from '../RoleForm/RoleForm';
import RolePermission from '../RolePermission/RolePermission';
import { useRouter } from 'next/router';

interface Props {
  initValues: any;
  onFinish: (form: FormInstance, values: any) => void;
  onFinishFailed: (error: any) => void;
  isDisable?: boolean;
}

const RoleAdd: FC<Props> = ({
  initValues,
  onFinish,
  onFinishFailed,
  isDisable,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const isDisabled = id == undefined;

  const { TabPane } = Tabs;

  function callback(key: any) {
    console.log(key);
  }

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Basic Info" key="1">
        <RoleForm
          initValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isDisable={isDisable}
        />
      </TabPane>
      <TabPane tab="Permissions" key="2" disabled={isDisabled}>
        <RolePermission />
      </TabPane>
    </Tabs>
  );
};

export default RoleAdd;
