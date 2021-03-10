import React, { Component } from 'react';


import { Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AuthenticationService from '../../service/AuthenticationService';

import 'antd/dist/antd.css';
import './LoginComponent.css';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usernameOrEmail: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    componentDidMount() {
        AuthenticationService.logout();
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.usernameOrEmail, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.usernameOrEmail, response.accessToken)
                this.props.history.push(`/`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div className="">
                <Row className="height-100">
                    <Col className="left-login" span={18}></Col>
                    <Col className="right-login" span={6}>
                        <Row className="height-40 content-center">
                                <div>
                                    <span className="welcome">Welcome</span>
                                </div>
                        </Row>
                        <Row className="height-50">
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true
                                }}
                                size="large"
                            >
                                <Form.Item
                                    name="usernameOrEmail"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Username!"
                                        }
                                    ]}

                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Username"
                                        name="usernameOrEmail"
                                        value={this.state.usernameOrEmail}
                                        onChange={this.handleChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Password!"
                                        }
                                    ]}

                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        name="password"
                                        placeholder="Password" value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <a className="login-form-forgot" href="/">
                                        Forgot password
                    </a>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={this.loginClicked}
                                        className="login-form-button"
                                    >
                                        Log in
                </Button>
                                </Form.Item>
                            </Form>
                        </Row>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default LoginComponent