import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import RoleAdd from '../../../../components/admin/roles/RoleAdd/RoleAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { RoleFormDataWithID } from '../../../../type/roles';
import { ROLE_GETBYID, ROLE_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: RoleFormDataWithID = {
    id: 0,
    name: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(ROLE_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: RoleFormDataWithID) => {
    values.id = initFormData.id;
    post(ROLE_UPDATE, values).then((response) => {
      router.push('/admin/roles');
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
        title={isDisable ? 'Role' : 'Edit Roles'}
        tags={<Tag>{initFormData.name}</Tag>}
      />
      <RoleAdd
        initValues={initFormData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isDisable={isDisable}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Index, Modules.ROLE, Permissions.EDIT);
