import React, {Component} from "react";
import {Button, Card, Checkbox, Form, Input} from "antd";
import "./horizontalLoginForm.less";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const FormItem = Form.Item;

class HorizontalLoginForm extends Component {

    constructor() {
        super();
        this.state = {
            email: 'demo@example.com',
            password: 'demo#123'
        }
    }

    render() {

        // const {showMessage, loader, alertMessage} = this.props;

        return (
            <Card className="gx-card ant-col-md-10 ant-col-offset-7" title="Horizontal Login Form">
                <Form
                    initialValues={{remember: true}}
                    name="basic"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    className="gx-login-form gx-form-row0">
                    <FormItem rules={[{required: true, message: 'Please input your E-mail!'}]}
                              name="email"
                              initialValue="demo@example.com">

                        <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Email"/>
                    </FormItem>
                    <FormItem rules={[{required: true, message: 'Please input your Password!'}]}
                              name="password"
                              initialValue="demo#123">

                        <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="Password"/>
                    </FormItem>
                    <FormItem name="remember" valuePropName="checked">
            <span className='gx-d-block gx-mb-2'>
              <Checkbox>Remember me</Checkbox>
            <span className="gx-link login-form-forgot">Forgot password</span>
            </span>
                        <Button type="primary" htmlType="submit" className="login-form-button gx-mt-1">
                            Log in
                        </Button>
                        <span className='gx-d-block gx-mt-2'>
            Or <Link to="/sign_up" className="gx-link">register now!</Link>
            </span>
                    </FormItem>
                </Form>

            </Card>
        );
    }

}

export default HorizontalLoginForm
