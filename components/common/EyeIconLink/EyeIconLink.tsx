import React, { FC } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface Props {
  path?: string;
  display: boolean;
}

const EyeIconLink: FC<Props> = ({ path, display }) => {
  return (
    <Link
      href={{
        pathname: path,
        query: { display },
      }}
    >
      <a className="text-gray-500">
        <EyeOutlined />
      </a>
    </Link>
  );
};

export default EyeIconLink;
