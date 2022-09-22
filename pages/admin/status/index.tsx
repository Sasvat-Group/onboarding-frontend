import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { Status_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';
import StatusTable from '../../../components/admin/status/StatusTable/StatusTable';

const Tools = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(Status_GETALL).then((response) => {
      setStatusData(response.data);
      setLoading(false);
      router.push('/admin/status')
    });
  }, []);

  return (
    <Layout>
      <StatusTable data={statusData} loading={loading}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  Tools,
  Modules.TOOLS,
  Permissions.VIEW
);
