import Layout from '../components/Layout/Layout';
import withAuthentication from '../HOC/WithSuperAdmin/WithSuperAdmin';
import { useDispatch } from 'react-redux';
import {
  setCurrentUser,
  loadUserPermissions,
} from '../store/modules/userSlice';

const Home = () => {
  return <Layout>Home</Layout>;
};

export default withAuthentication(Home);
