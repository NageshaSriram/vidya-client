import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import ApiService from '../../service/ApiService';
import AddOrganizationPage from './AddOrganizationModel'
import './OrganizationComponent.css';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <p>{text}</p>,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
  },
  {
    title: 'Updated',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Actions'
  }
];


class OrganizationComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      organizations: []
    };
    this.organizations = [];
    this.getAllOraganizations = this.getAllOraganizations.bind(this);
    this.addOrganization = this.addOrganization.bind(this);
  }

  addOrganization = (values) => {
    ApiService.addOrganization(values).then(res => {
      this.getAllOraganizations();
    });
  };
  getAllOraganizations() {
    ApiService.getAllOrganization()
      .then((data) => {
        this.setState({ organizations: data })
      }).catch(() => {
        this.setState({ showSuccessMessage: false })
        this.setState({ hasLoginFailed: true })
      })
  }
  componentDidMount() {
    this.getAllOraganizations();
  }

  render() {
    return (
      <>
        <div className="actions">
          <AddOrganizationPage getFileId={this.getFileId} addOrganization={this.addOrganization} />
        </div>
        <Table columns={columns} dataSource={this.state.organizations} rowKey="id" />
      </>
    )
  }
}

export default OrganizationComponent;
