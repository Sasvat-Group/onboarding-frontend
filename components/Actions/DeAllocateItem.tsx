import React, { FC } from "react";
import { message, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Modules } from "../../type/module";
import { Permissions } from "../../type/permission";
import ModulePermission from "../common/ModulePermissions/ModulePermission";
import { useRouter } from "next/router";
import { post } from "../../util/servercall";

interface Props {
  path: string;
  module: Modules;
  deletePath: string;
  onComponentUpdate: any;
  body: any;
}

const DeAllocateItem: FC<Props> = ({
  path,
  module,
  deletePath,
  onComponentUpdate,
  body,
}) => {
  const router = useRouter();

  console.log(deletePath);

  const confirm = async (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    debugger;
    const response = await post(deletePath, body);
    const json_data = await response.data;
    console.log(`json data is ${json_data}`);
    if (json_data) {
      message.success(`${module} deleted successfully`);
      onComponentUpdate();
      router.push({
        pathname: path,
      });
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // message.error('');
  };

  return (
    <Space size="middle">
      <ModulePermission module={module} permission={Permissions.DELETE}>
        <a className="text-gray-500">
          {deletePath && (
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
          )}
        </a>
      </ModulePermission>
    </Space>
  );
};

export default DeAllocateItem;
