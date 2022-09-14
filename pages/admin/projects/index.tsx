import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProjectsTable from '../../../components/admin/projects/ProjectsTable/projectsTable';
import Layout from '../../../components/Layout/Layout';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { PROJECT_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';

const Projects = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(PROJECT_GETALL).then((response) => {
      setProjects(response.data);
      setLoading(false);
      router.push('/admin/projects')
    });
  }, [router.query.isDeleted]);

  const onAddClick = () => {
    router.push('/admin/projects/add');
  };

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission
          module={Modules.PROJECTS}
          permission={Permissions.ADD}
        >
          <Button type="primary" className="button-right" onClick={onAddClick}>
            New Project
          </Button>
        </ModulePermission>
      </div>
      <ProjectsTable data={projects} loading={loading}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  Projects,
  Modules.PROJECTS,
  Permissions.VIEW
);
