import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FormInstance, PageHeader, Tag } from 'antd';
import Layout from '../../../../components/Layout/Layout';
import { get, post } from '../../../../util/servercall';
import UserAdd from '../../../../components/admin/user/UserAdd/UserAdd';
import { UserFormDataWithID } from '../../../../type/user';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { USER_GETBYID, USER_UPDATE } from '../../../../url/admin';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: UserFormDataWithID = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(USER_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: UserFormDataWithID) => {
    values.id = initFormData.id;
    post(USER_UPDATE, values).then((response) => {
      router.push('/admin/users');
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/users')}
        title={isDisable ? 'User' : 'Edit User'}
        tags={<Tag>{initFormData.first_name}</Tag>}
      />
      <UserAdd
        initValues={initFormData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isDisable={isDisable}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Index, Modules.USER, Permissions.EDIT);
