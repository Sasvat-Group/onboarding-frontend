import { Select } from 'antd';
import React, { FC } from 'react';
import { UserDataSchema } from '../../../../type/user';

const { Option } = Select;

interface Props {
    user_data: UserDataSchema;
}

const children: React.ReactNode[] = [];



const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const ProjectSelection: FC<Props> = (user_data) => {
    console.log(user_data)
    for (let i = 0; i < user_data.user_data.projects.length; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return(
  <>
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
    >
      {children}
    </Select>
    <br />
  </>
)};

export default ProjectSelection;