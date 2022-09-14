import React, { FC, useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { USER_Delete, USER_GETALL } from '../../../url/admin';
import { post } from '../../../util/servercall';
import { message, Popconfirm } from 'antd';

interface Props {
  path: string;
  record_id: number;
  module: string;
}

const DeleteIconLink: FC<Props> = ({ path, module, record_id }) => {
    const router = useRouter();
    let isDeleted = false;
    const confirm = async (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        const response = await post(path,{"id": record_id})
        const json_data = await response.data
        console.log(`json data is ${json_data}`)
        if(json_data){
          message.success(`${module} deleted successfully`);
          router.push({pathname:`/admin/${module}`,query:{isDeleted:isDeleted}})
        }
    };


    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        // message.error('');
    };

    return (
        <div>

            <Popconfirm
                title="Are you sure to delete ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                 <a className="text-gray-500">
        <DeleteOutlined />
      </a>
            </Popconfirm>
        </div>
    );

};

export default DeleteIconLink;
