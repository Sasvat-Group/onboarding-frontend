import { withRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { get, post } from "../../../../util/servercall";
import type { Router } from "next/router";
import { Button, Table } from "antd";
import ProjectToolsAssociation from "../ProjectToolsAssociation/ProjectToolsAssociation";
import {
  deleteToolsByProject,
  getProjectTools,
  getProjectToolsNotassociate,
} from "../../../../url/admin";
import DeAllocateItem from "../../../Actions/DeAllocateItem";
import { Modules } from "../../../../type/module";

interface Props {
  router: Router;
}

const ProjectTools: FC<Props> = (props) => {
  const id = props.router.query.id as string;

  const [projectTools, setProjectTools] = useState([]);
  const [notAssociateTools, setNotAssociateTools] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  console.log(notAssociateTools);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onComponentUpdate = () => {
    setLoading(true);
    get(getProjectTools(id)).then((response) => {
      console.log(response);
      setProjectTools(response.data.tools);
      setLoading(false);
    });

    get(getProjectToolsNotassociate(id)).then((response) => {
      setNotAssociateTools(response.data);
    });
  };

  useEffect(() => {
    onComponentUpdate();
  }, []);

  const columns = [
    {
      title: "Tools",
      key: "display_name",
      dataIndex: "display_name",
    },

    {
      title: "Action",
      key: "action",
      render: (record: any) => {
        return (
          <DeAllocateItem
            path={`/admin/projects/${id}`}
            module={Modules.PROJECTS}
            deletePath={deleteToolsByProject(id)}
            onComponentUpdate={onComponentUpdate}
            body={{ tool_id: record.id }}
          />
        );
      },
      width: "20%",
    },
  ];

  const onHandleUserAddClick = () => {
    showDrawer();
  };

  const onHandleFinish = (values: { project_id: number }) => {
    const id = props.router.query.id as string;
    post(getProjectTools(id), values).then((response) => {
      onComponentUpdate();
      onClose();
    });
  };

  return (
    <div>
      <div className="flex justify-end pb-3">
        <Button
          type="primary"
          className="button-right"
          onClick={onHandleUserAddClick}
        >
          Assign Tools
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={projectTools}
        rowKey="id"
        size="middle"
        loading={isLoading}
      />

      <ProjectToolsAssociation
        onClose={onClose}
        visible={visible}
        notAssociateTools={notAssociateTools}
        onHandleFinish={onHandleFinish}
      />
    </div>
  );
};

export default withRouter(ProjectTools);
