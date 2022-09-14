import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import RoleTable from '../../../components/admin/roles/RoleTable/RoleTable';
import Layout from '../../../components/Layout/Layout'
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { ROLE_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';

const Roles = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(ROLE_GETALL)
      .then((response) => {
        setRoles(response.data);
        setLoading(false);
        router.push(`/admin/roles`)
    });
  }, [router.query.isDeleted])

  const onAddClick = () => {
    router.push("/admin/roles/add")
  }

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission module={Modules.ROLE} permission={Permissions.ADD} >
          <Button type="primary" className="button-right" onClick={onAddClick} >New Role</Button>
        </ModulePermission>
      </div>
      <RoleTable data={roles} loading={loading} />
    </Layout>
  )
}

export default withAuthAndPermission(Roles, Modules.ROLE , Permissions.VIEW);
