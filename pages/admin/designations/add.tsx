import React, { useState } from 'react';
import { Form, Input, Button, FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import DesignationsAdd from '../../../components/admin/designations/DesignationsAdd/DesignationsAdd';
import { DesignationsFormData } from '../../../type/designations';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { DESIGNATION_CREATE } from '../../../url/admin';
import { useRouter } from 'next/router';

const Add = () => {
  const router = useRouter();

  const initValues: DesignationsFormData = {
    display_name: '',
    code: '',
  };

  const onFinish = (form: FormInstance, values: DesignationsFormData) => {
    post(DESIGNATION_CREATE, values).then((response) => {
      router.push(`/admin/designations/${response.data.id}/?display=${false}`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/designations')}
        title="Create Designation"
      />
      <DesignationsAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.DESIGNATIONS, Permissions.ADD);
