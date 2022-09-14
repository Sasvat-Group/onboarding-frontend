import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import withAuthentication from '../HOC/WithSuperAdmin/WithSuperAdmin';

class Privilege extends Component {
  render() {
    return (
      <Layout>
        <h1>You dont have previlege to access that page</h1>
      </Layout>
    );
  }
}

export default withAuthentication(Privilege);
