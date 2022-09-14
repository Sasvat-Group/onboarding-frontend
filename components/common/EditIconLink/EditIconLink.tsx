import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface Props {
  path?: string;
  display: boolean;
}

const EditIconLink: FC<Props> = ({ path, display }) => {
  return (
    <Link
      href={{
        pathname: path,
        query: { display },
      }}
    >
      <a className="text-gray-500">
        <EditOutlined />
      </a>
    </Link>
  );
};

export default EditIconLink;
