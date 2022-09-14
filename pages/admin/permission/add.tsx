import React, { useState } from 'react';
import { Form, Input, Button, FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import CommodityAdd from '../../../components/admin/commodity/CommodityAdd/CommodityAdd';
import { CommodityFormData } from '../../../type/Commodity';
import PermissionAdd from '../../../components/admin/permission/PermissionAdd/PermissionAdd';
import { PermissionFormData, Permissions } from '../../../type/permission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { PERMISSION_CREATE } from '../../../url/admin';
import { useRouter } from 'next/router';

const Add = () => {
  const router = useRouter();

  const initValues: PermissionFormData = {
    display_name: '',
    code: '',
  };

  const onFinish = (form: FormInstance, values: PermissionFormData) => {
    post(PERMISSION_CREATE, values).then((response) => {
      router.replace(`/admin/permission/${response.data.id}/?display=${false}`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/permission')}
        title="Create New Permission"
      />
      <PermissionAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.PERMISSION, Permissions.ADD);
