import React, {useState} from 'react';
import {Button, Card, Form, Input, Select, Tooltip,} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import Map from "./Map";
import YandexMap from "./YandexMap";

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: {span: 16},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 18},
        sm: {span: 16},
    },
};

const Registration = () => {
    const [form] = Form.useForm();
    const [coords, setCoords] = useState(null);
    const [letGeolocation, setLetGeolocation] = useState(null);
    const [mapFullScreen, setMapFullScreen] = useState(false);

    const onFinish = values => {
        console.log('Received values of form: ', values);
        console.log('Received values of form: ', coords);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 80}}>
                <Option value="+998">+998</Option>
            </Select>
        </Form.Item>
    );

    const map = () => {
        if (letGeolocation == null) {
            return (
                <Card className="ant-col-sm-24 gx-mw-100 gx-border-0 gx-text-center">
                    <h4>Do you let get your location by geolocation or map?</h4>
                    <Button className="btn btn-primary" onClick={() => setLetGeolocation(true)}>By geolocation</Button>
                    <Button className="btn" onClick={() => setLetGeolocation(false)}>By map</Button>
                </Card>
            )
        } else if (letGeolocation) {
            return <Map coords={coords} setCoords={setCoords}/>
        } else if (!letGeolocation) {
            return <YandexMap fullScreen={mapFullScreen} setFullScreen={setMapFullScreen} setCoords={setCoords}/>
        }

    };

    const style = () => {
        return mapFullScreen ? null : 'gx-mt-3'
    };

    return (
        <Card className={`gx-card ${style()} ant-col-md-18 ant-col-sm-18 ant-col-xs-20
         ant-col-xs-offset-2 ant-col-lg-offset-3 ant-col-offset-3`} title="Registration Form">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '+998',
                    gender: 'male'
                }}
                scrollToFirstError
            >

                <Form.Item
                    name="firstName"
                    label={"First name"}
                    rules={[{required: true, message: 'Please input your first name!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label={"Last name"}
                    rules={[{required: true, message: 'Please input your last name!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="age"
                    label={"Age"}
                    rules={[{required: true, message: 'Please input your age!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="gender"
                    label={"Gender"}
                >
                    <Select
                        style={{
                            // width: '32%',
                        }}
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="userName"
                    label={
                        <span>
            User name&nbsp;
                            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined/>
            </Tooltip>
          </span>
                    }
                    rules={[{required: true, message: 'Please input your user name!', whitespace: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            minLength: 8,
                            message: 'Password must contain minimum 8 characters!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{required: true, message: 'Please input your phone number!'}]}
                >
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="country"
                    label="Country"
                    rules={[{required: true, message: 'Please input your country!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="city"
                    label="City"
                    rules={[{required: true, message: 'Please input your city!'}]}
                >
                    <Input/>
                </Form.Item>

                {map()}

                <Button type="primary" disabled={!coords} htmlType="submit" className="gx-float-right">
                    Register
                </Button>
            </Form>
        </Card>
    );
};

export default Registration;

