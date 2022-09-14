import React, { useState } from 'react';
import { Form, Input, Button, FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import ToolsAdd from '../../../components/admin/tools/ToolsAdd/ToolsAdd';
import { ToolsFormData } from '../../../type/tools';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { TOOLS_CREATE } from '../../../url/admin';
import { useRouter } from 'next/router';

const Add = () => {
  const router = useRouter();

  const initValues: ToolsFormData = {
    display_name: '',
    code: '',
  };

  const onFinish = (form: FormInstance, values: ToolsFormData) => {
    post(TOOLS_CREATE, values).then((response) => {
      router.push(`/admin/tools/${response.data.id}/?display=${false}`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/tools')}
        title="Create New Tool"
      />
      <ToolsAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.TOOLS, Permissions.ADD);
