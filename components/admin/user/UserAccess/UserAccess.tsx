import React, { useEffect, useState } from 'react';
import router, { Router, withRouter } from 'next/router';
import { FC } from 'react';
import { get, post } from '../../../../util/servercall';
import { getConfigurationUserByProject, getProjectTools, getUserDataById, SendAccessRequest } from '../../../../url/admin';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
const { Option } = Select;

interface Props {
  router: Router;
}

const UserAccess: FC<Props> = props => {
  const [userData, setUserData] = useState([]);
  const [prjToolsData, setPrjToolsData] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false);
  const [configurationUserData, setConfigurationUserData] = useState([]);
  const id = props.router.query.id as string;
  console.log(`id is ${id}`)
  const fetchUser = async () => {
    try {
      let response = await get(getUserDataById(id));
      let json = await response.data;
      let p_id = json.projects[0].id
      let cm_response = await fetchConfigurationUsers(p_id)  
      let cm_json = await cm_response.data;
      let prj_tools = await fetchProjectTools(p_id)
      let prj_tools_json = await prj_tools.data;
      console.log(json)
      return { success: true, data: json, cm_data: cm_json, prj_tools_data: prj_tools_json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  const fetchConfigurationUsers = async (id:any) => {
    try {
      let response = await get(getConfigurationUserByProject(id));
      let json = await response.data;
      return { success: true, data: json};
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  const fetchProjectTools = async (id:any) => {
    try {
      let response = await get(getProjectTools(id));
      let json = await response.data;
      return { success: true, data: json};
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  
  useEffect(() => {
    (async () => {
      setUserLoaded(false);
      let res = await fetchUser();
      if (res.success) {
        setUserData(res.data);
        setConfigurationUserData(res.cm_data)
        setPrjToolsData(res.prj_tools_data)
        setUserLoaded(true);
      }
      // console.log(userData)
      // console.log(project_id)
      // setUserLoaded(false);
      // // let config_users = await fetchConfigurationUsers(1)
      // if (config_users.success) {
      //   setConfigurationUserData(config_users.data);
      //   setUserLoaded(true);
      // }
      
      // console.log(configurationUserData)
    })();
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    post(SendAccessRequest, values).then((response) => {
      router.push(`/admin/users`);
      // form.resetFields()
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };


  return (
    <div>
      {userLoaded ? (
        <div>
          <Form
            name="userdata"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              id: userData.id,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              employee_id: userData.employee_id,
              base_location: userData.base_location
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="ID" name="id" hidden={true}>
              <Input hidden={true} />
            </Form.Item>

            <Form.Item
              label="first_name"
              name="first_name"
              rules={[{ message: 'Please input your firstname!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="last_name"
              name="last_name"
              rules={[{ message: 'Please input your lastname!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="last_name"
              name="last_name"
              rules={[{ message: 'Please input your lastname!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ message: 'Please input your email!' }]}
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
              rules={[{ message: 'Please base location!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Projects"
              name="projects"
              
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                onChange={handleChange}
              >
                {userData.projects.map(prj => (
                    <Option key={prj.display_name}>{prj.project_name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="configuration_user"
              name="configuration_user"
              
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                onChange={handleChange}
              >
                {configurationUserData.map(cm => (
                    <Option key={cm.email}>{cm.email}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Project Tools"
              name="project_tools"
            >
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Row>
                  {
                    prjToolsData.tools.map(tool => (
                      <Col span={8}>
                        <Checkbox value={tool.display_name}>{tool.display_name}</Checkbox>
                      </Col>

                    ))
                  }
              </Row>
              </Checkbox.Group>

            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p>No user found, please try again</p>
      )}
    </div>
  );
}
export default withRouter(UserAccess);




function getOptions(projects: any[]): React.ReactNode {
  const project_options=[];
  for(let i=0;i<projects.length;i++){
    project_options.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  return project_options
}
// import { Router, withRouter } from 'next/router';
// import React, { FC } from 'react';

// interface Props {
//   router: Router;
// }

// const UserAccess: FC<Props> = props => {
//   console.log("id is here")
//   console.log(props.router.query.id)
//   return (
//     <div>
//       <p>hello world</p>
//     </div>
//   );
// }
// export default withRouter(UserAccess);


// import { withRouter } from 'next/router';
// import React, { FC, useEffect, useState } from 'react';
// import { get, post } from '../../../../util/servercall';
// import type { Router } from 'next/router';
// import { Button, Col, FormInstance, Row, Select, Skeleton, Table } from 'antd';
// import { getConfigurationUserByProject, getProjectTools, getUserDataById } from '../../../../url/admin';
// import { UserDataSchema } from '../../../../type/user';
// import axios from 'axios';
// import { Form, Input, InputNumber } from 'antd';
// import UserAccessForm from '../UserAccessForm/UserAccessForm';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// interface Props {
//   router: Router;
// }

// const UserAccess: FC<Props> = (props) => {
//   const [userData, setUserData] = useState<UserDataSchema>({} as UserDataSchema);
//   const [configurationUserData, setConfigurationUserData] = useState([]);
//   const [projectTools, setProjectTools]=  useState<any[]>([]);
//   const [visible, setVisible] = useState(false);
//   const [isLoading, setLoading] = useState(false);

//   const onComponentUpdate = () => {
//     const id = props.router.query.id as string;
//     setLoading(true);
//     get(getUserDataById(id)).then((response) => {
//         const project_id = response.data.projects[0].id
//         const ud = response.data
//         ud["projects"] = ud.projects.map((project: { project_name: string; })=>project.project_name)
//         setUserData(ud);
//         setLoading(false);
//         return project_id;
//       })
//       // .then(
//       //   project_id => get(getProjectTools(project_id)).then((response)=>{
//       //       setProjectTools(response.data.tools);
//       //       return project_id
//       //   })
//       // ).then(
//       //   project_id => get(getConfigurationUserByProject(project_id)).then((response)=>{
//       //       setConfigurationUserData(response.data)
//       //       setLoading(false);
//       //   })
//       // )
//   };


//   useEffect(() => {
//     onComponentUpdate();
//   }, []);
//   console.log("udata: ")
//   console.log(userData)
//   return(
//     <p>{userData!==undefined ? userData.projects[0] : ""}</p>
//   )
// };

// export default withRouter(UserAccess);
