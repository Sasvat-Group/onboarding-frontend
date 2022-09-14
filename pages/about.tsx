import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import withAuthentication from '../HOC/WithSuperAdmin/WithSuperAdmin';

class About extends Component {
  render() {
    return <Layout>About Us</Layout>;
  }
}

export default withAuthentication(About);
