import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { DESIGNATION_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';
import DesignationsTable from '../../../components/admin/designations/DesignationsTable/DesignationsTable';

const Designations = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(DESIGNATION_GETALL).then((response) => {
      setDesignations(response.data);
      setLoading(false);
      router.push('/admin/designations')
    });
  }, [router.query.isDeleted]);

  const onAddClick = () => {
    router.push('/admin/designations/add');
  };

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission
          module={Modules.DESIGNATIONS}
          permission={Permissions.ADD}
        >
          <Button type="primary" className="button-right" onClick={onAddClick}>
            New Designation
          </Button>
        </ModulePermission>
      </div>
      <DesignationsTable data={designations} loading={loading}/>
    </Layout>
  );
};

export default withAuthAndPermission(
  Designations,
  Modules.DESIGNATIONS,
  Permissions.VIEW
);
