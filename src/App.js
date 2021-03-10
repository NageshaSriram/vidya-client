import React, { Component } from 'react';
import './App.css';
import InstructorApp from './component/InstructorApp.jsx';
import { Layout } from 'antd';

class App extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh", background: "white" }}>
          <InstructorApp />
      </Layout>
    );
  }
}

export default App;