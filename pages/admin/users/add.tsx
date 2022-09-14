import { FormInstance, PageHeader } from 'antd';
import Router, { useRouter } from 'next/router';
import React from 'react';
import UserAdd from '../../../components/admin/user/UserAdd/UserAdd';
import Layout from '../../../components/Layout/Layout';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { UserFormData } from '../../../type/user';
import { USER_CREATE } from '../../../url/admin';
import { post } from '../../../util/servercall';

const Add = () => {
  const router = useRouter();

  const initValues: UserFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  };

  const onFinish = (form: FormInstance, values: UserFormData) => {
    post(USER_CREATE, values).then((response) => {
      router.push(`/admin/users/${response.data.id}/?display=${false}`);
      // form.resetFields()
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Layout>
        <PageHeader
          className="p-0"
          onBack={() => router.push('/admin/users')}
          title="Create New User"
        />
        <UserAdd
          initValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </Layout>
    </div>
  );
};

export default withAuthAndPermission(Add, Modules.USER, Permissions.ADD);
