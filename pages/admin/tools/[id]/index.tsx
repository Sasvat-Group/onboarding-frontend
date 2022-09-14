import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ToolsAdd from '../../../../components/admin/tools/ToolsAdd/ToolsAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { ToolsFormDataWithID } from '../../../../type/tools';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { TOOLS_GETBYID, TOOLS_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: ToolsFormDataWithID = {
    id: 0,
    display_name: '',
    code: '',
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(TOOLS_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: ToolsFormDataWithID) => {
    values.id = initFormData.id;
    post(TOOLS_UPDATE, values).then((response) => {
      router.push('/admin/tools');
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
        title={isDisable ? 'Tools' : 'Edit Tool'}
        tags={<Tag>{initFormData.code}</Tag>}
      />
      <ToolsAdd
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
  Modules.TOOLS,
  Permissions.EDIT
);
