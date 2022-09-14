import React, { useState } from 'react';
import { Form, Input, Button, FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import { RoleFormData } from '../../../type/roles';
import RoleAdd from '../../../components/admin/roles/RoleAdd/RoleAdd';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { ROLE_CREATE } from '../../../url/admin';
import { useRouter } from 'next/router';

const Add = () => {
  const router = useRouter();

  const initValues: RoleFormData = {
    name: '',
  };

  const onFinish = (form: FormInstance, values: RoleFormData) => {
    post(ROLE_CREATE, values).then((response) => {
      router.replace(`/admin/roles/${response.data.id}/?display=${false}`);
      form.resetFields();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/roles')}
        title="Create New Role"
      />
      <RoleAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.ROLE, Permissions.ADD);
