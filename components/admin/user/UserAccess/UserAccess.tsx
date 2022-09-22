import React, { useEffect, useState } from "react";
import router, { Router, withRouter } from "next/router";
import { FC } from "react";
import { get, post } from "../../../../util/servercall";
import {
  DESIGNATION_GETALL,
  getConfigurationUserByProject,
  getDesignatiionTools,
  getProjectTools,
  getUserDataById,
  SendAccessRequest,
} from "../../../../url/admin";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
const { Option } = Select;

interface Props {
  router: Router;
}

const UserAccess: FC<Props> = (props) => {
  const [form] = Form.useForm()
  const [project, setProject] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState([]);
  const [prjToolsData, setPrjToolsData] = useState([]);
  const [designationTools, setDesignationTools] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false);
  const [configurationUserData, setConfigurationUserData] = useState([]);
  const [designations, setDesignations] = useState([]);
  const id = props.router.query.id as string;

  const fetchUser = async () => {
    try {
      let response = await get(getUserDataById(id));
      let json = await response.data;
      let p_id = json.projects[0].id;
      let cm_response = await fetchConfigurationUsers(p_id);
      let cm_json = await cm_response.data;
      let prj_tools = await fetchProjectTools(p_id);
      let prj_tools_json = await prj_tools.data;
      let designations_list = await getDesignations();
      let designations_json = await designations_list.data;

      return {
        success: true,
        data: json,
        cm_data: cm_json,
        prj_tools_data: prj_tools_json,
        designations: designations_json,
      };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const fetchConfigurationUsers = async (id: any) => {
    try {
      let response = await get(getConfigurationUserByProject(id));
      let json = await response.data;
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const fetchProjectTools = async (id: any) => {
    try {
      let response = await get(getProjectTools(id));
      let json = await response.data;
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const getDesignations = async () => {
    try {
      let response = await get(DESIGNATION_GETALL);
      let json = await response.data;
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  useEffect(() => {
    (async () => {
      setUserLoaded(false);
      let res = await fetchUser();
      if (res.success) {
        setUserData(res.data);
        setConfigurationUserData(res.cm_data);
        setDesignations(res.designations);
        setUserLoaded(true);
        console.log("designations-------", res.designations);
      }
    })();
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    post(SendAccessRequest, values).then((response) => {
      form.resetFields();
      router.push(`/admin/users`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues, typeof(checkedValues[0]));
    setDesignationTools(checkedValues);
  };

  const handleChangeProject = async (value: string) => {
    setProject(value);
    setDesignationTools([]);
    if (value === undefined) setShowForm(false);
    else {
      setShowForm(true);
      console.log("value----me--", value);

      const response = await get(getProjectTools(value));
      let result = parseArray(response.data.tools, "display_name", "id");
      setPrjToolsData(result);
    }
  };

  const parseArray = (inputArray: [], label: string, value: string) => {
    let result = inputArray.map((el) => ({
      label: el[label],
      value: el[label],
    }));

    return result;
  };

  const handleChangeDesignation = async (value: string) => {
    if (value !== undefined) {
      console.log(form.getFieldsValue())
      const response = await get(getDesignatiionTools(project, value));
      console.log("tolls desin----", response.data);
      let result =
        response.data.selcted_desgn_tools_obj &&
        response.data.selcted_desgn_tools_obj.map((el: any) => el.tool_name);
        form.setFieldValue("project_tools",result)  
      setDesignationTools(result);
    } else setDesignationTools([]);
  };

  return (
    <>
      {userLoaded ? (
        <>
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select project"
            onChange={handleChangeProject}
            value={project}
          >
            {userData.projects.map((prj) => (
              <Option key={prj.id} value={prj.id}>
                {prj.display_name}
              </Option>
            ))}
          </Select>
          <br></br>
          <br></br>
          {showForm && (
            <>
              <Form
                name="userdata"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form = {form}
                initialValues={{
                  id: userData.id,
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: userData.email,
                  employee_id: userData.employee_id,
                  base_location: userData.base_location,
                  project_tools: [],
                  project_id: project
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="ID" name="id" hidden={true}>
                  <Input hidden={true} />
                </Form.Item>

                <Form.Item label="project_id" name="project_id" hidden={true}>
                  <Input hidden={true} />
                </Form.Item>

                <Form.Item
                  label="first_name"
                  name="first_name"
                  rules={[{ message: "Please input your firstname!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="last_name"
                  name="last_name"
                  rules={[{ message: "Please input your lastname!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ message: "Please input your email!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Employee Id"
                  name="employee_id"
                  // rules={[{ message: 'Please input employee!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Base Location"
                  name="base_location"
                  rules={[{ message: "Please base location!" }]}
                >
                  <Input />
                </Form.Item>
                {/* <Form.Item label="Projects" name="projects">
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select project"
                    disabled={true}
                    value={project}
                  >
                    {userData.projects.map((prj) => (
                      <Option key={prj.id} value={prj.id}>
                        {prj.display_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item> */}

                <Form.Item label="configuration_user" name="configuration_user">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select configuration user"
                  >
                    {console.log("configration ---", configurationUserData)}
                    {configurationUserData.map((cm) => (
                      <Option key={cm.email} value={cm.email}>
                        {cm.email}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Designation" name="designation">
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select designation"
                    onChange={handleChangeDesignation}
                  >
                    {designations.map((item) => (
                      <Option key={item.id} value={item.id}>{item.display_name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Project Tools" name="project_tools">
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={onChange}
                    // value={[7]}
                    options={prjToolsData}
                  >
                    {console.log(
                      "value---",
                      designationTools,
                      "options---",
                      prjToolsData
                    )}
                    {/* <Row>
                      {prjToolsData?.tools &&
                        prjToolsData.tools.map((tool) => (
                          <Col span={8} key={tool.id}>
                            <Checkbox value={tool.display_name}>
                              {tool.display_name}
                            </Checkbox>
                          </Col>
                        ))}
                    </Row> */}
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item
                  label="Project Tools Description"
                  name="projects_tools_description"
                  rules={[{ message: "Please input description !" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Raise Request
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </>
      ) : (
        <p>No user found, please try again</p>
      )}
    </>
  );
};
export default withRouter(UserAccess);
