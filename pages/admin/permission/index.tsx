import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommodityTable from '../../../components/admin/commodity/CommodityTable/CommodityTable';
import PermissionTable from '../../../components/admin/permission/PermissionTable/PermissionTable';
import Layout from '../../../components/Layout/Layout'
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { PERMISSION_GETALL } from '../../../url/admin';
import { get } from '../../../util/servercall';

const Permission = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    setLoading(true);
    get(PERMISSION_GETALL)
      .then((response) => {
        setPermission(response.data);
        setLoading(false);
    });
  }, [])

  const onAddClick = () => {
    router.push("/admin/permission/add")
  }

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission module={Modules.PERMISSION} permission={Permissions.ADD} >
          <Button type="primary" className="button-right" onClick={onAddClick} >New Permission</Button>
        </ModulePermission>
      </div>
      <PermissionTable data={permission} loading={loading}/>
    </Layout>
  )
}

export default withAuthAndPermission(Permission,Modules.PERMISSION , Permissions.VIEW);
