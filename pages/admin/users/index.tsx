import React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import { get } from '../../../util/servercall';
import UserTable from '../../../components/admin/user/UserTable/UserTable';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import withAuthAndPermission from '../../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import ModulePermission from '../../../components/common/ModulePermissions/ModulePermission';
import { USER_GETALL } from '../../../url/admin';

const Users = (props: any) => {
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(router.query)
    setLoading(true);
    // console.log(props.router.query.deleted)
    get(USER_GETALL).then((response) => {
      setuser(response.data);
      setLoading(false);
      router.push('/admin/users')
    });
  }, [router.query.isDeleted]);

  const onAddClick = () => {
    router.push('/admin/users/add');
  };

  return (
    <Layout>
      <div className="flex justify-end pb-3">
        <ModulePermission module={Modules.USER} permission={Permissions.ADD}>
          <Button type="primary" className="button-right" onClick={onAddClick}>
            New User
          </Button>
        </ModulePermission>
      </div>

      <UserTable data={user} loading={loading} />
    </Layout>
  );
};

export default withAuthAndPermission(Users, Modules.USER, Permissions.VIEW);
