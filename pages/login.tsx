import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../redux/action/appAction/appAction';
import { addUserPermission } from '../redux/action/rolePermissions/rolePermissionActions';
import { LOGIN, USER_GET_PERMISSION } from '../url/admin';
import { get, post, setTokenLocalStorage } from '../util/servercall';

import Image from 'next/image';
import logo from '../public/images/logo.jpg';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { loadUserPermissions, setCurrentUser } from '../store/modules/userSlice';
import { store } from '../store';

const Login = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const response = await post(LOGIN, values);
    localStorage.setItem('email', values.email);
    const token = response.data.token;
    setTokenLocalStorage(token);
    setCookie('token', token, { path: '/' });
    store.dispatch(setCurrentUser(token));
    store.dispatch(loadUserPermissions());
    router.push('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div className="flex h-screen w-screen overflow-auto">
        <div className="w-1/2 md:w-full">
          <div className="container mx-auto">
            <div className="sm:max-w-auto ml-auto mr-20 mt-40 flex max-w-sm flex-col md:mx-auto md:mt-1 sm:mx-5">
              <div className="md:text-center">
                <Image src={logo} alt="NobisLabs" width={200} height={200} />
              </div>
              <p className=" text-gray-500">
                Sign in using your email and password to access your account
              </p>
              <div className="my-1"></div>
              <div>
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="enter your email"
                      size="large"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="enter your password"
                      size="large"
                      prefix={<KeyOutlined />}
                    />
                  </Form.Item>
                  <div className="mt-5">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col justify-center bg-gradient-to-r from-gray-600 to-gray-900 shadow-2xl md:hidden">
          <div className="mx-auto w-3/5 text-center">
            <h1 className="text-gray-300">Welcome to Onboarding Plateform</h1>
            <p className="text-lg text-gray-400">
              Enhance the Onboarding Process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
