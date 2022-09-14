import { Button, message, Switch } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ModuleDataWithID } from '../../../../type/module';
import { PermissionDataWithID } from '../../../../type/permission';
import { getRoleCraeteURL, GET_MODULE, PERMISSION_GETALL } from '../../../../url/admin';
import { get, post } from '../../../../util/servercall';

const UiPermission = () => {
  
  const [allModule, setAllModule] = useState<ModuleDataWithID[]>([]);
  const [allPermission, setAllPermission] = useState<PermissionDataWithID[]>([]);
  const [modulePermission, setModulePermission] = useState<any[]>([]);

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    get(GET_MODULE).then((response) => {
      console.log(response.data);
      setAllModule(response.data);
    });

    get(PERMISSION_GETALL).then((response) => {
      console.log(response.data);
      setAllPermission(response.data);
    });

    get(getRoleCraeteURL(id)).then((response) => {
      setModulePermission(response.data);
    });
  }, []);

  const handleOnChange = (checked:boolean, permission:PermissionDataWithID, module:ModuleDataWithID) => {
    if (checked) {
      const data = { module_id: module.id, permission_id: permission.id };
      setModulePermission([...modulePermission, data]);
    } else {
      const data = modulePermission.filter(
        (d:any) => d.module_id != module.id || d.permission_id != permission.id
      );
      setModulePermission(data);
    }
  };

  const handleSave = () => {
    post(getRoleCraeteURL(id), {
      Permission: modulePermission,
    }).then((response) => {
      message.success('Permission save successfully!');
    });
  };

  const isCheckedTrue = (module:ModuleDataWithID, permission: PermissionDataWithID) => {
    const arr = modulePermission.filter(
      (d:any) => d.module_id == module.id && d.permission_id == permission.id
    );
    return arr.length > 0;
  };

  return (
    <div>
      {allModule.map((module) => {
        if (module.is_header) return <h2>{module.display_name}</h2>;

        return (
          <div key={module.id}>
            {module.display_name} :
            {allPermission.map((permission) => {
              return (
                <span key={permission.id}>
                  <Switch
                    checkedChildren="Off"
                    unCheckedChildren="On"
                    onChange={(checked) =>
                      handleOnChange(checked, permission, module)
                    }
                    checked={isCheckedTrue(module, permission)}
                  />
                  {permission.display_name}

                </span>
              );
            })}
          </div>
        );
      })}

      <br />
      <br />
      <Button type="primary" onClick={() => handleSave()}>
        Save
      </Button>
    </div>
  );
};

export default UiPermission;
