import React, { FC } from 'react';
import Link from 'next/link';
import { ModuleDisplayText, Modules } from '../../../type/module';

interface Props {
  path: string;
  module: Modules
}

const MenuItem: FC<Props> = ({ path, module }) => {
  return (
    <Link href={path}>
      <a>{ModuleDisplayText[module]}</a>
    </Link>
  );
};

export default MenuItem;
