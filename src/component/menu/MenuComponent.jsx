import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../../service/AuthenticationService'

import AuthenticatedRoute from '../authentication/AuthenticatedRoute'
import StaffComponent from '../users/StaffComponent'
import StudentComponent from '../users/StudentComponent'
import TeacherComponent from '../users/TeacherComponent'
import OrganizationComponent from '../global/OrganizationComponent'

import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Logo from '../../common/organizations/vidya/logo.jpg'

import "antd/dist/antd.css";
import "./MenuComponent.css";
import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
import {
    UserOutlined,
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
    LogoutOutlined,
    SettingOutlined,
    GlobalOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class MenuComponent extends Component {

    constructor(props) {
        super(props)

        // Set initial state 
        this.state = {
            collapsed: false,
            subMenu: "admin"
        };

        // Binding this keyword 
        this.handleClick = this.handleClick.bind(this)
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };
    handleClick(subMenu) {
        // Changing state 
        this.setState({ subMenu: subMenu }); 
    }

    render() {
        //const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <Router>
            <Layout>
                <Header className="header-background" style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                    <Row>
                        <Col span={2}>
                            <div className="logo">
                                { <img src={Logo} className="logo-img" alt="School App" /> }
                            </div>
                        </Col>
                        <Col span={22}>
                            <Menu mode="horizontal" selectable={false} className="float-right header-background right-pad">
                                <SubMenu key="1" icon={<UserOutlined />} className="user-options" title="User">
                                    <Menu.Item key="1" icon={<UserOutlined />}>Profile</Menu.Item>
                                    <Menu.Item key="2" icon={<SettingOutlined />}>Settings</Menu.Item>
                                    <Menu.Item key="3" icon={<LogoutOutlined />}>
                                        <a href="/login" onClick={AuthenticationService.logout} style={{ color: "black" }}>Logout</a>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Layout>

                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            marginTop: '60px'
                        }}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                Option 1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                Option 2
                            </Menu.Item>
                            <SubMenu key="users" icon={<TeamOutlined />} title="Users">
                                <Menu.Item onClick={() => this.handleClick('staff')} key="Staff">
                                    <Link to="/users/staff">Staff</Link>
                                </Menu.Item>
                                <Menu.Item onClick={() => this.handleClick('student')} key="Students">
                                <Link to="/users/students">Students</Link></Menu.Item>
                                <Menu.Item onClick={() => this.handleClick('teacher')} key="Teachers">
                                <Link to="/users/teachers">Teachers</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="global" icon={<GlobalOutlined />} title="Global">
                                <Menu.Item onClick={() => this.handleClick('organizations')} key="organizations">
                                    <Link to="/global/organizations">Organizations</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ padding: "0 24px 24px", marginLeft: this.state.collapsed ? 80 : 200, marginTop: 64 }}>
                        {(() => {
                            if (this.state.subMenu === 'staff') {
                                return (
                            <Breadcrumb style={{ margin: "16px 0" }} >
                                <Breadcrumb.Item>Users</Breadcrumb.Item>
                                <Breadcrumb.Item>Staff</Breadcrumb.Item>
                            </Breadcrumb>
                                )
                            } else if (this.state.subMenu === 'student') {
                                return (
                            <Breadcrumb style={{ margin: "16px 0" }} >
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                            <Breadcrumb.Item>Student</Breadcrumb.Item>
                        </Breadcrumb>
                                )
                            } else if (this.state.subMenu === 'teacher') {
                                return (
                            <Breadcrumb style={{ margin: "16px 0" }} >
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                            <Breadcrumb.Item>Teacher</Breadcrumb.Item>
                        </Breadcrumb>
                                )
                            } else if (this.state.subMenu === 'organizations') {
                                return (
                                <Breadcrumb style={{ margin: "16px 0" }} >
                                    <Breadcrumb.Item>Global</Breadcrumb.Item>
                                    <Breadcrumb.Item>Organizations</Breadcrumb.Item>
                                </Breadcrumb>
                                )
                            }
                             else {
                               return (<Breadcrumb style={{ margin: "16px 0" }} >
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                </Breadcrumb>
                               )
                            }
                        })()}
                        

                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280

                            }}
                        >
                            <Switch>
                                <AuthenticatedRoute path="/users/staff" exact component={StaffComponent} />
                                <AuthenticatedRoute path="/users/teachers" exact component={TeacherComponent} />
                                <AuthenticatedRoute path="/users/students" exact component={StudentComponent} />
                                <AuthenticatedRoute path="/global/organizations" exact component={OrganizationComponent} />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Layout>
            </Router>

        )
    }
}

export default withRouter(MenuComponent)