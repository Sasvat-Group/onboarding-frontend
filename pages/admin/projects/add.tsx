import React, { useState } from 'react';
import { Form, Input, Button, FormInstance, PageHeader } from 'antd';
import { post } from '../../../util/servercall';
import Layout from '../../../components/Layout/Layout';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { COMMODITY_CREATE, PROJECT_CREATE } from '../../../url/admin';
import { useRouter } from 'next/router';
import { ProjectFormData, ProjectFormDataWithID } from '../../../type/projects';
import ProjectsAdd from '../../../components/admin/projects/ProjectsAdd/ProjectsAdd';

const Add = () => {
  const router = useRouter();

  const initValues: ProjectFormDataWithID = {
    id: 0,
    project_code: 0,
    project_name: '',
    display_name: '',
    project_details: '',
    kt_description: ''
  };

  const onFinish = (form: FormInstance, values: ProjectFormData) => {
    post(PROJECT_CREATE, values).then((response) => {
      router.push(`/admin/projects/${response.data.id}/?display=${false}`);
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
        title="Create New Project"
      />
      <ProjectsAdd
        initValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </Layout>
  );
};

export default withAuthAndPermission(Add, Modules.PROJECTS, Permissions.ADD);
