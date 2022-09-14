import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PermissionAdd from '../../../../components/admin/permission/PermissionAdd/PermissionAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../../type/module';
import { PermissionDataWithID, Permissions } from '../../../../type/permission';
import { PERMISSION_GETBYID, PERMISSION_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: PermissionDataWithID = {
    id: 0,
    display_name: '',
    code: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(PERMISSION_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: PermissionDataWithID) => {
    values.id = initFormData.id;
    post(PERMISSION_UPDATE, values).then((response) => {
      router.push('/admin/permission');
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
        title={isDisable ? 'Permission' : 'Edit Permission'}
        tags={<Tag>{initFormData.code}</Tag>}
      />
      <PermissionAdd
        initValues={initFormData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isDisable={isDisable}
      />
    </Layout>
  );
};

export default withAuthAndPermission(
  Index,
  Modules.PERMISSION,
  Permissions.EDIT
);
