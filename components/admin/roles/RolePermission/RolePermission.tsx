import { withRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { get } from '../../../../util/servercall'
import type { Router } from 'next/router';
import AllPermission from '../AllPermission/AllPermission';
import { getRoleCraeteURL } from '../../../../url/admin';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  router: Router;
}

const RolePermission: FC<Props> = (props) => {

  const [rolePermission, setRolePermission] = useState([]);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      key: 'display_name',
      dataIndex: 'display_name',
    },
  ];

  useEffect(() => {
    const id = props.router.query.id as string;
    get(getRoleCraeteURL(id))
      .then((response) => {
        setRolePermission(response.data.permission)
      })
  }, [])

  return (
    <div>
      <AllPermission />
    </div>
  )
}

export default withRouter(RolePermission);