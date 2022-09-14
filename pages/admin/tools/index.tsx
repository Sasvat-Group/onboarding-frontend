import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ToolsTable from '../../../components/admin/tools/ToolsTable/ToolsTable';
import Layout from '../../../components/Layout/Layout';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { TOOLS_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';

const Tools = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(TOOLS_GETALL).then((response) => {
      setTools(response.data);
      setLoading(false);
      router.push('/admin/tools')
    });
  }, [router.query.isDeleted]);

  const onAddClick = () => {
    router.push('/admin/tools/add');
  };

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission
          module={Modules.TOOLS}
          permission={Permissions.ADD}
        >
          <Button type="primary" className="button-right" onClick={onAddClick}>
            New Tools
          </Button>
        </ModulePermission>
      </div>
      <ToolsTable data={tools} loading={loading}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  Tools,
  Modules.TOOLS,
  Permissions.VIEW
);
