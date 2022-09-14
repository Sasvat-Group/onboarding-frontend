import { FormInstance, PageHeader, Tag } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProjectsAdd from '../../../../components/admin/projects/ProjectsAdd/ProjectsAdd';
import Layout from '../../../../components/Layout/Layout';
import withAuthAndPermission from '../../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../../type/module';
import { Permissions } from '../../../../type/permission';
import { ProjectFormDataWithID } from '../../../../type/projects';
import { PROJECT_GETBYID, PROJECT_UPDATE } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const Index = () => {
  const router = useRouter();
  const { display } = router.query;
  const isDisable = display == 'true';

  const initValues: ProjectFormDataWithID = {
    id: 0,
    project_code: 0,
    project_name: '',
    display_name: '',
    project_details: '',
    kt_description: ''
  };

  const [initFormData, setInitFormData] = useState(initValues);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    get(PROJECT_GETBYID + `${id}`).then((response) => {
      setInitFormData(response.data);
    });
  }, [router.isReady, router.query]);

  const onFinish = (form: FormInstance, values: ProjectFormDataWithID) => {
    values.id = initFormData.id;
    post(PROJECT_UPDATE, values).then((response) => {
      router.push('/admin/projects');
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <PageHeader
        className="p-0"
        onBack={() => router.push('/admin/projects')}
        title={isDisable ? 'Project' : 'Edit Project'}
        tags={<Tag>{initFormData.project_code}</Tag>}
      />
      <ProjectsAdd
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
  Modules.PROJECTS,
  Permissions.EDIT
);
