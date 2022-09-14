import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DesignationsAdd from '../../../../components/admin/designations/DesignationsAdd/DesignationsAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { DesignationsFormDataWithID } from '../../../../type/designations';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { DESIGNATION_GETBYID, DESIGNATION_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: DesignationsFormDataWithID = {
    id: 0,
    display_name: '',
    code: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(DESIGNATION_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: DesignationsFormDataWithID) => {
    values.id = initFormData.id;
    post(DESIGNATION_UPDATE, values).then((response) => {
      router.push('/admin/designations');
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
        title={isDisable ? 'Designations' : 'Edit Designations'}
        tags={<Tag>{initFormData.code}</Tag>}
      />
      <DesignationsAdd
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
  Modules.DESIGNATIONS,
  Permissions.EDIT
);
