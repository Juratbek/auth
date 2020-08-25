import React, {Component, useState, useEffect} from 'react';
import {Route} from "react-router-dom";
import './wieldly/css/style.css'
import "./wieldly/horizontalLoginForm.less";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Button, Card, Checkbox, Form, Input, Select, Tooltip,} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {
    YMaps,
    Map,
    ZoomControl,
    Placemark,
    FullscreenControl,
    GeolocationControl,
    TypeSelector, ListBox, ListBoxItem
} from 'react-yandex-maps';

function App() {
    return (
        <div>
            <Route exact path="/" component={HorizontalLoginForm}/>
            <Route exact path="/sign_up" component={Registration}/>
        </div>
    );
}

export default App;

// HozizontalLoginForm component

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
            <Card className="gx-card gx-mt-3 ant-col-lg-8 ant-col-lg-offset-8 ant-col-md-12
             ant-col-md-offset-6 ant-col-sm-offset-5 ant-col-sm-14 ant-col-xs-offset-2 ant-col-xs-20" title="Horizontal Login Form">
                <Form
                    initialValues={{remember: true}}
                    name="basic"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    className="gx-login-form gx-form-row0">
                    <FormItem rules={[{required: true, message: 'Please input your E-mail!'}]}
                              name="email"
                              initialValue="demo@example.com">

                        <Input className="gx-w-100" prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
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

// Registration component

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
            return <MyMap coords={coords} setCoords={setCoords}/>
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

// MyMap component

const MyMap = ({setCoords, coords}) => {

    useEffect(()=>{
        if (navigator.geolocation){
            alert('Please click "allow" or "разрешить" to give access!');
            navigator.geolocation.getCurrentPosition(getCoordinates);
        }else {
            alert('Geolocation is not supported by this browser!')
        }
    }, []);

    function getCoordinates(position){
        setCoords([position.coords.latitude, position.coords.latitude])
    }

    return (
        <>
            {coords ? <h4 className="gx-text-center gx-text-green">Your location has been taken</h4>:
                <h4 className="gx-text-center gx-text-danger">Your location hasn't been taken. Please check the settings!</h4>}

        </>
    )
};

// YandexMap component

const cities = [
    {
        data: {content: 'Farg`ona'},
        options: {selectOnClick: false},
        coords: [40.390060, 71.790321],
    },
    {
        data: {content: 'Namangan'},
        options: {selectOnClick: false},
        coords: [40.993599, 71.677452],
    },
    {
        data: {content: 'Andijon'},
        options: {selectOnClick: false},
        coords: [40.782621, 72.348339],
    },
    {
        data: {content: 'Toshkent'},
        options: {selectOnClick: false},
        coords: [41.316440, 69.294860],
    },
    {
        data: {content: 'Samarqand'},
        options: {selectOnClick: false},
        coords: [39.647099, 66.960289],
    },
    {
        data: {content: 'Navoiy'},
        options: {selectOnClick: false},
        coords: [40.094266, 65.379945],
    },
    {
        data: {content: 'Qarshi'},
        options: {selectOnClick: false},
        coords: [38.839980, 65.792794],
    },
    {
        data: {content: 'Jizzax'},
        options: {selectOnClick: false},
        coords: [40.1331797, 67.8234081],
    },
    {
        data: {content: 'Buxoro'},
        options: {selectOnClick: false},
        coords: [39.7675529, 64.4231326],
    },
    {
        data: {content: 'Guliston'},
        options: {selectOnClick: false},
        coords: [40.484857, 68.773982],
    },
    {
        data: {content: 'Nukus'},
        options: {selectOnClick: false},
        coords: [42.4586038, 59.6058539],
    },
    {
        data: {content: 'Termiz'},
        options: {selectOnClick: false},
        coords: [37.2290733, 67.2761489],
    },
    {
        data: {content: 'Urganch'},
        options: {selectOnClick: false},
        coords: [41.5517809, 60.6313161],
    },
];


const YandexMap = ({setCoords, setFullScreen, fullScreen}) => {

    const [lat, setLat] = useState(41.316440);
    const [lng, setLng] = useState(69.294860);
    const [center, setCenter] = useState([41.316440, 69.294860]);

    const onItemClick = coords => {
        setLat(coords[0]);
        setLng(coords[1]);
        setCenter(coords);
        setCoords(coords)
    };

    const clickOnMap = (e) => {
        e.preventDefault();
        const coords = e.get('coords');
        setLat(coords[0]);
        setLng(coords[1]);
        setCoords([coords[0], coords[1]])
    };

    const getHome = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates);
        } else {
            alert('Geolocation is not supported by this browser!')
        }
    };

    function getCoordinates(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setCenter([position.coords.latitude, position.coords.longitude])
        setCoords([position.coords.latitude, position.coords.longitude])
    }

    return (
        <YMaps>
            <div className="gx-d-inline-block gx-w-100">
                <Map
                    state={{
                        center: center,
                        zoom: 11,
                        controls: [],
                    }}
                    width="100%"
                    onClick={(e) => clickOnMap(e)}
                >
                    <ZoomControl options={{float: 'right'}}/>
                    <FullscreenControl onClick={()=>setFullScreen(!fullScreen)}/>
                    <Placemark geometry={[lat, lng]} options={{
                        iconImageSize: [30, 42],
                        iconImageOffset: [-15, -42]
                    }}/>
                    <GeolocationControl onClick={getHome} options={{float: 'left'}}/>
                    <TypeSelector options={{float: 'right'}}/>
                    <ListBox data={{content: 'Choose city'}} options={{float: 'right'}}>
                        {cities.map(city =>
                            <ListBoxItem
                                data={city.data}
                                options={city.options}
                                onClick={() => onItemClick(city.coords)}
                                key={city.data.content}
                            />
                        )}
                    </ListBox>
                </Map>
            </div>
        </YMaps>
    )
};





